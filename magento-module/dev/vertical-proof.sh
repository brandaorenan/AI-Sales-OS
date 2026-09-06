#!/usr/bin/env bash
# Prova vertical da Entrega 1 (plano seção 11.1 / 12.2, itens 1-4 e 7):
# cria quote+item nativos, emite link, resgata em "navegador anônimo",
# edita no site, relê — falha se qualquer passo não bater.
#
# Uso: MAGE_BASE_URL=http://openmage-7f000001.nip.io:8180 \
#      CONCIERGE_SECRET=<o mesmo valor de concierge/general/api_secret> \
#      ./vertical-proof.sh
set -euo pipefail

BASE_URL="${MAGE_BASE_URL:?defina MAGE_BASE_URL, ex: http://openmage-7f000001.nip.io:8180}"
SECRET="${CONCIERGE_SECRET:?defina CONCIERGE_SECRET com o valor de concierge/general/api_secret}"
HOST_HEADER="$(echo "$BASE_URL" | sed -E 's#https?://##; s#/.*##; s#:.*##')"
CJ="$(mktemp)"

fail() { echo "FALHOU: $1" >&2; exit 1; }

echo "==> Criando produto + quote nativos (equivalente a catalogProductInfo/shoppingCartCreate/Add)"
FIXTURE=$(docker compose -f "$(dirname "$0")/../../.context/magento-lts-dev/dev/openmage/docker-compose.yml" \
  run --rm -T -e MAGE_HOST="$HOST_HEADER" cli php /var/www/html/dev-fixture.php 2>/dev/null | tail -1) \
  || fail "fixture.php não rodou (copie dev/fixture.php para a raiz do OpenMage como dev-fixture.php)"
QUOTE_ID=$(echo "$FIXTURE" | python3 -c 'import json,sys; print(json.load(sys.stdin)["quote_id"])')
echo "    quote_id=$QUOTE_ID"

echo "==> createLink"
LINK=$(curl -sf -X POST -H "Host: $HOST_HEADER" -H "X-Concierge-Secret: $SECRET" \
  "$BASE_URL/concierge/index/createLink?quote_id=$QUOTE_ID") || fail "createLink"
CODE=$(echo "$LINK" | python3 -c 'import json,sys; print(json.load(sys.stdin)["url"].split("c=")[1])')
echo "    code=$CODE"

echo "==> GET não deve consumir o código"
curl -sf -H "Host: $HOST_HEADER" "$BASE_URL/concierge/index/redeem/?c=$CODE" >/dev/null || fail "GET redeem"

echo "==> POST resgata e deve redirecionar para checkout/cart"
LOCATION=$(curl -s -o /dev/null -D - -c "$CJ" -H "Host: $HOST_HEADER" -X POST --data "c=$CODE" \
  "$BASE_URL/concierge/index/redeem/" | grep -i '^location:' | tr -d '\r')
echo "$LOCATION" | grep -q "checkout/cart" || fail "redeem não redirecionou para checkout/cart (got: $LOCATION)"

echo "==> Reuso do mesmo código deve falhar (410)"
STATUS=$(curl -s -o /dev/null -w '%{http_code}' -H "Host: $HOST_HEADER" -X POST --data "c=$CODE" "$BASE_URL/concierge/index/redeem/")
[ "$STATUS" = "410" ] || fail "reuso do código deveria dar 410, deu $STATUS"

echo "==> Cart no navegador deve mostrar o item"
curl -sf -b "$CJ" -H "Host: $HOST_HEADER" "$BASE_URL/checkout/cart/" -o /tmp/concierge-cart.html
grep -q "Sianinha Teste Concierge" /tmp/concierge-cart.html || fail "produto não apareceu no carrinho do navegador"

echo "OK — prova vertical da Entrega 1 passou."
rm -f "$CJ"
