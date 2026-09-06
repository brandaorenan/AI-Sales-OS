# REST API — Products

> Products endpoints: list/get/create/update/delete, categories, images and websites per product.

---

## Products

*Source: <https://devdocs-openmage.org/guides/m1x/api/rest/Resources/Products/products.html>*

#### REST API: Products

##### URI: /products

Allows you to retrieve the list of all products with detailed information.

**URL Structure**: http://magentohost/api/rest/products\
**Version**: 1

###### HTTP Method: GET /products

**Description**: Allows you to retrieve the list of all products with detailed information.\
**Notes**: The list of attributes that will be returned in the response is configured in the Magento Admin Panel. The list of attributes differs for each type of user.

**Authentication**: Admin\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

|                                          |
|------------------------------------------|
| GET http://magentohost/api/rest/products |

**Response Example: XML**
```
<?xml version="1.0"?>
<magento_api>
  <data_item>
    <entity_id>1</entity_id>
    <type_id>simple</type_id>
    <sku>dress_test</sku>
    <status>1</status>
    <visibility>4</visibility>
    <tax_class_id>2</tax_class_id>
    <weight>1.0000</weight>
    <price>1500.0000</price>
    <special_price>1000.0000</special_price>
    <name>Wedding dress</name>
    <url_key>dress</url_key>
    <country_of_manufacture>AO</country_of_manufacture>
    <msrp_display_actual_price_type>2</msrp_display_actual_price_type>
    <gift_message_available>1</gift_message_available>
    <news_from_date>2012-03-21 00:00:00</news_from_date>
    <news_to_date>2012-03-24 00:00:00</news_to_date>
    <special_from_date>2012-03-21 00:00:00</special_from_date>
    <special_to_date>2012-03-24 00:00:00</special_to_date>
    <description>White wedding dress</description>
  </data_item>
  <data_item>
    <entity_id>2</entity_id>
    <type_id>simple</type_id>
    <sku>black_sunglasses</sku>
    <status>1</status>
    <visibility>4</visibility>
    <tax_class_id>2</tax_class_id>
    <weight>0.2000</weight>
    <price>500.0000</price>
    <special_price>300.0000</special_price>
    <name>Sunglasses</name>
    <url_key>sunglasses</url_key>
    <country_of_manufacture>AR</country_of_manufacture>
    <msrp_display_actual_price_type>2</msrp_display_actual_price_type>
    <gift_message_available></gift_message_available>
    <news_from_date></news_from_date>
    <news_to_date></news_to_date>
    <special_from_date>2012-03-21 00:00:00</special_from_date>
    <special_to_date>2012-03-24 00:00:00</special_to_date>
    <description>Black sunglasses</description>
  </data_item>
</magento_api>
```
**Response Example: JSON**
```
{"1":{"entity_id":"1","type_id":"simple","sku":"dress_test","status":"1","visibility":"4","tax_class_id":"2","weight":"1.0000","price":"1500.0000","special_price":"1000.0000","name":"Wedding dress","url_key":"dress","country_of_manufacture":"AO","msrp_display_actual_price_type":"2","gift_message_available":"1","news_from_date":"2012-03-21 00:00:00","news_to_date":"2012-03-24 00:00:00","special_from_date":"2012-03-21 00:00:00","special_to_date":"2012-03-24 00:00:00","description":"White wedding dress"},"2":{"entity_id":"2","type_id":"simple","sku":"black_sunglasses","status":"1","visibility":"4","tax_class_id":"2","weight":"0.2000","price":"500.0000","special_price":"300.0000","name":"Sunglasses","url_key":"sunglasses","country_of_manufacture":"AR","msrp_display_actual_price_type":"2","gift_message_available":null,"news_from_date":null,"news_to_date":null,"special_from_date":"2012-03-21 00:00:00","special_to_date":"2012-03-24 00:00:00","description":"Black sunglasses"}}
```
**Authentication**: Customer, Guest\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

|                                          |
|------------------------------------------|
| GET http://magentohost/api/rest/products |

**Response Example: XML**
```
<?xml version="1.0"?>
<magento_api>
  <data_item>
    <entity_id>1</entity_id>
    <type_id>simple</type_id>
    <sku>dress_test</sku>
    <description>White wedding dress</description>
    <short_description>dress</short_description>
    <meta_keyword>white, dress</meta_keyword>
    <name>Wedding dress</name>
    <meta_title>dress</meta_title>
    <meta_description>A nice wedding dress</meta_description>
    <regular_price_with_tax>1500</regular_price_with_tax>
    <regular_price_without_tax>1500</regular_price_without_tax>
    <final_price_with_tax>1000</final_price_with_tax>
    <final_price_without_tax>1000</final_price_without_tax>
    <is_saleable>1</is_saleable>
    <image_url>http://magentohost/media/catalog/product/cache/0/image/9df78eab33525d08d6e5fb8d27136e95/1/2/wedding_dress.jpg</image_url>
  </data_item>
  <data_item>
    <entity_id>2</entity_id>
    <type_id>simple</type_id>
    <sku>black_sunglasses</sku>
    <description>Black sunglasses</description>
    <short_description>Black sunglasses</short_description>
    <meta_keyword>sunglasses, black</meta_keyword>
    <name>Sunglasses</name>
    <meta_title>sunglasses</meta_title>
    <meta_description>black sunglasses</meta_description>
    <regular_price_with_tax>500</regular_price_with_tax>
    <regular_price_without_tax>500</regular_price_without_tax>
    <final_price_with_tax>300</final_price_with_tax>
    <final_price_without_tax>300</final_price_without_tax>
    <is_saleable>1</is_saleable>
    <image_url>http://magentohost/media/catalog/product/cache/0/image/9df78eab33525d08d6e5fb8d27136e95/a/l/sunglasses-1.jpg</image_url>
  </data_item>
</magento_api>
```
**Response Example: JSON**
```
{"1":{"entity_id":"1","type_id":"simple","sku":"dress_test","description":"White wedding dress","short_description":"dress","meta_keyword":"white, dress","name":"Wedding dress","meta_title":"dress","meta_description":"A nice wedding dress","regular_price_with_tax":1500,"regular_price_without_tax":1500,"final_price_with_tax":1000,"final_price_without_tax":1000,"is_saleable":"1","image_url":"http:\/\/magentohost\/media\/catalog\/product\/cache\/0\/image\/9df78eab33525d08d6e5fb8d27136e95\/1\/2\/wedding_dress.jpg"},"2":{"entity_id":"2","type_id":"simple","sku":"black_sunglasses","description":"Black sunglasses","short_description":"Black sunglasses","meta_keyword":"sunglasses, black","name":"Sunglasses","meta_title":"sunglasses","meta_description":"black sunglasses","regular_price_with_tax":500,"regular_price_without_tax":500,"final_price_with_tax":300,"final_price_without_tax":300,"is_saleable":"1","image_url":"http:\/\/magentohost\/media\/catalog\/product\/cache\/0\/image\/9df78eab33525d08d6e5fb8d27136e95\/a\/l\/sunglasses-1.jpg"}}
```
###### HTTP Method: GET /products/category_id=:id

