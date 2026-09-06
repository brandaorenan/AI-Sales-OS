# SOAP API — Shopping Cart (Checkout)

> Full guest/customer checkout flow via cart API: create cart, set customer/addresses, add products, shipping and payment methods, coupons, totals and order placement.

**Note:** This is the only way to CREATE orders through the Magento 1.x API.

---

## Checkout

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/checkout.html>*

### Module: Mage_Checkout

The Mage_Checkout module allows you to manage shopping carts and the checkout process. This module allows you to create an order once filling the shopping cart is complete.

##### Cart Coupon

Allows you to add and remove coupon codes for a shopping cart.

**Resource Name**: cart_coupon

**Methods**:

- [cart_coupon.add](cartCoupon/cart_coupon.add.html "cart_coupon.add") - Add a coupon code to a quote
- [cart_coupon.remove](cartCoupon/cart_coupon.remove.html "cart_coupon.remove") - Remove a coupon code from a quote

##### Cart Customer

Allows you to add customer information and addresses into a shopping cart.

**Resource Name**: cart_customer

**Methods**:

- [cart_customer.set](cartCustomer/cart_customer.set.html "cart_customer.set") - Add customer information into a shopping cart
- [cart_customer.addresses](cartCustomer/cart_customer.addresses.html "cart_customer.addresses") - Set the customer addresses (shipping and billing) into a shopping cart

##### Cart Payment

Allows you to retrieve and set payment methods for a shopping cart.

**Resource Name**: cart_payment

**Methods**:

- [cart_payment.method](cartPayment/cart_payment.method.html "cart_payment.method") - Set a payment method for a shopping cart
- [cart_payment.list](cartPayment/cart_payment.list.html "cart_payment.list") - Get the list of available payment methods for a shopping cart

##### Cart Product

Allows you to manage products in a shopping cart.

**Resource Name**: cart_product

**Methods**:

- [cart_product.add](cartProduct/cart_product.add.html "cart_product.add") - Add one or more products to a shopping cart
- [cart_product.update](cartProduct/cart_product.update.html "cart_product.update") - Update one or more products in a shopping cart
- [cart_product.remove](cartProduct/cart_product.remove.html "cart_product.remove") - Remove one or more products from a shopping cart
- [cart_product.list](cartProduct/cart_product.list.html "cart_product.list") - Get a list of products in a shopping cart
- [cart_product.moveToCustomerQuote](cartProduct/cart_product.moveToCustomerQuote.html "cart_product.moveToCustomerQuote") - Move one or more products from the quote to the customer shopping cart

##### Cart Shipping

Allows you to retrieve and set shipping methods for a shopping cart.

**Resource Name**: cart_shipping

**Methods**:

- [cart_shipping.method](cartShipping/cart_shipping.method.html "cart_shipping.method") - Set a shipping method for a shopping cart
- [cart_shipping.list](cartShipping/cart_shipping.list.html "cart_shipping.list") - Retrieve the list of available shipping methods for a shopping cart

##### Shopping Cart

Allows you to manage shopping carts.

**Resource Name**: cart

**Methods**:

- [cart.create](cart/cart.create.html "cart.create") - Create a blank shopping cart
- [cart.order](cart/cart.order.html "cart.order") - Create an order from a shopping cart
- [cart.info](cart/cart.info.html "cart.info") - Get full information about the current shopping cart
- [cart.totals](cart/cart.totals.html "cart.totals") - Get all available prices for items in shopping cart, using additional parameters
- [cart.license](cart/cart.license.html "cart.license") - Get website license agreement

---

## Cart

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cart/cart.html>*

### Module: Mage_Checkout

The Mage_Checkout module allows you to manage shopping carts and the checkout process. This module allows you to create an order once filling the shopping cart is complete.

##### Shopping Cart

Allows you to manage shopping carts.

**Resource Name**: cart

**Methods**:

- [cart.create](cart.create.html "cart.create") - Create a blank shopping cart
- [cart.order](cart.order.html "cart.order") - Create an order from a shopping cart
- [cart.info](cart.info.html "cart.info") - Get full information about the current shopping cart
- [cart.totals](cart.totals.html "cart.totals") - Get all available prices for items in shopping cart, using additional parameters
- [cart.licenseAgreement](cart.license.html "cart.license") - Get website license agreement

##### Faults

| Fault Code | Fault Message |
|----|----|
| 1001 | Can not make operation because store is not exists |
| 1002 | Can not make operation because quote is not exists |
| 1003 | Can not create a quote. |
| 1004 | Can not create a quote because quote with such identifier is already exists |
| 1005 | You did not set all required agreements |
| 1006 | The checkout type is not valid. Select single checkout type. |
| 1007 | Checkout is not available for guest |
| 1008 | Can not create an order. |

##### Example

