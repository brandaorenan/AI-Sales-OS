<?php
/**
 * Recovery code that maps to a Magento quote so a checkout link can reopen
 * a cart assembled by the CRM concierge in the customer's own browser.
 */
class Deskcomm_Concierge_Model_Recovery extends Mage_Core_Model_Abstract
{
    protected function _construct()
    {
        $this->_init('deskcomm_concierge/recovery');
    }

    public function isExpired()
    {
        return strtotime((string) $this->getExpiresAt()) < time();
    }

    public function isRedeemed()
    {
        return (bool) $this->getRedeemedAt();
    }
}
