<?php
class Deskcomm_Concierge_Model_Resource_Recovery extends Mage_Core_Model_Resource_Db_Abstract
{
    protected function _construct()
    {
        $this->_init('deskcomm_concierge/recovery', 'recovery_id');
    }
}
