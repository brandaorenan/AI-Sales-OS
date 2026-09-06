# REST API — Sales Orders

> Sales orders endpoints (read-only): list/get orders, order items, addresses and comments.

---

## Sales Orders (sales_orders)

*Source: <https://devdocs-openmage.org/guides/m1x/api/rest/Resources/Orders/sales_orders.html>*

#### REST API: Sales Orders

##### URI: /orders

Allows you to retrieve information on existing order/orders.

**URL Structure**: http://magentohost/api/rest/orders\
**Version**: 1

###### HTTP Method: GET /orders

**Description**: Allows you to retrieve the list of existing orders. Each order contains the following information: general order information, information on ordered items, order comments, and order addresses (both billing and shipping).\
The list of attributes that will be returned for the order is configured in the Magento Admin Panel.

**Authentication**: Admin, Customer, Guest\
**Default Format**: XML

**Response Example: XML**

|                                        |
|----------------------------------------|
| GET http://magentohost/api/rest/orders |
```
<?xml version="1.0"?>
<magento_api>
  <data_item_1>
    <customer_id>3</customer_id>
    <base_discount_amount>0.0000</base_discount_amount>
    <base_shipping_amount>455.0000</base_shipping_amount>
    <base_shipping_tax_amount>0.0000</base_shipping_tax_amount>
    <base_subtotal>13650.0000</base_subtotal>
    <base_tax_amount>0.0000</base_tax_amount>
    <base_total_paid></base_total_paid>
    <base_total_refunded></base_total_refunded>
    <tax_amount>0.0000</tax_amount>
    <total_paid></total_paid>
    <total_refunded></total_refunded>
    <base_shipping_discount_amount>0.0000</base_shipping_discount_amount>
    <base_subtotal_incl_tax>13650.0000</base_subtotal_incl_tax>
    <base_total_due>14105.0000</base_total_due>
    <total_due>14105.0000</total_due>
    <base_currency_code>USD</base_currency_code>
    <tax_name></tax_name>
    <tax_rate></tax_rate>
    <addresses>
      <data_item>
        <region>Palau</region>
        <postcode>19103</postcode>
        <lastname>Doe</lastname>
        <street>2356 Jody Road Philadelphia, PA 19103</street>
        <city>PA</city>
        <telephone>610-634-1181</telephone>
        <country_id>US</country_id>
        <firstname>John</firstname>
        <address_type>billing</address_type>
        <prefix></prefix>
        <middlename></middlename>
        <suffix></suffix>
        <company></company>
      </data_item>
      <data_item>
        <region>Palau</region>
        <postcode>19103</postcode>
        <lastname>Doe</lastname>
        <street>2356 Jody Road Philadelphia, PA 19103</street>
        <city>PA</city>
        <telephone>610-634-1181</telephone>
        <country_id>US</country_id>
        <firstname>John</firstname>
        <address_type>shipping</address_type>
        <prefix></prefix>
        <middlename></middlename>
        <suffix></suffix>
        <company></company>
      </data_item>
    </addresses>
    <order_items>
      <data_item>
        <sku>Sunglasses_1</sku>
        <price>150.0000</price>
        <base_price>150.0000</base_price>
        <base_original_price>150.0000</base_original_price>
        <tax_percent>0.0000</tax_percent>
        <tax_amount>0.0000</tax_amount>
        <base_tax_amount>0.0000</base_tax_amount>
        <base_discount_amount>0.0000</base_discount_amount>
        <base_row_total>13650.0000</base_row_total>
        <base_price_incl_tax>150.0000</base_price_incl_tax>
        <base_row_total_incl_tax>13650.0000</base_row_total_incl_tax>
      </data_item>
    </order_items>
  </data_item_1>
  <data_item_2>
    <customer_id>3</customer_id>
    <base_discount_amount>0.0000</base_discount_amount>
    <base_shipping_amount>95.0000</base_shipping_amount>
    <base_shipping_tax_amount>0.0000</base_shipping_tax_amount>
    <base_subtotal>3350.0000</base_subtotal>
    <base_tax_amount>0.0000</base_tax_amount>
    <base_total_paid>2445.0000</base_total_paid>
    <base_total_refunded>1845.0000</base_total_refunded>
    <tax_amount>0.0000</tax_amount>
    <total_paid>2445.0000</total_paid>
    <total_refunded>1845.0000</total_refunded>
    <base_shipping_discount_amount>0.0000</base_shipping_discount_amount>
    <base_subtotal_incl_tax>3350.0000</base_subtotal_incl_tax>
    <base_total_due>1000.0000</base_total_due>
    <total_due>1000.0000</total_due>
    <base_currency_code>USD</base_currency_code>
    <tax_name></tax_name>
    <tax_rate></tax_rate>
    <addresses>
      <data_item>
        <region>Palau</region>
        <postcode>19103</postcode>
        <lastname>Doe</lastname>
        <street>2356 Jody Road Philadelphia, PA 19103</street>
        <city>PA</city>
        <telephone>610-634-1181</telephone>
        <country_id>US</country_id>
        <firstname>John</firstname>
        <address_type>billing</address_type>
        <prefix></prefix>
        <middlename></middlename>
        <suffix></suffix>
        <company></company>
      </data_item>
      <data_item>
        <region>Palau</region>
        <postcode>19103</postcode>
        <lastname>Doe</lastname>
        <street>2356 Jody Road Philadelphia, PA 19103</street>
        <city>PA</city>
        <telephone>610-634-1181</telephone>
        <country_id>US</country_id>
        <firstname>John</firstname>
        <address_type>shipping</address_type>
        <prefix></prefix>
        <middlename></middlename>
        <suffix></suffix>
        <company></company>
      </data_item>
    </addresses>
    <order_items>
      <data_item>
        <sku>Sunglasses_1</sku>
        <price>150.0000</price>
        <base_price>150.0000</base_price>
        <base_original_price>150.0000</base_original_price>
        <tax_percent>0.0000</tax_percent>
        <tax_amount>0.0000</tax_amount>
        <base_tax_amount>0.0000</base_tax_amount>
        <base_discount_amount>0.0000</base_discount_amount>
        <base_row_total>1350.0000</base_row_total>
        <base_price_incl_tax>150.0000</base_price_incl_tax>
        <base_row_total_incl_tax>1350.0000</base_row_total_incl_tax>
      </data_item>
      <data_item>
        <sku>Sun_glasses</sku>
        <price>200.0000</price>
        <base_price>200.0000</base_price>
        <base_original_price>200.0000</base_original_price>
        <tax_percent>0.0000</tax_percent>
        <tax_amount>0.0000</tax_amount>
        <base_tax_amount>0.0000</base_tax_amount>
        <base_discount_amount>0.0000</base_discount_amount>
        <base_row_total>2000.0000</base_row_total>
        <base_price_incl_tax>200.0000</base_price_incl_tax>
        <base_row_total_incl_tax>2000.0000</base_row_total_incl_tax>
      </data_item>
    </order_items>
  </data_item_2>
</magento_api>
```
###### HTTP Method: POST /orders

