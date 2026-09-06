<?php
/**
 * Prova vertical (plano seção 4.3 item 1 / 5.2): a única lacuna que o SOAP nativo
 * não cobre é abrir, no navegador do cliente, um quote montado pela API.
 * createLinkAction fecha esse link; redeemAction o resgata.
 *
 * ⚠️ `loadByIdWithoutStore()`, NUNCA `load()` puro, para carregar o quote pelo
 * ID. Achado ao instalar na loja real (2026-09-06): `shoppingCartCreate` via
 * SOAP sem `store` explícito grava `store_id=0`; `Mage_Sales_Model_Resource_Quote::
 * _getLoadSelect()` filtra `WHERE store_id IN (getSharedStoreIds())` num `load()`
 * comum — que NUNCA inclui 0 — e a query vira `WHERE store_id < 0` (zero linhas,
 * de propósito, é o comportário documentado do próprio core pra "sem escopo
 * compartilhado"). O quote existe, mas `load()` nunca o acha. O próprio
 * `Mage_Checkout_Model_Session::getQuote()` já evita essa armadilha assim
 * quando `_loadInactive` é falso — é o mesmo remédio, aplicado aqui.
 *
 * Fora de escopo NESTA prova (ponytail — YAGNI até a Entrega 5 do plano):
 * mesclar carrinho já existente no navegador, revogação manual de código,
 * rate limit dedicado (a frente já tem WAF/rate limit da loja) e UI de admin
 * para o secret (troque `concierge/general/api_secret` via core_config_data).
 */
class Deskcomm_Concierge_IndexController extends Mage_Core_Controller_Front_Action
{
    /** Machine-to-machine: o CRM pede um link de recuperação para um quote que já existe. */
    public function createLinkAction()
    {
        if (!$this->getRequest()->isPost()) {
            $this->getResponse()->setHttpResponseCode(405);
            return;
        }

        $expected = (string) Mage::getStoreConfig('concierge/general/api_secret');
        $provided = (string) $this->getRequest()->getHeader('X-Concierge-Secret');
        if ($expected === '' || $expected === 'changeme-set-a-real-secret' || !hash_equals($expected, $provided)) {
            $this->_jsonResponse(401, ['error' => 'unauthorized']);
            return;
        }

        $quoteId = (int) $this->getRequest()->getParam('quote_id');
        $quote = Mage::getModel('sales/quote')->loadByIdWithoutStore($quoteId);
        if (!$quote->getId()) {
            $this->_jsonResponse(404, ['error' => 'quote_not_found']);
            return;
        }

        $ttl = (int) Mage::getStoreConfig('concierge/general/link_ttl_seconds');
        $code = bin2hex(random_bytes(24));

        /** @var Deskcomm_Concierge_Model_Recovery $recovery */
        $recovery = Mage::getModel('deskcomm_concierge/recovery');
        $recovery->setQuoteId($quote->getId())
            ->setStoreId((int) $quote->getStoreId())
            ->setCodeHash(hash('sha256', $code))
            ->setExpiresAt(date('Y-m-d H:i:s', time() + max(60, $ttl)))
            ->save();

        $this->_jsonResponse(200, [
            'url'        => Mage::getUrl('concierge/index/redeem', ['_query' => ['c' => $code]]),
            'expires_at' => $recovery->getExpiresAt(),
        ]);
    }

    /**
     * Landing pública. GET só mostra o botão de confirmação e NÃO consome o
     * código (preview do WhatsApp não pode gastar o link). POST resgata.
     */
    public function redeemAction()
    {
        $code = (string) $this->getRequest()->getParam('c');
        if ($code === '') {
            $this->_textResponse(400, 'Link invalido.');
            return;
        }

        if (!$this->getRequest()->isPost()) {
            $this->_textResponse(200, $this->_confirmPageHtml($code));
            return;
        }

        $hash = hash('sha256', $code);
        /** @var Deskcomm_Concierge_Model_Resource_Recovery_Collection $collection */
        $recovery = Mage::getModel('deskcomm_concierge/recovery')->getCollection()
            ->addFieldToFilter('code_hash', $hash)
            ->getFirstItem();

        if (!$recovery->getId() || $recovery->isRedeemed() || $recovery->isExpired()) {
            $this->_textResponse(410, 'Este link expirou ou ja foi usado.');
            return;
        }

        $quote = Mage::getModel('sales/quote')->loadByIdWithoutStore($recovery->getQuoteId());
        if (!$quote->getId()) {
            $this->_textResponse(404, 'Carrinho nao encontrado.');
            return;
        }

        $quote->setIsActive(1)->save();

        $checkoutSession = Mage::getSingleton('checkout/session');
        $checkoutSession->setQuoteId($quote->getId());
        $checkoutSession->setLoadInactive(false);

        $recovery->setRedeemedAt(Mage::getSingleton('core/date')->gmtDate())->save();

        $this->_redirectUrl(Mage::getUrl('checkout/cart'));
    }

    private function _jsonResponse($code, array $payload)
    {
        $this->getResponse()
            ->setHttpResponseCode($code)
            ->setHeader('Content-Type', 'application/json', true)
            ->setHeader('Cache-Control', 'no-store', true)
            ->setBody(json_encode($payload));
    }

    private function _textResponse($code, $body)
    {
        $this->getResponse()
            ->setHttpResponseCode($code)
            ->setHeader('Cache-Control', 'no-store', true)
            ->setHeader('Referrer-Policy', 'no-referrer', true)
            ->setBody($body);
    }

    private function _confirmPageHtml($code)
    {
        $action = htmlspecialchars(Mage::getUrl('concierge/index/redeem'), ENT_QUOTES);
        $c = htmlspecialchars($code, ENT_QUOTES);
        return <<<HTML
<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<title>Seu carrinho</title></head><body>
<form method="post" action="{$action}">
<input type="hidden" name="c" value="{$c}">
<button type="submit">Abrir meu carrinho</button>
</form></body></html>
HTML;
    }
}