**Description**: Allows you to retrieve the list of products of a specified category. These products will be returned in the product position ascending order.

In the following example, product with ID=4 has position equal to 7 and the product with ID=3 has position equal to 1. The list of products, therefore, is sorted by the product position in the category.

|                                                        |
|--------------------------------------------------------|
| GET http://magentohost/api/rest/products?category_id=5 |

**Response Example: XML**
```
<?xml version="1.0"?>
<magento_api>
  <data_item>
    <entity_id>4</entity_id>
    <attribute_set_id>4</attribute_set_id>
    <type_id>simple</type_id>
    <tax_class_id>2</tax_class_id>
    <weight>1.0000</weight>
    <price>329.9900</price>
  </data_item>
  <data_item>
    <entity_id>3</entity_id>
    <attribute_set_id>4</attribute_set_id>
    <type_id>simple</type_id>
    <tax_class_id>2</tax_class_id>
    <weight>1.0000</weight>
    <price>550.0000</price>
  </data_item>
</magento_api>
```
###### HTTP Method: POST /products

**Description**: Allows you to create a new simple product.

**Authentication**: Admin\
**Default Format**: JSON\
**Parameters**: 

| Name | Description | Required | Type | Example Value |
|----|----|----|----|----|
| type_id | Product type. Can have the "simple" value. | required | string | simple |
| attribute_set_id | Attribute set for the product. | required | int | 4 |
| sku | Product SKU | required | string | new_product |
| name | Product name | required | string | New product |
| meta_title | Product meta title | optional | string | new product |
| meta_description | Product meta description | optional | string | This is a new product |
| url_key | A friendly URL path for the product | optional | string | new-product |
| custom_design | Custom design applied for the product page | optional | string | enterprise/default |
| page_layout | Page template that can be applied to the product page | optional | string | one_column |
| options_container | Defines how the custom options for the product will be displayed. Can have the following values: Block after Info Column or Product Info Column | optional | string | container2 |
| country_of_manufacture | Product country of manufacture | optional | string | AD |
| msrp_enabled | The Apply MAP option. Defines whether the price in the catalog in the frontend is substituted with a Click for price link | optional | int | 1 |
| msrp_display_actual_price_type | Defines how the price will be displayed in the frontend. Can have the following values: In Cart, Before Order Confirmation, and On Gesture | optional | int | 2 |
| gift_message_available | Defines whether the gift message is available for the product | optional | int | 1 |
| price | Product price | required | string | 2000 |
| special_price | Product special price | optional | string | 150 |
| weight | Product weight | required | string | 0.5 |
| msrp | The Manufacturer's Suggested Retail Price option. The price that a manufacturer suggests to sell the product at | optional | string | 140 |
| status | Product status. Can have the following values: 1- Enabled, 2 - Disabled. | required | int | 1 |
| visibility | Product visibility. Can have the following values: 1 - Not Visible Individually, 2 - Catalog, 3 - Search, 4 - Catalog, Search. | required | int | 4 |
| enable_googlecheckout | Defines whether the product can be purchased with the help of the Google Checkout payment service. Can have the following values: Yes and No | optional | int | 1 |
| tax_class_id | Product tax class. Can have the following values: 0 - None, 2 - taxable Goods, 4 - Shipping, etc., depending on created tax classes. | required | int | 7 |
| description | Product description. | required | string | This is a new product. |
| short_description | Product short description. | required | string | A new product. |
| meta_keyword | Product meta keywords | optional | string | new |
| custom_layout_update | An XML block to alter the page layout | optional | string | XML body |
| special_from_date | Date starting from which the special price will be applied to the product | optional | string | 2012-03-15 00:00:00 |
| special_to_date | Date till which the special price will be applied to the product | optional | string | 2012-03-15 00:00:00 |
| news_from_date | Date starting from which the product is promoted as a new product | optional | string | 2012-03-15 00:00:00 |
| news_to_date | Date till which the product is promoted as a new product | optional | string | 2012-03-15 00:00:00 |
| custom_design_from | Date starting from which the custom design will be applied to the product page | optional | string | 2012-03-15 00:00:00 |
| custom_design_to | Date till which the custom design will be applied to the product page | optional | string | 2012-03-15 00:00:00 |
| group_price | Product group price | optional | array | array of group price |
| tier_price | Product tier price | optional | array | array of tier price |
| stock_data | Product inventory data | optional | array | array of stock data |

Array of **Group Price** attributes is as follows:

| Name       | Description    | Required | Type   | Example Value |
|------------|----------------|----------|--------|---------------|
| website_id | Website ID     | optional | int    | 0             |
| cust_group | Customer group | optional | int    | 1             |
| price      | Group price    | optional | string | 140           |

Array of **Tier Price** attributes is as follows:

| Name       | Description    | Required | Type   | Example Value |
|------------|----------------|----------|--------|---------------|
| website_id | Website ID     | optional | int    | 0             |
| cust_group | Customer group | optional | int    | 1             |
| price      | Tier price     | optional | string | 140           |
| price_qty  | Price quantity | optional | string | 10            |

Array of **Stock Data** attributes is as follows:

| Name | Description | Required | Type | Example Value |
|----|----|----|----|----|
| qty | Quantity of stock items for the current product | optional | string | 99 |
| min_qty | Quantity for stock items to become out of stock | optional | string | 5 |
| use_config_min_qty | Choose whether the Config settings will be applied for the Qty for Item's Status to Become Out of Stock option | optional | int | 1 |
| is_qty_decimal | Choose whether the product can be sold using decimals (e.g., you can buy 2.5 product) | optional | int | 1 |
| backorders | Defines whether the customer can place the order for products that are out of stock at the moment. | optional | int | 0 |
| use_config_backorders | Choose whether the Config settings will be applied for the Backorders option | optional | int | 1 |
| min_sale_qty | Minimum number of items in the shopping cart to be sold | optional | string | 10 |
| use_config_min_sale_qty | Choose whether the Config settings will be applied for the Minimum Qty Allowed in Shopping Cart option | optional | int | 1 |
| max_sale_qty | Maximum number of items in the shopping cart to be sold | optional | string | 50 |
| use_config_max_sale_qty | Choose whether the Config settings will be applied for the Maximum Qty Allowed in Shopping Cart option | optional | int | 1 |
| is_in_stock | Defines whether the product is available for selling. | optional | int | 1 |
| notify_stock_qty | The number of inventory items below which the customer will be notified | optional | string | 5 |
| use_config_notify_stock_qty | Choose whether the Config settings will be applied for the Notify for Quantity Below option | optional | int | 1 |
| manage_stock | Choose whether to view and specify the product quantity and availability and whether the product is in stock management. | optional | int | 1 |
| use_config_manage_stock | Choose whether the Config settings will be applied for the Manage Stock option | optional | int | 1 |
| use_config_qty_increments | Choose whether the Config settings will be applied for the Qty Increments option | optional | int | 1 |
| qty_increments | The product quantity increment value | optional | string | 3 |
| use_config_enable_qty_inc | Choose whether the Config settings will be applied for the Enable Qty Increments option | optional | int | 1 |
| enable_qty_increments | Defines whether the customer can add products only in increments to the shopping cart | optional | int | 0 |
| is_decimal_divided | Defines whether the stock items can be divided into multiple boxes for shipping | optional | int | 0 |

|                                           |
|-------------------------------------------|
| POST http://magentohost/api/rest/products |

**Request Example: JSON**
```
{
  "custom_design" : "default/blank",
  "custom_design_from" : "02/16/2012",
  "custom_design_to" : "05/01/2012",
  "description" : "Test description",
  "gift_message_available" : 1,
  "meta_description" : "Test meta",
  "meta_keyword" : "Test keyword",
  "meta_title" : "Test title",
  "msrp" : 11.015000000000001,
  "msrp_display_actual_price_type" : 1,
  "msrp_enabled" : 1,
  "name" : "Test",
  "news_from_date" : "02/16/2012",
  "news_to_date" : "16.02.2012",
  "options_container" : "container1",
  "page_layout" : "one_column",
  "price" : 25.5,
  "attribute_set_id" : "4",
  "short_description" : "Test short description",
  "sku" : "simple4f5490f31959f",
  "special_from_date" : "02/16/2012",
  "special_price" : 11.199999999999999,
  "special_to_date" : "03/17/2012",
  "status" : 1,
  "stock_data" : { "backorders" : 1,
      "enable_qty_increments" : 0,
      "is_in_stock" : 0,
      "is_qty_decimal" : 0,
      "manage_stock" : 1,
      "max_sale_qty" : 1,
      "min_qty" : 1.5600000000000001,
      "min_sale_qty" : 1,
      "notify_stock_qty" : -50.990000000000002,
      "qty" : 1,
      "use_config_manage_stock" : 1,
      "use_config_min_qty" : 1,
      "use_config_min_sale_qty": 1,
      "use_config_max_sale_qty" : 1,
      "use_config_backorders": 1,
      "use_config_enable_qty_inc":1,
      "use_config_notify_stock_qty":1 },
  "tax_class_id" : "2",
  "type_id" : "simple",
  "use_config_gift_message_available" : 0,
  "visibility" : "4",
  "weight" : 125
}
```
**Request Example: XML**
```
<?xml version="1.0"?>
<magento_api>
  <attribute_set_id>4</attribute_set_id>
  <type_id>simple</type_id>
  <sku>test_dress</sku>
  <name>Test_dress</name>
  <country_of_manufacture>AD</country_of_manufacture>
  <price>2000.0000</price>
  <special_price>1500.0000</special_price>
  <weight>0.5000</weight>
  <status>1</status>
  <visibility>4</visibility>
  <tax_class_id>7</tax_class_id>
  <description>dress</description>
  <short_description>Wedding dress</short_description>
</magento_api>
```
##### URI: /products/:id

Allows you to retrieve, update, and delete a specified product in Magento.

**URL Structure**: http://magentohost/api/rest/products/:id\
**Version**: 1

###### HTTP Method: GET /products/:id

**Description**: Allows you to retrieve information on a required simple product.\
**Notes**: The list of attributes that will be returned in the response is configured in the Magento Admin Panel. The list of attributes differs for each type of user.

**Authentication**: Admin\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

|                                            |
|--------------------------------------------|
| GET http://magentohost/api/rest/products/8 |

