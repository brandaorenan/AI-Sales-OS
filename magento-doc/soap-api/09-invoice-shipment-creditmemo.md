# SOAP API — Invoices, Shipments & Credit Memos

> Invoice create/capture/cancel, shipment create/tracking/comments, credit memo create/cancel.

---

## Sales Order Invoice

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderInvoice/salesOrderInvoice.html>*

### Module: Mage_Sales

The Mage_Sales module allows you to manage sales orders, invoices, shipments, and credit memos.

##### Invoice

Allows you to manage invoices.

**Resource Name**: sales_order_invoice

**Aliases**:

- order_invoice

**Methods**:

- [sales_order_invoice.list](sales_order_invoice.list.html "sales_order_invoice.list") - Retrieve a list of invoices using filters
- [sales_order_invoice.info](sales_order_invoice.info.html "sales_order_invoice.info") - Retrieve information about the invoice
- [sales_order_invoice.create](sales_order_invoice.create.html "sales_order_invoice.create") - Create a new invoice for an order
- [sales_order_invoice.addComment](sales_order_invoice.addComment.html "sales_order_invoice.addComment") - Add a new comment to an invoice
- [sales_order_invoice.capture](sales_order_invoice.capture.html "sales_order_invoice.capture") - Capture an invoice
- [sales_order_invoice.cancel](sales_order_invoice.cancel.html "sales_order_invoice.cancel") - Cancel an invoice

##### Faults

| Fault Code | Fault Message                                    |
|------------|--------------------------------------------------|
| 100        | Requested shipment does not exists.              |
| 101        | Invalid filters given. Details in error message. |
| 102        | Invalid data given. Details in error message.    |
| 103        | Requested order does not exists                  |
| 104        | Invoice status not changed.                      |

##### Examples

###### Example 1. Basic working with invoices.
```
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$notInvoicedOrderId  = '100000003';

// Create new invoice
$newInvoiceId = $proxy->call($sessionId, 'sales_order_invoice.create', array($notInvoicedOrderId, array(), 'Invoice Created', true, true));

// View new invoice
$invoice = $proxy->call($sessionId, 'sales_order_invoice.info', $newInvoiceId);

var_dump($invoice);

// Add Comment
$proxy->call($sessionId, 'sales_order_invoice.addComment', array($newInvoiceId, 'Invoice comment, some text', true, false));

// View invoice with new comment
$invoice = $proxy->call($sessionId, 'sales_order_invoice.info', $newInvoiceId);

var_dump($invoice);

$proxy->call($sessionId, 'sales_order_invoice.capture', $newInvoiceId);

// View captured invoice
$invoice = $proxy->call($sessionId, 'sales_order_invoice.info', $newInvoiceId);
var_dump($invoice);
```

---

## sales_order_invoice.list — Invoice List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderInvoice/sales_order_invoice.list.html>*

### Module: Mage_Sales

##### Resource: sales_order_invoice

**Aliases**:

- order_invoice

###### Method:

- sales_order_invoice.list (SOAP V1)
- salesOrderInvoiceList (SOAP V2)

Allows you to retrieve the list of order invoices. Additional filters can also be applied.

**Aliases**:

- order_invoice.list

**Arguments**:

| Type   | Name      | Description                                          |
|--------|-----------|------------------------------------------------------|
| string | sessionId | Session ID                                           |
| array  | filters   | Array of filters for the list of invoices (optional) |

**Returns**:

| Type  | Name   | Description                      |
|-------|--------|----------------------------------|
| array | result | Array of salesOrderInvoiceEntity |

The **salesOrderInvoiceEntity** content is as follows:

| Type   | Name                | Description                     |
|--------|---------------------|---------------------------------|
| string | increment_id        | Increment ID                    |
| string | created_at          | Date of invoice creation        |
| string | order_currency_code | Order currency code (e.g., EUR) |
| string | order_id            | Order ID                        |
| string | state               | Order state                     |
| string | grand_total         | Grand total amount invoiced     |
| string | invoice_id          | Invoice ID                      |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'sales_order_invoice.list');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2 (List of All Invoices)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->salesOrderInvoiceList($sessionId);
var_dump($result);
```
###### Request Example SOAP V2 (Complex Filter)
```php
$client = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

// If some stuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');
$complexFilter = array(
    'complex_filter' => array(
        array(
            'key' => 'state',
            'value' => array('key' => 'in', 'value' => '2,3')
        )
    )
);
$result = $client->salesOrderInvoiceList($session, $complexFilter);

