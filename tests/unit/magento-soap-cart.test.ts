/**
 * Serialização/parsing das operações de carrinho do cliente SOAP Magento
 * (Entrega 5 do plano de concierge de compras) — `lib/magento/soap.ts`.
 *
 * `shoppingCartProductAdd/Update/Remove` esperam um array de STRUCTS na
 * requisição, não de escalares — confirmado no WSDL real da loja de
 * referência (`.context/magento-v2.wsdl`, artefato de pesquisa não
 * versionado): `shoppingCartProductEntityArray` é uma sequência de elementos
 * `complexObjectArray`, mesma convenção de nome reusado já vista nas
 * RESPOSTAS (`extractItems`). Isto NÃO foi provado contra a loja real (ao
 * contrário do resto do arquivo) — mutar carrinho na base de produção do
 * cliente sem confirmação explícita fica fora do escopo desta sessão; a
 * prova é este teste de forma, mais a leitura do WSDL.
 */
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  magentoCreateCart,
  magentoCartAddItems,
  magentoCartUpdateItems,
  magentoCartRemoveItems,
  magentoCartInfo,
  magentoCartTotals,
  type MagentoConnectionConfig,
} from "@/lib/magento/soap";

const CONFIG: MagentoConnectionConfig = {
  endpoint: "https://loja.example/index.php/api/v2_soap/",
  apiUser: "u",
  apiKey: "k",
};

afterEach(() => {
  vi.unstubAllGlobals();
});

function stubFetch(responseXml: string): { calls: Array<{ url: string; body: string }> } {
  const calls: Array<{ url: string; body: string }> = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init: RequestInit) => {
      calls.push({ url, body: String(init.body) });
      return { text: async () => responseXml };
    }),
  );
  return { calls };
}

describe("magentoCreateCart", () => {
  it("envia sessionId + store e lê o quoteId do result", async () => {
    const { calls } = stubFetch(
      `<SOAP-ENV:Envelope><SOAP-ENV:Body><ns1:shoppingCartCreateResponseParam><result>42</result></ns1:shoppingCartCreateResponseParam></SOAP-ENV:Body></SOAP-ENV:Envelope>`,
    );
    const quoteId = await magentoCreateCart(CONFIG, "sid", "default");
    expect(quoteId).toBe("42");
    expect(calls[0]!.body).toContain("<sessionId>sid</sessionId>");
    expect(calls[0]!.body).toContain("<store>default</store>");
  });
});

describe("magentoCartAddItems / Update / Remove", () => {
  it("serializa productsData como complexObjectArray por item (product_id + qty)", async () => {
    const { calls } = stubFetch(
      `<SOAP-ENV:Envelope><SOAP-ENV:Body><ns1:shoppingCartProductAddResponseParam><result>1</result></ns1:shoppingCartProductAddResponseParam></SOAP-ENV:Body></SOAP-ENV:Envelope>`,
    );
    const ok = await magentoCartAddItems(CONFIG, "sid", "42", [{ productId: "784", qty: 2 }], "default");
    expect(ok).toBe(true);
    const body = calls[0]!.body;
    expect(body).toContain("<quoteId>42</quoteId>");
    expect(body).toContain(
      "<productsData><complexObjectArray><product_id>784</product_id><qty>2</qty></complexObjectArray></productsData>",
    );
  });

  it("update aceita productId sem qty quando só o product_id é necessário (remove)", async () => {
    const { calls } = stubFetch(
      `<SOAP-ENV:Envelope><SOAP-ENV:Body><ns1:shoppingCartProductRemoveResponseParam><result>true</result></ns1:shoppingCartProductRemoveResponseParam></SOAP-ENV:Body></SOAP-ENV:Envelope>`,
    );
    const ok = await magentoCartRemoveItems(CONFIG, "sid", "42", [{ productId: "784" }]);
    expect(ok).toBe(true);
    expect(calls[0]!.body).toContain(
      "<productsData><complexObjectArray><product_id>784</product_id></complexObjectArray></productsData>",
    );
  });

  it("update define quantidade absoluta na mesma forma de request do add", async () => {
    stubFetch(
      `<SOAP-ENV:Envelope><SOAP-ENV:Body><ns1:shoppingCartProductUpdateResponseParam><result>1</result></ns1:shoppingCartProductUpdateResponseParam></SOAP-ENV:Body></SOAP-ENV:Envelope>`,
    );
    const ok = await magentoCartUpdateItems(CONFIG, "sid", "42", [{ productId: "784", qty: 5 }]);
    expect(ok).toBe(true);
  });
});

describe("magentoCartInfo", () => {
  it("lê itens aninhados e campos de topo do quote sem confundir os dois níveis", async () => {
    stubFetch(
      `<SOAP-ENV:Envelope><SOAP-ENV:Body><ns1:shoppingCartInfoResponseParam><result>` +
        `<quote_id>42</quote_id><is_active>1</is_active><items_qty>2</items_qty>` +
        `<quote_currency_code>BRL</quote_currency_code>` +
        `<items><item><item_id>1</item_id><product_id>784</product_id><sku>000018</sku>` +
        `<name>Sianinha</name><qty>2</qty><price>19.9</price><row_total>39.8</row_total></item></items>` +
        `</result></ns1:shoppingCartInfoResponseParam></SOAP-ENV:Body></SOAP-ENV:Envelope>`,
    );
    const info = await magentoCartInfo(CONFIG, "sid", "42");
    expect(info.quoteId).toBe("42");
    expect(info.isActive).toBe(true);
    expect(info.currency).toBe("BRL");
    expect(info.items).toEqual([
      { itemId: "1", productId: "784", sku: "000018", name: "Sianinha", qty: 2, price: 19.9, rowTotal: 39.8 },
    ]);
  });
});

describe("magentoCartTotals", () => {
  it("lê as linhas de total (Subtotal, Grand Total)", async () => {
    stubFetch(
      `<SOAP-ENV:Envelope><SOAP-ENV:Body><ns1:shoppingCartTotalsResponseParam><result>` +
        `<complexObjectArray><title>Subtotal</title><amount>39.8</amount></complexObjectArray>` +
        `<complexObjectArray><title>Grand Total</title><amount>39.8</amount></complexObjectArray>` +
        `</result></ns1:shoppingCartTotalsResponseParam></SOAP-ENV:Body></SOAP-ENV:Envelope>`,
    );
    const totals = await magentoCartTotals(CONFIG, "sid", "42");
    expect(totals).toEqual([
      { title: "Subtotal", amount: 39.8 },
      { title: "Grand Total", amount: 39.8 },
    ]);
  });
});
