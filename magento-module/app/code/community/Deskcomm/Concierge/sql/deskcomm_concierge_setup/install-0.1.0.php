<?php
/** @var Mage_Core_Model_Resource_Setup $installer */
$installer = $this;
$installer->startSetup();

$table = $installer->getConnection()
    ->newTable($installer->getTable('deskcomm_concierge/recovery'))
    ->addColumn('recovery_id', Varien_Db_Ddl_Table::TYPE_INTEGER, null, [
        'identity' => true,
        'unsigned' => true,
        'nullable' => false,
        'primary'  => true,
    ], 'Recovery ID')
    ->addColumn('quote_id', Varien_Db_Ddl_Table::TYPE_INTEGER, null, [
        'unsigned' => true,
        'nullable' => false,
    ], 'Quote ID')
    ->addColumn('store_id', Varien_Db_Ddl_Table::TYPE_SMALLINT, null, [
        'unsigned' => true,
        'nullable' => false,
    ], 'Store ID')
    ->addColumn('code_hash', Varien_Db_Ddl_Table::TYPE_TEXT, 64, [
        'nullable' => false,
    ], 'SHA-256 of the recovery code, never the code itself')
    ->addColumn('expires_at', Varien_Db_Ddl_Table::TYPE_DATETIME, null, [
        'nullable' => false,
    ], 'Expiration')
    ->addColumn('redeemed_at', Varien_Db_Ddl_Table::TYPE_DATETIME, null, [
        'nullable' => true,
    ], 'Redemption timestamp, null while unused')
    ->addColumn('created_at', Varien_Db_Ddl_Table::TYPE_TIMESTAMP, null, [
        'nullable' => false,
        'default'  => Varien_Db_Ddl_Table::TIMESTAMP_INIT,
    ], 'Created at')
    ->addIndex(
        $installer->getIdxName('deskcomm_concierge/recovery', ['code_hash']),
        ['code_hash'],
        ['type' => Varien_Db_Adapter_Interface::INDEX_TYPE_UNIQUE]
    )
    ->addIndex(
        $installer->getIdxName('deskcomm_concierge/recovery', ['quote_id']),
        ['quote_id']
    )
    ->setComment('Deskcomm Concierge — cart recovery codes');

$installer->getConnection()->createTable($table);

$installer->endSetup();
