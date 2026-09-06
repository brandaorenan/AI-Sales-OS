# REST API — Customers

> Customers and customer addresses endpoints.

---

## Customers (resource_customers)

*Source: <https://devdocs-openmage.org/guides/m1x/api/rest/Resources/resource_customers.html>*

JSON responses on this page contributed by Tim Reynolds

#### REST API: Customers

##### URI: /customers

Allows you to create and retrieve customers.

**URL Structure**: http://magentohost/api/rest/customers\
**Version**: 1

###### HTTP Method: GET /customers

**Description**: Allows you to retrieve the list of existing customers.\
**Notes:**: Only Admin user can retrieve the list of customers with all their attributes.

**Authentication**: Admin\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Example**

|                                           |
|-------------------------------------------|
| GET http://magentohost/api/rest/customers |

**Response Body:**
```xml
<?xml version="1.0"?>
<magento_api>
  <data_item>
    <entity_id>2</entity_id>
    <website_id>1</website_id>
    <email>test@example.com</email>
    <group_id>1</group_id>
    <created_at>2012-03-22 14:15:54</created_at>
    <disable_auto_group_change>1</disable_auto_group_change>
    <firstname>john</firstname>
    <lastname>Doe</lastname>
    <created_in>Default Store View</created_in>
  </data_item>
  <data_item>
    <entity_id>4</entity_id>
    <website_id>1</website_id>
    <email>earl@example.com</email>
    <group_id>1</group_id>
    <created_at>2012-03-28 13:54:04</created_at>
    <disable_auto_group_change>0</disable_auto_group_change>
    <firstname>Earl</firstname>
    <lastname>Hickey</lastname>
    <created_in>Admin</created_in>
  </data_item>
</magento_api>
```
**response example: json**

|                                           |
|-------------------------------------------|
| get http://magentohost/api/rest/customers |

**response body**:
```
		
{
  "2": {
    "entity_id": "2",
    "website_id": "1",
    "email": "test@example.com",
    "group_id": "1",
    "created_at": "2012-03-22 14:15:54",
    "disable_auto_group_change": "1",
    "firstname": "john",
    "lastname": "Doe",
    "created_in": "Admin",
    "prefix": null,
    "suffix": null,
    "taxvat": null,
    "dob": "2001-01-03 00:00:00",
    "reward_update_notification": "1",
    "reward_warning_notification": "1",
    "gender": "1"
  },
  "4": {
    "entity_id": "4",
    "website_id": "1",
    "email": "earl@example.com",
    "group_id": "1",
    "created_at": "2013-03-28 18:59:41",
    "disable_auto_group_change": "0",
    "firstname": "Earl",
    "lastname": "Hickey",
    "created_in": "Admin",
    "prefix": null,
    "suffix": null,
    "taxvat": null,
    "dob": "2012-03-28 13:54:04",
    "reward_update_notification": "1",
    "reward_warning_notification": "1",
    "gender": "1"
  }
		
```
###### HTTP Method: POST /customers

**Description**: Allows you to create a new customer.\
**Authentication**: Admin\
**Default Format**: XML\
**Parameters**:

| Name | Description | Required | Type | Example Value |
|----|----|----|----|----|
| firstname | The customer first name | required | string | John |
| lastname | The customer last name | required | string | Doe |
| email | The customer email address | required | string | johny@example.com |
| password | The customer password. The password must contain minimum 7 characters | required | string | 123123q |
| website_id | Website ID | required | int | 1 |
| group_id | Customer group ID | required | int | 1 |
| disable_auto_group_change | Defines whether the automatic group change for the customer will be disabled | optional | int | 0 |
| prefix | Customer prefix | optional | string | Mr. |
| middlename | Customer middle name or initial | optional | string | R. |
| suffix | Customer suffix | optional | string | Sr. |
| taxvat | Customer Tax or VAT number | optional | string | GB999 9999 73 |

**Notes**: The list of parameters may change depending on the attributes settings in **Customers** \> **Attributes** \> **Manage Customer Attributes** page in Magento Admin Panel. For example, a required status of the **middlename** attribute (Middle Name/Initial) may be changed to 'YES". Please note that managing customer attributes is available only in Magento Enterprise Edition.

**Example**:

|                                            |
|--------------------------------------------|
| POST http://magentohost/api/rest/customers |

**Request Body**:
```xml
<?xml version="1.0"?>
<magento_api>
    <firstname>Earl</firstname>
    <lastname>Hickey</lastname>
    <password>123123q</password>
    <email>earl@example.com</email>
    <website_id>1</website_id>
    <group_id>1</group_id>
</magento_api>
```
**Response**:\
If the customer was created successfully, we receive **Response HTTP Code** = 200, empty **Response Body** and **Location** header like '/api/rest/customers/555' where '555' - an entity id of the new customer.

