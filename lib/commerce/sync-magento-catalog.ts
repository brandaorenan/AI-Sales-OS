/**
 * Sincroniza `commerce_products` a partir do catálogo Magento (Entrega 3 do
 * plano de concierge de compras, §6.2).
 *
 * `catalogProductList` não pagina — devolve o catálogo inteiro numa chamada
 * (medido contra a loja real: 6.478 produtos, ~2.4 MB de resposta). Por isso
 * este sync só grava o que a LISTA traz (nome, SKU, tipo, categorias): rodar
 * `catalogProductInfo` (preço, descrição) para cada um dos 6 mil produtos a
 * cada sincronização seria minutos de chamadas sequenciais para um cache de
 * BUSCA que nunca decide venda sozinho (plano §6.1 — preço/estoque efetivos
 * são revalidados ao vivo antes de confirmar seleção, não nesta tabela).
 * Detalhe completo fica para quando o produto é efetivamente apresentado.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";
import {
  withMagentoSession,
  magentoListProducts,
  type MagentoConnectionConfig,
} from "@/lib/magento/soap";

export interface SyncMagentoCatalogInput {
  organizationId: string;
  integrationId: string;
  storeView: string;
  config: MagentoConnectionConfig;
}

export interface SyncMagentoCatalogResult {
  fetched: number;
  upserted: number;
}

export async function syncMagentoCatalog(
  admin: SupabaseClient,
  input: SyncMagentoCatalogInput,
): Promise<SyncMagentoCatalogResult> {
  const list = await withMagentoSession(input.config, (sessionId) =>
    magentoListProducts(input.config, sessionId, input.storeView),
  );

  const rows = list
    .filter((p) => p.productId !== "" && p.sku !== "")
    .map((p) => ({
      organization_id: input.organizationId,
      integration_id: input.integrationId,
      store_view: input.storeView,
      external_id: p.productId,
      sku: p.sku,
      type: p.type,
      name: p.name,
      synced_at: new Date().toISOString(),
    }));

  // Lotes de 500: um único upsert com 6 mil linhas é uma só transação enorme
  // e um payload HTTP grande; lotes deixam falha parcial recuperável (a
  // próxima rodada recobre o resto) sem reprocessar o catálogo inteiro.
  let upserted = 0;
  const BATCH = 500;
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const { error } = await admin
      .from("commerce_products")
      .upsert(batch, { onConflict: "organization_id,integration_id,store_view,external_id" });
    if (error) {
      logger.error("[commerce.sync-magento] lote falhou", {
        error: error.message,
        batch_start: i,
        organization_id: input.organizationId,
      });
      throw new Error(`commerce_products_upsert_failed: ${error.message}`);
    }
    upserted += batch.length;
  }

  return { fetched: list.length, upserted };
}