**Description**: Not implemented.

###### HTTP Method: PUT /orders

**Description**: Not implemented.

###### HTTP Method: DELETE /orders

**Description**: Not implemented.

#### REST API: Sales Order

##### URI: /orders/:id

Allows you to retrieve information on a single order.\
The list of attributes that will be returned for the order is configured in the Magento Admin Panel.

**URL Structure**: http://magentohost/api/rest/orders/:id\
**Version**: 1

###### HTTP Method: GET /orders/:id

**Description**: Allows you to retrieve the order information.\
**Authentication**: Admin, Customer\
**Default Format**: XML

**Response Example: XML**

|                                           |
|-------------------------------------------|
| GET http://magentohost/api/rest/orders/32 |
```
<?xml version="1.0"?>
<magento_api>
  <customer_id>3</customer_id>
  <base_discount_amount>0.0000</base_discount_amount>
  <base_shipping_amount>0.0000</base_shipping_amount>
  <base_shipping_tax_amount>0.0000</base_shipping_tax_amount>
  <base_subtotal>5220.0000</base_subtotal>
  <base_tax_amount>430.6500</base_tax_amount>
  <base_total_paid></base_total_paid>
  <base_total_refunded></base_total_refunded>
  <tax_amount>304.3300</tax_amount>
  <total_paid></total_paid>
  <total_refunded></total_refunded>
  <base_shipping_discount_amount>0.0000</base_shipping_discount_amount>
  <base_subtotal_incl_tax></base_subtotal_incl_tax>
  <base_total_due></base_total_due>
  <total_due></total_due>
  <base_currency_code>USD</base_currency_code>
  <tax_name>US-CA-*-Rate 1</tax_name>
  <tax_rate>8.2500</tax_rate>
  <addresses>
    <data_item>
      <region>Palau</region>
      <postcode>19103</postcode>
      <lastname>Doe</lastname>
      <street>2356 Jody Road Philadelphia
844 Jefferson Street; 4510 Willis Avenue</street>
      <city>PA</city>
      <telephone>610-634-1181</telephone>
      <country_id>US</country_id>
      <firstname>John</firstname>
      <address_type>billing</address_type>
      <prefix>Dr.</prefix>
      <middlename></middlename>
      <suffix>Jr.</suffix>
      <company></company>
    </data_item>
    <data_item>
      <region>Palau</region>
      <postcode>19103</postcode>
      <lastname>Doe</lastname>
      <street>2356 Jody Road Philadelphia
844 Jefferson Street; 4510 Willis Avenue</street>
      <city>PA</city>
      <telephone>610-634-1181</telephone>
      <country_id>US</country_id>
      <firstname>John</firstname>
      <address_type>shipping</address_type>
      <prefix>Dr.</prefix>
      <middlename></middlename>
      <suffix>Jr.</suffix>
      <company></company>
    </data_item>
  </addresses>
  <order_items>
    <data_item>
      <sku>Sun_glasses</sku>
      <price>141.3400</price>
      <base_price>200.0000</base_price>
      <base_original_price>200.0000</base_original_price>
      <tax_percent>8.2500</tax_percent>
      <tax_amount>11.6600</tax_amount>
      <base_tax_amount>16.5000</base_tax_amount>
      <base_discount_amount>0.0000</base_discount_amount>
      <base_row_total>200.0000</base_row_total>
      <base_price_incl_tax>216.5000</base_price_incl_tax>
      <base_row_total_incl_tax>216.5000</base_row_total_incl_tax>
    </data_item>
    <data_item>
      <sku>Virtual_product</sku>
      <price>14.1340</price>
      <base_price>20.0000</base_price>
      <base_original_price>20.0000</base_original_price>
      <tax_percent>8.2500</tax_percent>
      <tax_amount>1.1700</tax_amount>
      <base_tax_amount>1.6500</base_tax_amount>
      <base_discount_amount>0.0000</base_discount_amount>
      <base_row_total>20.0000</base_row_total>
      <base_price_incl_tax>21.6500</base_price_incl_tax>
      <base_row_total_incl_tax>21.6500</base_row_total_incl_tax>
    </data_item>
    <data_item>
      <sku>test_simple_product</sku>
      <price>353.3500</price>
      <base_price>500.0000</base_price>
      <base_original_price>500.0000</base_original_price>
      <tax_percent>8.2500</tax_percent>
      <tax_amount>291.5000</tax_amount>
      <base_tax_amount>412.5000</base_tax_amount>
      <base_discount_amount>0.0000</base_discount_amount>
      <base_row_total>5000.0000</base_row_total>
      <base_price_incl_tax>541.2500</base_price_incl_tax>
      <base_row_total_incl_tax>5412.5000</base_row_total_incl_tax>
    </data_item>
  </order_items>
</magento_api>
```
###### HTTP Method: POST /orders/:id