**Response Example: XML**
```
<?xml version="1.0"?>
<magento_api>
  <entity_id>8</entity_id>
  <attribute_set_id>4</attribute_set_id>
  <type_id>simple</type_id>
  <sku>dress</sku>
  <name>Dress</name>
  <url_key>my-new-dress</url_key>
  <country_of_manufacture>AD</country_of_manufacture>
  <msrp_display_actual_price_type>2</msrp_display_actual_price_type>
  <gift_message_available>1</gift_message_available>
  <price>2000.0000</price>
  <weight>0.5000</weight>
  <status>1</status>
  <visibility>4</visibility>
  <tax_class_id>7</tax_class_id>
  <description>dress</description>
  <group_price>
    <data_item>
      <website_id>0</website_id>
      <cust_group>1</cust_group>
      <price>1400.0000</price>
    </data_item>
  </group_price>
  <tier_price>
    <data_item>
      <website_id>0</website_id>
      <cust_group>1</cust_group>
      <price>1300.0000</price>
      <price_qty>1.0000</price_qty>
    </data_item>
  </tier_price>
  <stock_data>
    <qty>50.0000</qty>
    <min_qty>0.0000</min_qty>
    <use_config_min_qty>1</use_config_min_qty>
    <is_qty_decimal>0</is_qty_decimal>
    <backorders>0</backorders>
    <use_config_backorders>1</use_config_backorders>
    <min_sale_qty>1.0000</min_sale_qty>
    <use_config_min_sale_qty>1</use_config_min_sale_qty>
    <max_sale_qty>0.0000</max_sale_qty>
    <use_config_max_sale_qty>1</use_config_max_sale_qty>
    <is_in_stock>1</is_in_stock>
    <notify_stock_qty></notify_stock_qty>
    <use_config_notify_stock_qty>1</use_config_notify_stock_qty>
    <manage_stock>0</manage_stock>
    <use_config_manage_stock>1</use_config_manage_stock>
    <use_config_qty_increments>1</use_config_qty_increments>
    <qty_increments>0.0000</qty_increments>
    <use_config_enable_qty_inc>1</use_config_enable_qty_inc>
    <enable_qty_increments>0</enable_qty_increments>
    <is_decimal_divided>0</is_decimal_divided>
    <use_config_enable_qty_increments>1</use_config_enable_qty_increments>
  </stock_data>
</magento_api>
```
**Response Example: JSON**
```
{"entity_id":"8","attribute_set_id":"4","type_id":"simple","sku":"dress","name":"Dress","url_key":"my-new-dress","country_of_manufacture":"AD","msrp_display_actual_price_type":"2","gift_message_available":"1","price":"2000.0000","weight":"0.5000","status":"1","visibility":"4","tax_class_id":"7","description":"dress","group_price":[{"website_id":"0","cust_group":"1","price":"1400.0000"}],"tier_price":[{"website_id":"0","cust_group":"1","price":"1300.0000","price_qty":"1.0000"}],"stock_data":{"qty":"50.0000","min_qty":"0.0000","use_config_min_qty":"1","is_qty_decimal":"0","backorders":"0","use_config_backorders":"1","min_sale_qty":"1.0000","use_config_min_sale_qty":"1","max_sale_qty":"0.0000","use_config_max_sale_qty":"1","is_in_stock":"1","notify_stock_qty":null,"use_config_notify_stock_qty":"1","manage_stock":"0","use_config_manage_stock":"1","use_config_qty_increments":"1","qty_increments":"0.0000","use_config_enable_qty_inc":"1","enable_qty_increments":"0","is_decimal_divided":"0","use_config_enable_qty_increments":"1"}}
```
**Authentication**: Customer, Guest\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

|                                            |
|--------------------------------------------|
| GET http://magentohost/api/rest/products/8 |

**Response Example: XML**
```
<?xml version="1.0"?>
<magento_api>
  <entity_id>1</entity_id>
  <type_id>simple</type_id>
  <sku>dress_test</sku>
  <name>Wedding dress</name>
  <meta_title>dress</meta_title>
  <meta_description>A nice wedding dress</meta_description>
  <description>White wedding dress</description>
  <short_description>dress</short_description>
  <meta_keyword>white, dress</meta_keyword>
  <tier_price/>
  <is_in_stock>1</is_in_stock>
  <regular_price_with_tax>1500</regular_price_with_tax>
  <regular_price_without_tax>1500</regular_price_without_tax>
  <final_price_with_tax>1000</final_price_with_tax>
  <final_price_without_tax>1000</final_price_without_tax>
  <is_saleable>1</is_saleable>
  <image_url>http://magento/media/catalog/product/cache/0/image/9df78eab33525d08d6e5fb8d27136e95/1/2/wedding_dress.jpg</image_url>
  <url>http://magento/index.php/catalog/product/view/id/1/s/dress/</url>
  <buy_now_url>http://magento/index.php/checkout/cart/add/uenc/aHR0cDovLzEyNy4wLjAuMS9Tb3VyY2VzL2FwaS9yZXN0L3Byb2R1Y3RzLzE,/product/1/</buy_now_url>
  <total_reviews_count>0</total_reviews_count>
  <has_custom_options></has_custom_options>
</magento_api>
```
**Response Example: JSON**
```
{"entity_id":"1","type_id":"simple","sku":"dress_test","name":"Wedding dress","meta_title":"dress","meta_description":"A nice wedding dress","description":"White wedding dress","short_description":"dress","meta_keyword":"white, dress","tier_price":[],"is_in_stock":"1","regular_price_with_tax":1500,"regular_price_without_tax":1500,"final_price_with_tax":1000,"final_price_without_tax":1000,"is_saleable":"1","image_url":"http:\/\/magento\/media\/catalog\/product\/cache\/0\/image\/9df78eab33525d08d6e5fb8d27136e95\/1\/2\/wedding_dress.jpg","url":"http:\/\/magento\/index.php\/catalog\/product\/view\/id\/1\/s\/dress\/","buy_now_url":"http:\/\/magento\/index.php\/checkout\/cart\/add\/uenc\/aHR0cDovLzEyNy4wLjAuMS9Tb3VyY2VzL2FwaS9yZXN0L3Byb2R1Y3RzLzE,\/product\/1\/","total_reviews_count":"0","has_custom_options":false}
```
###### HTTP Method: PUT /products/:id

**Description**: Allows you to update an existing product.

**Authentication**: Admin\
**Default Format**: JSON\
**Parameters**:\
*Enter only those parameters which you want to update.*

|  |
|----|
| PUT http://magentohost/api/rest/products/8 PUT for specific store http://magentohost/api/rest/products/8/store/3 |

**Request Example: JSON**
```
{
"attribute_set_id":"4",
"type_id":"simple",
"sku":"wedding dress",
"name":"Dress_test",
"meta_title":"dress",
"meta_description":"a wedding dress",
"price":"2000.0000",
"weight":"0.5000",
"status":"1",
"visibility":"4",
"enable_googlecheckout":"1",
"tax_class_id":"7",
"description":"dress",
"meta_keyword":"dress, wedding"
}
```
**Request Example: XML**
```
<?xml version="1.0"?>
<magento_api>
  <attribute_set_id>4</attribute_set_id>
  <type_id>simple</type_id>
  <sku>wedding dress</sku>
  <name>Dress_test</name>
  <meta_title>dress</meta_title>
  <price>2000.0000</price>
  <weight>0.5000</weight>
  <status>1</status>
  <visibility>4</visibility>
  <enable_googlecheckout>1</enable_googlecheckout>
  <tax_class_id>7</tax_class_id>
  <description>dress</description>
  <meta_keyword>dress, wedding</meta_keyword>
</magento_api>
```
###### HTTP Method: DELETE /products/:id

**Description**: Allows you to delete an existing product.

