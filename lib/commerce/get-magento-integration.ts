/**
 * Resolve a integração Magento saudável de uma organização, com a credencial
 * já decifrada — usado pelas capacidades de compra (busca já usa o cache em
 * `commerce_products`; isto é para quem precisa FALAR com a loja: apresentar
 * produto, carrinho).
 */
import type { SupabaseClient } from "@supabase/supabase-js";

import type { MagentoConnectionConfig } from "@/lib/magento/soap";
import { decryptWebhookSecret } from "@/lib/webhooks/secrets";

export interface MagentoIntegration {
  integrationId: string;
  storeView: string;
  config: MagentoConnectionConfig;
  /** Secret do módulo Deskcomm_Concierge (link de recuperação, plano §5.2) — null se não configurado. */
  moduleSecret: string | null;
}

interface StoreMetadata {
  endpoint?: string;
  api_user?: string;
  primary_store_view?: string | null;
}

export async function getMagentoIntegration(
  admin: SupabaseClient,
  organizationId: string,
): Promise<MagentoIntegration | null> {
  const { data } = await admin
    .from("tenant_integrations")
    .select("id, store_metadata, oauth_access_token_encrypted, oauth_refresh_token_encrypted")
    .eq("organization_id", organizationId)
    .eq("provider", "magento")
    .eq("status", "healthy")
    .maybeSingle();
  if (!data) return null;

  const meta = data.store_metadata as StoreMetadata | null;
  if (!meta?.endpoint || !meta?.api_user) return null;

  const apiKey = await decryptWebhookSecret(admin, data.oauth_access_token_encrypted as string);
  if (!apiKey) return null;

  // Opcional (Entrega 5, plano §5.2) — reuso documentado de
  // `oauth_refresh_token_encrypted` em `supabase/migrations/*_0182_*`. Ausente
  // é estado normal (módulo Magento não instalado): não falha a integração.
  const moduleSecret = data.oauth_refresh_token_encrypted
    ? await decryptWebhookSecret(admin, data.oauth_refresh_token_encrypted as string)
    : null;

  return {
    integrationId: data.id,
    // Código REAL da store view, gravado na conexão (`app/api/v1/integrations/
    // magento/route.ts`). "default" como literal quebrava `shoppingCartCreate`
    // em qualquer loja cuja store view não se chame literalmente isso — achado
    // instalando contra a loja real (ver comentário na rota de conexão). Loja
    // conectada ANTES desta correção não tem o campo ainda: cai no literal
    // "default" só como último recurso (mesmo comportamento de antes, não
    // piora nada) — reconectar grava o valor certo.
    storeView: meta.primary_store_view ?? "default",
    config: { endpoint: meta.endpoint, apiUser: meta.api_user, apiKey },
    moduleSecret,
  };
}