**Description**: Not implemented.

###### HTTP Method: PUT /orders/:id

**Description**: Not implemented.

###### HTTP Method: DELETE /orders/:id

**Description**: Not implemented.

---

## Order Items (order_items)

*Source: <https://devdocs-openmage.org/guides/m1x/api/rest/Resources/Orders/order_items.html>*

#### REST API: Order Items

##### URI: /orders/:orderId/items

Allows you to retrieve information about order items.

**URL Structure**: http://magentohost/api/rest/orders/:orderId/items\
**Version**: 1

###### HTTP Method: GET

**Description**: Allows you to retrieve the list of existing order items with detailed items information.\
**Notes**: The list of attributes that will be returned for order items is configured in the Magento Admin Panel.

**Authentication**: Admin\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Response Example: XML**

|                                                  |
|--------------------------------------------------|
| GET http://magentohost/api/rest/orders/410/items |

**Response Body:**
```
<?xml version="1.0"?>
<magento_api>
  <data_item>
    <item_id>43</item_id>
    <parent_item_id></parent_item_id>
    <sku>Sunglasses_1</sku>
    <name>Sunglasses 1</name>
    <qty_canceled>0.0000</qty_canceled>
    <qty_invoiced>0.0000</qty_invoiced>
    <qty_ordered>3.0000</qty_ordered>
    <qty_refunded>0.0000</qty_refunded>
    <qty_shipped>0.0000</qty_shipped>
    <price>74.9137</price>
    <base_price>106.0050</base_price>
    <original_price>106.0050</original_price>
    <base_original_price>150.0000</base_original_price>
    <tax_percent>8.2500</tax_percent>
    <tax_amount>26.2500</tax_amount>
    <base_tax_amount>37.1400</base_tax_amount>
    <discount_amount>212.0100</discount_amount>
    <base_discount_amount>300.0000</base_discount_amount>
    <row_total>318.0300</row_total>
    <base_row_total>450.0000</base_row_total>
    <price_incl_tax>114.7550</price_incl_tax>
    <base_price_incl_tax>162.3800</base_price_incl_tax>
    <row_total_incl_tax>344.2650</row_total_incl_tax>
    <base_row_total_incl_tax>487.1400</base_row_total_incl_tax>
    <status>Ordered</status>
  </data_item>
  <data_item>
    <item_id>44</item_id>
    <parent_item_id></parent_item_id>
    <sku>test_simple_product</sku>
    <name>test simple product</name>
    <qty_canceled>0.0000</qty_canceled>
    <qty_invoiced>0.0000</qty_invoiced>
    <qty_ordered>10.0000</qty_ordered>
    <qty_refunded>0.0000</qty_refunded>
    <qty_shipped>0.0000</qty_shipped>
    <price>249.7124</price>
    <base_price>353.3500</base_price>
    <original_price>353.3500</original_price>
    <base_original_price>500.0000</base_original_price>
    <tax_percent>8.2500</tax_percent>
    <tax_amount>291.5000</tax_amount>
    <base_tax_amount>412.5000</base_tax_amount>
    <discount_amount>706.7000</discount_amount>
    <base_discount_amount>1000.0000</base_discount_amount>
    <row_total>3533.5000</row_total>
    <base_row_total>5000.0000</base_row_total>
    <price_incl_tax>382.5000</price_incl_tax>
    <base_price_incl_tax>541.2500</base_price_incl_tax>
    <row_total_incl_tax>3825.0000</row_total_incl_tax>
    <base_row_total_incl_tax>5412.5000</base_row_total_incl_tax>
    <status>Ordered</status>
  </data_item>
</magento_api>
```
**Authentication**: Customer\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Response Example: XML**