**Authentication**: Admin\
**Default Format**: JSON\
**Parameters**: *no parameters*\
**Request Example**:

|                                               |
|-----------------------------------------------|
| DELETE http://magentohost/api/rest/products/1 |

##### Possible HTTP Status Codes

| Status Code | Message | Description |
|----|----|----|
| 404 | Resource not found. | The required resource is not found. |
| 405 | Resource method not implemented yet. | The required method is not implemented yet. |
| 405 | Resource does not support method. | The current resource does not support the specified method. |

---

## Product Categories (product_categories)

*Source: <https://devdocs-openmage.org/guides/m1x/api/rest/Resources/Products/product_categories.html>*

#### REST API: Product Categories

##### URI: /products/productid/categories

Allows you to retrieve information about assigned categories, assign, and unassign a category from/to a product.

**URL Structure**: http://magentohost/api/rest/products/productid/categories\
**Version**: 1

###### HTTP Method: GET

**Description**: Allows you to retrieve information about categories assigned to the specified product.

**Authentication**: Admin, Customer\
**Default Format**: JSON\
**Parameters**:\
*No Parameters*

**Example:**

|                                                       |
|-------------------------------------------------------|
| GET http://magentohost/api/rest/products/8/categories |

**Response Body:**
```
{
     category_id: 8
}
```
###### HTTP Method: POST

**Description**: Allows you to assign a category to a specified product.

**Authentication**: Admin\
**Default Format**: JSON\
**Parameters**:

| Name        | Description     | Required | Type | Example Value |
|-------------|-----------------|----------|------|---------------|
| category_id | The category ID | required | int  | 2             |

**Example:**

|                                                        |
|--------------------------------------------------------|
| POST http://magentohost/api/rest/products/8/categories |

**Request Body:**
```
{
"category_id":"2"
}
```
As a result, the category with ID equal to 2 will be assigned to the specified product.

##### URI: /products/productid/categories/categoryid

###### HTTP Method: DELETE

**Description**: Allows you to unassign a category from a specified product.

**Authentication**: Admin\
**Default Format**: JSON\
**Parameters**:\
*No Parameters*

**Example:**

|                                                            |
|------------------------------------------------------------|
| DELETE http://magentohost/api/rest/products/8/categories/2 |

##### Possible HTTP Status Codes

| Status Code | Message | Description |
|----|----|----|
| 400 | Product \<product ID\> is already assigned to category \<category ID\> | The message is returned when the required category is already assigned to the product |
| 400 | Category not found | The specified category is not found |
| 405 | Resource method not implemented yet | The specified method is not implemented yet |

---

## Product Images (product_images)

*Source: <https://devdocs-openmage.org/guides/m1x/api/rest/Resources/Products/product_images.html>*

#### REST API: Product Images

##### URI: /products/:product_id/images

Allows you to manage images of the required product.

**URL Structure**: http://magentohost/api/rest/products/:product_id/images\
**Version**: 1

###### HTTP Method: GET

**Description**: Allows you to retrieve information about all images of a specified product.\
**Notes**: If there are custom attributes with the **Catalog Input Type for Store Owner** option set to **Media Image**, these attributes will be also returned in the response as an image type.

**Authentication**: Admin, Customer, Guest\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Example:**

|                                                   |
|---------------------------------------------------|
| GET http://magentohost/api/rest/products/8/images |

**Response Body:**
```
<?xml version="1.0"?>
<magento_api>
  <data_item>
    <id>5</id>
    <label></label>
    <position>1</position>
    <exclude>0</exclude>
    <url>http://magento/media/catalog/product/v/e/ve2011.jpg</url>
    <types>
      <data_item>image</data_item>
      <data_item>thumbnail</data_item>
    </types>
  </data_item>
  <data_item>
    <id>7</id>
    <label>second dress</label>
    <position>2</position>
    <exclude>1</exclude>
    <url>http://magento/media/catalog/product/1/2/12.jpg</url>
    <types>
      <data_item>small_image</data_item>
    </types>
  </data_item>
</magento_api>
```
###### HTTP Method: POST

**Description**: Allows you to add an image for the required product.

**Authentication**: Admin\
**Default Format**: XML\
**Parameters**:

| Name | Description | Required | Type | Example Value |
|----|----|----|----|----|
| file_mime_type | File mime type. Can have the following values: image/jpeg, image/png, etc. | required | string | image/jpeg |
| file_content | Graphic image file content (base_64 encoded) | required | string | iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWtJREFUeNpi/P//P8NgBkwMgxyMOnDUgTDAyMhIDNYF4vNA/B+IDwCxHLoakgEoFxODiQRXQUYi4e3k2gfDjMRajsP3zED8F8pmA+JvUDEYeArEMugOpFcanA/Ef6A0CPwC4uNoag5SnAjJjGI2tKhkg4rLAfFGIH4IxEuBWIjSKKYkDfZCHddLiwChVhokK8YGohwEZYy3aBmEKmDEhOCgreomo+VmZHxsMEQxIc2MAx3FO/DI3RxMmQTZkI9ALDCaSUYdOOrAIeRAPzQ+PxCHUM2FFDb5paGNBPRa5C20bUhxc4sSB4JaLnvxVHWHsbVu6OnACjyOg+HqgXKgGRD/JMKBoD6LDb0dyAPE94hwHAw/hGYcujlwEQmOg+EV9HJgLBmOg+FMWjsQVKR8psCBoDSrQqoDSSmoG6Hpj1wA6ju30LI9+BBX4UsC+Ai0T4BWVd1EIL5PgeO+APECmoXgaGtm1IE0AgABBgAJAICuV8dAUAAAAABJRU5ErkJggg== |
| file_name | Name for the added image file | optional | string | new image |

**Note**: If the file_name parameter is not defined, the original file name is set for the image. The first created image will be called "image", the second created image will be called "image_2", etc.

**Example:**

|                                                    |
|----------------------------------------------------|
| POST http://magentohost/api/rest/products/1/images |