The following example illustrates the work with shopping cart (creation of a shopping cart, setting customer and customer addresses, adding products to the shopping cart, updating products in the shopping cart, removing products from the shopping cart, getting the list of products/shipping methods/payment methods, setting payment/shipping methods,  adding/removing coupon, getting total prices/full information about shopping cart/list of licenses, and creating an order.
```
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

// Create a quote, get quote identifier
$shoppingCartId = $proxy->call( $sessionId, 'cart.create', array( 'magento_store' ) );

// Set customer, for example guest
$customerAsGuest = array(
    "firstname" => "testFirstname",
    "lastname" => "testLastName",
    "email" => "testEmail",
    "website_id" => "0",
    "store_id" => "0",
    "mode" => "guest"
);
$resultCustomerSet = $proxy->call($sessionId, 'cart_customer.set', array( $shoppingCartId, $customerAsGuest) );

// Set customer addresses, for example guest's addresses
$arrAddresses = array(
    array(
        "mode" => "shipping",
        "firstname" => "testFirstname",
        "lastname" => "testLastname",
        "company" => "testCompany",
        "street" => "testStreet",
        "city" => "testCity",
        "region" => "testRegion",
        "postcode" => "testPostcode",
        "country_id" => "id",
        "telephone" => "0123456789",
        "fax" => "0123456789",
        "is_default_shipping" => 0,
        "is_default_billing" => 0
    ),
    array(
        "mode" => "billing",
        "firstname" => "testFirstname",
        "lastname" => "testLastname",
        "company" => "testCompany",
        "street" => "testStreet",
        "city" => "testCity",
        "region" => "testRegion",
        "postcode" => "testPostcode",
        "country_id" => "id",
        "telephone" => "0123456789",
        "fax" => "0123456789",
        "is_default_shipping" => 0,
        "is_default_billing" => 0
    )
);
$resultCustomerAddresses = $proxy->call($sessionId, "cart_customer.addresses", array($shoppingCartId, $arrAddresses));

// add products into shopping cart
$arrProducts = array(
    array(
        "product_id" => "1",
        "qty" => 2
    ),
    array(
        "sku" => "testSKU",
        "quantity" => 4
    )
);
$resultCartProductAdd = $proxy->call($sessionId, "cart_product.add", array($shoppingCartId, $arrProducts));

// update product in shopping cart
$arrProducts = array(
    array(
        "product_id" => "1",
        "qty" => 5
    ),
);
$resultCartProductUpdate = $proxy->call($sessionId, "cart_product.update", array($shoppingCartId, $arrProducts));

// remove products from shopping cart, for example by SKU
$arrProducts = array(
    array(
        "sku" => "testSKU"
    ),
);
$resultCartProductRemove = $proxy->call($sessionId, "cart_product.remove", array($shoppingCartId, $arrProducts));

// get list of products
$shoppingCartProducts = $proxy->call($sessionId, "cart_product.list", array($shoppingCartId));
print_r( $shoppingCartProducts );

// get list of shipping methods
$resultShippingMethods = $proxy->call($sessionId, "cart_shipping.list", array($shoppingCartId));
print_r( $resultShippingMethods );

// set shipping method
$randShippingMethodIndex = rand(1, count($resultShippingMethods) );
$shippingMethod = $resultShippingMethods[$randShippingMethodIndex]["code"];

$resultShippingMethod = $proxy->call($sessionId, "cart_shipping.method", array($shoppingCartId, $shippingMethod));

// get list of payment methods
$resultPaymentMethods = $proxy->call($sessionId, "cart_payment.list", array($shoppingCartId));
print_r($resultPaymentMethods);

// set payment method
$paymentMethod = array(
    "method" => "checkmo"
);
$resultPaymentMethod = $proxy->call($sessionId, "cart_payment.method", array($shoppingCartId, $paymentMethod));

// add coupon
$couponCode = "aCouponCode";
$resultCartCouponRemove = $proxy->call($sessionId, "cart_coupon.add", array($shoppingCartId, $couponCode));

// remove coupon
$resultCartCouponRemove = $proxy->call($sessionId, "cart_coupon.remove", array($shoppingCartId));

// get total prices
$shoppingCartTotals = $proxy->call($sessionId, "cart.totals", array($shoppingCartId));
print_r( $shoppingCartTotals );

// get full information about shopping cart
$shoppingCartInfo = $proxy->call($sessionId, "cart.info", array($shoppingCartId));
print_r( $shoppingCartInfo );

// get list of licenses
$shoppingCartLicenses = $proxy->call($sessionId, "cart.licenseAgreement", array($shoppingCartId));
print_r( $shoppingCartLicences );

// check if license is existed
$licenseForOrderCreation = null;
if (count($shoppingCartLicenses)) {
    $licenseForOrderCreation = array();
    foreach ($shoppingCartLicenses as $license) {
        $licenseForOrderCreation[] = $license['agreement_id'];
    }
}

// create order
$resultOrderCreation = $proxy->call($sessionId,"cart.order",array($shoppingCartId, null, $licenseForOrderCreation));
```

---

## cart.create — Cart Create

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cart/cart.create.html>*

### Module: Mage_Checkout

##### Resource: cart

###### Method:

- cart.create (SOAP V1)
- shoppingCartCreate (SOAP V2)

Allows you to create an empty shopping cart.

**Arguments**:

| Type   | Name      | Description                      |
|--------|-----------|----------------------------------|
| string | sessionId | Session ID                       |
| string | storeId   | Store view ID or code (optional) |

**Returns**:

| Type | Description                           |
|------|---------------------------------------|
| int  | ID of the created empty shopping cart |

**Faults:**\
*No Faults*

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$shoppingCartIncrementId = $proxy->call( $sessionId, 'cart.create', array( 'magento_store' ) );
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->shoppingCartCreate($sessionId, '3');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->shoppingCartCreate((object)array('sessionId' => $sessionId->result, 'store' => '3'));   

var_dump($result->result);
```

---

## cart.info — Cart Info

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cart/cart.info.html>*

### Mage_Checkout

#### Module: Shopping Cart API

##### Resource: cart

###### Method:

- cart.info (SOAP V1)
- shoppingCartInfo (SOAP V2)

Allows you to retrieve full information about the shopping cart (quote).

**Arguments:**

| Type   | Name      | Description                      |
|--------|-----------|----------------------------------|
| string | sessionId | Session ID                       |
| int    | quoteId   | Shopping cart ID (quote ID)      |
| string | store     | Store view ID or code (optional) |

**Return:**

| Type  | Name   | Description                     |
|-------|--------|---------------------------------|
| array | result | Array of shoppingCartInfoEntity |

The **shoppingCartInfoEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | store_id | Store ID |
| string | created_at | Date of creation |
| string | updated_at | Date of updating |
| string | converted_at | Date of conversion |
| int | quote_id | Quote ID |
| int | is_active | Active flag |
| int | is_virtual | Defines whether the product is a virtual one |
| int | is_multi_shipping | Defines whether multi shipping is available |
| double | items_count | Items quantity |
| double | items_qty | Total items quantity |
| string | orig_order_id | Original order ID |
| string | store_to_base_rate | Store to base rate |
| string | store_to_quote_rate | Store to quote rate |
| string | base_currency_code | Base currency code |
| string | store_currency_code | Store currency code |
| string | quote_currency_code | Quote currency code |
| string | grand_total | Grand total |
| string | base_grand_total | Base grand total |
| string | checkout_method | Checkout method |
| string | customer_id | Customer ID |
| string | customer_tax_class_id | Customer tax class ID |
| int | customer_group_id | Customer group ID |
| string | customer_email | Customer email address |
| string | customer_prefix | Customer prefix |
| string | customer_firstname | Customer first name |
| string | customer_middlename | Customer middle name |
| string | customer_lastname | Customer last name |
| string | customer_suffix | Customer suffix |
| string | customer_note | Customer note |
| string | customer_note_notify | Customer notification flag |
| string | customer_is_guest | Defines whether the customer is a guest |
| string | applied_rule_ids | Applied rule IDs |
| string | reserved_order_id | Reserved order ID |
| string | password_hash | Password hash |
| string | coupon_code | Coupon code |
| string | global_currency_code | Global currency code |
| double | base_to_global_rate | Base to global rate |
| double | base_to_quote_rate | Base to quote rate |
| string | customer_taxvat | Customer taxvat value |
| string | customer_gender | Customer gender |
| double | subtotal | Subtotal |
| double | base_subtotal | Base subtotal |
| double | subtotal_with_discount | Subtotal with discount |
| double | base_subtotal_with_discount | Base subtotal with discount |
| string | ext_shipping_info |   |
| string | gift_message_id | Gift message ID |
| string | gift_message | Gift message |
| double | customer_balance_amount_used | Used customer balance amount |
| double | base_customer_balance_amount_used | Used base customer balance amount |
| string | use_customer_balance | Defines whether to use the customer balance |
| string | gift_cards_amount | Gift cards amount |
| string | base_gift_cards_amount | Base gift cards amount |
| string | gift_cards_amount_used | Used gift cards amount |
| string | use_reward_points | Defines whether to use reward points |
| string | reward_points_balance | Reward points balance |
| string | base_reward_currency_amount | Base reward currency amount |
| string | reward_currency_amount | Reward currency amount |
| array | shipping_address | Array of shoppingCartAddressEntity |
| array | billing_address | Array of shoppingCartAddressEntity |
| array | items | Array of shoppingCartItemEntity |
| array | payment | Array of shoppingCartPaymentEntity |

The **shoppingCartAddressEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | address_id | Shopping cart address ID |
| string | created_at | Date of creation |
| string | updated_at | Date of updating |
| string | customer_id | Customer ID |
| int | save_in_address_book | Defines whether to save the address in the address book |
| string | customer_address_id | Customer address ID |
| string | address_type | Address type |
| string | email | Email address |
| string | prefix | Customer prefix |
| string | firstname | Customer first name |
| string | middlename | Customer middle name |
| string | lastname | Customer last name |
| string | suffix | Customer suffix |
| string | company | Company name |
| string | street | Street |
| string | city | City |
| string | region | Region |
| string | region_id | Region ID |
| string | postcode | Postcode |
| string | country_id | Country ID |
| string | telephone | Telephone number |
| string | fax | Fax |
| int | same_as_billing | Defines whether the address is the same as the billing one |
| int | free_shipping | Defines whether free shipping is used |
| string | shipping_method | Shipping method |
| string | shipping_description | Shipping description |
| double | weight | Weight |

The **shoppingCartItemEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | item_id | Cart item ID |
| string | created_at | Date of creation |
| string | updated_at | Date of updating |
| string | product_id | Product ID |
| string | store_id | Store ID |
| string | parent_item_id | Parent item ID |
| int | is_virtual | Defines whether the product is a virtual one |
| string | sku | Product SKU |
| string | name | Product name |
| string | description | Description |
| string | applied_rule_ids | Applied rule IDs |
| string | additional_data | Additional data |
| string | free_shipping | Free shipping |
| string | is_qty_decimal | Defines whether the quantity is decimal |
| string | no_discount | Defines whether no discount is applied |
| double | weight | Weight |
| double | qty | Quantity |
| double | price | Price |
| double | base_price | Base price |
| double | custom_price | Custom price |
| double | discount_percent | Discount percent |
| double | discount_amount | Discount amount |
| double | base_discount_amount | Base discount amount |
| double | tax_percent | Tax percent |
| double | tax_amount | Tax amount |
| double | base_tax_amount | Base tax amount |
| double | row_total | Row total |
| double | base_row_total | Base row total |
| double | row_total_with_discount | Row total with discount |
| double | row_weight | Row weight |
| string | product_type | Product type |
| double | base_tax_before_discount | Base tax before discount |
| double | tax_before_discount | Tax before discount |
| double | original_custom_price | Original custom price |
| double | base_cost | Base cost |
| double | price_incl_tax | Price including tax |
| double | base_price_incl_tax | Base price including tax |
| double | row_total_incl_tax | Row total including tax |
| double | base_row_total_incl_tax | Base row total including tax |
| string | gift_message_id | Gift message ID |
| string | gift_message | Gift message |
| string | gift_message_available | Defines whether the gift message is available |
| double | weee_tax_applied | Applied fix product tax |
| double | weee_tax_applied_amount | Applied fix product tax amount |
| double | weee_tax_applied_row_amount | Applied fix product tax row amount |
| double | base_weee_tax_applied_amount | Applied fix product tax amount (in base currency) |
| double | base_weee_tax_applied_row_amount | Applied fix product tax row amount (in base currency) |
| double | weee_tax_disposition | Fixed product tax disposition |
| double | weee_tax_row_disposition | Fixed product tax row disposition |
| double | base_weee_tax_disposition | Fixed product tax disposition (in base currency) |
| double | base_weee_tax_row_disposition | Fixed product tax row disposition (in base currency) |
| string | tax_class_id | Tax class ID |

The **shoppingCartPaymentEntity** content is as follows:

| Type   | Name                   | Description                            |
|--------|------------------------|----------------------------------------|
| string | payment_id             | Payment ID                             |
| string | created_at             | Date of creation                       |
| string | updated_at             | Date of updating                       |
| string | method                 | Payment method                         |
| string | cc_type                | Credit card type                       |
| string | cc_number_enc          | Credit card number                     |
| string | cc_last4               | Last four digits on the credit card    |
| string | cc_cid_enc             | Credit card CID                        |
| string | cc_owner               | Credit card owner                      |
| string | cc_exp_month           | Credit card expiration month           |
| string | cc_exp_year            | Credit card expiration year            |
| string | cc_ss_owner            | Credit card owner (Switch/Solo)        |
| string | cc_ss_start_month      | Credit card start month (Switch/Solo)  |
| string | cc_ss_start_year       | Credit card start year (Switch/Solo)   |
| string | cc_ss_issue            | Credit card issue number (Switch/Solo) |
| string | po_number              | Purchase order number                  |
| string | additional_data        | Additional data                        |
| string | additional_information | Additional information                 |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'cart.info', '15');
var_dump ($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->shoppingCartInfo($sessionId, '15');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->shoppingCartInfo((object)array('sessionId' => $sessionId->result, 'quoteId' => '15'));   

var_dump($result->result);
```

---

## cart.totals — Cart Totals

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cart/cart.totals.html>*

### Mage_Checkout

#### Module: Shopping Cart API

##### Resource: cart

###### Method:

- cart.totals (SOAP V1)
- shoppingCartTotals (SOAP V2)

Allows you to retrieve total prices for a shopping cart (quote).

**Arguments:**

| Type   | Name      | Description                         |
|--------|-----------|-------------------------------------|
| string | sessionId | Session ID                          |
| int    | quoteId   | Shopping cart ID (quote identifier) |
| string | store     | Store view ID or code (optional)    |

**Return:**

| Type  | Name   | Description                       |
|-------|--------|-----------------------------------|
| array | result | Array of shoppingCartTotalsEntity |

The **shoppingCartTotalsEntity** content is as follows:

| Type   | Name   | Description  |
|--------|--------|--------------|
| string | title  | Title        |
| float  | amount | Total amount |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'cart.totals', '15');
var_dump ($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->shoppingCartTotals($sessionId, '15');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->shoppingCartTotals((object)array('sessionId' => $sessionId->result, 'quoteId' => 15));   
var_dump($result->result);
```
###### Response Example SOAP V1
```php
array
  0 =>
    array
      'title' => string 'Subtotal' (length=8)
      'amount' => float 388.69
  1 =>
    array
      'title' => string '0 Reward points' (length=15)
      'amount' => float 0
  2 =>
    array
      'title' => string 'Gift Cards' (length=10)
      'amount' => float 0
  3 =>
    array
      'title' => string 'Store Credit' (length=12)
      'amount' => float 0
  4 =>
    array
      'title' => string 'Grand Total' (length=11)
      'amount' => float 388.69
  5 =>
    array
      'title' => null
      'amount' => null
```

---

## cart.license — Cart License

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cart/cart.license.html>*

### Mage_Checkout

#### Module: Shopping Cart API

##### Resource: cart

###### Method:

- cart.license (SOAP V1)
- shoppingCartLicense (SOAP V2)

###### Aliases: cart.license

Allows you to retrieve the website license agreement for the quote according to the website (store).

**Arguments:**

| Type   | Name      | Description                         |
|--------|-----------|-------------------------------------|
| string | sessionId | Session ID                          |
| int    | quoteId   | Shopping cart ID (quote identifier) |
| string | store     | Store view ID or code (optional)    |

**Return:**

| Type  | Name   | Description                        |
|-------|--------|------------------------------------|
| array | result | Array of shoppingCartLicenseEntity |

The **shoppingCartLicenseEntity** content is as follows:

| Type   | Name         | Description                           |
|--------|--------------|---------------------------------------|
| string | agreement_id | License agreement ID                  |
| string | name         | License name                          |
| string | content      | License content                       |
| int    | is_active    | Defines whether the license is active |
| int    | is_html      | Defines whether the license is HTML   |

**Faults:**

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$result = $client->call($session, 'cart.license', '15');
var_dump ($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->shoppingCartLicense($sessionId, '15');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->shoppingCartLicense((object)array('sessionId' => $sessionId->result, 'quoteId' => 15));   
var_dump($result->result);
```
###### Response Example SOAP V1
```php
array
  0 =>
    array
      'agreement_id' => string '1' (length=1)
      'name' => string 'license' (length=4)
      'content' => string 'terms and conditions' (length=20)
      'content_height' => null
      'checkbox_text' => string 'terms' (length=5)
      'is_active' => string '1' (length=1)
      'is_html' => string '0' (length=1)
```

---

## cart.order — Cart Order

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cart/cart.order.html>*

### Mage_Checkout

#### Module: Shopping Cart API

##### Resource: cart

###### Method:

- cart.order (SOAP V1)
- shoppingCartOrder (SOAP V2)

Allows you to create an order from a shopping cart (quote).\
Before placing the order, you need to add the customer, customer address, shipping and payment methods.

**Arguments:**

| Type          | Name      | Description                      |
|---------------|-----------|----------------------------------|
| string        | sessionId | Session ID                       |
| int           | quoteId   | Shopping Cart ID (quote ID)      |
| string        | storeId   | Store view ID or code (optional) |
| ArrayOfString | licenses  | Website license ID (optional)    |

**Return:**

| Type   | Name   | Description                 |
|--------|--------|-----------------------------|
| string | result | Result of creating an order |

**Faults:**\
*No Faults.*

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$shoppingCartIncrementId = $proxy->call( $sessionId, 'cart.create', array( 'magento_store' ) );

$resultOrderCreation = $proxy->call(
  $sessionId,
  "cart.order",
  array(
    $shoppingCartId
  )
);
```
###### Request Example SOAP V2
```php
/**
 * Example of order creation
 * Preconditions are as follows:
 * 1. Create a customer
 * 2. Create a simple product */

$user = 'apiUser';
$password = 'apiKey';
    $proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');
    $sessionId = $proxy->login($user, $password);
    $cartId = $proxy->shoppingCartCreate($sessionId, 1);
    // load the customer list and select the first customer from the list
    $customerList = $proxy->customerCustomerList($sessionId, array());
    $customer = (array) $customerList[0];
    $customer['mode'] = 'customer';
    $proxy->shoppingCartCustomerSet($sessionId, $cartId, $customer);
    // load the product list and select the first product from the list
    $productList = $proxy->catalogProductList($sessionId);
    $product = (array) $productList[0];
    $product['qty'] = 1;
    $proxy->shoppingCartProductAdd($sessionId, $cartId, array($product));

    $address = array(
        array(
            'mode' => 'shipping',
            'firstname' => $customer['firstname'],
            'lastname' => $customer['lastname'],
            'street' => 'street address',
            'city' => 'city',
            'region' => 'region',
            'telephone' => 'phone number',
            'postcode' => 'postcode',
            'country_id' => 'country ID',
            'is_default_shipping' => 0,
            'is_default_billing' => 0
        ),
        array(
            'mode' => 'billing',
            'firstname' => $customer['firstname'],
            'lastname' => $customer['lastname'],
            'street' => 'street address',
            'city' => 'city',
            'region' => 'region',
            'telephone' => 'phone number',
            'postcode' => 'postcode',
            'country_id' => 'country ID',
            'is_default_shipping' => 0,
            'is_default_billing' => 0
        ),
    );
     // add customer address
    $proxy->shoppingCartCustomerAddresses($sessionId, $cartId, $address);
    // add shipping method
    $proxy->shoppingCartShippingMethod($sessionId, $cartId, 'flatrate_flatrate');

    $paymentMethod =  array(
        'po_number' => null,
        'method' => 'checkmo',
        'cc_cid' => null,
        'cc_owner' => null,
        'cc_number' => null,
        'cc_type' => null,
        'cc_exp_year' => null,
        'cc_exp_month' => null
    );
     // add payment method
    $proxy->shoppingCartPaymentMethod($sessionId, $cartId, $paymentMethod);
     // place the order
    $orderId = $proxy->shoppingCartOrder($sessionId, $cartId, null, null);
```

---

## Cart Product

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cartProduct/cartProduct.html>*

### Mage_Checkout

The Mage_Checkout module allows you to manage shopping carts and the checkout process. This module allows you to create an order once filling the shopping cart is complete.

##### Cart Product

Allows you to manage products in a shopping cart.

**Resource Name**: cart_product

**Methods**:

- [cart_product.add](cart_product.add.html "cart_product.add") - Add one or more products to a shopping cart
- [cart_product.update](cart_product.update.html "cart_product.update") - Update one or more products in a shopping cart
- [cart_product.remove](cart_product.remove.html "cart_product.remove") - Remove one or more products from a shopping cart
- [cart_product.list](cart_product.list.html "cart_product.list") - Get a list of products in a shopping cart
- [cart_product.moveToCustomerQuote](cart_product.moveToCustomerQuote.html "cart_product.moveToCustomerQuote") - Move one or more products from the quote to the customer shopping cart

##### Faults

| Fault Code | Fault Message |
|----|----|
| 1001 | Can not make operation because store is not exists |
| 1002 | Can not make operation because quote is not exists |
| 1021 | Product’s data is not valid. |
| 1022 | Product(s) could not be added. |
| 1023 | Quote could not be saved during adding product(s) operation. |
| 1024 | Product(s) could not be updated. |
| 1025 | Quote could not be saved during updating product(s) operation. |
| 1026 | Product(s) could not be removed. |
| 1027 | Quote could not be saved during removing product(s) operation. |
| 1028 | Customer is not set for quote. |
| 1029 | Customer’s quote is not existed. |
| 1030 | Quotes are identical. |
| 1031 | Product(s) could not be moved. |
| 1032 | One of quote could not be saved during moving product(s) operation. |

---

## cart_product.add — Product Add

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cartProduct/cart_product.add.html>*

### Shopping Cart API

Allows you to create/modify shopping cart and create an order after complete filling the shopping cart. Consists of two main parts: Shopping Cart and Checkout processes.

**Module**: Mage_Checkout

**Resource:** cart_product

#### Method:

- cart_product.add (SOAP V1)
- shoppingCartProductAdd (SOAP V2)

Allows you to add one or more products to the shopping cart (quote).

**Arguments**:

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| int | quoteId | Shopping cart ID (quote ID) |
| array | products\productsData | An array with the list of shoppingCartProductEntity |
| string | storeId | Store view ID or code (optional) |

**Returns**:

| Type    | Description                                                    |
|---------|----------------------------------------------------------------|
| boolean | True on success (if the product is added to the shopping cart) |

The shoppingCartProductEntity array attributes are as follows:

| Type | Name | Description |
|----|----|----|
| string | product_id | ID of the product to be added to the shopping cart (quote) (optional) |
| string | sku | SKU of the product to be added to the shopping cart (quote) (optional) |
| double | qty | Number of products to be added to the shopping cart (quote) (optional) |
| associativeArray | options | An array in the form of option_id =\> content (optional) |
| associativeArray | bundle_option | An array of bundle item options (optional) |
| associativeArray | bundle_option_qty | An array of bundle items quantity (optional) |
| ArrayOfString | links | An array of links (optional) |

**Faults**:\
*No Faults.*

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$quoteId = $proxy->call( $sessionId, 'cart.create', array( 'magento_store' ) );
$arrProducts = array(
	array(
		"product_id" => "1",
		"qty" => 2
                "options" => array(         
                    optionId_1 => optionValue_1,
                    ...,
                    optionId_n => optionValue_n
                 )
	),
	array(
		"sku" => "testSKU",
		"quantity" => 4
	)
);
$resultCartProductAdd = $proxy->call(
	$sessionId,
	"cart_product.add",
	array(
		$quoteId,
		$arrProducts
	)
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 
 
$sessionId = $proxy->login('apiUser', 'apiKey'); 
  
$result = $proxy->shoppingCartProductAdd($sessionId, 10, array(array(
'product_id' => '4',
'sku' => 'simple_product',
'qty' => '5',
'options' => null,
'bundle_option' => null,
'bundle_option_qty' => null,
'links' => null
)));   
 
 
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->shoppingCartProductAdd((object)array('sessionId' => $sessionId->result, 'quoteId' => 10, 'productsData' => array(array(
'product_id' => '4',
'sku' => 'simple_product',
'qty' => '1',
'options' => null,
'bundle_option' => null,
'bundle_option_qty' => null,
'links' => null
))));

var_dump($result->result);
```

---

## cart_product.update — Product Update

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cartProduct/cart_product.update.html>*

### Mage_Checkout

#### Module: Shopping Cart API

##### Resource: cart_product

###### Method:

- cart_product.update (SOAP V1)
- shoppingCartProductUpdate (SOAP V2)

Allows you to update one or several products in the shopping cart (quote).

**Arguments:**

| Type   | Name         | Description                        |
|--------|--------------|------------------------------------|
| string | sessionId    | Session ID                         |
| int    | quoteId      | Shopping cart ID                   |
| array  | productsData | Array of shoppingCartProductEntity |
| string | store        | Store view ID or code (optional)   |

**Return:**

| Type    | Description                    |
|---------|--------------------------------|
| boolean | True if the product is updated |

The **shoppingCartProductEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | product_id | Product ID |
| string | sku | Product SKU |
| double | qty | Product quantity |
| associativeArray | options | Product custom options |
| associativeArray | bundle_option | An array of bundle item options (optional) |
| associativeArray | bundle_option_qty | An array of bundle items quantity (optional) |
| ArrayOfString | links | An array of links (optional) |

**Faults:**\
*No Faults.*

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$shoppingCartIncrementId = $proxy->call( $sessionId, 'cart.create', array( 'magento_store' ) );
$arrProducts = array(
	array(
		"product_id" => "1",
		"qty" => 2
	),
	array(
		"sku" => "testSKU",
		"quantity" => 4
	)
);
$resultCartProductAdd = $proxy->call(
	$sessionId,
	"cart_product.add",
	array(
		$shoppingCartId,
		$arrProducts
	)
);
$arrProducts = array(
	array(
		"product_id" => "1",
		"qty" => 5
	),
);
$resultCartProductUpdate = $proxy->call(
	$sessionId,
	"cart_product.update",
	array(
		$shoppingCartId,
		$arrProducts
	)
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 
 
$sessionId = $proxy->login('apiUser', 'apiKey'); 
  
$result = $proxy->shoppingCartProductUpdate($sessionId, 10, array(array(
'product_id' => '4',
'sku' => 'simple_product',
'qty' => '2',
'options' => null,
'bundle_option' => null,
'bundle_option_qty' => null,
'links' => null
)));   
 
 
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 
 
$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
  
$result = $proxy->shoppingCartProductUpdate((object)array('sessionId' => $sessionId->result, 'quoteId' => 10, 'productsData' => array(array(
'product_id' => '4',
'sku' => 'simple_product',
'qty' => '5',
'options' => null,
'bundle_option' => null,
'bundle_option_qty' => null,
'links' => null
))));   
 
 
var_dump($result->result);
```

---

## cart_product.list — Product List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cartProduct/cart_product.list.html>*

### Mage_Checkout

#### Module: Shopping Cart API

##### Resource: cart_product

###### Method:

- cart_product.list (SOAP V1)
- shoppingCartProductList (SOAP V2)

Allows you to retrieve the list of products in the shopping cart (quote).

**Arguments:**

| Type   | Name      | Description                      |
|--------|-----------|----------------------------------|
| string | sessionId | Session ID                       |
| int    | quoteId   | Shopping cart ID                 |
| string | store     | Store view ID or code (optional) |

**Return:**

| Type  | Name   | Description                                |
|-------|--------|--------------------------------------------|
| array | result | Array of shoppingCartProductResponseEntity |

The **shoppingCartProductResponseEntity** (**catalogProductEntity**) content is as follows:

| Type          | Name         | Description           |
|---------------|--------------|-----------------------|
| string        | product_id   | Product ID            |
| string        | sku          | Product SKU           |
| string        | name         | Product name          |
| string        | set          | Product attribute set |
| string        | type         | Product type          |
| ArrayOfString | category_ids | Array of category IDs |
| ArrayOfString | website_ids  | Array of website IDs  |

**Faults:**

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'cart_product.list', '15');
var_dump ($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->shoppingCartProductList($sessionId, '15');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->shoppingCartProductList((object)array('sessionId' => $sessionId->result, 'quoteId' => 15));   
var_dump($result->result);
```
###### Response Example SOAP V1
```php
array
  0 =>
    array
      'product_id' => string '3' (length=1)
      'sku' => string 'canonxt' (length=7)
      'name' => string 'Canon Digital Rebel XT 8MP Digital SLR Camera' (length=45)
      'set' => string '4' (length=1)
      'type' => string 'simple' (length=6)
      'category_ids' =>
        array
          0 => string '5' (length=1)
      'website_ids' =>
        array
          0 => string '2' (length=1)
```

---

## cart_product.remove — Product Remove

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cartProduct/cart_product.remove.html>*

### Mage_Checkout

#### Module: Shopping Cart API

##### Resource: cart_product

###### Method:

- cart_product.remove (SOAP V1)
- shoppingCartProductRemove (SOAP V2)

Allows you to remove one or several products from a shopping cart (quote).

**Arguments:**

| Type   | Name         | Description                        |
|--------|--------------|------------------------------------|
| string | sessionId    | Session ID                         |
| int    | quoteId      | Shopping cart ID                   |
| array  | productsData | Array of shoppingCartProductEntity |
| string | store        | Store view ID or code (optional)   |

**Return:**

| Type    | Description                    |
|---------|--------------------------------|
| boolean | True if the product is removed |

The **shoppingCartProductEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | product_id | Product ID |
| string | sku | Product SKU |
| double | qty | Product quantity |
| associativeArray | options | Product custom options |
| associativeArray | bundle_option | An array of bundle item options (optional) |
| associativeArray | bundle_option_qty | An array of bundle items quantity (optional) |
| ArrayOfString | links | An array of links (optional) |

**Faults:**\
*No Faults.*

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$shoppingCartIncrementId = $proxy->call( $sessionId, 'cart.create', array( 'magento_store' ) );
$arrProducts = array(
	array(
		"product_id" => "1",
		"qty" => 2
	),
	array(
		"sku" => "testSKU",
		"quantity" => 4
	)
);
$resultCartProductAdd = $proxy->call(
	$sessionId,
	"cart_product.add",
	array(
		$shoppingCartId,
		$arrProducts
	)
);
$arrProducts = array(
	array(
		"product_id" => "1"
	),
);
$resultCartProductUpdate = $proxy->call(
	$sessionId,
	"cart_product.remove",
	array(
		$shoppingCartId,
		$arrProducts
	)
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login('apiUser', 'apiKey'); 
 
$result = $proxy->shoppingCartProductRemove($sessionId, 10, array(array(
'product_id' => '4',
'sku' => 'simple_product',
'qty' => '1',
'options' => null,
'bundle_option' => null,
'bundle_option_qty' => null,
'links' => null
)));   

var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->shoppingCartProductRemove((object)array('sessionId' => $sessionId->result, 'quoteId' => 10, 'productsData' => array(array(
'product_id' => '4',
'sku' => 'simple_product',
'qty' => '1',
'options' => null,
'bundle_option' => null,
'bundle_option_qty' => null,
'links' => null
))));   

var_dump($result->result);
```

---

## cart_product.moveToCustomerQuote — Product Move To Customer Quote

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cartProduct/cart_product.moveToCustomerQuote.html>*

### Mage_Checkout

#### Module: Shopping Cart API

##### Resource: cart_product

###### Method:

- cart_product.moveToCustomerQuote (SOAP V1)
- shoppingCartProductMoveToCustomerQuote (SOAP V2)

Allows you to move products from the current quote to a customer quote.

**Arguments:**

| Type   | Name         | Description                        |
|--------|--------------|------------------------------------|
| string | sessionId    | Session ID                         |
| int    | quoteId      | Shopping cart ID                   |
| array  | productsData | Array of shoppingCartProductEntity |
| string | store        | Store view ID or code (optional)   |

**Return:**

| Type    | Name   | Description                                    |
|---------|--------|------------------------------------------------|
| boolean | result | True if the product is moved to customer quote |

The **shoppingCartProductEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | product_id | Product ID |
| string | sku | Product SKU |
| double | qty | Product quantity |
| associativeArray | options | Product custom options |
| associativeArray | bundle_option | An array of bundle item options (optional) |
| associativeArray | bundle_option_qty | An array of bundle items quantity (optional) |
| ArrayOfString | links | An array of links (optional) |

**Faults:**\
*No Faults.*

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$shoppingCartIncrementId = $proxy->call( $sessionId, 'cart.create', array( 'magento_store' ) );
$arrProducts = array(
	array(
		"product_id" => "1",
		"qty" => 2
	),
	array(
		"sku" => "testSKU",
		"quantity" => 4
	)
);
$resultCartProductAdd = $proxy->call(
	$sessionId,
	"cart_product.add",
	array(
		$shoppingCartId,
		$arrProducts
	)
);
$arrProducts = array(
	array(
		"product_id" => "1"
	),
);
$resultCartProductMove = $proxy->call(
	$sessionId,
	"cart_product.moveToCustomerQuote",
	array(
		$shoppingCartId,
		$arrProducts
	)
);
```

---

## Cart Customer

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cartCustomer/cartCustomer.html>*

### Module: Mage_Checkout

The Mage_Checkout module allows you to manage shopping carts and the checkout process. This module allows you to create an order once filling the shopping cart is complete.

##### Cart Customer

Allows you to add customer information and addresses into a shopping cart.

**Resource Name**: cart_customer

**Methods**:

- [cart_customer.set](cart_customer.set.html "cart_customer.set") - Add customer information into a shopping cart
- [cart_customer.addresses](cart_customer.addresses.html "cart_customer.addresses") - Set the customer addresses (shipping and billing) into a shopping cart

##### Faults

| Fault Code | Fault Message |
|----|----|
| 1001 | Can not make operation because store is not exists |
| 1002 | Can not make operation because quote is not exists |
| 1041 | Customer is not set. |
| 1042 | The customer’s identifier is not valid or customer is not existed |
| 1043 | Customer could not be created. |
| 1044 | Customer data is not valid. |
| 1045 | Customer’s mode is unknown |
| 1051 | Customer address data is empty. |
| 1052 | Customer’s address data is not valid. |
| 1053 | The customer’s address identifier is not valid |
| 1054 | Customer address is not set. |
| 1055 | Customer address identifier do not belong customer, which set in quote |

---

## cart_customer.set — Customer Set

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cartCustomer/cart_customer.set.html>*

### Mage_Checkout

#### Module: Shopping Cart API

##### Resource: cart_customer

###### Method:

- cart_customer.set (SOAP V1)
- shoppingCartCustomerSet (SOAP V2)

Allows you to add information about the customer to a shopping cart (quote).

**Arguments:**

| Type   | Name         | Description                         |
|--------|--------------|-------------------------------------|
| string | sessionId    | Session ID                          |
| int    | quoteId      | Shopping cart ID                    |
| array  | customerData | Array of shoppingCartCustomerEntity |
| string | store        | Store view ID or code (optional)    |

**Return:**

| Type    | Name   | Description                  |
|---------|--------|------------------------------|
| boolean | result | True if information is added |

The **shoppingCartCustomerEntity** content is as follows:

| Type   | Name         | Description            |
|--------|--------------|------------------------|
| string | mode         | Customer mode          |
| int    | customer_id  | Customer ID            |
| string | email        | Customer email address |
| string | firstname    | Customer first name    |
| string | lastname     | Customer last name     |
| string | password     | Customer password      |
| string | confirmation | Confirmation flag      |
| int    | website_id   | Website ID             |
| int    | store_id     | Store ID               |
| int    | group_id     | Group ID               |

**Faults:**\
*No Faults.*

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$shoppingCartId = $proxy->call( $sessionId, 'cart.create', array( 'magento_store' ) );
$customerAsGuest = array(
	"firstname" => "testFirstname",
	"lastname" => "testLastName",
	"email" => "testEmail",
	"website_id" => "0",
	"store_id" => "0",
	"mode" => "guest"
);
$resultCustomerSet = $proxy->call($sessionId, 'cart_customer.set', array( $shoppingCartId, $customerAsGuest) );
```
###### Request Example SOAP V2
```php
$client = new SoapClient('http://magentohost/api/v2_soap/?wsdl');
$session = $client->login('apiUser', 'apiKey');

$quoteId = $client->shoppingCartCreate($session);

$customerData = array(
    "firstname" => "testFirstname",
    "lastname" => "testLastName",
    "email" => "testEmail@mail.com",
    "mode" => "guest",
 "website_id" => "0"
      );

$resultCustomerSet = $client->shoppingCartCustomerSet($session, $quoteId, $customerData);
```

---

## cart_customer.addresses — Customer Addresses

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cartCustomer/cart_customer.addresses.html>*

### Mage_Checkout

#### Module: Shopping Cart API

##### Resource: cart_customer

###### Method:

- cart_customer.addresses (SOAP V1)
- shoppingCartCustomerAddresses (SOAP V2)

Allows you to set the customer addresses in the shopping cart (quote).

**Arguments:**

| Type   | Name                | Description                                |
|--------|---------------------|--------------------------------------------|
| string | sessionId           | Session ID                                 |
| int    | quoteId             | Shopping cart ID                           |
| array  | customerAddressData | Array of shoppingCartCustomerAddressEntity |
| string | store               | Store view ID or code (optional)           |

**Return:**

| Type    | Name   | Description                |
|---------|--------|----------------------------|
| boolean | result | True if the address is set |

The **shoppingCartCustomerAddressEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | mode | Mode: billing or shipping |
| string | address_id | Address ID |
| string | firstname | Customer first name |
| string | lastname | Customer last name |
| string | company | Company name |
| string | street | Street |
| string | city | City |
| string | region | Region |
| string | region_id | Region ID |
| string | postcode | Post code |
| string | country_id | Country ID |
| string | telephone | Telephone number |
| string | fax | Fax number |
| int | is_default_billing | Defines whether the address is a default billing address |
| int | is_default_shipping | Defines whether the address is a default shipping address |

**Faults:**\
*No Faults.*

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$shoppingCartId = $proxy->call( $sessionId, 'cart.create', array( 'magento_store' ) );

$arrAddresses = array(
	array(
		"mode" => "shipping",
		"firstname" => "testFirstname",
		"lastname" => "testLastname",
		"company" => "testCompany",
		"street" => "testStreet",
		"city" => "testCity",
		"region" => "testRegion",
		"postcode" => "testPostcode",
		"country_id" => "id",
		"telephone" => "0123456789",
		"fax" => "0123456789",
		"is_default_shipping" => 0,
		"is_default_billing" => 0
	),
	array(
		"mode" => "billing",
		"address_id" => "customer_address_id"
	)
);

$resultCustomerAddresses = $proxy->call(
	$sessionId,
	"cart_customer.addresses",
	array(
		$shoppingCartId,
		$arrAddresses,
	)
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 
 
$sessionId = $proxy->login('apiUser', 'apiKey'); 
  
$result = $proxy->shoppingCartCustomerAddresses($sessionId, 10, array(array(
'mode' => 'billing',
'firstname' => 'first name',
'lastname' => 'last name',
'street' => 'street address',
'city' => 'city',
'region' => 'region',
'postcode' => 'postcode',
'country_id' => 'US',
'telephone' => '123456789',
'is_default_billing' => 1
)));   
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->shoppingCartCustomerAddresses((object)array('sessionId' => $sessionId->result, 'quoteId' => 10, 'customerAddressData' => array(array(
'mode' => 'billing',
'firstname' => 'first name',
'lastname' => 'last name',
'street' => 'street address',
'city' => 'city',
'region' => 'region',
'postcode' => 'postcode',
'country_id' => 'US',
'telephone' => '123456789',
'is_default_billing' => 1
))));
var_dump($result->result);
```

---

## Cart Shipping

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cartShipping/cartShipping.html>*

### Module: Mage_Checkout

The Mage_Checkout module allows you to manage shopping carts and the checkout process. This module allows you to create an order once filling the shopping cart is complete.

##### Cart Shipping

Allows you to retrieve and set shipping methods for a shopping cart.

**Resource Name**: cart_shipping

**Methods**:

- [cart_shipping.method](cart_shipping.method.html "cart_shipping.method") - Set a shipping method for a shopping cart
- [cart_shipping.list](cart_shipping.list.html "cart_shipping.list") - Retrieve the list of available shipping methods for a shopping cart

##### Faults

| Fault Code | Fault Message |
|----|----|
| 1001 | Can not make operation because store is not exists |
| 1002 | Can not make operation because quote is not exists |
| 1061 | Can not make operation because of customer shipping address is not set |
| 1062 | Shipping method is not available |
| 1063 | Can not set shipping method. |
| 1064 | Can not receive list of shipping methods. |

---

## cart_shipping.list — Shipping List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cartShipping/cart_shipping.list.html>*

### Mage_Checkout

#### Module: Shopping Cart API

##### Resource: cart_shipping

###### Method:

- cart_shipping.list (SOAP V1)
- shoppingCartShippingList (SOAP V2)

Allows you to retrieve the list of available shipping methods for a shopping cart (quote).

**Arguments:**

| Type   | Name      | Description                      |
|--------|-----------|----------------------------------|
| string | sessionId | Session ID                       |
| int    | quoteId   | Shopping cart ID                 |
| string | storeId   | Store view ID or code (optional) |

**Returns:**

| Type  | Name   | Description                               |
|-------|--------|-------------------------------------------|
| array | result | Array of shoppingCartShippingMethodEntity |

The **shoppingCartShippingMethodEntity** content is as follows:

| Type   | Name               | Description                 |
|--------|--------------------|-----------------------------|
| string | code               | Code                        |
| string | carrier            | Carrier                     |
| string | carrier_title      | Carrier title               |
| string | method             | Shipping method             |
| string | method_title       | Shipping method title       |
| string | method_description | Shipping method description |
| double | price              | Shipping price              |

**Faults:**\
*No Faults.*

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl'); 

$sessionId = $proxy->login('apiUser', 'apiKey'); 
 
$result = $proxy->call($sessionId, 'cart_shipping.list', 10);   

var_dump($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login('apiUser', 'apiKey'); 
 
$result = $proxy->shoppingCartShippingList($sessionId, 10);   

var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->shoppingCartShippingList((object)array('sessionId' => $sessionId->result, 'quoteId' => 10));   
var_dump($result->result);
```

---

## cart_shipping.method — Shipping Method

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cartShipping/cart_shipping.method.html>*

### Mage_Checkout

#### Module: Shopping Cart API

##### Resource: cart_shipping

###### Method:

- cart_shipping.method (SOAP V1)
- shoppingCartShippingMethod (SOAP V2)

Allows you to set a shipping method for a shopping cart (quote).

**Arguments:**

| Type   | Name      | Description                      |
|--------|-----------|----------------------------------|
| string | sessionId | Session ID                       |
| int    | quoteId   | Shopping cart ID                 |
| string | method    | Shipping method code             |
| string | storeId   | Store view ID or code (optional) |

**Return:**

| Type    | Name   | Description                        |
|---------|--------|------------------------------------|
| boolean | result | True if the shipping method is set |

**Faults:**\
*No Faults.*

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');

$sessionId = $proxy->login('apiUser', 'apiKey');

$result = $proxy->call($sessionId, 'cart_shipping.method', array(10, 'freeshipping_freeshipping'));

var_dump($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login('apiUser', 'apiKey');

$result = $proxy->shoppingCartShippingMethod($sessionId, 10, 'freeshipping_freeshipping');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->shoppingCartShippingMethod((object)array('sessionId' => $sessionId->result, 'quoteId' => 10, 'shippingMethod' => 'freeshipping_freeshipping'));
var_dump($result->result);
```

---

## Cart Payment

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cartPayment/cartPayment.html>*

### Module: Mage_Checkout

The Mage_Checkout module allows you to manage shopping carts and the checkout process. This module allows you to create an order once filling the shopping cart is complete.

##### Cart Payment

Allows you to retrieve and set payment methods for a shopping cart.

**Resource Name**: cart_payment

**Methods**:

- [cart_payment.method](cart_payment.method.html "cart_payment.method") - Set a payment method for a shopping cart
- [cart_payment.list](cart_payment.list.html "cart_payment.list") - Get the list of available payment methods for a shopping cart

##### Faults

| Fault Code | Fault Message |
|----|----|
| 1001 | Can not make operation because store is not exists |
| 1002 | Can not make operation because quote is not exists |
| 1071 | Payment method data is empty. |
| 1072 | Customer’s billing address is not set. Required for payment method data. |
| 1073 | Customer’s shipping address is not set. Required for payment method data. |
| 1074 | Payment method is not allowed |
| 1075 | Payment method is not set. |

---

## cart_payment.list — Payment List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cartPayment/cart_payment.list.html>*

### Mage_Checkout

#### Module: Shopping Cart API

##### Resource: cart_payment

###### Method:

- cart_payment.list (SOAP V1)
- shoppingCartPaymentList (SOAP V2)

Allows you to retrieve a list of available payment methods for a shopping cart (quote).

**Arguments:**

| Type   | Name      | Description                      |
|--------|-----------|----------------------------------|
| string | sessionId | Session ID                       |
| int    | quoteId   | Shopping cart ID                 |
| string | store     | Store view ID or code (optional) |

**Return:**

| Type  | Name   | Description                                      |
|-------|--------|--------------------------------------------------|
| array | result | Array of shoppingCartPaymentMethodResponseEntity |

The **shoppingCartPaymentMethodResponseEntity** content is as follows:

| Type             | Name     | Description                |
|------------------|----------|----------------------------|
| string           | code     | Payment method code        |
| string           | title    | Payment method title       |
| associativeArray | cc_types | Array of credit card types |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'cart_payment.list', 'quoteId');
var_dump($result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'code' => string 'checkmo' (length=7)
      'title' => string 'Check / Money order' (length=19)
      'ccTypes' => null
  1 =>
    array
      'code' => string 'ccsave' (length=6)
      'title' => string 'Credit Card (saved)' (length=19)
      'ccTypes' =>
        array
          'AE' => string 'American Express' (length=16)
          'VI' => string 'Visa' (length=4)
          'MC' => string 'MasterCard' (length=10)
          'DI' => string 'Discover' (length=8)
```

---

## cart_payment.method — Payment Method

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cartPayment/cart_payment.method.html>*

### Mage_Checkout

#### Module: Shopping Cart API

##### Resource: cart_payment

###### Method:

- cart_payment.method (SOAP V1)
- shoppingCartPaymentMethod (SOAP V2)

Allows you to set a payment method for a shopping cart (quote).

**Arguments:**

| Type   | Name      | Description                              |
|--------|-----------|------------------------------------------|
| string | sessionId | Session ID                               |
| int    | quoteId   | Shopping cart ID                         |
| array  | method    | Array of shoppingCartPaymentMethodEntity |
| string | store     | Store view ID or code (optional)         |

**Return:**

| Type    | Description     |
|---------|-----------------|
| boolean | True on success |

The **shoppingCartPaymentMethodEntity** content is as follows:

| Type   | Name         | Description                  |
|--------|--------------|------------------------------|
| string | po_number    | Purchase order number        |
| string | method       | Payment method               |
| string | cc_cid       | Credit card CID              |
| string | cc_owner     | Credit card owner            |
| string | cc_number    | Credit card number           |
| string | cc_type      | Credit card type             |
| string | cc_exp_year  | Credit card expiration year  |
| string | cc_exp_month | Credit card expiration month |

**Faults:**\
*No Faults.*

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$shoppingCartId = $proxy->call( $sessionId, 'cart.create', array( 'magento_store' ) );

$paymentMethod = array(
	"method" => "checkmo"
);

$resultPaymentMethod = $proxy->call(
	$sessionId,
	"cart_payment.method",
	array(
		$shoppingCartId,
		$paymentMethod
	)
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login('apiUser', 'apiKey'); 
 
$result = $proxy->shoppingCartPaymentMethod($sessionId, 10, array(
'po_number' => null,
'method' => 'checkmo',
'cc_cid' => null,
'cc_owner' => null,
'cc_number' => null,
'cc_type' => null,
'cc_exp_year' => null,
'cc_exp_month' => null
));  
 
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->shoppingCartPaymentMethod((object)array('sessionId' => $sessionId->result, 'quoteId' => 10, 'method' => array(
'po_number' => null,
'method' => 'checkmo',
'cc_cid' => null,
'cc_owner' => null,
'cc_number' => null,
'cc_type' => null,
'cc_exp_year' => null,
'cc_exp_month' => null
)));  
 
var_dump($result->result);
```

---

## Cart Coupon

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cartCoupon/cartCoupon.html>*

### Module: Mage_Checkout

The Mage_Checkout module allows you to manage shopping carts and the checkout process. This module allows you to create an order once filling the shopping cart is complete.

##### Cart Coupon

Allows you to add and remove coupon codes for a shopping cart.

**Resource Name**: cart_coupon

**Methods**:

- [cart_coupon.add](cart_coupon.add.html "cart_coupon.add") - Add a coupon code to a quote
- [cart_coupon.remove](cart_coupon.remove.html "cart_coupon.remove") - Remove a coupon code from a quote

**Note**: In Magento, quotes and shopping carts are logically related, but technically different. The shopping cart is a wrapper for a quote, and it is used primarily by the frontend logic. The cart is represented by the Mage_Checkout_Model_Cart class and the quote is represented by the Mage_Sales_Model_Quote class.

##### Faults

| Fault Code | Fault Message                                       |
|------------|-----------------------------------------------------|
| 1001       | Can not make operation because store is not exists  |
| 1002       | Can not make operation because quote is not exists  |
| 1081       | Coupon could not be applied because quote is empty. |
| 1082       | Coupon could not be applied.                        |
| 1083       | Coupon is not valid.                                |

---

## cart_coupon.add — Coupon Add

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cartCoupon/cart_coupon.add.html>*

### Mage_Checkout

##### Module: Shopping Cart API

##### Resource: cart_coupon

###### Method:

- cart_coupon.add (SOAP V1)
- shoppingCartCouponAdd (SOAP V2)

Allows you to add a coupon code for a shopping cart (quote). The shopping cart must not be empty.

**Arguments:**

| Type   | Name       | Description                      |
|--------|------------|----------------------------------|
| string | sessionId  | Session ID                       |
| int    | quoteId    | Shopping cart ID                 |
| string | couponCode | Coupon code                      |
| string | store      | Store view ID or code (optional) |

**Return:**

| Type    | Description                      |
|---------|----------------------------------|
| boolean | True if the coupon code is added |

**Faults:**

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$shoppingCartId = $proxy->call( $sessionId, 'cart.create', array( 'magento_store' ) );
$couponCode = "aCouponCode";
$resultCartCouponRemove = $proxy->call(
	$sessionId,
	"cart_coupon.add",
	array(
		$shoppingCartId,
		$couponCode
	)
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->shoppingCartCouponAdd($sessionId, '15', 'aCouponCode');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->shoppingCartCouponAdd((object)array('sessionId' => $sessionId->result, 'quoteId' => 15, 'couponCode' => 'aCouponCode', 'store' => '3'));   
var_dump($result->result);
```

---

## cart_coupon.remove — Coupon Remove

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/checkout/cartCoupon/cart_coupon.remove.html>*

### Mage_Checkout

#### Module: Shopping Cart API

##### Resource: cart_coupon

###### Method:

- cart_coupon.remove (SOAP V1)
- shoppingCartCouponRemove (SOAP V2)

Allows you to remove a coupon code from a shopping cart (quote).

**Arguments:**

| Type   | Name      | Description                      |
|--------|-----------|----------------------------------|
| string | sessionId | Session ID                       |
| int    | quoteId   | Shopping cart ID                 |
| string | store     | Store view ID or code (optional) |

**Return:**

| Type    | Description                        |
|---------|------------------------------------|
| boolean | True if the coupon code is removed |

**Faults:**\
*No Faults.*

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$shoppingCartId = $proxy->call( $sessionId, 'cart.create', array( 'magento_store' ) );
$resultCartCouponRemove = $proxy->call(
	$sessionId,
	"cart_coupon.remove",
	array(
		$shoppingCartId
	)
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->shoppingCartCouponRemove($sessionId, '15');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->shoppingCartCouponRemove((object)array('sessionId' => $sessionId->result, 'quoteId' => 15, 'store' => '3'));   
var_dump($result->result);
```

---