|                                                  |
|--------------------------------------------------|
| GET http://magentohost/api/rest/orders/410/items |

**Response Body:**
```
<?xml version="1.0"?>
<magento_api>
  <data_item>
    <item_id>43</item_id>
    <parent_item_id></parent_item_id>
    <sku>Sunglasses_1</sku>
    <name>Sunglasses 1</name>
    <qty_canceled>0.0000</qty_canceled>
    <qty_invoiced>0.0000</qty_invoiced>
    <qty_ordered>3.0000</qty_ordered>
    <qty_refunded>0.0000</qty_refunded>
    <qty_shipped>0.0000</qty_shipped>
    <price>74.9137</price>
    <row_total>318.0300</row_total>
    <price_incl_tax>114.7550</price_incl_tax>
    <row_total_incl_tax>344.2650</row_total_incl_tax>
  </data_item>
  <data_item>
    <item_id>44</item_id>
    <parent_item_id></parent_item_id>
    <sku>test_simple_product</sku>
    <name>test simple product</name>
    <qty_canceled>0.0000</qty_canceled>
    <qty_invoiced>0.0000</qty_invoiced>
    <qty_ordered>10.0000</qty_ordered>
    <qty_refunded>0.0000</qty_refunded>
    <qty_shipped>0.0000</qty_shipped>
    <price>249.7124</price>
    <row_total>3533.5000</row_total>
    <price_incl_tax>382.5000</price_incl_tax>
    <row_total_incl_tax>3825.0000</row_total_incl_tax>
  </data_item>
</magento_api>
```
###### HTTP Method: POST