###### HTTP Method: PUT /customers

**Description**: Not allowed

###### HTTP Method: DELETE /customers

**Description**: Not allowed

#### REST API: Customer

##### URI: /customers/:customerId

Allows you to manage existing customers.

**URL Structure**: http://magentohost/api/rest/customers/:customerId\
**Version**: 1

###### HTTP Method: GET /customers/:customerId

**Description**: Allows you to retrieve information on an existing customer.\
**Notes:**: The list of attributes that will be returned for customers is configured in the Magento Admin Panel. The Customer user type has access only to his/her own information. Also, Admin can add additional non-system customer attributes by selecting **Customers** \> **Attributes** \> **Manage Customer Attributes**. If these attributes are set as visible on frontend, they will be returned in the response. Also, custom attributes will be returned in the response only after the customer information is updated in the Magento Admin Panel or the specified custom attribute is updated via API (see the PUT method below). Please note that managing customer attributes is available only in Magento Enterprise Edition.

**Authentication**: Admin, Customer\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Example**:

|                                             |
|---------------------------------------------|
| GET http://magentohost/api/rest/customers/2 |

**Response Body**:
```xml
<?xml version="1.0"?>
<magento_api>
  <entity_id>2</entity_id>
  <website_id>1</website_id>
  <email>test@example.com</email>
  <group_id>1</group_id>
  <created_at>2012-03-22 14:15:54</created_at>
  <disable_auto_group_change>1</disable_auto_group_change>
  <created_in>Default Store View</created_in>
  <firstname>john</firstname>
  <lastname>Doe</lastname>
  <last_logged_in>2012-03-22 14:15:56</last_logged_in>
</magento_api>
```
**response example: json**

