# Magento 1.9 API — Integration Guide for AI Agents

> This guide distills the full API reference (in `soap-api/` and `rest-api/`) into the practical knowledge an AI agent needs to integrate with a Magento 1.9 store.

---

## Table of Contents

1. [Choosing SOAP vs REST](#choosing-soap-vs-rest)
2. [Authentication](#authentication)
3. [Setting Up API Access in Magento Admin](#setting-up-api-access-in-magento-admin)
4. [Key Endpoints](#key-endpoints)
5. [Common Integration Flows](#common-integration-flows)
6. [Filtering and Pagination](#filtering-and-pagination)
7. [Working with Store Views](#working-with-store-views)
8. [Error Handling](#error-handling)
9. [Code Examples (PHP)](#code-examples-php)
10. [Code Examples (Python)](#code-examples-python)
11. [Pitfalls and Gotchas](#pitfalls-and-gotchas)
12. [What the REST API Can and Cannot Do](#what-the-rest-api-can-and-cannot-do)

---

## Choosing SOAP vs REST

| Capability | SOAP | REST |
|---|---|---|
| Read products, customers, orders | **Yes** | **Yes** |
| Create/update/delete products | **Yes** | **Yes** |
| Create orders (full checkout flow) | **Yes** | **No** |
| Manage shopping cart | **Yes** | **No** |
| Manage inventory | **Yes** | **Yes** |
| Customer CRUD with addresses | **Yes** | **Yes** |
| Invoices, shipments, credit memos | **Yes** | **No** (read-only) |
| Authentication | Session (username/password) | OAuth 1.0a |
| Best for | **Full operations, order creation** | Simple CRUD, mobile apps |

**Recommendation for AI agents:** Use **SOAP v2** as the primary protocol. It is the only way to create orders and manage the full order lifecycle. Use REST only for lightweight read operations or if OAuth is a hard requirement.

---

## Authentication

### SOAP

```php
$client = new SoapClient('http://magentohost/api/v2_soap/?wsdl=1');
$session = $client->login('apiUser', 'apiKey');
// $session contains the session ID string
```

- **SOAP v1:** `$client->call($session, 'resource.method', $args)` — uses dotted resource paths.
- **SOAP v2:** `$client->resourceMethod($session, $args)` — uses camelCase method names.
- **WS-I mode** (since Magento 1.6): wraps args in `(object)array('username'=>'...','apiKey'=>'...')` for Java/.NET compatibility.

### REST (OAuth 1.0a)

1. Register a new REST consumer in **System > Web Services > REST - OAuth Consumers**.
2. Obtain request token, authorize via admin, exchange for access token.
3. Sign each request with the access token (Authorization header).

See `rest-api/02-authentication-oauth.md` for the full PHP OAuth flow.

---

## Setting Up API Access in Magento Admin

### For SOAP

1. **System > Web Services > SOAP/XML-RPC - Users** → Create an API user with username and API key.
2. **System > Web Services > SOAP/XML-RPC - Roles** → Create a role, set **Resource Access** to the resources this user needs (e.g., "Sales > Orders" for order access, or "All" for full access).
3. Assign the role to the user.

### For REST

1. **System > Web Services > REST - OAuth Consumers** → Create a consumer (generates consumer key/secret).
2. **System > Web Services > REST - Roles** → Create a role, select resources.
3. **System > Web Services > REST - Attributes** → Configure which attributes are accessible per role (customer and product attributes).
4. Assign the role to the consumer via the OAuth authorization flow.

---

## Key Endpoints

### SOAP WSDL URLs

| Version | URL |
|---|---|
| SOAP v1 | `http://magentohost/api/?wsdl` or `http://magentohost/api/soap/?wsdl` |
| SOAP v2 | `http://magentohost/api/v2_soap?wsdl=1` |
| SOAP v2 WS-I | `http://magentohost/api/v2_soap/?wsdl=1` (enable WS-I in System > Configuration > Magento Core API) |

### REST Base URL

```
http://magentohost/api/rest/
```

| Resource | Endpoints |
|---|---|
| Products | `GET/POST /api/rest/products`, `GET/PUT/DELETE /api/rest/products/:id` |
| Customers | `GET/POST /api/rest/customers`, `GET/PUT/DELETE /api/rest/customers/:id` |
| Customer Addresses | `GET/POST /api/rest/customers/:id/addresses` |
| Orders | `GET /api/rest/orders`, `GET /api/rest/orders/:id` (read-only!) |
| Order Items | `GET /api/rest/orders/:id/items` |
| Inventory | `GET/PUT /api/rest/stockItems/:id` |

---

## Common Integration Flows

### Flow 1: Create a Customer

**SOAP v2:**

```php
$customerId = $client->customerCreate($session, array(
    'email'     => 'customer@example.com',
    'firstname' => 'John',
    'lastname'  => 'Doe',
    'password'  => 'password123',
    'website_id'=> 1,
    'store_id'  => 1,
    'group_id'  => 1
));
```

### Flow 2: Create an Order (Full Checkout via Cart API)

This is the **only** way to create orders via the Magento 1.x API. REST cannot do this.

```php
// 1. Create empty shopping cart (returns cart ID / quote ID)
$cartId = $client->shoppingCartCreate($session, 1); // store_id = 1

// 2. Set customer (for registered customer)
$client->shoppingCartCustomerSet($session, $cartId, array(
    'customer_id' => $customerId,
    'mode'        => 'customer'  // or 'guest' or 'register'
));

// 3. Add product to cart
$client->shoppingCartProductAdd($session, $cartId, array(
    array(
        'product_id' => $productId,
        'qty'        => 2
    )
));

// 4. Set shipping address
$client->shoppingCartCustomerAddresses($session, $cartId, array(
    array(
        'mode' => 'shipping',
        'firstname' => 'John',
        'lastname'  => 'Doe',
        'street'    => array('123 Main St', 'Apt 4'),
        'city'      => 'Sao Paulo',
        'region'    => 'SP',
        'postcode'  => '01310-100',
        'country_id'=> 'BR',
        'telephone' => '11999999999',
        'is_default_shipping' => 1
    ),
    array(
        'mode' => 'billing',
        'firstname' => 'John',
        'lastname'  => 'Doe',
        'street'    => array('123 Main St', 'Apt 4'),
        'city'      => 'Sao Paulo',
        'region'    => 'SP',
        'postcode'  => '01310-100',
        'country_id'=> 'BR',
        'telephone' => '11999999999',
        'is_default_billing' => 1
    )
));

// 5. Set shipping method
$shippingMethods = $client->shoppingCartShippingList($session, $cartId);
$client->shoppingCartShippingMethod($session, $cartId, $shippingMethods[0]->code);

// 6. Set payment method
$paymentMethods = $client->shoppingCartPaymentList($session, $cartId);
$client->shoppingCartPaymentMethod($session, $cartId, $paymentMethods[0]->code);

// 7. (Optional) Apply coupon
// $client->shoppingCartCouponAdd($session, $cartId, 'COUPON_CODE');

// 8. Place order
$orderId = $client->shoppingCartOrder($session, $cartId);
```

### Flow 3: List Orders with Filters

```php
// SOAP v2 — simple filter
$result = $client->salesOrderList($session, array(
    'filter' => array(
        array('key' => 'status', 'value' => 'pending'),
        array('key' => 'created_at', 'value' => '2024-01-01 00:00:00')
    )
));

// SOAP v2 — complex filter (comparison operators)
$result = $client->salesOrderList($session, array(
    'complex_filter' => array(
        array(
            'key'   => 'grand_total',
            'value' => array('key' => 'gt', 'value' => '100')
        ),
        array(
            'key'   => 'status',
            'value' => array('key' => 'in', 'value' => 'pending,processing')
        )
    )
));
```

### Flow 4: Create Invoice and Shipment

```php
// Create invoice for an order
$invoiceId = $client->salesOrderInvoiceCreate($session, $orderId);

// Capture invoice payment
$client->salesOrderInvoiceCapture($session, $invoiceId);

// Create shipment with tracking
$shipmentId = $client->salesOrderShipmentCreate($session, array(
    'orderIncrementId' => $orderIncrementId,
    'itemsQty'        => array('order_item_id' => 1),
    'comment'         => 'Shipped by AI agent',
    'email'           => 1
));

// Add tracking number
$client->salesOrderShipmentAddTrack($session, $shipmentId, array(
    'carrier'     => 'correios',
    'title'       => 'PAC',
    'track_number'=> 'AB123456789BR'
));
```

### Flow 5: Update Stock

```php
// SOAP v2 — single product
$client->catalogInventoryStockItemList($session, 'SKU123'); // to check current
$client->catalogInventoryStockItemUpdate($session, 'SKU123', array(
    'qty'        => 50,
    'is_in_stock' => 1
));
```

---

## Filtering and Pagination

### SOAP Filters

Filters in SOAP v2 use two structures:

- **Simple filter** (`filter`): exact match. `array('key' => 'status', 'value' => 'pending')`
- **Complex filter** (`complex_filter`): comparison operators:

| Operator | Meaning |
|---|---|
| `eq` | Equals |
| `neq` | Not equals |
| `like` | LIKE (SQL) |
| `nlike` | NOT LIKE |
| `in` | In (comma-separated values) |
| `nin` | Not in |
| `null` | IS NULL |
| `notnull` | IS NOT NULL |
| `gt` | Greater than |
| `lt` | Less than |
| `gteq` | Greater than or equal |
| `lteq` | Less than or equal |

### REST Filters

```
GET /api/rest/orders?filter[1][attribute]=status&filter[1][in][0]=pending&filter[1][in][1]=processing
GET /api/rest/orders?filter[2][attribute]=grand_total&filter[2][gt]=100
GET /api/rest/orders?order=created_at&dir=desc&page=1&limit=50
```

Pagination via `page` and `limit` query parameters.

---

## Working with Store Views

Magento 1 is multi-store. Each store has a **store view** with its own ID/code.

```php
// List stores
$stores = $client->storeList($session);

// Set the working store view for catalog operations
$client->catalogProductCurrentStore($session, 'german'); // by store code
$client->catalogProductCurrentStore($session, 2);       // by store view ID

// Pass storeView to create/update to set store-specific values
$client->catalogProductUpdate($session, 'SKU123', array(
    'name' => 'German Product Name'
), 2); // 2 = store view ID
```

---

## Error Handling

### SOAP Global Faults

| Code | Meaning |
|---|---|
| 0 | Unknown error |
| 1 | Internal error. More details in message |
| 2 | Access denied |
| 3 | Invalid API path |
| 4 | Resource path is not callable |

### SOAP v2 Resource Faults

Each resource defines its own fault codes. Common pattern:

```php
try {
    $result = $client->salesOrderInfo($session, 'nonexistent');
} catch (SoapFault $e) {
    echo "Fault code: " . $e->faultcode . "\n";
    echo "Message: " . $e->getMessage() . "\n";
}
```

### REST HTTP Status Codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Resource created |
| 204 | Resource deleted |
| 400 | Bad request (malformed data) |
| 401 | Unauthorized (missing/invalid OAuth) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Resource not found |
| 405 | Method not allowed |
| 406 | Not acceptable (wrong Accept header) |

---

## Code Examples (PHP)

### SOAP v2 Full Session

```php
<?php
$wsdlUrl = 'http://magentohost/api/v2_soap/?wsdl=1';
$username = 'api_user';
$apiKey   = 'api_key';

try {
    $client  = new SoapClient($wsdlUrl);
    $session = $client->login($username, $apiKey);

    // --- your API calls here ---
    // e.g.: $orders = $client->salesOrderList($session);

    // End session when done
    // $client->endSession($session);
} catch (SoapFault $e) {
    echo "SOAP Error: " . $e->getMessage();
}
```

### REST OAuth Flow (condensed)

```php
<?php
// Requires PECL oauth extension
$consumerKey    = 'your_consumer_key';
$consumerSecret = 'your_consumer_secret';
$baseUrl        = 'http://magentohost/api/rest';

// Step 1: Get request token
$oauth = new OAuth($consumerKey, $consumerSecret, OAUTH_SIG_METHOD_HMACSHA1);
$oauth->setTokenUrl($baseUrl . '/oauth/token/request');
$requestToken = $oauth->getRequestToken();

// Step 2: User authorizes at: $baseUrl/oauth/authorize?oauth_token=...
// Step 3: Exchange for access token
$oauth->setTokenUrl($baseUrl . '/oauth/token/access');
$oauth->setToken($requestToken['oauth_token'], $requestToken['oauth_token_secret']);
$accessToken = $oauth->getAccessToken();

// Step 4: Make authenticated requests
$oauth->setToken($accessToken['oauth_token'], $accessToken['oauth_token_secret']);
$oauth->fetch($baseUrl . '/products');
$products = json_decode($oauth->getLastResponse());
```

---

## Code Examples (Python)

### SOAP v2 with Zeep

```python
from zeep import Client, Settings

wsdl = 'http://magentohost/api/v2_soap/?wsdl=1'
settings = Settings(strict=False)
client = Client(wsdl, settings=settings)

session_id = client.service.login('api_user', 'api_key')

# List orders
orders = client.service.salesOrderList(session_id, {'filter': []})
for order in orders:
    print(f"Order {order['increment_id']}: {order['status']} - {order['grand_total']}")

# Get order detail
order = client.service.salesOrderInfo(session_id, '100000001')

# Update stock
client.service.catalogInventoryStockItemUpdate(
    session_id, 'SKU123', {'qty': '50', 'is_in_stock': '1'}
)

# Create customer
customer_id = client.service.customerCreate(session_id, {
    'email': 'customer@example.com',
    'firstname': 'John',
    'lastname': 'Doe',
    'password': 'password123',
    'website_id': '1',
    'store_id': '1',
    'group_id': '1'
})
```

### REST with requests_oauthlib

```python
import requests
from requests_oauthlib import OAuth1

base_url = 'http://magentohost/api/rest'
oauth = OAuth1(
    'consumer_key', 'consumer_secret',
    'access_token', 'access_token_secret'
)

# List products (JSON)
r = requests.get(f'{base_url}/products', auth=oauth, headers={'Accept': 'application/json'})
products = r.json()

# Get single product
r = requests.get(f'{base_url}/products/42', auth=oauth)

# Update product
r = requests.put(f'{base_url}/products/42', auth=oauth,
    json={'name': 'Updated Name'},
    headers={'Content-Type': 'application/json'})
```

---

## Pitfalls and Gotchas

1. **SOAP v1 vs v2 method names:** v1 uses `call($session, 'sales_order.list')` with dots; v2 uses `salesOrderList($session)`. They are **not interchangeable**.

2. **SOAP v2 filters must be arrays:** Even an empty filter must be `array()` or `{'filter': []}`. Passing `null` may work in some PHP versions but fails in others.

3. **Product prices:** Magento recommends passing only 2 decimal places. More precision (e.g., 12.3487) causes tax calculation inaccuracies.

4. **Cart order placement is NOT atomic:** The `shoppingCartOrder` call creates the order, but if payment capture fails the order stays in "pending". You must handle invoices and shipments separately.

5. **REST cannot create orders:** This is the #1 limitation. You MUST use SOAP Cart API for order creation. REST orders endpoints are read-only.

6. **Session expiration:** SOAP sessions can expire. Implement re-login logic or use `startSession()` / `endSession()` explicitly.

7. **Store view scope:** When updating products, the `storeView` parameter determines whether you update global values (0) or store-specific values. Omitting it updates only the default/admin store view.

8. **WS-I mode changes the WSDL:** Enabling WS-I compliance in Magento admin changes the v2 WSDL structure. Clients generated from the non-WS-I WSDL will break.

9. **Enterprise-only resources:** Gift cards (`enterpriseGiftCard`), customer balance/store credit (`enterprise_customerbalance`), and gift messages (`enterpriseGiftMessage`) are **Enterprise Edition only**. Community Edition (including OpenMage LTS) does not have these.

10. **Multiple products in cart:** `shoppingCartProductAdd` takes an **array** of product arrays, even for a single product.

11. **Country/region codes:** Use ISO country codes (e.g., `BR`, `US`) and region codes (e.g., `SP`, `CA`). Use `directoryCountryList` and `directoryRegionList` to get valid options.

12. **File uploads (product images):** Product media creation via SOAP sends file contents as base64-encoded strings. The `mime_type` field must match the actual file type.

---

## What the REST API Can and Cannot Do

### Can do (with Admin auth):
- **Products:** Full CRUD, manage categories, images, website assignments
- **Customers:** Full CRUD, manage addresses
- **Orders:** **Read only** — list, get details, items, addresses, comments
- **Inventory:** Get and update stock items

### Cannot do:
- Create, update, or cancel orders
- Manage shopping carts
- Create invoices, shipments, or credit memos
- Manage catalog categories independently
- Manage customer groups

---

## Quick Reference: Which File to Read

| Task | File |
|---|---|
| Understand SOAP basics, endpoints, auth | `soap-api/01-introduction-authentication.md` |
| List/create/update categories | `soap-api/02-catalog-category.md` |
| List/create/update products | `soap-api/03-catalog-product.md` |
| Manage attributes, attribute sets | `soap-api/04-product-attributes-sets.md` |
| Product images, options, links, tier prices | `soap-api/05-product-media-options-links.md` |
| Update stock levels | `soap-api/06-inventory.md` |
| Create/update customers | `soap-api/07-customer.md` |
| List/get orders, comments, hold/cancel | `soap-api/08-sales-order.md` |
| Create invoices, shipments, credit memos | `soap-api/09-invoice-shipment-creditmemo.md` |
| **Create orders (cart checkout flow)** | `soap-api/10-checkout-cart.md` |
| Countries, regions, store info | `soap-api/11-directory-store.md` |
| Build custom API endpoints | `soap-api/12-custom-api-wsi.md` |
| REST overview and resources | `rest-api/01-introduction.md` |
| REST OAuth setup | `rest-api/02-authentication-oauth.md` |
| REST HTTP methods, filters, status codes | `rest-api/03-http-methods-filters-status-codes.md` |
| REST permissions and roles | `rest-api/04-permissions-settings.md` |
| REST products CRUD | `rest-api/05-products.md` |
| REST orders (read-only) | `rest-api/06-orders.md` |
| REST customers | `rest-api/07-customers.md` |
| REST inventory and testing | `rest-api/08-inventory-formats-testing.md` |