**Description**: Not allowed.

###### HTTP Method: PUT

**Description**: Not allowed.

###### HTTP Method: DELETE

**Description**: Not allowed.

---

## Order Addresses (order_addresses)

*Source: <https://devdocs-openmage.org/guides/m1x/api/rest/Resources/Orders/order_addresses.html>*

#### REST API: Order Addresses

##### URI: /orders/:orderid/addresses

Allows you to retrieve information about billing and shipping addresses of the required order.

**URL Structure**: http://magentohost/api/rest/orders/:orderid/addresses\
**Version**: 1

###### HTTP Method: GET

**Description**: Allows you to retrieve information on billing and shipping addresses from the required order.\
**Notes**: Customers can retrieve addresses only from their orders.

**Authentication**: Admin, Customer\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Example:**

|                                                     |
|-----------------------------------------------------|
| GET http://magentohost/api/rest/orders/32/addresses |

**Response Body:**
```
<?xml version="1.0"?>
<magento_api>
  <data_item>
    <region>Palau</region>
    <postcode>19103</postcode>
    <lastname>Doe</lastname>
    <street>2356 Jody Road Philadelphia
844 Jefferson Street; 4510 Willis Avenue</street>
    <city>PA</city>
    <telephone>610-634-1181</telephone>
    <country_id>US</country_id>
    <firstname>John</firstname>
    <address_type>billing</address_type>
    <prefix>Dr.</prefix>
    <middlename></middlename>
    <suffix>Jr.</suffix>
    <company></company>
  </data_item>
  <data_item>
    <region>Massachusetts</region>
    <postcode>01852</postcode>
    <lastname>Doe</lastname>
    <street>1073 Smith Street</street>
    <city>Lowell</city>
    <telephone>508-857-6870</telephone>
    <country_id>US</country_id>
    <firstname>John</firstname>
    <address_type>shipping</address_type>
    <prefix></prefix>
    <middlename></middlename>
    <suffix></suffix>
    <company></company>
  </data_item>
</magento_api>
```
###### HTTP Method: POST

**Description**: Not allowed.

###### HTTP Method: PUT

**Description**: Not allowed.

###### HTTP Method: DELETE

**Description**: Not allowed.

##### URI: /orders/:orderid/addresses/billing

###### HTTP Method: GET

**Description**: Allows you to retrieve information on the order billing address.\
**Notes**: Customers can retrieve information on billing addresses only from their own orders.

**Authentication**: Admin, Customer\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Example:**

|                                                             |
|-------------------------------------------------------------|
| GET http://magentohost/api/rest/orders/32/addresses/billing |

**Response example:**
```
<?xml version="1.0"?>
<magento_api>
  <region>Palau</region>
  <postcode>19103</postcode>
  <lastname>Doe</lastname>
  <street>2356 Jody Road Philadelphia
844 Jefferson Street; 4510 Willis Avenue</street>
  <city>PA</city>
  <telephone>610-634-1181</telephone>
  <country_id>US</country_id>
  <firstname>John</firstname>
  <address_type>billing</address_type>
  <prefix>Dr.</prefix>
  <middlename></middlename>
  <suffix>Jr.</suffix>
  <company></company>
</magento_api>
```
###### HTTP Method: POST

**Description**: Not allowed.

###### HTTP Method: PUT

**Description**: Not allowed.

###### HTTP Method: DELETE

**Description**: Not allowed.