|  |
|----|
| get [http://magentohost/api/rest/customers/141](http://magentohost/api/rest/customers) |

**response body**:
```
		
{
  "entity_id": "2",
  "website_id": "1",
  "email": "test@example.com",
  "group_id": "1",
  "created_at": "2012-03-22 14:15:54",
  "disable_auto_group_change": "1",
  "created_in": "English",
  "firstname": "john",
  "lastname": "Doe"
}
		
```
###### HTTP Method: POST /customers/:customerId

**Description**: Not allowed.

###### HTTP Method: PUT /customers/:customerId

**Description**: Allows you to update an existing customer.\
**Notes**: The list of attributes that will be updated for customer is configured in the Magento Admin Panel. The Customer user type has access only to his/her own information.

**Authentication**: Admin, Customer\
**Default Format**: XML\
**Parameters**:\
You must specify only those parameters which you want to update. Parameters that are not defined in the request body will preserve the previous values. The website_id and created_in attributes are not allowed for updating.

**Example**:

|                                             |
|---------------------------------------------|
| PUT http://magentohost/api/rest/customers/2 |

**Request Body**:
```xml
<?xml version="1.0"?>
<magento_api>
    <firstname>Earl</firstname>
    <lastname>Hickey</lastname>
    <email>customerss@example.com</email>
    <group_id>1</group_id>
</magento_api>
```
###### HTTP Method: DELETE /customers/:customerId

**Description**: Allows you to delete an existing customer.\
**Notes**: Admin only can delete a customer.

**Authentication**: Admin\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Example**:

|                                                |
|------------------------------------------------|
| DELETE http://magentohost/api/rest/customers/2 |

---

## Customer Addresses (resource_customer_addresses)

*Source: <https://devdocs-openmage.org/guides/m1x/api/rest/Resources/resource_customer_addresses.html>*

JSON responses on this page contributed by Tim Reynolds

#### REST API: Customer Addresses

##### URI: /customers/:customer_id/addresses

Allows you to manage existing customer addresses.

**URL Structure**: http://magentohost/api/rest/customers/:customer_id/addresses\
**Version**: 1

###### HTTP Method: GET /customers/:customer_id/addresses

**Description**: Allows you to retrieve the list of existing customer addresses.\
**Notes**: The list of attributes that will be returned for customer addresses is configured in the Magento Admin Panel. The Customer user type has access only to his/her own addresses. Also, Admin can add additional non-system customer address attributes by selecting **Customers** \> **Attributes** \> **Manage Customer Address Attributes** (available only in Magento Enterprise Edition). If these attributes are set as visible on frontend, they will be returned in the response.

**Authentication**: Admin, Customer\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Example:**

|                                                       |
|-------------------------------------------------------|
| GET http://magentohost/api/rest/customers/1/addresses |

**Response Body:**
```
<?xml version="1.0"?>
<magento_api>
  <data_item>
    <entity_id>2</entity_id>
    <firstname>John</firstname>
    <lastname>Doe</lastname>
    <city>PA</city>
    <region>Palau</region>
    <postcode>19103</postcode>
    <country_id>US</country_id>
    <telephone>610-634-1181</telephone>
    <prefix>Dr.</prefix>
    <middlename></middlename>
    <suffix>Jr.</suffix>
    <company></company>
    <fax></fax>
    <vat_id>123456789</vat_id>
    <street>
      <data_item>2356 Jody Road Philadelphia</data_item>
      <data_item>844 Jefferson Street; 4510 Willis Avenue</data_item>
    </street>
    <is_default_billing>1</is_default_billing>
    <is_default_shipping>1</is_default_shipping>
  </data_item>
</magento_api>
```
**response body: json**:
```
		
[
  {
    "entity_id": "98",
    "firstname": "John",
    "middlename": null,
    "lastname": "Doe",
    "company": null,
    "city": "Philly",
    "country_id": "US",
    "region": "California",
    "postcode": "94131",
    "telephone": "888-555-1212",
    "fax": null,
    "street": [
      "123 Center St"
    ],
    "is_default_billing": 0,
    "is_default_shipping": 1
  },
  {
    "entity_id": "99",
    "firstname": "John",
    "lastname": "Doe",
    "city": "San Jose",
    "country_id": "US",
    "region": "California",
    "postcode": "94070",
    "telephone": "898-555-1212",
    "street": [
      "123 Easy St"
    ],
    "is_default_billing": 1,
    "is_default_shipping": 0
  }
]
		
```
**Notes**: If the customer has more than two street addresses, they will be returned in the following form: first address in the first string and all other addresses in the second string separated with a semicolon (like in the example above).

###### HTTP Method: POST /customers/:customer_id/addresses

**Description**: Allows you to create a new address for the required customer.\
**Notes**: The Customer user type can create addresses only for themselves.

When adding a street address for the customer, it should look like the following:
```
<street>
    <data_item>street address 1</data_item>
    <data_item>street address 2</data_item>
    <data_item>street address 3</data_item>
</street>
```
**Authentication**: Admin, Customer\
**Default Format**: XML

**Parameters**:

| Name | Description | Required | Type | Example Value |
|----|----|----|----|----|
| firstname | Customer first name | required | string | John |
| lastname | Customer last name | required | string | Doe |
| street | Customer street address. There can be more than one street address. | required | string | 2800 Watson Lane |
| city | Name of the city | required | string | Asheville |
| country_id | Name of the country | required | string | US |
| region | Region name or code | required for countries with regions (USA, Canada, etc.) | string | Palau |
| postcode | Customer ZIP/postal code | required | string | 28803 |
| telephone | Customer phone number | required | string | 828-775-0519 |

**Example:**

|                                                        |
|--------------------------------------------------------|
| POST http://magentohost/api/rest/customers/1/addresses |

**Request Body:**
```
<?xml version="1.0"?>
<magento_api>
    <firstname>Johny</firstname>
    <lastname>Doe</lastname>
    <city>PA</city>
    <region>Palau</region>
    <postcode>19103</postcode>
    <country_id>US</country_id>
    <telephone>611-634-1181</telephone>
    <street>
      <data_item>2354 Jody Road Philadelphia</data_item>
      <data_item>844 Jefferson Street; 4510 Willis Avenue</data_item>
    </street>
</magento_api>
```
###### HTTP Method: PUT /customers/:customer_id/addresses

**Update Customer Address**: not allowed.

###### HTTP Method: DELETE /customers/:customer_id/addresses

**Description**: Not allowed.

##### URI: /customers/addresses/:address_id

Allows you to manage an existing customer address.

**URL Structure**: http://magentohost/api/rest/customers/addresses/:address_id\
**Version**: 1

###### HTTP Method: GET /customers/addresses/:address_id

**Description**: Allows you to retrieve an existing customer address.\
**Notes**: The list of attributes that will be returned for customer address is configured in the Magento Admin Panel. The Customer user type has access only to his/her own addresses. Also, Admin can add additional non-system customer address attributes by selecting **Customers** \> **Attributes** \> **Manage Customer Address Attributes** (available only in Magento Enterprise Edition). If these attributes are set as visible on frontend, they will be returned in the response.

**Authentication**: Admin, Customer\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Example:**

|                                                       |
|-------------------------------------------------------|
| GET http://magentohost/api/rest/customers/addresses/2 |

**Response Body:**
```
<?xml version="1.0"?>
<magento_api>
  <entity_id>2</entity_id>
  <firstname>John</firstname>
  <lastname>Doe</lastname>
  <city>PA</city>
  <region>Palau</region>
  <postcode>19103</postcode>
  <country_id>US</country_id>
  <telephone>610-634-1181</telephone>
  <prefix>Dr.</prefix>
  <middlename></middlename>
  <suffix>Jr.</suffix>
  <company></company>
  <fax></fax>
  <vat_id>123456789</vat_id>
  <street>
    <data_item>2356 Jody Road Philadelphia</data_item>
    <data_item>844 Jefferson Street; 4510 Willis Avenue</data_item>
  </street>
  <is_default_billing>1</is_default_billing>
  <is_default_shipping>1</is_default_shipping>
</magento_api>
```
**response body: json**:
```
		
{
  "entity_id": "2",
  "firstname": "John",
  "lastname": "Doe",
  "city": "San Jose",
  "country_id": "US",
  "region": "California",
  "postcode": "94070",
  "telephone": "898-555-1212",
  "street": [
    "123 Easy St"
  ],
  "is_default_billing": 1,
  "is_default_shipping": 0
}		
```
###### HTTP Method: POST /customers/addresses/:address_id

**Description**: Not allowed.

###### HTTP Method: PUT /customers/addresses/:address_id

**Description**: Allows you to update an existing customer address.\
**Notes**: The list of attributes that will be updated for customer address is configured in the Magento Admin Panel. The Customer user type has access only to his/her own addresses.

If you want to add more addresses, it should look like the following:
```
<street>
    <data_item>street address 1</data_item>
    <data_item>street address 2</data_item>
    <data_item>street address 3</data_item>
</street>
```
**Authentication**: Admin, Customer\
**Default Format**: XML

**Example:**

|                                                       |
|-------------------------------------------------------|
| PUT http://magentohost/api/rest/customers/addresses/7 |

**Request Body:**
```
<?xml version="1.0"?>
<magento_api>
  <firstname>Johny</firstname>
  <lastname>Doe</lastname>
  <city>PA</city>
  <region>Palau</region>
  <postcode>19103</postcode>
  <country_id>US</country_id>
  <telephone>610-634-1181</telephone>
  <street>
    <data_item>2356 Jody Road Philadelphia</data_item>
    <data_item>844 Jefferson Street</data_item>
  </street>
  <is_default_billing>1</is_default_billing>
  <is_default_shipping>1</is_default_shipping>
</magento_api>
```
**request body: json**:
```
		
{
  "entity_id": "99",
  "firstname": "John",
  "lastname": "Doe",
  "city": "San Jose",
  "country_id": "US",
  "region": "California",
  "postcode": "94070",
  "telephone": "898-555-1212",
  "street": [
    "123 Easy St"
  ],
  "is_default_billing": 1,
  "is_default_shipping": 0
}		
```
###### HTTP Method: DELETE /customers/addresses/:address_id

**Description**: Allows you to delete an existing customer address.\
**Notes**: The Customer user type can delete only his/her own addresses.

**Authentication**: Admin, Customer\
**Default Format**: XML\
**Parameters**:\
*No Parameters*

**Example:**

|                                                          |
|----------------------------------------------------------|
| DELETE http://magentohost/api/rest/customers/addresses/7 |

#### Possible HTTP Status Codes

| Status Code | Message | Description |
|----|----|----|
| 405 | Resource method not implemented yet. | The required method is not implemented or not allowed. |
| 404 | Resource not found. | The specified resource is not found or does not exist. |
| 400 | Invalid country identifier type | The \<country_id\> value is passed not as a string type. |
| 400 | \<value name\> is a required value. | The specified value is a required one. |
| 400 | Country does not exist | The specified country does not exist. |
| 400 | Country is required | The \<country_id\> value is required. |
| 400 | Country is not between '2' and '3' inclusively. | The country code is not in the range of 2 and 3 symbols inclusively. |
| 400 | Invalid State/Province type | The \<region\> value is invalid (value is empty or passed as an array) |
| 400 | State/Province is required | The \<region\> value is required for the specified country. |
| 400 | State/Province is invalid | The entered value for \<region\> is invalid. It must be the region code (TX) or region name (Texas). |
| 400 | State/Province does not exist | The specified region does not exist (only for the country with predefined regions). |
| 400 | Address is default for customer so is not allowed to be deleted | The address cannot be deleted because it is set as a default one for billing or shipping. |

---
