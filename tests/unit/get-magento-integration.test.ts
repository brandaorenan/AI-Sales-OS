/**
 * `getMagentoIntegration` — regressão do bug achado instalando o módulo contra
 * a loja real (2026-09-06): `storeView` usava a string literal "default" como
 * fallback ÚNICO, mas nem toda loja tem uma store view com esse código
 * (a de referência só tem "english"). Um quote criado via `shoppingCartCreate`
 * com um `store` inexistente nasce com `store_id=0` (escopo admin) e o
 * `Mage_Checkout_Model_Session::getQuote()` do próprio Magento descarta esse
 * quote em silêncio — carrinho vazio no navegador, sem erro visível.
 */
import { describe, expect, it, vi } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getMagentoIntegration } from "@/lib/commerce/get-magento-integration";

vi.mock("@/lib/webhooks/secrets", () => ({
  decryptWebhookSecret: vi.fn(async () => "chave-decifrada"),
}));

function makeAdmin(storeMetadata: Record<string, unknown>) {
  return {
    from: () => ({
      select: () => ({
        eq: () => ({
          eq: () => ({
            eq: () => ({
              maybeSingle: async () => ({
                data: {
                  id: "int-1",
                  store_metadata: storeMetadata,
                  oauth_access_token_encrypted: "enc",
                  oauth_refresh_token_encrypted: null,
                },
              }),
            }),
          }),
        }),
      }),
    }),
  } as unknown as SupabaseClient;
}

describe("getMagentoIntegration — storeView", () => {
  it("usa o código REAL da store view gravado na conexão", async () => {
    const admin = makeAdmin({ endpoint: "https://loja.example", api_user: "u", primary_store_view: "english" });
    const integ = await getMagentoIntegration(admin, "org-1");
    expect(integ?.storeView).toBe("english");
  });

  it("cai no literal 'default' só quando a conexão é anterior a esta correção (campo ausente)", async () => {
    const admin = makeAdmin({ endpoint: "https://loja.example", api_user: "u" });
    const integ = await getMagentoIntegration(admin, "org-1");
    expect(integ?.storeView).toBe("default");
  });
});