##### URI: /orders/:orderid/addresses/shipping

###### HTTP Method: GET

**Description**: Allows you to retrieve information on the order shipping address.\
**Notes**: Customers can retrieve information on shipping addresses only from their own orders.

**Authentication**: Admin, Customer\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Example:**

|                                                              |
|--------------------------------------------------------------|
| GET http://magentohost/api/rest/orders/32/addresses/shipping |

**Response example:**
```
<?xml version="1.0"?>
<magento_api>
  <region>Massachusetts</region>
  <postcode>01852</postcode>
  <lastname>Doe</lastname>
  <street>1073 Smith Street</street>
  <city>Lowell</city>
  <telephone>508-857-6870</telephone>
  <country_id>US</country_id>
  <firstname>John</firstname>
  <address_type>shipping</address_type>
  <prefix></prefix>
  <middlename></middlename>
  <suffix></suffix>
  <company></company>
</magento_api>
```
###### HTTP Method: POST

**Description**: Not allowed.

###### HTTP Method: PUT

**Description**: Not allowed.

###### HTTP Method: DELETE

**Description**: Not allowed.

#### Order Addresses Attributes

| Attribute Name | Attribute Description |
|----|----|
| Customer Last Name | Customer last name |
| Customer First Name | Customer first name |
| Customer Middle Name | Customer middle name or initial |
| Customer Prefix | Customer prefix |
| Customer Suffix | Customer suffix |
| Company | Company name |
| Street | Street address |
| City | City |
| State | State |
| ZIP/Postal Code | ZIP or postal code |
| Country | Country name |
| Phone Number | Customer phone number |
| Address Type | Address type. Can have the following values: billing or shipping |

---

## Order Comments (order_comments)

*Source: <https://devdocs-openmage.org/guides/m1x/api/rest/Resources/Orders/order_comments.html>*

#### REST API: Order Comments

##### URI: /orders/:orderid/comments

Allows you to retrieve information about comments of the required order.

**URL Structure**: http://magentohost/api/rest/orders/:orderid/comments\
**Version**: 1

###### HTTP Method: GET

**Description**: Allows you to retrieve information about comments of the required order.

**Authentication**: Admin\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Example:**

|                                                    |
|----------------------------------------------------|
| GET http://magentohost/api/rest/orders/33/comments |

**Response Body:**
```
<?xml version="1.0"?>
<magento_api>
  <data_item>
    <created_at>2012-03-09 11:20:49</created_at>
    <comment></comment>
    <is_customer_notified>1</is_customer_notified>
    <is_visible_on_front>0</is_visible_on_front>
    <status>pending</status>
  </data_item>
  <data_item>
    <created_at>2012-03-09 11:21:32</created_at>
    <comment>This is a new order for John Doe.</comment>
    <is_customer_notified>1</is_customer_notified>
    <is_visible_on_front>1</is_visible_on_front>
    <status>pending</status>
  </data_item>
</magento_api>
```
**Authentication**: Customer\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Example:**

|                                                    |
|----------------------------------------------------|
| GET http://magentohost/api/rest/orders/33/comments |

**Response Body:**
```
<?xml version="1.0"?>
<magento_api>
  <data_item>
    <created_at>2012-03-09 11:21:32</created_at>
    <comment>This is a new order for John Doe.</comment>
  </data_item>
</magento_api>
```
###### HTTP Method: POST

**Description**: Not allowed.

###### HTTP Method: PUT

**Description**: Not allowed.

###### HTTP Method: DELETE

**Description**: Not allowed.

#### Order Comments Attributes

| Attribute Name | Attribute Description | Notes |
|----|----|----|
| Comment Date | Date when the comment was added | Admin and Customer |
| Comment Text | Comment text | Admin and Customer |
| Is Customer Notified | Defines whether the customer is notified about the comment. Can have the following values: 0 - Customer is not notified, 1 - Customer is notified. | Admin only |
| Is Comment Visible on Frontend | Defines whether the comment is visible on the frontend. Can have the following values: 0 - Comment is not visible, 1 - Comment is visible. | Admin only |
| Comment Status | Comment status. | Admin only |

---
