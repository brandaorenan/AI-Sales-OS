# Deskcomm_Concierge — módulo Magento 1 / OpenMage

Prova vertical da Entrega 1 do [plano](../docs/superpowers/plans/2026-09-06-magento-concierge-carrinho-handoff.md):
a única capacidade que o SOAP nativo do Magento 1 não oferece é abrir, no navegador
do cliente, um carrinho (`quote`) montado pela API. Este módulo fecha só essa lacuna —
criar/ler/alterar itens do carrinho continua sendo feito pelos métodos SOAP nativos
(`shoppingCartCreate`, `shoppingCartProductAdd`, `shoppingCartInfo`, etc.), que já
existem e não precisam ser reimplementados.

## O que ele adiciona

- `POST /concierge/index/createLink` — recebe `quote_id` (form/query) e o header
  `X-Concierge-Secret`; devolve `{ url, expires_at }` com um código de recuperação
  de uso único.
- `GET /concierge/index/redeem?c=<codigo>` — página de confirmação. Não consome o
  código (preview de link do WhatsApp não pode gastar o link).
- `POST /concierge/index/redeem` (mesmo `c`) — valida o código, ativa o quote na
  sessão de checkout do navegador atual e redireciona para `checkout/cart`.

Tabela nova: `deskcomm_concierge_cart_recovery` (guarda hash do código, nunca o
código em si; expiração; timestamp de resgate).

## Fora de escopo nesta prova (ponytail — YAGNI até a Entrega 5 do plano)

- Fragmento de URL em vez de query string, CSRF/origin dedicado, rate limit próprio
  (a loja real já tem WAF/rate limit na frente) — endurecer antes de produção.
- Mesclar carrinho já existente no navegador do cliente.
- Revogação manual de código, UI de admin para o secret (troque
  `concierge/general/api_secret` direto em `core_config_data` por enquanto).
- Os 7 outros contratos da seção 5.1 do plano (capabilities, catálogo, purchase-options,
  mutações, cupom, frete) — não bloqueiam a prova do carrinho e ficam para as
  entregas seguintes.

## Instalar num Magento 1.9 / OpenMage

Copie (ou symlink) as duas árvores para a raiz da loja, preservando o caminho:

```
app/etc/modules/Deskcomm_Concierge.xml
app/code/community/Deskcomm/Concierge/...
```

Rode o installer do Magento (visita qualquer página admin, ou `bin/magento` equivalente
do OpenMage) para que o `install-0.1.0.php` crie a tabela. Defina o secret real:

```sql
INSERT INTO core_config_data (scope, scope_id, path, value)
VALUES ('default', 0, 'concierge/general/api_secret', '<secret forte>');
```

## Testar a prova vertical (Entrega 1, critério de saída)

1. Criar um quote e adicionar item via SOAP nativo (`shoppingCartCreate` +
   `shoppingCartProductAdd`) — usar `.context/magento_probe.py` como referência de
   cliente SOAP mínimo já validado contra a loja real.
2. `POST /concierge/index/createLink` com o `quote_id` retornado e o header do
   secret; guardar a `url`.
3. Abrir a `url` em navegador anônimo → confirma → deve cair em `checkout/cart`
   com o item presente.
4. Editar quantidade direto no site.
5. Reler o quote via `shoppingCartInfo` (SOAP) e confirmar que a edição do site
   aparece — prova que o Magento continua sendo a fonte única de verdade.

Ambiente de dev descartável (não faz parte deste repo, é infraestrutura de teste):
OpenMage oficial via Docker, ver `docs/testing/user-journey-map.md` para o registro
desta jornada quando o teste rodar de ponta a ponta.
