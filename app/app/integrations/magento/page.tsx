/**
 * Tela de Integrações → Magento (Entrega 2 do plano de concierge de compras).
 *
 * Diferente da Nuvemshop (OAuth + env global), Magento não tem app registrado
 * numa plataforma central: cada tenant cola a credencial da SUA loja, e não há
 * ".env" a configurar de antemão — por isso não existe estado "not_configured"
 * aqui, só "não conectado" / "conectado".
 */
import { ShoppingCart } from "@/lib/ui/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { loadAuthUser, resolveActiveOrg } from "@/lib/auth/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { MagentoConnectForm } from "./_components/ConnectForm";

interface IntegrationRow {
  status: string;
  store_metadata: {
    endpoint?: string;
    api_user?: string;
    magento_version?: string;
    store_views?: Array<{ storeId: string; code: string }>;
  } | null;
  last_health_check_at: string | null;
}

async function loadIntegration(orgId: string): Promise<IntegrationRow | null> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("tenant_integrations")
    .select("status, store_metadata, last_health_check_at")
    .eq("organization_id", orgId)
    .eq("provider", "magento")
    .maybeSingle();
  return (data as IntegrationRow | null) ?? null;
}

export default async function MagentoIntegrationPage() {
  const user = await loadAuthUser();
  const activeOrg = user ? await resolveActiveOrg(user) : null;
  const integration = activeOrg ? await loadIntegration(activeOrg.orgId) : null;
  const isAdmin = activeOrg?.role === "admin" || user?.is_platform_admin === true;

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <header className="flex items-start gap-4">
        <div className="rounded-md border border-border bg-surface p-3">
          <ShoppingCart size={28} weight="duotone" className="text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Magento</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Conecta a loja Magento 1 / OpenMage para o concierge de compras recomendar
            produtos e montar carrinho.
          </p>
        </div>
      </header>

      {integration?.status === "healthy" ? (
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2">
                Conectado
                <Badge variant="secondary">{integration.store_metadata?.magento_version ?? "—"}</Badge>
              </CardTitle>
              <CardDescription>
                {integration.store_metadata?.endpoint ?? "—"} · última checagem:{" "}
                {integration.last_health_check_at
                  ? new Date(integration.last_health_check_at).toLocaleString("pt-BR")
                  : "—"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <span className="font-medium">Store views:</span>{" "}
              <span className="text-muted-foreground">
                {integration.store_metadata?.store_views?.length
                  ? integration.store_metadata.store_views.map((s) => s.code).join(", ")
                  : "—"}
              </span>
            </div>
            {isAdmin ? (
              <details className="pt-2">
                <summary className="cursor-pointer text-muted-foreground">
                  Trocar credencial
                </summary>
                <div className="pt-3">
                  <MagentoConnectForm />
                </div>
              </details>
            ) : null}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Conectar Magento</CardTitle>
            <CardDescription>
              Cole o endpoint SOAP v2 e uma credencial de API dedicada da sua loja.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isAdmin ? (
              <MagentoConnectForm />
            ) : (
              <p className="text-xs text-muted-foreground">
                Somente administradores podem conectar integrações.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
