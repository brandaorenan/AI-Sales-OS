# Base de conhecimento Magento 1.9 API (para agente de IA)

## Contexto levantado

- **Fonte canônica:** `github.com/OpenMage/devdocs` (HTML) → origem de `devdocs-openmage.org/guides/m1x/`. Contém a API SOAP (~120 páginas de métodos em ~25 recursos) e a API REST (~20 páginas, OAuth).
- **r-martins.github.io/m1docs** é espelho do mesmo conteúdo — será citado no README como fonte alternativa, sem clone separado.
- O 1º link enviado tinha o prefixo duplicado; o alvo é a introdução da API SOAP (parte do mesmo site).
- Artigo da **Magenteiro** (PT-BR): extraio o conteúdo público; os "16 exemplos PHP" são entregues por e-mail (inacessíveis) — complemento com exemplos equivalentes derivados da documentação oficial, marcados como tal.
- Idioma: **inglês** (fiel à original). Escopo: **somente APIs + exemplos**.

## Estrutura de saída em `/Users/renanbrandao/Desktop/magento-doc/`

```
magento-doc/
├── README.md                          # índice master, fontes, como um agente deve consumir
├── integration-guide-ai-agents.md     # síntese prática: SOAP vs REST, auth, fluxos comuns, exemplos
├── soap-api/                          # ~13 arquivos consolidados por tema
│   ├── 01-introduction-authentication.md
│   ├── 02-catalog-category.md
│   ├── 03-catalog-product.md
│   ├── 04-product-attributes-sets.md
│   ├── 05-product-media-options-links.md
│   ├── 06-inventory.md
│   ├── 07-customer.md
│   ├── 08-sales-order.md
│   ├── 09-invoice-shipment-creditmemo.md
│   ├── 10-checkout-cart.md
│   ├── 11-directory-store.md
│   └── 12-custom-api-wsi.md           # Create Your Own API + WS-I
├── rest-api/                          # ~8 arquivos
│   ├── 01-introduction.md
│   ├── 02-authentication-oauth.md
│   ├── 03-http-methods-filters-status-codes.md
│   ├── 04-permissions-settings.md
│   ├── 05-products.md
│   ├── 06-orders.md
│   ├── 07-customers.md
│   └── 08-inventory-formats-testing.md
└── external/
    └── magenteiro-consuming-magento-api.md  # artigo preservado no PT-BR original (nota no README)
```

Cada arquivo consolida o recurso principal + suas páginas de métodos, preservando assinaturas, argumentos, tipos de retorno e códigos de falha, com cabeçalho indicando as URLs de origem. Seções exclusivas do Enterprise (gift cards, customer balance) ficam de fora com nota no README — Magento 1.9 CE não as possui.

## Passos de execução

1. **Clonar** shallow `OpenMage/devdocs` para `/tmp` e localizar `guides/m1x/api/` (SOAP + REST).
2. **Converter HTML → Markdown em lote:** verificar `pandoc` (senão, `html2text` via pip num venv em `/tmp`). Script Python/Node que extrai apenas o conteúdo principal da página (descarta sidebar/nav/breadcrumbs do tema) e consolida por tema nos arquivos acima.
3. **Artigo Magenteiro:** extrair conteúdo público já obtido e salvar em `external/`.
4. **Escrever o guia de síntese** `integration-guide-ai-agents.md`: escolha SOAP v2 vs REST (REST não cria pedidos no M1; carrinho/pedido completo só via SOAP), setup de usuários/roles no admin, endpoints WSDL, filtros de busca, fluxo completo de criação de pedido via Cart API, exemplos PHP/Python, armadilhas comuns (v1 vs v2, WS-I, store views).
5. **README.md** com índice, mapa agente→arquivo ("para criar pedido, veja soap-api/10..."), fontes e limitações.
6. **Verificação:** conferir contagem de páginas convertidas vs. origem, spot-check de arquivos (sem lixo de navegação, code blocks íntegros), e validação geral do Markdown.

## Observações

- O site do piloto `ia.genialiaviagens.com.br` não resolve DNS deste ambiente (provavelmente ainda não público) — não bloqueia nada; a base é agnística à loja.
- Execução ~15–25 min, predominantemente conversão automatizada + redação dos 2 guias.