**Request Body:**
```
<?xml version="1.0"?>
<magento_api>
  <file_mime_type>image/jpeg</file_mime_type>     <file_content>iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWtJREFUeNpi/P//P8NgBkwMgxyMOnDUgTDAyMhIDNYF4vNA/B+IDwCxHLoakgEoFxODiQRXQUYi4e3k2gfDjMRajsP3zED8F8pmA+JvUDEYeArEMugOpFcanA/Ef6A0CPwC4uNoag5SnAjJjGI2tKhkg4rLAfFGIH4IxEuBWIjSKKYkDfZCHddLiwChVhokK8YGohwEZYy3aBmEKmDEhOCgreomo+VmZHxsMEQxIc2MAx3FO/DI3RxMmQTZkI9ALDCaSUYdOOrAIeRAPzQ+PxCHUM2FFDb5paGNBPRa5C20bUhxc4sSB4JaLnvxVHWHsbVu6OnACjyOg+HqgXKgGRD/JMKBoD6LDb0dyAPE94hwHAw/hGYcujlwEQmOg+EV9HJgLBmOg+FMWjsQVKR8psCBoDSrQqoDSSmoG6Hpj1wA6ju30LI9+BBX4UsC+Ai0T4BWVd1EIL5PgeO+APECmoXgaGtm1IE0AgABBgAJAICuV8dAUAAAAABJRU5ErkJggg==</file_content>
</magento_api>
```
##### URI: /products/:product_id/images/store/:store_id

Allows you to manage product images for a specified store.

**URL Structure**: http://magentohost/api/rest/products/:product_id/images/store/:store_id\
**Version**: 1

###### HTTP Method: GET

**Description**: Allows you to retrieve information about product images for a specified store view.\
**Notes:** Images can have different labels for different stores. For example, image label "flower" in the English store view can be set as "fleur" in the French store view. If there are custom attributes with the **Catalog Input Type for Store Owner** option set to **Media Image**, these attributes will be also returned in the response as an image type.

**Authentication**: Admin, Customer, Guest\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Example:**

|                                                           |
|-----------------------------------------------------------|
| GET http://magentohost/api/rest/products/8/images/store/2 |

**Response Body:**
```
<?xml version="1.0"?>
<magento_api>
  <data_item>
    <id>6</id>
    <label>white dress</label>
    <position>1</position>
    <exclude>0</exclude>
    <url>http://magento/media/catalog/product/1/2/12.jpg</url>
    <types>
      <data_item>image</data_item>
      <data_item>small_image</data_item>
      <data_item>thumbnail</data_item>
    </types>
  </data_item>
</magento_api>
```
###### HTTP Method: POST

**Description**: Allows you to add an image for the required product with image settings for a specific store.\
**Notes**: The image is added on the Global level; specified image parameters are set for a specific store.

**Authentication**: Admin\
**Default Format**: XML\
**Parameters**:

| Name | Description | Required | Type | Example Value |
|----|----|----|----|----|
| file_mime_type | File mime type. Can have the following values: image/jpeg, image/png, etc. | required | string | image/png |
| file_content | Graphic image file content (base_64 encoded) | required | string | iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWtJREFUeNpi/P//P8NgBkwMgxyMOnDUgTDAyMhIDNYF4vNA/B+IDwCxHLoakgEoFxODiQRXQUYi4e3k2gfDjMRajsP3zED8F8pmA+JvUDEYeArEMugOpFcanA/Ef6A0CPwC4uNoag5SnAjJjGI2tKhkg4rLAfFGIH4IxEuBWIjSKKYkDfZCHddLiwChVhokK8YGohwEZYy3aBmEKmDEhOCgreomo+VmZHxsMEQxIc2MAx3FO/DI3RxMmQTZkI9ALDCaSUYdOOrAIeRAPzQ+PxCHUM2FFDb5paGNBPRa5C20bUhxc4sSB4JaLnvxVHWHsbVu6OnACjyOg+HqgXKgGRD/JMKBoD6LDb0dyAPE94hwHAw/hGYcujlwEQmOg+EV9HJgLBmOg+FMWjsQVKR8psCBoDSrQqoDSSmoG6Hpj1wA6ju30LI9+BBX4UsC+Ai0T4BWVd1EIL5PgeO+APECmoXgaGtm1IE0AgABBgAJAICuV8dAUAAAAABJRU5ErkJggg== |
| file_name | Name for the added image file | optional | string | test image |

**Note**: If the file_name parameter is not defined, the original file name is set for the image. The first created image will be called "image", the second created image will be called "image_2", etc.

**Example:**

|                                                            |
|------------------------------------------------------------|
| POST http://magentohost/api/rest/products/8/images/store/3 |

**Request Body:**
```
<?xml version="1.0"?>
<magento_api>
  <file_mime_type>image/jpeg</file_mime_type>    <file_content>iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWtJREFUeNpi/P//P8NgBkwMgxyMOnDUgTDAyMhIDNYF4vNA/B+IDwCxHLoakgEoFxODiQRXQUYi4e3k2gfDjMRajsP3zED8F8pmA+JvUDEYeArEMugOpFcanA/Ef6A0CPwC4uNoag5SnAjJjGI2tKhkg4rLAfFGIH4IxEuBWIjSKKYkDfZCHddLiwChVhokK8YGohwEZYy3aBmEKmDEhOCgreomo+VmZHxsMEQxIc2MAx3FO/DI3RxMmQTZkI9ALDCaSUYdOOrAIeRAPzQ+PxCHUM2FFDb5paGNBPRa5C20bUhxc4sSB4JaLnvxVHWHsbVu6OnACjyOg+HqgXKgGRD/JMKBoD6LDb0dyAPE94hwHAw/hGYcujlwEQmOg+EV9HJgLBmOg+FMWjsQVKR8psCBoDSrQqoDSSmoG6Hpj1wA6ju30LI9+BBX4UsC+Ai0T4BWVd1EIL5PgeO+APECmoXgaGtm1IE0AgABBgAJAICuV8dAUAAAAABJRU5ErkJggg==</file_content>
</magento_api>
```
##### URI: /products/:product_id/images/:image_id

Allows you to manage a specified product image.

**URL Structure**: http://magentohost/api/rest/products/:product_id/images/:image_id\
**Version**: 1

###### HTTP Method: GET

**Description**: Allows you to retrieve information about a specified product image.\
**Notes**: If there are custom attributes with the **Catalog Input Type for Store Owner** option set to **Media Image**, these attributes will be also returned in the response as an image type.

**Authentication**: Admin, Customer, Guest\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Example:**

|                                                     |
|-----------------------------------------------------|
| GET http://magentohost/api/rest/products/8/images/7 |

