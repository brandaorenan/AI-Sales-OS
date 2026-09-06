<?php
/**
 * Harness de integração da Entrega 1 (prova vertical do carrinho).
 * Roda DENTRO do container `cli` do OpenMage (não precisa do módulo instalado
 * para esta parte — só cria produto + quote nativos, como o SOAP faria):
 *
 *   docker compose run --rm cli php /var/www/html/../magento-module/dev/fixture.php
 *
 * (ajuste o path conforme onde você montar este arquivo; ou copie para dentro
 * do checkout do OpenMage antes de rodar).
 *
 * Sessão precisa existir ANTES de Mage::app() porque Mage_Sales_Model_Quote
 * consulta a sessão de moeda ao salvar, e o SAPI cli não abre sessão sozinho.
 */
session_save_path(sys_get_temp_dir());
session_id('deskcomm_concierge_fixture');
@session_start();

$_SERVER['HTTP_HOST']    = getenv('MAGE_HOST') ?: 'openmage-7f000001.nip.io';
$_SERVER['SERVER_PORT']  = '80';
$_SERVER['REQUEST_URI']  = '/';
$_SERVER['SCRIPT_NAME']  = '/index.php';
$_SERVER['MAGE_RUN_CODE'] = 'default';
$_SERVER['MAGE_RUN_TYPE'] = 'store';

require '/var/www/html/app/Mage.php';
umask(0);
Mage::app('default', 'store');

$sku = 'CONCIERGE-TEST-001';
$product = Mage::getModel('catalog/product')->loadByAttribute('sku', $sku);
if (!$product || !$product->getId()) {
    $product = Mage::getModel('catalog/product');
    $product->setTypeId('simple')
        ->setAttributeSetId(4)
        ->setWebsiteIds([1])
        ->setName('Sianinha Teste Concierge')
        ->setSku($sku)
        ->setPrice(19.90)
        ->setWeight(1)
        ->setStatus(1)
        ->setVisibility(4)
        ->setTaxClassId(0)
        ->setStockData(['use_config_manage_stock' => 1, 'is_in_stock' => 1, 'qty' => 100]);
    $product->save();
}

$quote = Mage::getModel('sales/quote')->setStoreId(1);
$quote->save();
$quote->addProduct(Mage::getModel('catalog/product')->setStoreId(1)->load($product->getId()), 2);
$quote->collectTotals()->save();

fwrite(STDOUT, json_encode([
    'product_id' => (int) $product->getId(),
    'quote_id'   => (int) $quote->getId(),
    'items_qty'  => (float) $quote->getItemsQty(),
]) . PHP_EOL);