var_dump ($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->salesOrderInvoiceList((object)array('sessionId' => $sessionId->result));   
var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'order_id' => string '2' (length=1)
      'increment_id' => string '200000001' (length=9)
      'created_at' => string '2012-03-30 12:02:19' (length=19)
      'state' => string '2' (length=1)
      'grand_total' => string '384.9800' (length=8)
      'order_currency_code' => string 'USD' (length=3)
      'invoice_id' => null
  1 =>
    array
      'order_id' => string '3' (length=1)
      'increment_id' => string '200000002' (length=9)
      'created_at' => string '2012-03-30 12:06:20' (length=19)
      'state' => string '2' (length=1)
      'grand_total' => string '339.9900' (length=8)
      'order_currency_code' => string 'USD' (length=3)
      'invoice_id' => null
```

---

## sales_order_invoice.info — Invoice Info

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderInvoice/sales_order_invoice.info.html>*

### Module: Mage_Sales

##### Resource: sales_order_invoice

**Aliases**:

- order_invoice

###### Method:

- sales_order_invoice.info (SOAP V1)
- salesOrderInvoiceInfo (SOAP V2)

Allows you to retrieve information about the required invoice.

**Aliases**:

- order_invoice.info

**Arguments**:

| Type   | Name               | Description          |
|--------|--------------------|----------------------|
| string | sessionId          | Session ID           |
| string | invoiceIncrementId | Invoice increment ID |

**Returns**:

| Type  | Name   | Description                      |
|-------|--------|----------------------------------|
| array | result | Array of salesOrderInvoiceEntity |

The **salesOrderInvoiceEntity** content is as follows:

| Type   | Name                 | Description                             |
|--------|----------------------|-----------------------------------------|
| string | increment_id         | Increment ID                            |
| string | parent_id            | Parent ID                               |
| string | store_id             | Store ID                                |
| string | created_at           | Date of creation                        |
| string | updated_at           | Date of updating                        |
| string | is_active            | Defines whether the invoice is active   |
| string | global_currency_code | Global currency code                    |
| string | base_currency_code   | Base currency code                      |
| string | store_currency_code  | Store currency code                     |
| string | order_currency_code  | Order currency code                     |
| string | store_to_base_rate   | Store to base rate                      |
| string | store_to_order_rate  | Store to order rate                     |
| string | base_to_global_rate  | Base to global rate                     |
| string | base_to_order_rate   | Base to order rate                      |
| string | subtotal             | Subtotal                                |
| string | base_subtotal        | Base subtotal                           |
| string | base_grand_total     | Base grand total                        |
| string | discount_amount      | Discount amount                         |
| string | base_discount_amount | Base discount amount                    |
| string | shipping_amount      | Shipping amount                         |
| string | base_shipping_amount | Base shipping amount                    |
| string | tax_amount           | Tax amount                              |
| string | base_tax_amount      | Base tax amount                         |
| string | billing_address_id   | Billing address ID                      |
| string | billing_firstname    | First name in the billing address       |
| string | billing_lastname     | Last name in the billing address        |
| string | order_id             | Order ID                                |
| string | order_increment_id   | Order increment ID                      |
| string | order_created_at     | Date of order creation                  |
| string | state                | Order state                             |
| string | grand_total          | Grand total                             |
| string | invoice_id           | Invoice ID                              |
| array  | items                | Array of salesOrderInvoiceItemEntity    |
| array  | comments             | Array of salesOrderInvoiceCommentEntity |

The **salesOrderInvoiceItemEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | increment_id | Increment ID |
| string | parent_id | Parent ID |
| string | created_at | Date of creation |
| string | updated_at | Date of updating |
| string | is_active | Active flag |
| string | weee_tax_applied | Applied fixed product tax |
| string | qty | Quantity |
| string | cost | Cost |
| string | price | Price |
| string | tax_amount | Tax amount |
| string | row_total | Row total |
| string | base_price | Base price |
| string | base_tax_amount | Base tax amount |
| string | base_row_total | Base row total |
| string | base_weee_tax_applied_amount | Applied fixed product tax amount (in base currency) |
| string | base_weee_tax_applied_row_amount | Applied fixed product tax row amount (in base currency) |
| string | weee_tax_applied_amount | Applied fixed product tax amount |
| string | weee_tax_applied_row_amount | Applied fixed product tax row amount |
| string | weee_tax_disposition | Fixed product tax disposition |
| string | weee_tax_row_disposition | Fixed product tax row disposition |
| string | base_weee_tax_disposition | Fixed product tax disposition (in base currency) |
| string | base_weee_tax_row_disposition | Fixed product tax row disposition (in base currency) |
| string | sku | SKU |
| string | name | Name |
| string | order_item_id | Order item ID |
| string | product_id | Product ID |
| string | item_id | Item ID |

The **salesOrderInvoiceCommentEntity** content is as follows:

| Type   | Name                 | Description                              |
|--------|----------------------|------------------------------------------|
| string | increment_id         | Increment ID                             |
| string | parent_id            | Parent ID                                |
| string | created_at           | Date of creation                         |
| string | updated_at           | Date of updating                         |
| string | is_active            | Active flag                              |
| string | comment              | Invoice comment                          |
| string | is_customer_notified | Defines whether the customer is notified |
| string | comment_id           | Comment ID                               |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'sales_order_invoice.info', '200000006');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->salesOrderInvoiceInfo($sessionId, '200000006');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->salesOrderInvoiceInfo((object)array('sessionId' => $sessionId->result, 'invoiceIncrementId' => '200000006'));   
var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  'store_id' => string '2' (length=1)
  'base_grand_total' => string '384.9800' (length=8)
  'shipping_tax_amount' => string '0.0000' (length=6)
  'tax_amount' => string '0.0000' (length=6)
  'base_tax_amount' => string '0.0000' (length=6)
  'store_to_order_rate' => string '1.0000' (length=6)
  'base_shipping_tax_amount' => string '0.0000' (length=6)
  'base_discount_amount' => string '0.0000' (length=6)
  'base_to_order_rate' => string '1.0000' (length=6)
  'grand_total' => string '384.9800' (length=8)
  'shipping_amount' => string '5.0000' (length=6)
  'subtotal_incl_tax' => string '379.9800' (length=8)
  'base_subtotal_incl_tax' => string '379.9800' (length=8)
  'store_to_base_rate' => string '1.0000' (length=6)
  'base_shipping_amount' => string '5.0000' (length=6)
  'total_qty' => string '1.0000' (length=6)
  'base_to_global_rate' => string '1.0000' (length=6)
  'subtotal' => string '379.9800' (length=8)
  'base_subtotal' => string '379.9800' (length=8)
  'discount_amount' => string '0.0000' (length=6)
  'billing_address_id' => string '3' (length=1)
  'is_used_for_refund' => null
  'order_id' => string '2' (length=1)
  'email_sent' => null
  'can_void_flag' => string '0' (length=1)
  'state' => string '2' (length=1)
  'shipping_address_id' => string '4' (length=1)
  'store_currency_code' => string 'USD' (length=3)
  'transaction_id' => null
  'order_currency_code' => string 'USD' (length=3)
  'base_currency_code' => string 'USD' (length=3)
  'global_currency_code' => string 'USD' (length=3)
  'increment_id' => string '200000006' (length=9)
  'created_at' => string '2012-03-30 12:02:19' (length=19)
  'updated_at' => string '2012-03-30 12:02:19' (length=19)
  'hidden_tax_amount' => string '0.0000' (length=6)
  'base_hidden_tax_amount' => string '0.0000' (length=6)
  'shipping_hidden_tax_amount' => string '0.0000' (length=6)
  'base_shipping_hidden_tax_amnt' => null
  'shipping_incl_tax' => string '5.0000' (length=6)
  'base_shipping_incl_tax' => string '5.0000' (length=6)
  'base_total_refunded' => null
  'cybersource_token' => null
  'invoice_id' => string '1' (length=1)
  'order_increment_id' => string '200000002' (length=9)
  'items' =>
    array
      0 =>
        array
          'parent_id' => string '1' (length=1)
          'base_price' => string '379.9800' (length=8)
          'tax_amount' => string '0.0000' (length=6)
          'base_row_total' => string '379.9800' (length=8)
          'discount_amount' => null
          'row_total' => string '379.9800' (length=8)
          'base_discount_amount' => null
          'price_incl_tax' => string '379.9800' (length=8)
          'base_tax_amount' => string '0.0000' (length=6)
          'base_price_incl_tax' => string '379.9800' (length=8)
          'qty' => string '1.0000' (length=6)
          'base_cost' => null
          'price' => string '379.9800' (length=8)
          'base_row_total_incl_tax' => string '379.9800' (length=8)
          'row_total_incl_tax' => string '379.9800' (length=8)
          'product_id' => string '1' (length=1)
          'order_item_id' => string '3' (length=1)
          'additional_data' => null
          'description' => null
          'sku' => string 'n2610-slider' (length=12)
          'name' => string 'Nokia 2610 Phone' (length=16)
          'hidden_tax_amount' => string '0.0000' (length=6)
          'base_hidden_tax_amount' => string '0.0000' (length=6)
          'base_weee_tax_applied_amount' => string '0.0000' (length=6)
          'base_weee_tax_applied_row_amnt' => string '0.0000' (length=6)
          'base_weee_tax_applied_row_amount' => string '0.0000' (length=6)
          'weee_tax_applied_amount' => string '0.0000' (length=6)
          'weee_tax_applied_row_amount' => string '0.0000' (length=6)
          'weee_tax_applied' => string 'a:0:{}' (length=6)
          'weee_tax_disposition' => string '0.0000' (length=6)
          'weee_tax_row_disposition' => string '0.0000' (length=6)
          'base_weee_tax_disposition' => string '0.0000' (length=6)
          'base_weee_tax_row_disposition' => string '0.0000' (length=6)
          'item_id' => string '1' (length=1)
  'comments' =>
    array
      empty
```

---

## sales_order_invoice.create — Invoice Create

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderInvoice/sales_order_invoice.create.html>*

### Module: Mage_Sales

##### Resource: sales_order_invoice

**Aliases**:

- order_invoice

###### Method:

- sales_order_invoice.create (SOAP V1)
- salesOrderInvoiceCreate (SOAP V2)

Allows you to create a new invoice for an order.

**Aliases**:

- order_invoice.create

**Arguments**:

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | invoiceIncrementId | Order increment ID |
| array | itemsQty | Array of orderItemIdQty (quantity of items to invoice) |
| string | comment | Invoice comment (optional) |
| string | email | Send invoice on email (optional) |
| string | includeComment | Include comments in email (optional) |

**Returns**:

| Type   | Description               |
|--------|---------------------------|
| string | ID of the created invoice |

The **orderItemIdQty** content is as follows:

| Type   | Name          | Description   |
|--------|---------------|---------------|
| int    | order_item_id | Order item ID |
| double | qty           | Quantity      |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call(
    $session,
    'sales_order_invoice.create',
    array('orderIncrementId' => '200000008', array('15' => '1', '16' => '1')) 
    // orderItemIdQty Array is Keyed with Order Item ID, with Value of qty to invoice
);
var_dump ($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

//Create invoice for order

// orderItemIdQty Array is Keyed with Order Item ID, with Value of qty to invoice
$qty = array('15' => '1', '16' => '1');

$invoiceIncrementId = $proxy->salesOrderInvoiceCreate(
    $sessionID,
    '200000008',
    $qty
);
var_dump($invoiceIncrementId);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->salesOrderInvoiceCreate((object)array('sessionId' => $sessionId->result, 'orderIncrementId' => '200000008', 'itemsQty' => array('15' => '1',  '16' => '1'), 'comment' => null,
'email' => null,
'includeComment' => null
));
var_dump($result->result);
```

---

## sales_order_invoice.capture — Invoice Capture

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderInvoice/sales_order_invoice.capture.html>*

### Module: Mage_Sales

##### Resource: sales_order_invoice

**Aliases**:

- order_invoice

###### Method:

- sales_order_invoice.capture (SOAP V1)
- salesOrderInvoiceCapture (SOAP V2)

Allows you to capture the required invoice. Note that not all order invoices can be captured. Only some payment methods support capturing the order invoice (e.g., PayPal Pro).

**Aliases**:

- order_invoice.capture

**Arguments**:

| Type   | Name               | Description          |
|--------|--------------------|----------------------|
| string | sessionId          | Session ID           |
| string | invoiceIncrementId | Invoice increment ID |

**Returns**:

| Type        | Description                                |
|-------------|--------------------------------------------|
| boolean\int | True (1) if the order invoice is captured. |

**Notes**:

You should check the invoice to see if it can be captured before attempting to capture the invoice. Otherwise, the API call will generate an error.

Invoices have states as defined in the model Mage_Sales_Model_Order_Invoice:

- STATE_OPEN = 1
- STATE_PAID = 2
- STATE_CANCELED = 3

Also note that there is a method call in the model that checks this for you - canCapture(). And it also verifies that the payment can be captured, so the invoice state might not be the only condition that is required to allow it to be captured.

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$orderIncrementId = '100000016';

//Create invoice for order
$invoiceIncrementId = $proxy->call(
    $session,
    'sales_order_invoice.create',
    array(
        'orderIncrementId' => $orderIncrementId,
        array('order_item_id' => '15', 'qty' => '1')
    )
);

//Capture invoice amount
$result = $proxy->call(
    $session,
    'sales_order_invoice.capture',
    $invoiceIncrementId
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');
$sessionID = $proxy->login('apiUser', 'apiKey');

$orderIncrementId = '100000016';

//Create invoice for order
$qty = array(
    array('order_item_id' => '15', 'qty' => '1')
);
$invoiceIncrementId = $proxy->salesOrderInvoiceCreate(
     $sessionID,
     $orderIncrementId,
     $qty);

//Capture invoice amount
$result = $proxy->salesOrderInvoiceCapture(
     $sessionID,
     $invoiceIncrementId
);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->salesOrderInvoiceCapture((object)array('sessionId' => $sessionId->result, 'invoiceIncrementId' => '100000016'));   

var_dump($result->result);
```

---

## sales_order_invoice.cancel — Invoice Cancel

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderInvoice/sales_order_invoice.cancel.html>*

### Module: Mage_Sales

##### Resource: sales_order_invoice

**Aliases**:

- order_invoice

###### Method:

- sales_order_invoice.cancel (SOAP V1)
- salesOrderInvoiceCancel (SOAP V2)

Allows you to cancel the required invoice. Note that not all order invoices can be canceled. Only some payment methods support canceling the order invoice (e.g., Google Checkout, PayPal Pro, PayPal Express Checkout).

**Aliases**:

- order_invoice.cancel

**Arguments**:

| Type   | Name               | Description          |
|--------|--------------------|----------------------|
| string | sessionId          | Session ID           |
| string | invoiceIncrementId | Invoice increment ID |

**Returns**:

| Type    | Description                            |
|---------|----------------------------------------|
| boolean | True if the order invoice is canceled. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$invoiceIncrementId = '100000013';

$result = $proxy->call(
    $session,
    'sales_order_invoice.cancel',
    $invoiceIncrementId
);
```

---

## sales_order_invoice.addComment — Add Comment

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderInvoice/sales_order_invoice.addComment.html>*

### Module: Mage_Sales

##### Resource: sales_order_invoice

**Aliases**:

- order_invoice

###### Method:

- sales_order_invoice.addComment (SOAP V1)
- salesOrderInvoiceAddComment (SOAP V2)

Allows you to add a new comment to the order invoice.

**Aliases**:

- order_invoice.addComment

**Arguments**:

| Type   | Name               | Description                              |
|--------|--------------------|------------------------------------------|
| string | sessionId          | Session ID                               |
| string | invoiceIncrementId | Invoice increment ID                     |
| string | comment            | Invoice comment (optional)               |
| int    | email              | Send invoice on email flag (optional)    |
| int    | includeComment     | Include comment in email flag (optional) |

**Returns**:

| Type    | Description                                 |
|---------|---------------------------------------------|
| boolean | True if the comment is added to the invoice |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apikey');

$result = $client->call($session, 'sales_order_invoice.addComment', array('invoiceIncrementId' => '200000006', 'comment' => 'invoice comment'));
var_dump ($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->salesOrderInvoiceAddComment($sessionId, '200000006');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->salesOrderInvoiceAddComment((object)array('sessionId' => $sessionId->result, 'invoiceIncrementId' => '200000006', 'comment' => 'invoice comment', 'email' => null, 'includeComment' => null));   
var_dump($result->result);
```

---

## Sales Order Shipment

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderShipment/salesOrderShipment.html>*

### Module: Mage_Sales

The Mage_Sales module allows you to manage sales orders, invoices, shipments, and credit memos.

##### Shipment

Allows you to manage shipments and tracking numbers.

**Resource Name**: sales_order_shipment

**Aliases**:

- order_shipment

**Methods**:

- [sales_order_shipment.list](sales_order_shipment.list.html "sales_order_shipment.list") - Retrieve a list of shipments using filters
- [sales_order_shipment.info](sales_order_shipment.info.html "sales_order_shipment.info") - Retrieve information about the shipment
- [sales_order_shipment.create](sales_order_shipment.create.html "sales_order_shipment.create") - Create a new shipment for an order
- [sales_order_shipment.addComment](sales_order_shipment.addComment.html "sales_order_shipment.addComment") - Add a new comment to a shipment
- [sales_order_shipment.addTrack](sales_order_shipment.addTrack.html "sales_order_shipment.addTrack") - Add a new tracking number to a shipment
- [sales_order_shipment.removeTrack](sales_order_shipment.removeTrack.html "sales_order_shipment.removeTrack") - Remove tracking number from a shipment
- [sales_order_shipment.getCarriers](sales_order_shipment.getCarriers.html "sales_order_shipment.getCarriers") - Retrieve a list of allowed carriers for an order

##### Faults

| Fault Code | Fault Message                                    |
|------------|--------------------------------------------------|
| 100        | Requested shipment not exists.                   |
| 101        | Invalid filters given. Details in error message. |
| 102        | Invalid data given. Details in error message.    |
| 103        | Requested order not exists.                      |
| 104        | Requested tracking not exists.                   |
| 105        | Tracking not deleted. Details in error message.  |

##### Examples

###### Example 1. Basic working with shipments
```
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$notShipedOrderId  = '100000003';

// Create new shipment
$newShipmentId = $proxy->call($sessionId, 'sales_order_shipment.create', array($notShipedOrderId, array(), 'Shipment Created', true, true));

// View new shipment
$shipment = $proxy->call($sessionId, 'sales_order_shipment.info', $newShipmentId);

var_dump($shipment);

// Get allowed carriers for shipping
$allowedCarriers = $proxy->call($sessionId, 'sales_order_shipment.getCarriers', $notShipedOrderId);

end($allowedCarriers);

$choosenCarrier = key($allowedCarriers);

var_dump($allowedCarriers);
var_dump($choosenCarrier);

// Add tracking
$newTrackId = $proxy->call($sessionId, 'sales_order_shipment.addTrack', array($newShipmentId, $choosenCarrier, 'My Track', rand(5000, 9000)));

$shipment = $proxy->call($sessionId, 'sales_order_shipment.info', $newShipmentId);

var_dump($shipment);
```

---

## sales_order_shipment.list — Shipment List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderShipment/sales_order_shipment.list.html>*

### Module: Mage_Sales

##### Resource: sales_order_shipment

**Aliases**:

- order_shipment

###### Method:

- sales_order_shipment.list (SOAP V1)
- salesOrderShipmentList (SOAP V2)

Allows you to retrieve the list of order shipments. Additional filters can be applied.

**Aliases**:

- order_shipment.list

**Arguments**:

| Type   | Name      | Description                                |
|--------|-----------|--------------------------------------------|
| string | sessionId | Session ID                                 |
| array  | filters   | Array of filters for the list of shipments |

Returns:

| Type  | Name   | Description                       |
|-------|--------|-----------------------------------|
| array | result | Array of salesOrderShipmentEntity |

The **salesOrderShipmentEntity** content is as follows:

| Type   | Name         | Description                     |
|--------|--------------|---------------------------------|
| string | increment_id | Increment ID                    |
| string | created_at   | Date of shipment creation       |
| string | total_qty    | Total quantity of items to ship |
| string | shipment_id  | Shipment ID                     |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'sales_order_shipment.list');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2 (List of All Shipments)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->salesOrderShipmentList($sessionId);
var_dump($result);
```
###### Request Example SOAP V2 (Complex Filter)
```php
$client = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

// If some stuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');
$complexFilter = array(
    'complex_filter' => array(
        array(
            'key' => 'created_at',
            'value' => array('key' => 'in', 'value' => '2012-03-30 12:54:46')
        )
    )
);
$result = $client->salesOrderShipmentList($session, $complexFilter);

var_dump ($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->salesOrderShipmentList((object)array('sessionId' => $sessionId->result));   
var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'increment_id' => string '200000001' (length=9)
      'created_at' => string '2012-03-30 12:35:29' (length=19)
      'total_qty' => string '2.0000' (length=6)
      'shipment_id' => null
  1 =>
    array
      'increment_id' => string '200000002' (length=9)
      'created_at' => string '2012-03-30 12:54:46' (length=19)
      'total_qty' => string '1.0000' (length=6)
      'shipment_id' => null
```

---

## sales_order_shipment.info — Shipment Info

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderShipment/sales_order_shipment.info.html>*

### Module: Mage_Sales

##### Resource: sales_order_shipment

**Aliases**:

- order_shipment

###### Method:

- sales_order_shipment.info (SOAP V1)
- salesOrderShipmentInfo (SOAP V2)

Allows you to retrieve the shipment information.

**Aliases**:

- order_shipment.info

**Arguments**:

| Type   | Name                | Description                 |
|--------|---------------------|-----------------------------|
| string | sessionId           | Session ID                  |
| string | shipmentIncrementId | Order shipment increment ID |

**Returns**:

| Type  | Name   | Description                       |
|-------|--------|-----------------------------------|
| array | result | Array of salesOrderShipmentEntity |

The **salesOrderShipmentEntity** content is as follows:

| Type   | Name                | Description                              |
|--------|---------------------|------------------------------------------|
| string | increment_id        | Shipment increment ID                    |
| string | store_id            | Store ID                                 |
| string | created_at          | Date of shipment creation                |
| string | updated_at          | Date of shipment updating                |
| string | shipping_address_id | Shipping address ID                      |
| string | order_id            | Order ID                                 |
| string | total_qty           | Total quantity of items to ship          |
| string | shipment_id         | Shipment ID                              |
| array  | items               | Array of salesOrderShipmentItemEntity    |
| array  | tracks              | Array of salesOrderShipmentTrackEntity   |
| array  | comments            | Array of salesOrderShipmentCommentEntity |

The **salesOrderShipmentItemEntity** content is as follows:

| Type   | Name          | Description        |
|--------|---------------|--------------------|
| string | parent_id     | Parent ID          |
| string | sku           | Shipment item SKU  |
| string | name          | Shipment item name |
| string | order_item_id | Order item ID      |
| string | product_id    | Product ID         |
| string | weight        | Weight             |
| string | price         | Price              |
| string | qty           | Quantity of items  |
| string | item_id       | Item ID            |

The **salesOrderShipmentTrackEntity** content is as follows:

| Type   | Name         | Description                      |
|--------|--------------|----------------------------------|
| string | parent_id    | Parent ID                        |
| string | created_at   | Date of tracking number creation |
| string | updated_at   | Date of tracking number updating |
| string | carrier_code | Carrier code                     |
| string | title        | Track title                      |
| string | number       | Tracking number                  |
| string | order_id     | Order ID                         |
| string | track_id     | Track ID                         |

The **salesOrderShipmentCommentEntity** content is as follows:

| Type   | Name                 | Description                              |
|--------|----------------------|------------------------------------------|
| string | parent_id            | Parent ID                                |
| string | created_at           | Date of comment creation                 |
| string | comment              | Shipment comment text                    |
| string | is_customer_notified | Defines whether the customer is notified |
| string | comment_id           | Comment ID                               |

##### Examples

###### Request example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');
$session = $client->login('apiUser', 'apiKey');
$result = $client->call($session, 'sales_order_shipment.info', '200000003');
var_dump($result);
```
###### Request example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->salesOrderShipmentInfo($sessionId, '200000003');
var_dump($result);
```
###### Request example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->salesOrderShipmentInfo((object)array('sessionId' => $sessionId->result, 'shipmentIncrementId' => '200000003'));   
var_dump($result->result);
```

---

## sales_order_shipment.create — Shipment Create

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderShipment/sales_order_shipment.create.html>*

### Module: Mage_Sales

##### Resource: sales_order_shipment

**Aliases**:

- order_shipment

###### Method:

- sales_order_shipment.create (SOAP V1)
- salesOrderShipmentCreate (SOAP V2)

Allows you to create a new shipment for an order.

**Aliases**:

- order_shipment.create

**Arguments**:

| Type   | Name             | Description                              |
|--------|------------------|------------------------------------------|
| string | sessionId        | Session ID                               |
| string | orderIncrementId | Order increment ID                       |
| array  | itemsQty         | Array of orderItemIdQty (optional)       |
| string | comment          | Shipment comment (optional)              |
| int    | email            | Send email flag (optional)               |
| int    | includeComment   | Include comment in email flag (optional) |

**Returns**:

| Type   | Name                | Description           |
|--------|---------------------|-----------------------|
| string | shipmentIncrementId | Shipment increment ID |

The **orderItemIdQty** content is as follows:

| Type   | Name          | Description                     |
|--------|---------------|---------------------------------|
| int    | order_item_id | Order item ID                   |
| double | qty           | Quantity of items to be shipped |

**Notes**: The array of orderItemQty is used for partial shipment. To create shipment for all order items, you do not need to specify these attributes.

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');

$session = $proxy->login('apiUser', 'apiKey');

$orderIncrementId = '200000006';
$orderItemId = 3;
$qty = 5;
$itemsQty = array(
	$orderItemId => $qty,
    );

$result = $proxy->call(
    $session,
    'order_shipment.create',
    array(
        $orderIncrementId,
        $itemsQty
    )
);

var_dump ($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$itemsQty = array(
    array(
        'order_item_id' => 3,
        'qty' => 3
    ),
    array(
        'order_item_id' => 4,
        'qty' => 5
    ));

$result = $proxy->salesOrderShipmentCreate($sessionId, '200000006', $itemsQty, 'shipment comment');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 

$itemsQty = array(
    array(
        'order_item_id' => 3,
        'qty' => 3
    ),
    array(
        'order_item_id' => 4,
        'qty' => 5
    ));
 
$result = $proxy->salesOrderShipmentCreate((object)array(
    'sessionId' => $sessionId->result,
    'orderIncrementId' => '200000006',
    'itemsQty' => $itemsQty,
    'comment' => 'shipment comment',
    'email' => null, 'includeComment' => null));   
    
var_dump($result->result);
```

---

## sales_order_shipment.getCarriers — Shipment Get Carriers

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderShipment/sales_order_shipment.getCarriers.html>*

### Module: Mage_Sales

##### Resource: sales_order_shipment

**Aliases**:

- order_shipment

###### Method:

- sales_order_shipment.getCarriers (SOAP V1)
- salesOrderShipmentGetCarriers (SOAP V2)

Allows you to retrieve the list of allowed carriers for an order.

**Aliases**:

- order_shipment.getCarriers

**Arguments**:

| Type   | Name             | Description        |
|--------|------------------|--------------------|
| string | sessionId        | Session ID         |
| string | orderIncrementId | Order increment ID |

**Returns**:

| Type             | Name   | Description       |
|------------------|--------|-------------------|
| associativeArray | result | Array of carriers |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'sales_order_shipment.getCarriers', '200000010');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->salesOrderShipmentGetCarriers($sessionId, '200000010');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->salesOrderShipmentGetCarriers((object)array('sessionId' => $sessionId->result, 'orderIncrementId' => '200000010'));   
var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  'custom' => string 'Custom Value' (length=12)
  'dhl' => string 'DHL (Deprecated)' (length=16)
  'fedex' => string 'Federal Express' (length=15)
  'ups' => string 'United Parcel Service' (length=21)
  'usps' => string 'United States Postal Service' (length=28)
  'dhlint' => string 'DHL' (length=3)
```

---

## sales_order_shipment.addTrack — Shipment Add Track

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderShipment/sales_order_shipment.addTrack.html>*

### Module: Mage_Sales

##### Resource: sales_order_shipment

**Aliases**:

- order_shipment

###### Method:

- sales_order_shipment.addTrack (SOAP V1)
- salesOrderShipmentAddTrack (SOAP V2)

Allows you to add a new tracking number to the order shipment.

**Aliases**:

- order_shipment.addTrack

**Arguments**:

| Type   | Name                | Description                                     |
|--------|---------------------|-------------------------------------------------|
| string | sessionId           | Session ID                                      |
| string | shipmentIncrementId | Shipment increment ID                           |
| string | carrier             | Carrier code (ups, usps, dhl, fedex, or dhlint) |
| string | title               | Tracking title                                  |
| string | trackNumber         | Tracking number                                 |

**Returns**:

| Type | Description        |
|------|--------------------|
| int  | Tracking number ID |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'sales_order_shipment.addTrack', array('shipmentIncrementId' => '200000002', 'carrier' => 'ups', 'title' => 'tracking title', 'trackNumber' => '123123'));
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->salesOrderShipmentAddTrack($sessionId, '200000002', 'ups', 'tracking title', '123123');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->salesOrderShipmentAddTrack((object)array('sessionId' => $sessionId->result, 'shipmentIncrementId' => '200000002', 'carrier' => 'ups', 'title' => 'tracking title', 'trackNumber' => '123123'));   
var_dump($result->result);
```

---

## sales_order_shipment.removeTrack — Remove Track

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderShipment/sales_order_shipment.removeTrack.html>*

### Module: Mage_Sales

##### Resource: sales_order_shipment

**Aliases**:

- order_shipment

###### Method:

- sales_order_shipment.removeTrack (SOAP V1)
- salesOrderShipmentRemoveTrack (SOAP V2)

Allows you to remove a tracking number from the order shipment.

**Aliases**:

- order_shipment.removeTrack

**Arguments**:

| Type   | Name                | Description           |
|--------|---------------------|-----------------------|
| string | sessionId           | Session ID            |
| string | shipmentIncrementId | Shipment increment ID |
| string | trackId             | Track ID              |

**Returns**:

| Type        | Description                                                  |
|-------------|--------------------------------------------------------------|
| boolean\int | True (1) if the tracking number is removed from the shipment |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'sales_order_shipment.removeTrack', array('shipmentIncrementId' => '200000002', 'trackId' => '2'));
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->salesOrderShipmentRemoveTrack($sessionId, '200000002', '2');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->salesOrderShipmentRemoveTrack((object)array('sessionId' => $sessionId->result, 'shipmentIncrementId' => '200000002', 'trackId' => '2'));   
var_dump($result->result);
```

---

## sales_order_shipment.addComment — Shipment Add Comment

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderShipment/sales_order_shipment.addComment.html>*

### Module: Mage_Sales

##### Resource: sales_order_shipment

**Aliases**:

- order_shipment

###### Method:

- sales_order_shipment.addComment (SOAP V1)
- salesOrderShipmentAddComment (SOAP V2)

Allows you to add a new comment to the order shipment.

**Aliases**:

- order_shipment.addComment

**Arguments**:

| Type   | Name                | Description                              |
|--------|---------------------|------------------------------------------|
| string | sessionId           | Session ID                               |
| string | shipmentIncrementId | Shipment increment ID                    |
| string | comment             | Shipment comment (optional)              |
| string | email               | Send email flag (optional)               |
| string | includeInEmail      | Include comment in email flag (optional) |

**Returns**:

| Type        | Description                                            |
|-------------|--------------------------------------------------------|
| boolean\int | True (1) if the comment is added to the order shipment |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'sales_order_shipment.addComment', array('shipmentIncrementId' => '200000002', 'comment' => 'comment for the shipment', 'email' => null));
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->salesOrderShipmentAddComment($sessionId, '200000002');
var_dump($result);
```
###### Request Example SOAP V2 (WS- I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->salesOrderShipmentAddComment((object)array('sessionId' => $sessionId->result, 'shipmentIncrementId' => '200000002', 'comment' => 'comment for the shipment', 'email' => null, 'includeInEmail' => null));   
var_dump($result->result);
```

---

## Sales Order Credit Memo

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderCreditMemo/salesOrderCreditMemo.html>*

### Module: Sales_Order_Creditmemo

Allows you to operate with credit memos for orders.

##### Resource: sales_order_creditmemo

**Aliases**: order_creditmemo

###### Methods:

- [sales_order_creditmemo.list](sales_order_creditmemo.list.html "sales_order_creditmemo.list") - Retrieve the list of credit memos by filters
- [sales_order_creditmemo.info](sales_order_creditmemo.info.html "sales_order_creditmemo.info") - Retrieve the credit memo information
- [sales_order_creditmemo.create](sales_order_creditmemo.create.html "sales_order_creditmemo.create") - Create a new credit memo for order
- [sales_order_creditmemo.addComment](sales_order_creditmemo.addComment.html "sales_order_creditmemo.addComment") - Add a new comment to the credit memo
- [sales_order_creditmemo.cancel](sales_order_creditmemo.cancel.html "sales_order_creditmemo.cancel") - Cancel the credit memo

###### Faults:

| Fault Code | Fault Message |
|----|----|
| 100 | Requested credit memo does not exist. |
| 101 | Invalid filter given. Details in error message. |
| 102 | Invalid data given. Details in error message. |
| 103 | Requested order does not exist. |
| 104 | Credit memo status not changed. |
| 105 | Money can not be refunded to the store credit account as order was created by guest. |
| 106 | Credit memo for requested order can not be created. |

###### Example:
```
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

// Create creditmemo
$orderIncrementId = '100000683'; //increment id of the invoiced order
$data = array(
    'qtys' => array(
        '712' => 1
    ),
    'shipping_amount' => 3,
    'adjustment_positive' => 0.7,
    'adjustment_negative' => 0.06
);
$creditmemoIncrementId = $proxy->call($sessionId, 'order_creditmemo.create', array($orderIncrementId, $data));
echo $creditmemoIncrementId . "<br />";

// Add comment to created creditmemo
$commentText = "Credit memo comment successfully added";
$isCommentAdded = $proxy->call($sessionId, 'order_creditmemo.addComment', array($creditmemoIncrementId, $commentText, true));

// Retrieve information about created creditmemo
$creditmemoInfo = $proxy->call($sessionId, 'order_creditmemo.info', array($creditmemoIncrementId));
print_r($creditmemoInfo);

// Retrieve list of creditmemos by filter
$filter = array(
    'increment_id' => array(
        'or' => array(
            array(
                'from' => '100000617',
                'to' => '100000619',
            ),
            array(
                'from' => $creditmemoIncrementId,
                'to' => NULL,
            )
        )
    )
);
$creditmemoList = $proxy->call($sessionId, 'order_creditmemo.list', array($filter));
print_r($creditmemoList);
```

---

## sales_order_creditmemo.list — Memo List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderCreditMemo/sales_order_creditmemo.list.html>*

#### Module: Order Credit Memo API

##### Resource: sales_order_creditmemo

###### Aliases: order_creditmemo

###### Method:

- order_creditmemo.list (SOAP V1)
- salesOrderCreditmemoList (SOAP V2)

Allows you to retrieve the list of credit memos by filters.

**Arguments:**

| Type              | Name      | Description        |
|-------------------|-----------|--------------------|
| string            | sessionId | Session ID         |
| associative array | filters   | Filters (optional) |

**Return:**

| Type  | Name   | Description                         |
|-------|--------|-------------------------------------|
| array | result | Array of salesOrderCreditmemoEntity |

The **salesOrderCreditmemoEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | updated_at | Date of updating |
| string | created_at | Date of creation |
| string | increment_id | Increment ID |
| string | transaction_id | Transaction ID |
| string | global_currency_code | Global currency code |
| string | base_currency_code | Base currency code |
| string | order_currency_code | Order currency code |
| string | store_currency_code | Store currency code |
| string | cybersource_token | Cybersource token |
| string | invoice_id | ID of the invoice for which the credit memo was created |
| string | billing_address_id | Billing address ID |
| string | shipping_address_id | Shipping address ID |
| string | state | State |
| string | creditmemo_status | Credit memo status |
| string | email_sent | Defines whether the email is sent |
| string | order_id | ID of the order for which the credit memo was created |
| string | tax_amount | Tax amount |
| string | shipping_tax_amount | Shipping tax amount |
| string | base_tax_amount | Base tax amount |
| string | base_adjustment_positive | Adjustment refund amount (using base currency) |
| string | base_grand_total | Base grand total |
| string | adjustment | Adjustment |
| string | subtotal | Subtotal |
| string | discount_amount | Discount amount |
| string | base_subtotal | Base subtotal |
| string | base_adjustment | Base adjustment |
| string | base_to_global_rate | Base to global rate |
| string | store_to_base_rate | Store to base rate |
| string | base_shipping_amount | Base shipping amount |
| string | adjustment_negative | Adjustment fee amount |
| string | subtotal_incl_tax | Subtotal including tax |
| string | shipping_amount | Shipping amount |
| string | base_subtotal_incl_tax | Base subtotal including tax |
| string | base_adjustment_negative | Adjustment fee amount (using base currency) |
| string | grand_total | Grand total |
| string | base_discount_amount | Base discount amount |
| string | base_to_order_rate | Base to order rate |
| string | store_to_order_rate | Store to order rate |
| string | base_shipping_tax_amount | Base shipping tax amount |
| string | adjustment_positive | Adjustment refund amount |
| string | store_id | Store ID |
| string | hidden_tax_amount | Hidden tax amount |
| string | base_hidden_tax_amount | Base hidden tax amount |
| string | shipping_hidden_tax_amount | Shipping hidden tax amount |
| string | base_shipping_hidden_tax_amnt | Base shipping hidden tax amount |
| string | shipping_incl_tax | Shipping including tax |
| string | base_shipping_incl_tax | Base shipping including tax |
| string | base_customer_balance_amount | Base customer balance amount |
| string | customer_balance_amount | Customer balance amount |
| string | bs_customer_bal_total_refunded | Refunded base customer balance amount |
| string | customer_bal_total_refunded | Customer balance total refunded |
| string | base_gift_cards_amount | Base gift cards amount |
| string | gift_cards_amount | Gift cards amount |
| string | gw_base_price | Gift wrapping price refunded amount (using base currency) |
| string | gw_price | Gift wrapping price refunded amount |
| string | gw_items_base_price | Gift wrapping items base price |
| string | gw_items_price | Gift wrapping items price |
| string | gw_card_base_price | Gift wrapping card base price |
| string | gw_card_price | Gift wrapping card price |
| string | gw_base_tax_amount | Gift wrapping tax amount refunded (using base currency) |
| string | gw_tax_amount | Gift wrapping tax amount refunded |
| string | gw_items_base_tax_amount | Gift wrapping items base tax amount |
| string | gw_items_tax_amount | Gift wrapping items tax amount |
| string | gw_card_base_tax_amount | Gift wrapping card base tax amount |
| string | gw_card_tax_amount | Gift wrapping card tax amount |
| string | base_reward_currency_amount | Base reward currency amount |
| string | reward_currency_amount | Reward currency amount |
| string | reward_points_balance | Reward points balance |
| string | reward_points_balance_refund | Reward points balance refund |
| string | creditmemo_id | Credit memo ID |
| array | items | Array of salesOrderCreditmemoItemEntity |
| array | comments | Array of salesOrderCreditmemoCommentEntity |

The **salesOrderCreditmemoItemEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | item_id | Credit memo item ID |
| string | parent_id | Parent ID |
| string | weee_tax_applied_row_amount | Applied fixed product tax row amount |
| string | base_price | Base price |
| string | base_weee_tax_row_disposition | Fixed product tax row disposition (in base currency) |
| string | tax_amount | Tax amount |
| string | base_weee_tax_applied_amount | Applied fixed product tax amount (in base currency) |
| string | weee_tax_row_disposition | Fixed product tax row disposition |
| string | base_row_total | Base row total |
| string | discount_amount | Discount amount |
| string | row_total | Row total |
| string | weee_tax_applied_amount | Applied fixed product tax amount |
| string | base_discount_amount | Base discount amount |
| string | base_weee_tax_disposition | Fixed product tax disposition (in base currency) |
| string | price_incl_tax | Price including tax |
| string | base_tax_amount | Base tax amount |
| string | weee_tax_disposition | Fixed product tax disposition |
| string | base_price_incl_tax | Base price including tax |
| string | qty | Quantity |
| string | base_cost | Base cost |
| string | base_weee_tax_applied_row_amount | Applied fixed product tax row amount (in base currency) |
| string | price | Price |
| string | base_row_total_incl_tax | Base row total including tax |
| string | row_total_incl_tax | Row total including tax |
| string | product_id | Product ID |
| string | order_item_id | Order item ID |
| string | additional_data | Additional data |
| string | description | Description |
| string | weee_tax_applied | Applied fixed product tax |
| string | sku | Item SKU |
| string | name | Name |
| string | hidden_tax_amount | Hidden tax amount |
| string | base_hidden_tax_amount | Base hidden tax amount |

The **salesOrderCreditmemoCommentEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | parent_id | Parent ID |
| string | created_at | Date of creation |
| string | comment | Comment data |
| string | is_customer_notified | Defines whether the customer is notified |
| string | comment_id | Comment ID |
| string | is_visible_on_front | Defines whether the comment is visible on the frontend |

**Faults:**

| Fault Code | Fault Description                               |
|------------|-------------------------------------------------|
| 101        | Invalid filter given. Details in error message. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');
$filter = array(
    'order_id' => array(
        'or' => array(
            array(
                'from' => '673',
                'to' => '674',
            ),
            array(
                'from' => '677',
                'to' => NULL,
            )
        )
    ),
    'increment_id' => array(
        'or' => array(
            array(
                'from' => '100000617',
                'to' => '100000619',
            ),
            array(
                'from' => '100000619',
                'to' => NULL,
            )
        )
    )
);
$creditmemoList = $proxy->call($sessionId, 'order_creditmemo.list', array($filter));
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->salesOrderCreditmemoList($sessionId, '200000001');
var_dump($result);
```
###### Request Example SOAP V2 (Complex Filter)
```php
$client = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

// If some stuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');
$complexFilter = array(
    'complex_filter' => array(
        array(
            'key' => 'state',
            'value' => array('key' => 'in', 'value' => '2,3')
        )
    )
);
$result = $client->salesOrderCreditmemoList($session, $complexFilter);

var_dump ($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->salesOrderCreditmemoList((object)array('sessionId' => $sessionId->result));   
var_dump($result->result);
```
###### Response Example SOAP V1
```php
array(
    0 => array(
        'store_id' => '1',
        'adjustment_positive' => NULL,
        'base_shipping_tax_amount' => '0.0000',
        'store_to_order_rate' => '1.0000',
        'base_discount_amount' => '0.0000',
        'base_to_order_rate' => '1.0000',
        'grand_total' => '60.0000',
        'base_adjustment_negative' => NULL,
        'base_subtotal_incl_tax' => '55.0000',
        'shipping_amount' => '5.0000',
        'subtotal_incl_tax' => '55.0000',
        'adjustment_negative' => NULL,
        'base_shipping_amount' => '5.0000',
        'store_to_base_rate' => '1.0000',
        'base_to_global_rate' => '1.0000',
        'base_adjustment' => '0.0000',
        'base_subtotal' => '55.0000',
        'discount_amount' => '0.0000',
        'subtotal' => '55.0000',
        'adjustment' => '0.0000',
        'base_grand_total' => '60.0000',
        'base_adjustment_positive' => NULL,
        'base_tax_amount' => '0.0000',
        'shipping_tax_amount' => '0.0000',
        'tax_amount' => '0.0000',
        'order_id' => '674',
        'email_sent' => NULL,
        'creditmemo_status' => NULL,
        'state' => '2',
        'shipping_address_id' => '1348',
        'billing_address_id' => '1347',
        'invoice_id' => NULL,
        'cybersource_token' => NULL,
        'store_currency_code' => 'USD',
        'order_currency_code' => 'USD',
        'base_currency_code' => 'USD',
        'global_currency_code' => 'USD',
        'transaction_id' => NULL,
        'increment_id' => '100000617',
        'created_at' => '2011-05-26 10:49:45',
        'updated_at' => '2011-05-26 10:49:45',
        'hidden_tax_amount' => '0.0000',
        'base_hidden_tax_amount' => '0.0000',
        'shipping_hidden_tax_amount' => NULL,
        'base_shipping_hidden_tax_amnt' => NULL,
        'shipping_incl_tax' => '5.0000',
        'base_shipping_incl_tax' => '5.0000',
        'base_customer_balance_amount' => NULL,
        'customer_balance_amount' => NULL,
        'bs_customer_bal_total_refunded' => '0.0000',
        'customer_bal_total_refunded' => '0.0000',
        'base_gift_cards_amount' => NULL,
        'gift_cards_amount' => NULL,
        'gw_base_price' => NULL,
        'gw_price' => NULL,
        'gw_items_base_price' => NULL,
        'gw_items_price' => NULL,
        'gw_card_base_price' => NULL,
        'gw_card_price' => NULL,
        'gw_base_tax_amount' => NULL,
        'gw_tax_amount' => NULL,
        'gw_items_base_tax_amount' => NULL,
        'gw_items_tax_amount' => NULL,
        'gw_card_base_tax_amount' => NULL,
        'gw_card_tax_amount' => NULL,
        'base_reward_currency_amount' => NULL,
        'reward_currency_amount' => NULL,
        'reward_points_balance' => NULL,
        'reward_points_balance_refund' => NULL,
        'creditmemo_id' => '617',
    ),
    1 => array(
        'store_id' => '1',
        'adjustment_positive' => NULL,
        .......................................
        'creditmemo_id' => '620',
    )
);
```

---

## sales_order_creditmemo.info — Memo Info

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderCreditMemo/sales_order_creditmemo.info.html>*

#### Module: Order Credit Memo API

##### Resource: sales_order_creditmemo

###### Aliases: order_creditmemo

###### Method:

- order_creditmemo.info (SOAP V1)
- salesOrderCreditmemoInfo (SOAP V2)

Allows you to retrieve full information about the specified credit memo.

**Arguments:**

| Type   | Name                  | Description              |
|--------|-----------------------|--------------------------|
| string | sessionId             | Session ID               |
| string | creditmemoIncrementId | Credit memo increment ID |

**Return:**

| Type  | Name   | Description                         |
|-------|--------|-------------------------------------|
| array | result | Array of salesOrderCreditmemoEntity |

The **salesOrderCreditmemoEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | updated_at | Date of updating |
| string | created_at | Date of creation |
| string | increment_id | Increment ID |
| string | transaction_id | Transaction ID |
| string | global_currency_code | Global currency code |
| string | base_currency_code | Base currency code |
| string | order_currency_code | Order currency code |
| string | store_currency_code | Store currency code |
| string | cybersource_token | Cybersource token |
| string | invoice_id | ID of the invoice for which the credit memo was created |
| string | billing_address_id | Billing address ID |
| string | shipping_address_id | Shipping address ID |
| string | state | State |
| string | creditmemo_status | Credit memo status |
| string | email_sent | Defines whether the email is sent |
| string | order_id | ID of the order for which the credit memo was created |
| string | tax_amount | Tax amount |
| string | shipping_tax_amount | Shipping tax amount |
| string | base_tax_amount | Base tax amount |
| string | base_adjustment_positive | Adjustment refund amount (using base currency) |
| string | base_grand_total | Base grand total |
| string | adjustment | Adjustment |
| string | subtotal | Subtotal |
| string | discount_amount | Discount amount |
| string | base_subtotal | Base subtotal |
| string | base_adjustment | Base adjustment |
| string | base_to_global_rate | Base to global rate |
| string | store_to_base_rate | Store to base rate |
| string | base_shipping_amount | Base shipping amount |
| string | adjustment_negative | Adjustment fee amount |
| string | subtotal_incl_tax | Subtotal including tax |
| string | shipping_amount | Shipping amount |
| string | base_subtotal_incl_tax | Base subtotal including tax |
| string | base_adjustment_negative | Adjustment fee amount (using base currency) |
| string | grand_total | Grand total |
| string | base_discount_amount | Base discount amount |
| string | base_to_order_rate | Base to order rate |
| string | store_to_order_rate | Store to order rate |
| string | base_shipping_tax_amount | Base shipping tax amount |
| string | adjustment_positive | Adjustment refund amount |
| string | store_id | Store ID |
| string | hidden_tax_amount | Hidden tax amount |
| string | base_hidden_tax_amount | Base hidden tax amount |
| string | shipping_hidden_tax_amount | Shipping hidden tax amount |
| string | base_shipping_hidden_tax_amnt | Base shipping hidden tax amount |
| string | shipping_incl_tax | Shipping including tax |
| string | base_shipping_incl_tax | Base shipping including tax |
| string | base_customer_balance_amount | Base customer balance amount |
| string | customer_balance_amount | Customer balance amount |
| string | bs_customer_bal_total_refunded | Refunded base customer balance amount |
| string | customer_bal_total_refunded | Customer balance total refunded |
| string | base_gift_cards_amount | Base gift cards amount |
| string | gift_cards_amount | Gift cards amount |
| string | gw_base_price | Gift wrapping price refunded amount (using base currency) |
| string | gw_price | Gift wrapping price refunded amount |
| string | gw_items_base_price | Gift wrapping items base price |
| string | gw_items_price | Gift wrapping items price |
| string | gw_card_base_price | Gift wrapping card base price |
| string | gw_card_price | Gift wrapping card price |
| string | gw_base_tax_amount | Gift wrapping tax amount refunded (using base currency) |
| string | gw_tax_amount | Gift wrapping tax amount refunded |
| string | gw_items_base_tax_amount | Gift wrapping items base tax amount |
| string | gw_items_tax_amount | Gift wrapping items tax amount |
| string | gw_card_base_tax_amount | Gift wrapping card base tax amount |
| string | gw_card_tax_amount | Gift wrapping card tax amount |
| string | base_reward_currency_amount | Base reward currency amount |
| string | reward_currency_amount | Reward currency amount |
| string | reward_points_balance | Reward points balance |
| string | reward_points_balance_refund | Reward points balance refund |
| string | creditmemo_id | Credit memo ID |
| array | items | Array of salesOrderCreditmemoItemEntity |
| array | comments | Array of salesOrderCreditmemoCommentEntity |

The **salesOrderCreditmemoItemEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | item_id | Credit memo item ID |
| string | parent_id | Parent ID |
| string | weee_tax_applied_row_amount | Applied fixed product tax row amount |
| string | base_price | Base price |
| string | base_weee_tax_row_disposition | Fixed product tax row disposition (in base currency) |
| string | tax_amount | Tax amount |
| string | base_weee_tax_applied_amount | Applied fixed product tax amount (in base currency) |
| string | weee_tax_row_disposition | Fixed product tax row disposition |
| string | base_row_total | Base row total |
| string | discount_amount | Discount amount |
| string | row_total | Row total |
| string | weee_tax_applied_amount | Applied fixed product tax amount |
| string | base_discount_amount | Base discount amount |
| string | base_weee_tax_disposition | Fixed product tax disposition (in base currency) |
| string | price_incl_tax | Price including tax |
| string | base_tax_amount | Base tax amount |
| string | weee_tax_disposition | Fixed product tax disposition |
| string | base_price_incl_tax | Base price including tax |
| string | qty | Quantity |
| string | base_cost | Base cost |
| string | base_weee_tax_applied_row_amount | Applied fixed product tax row amount (in base currency) |
| string | price | Price |
| string | base_row_total_incl_tax | Base row total including tax |
| string | row_total_incl_tax | Row total including tax |
| string | product_id | Product ID |
| string | order_item_id | Order item ID |
| string | additional_data | Additional data |
| string | description | Description |
| string | weee_tax_applied | Applied fixed product tax |
| string | sku | Item SKU |
| string | name | Name |
| string | hidden_tax_amount | Hidden tax amount |
| string | base_hidden_tax_amount | Base hidden tax amount |

The **salesOrderCreditmemoCommentEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | parent_id | Parent ID |
| string | created_at | Date of creation |
| string | comment | Comment data |
| string | is_customer_notified | Defines whether the customer is notified |
| string | comment_id | Comment ID |
| string | is_visible_on_front | Defines whether the comment is visible on the frontend |

**Faults:**

| Fault Code | Fault Description                     |
|------------|---------------------------------------|
| 100        | Requested credit memo does not exist. |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'order_creditmemo.info', '200000001');
var_dump ($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->salesOrderCreditmemoInfo($sessionId, '200000001');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->salesOrderCreditmemoInfo((object)array('sessionId' => $sessionId->result, 'creditmemoIncrementId' => '200000001'));   
var_dump($result->result);
```
###### Response Example SOAP V1
```php
array(
    'store_id' => '1',
    'adjustment_positive' => NULL,
    'base_shipping_tax_amount' => '0.0000',
    'store_to_order_rate' => '1.0000',
    'base_discount_amount' => '0.0000',
    'base_to_order_rate' => '1.0000',
    'grand_total' => '90.0000',
    'base_adjustment_negative' => NULL,
    'base_subtotal_incl_tax' => '75.0000',
    'shipping_amount' => '15.0000',
    'subtotal_incl_tax' => '75.0000',
    'adjustment_negative' => NULL,
    'base_shipping_amount' => '15.0000',
    'store_to_base_rate' => '1.0000',
    'base_to_global_rate' => '1.0000',
    'base_adjustment' => '0.0000',
    'base_subtotal' => '75.0000',
    'discount_amount' => '0.0000',
    'subtotal' => '75.0000',
    'adjustment' => '0.0000',
    'base_grand_total' => '90.0000',
    'base_adjustment_positive' => NULL,
    'base_tax_amount' => '0.0000',
    'shipping_tax_amount' => '0.0000',
    'tax_amount' => '0.0000',
    'order_id' => '744',
    'email_sent' => NULL,
    'creditmemo_status' => NULL,
    'state' => '2',
    'shipping_address_id' => '1488',
    'billing_address_id' => '1487',
    'invoice_id' => NULL,
    'cybersource_token' => NULL,
    'store_currency_code' => 'USD',
    'order_currency_code' => 'USD',
    'base_currency_code' => 'USD',
    'global_currency_code' => 'USD',
    'transaction_id' => NULL,
    'increment_id' => '100000684',
    'created_at' => '2011-05-27 10:53:03',
    'updated_at' => '2011-05-27 10:53:03',
    'hidden_tax_amount' => '0.0000',
    'base_hidden_tax_amount' => '0.0000',
    'shipping_hidden_tax_amount' => NULL,
    'base_shipping_hidden_tax_amnt' => NULL,
    'shipping_incl_tax' => '15.0000',
    'base_shipping_incl_tax' => '15.0000',
    'base_customer_balance_amount' => NULL,
    'customer_balance_amount' => NULL,
    'bs_customer_bal_total_refunded' => '0.0000',
    'customer_bal_total_refunded' => '0.0000',
    'base_gift_cards_amount' => NULL,
    'gift_cards_amount' => NULL,
    'gw_base_price' => NULL,
    'gw_price' => NULL,
    'gw_items_base_price' => NULL,
    'gw_items_price' => NULL,
    'gw_card_base_price' => NULL,
    'gw_card_price' => NULL,
    'gw_base_tax_amount' => NULL,
    'gw_tax_amount' => NULL,
    'gw_items_base_tax_amount' => NULL,
    'gw_items_tax_amount' => NULL,
    'gw_card_base_tax_amount' => NULL,
    'gw_card_tax_amount' => NULL,
    'base_reward_currency_amount' => NULL,
    'reward_currency_amount' => NULL,
    'reward_points_balance' => NULL,
    'reward_points_balance_refund' => NULL,
    'base_customer_balance_total_refunded' => '0.0000',
    'customer_balance_total_refunded' => '0.0000',
    'gw_printed_card_base_price' => NULL,
    'gw_printed_card_price' => NULL,
    'gw_printed_card_base_tax_amount' => NULL,
    'gw_printed_card_tax_amount' => NULL,
    'reward_points_balance_to_refund' => NULL,
    'creditmemo_id' => '684',
    'order_increment_id' => '100000744',
    'items' => array(
        0 => array(
            'parent_id' => '684',
            'weee_tax_applied_row_amount' => '0.0000',
            'base_price' => '55.0000',
            'base_weee_tax_row_disposition' => '0.0000',
            'tax_amount' => '0.0000',
            'base_weee_tax_applied_amount' => '0.0000',
            'weee_tax_row_disposition' => '0.0000',
            'base_row_total' => '55.0000',
            'discount_amount' => NULL,
            'row_total' => '55.0000',
            'weee_tax_applied_amount' => '0.0000',
            'base_discount_amount' => NULL,
            'base_weee_tax_disposition' => '0.0000',
            'price_incl_tax' => '55.0000',
            'base_tax_amount' => '0.0000',
            'weee_tax_disposition' => '0.0000',
            'base_price_incl_tax' => '55.0000',
            'qty' => '1.0000',
            'base_cost' => NULL,
            'base_weee_tax_applied_row_amnt' => NULL,
            'price' => '55.0000',
            'base_row_total_incl_tax' => '55.0000',
            'row_total_incl_tax' => '55.0000',
            'product_id' => '20',
            'order_item_id' => '775',
            'additional_data' => NULL,
            'description' => NULL,
            'weee_tax_applied' => 'a:0:{}',
            'sku' => 'test_product_sku',
            'name' => 'Test Product',
            'hidden_tax_amount' => '0.0000',
            'base_hidden_tax_amount' => '0.0000',
            'item_id' => '708'
        ),
        1 => array(
            'parent_id' => '684',
            'weee_tax_applied_row_amount' => '0.0000',
            'base_price' => '10.0000',
            'base_weee_tax_row_disposition' => '0.0000',
            'tax_amount' => '0.0000',
            'base_weee_tax_applied_amount' => '0.0000',
            'weee_tax_row_disposition' => '0.0000',
            'base_row_total' => '20.0000',
            'discount_amount' => NULL,
            'row_total' => '20.0000',
            'weee_tax_applied_amount' => '0.0000',
            'base_discount_amount' => NULL,
            'base_weee_tax_disposition' => '0.0000',
            'price_incl_tax' => '10.0000',
            'base_tax_amount' => '0.0000',
            'weee_tax_disposition' => '0.0000',
            'base_price_incl_tax' => '10.0000',
            'qty' => '2.0000',
            'base_cost' => NULL,
            'base_weee_tax_applied_row_amnt' => NULL,
            'price' => '10.0000',
            'base_row_total_incl_tax' => '20.0000',
            'row_total_incl_tax' => '20.0000',
            'product_id' => '21',
            'order_item_id' => '776',
            'additional_data' => NULL,
            'description' => NULL,
            'weee_tax_applied' => 'a:0:{}',
            'sku' => 'test_product_sku_2',
            'name' => 'Test 2',
            'hidden_tax_amount' => '0.0000',
            'base_hidden_tax_amount' => '0.0000',
            'item_id' => '709'
        )
    ),
    'comments' => array(
        0 => array(
            'parent_id' => '684',
            'is_customer_notified' => '0',
            'is_visible_on_front' => '0',
            'comment' => 'Test CreditMemo successfully created',
            'created_at' => '2011-05-27 10:53:03',
            'comment_id' => '118'
        ),
        1 => array(
            'parent_id' => '684',
            'is_customer_notified' => '0',
            'is_visible_on_front' => '0',
            'comment' => 'Test CreditMemo comment successfully added',
            'created_at' => '2011-05-27 10:53:03',
            'comment_id' => '119'
        )
    )
);
```

---

## sales_order_creditmemo.create — Memo Create

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderCreditMemo/sales_order_creditmemo.create.html>*

#### Module: Order Credit Memo API

##### Resource: sales_order_creditmemo

###### Aliases: order_creditmemo

###### Method:

- order_creditmemo.create (SOAP V1)
- salesOrderCreditmemoCreate (SOAP V2)

Allows you to create a new credit memo for the invoiced order. Comments can be added and an email notification can be sent to the user email.

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | orderIncrementId | Order increment ID |
| array | creditmemoData | Array of salesOrderCreditmemoData (optional) |
| string | comment | Comment text (optional) |
| int | notifyCustomer | Notify customer by email flag (optional) |
| int | includeComment | Include comment text into an email notification (optional) |
| string | refundToStoreCreditAmount | Payment amount to be refunded to the customer store credit (optional) |

**Return:**

| Type   | Name   | Description                      |
|--------|--------|----------------------------------|
| string | result | Created credit memo increment ID |

The **salesOrderCreditmemoData** content is as follows:

| Type   | Name                | Description                         |
|--------|---------------------|-------------------------------------|
| array  | qtys                | Array of orderItemIdQty             |
| double | shipping_amount     | Refund shipping amount (optional)   |
| double | adjustment_positive | Adjustment refund amount (optional) |
| double | adjustment_negative | Adjustment fee amount (optional)    |

The **orderItemIdQty** content is as follows:

| Type   | Name          | Description                   |
|--------|---------------|-------------------------------|
| int    | order_item_id | Order item ID to be refunded  |
| double | qty           | Items quantity to be refunded |

**Faults:**

| Fault Code | Fault Message |
|----|----|
| 102 | Invalid data given. Details in error message. |
| 103 | Requested order does not exist. |
| 105 | Money can not be refunded to the store credit account as order was created by guest. |
| 106 | Credit memo for requested order can not be created. |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'order_creditmemo.create', '200000010');
var_dump ($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->salesOrderCreditmemoCreate($sessionId, '200000010');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->salesOrderCreditmemoCreate((object)array('sessionId' => $sessionId->result, 'creditmemoIncrementId' => '200000010', 
'creditmemoData' => array(
'qtys' => array(
'order_item_id' => 3,
'qty' => '1'),
'shipping_amount' => null,
'adjustment_positive' => '0',
'adjustment_negative' => null),
'comment' => 'comment for credit memo',
'notifyCustomer' => null,
'includeComment' => 1,
'refundToStoreCreditAmount' => '1'
));   
var_dump($result->result);
```

---

## sales_order_creditmemo.cancel — Memo Cancel

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderCreditMemo/sales_order_creditmemo.cancel.html>*

#### Module: Order Credit Memo API

##### Resource: sales_order_creditmemo

###### Aliases: order_creditmemo

###### Method:

- order_creditmemo.cancel (SOAP V1)
- salesOrderCreditmemoCancel (SOAP V2)

Allows you to cancel an existing credit memo.

**Arguments:**

| Type   | Name                  | Description              |
|--------|-----------------------|--------------------------|
| string | sessionId             | Session ID               |
| string | creditmemoIncrementId | Credit memo increment ID |

**Return:**

| Type   | Name   | Description                         |
|--------|--------|-------------------------------------|
| string | result | Result of canceling the credit memo |

**Faults:**

| Fault Code | Fault Message                         |
|------------|---------------------------------------|
| 100        | Requested credit memo does not exist. |
| 104        | Credit memo status not changed.       |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');
$creditmemoIncrementId = '100000637'; //increment id of existing credit memo

$isCreditMemoCanceled = $proxy->call($sessionId, 'order_creditmemo.cancel', array($creditmemoIncrementId));
```

---

## sales_order_creditmemo.addComment — Add Comment

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/sales/salesOrderCreditMemo/sales_order_creditmemo.addComment.html>*

#### Module: Order Credit Memo API

##### Resource: sales_order_creditmemo

**Aliases**: order_creditmemo

###### Method:

- order_creditmemo.addComment (SOAP V1)
- salesOrderCreditmemoAddComment (SOAP V2)

Allows you to add a new comment to an existing credit memo. Email notification can be sent to the user email.

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | creditmemoIncrementId | Credit memo increment ID |
| string | comment | Comment text (optional) |
| int | notifyCustomer | Notify customer by email flag (optional) |
| int | includeComment | Include comment text into the email notification (optional) |

**Return:**

| Type        | Description                                         |
|-------------|-----------------------------------------------------|
| boolean\int | True (1) if the comment is added to the credit memo |

**Faults:**

| Fault Code | Fault Message                                 |
|------------|-----------------------------------------------|
| 100        | Requested credit memo does not exist.         |
| 102        | Invalid data given. Details in error message. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');
$creditmemoIncrementId = '200000001'; //increment id of existing credit memo
$commentText = "Credit memo comment successfully added";

$isCommentAdded = $proxy->call($sessionId, 'order_creditmemo.addComment', array($creditmemoIncrementId, $commentText, true));
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->salesOrderCreditmemoAddComment($sessionId, '200000001');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->salesOrderCreditmemoAddComment((object)array('sessionId' => $sessionId->result, 'creditmemoIncrementId' => '200000001', 'comment' => 'credit memo comment', 'notifyCustomer' => 1, 'includeComment' => 1));   
var_dump($result->result);
```

---