**Response Body:**
```
<?xml version="1.0"?>
<magento_api>
  <id>7</id>
  <label>second dress</label>
  <position>2</position>
  <exclude>1</exclude>
  <url>http://magento/media/catalog/product/1/2/12.jpg</url>
  <types>
    <data_item>small_image</data_item>
  </types>
</magento_api>
```
###### HTTP Method: PUT

**Description**: Allows you to update information for the specified product image.\
**Notes**: When updating information, you need to pass only those parameters that you want to be updated. Parameters that were not passed in the request, will preserve the previous values.

**Authentication**: Admin\
**Default Format**: XML\
**Parameters**:

| Name | Description | Required | Type | Example |
|----|----|----|----|----|
| exclude | Defines whether the image will associate only to one of the three image types. | optional | int | 0 |
| file_content | Image file content (base_64 encoded). | optional | string | base_64 encoded file content |
| file_mime_type | File mime type. Can have the following values: image/jpeg, image/png, etc. | optional | string | image/png |
| file_name | Image file name. | optional  | string | test name |
| label | A label that will be displayed on the frontend when pointing to the image | optional | string | test label |
| position | The Sort Order option. The order in which the images are displayed in the MORE VIEWS section. | optional | int | 1 |
| types | Array of image types. Can have the following values: image, small_image, and thumbnail. | optional | array | thumbnail |

**Example:**

|                                                     |
|-----------------------------------------------------|
| PUT http://magentohost/api/rest/products/8/images/7 |

**Request Body:**
```
<?xml version="1.0"?>
<magento_api>
  <label>English store image</label>
  <position>3</position>
  <exclude>0</exclude>
  <types>
      <data_item>image</data_item>
      <data_item>small_image</data_item>
      <data_item>thumbnail</data_item>
   </types>
</magento_api>
```
###### HTTP Method: DELETE

**Description**: Allows you to remove the specified image from a product.\
**Notes**: The image will not be deleted physically, the image parameters will be set to No Image.

**Authentication**: Admin\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Example:**

|                                                         |
|---------------------------------------------------------|
| DELETE http://magentohost/api/rest/products/14/images/6 |

##### URI: /products/:product_id/images/:image_id/store/:store_id

Allows you to manage a specified product image for a specified store.

**URL Structure**: http://magentohost/api/rest/products/:product_id/images/:image_id/store/:store_id\
**Version**: 1

###### HTTP Method: GET

**Description**: Allows you to retrieve information about the specified product image from a specified store.\
**Notes**: If there are custom attributes with the **Catalog Input Type for Store Owner** option set to **Media Image**, these attributes will be also returned in the response as an image type.

**Authentication**: Admin, Customer, Guest\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Example:**

|                                                             |
|-------------------------------------------------------------|
| GET http://magentohost/api/rest/products/8/images/7/store/3 |

**Response Body:**
```
<?xml version="1.0"?>
<magento_api>
  <id>10</id>
  <label></label>
  <position>5</position>
  <exclude>1</exclude>
  <url>http://magento/media/catalog/product/n/e/new_image.gif</url>
  <types/>
</magento_api>
```
###### HTTP Method: PUT

**Description**: Allows you to update the specified product image information for s specified store.\
**Notes**: When updating information, you need to pass only those parameters that you want to be updated. Parameters that were not passed in the request will preserve the previous values.

**Authentication**: Admin\
**Default Format**: XML\
**Parameters**:

| Name | Description | Required | Type | Example |
|----|----|----|----|----|
| exclude | Defines whether the image will associate only to one of the three image types. | optional | int | 0 |
| file_content | Image file content (base_64 encoded). | optional | string | base_64 encoded file content |
| file_mime_type | File mime type. Can have the following values: image/jpeg, image/png, etc. | optional | string | image/png |
| file_name | Image file name. | optional | string | test name |
| label | A label that will be displayed on the frontend when pointing to the image | optional | string | test label |
| position | The Sort Order option. The order in which the images are displayed in the MORE VIEWS section. | optional | int | 1 |
| types | Array of image types. Can have the following values: image, small_image, and thumbnail. | optional | array | thumbnail |

**Example:**

|                                                             |
|-------------------------------------------------------------|
| PUT http://magentohost/api/rest/products/8/images/7/store/3 |

**Request Body:**
```
<?xml version="1.0"?>
<magento_api>
  <position>3</position>
  <exclude>0</exclude>
  <types>
      <data_item>image</data_item>
   </types>
</magento_api>
```
###### HTTP Method: DELETE

**Description**: Allows you to remove an image from the required product in the specified store.\
**Notes**: The image will not be deleted physically, the image parameters will be set to No Image for the current store.

**Authentication**: Admin\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Example:**

|                                                                 |
|-----------------------------------------------------------------|
| DELETE http://magentohost/api/rest/products/14/images/6/store/3 |

#### Possible HTTP Status Codes

| Status Code | Message | Description |
|----|----|----|
| 400 | Requested store is invalid | The specified store is not valid or does not exist |
| 404 | Resource not found | The specified resource is not found or does not exist |
| 404 | Product image not found | The specified product image is not found or does not exist |
| 400 | Resource data pre-validator error | Resource validation error |
| 400 | The image content must be valid base64 encoded data | The image file content must be in the base_64 encoded format (when image content does not contain supported letters and symbols) |
| 400 | Requested product does not support images | The specified product does not support images adding |
| 400 | Unsupported image MIME type | The image MIME type is not supported (e.g., image/bmp) |
| 400 | Resource unknown error | Resource unknown error |
| 500 | Resource internal error | Resource internal error |
| \- | The image is not specified | The image is not specified during the POST request. |

---

## Product Websites (product_websites)

*Source: <https://devdocs-openmage.org/guides/m1x/api/rest/Resources/Products/product_websites.html>*

#### REST API: Product Websites

##### URI: /products/:product_id/websites

Allows you to retrieve information about websites assigned to a product, assign a website to a product, and copy data for a product from a specified store view.

**URL Structure**: http://magentohost/api/rest/products/:product_id/websites\
**Version**: 1

###### HTTP Method: GET

**Description**: Allows you to retrieve information about websites assigned to the specified product.

**Authentication**: Admin\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Example:**

|                                                     |
|-----------------------------------------------------|
| GET http://magentohost/api/rest/products/8/websites |

