/**
 * GET  /api/v1/integrations/magento — estado da conexão + capacidades diagnosticadas.
 * POST /api/v1/integrations/magento — VALIDA a credencial contra a loja e só então grava.
 *
 * Mesmo padrão de `app/api/v1/channels/official/route.ts` (credencial colada
 * manualmente, não OAuth): a Nuvemshop tem fluxo de redirect próprio, mas
 * Magento 1/OpenMage não tem OAuth — o operador cola endpoint + usuário +
 * chave da API SOAP dedicada. Validar ANTES de gravar evita que o operador
 * ache que conectou e só descubra na primeira mensagem que não saiu.
 *
 * Entrega 2 do plano de concierge de compras
 * (`docs/superpowers/plans/2026-09-06-magento-concierge-carrinho-handoff.md`):
 * só conecta e diagnostica capacidades (versão, store views). Catálogo e
 * carrinho são as Entregas 3+.
 */
import { randomUUID } from "node:crypto";
import { createHash } from "node:crypto";
import type { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { audit } from "@/lib/audit";
import { fail, ok } from "@/lib/api/wrappers";
import { requireAuth, resolveActiveOrg } from "@/lib/auth/server";
import { ROLE_RANK } from "@/lib/auth/types";
import { magentoCapabilities, MagentoSoapError } from "@/lib/magento/soap";
import { createAdminClient } from "@/lib/supabase/admin";
import { encryptWebhookSecret } from "@/lib/webhooks/secrets";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PROVIDER = "magento";

const conectarSchema = z.object({
  endpoint: z.string().url().max(500),
  api_user: z.string().min(1).max(200),
  api_key: z.string().min(1).max(500),
  // Opcional (Entrega 5, plano §5.2): secret do módulo Deskcomm_Concierge
  // (link de recuperação de carrinho). Ausente = commerce_create_checkout_link
  // recusa com erro de ensino; o resto da integração funciona normalmente.
  module_secret: z.string().min(1).max(500).optional(),
});

type Gate = { ok: true; orgId: string } | { ok: false; resposta: NextResponse };

async function adminGate(requestId: string): Promise<Gate> {
  const user = await requireAuth();
  const org = await resolveActiveOrg(user);
  if (!org || ROLE_RANK[org.role] < ROLE_RANK.admin) {
    return { ok: false, resposta: fail("forbidden", "admin_required", 403, { requestId }) };
  }
  return { ok: true, orgId: org.orgId };
}

export async function GET(): Promise<NextResponse> {
  const requestId = randomUUID();
  const g = await adminGate(requestId);
  if (!g.ok) return g.resposta;

  const admin = createAdminClient();
  const { data } = await admin
    .from("tenant_integrations")
    .select("status, status_reason, store_metadata, last_health_check_at")
    .eq("organization_id", g.orgId)
    .eq("provider", PROVIDER)
    .maybeSingle();

  return ok({
    connected: data?.status === "healthy",
    status: data?.status ?? null,
    statusReason: data?.status_reason ?? null,
    lastHealthCheckAt: data?.last_health_check_at ?? null,
    // Não-secreto: endpoint/usuário/capacidades diagnosticadas. A api_key
    // cifrada nunca volta neste GET.
    endpoint: (data?.store_metadata as Record<string, unknown> | null)?.endpoint ?? null,
    apiUser: (data?.store_metadata as Record<string, unknown> | null)?.api_user ?? null,
    magentoVersion: (data?.store_metadata as Record<string, unknown> | null)?.magento_version ?? null,
    storeViews: (data?.store_metadata as Record<string, unknown> | null)?.store_views ?? [],
  });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const requestId = randomUUID();
  const g = await adminGate(requestId);
  if (!g.ok) return g.resposta;

  const parsed = conectarSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return fail("invalid_request", "endpoint, api_user e api_key são obrigatórios", 422, {
      requestId,
    });
  }
  const { endpoint, api_user, api_key, module_secret } = parsed.data;

  const admin = createAdminClient();
  const inputHash = createHash("sha256").update(`${endpoint}:${api_user}:${api_key}`).digest("hex");

  // VALIDA ANTES DE GRAVAR — a rota não sabe se a credencial presta; ela
  // pergunta à loja e a loja responde.
  let capabilities;
  try {
    capabilities = await magentoCapabilities({ endpoint, apiUser: api_user, apiKey: api_key });
  } catch (err) {
    const motivo =
      err instanceof MagentoSoapError ? err.message : err instanceof Error ? err.message : String(err);
    await audit({
      action: "magento.connect_failed",
      organizationId: g.orgId,
      resourceType: "tenant_integrations",
      requestId,
      metadata: { endpoint, api_user, motivo },
    });
    return fail("invalid_request", `não foi possível conectar: ${motivo}`, 422, { requestId });
  }

  const cifrado = await encryptWebhookSecret(admin, api_key);
  if (!cifrado) {
    // Sem a GUC de cifra configurada, gravar a chave em claro seria pior que
    // recusar. O operador precisa saber que falta uma configuração de servidor.
    return fail(
      "invalid_request",
      "cifra indisponível nesta instalação (GUC app.nuvemshop_oauth_key ausente) — a credencial não foi gravada",
      422,
      { requestId },
    );
  }
  // `tenant_integrations.webhook_secret_encrypted` é NOT NULL, mas Magento
  // ainda não emite webhook nesta Entrega (é a lacuna da seção 4.3.6 do
  // plano, resolvida só quando o módulo existir). Cifra de string vazia
  // preenche a coluna sem inventar um segredo que não existe.
  const semSegredoDeWebhookAinda = await encryptWebhookSecret(admin, "");

  // Secret do módulo é OPCIONAL — só cifra/grava se o operador colou um.
  // Omitir a chave do payload de upsert preserva o valor já gravado numa
  // reconexão que não repetiu o campo (PostgREST só atualiza colunas
  // presentes no payload).
  const moduleSecretField: Record<string, unknown> = {};
  if (module_secret) {
    const moduleSecretCifrado = await encryptWebhookSecret(admin, module_secret);
    if (!moduleSecretCifrado) {
      return fail(
        "invalid_request",
        "cifra indisponível nesta instalação (GUC app.nuvemshop_oauth_key ausente) — o secret do módulo não foi gravado",
        422,
        { requestId },
      );
    }
    moduleSecretField.oauth_refresh_token_encrypted = moduleSecretCifrado;
  }

  const { data: integrationRow, error } = await admin
    .from("tenant_integrations")
    .upsert(
      {
        organization_id: g.orgId,
        provider: PROVIDER,
        oauth_access_token_encrypted: cifrado,
        webhook_secret_encrypted: semSegredoDeWebhookAinda ?? cifrado,
        status: "healthy",
        status_reason: null,
        store_metadata: {
          endpoint,
          api_user,
          magento_version: capabilities.version,
          store_views: capabilities.storeViews,
          // Achado instalando contra a loja real (2026-09-06): a string literal
          // "default" NÃO é o código de store view de toda loja — esta, por
          // exemplo, só tem "english". Um quote criado via shoppingCartCreate
          // com um `store` que não existe nasce com store_id=0 (escopo admin),
          // e o Mage_Checkout_Model_Session::getQuote() do PRÓPRIO Magento
          // descarta silenciosamente um quote cujo website não bate com o da
          // sessão — o carrinho chega vazio no navegador do cliente, sem
          // nenhum erro visível. Persistir o código REAL da primeira store
          // view aqui, na conexão, é o que evita isso. Loja com mais de uma
          // store view: escolha de qual é "a principal" continua pendente
          // (plano §13, item 2) — o primeiro item da lista é o palpite seguro
          // possível sem essa decisão de negócio.
          primary_store_view: capabilities.storeViews[0]?.code ?? null,
        },
        last_health_check_at: new Date().toISOString(),
        ...moduleSecretField,
      },
      { onConflict: "organization_id,provider" },
    )
    .select("id")
    .single();

  if (error) {
    return fail("internal_error", error.message ?? "tenant_integrations_write_failed", 500, {
      requestId,
    });
  }

  // Ledger (seção 9 do plano): a Entrega 2 só registra a TENTATIVA de conexão.
  // Falha ANTES daqui (SOAP recusou, cifra ausente) não tem `integration_id`
  // ainda — fica só no `audit()` acima, que já cobre esse caso.
  await admin.from("commerce_operations").insert({
    organization_id: g.orgId,
    integration_id: integrationRow.id,
    operation: "connection_test",
    operation_id: requestId,
    input_hash: inputHash,
    status: "succeeded",
    result: { magento_version: capabilities.version, store_views: capabilities.storeViews },
  });

  await audit({
    action: "magento.connected",
    organizationId: g.orgId,
    resourceType: "tenant_integrations",
    requestId,
    metadata: { endpoint, api_user, input_hash: inputHash, magento_version: capabilities.version },
  });

  return ok({
    connected: true,
    magentoVersion: capabilities.version,
    storeViews: capabilities.storeViews,
  });
}