**Response Body:**
```
<?xml version="1.0"?>
<magento_api>
  <data_item>
    <website_id>2</website_id>
  </data_item>
</magento_api>
```
###### HTTP Method: POST

####### Website Assignment

**Description**: Allows you to assign a website to a specified product.

**Authentication**: Admin\
**Default Format**: XML\
**Parameters**:

| Name       | Description    | Required | Type | Example Value |
|------------|----------------|----------|------|---------------|
| website_id | The website ID | required | int  | 2             |

**Example:**

|                                                      |
|------------------------------------------------------|
| POST http://magentohost/api/rest/products/8/websites |

**Request Body:**
```
<?xml version="1.0"?>
<magento_api>
    <website_id>1</website_id>
</magento_api>
```
**Response Body:**
```
<?xml version="1.0"?>
<magento_api>
  <success>
    <data_item>
      <website_id>1</website_id>
      <product_id>8</product_id>
      <message>Resource updated successful.</message>
      <code>200</code>
    </data_item>
  </success>
</magento_api>
```
\
\

####### Website Assignment with Product Data Copying

**Description**: Allows you to assign a website and copy product data from the attached store to the one being attached. Only product data that is set on the Store View level is copied. All other data set on the Website or Global levels is not copied.

**Authentication**: Admin\
**Default Format**: XML\
**Parameters**:

| Name | Description | Required | Type | Example Value |
|----|----|----|----|----|
| website_id | The website ID | required | int | 2 |
| store_from | The store ID from which data will be copied | required | int | 1 |
| store_to | The store ID to which data will be copied | required | int | 2 |

**Notes:** The store_to parameter must belong to the website which we want to assign to a product.

**Example:**

|                                                      |
|------------------------------------------------------|
| POST http://magentohost/api/rest/products/8/websites |

**Request Body:**
```
<?xml version="1.0"?>
<magento_api>
     <website_id>2</website_id>
      <copy_to_stores>
          <data_item>
               <store_from>1</store_from>
               <store_to>2</store_to>
           </data_item>
      </copy_to_stores>
</magento_api>
```
\
\

####### Multi-Website Assignment

**Description**: Allows you to assign multiple websites to a product.

**Authentication**: Admin\
**Default Format**: XML\
**Parameters**:

| Name       | Description    | Required | Type | Example Value |
|------------|----------------|----------|------|---------------|
| website_id | The website ID | required | int  | 2             |

**Example:**

|                                                      |
|------------------------------------------------------|
| POST http://magentohost/api/rest/products/8/websites |

**Request Body:**
```
<?xml version="1.0"?>
<magento_api>
  <data_item>
    <website_id>1</website_id>
  </data_item>
  <data_item>
    <website_id>3</website_id>
  </data_item>
</magento_api>
```
**Response Body:**
```
<?xml version="1.0"?>
<magento_api>
  <success>
    <data_item>
      <website_id>1</website_id>
      <product_id>8</product_id>
      <message>Resource updated successful.</message>
      <code>200</code>
    </data_item>
    <data_item>
      <website_id>3</website_id>
      <product_id>8</product_id>
      <message>Resource updated successful.</message>
      <code>200</code>
    </data_item>
  </success>
</magento_api>
```
\
\

####### Multi-Website Assignment with Product Data Copying

**Description**: Allows you to assign multiple websites to a product together with copying product data from the attached store to the one being attached. Only product data that is set on the Store View level is copied. All other data set on the Website or Global levels is not copied.

**Authentication**: Admin\
**Default Format**: XML\
**Parameters**:

| Name | Description | Required | Type | Example Value |
|----|----|----|----|----|
| website_id | The website ID | required | int | 2 |
| store_from | The store ID from which data will be copied | required | int | 1 |
| store_to | The store ID to which data will be copied | required | int | 2 |

**Example:**

|                                                      |
|------------------------------------------------------|
| POST http://magentohost/api/rest/products/8/websites |

**Request Body:**
```
<?xml version="1.0"?>
<magento_api>
    <data_item>
        <website_id>2</website_id>
        <copy_to_stores>
            <data_item>
                <store_from>1</store_from>
                <store_to>2</store_to>
            </data_item>
        </copy_to_stores>
    </data_item>
    <data_item>
        <website_id>3</website_id>
        <copy_to_stores>
            <data_item>
                <store_from>1</store_from>
                <store_to>5</store_to>
            </data_item>
        </copy_to_stores>
    </data_item>
</magento_api>
```
**Response Body:**
```
<?xml version="1.0"?>
<magento_api>
  <success>
    <data_item>
      <website_id>2</website_id>
      <product_id>8</product_id>
      <message>Resource updated successful.</message>
      <code>200</code>
    </data_item>
    <data_item>
      <website_id>3</website_id>
      <product_id>8</product_id>
      <message>Resource updated successful.</message>
      <code>200</code>
    </data_item>
  </success>
</magento_api>
```
\
\

##### URI: /products/:product_id/websites/:website_id

Allows you to unassign a website from a specified product.

**URL Structure**: http://magentohost/api/rest/products/:product_id/websites/:website_id\
**Version**: 1

###### HTTP Method: DELETE

**Description**: Allows you to unassign a website from a specified product.

**Authentication**: Admin\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Example:**

|                                                          |
|----------------------------------------------------------|
| DELETE http://magentohost/api/rest/products/8/websites/1 |

#### Possible HTTP Status Codes

| Status Code | Message | Description |
|----|----|----|
| 404 | Product not found | The specified product is not found or does not exist. |
| 404 | Website not found | The specified website is not found or does not exist. |
| 400 | Invalid value for "store_from" for the website with ID \<ID value\>. | The entered value for "store_from" is not valid. |
| 400 | Invalid value for "store_to" for the website with ID \<ID value\>. | The entered value for "store_to" is not valid. |
| 400 | Store not found \<store ID\> for website \<website ID\>. | The specified store is not found or does not exist. |
| 400 | Store \<store ID\> from which we will copy the information does not belong to the product \<product ID\> being edited. | The specified store is not assigned to the product. |
| 400 | Store \<store ID\> to which we will copy the information does not belong to the website \<website ID\> being added. | The specified store does not belong to the website. |
| 400 | Product \<product ID\> isn't assigned to website \<website ID\>. | The specified product is not assigned to the website. |
| 400 | Invalid value for "website_id" in request. | The value for "website_id" is not valid. |

---
