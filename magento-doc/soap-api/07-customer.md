# SOAP API — Customers, Customer Groups & Addresses

> Customer CRUD, customer groups and customer address CRUD.

---

## Customer

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/customer/customer.html>*

### Module: Mage_Customer

The Mage_Customer module allows you to create, retrieve, update, and delete customers and customer addresses.

##### Customer

Allows you to create, retrieve, update, and delete data about customers.

**Resource Name**: customer

**Methods**:

- [customer.list](customer.list.html "customer.list") - Retrieve the list of customers
- [customer.create](customer.create.html "customer.create") - Create a new customer
- [customer.info](customer.info.html "customer.info") - Retrieve the customer data
- [customer.update](customer.update.html "customer.update") - Update the customer data
- [customer.delete](customer.delete.html "customer.delete") - Delete a required customer

##### Faults

| Fault Code | Fault Message                                        |
|------------|------------------------------------------------------|
| 100        | Invalid customer data. Details in error message.     |
| 101        | Invalid filters specified. Details in error message. |
| 102        | Customer does not exist.                             |
| 103        | Customer not deleted. Details in error message.      |

##### Examples

###### Example 1. View, create, update, and delete a customer
```
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');

$newCustomer = array(
    'firstname'  => 'First',
    'lastname'   => 'Last',
    'email'      => 'test@example.com',
    //for my version of magento (1.3.2.4) you SHOULD NOT
    // hash the password, as in:
    // 'password_hash' => 'password'
    'password_hash'   => md5('password'),
    // password hash can be either regular or salted md5:
    // $hash = md5($password);
    // $hash = md5($salt.$password).':'.$salt;
    // both variants are valid
    'store_id'   => 0,
    'website_id' => 0
);

$newCustomerId = $proxy->call($sessionId, 'customer.create', array($newCustomer));

// Get new customer info
var_dump($proxy->call($sessionId, 'customer.info', $newCustomerId));

// Update customer
$update = array('firstname'=>'Changed Firstname');
$proxy->call($sessionId, 'customer.update', array($newCustomerId, $update));

var_dump($proxy->call($sessionId, 'customer.info', $newCustomerId));

// Delete customer
$proxy->call($sessionId, 'customer.delete', $newCustomerId);
```
##### Customer Groups

Allows you to retrieve the customer groups.

**Resource Name**: customer_group

**Methods**:

- [customer_group.list](customer_group.html "customer_group.list") - Retrieve the list of customer groups

---

## customer.list — Customer List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/customer/customer.list.html>*

### Module: Mage_Customer

#### Resource: customer

##### Method:

- customer.list (SOAP V1)
- customerCustomerList (SOAP V2)

Allows you to retrieve the list of customers.

**Arguments:**

| Type   | Name      | Description                                        |
|--------|-----------|----------------------------------------------------|
| string | sessionId | Session ID                                         |
| array  | filters   | Array of filters by customer attributes (optional) |

**Returns**:

| Type  | Name      | Description                     |
|-------|-----------|---------------------------------|
| array | storeView | Array of customerCustomerEntity |

The **customerCustomerEntity** content is as follows:

| Type    | Name          | Description                           |
|---------|---------------|---------------------------------------|
| int     | customer_id   | ID of the customer                    |
| string  | created_at    | Date when the customer was created    |
| string  | updated_at    | Date of when the customer was updated |
| string  | increment_id  | Increment ID                          |
| int     | store_id      | Store ID                              |
| int     | website_id    | Website ID                            |
| string  | created_in    | Created in                            |
| string  | email         | Customer email                        |
| string  | firstname     | Customer first name                   |
| string  | middlename    | Customer middle name                  |
| string  | lastname      | Customer last name                    |
| int     | group_id      | Group ID                              |
| string  | prefix        | Customer prefix                       |
| string  | suffix        | Customer suffix                       |
| string  | dob           | Customer date of birth                |
| string  | taxvat        | Taxvat value                          |
| boolean | confirmation  | Confirmation flag                     |
| string  | password_hash | Password hash                         |

**Note**: The password_hash parameter will only match exactly with the same MD5 and salt as was used when Magento stored the value. If you try to match with an unsalted MD5 hash, or any salt other than what Magento used, it will not match. This is just a straight string comparison.

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'customer.list');
var_dump ($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2 (List of All Customers)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->customerCustomerList($sessionId);
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
            'key' => 'group_id',
            'value' => array('key' => 'in', 'value' => '1,3')
        )
    )
);
$result = $client->customerCustomerList($session, $complexFilter);

var_dump ($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->customerCustomerList((object)array('sessionId' => $sessionId->result, 'filters' => null));
var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'customer_id' => string '2' (length=1)
      'created_at' => string '2012-03-29 12:37:23' (length=19)
      'updated_at' => string '2012-04-03 11:20:18' (length=19)
      'store_id' => string '2' (length=1)
      'website_id' => string '2' (length=1)
      'created_in' => string 'English' (length=7)
      'default_billing' => string '3' (length=1)
      'default_shipping' => string '3' (length=1)
      'disable_auto_group_change' => string '0' (length=1)
      'email' => string 'test@example.com' (length=16)
      'firstname' => string 'John' (length=4)
      'group_id' => string '1' (length=1)
      'lastname' => string 'Doe' (length=3)
      'password_hash' => string 'cccfb3ecf54c9644a34106783148eff2:sp' (length=35)
      'rp_token' => string '15433dd072f1f4e5aae83231b93f72d0' (length=32)
      'rp_token_created_at' => string '2012-03-30 15:10:31' (length=19)
  1 =>
    array
      'customer_id' => string '4' (length=1)
      'created_at' => string '2012-04-03 11:21:15' (length=19)
      'updated_at' => string '2012-04-03 11:22:57' (length=19)
      'store_id' => string '0' (length=1)
      'website_id' => string '2' (length=1)
      'created_in' => string 'Admin' (length=5)
      'default_billing' => string '8' (length=1)
      'default_shipping' => string '8' (length=1)
      'disable_auto_group_change' => string '0' (length=1)
      'email' => string 'shon@example.com' (length=16)
      'firstname' => string 'Shon' (length=4)
      'group_id' => string '1' (length=1)
      'lastname' => string 'McMiland' (length=8)
      'password_hash' => string '5670581cabba4e2189e5edee99ed0c86:5q' (length=35)
```

---

## customer.info — Customer Info

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/customer/customer.info.html>*

### Module: Mage_Customer

Allows you to export/import customers from/to Magento.

#### Resource: customer

##### Method:

- customer.info (SOAP V1)
- customerCustomerInfo (SOAP V2)

Retrieve information about the specified customer.

**Arguments:**

| Type          | Name       | Description                 |
|---------------|------------|-----------------------------|
| string        | sessionId  | Session ID                  |
| int           | customerId | ID of the required customer |
| ArrayOfString | attributes | Array of attributes         |

- attributes (optional depending on the version) - only specified attributes will be returned. The customer_id value is always returned.

**Returns:**

| Type  | Name         | Description                     |
|-------|--------------|---------------------------------|
| array | customerInfo | Array of customerCustomerEntity |

The **customerCustomerEntity** content is as follows:

| Type    | Name                | Description                            |
|---------|---------------------|----------------------------------------|
| int     | customer_id         | ID of the customer                     |
| string  | created_at          | Date when the customer was created     |
| string  | updated_at          | Date when the customer was updated     |
| string  | increment_id        | Increment ID                           |
| int     | store_id            | Store ID                               |
| int     | website_id          | Website ID                             |
| string  | created_in          | Store view the customer was created in |
| string  | email               | Customer email                         |
| string  | firstname           | Customer first name                    |
| string  | middlename          | Customer middle name                   |
| string  | lastname            | Customer last name                     |
| int     | group_id            | Customer group ID                      |
| string  | prefix              | Customer prefix                        |
| string  | suffix              | Customer suffix                        |
| string  | dob                 | Customer date of birth                 |
| string  | taxvat              | Tax/VAT number                         |
| boolean | confirmation        | Confirmation flag                      |
| string  | password_hash       | Password hash                          |
| string  | rp_token            | Reset password token                   |
| string  | rp_token_created_at | Date when the password was reset       |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'customer.info', '2');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->customerCustomerInfo($sessionId, '2');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->customerCustomerInfo((object)array('sessionId' => $sessionId->result, 'customerId' => '2'));
var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  'customer_id' => string '2' (length=1)
  'created_at' => string '2012-03-29 12:37:23' (length=19)
  'updated_at' => string '2012-03-30 12:59:21' (length=19)
  'increment_id' => null
  'store_id' => string '2' (length=1)
  'website_id' => string '2' (length=1)
  'confirmation' => null
  'created_in' => string 'English' (length=7)
  'default_billing' => null
  'default_shipping' => string '2' (length=1)
  'disable_auto_group_change' => string '0' (length=1)
  'dob' => null
  'email' => string 'john@example.com' (length=16)
  'firstname' => string 'johny' (length=5)
  'gender' => null
  'group_id' => string '1' (length=1)
  'lastname' => string 'doe' (length=3)
  'middlename' => null
  'password_hash' => string 'cccfb3ecf54c9644a34106783148eff2:sp' (length=35)
  'prefix' => null
  'rp_token' => string '15433dd072f1f4e5aae83231b93f72d0' (length=32)
  'rp_token_created_at' => string '2012-03-30 15:10:31' (length=19)
  'suffix' => null
  'taxvat' => null
```

---

## customer.create — Customer Create

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/customer/customer.create.html>*

### Module: Mage_Customer

Allows you to export/import customers from/to Magento.

#### Resource: customer

##### Method:

- customer.create (SOAP V1)
- customerCustomerCreate (SOAP V2)

Create a new customer.

**Arguments:**

| Type   | Name         | Description                             |
|--------|--------------|-----------------------------------------|
| string | sessionId    | Session ID                              |
| array  | customerData | Array of customerCustomerEntityToCreate |

**Returns**:

| Type | Name   | Description                |
|------|--------|----------------------------|
| int  | result | ID of the created customer |

The **customerCustomerEntityToCreate** content is as follows:

| Type   | Name       | Description                                      |
|--------|------------|--------------------------------------------------|
| string | email      | Customer email                                   |
| string | firstname  | Customer first name                              |
| string | lastname   | Customer last name                               |
| string | password   | Customer password                                |
| int    | website_id | Website ID                                       |
| int    | store_id   | Store ID                                         |
| int    | group_id   | Group ID                                         |
| string | prefix     | Customer prefix (optional)                       |
| string | suffix     | Customer suffix (optional)                       |
| string | dob        | Customer date of birth (optional)                |
| string | taxvat     | Customer tax/VAT number (optional)               |
| int    | gender     | Customer gender: 1 - Male, 2 - Female (optional) |
| string | middlename | Customer middle name/initial (optional)          |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');
$result = $client->call($session,'customer.create',array(array('email' => 'mail@example.org', 'firstname' => 'Dough', 'lastname' => 'Deeks', 'password' => 'password', 'website_id' => 1, 'store_id' => 1, 'group_id' => 1)));

var_dump ($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$client = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

// If some stuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');
$result = $client->customerCustomerCreate($session, array('email' => 'customer-mail@example.org', 'firstname' => 'Dough', 'lastname' => 'Deeks', 'password' => 'password', 'website_id' => 1, 'store_id' => 1, 'group_id' => 1));

var_dump ($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->customerCustomerCreate((object)array('sessionId' => $sessionId->result, 'customerData' => ((object)array(
'email' => 'customer-mail@example.org',
'firstname' => 'John',
'lastname' => 'Dou',
'password' => '123123',
'website_id' => '0',
'group_id' => '1'
))));   
var_dump($result->result);
```

---

## customer.update — Customer Update

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/customer/customer.update.html>*

### Module: Mage_Customer

#### Resource: customer

##### Method:

- customer.update (SOAP V1)
- customerCustomerUpdate (SOAP V2)

Update information about the required customer. Note that you need to pass only those arguments which you want to be updated.

**Arguments:**

| Type   | Name         | Description                             |
|--------|--------------|-----------------------------------------|
| string | sessionId    | Session ID                              |
| int    | customerId   | Customer ID                             |
| array  | customerData | Array of customerCustomerEntityToCreate |

**Returns**:

| Type    | Description                     |
|---------|---------------------------------|
| boolean | True if the customer is updated |

The **customerCustomerEntityToCreate** content is as follows:

| Type   | Name        | Description                           |
|--------|-------------|---------------------------------------|
| int    | customer_id | Customer ID                           |
| string | email       | Customer email                        |
| string | firstname   | Customer first name                   |
| string | lastname    | Customer last name                    |
| string | password    | Customer password                     |
| int    | group_id    | Group ID                              |
| string | prefix      | Customer prefix                       |
| string | suffix      | Customer suffix                       |
| string | dob         | Customer date of birth                |
| string | taxvat      | Customer tax/VAT number               |
| int    | gender      | Customer gender: 1 - Male, 2 - Female |
| string | middlename  | Customer middle name/initial          |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'customer.update', array('customerId' => '2', 'customerData' => array('firstname' => 'John', 'lastname' => 'Doe', 'email' => 'test@example.com', 'password' => 'john22')));
var_dump ($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$client = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

// If some stuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');
$result = $client->customerCustomerUpdate($session, '2', array('email' => 'customer-mail@example.org', 'firstname' => 'Dough', 'lastname' => 'Deekson', 'password' => 'password', 'website_id' => 1, 'store_id' => 1, 'group_id' => 1));

var_dump ($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->customerCustomerUpdate((object)array('sessionId' => $sessionId->result, 'customerId' => '2', 'customerData' =>  ((object)array(
'email' => 'customer-mail@example.org',
'firstname' => 'Dough',
'lastname' => 'Deekson'
))));   
var_dump($result->result);
```

---

## customer.delete — Customer Delete

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/customer/customer.delete.html>*

### Module: Mage_Customer

Allows you to export/import customers from/to Magento

#### Resource: customer

##### Method:

- customer.delete (SOAP V1)
- customerCustomerDelete (SOAP V2)

Delete the required customer.

**Arguments:**

| Type   | Name       | Description |
|--------|------------|-------------|
| string | sessionId  | Session ID  |
| int    | customerId | Customer ID |

**Returns**:

| Type    | Description                     |
|---------|---------------------------------|
| boolean | True if the customer is deleted |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'customer.delete', '2');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->customerCustomerDelete($sessionId, '2');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->customerCustomerDelete((object)array('sessionId' => $sessionId->result, 'customerId' => '2'));   
var_dump($result->result);
```

---

## Customer Group (customer_group)

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/customer/customer_group.html>*

### Module: Mage_Customer

Allows you to export customer groups from Magento

#### Resource: customer_group

##### Method:

- customer_group.list (SOAP V1)
- customerGroupList (SOAP V2)

Retrieve the list of customer groups

**Arguments:**

| Type   | Name      | Description |
|--------|-----------|-------------|
| string | sessionId | Session ID  |

**Returns**:

| Type  | Name   | Description                     |
|-------|--------|---------------------------------|
| array | result | An array of customerGroupEntity |

The **customerGroupEntity** content is as follows:

| Type   | Name                | Description              |
|--------|---------------------|--------------------------|
| int    | customer_group_id   | ID of the customer group |
| string | customer_group_code | Customer group code      |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'customer_group.list');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->customerGroupList($sessionId);
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->customerGroupList((object)array('sessionId' => $sessionId->result));
var_dump($result->result);
```
###### Response Example SOAP V1
```php
array
  0 =>
    array
      'customer_group_id' => string '0' (length=1)
      'customer_group_code' => string 'NOT LOGGED IN' (length=13)
  1 =>
    array
      'customer_group_id' => string '1' (length=1)
      'customer_group_code' => string 'General' (length=7)
  2 =>
    array
      'customer_group_id' => string '2' (length=1)
      'customer_group_code' => string 'Wholesale' (length=9)
  3 =>
    array
      'customer_group_id' => string '3' (length=1)
      'customer_group_code' => string 'Retailer' (length=8)
```

---

## Customer Address

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/customer/customerAddress/customerAddress.html>*

Allows you to create, retrieve, update, and delete address data for a required customer.

**Resource Name**: customer_address

**Methods**:

- [customer_address.list](customer_address.list.html "customer_address.list") - Retrieve the list of customer addresses
- [customer_address.create](customer_address.create.html "customer_address.create") - Create a new address for a customer
- [customer_address.info](customer_address.info.html "customer_address.info") - Retrieve the specified customer address
- [customer_address.update](customer_address.update.html "customer_address.update") - Update the customer address
- [customer_address.delete](customer_address.delete.html "customer_address.delete") - Delete the customer address

##### Faults

| Fault Code | Fault Message                                   |
|------------|-------------------------------------------------|
| 100        | Invalid address data. Details in error message. |
| 101        | Customer not exists.                            |
| 102        | Address not exists.                             |
| 103        | Address not deleted. Details in error message.  |

##### Examples

###### Example 1. Working with customer address
```php
$proxy = new SoapClient('http://magentohost/api/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

// Create new customer
$newCustomer = array(
    'firstname'  => 'First',
    'lastname'   => 'Last',
    'email'      => 'test@example.com',
    'password'   => 'password',
    'store_id'   => 0,
    'website_id' => 0
);

$newCustomerId = $proxy->call($sessionId, 'customer.create', array($newCustomer));

//Create new customer address
$newCustomerAddress = array(
    'firstname'  => 'First',
    'lastname'   => 'Last',
    'country_id' => 'USA',
    'region_id'  => '43',
    'region'     => 'New York',
    'city'       => 'New York',
    'street'     => array('street1','street2'),
    'telephone'  => '5555-555',
    'postcode'   => 10021,

    'is_default_billing'  => true,
    'is_default_shipping' => true
);

$newAddressId = $proxy->call($sessionId, 'customer_address.create', array($newCustomerId, $newCustomerAddress));

var_dump($proxy->call($sessionId, 'customer_address.list', $newCustomerId));

//Update customer address
$proxy->call($sessionId, 'customer_address.update', array($newAddressId, array('firstname'=>'Changed Firstname')));

var_dump($proxy->call($sessionId, 'customer_address.list', $newCustomerId));

// Delete customer address
$proxy->call($sessionId, 'customer_address.delete', $newAddressId);

var_dump($proxy->call($sessionId, 'customer_address.list', $newCustomerId));
```

---

## customer_address.list — Address List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/customer/customerAddress/customer_address.list.html>*

### Module: Mage_Customer

#### Resource: customer_address

##### Method:

- customer_address.list (SOAP V1)
- customerAddressList (SOAP V2)

Retrieve the list of customer addresses.

**Arguments:**

| Type   | Name       | Description |
|--------|------------|-------------|
| string | sessionId  | Session ID  |
| int    | customerId | Customer ID |

**Returns:**

| Type  | Name   | Description                    |
|-------|--------|--------------------------------|
| array | result | Array of customerAddressEntity |

The **customerAddressEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| int | customer_address_id | ID of the customer address |
| string | created_at | Date when the address was created |
| string | updated_at | Date when the address was updated |
| string | increment_id | Increment ID |
| string | city | City |
| string | company | Name of the company |
| string | country_id | ID of the country |
| string | fax | Fax |
| string | firstname | Customer first name |
| string | lastname | Customer last name |
| string | middlename | Customer middle name |
| string | postcode | Customer postcode |
| string | prefix | Customer prefix |
| string | region | Name of the region |
| int | region_id | Region ID |
| string | street | Name of the street |
| string | suffix | Customer suffix |
| string | telephone | Telephone number |
| boolean | is_default_billing | True if the address is the default one for billing |
| boolean | is_default_shipping | True if the address is the default one for shipping |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'customer_address.list', '2');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->customerAddressList($sessionId, '2');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->customerAddressList((object)array('sessionId' => $sessionId->result, 'customerId' => '2'));   
var_dump($result->result);
```
###### Response Example SOAP V1
```php
array
  0 =>
    array
      'customer_address_id' => string '2' (length=1)
      'created_at' => string '2012-03-29 13:20:08' (length=19)
      'updated_at' => string '2012-03-29 13:39:29' (length=19)
      'city' => string 'Las Vegas' (length=9)
      'country_id' => string 'US' (length=2)
      'firstname' => string 'johny' (length=5)
      'lastname' => string 'doe' (length=3)
      'postcode' => string '89032' (length=5)
      'region' => string 'Nevada' (length=6)
      'region_id' => string '39' (length=2)
      'street' => string '3406 Hiney Road' (length=15)
      'telephone' => string '702-283-9556' (length=12)
      'is_default_billing' => boolean false
      'is_default_shipping' => boolean true
  1 =>
    array
      'customer_address_id' => string '3' (length=1)
      'created_at' => string '2012-03-29 13:39:29' (length=19)
      'updated_at' => string '2012-03-29 13:39:29' (length=19)
      'city' => string 'Corpus Christi' (length=14)
      'country_id' => string 'US' (length=2)
      'firstname' => string 'johny' (length=5)
      'lastname' => string 'doe' (length=3)
      'postcode' => string '78476' (length=5)
      'region' => string 'Texas' (length=5)
      'region_id' => string '57' (length=2)
      'street' => string '3672 Boone Street' (length=17)
      'telephone' => string '361-280-8488' (length=12)
      'vat_id' => string 'GB999 9999 73' (length=13)
      'is_default_billing' => boolean false
      'is_default_shipping' => boolean false
```

---

## customer_address.info — Address Info

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/customer/customerAddress/customer_address.info.html>*

### Module: Mage_Customer

#### Resource: customer_address

##### Method:

- customer_address.info (SOAP V1)
- customerAddressInfo (SOAP V2)

Retrieve information about the required customer address.

**Arguments:**

| Type   | Name      | Description |
|--------|-----------|-------------|
| string | sessionId | Session ID  |
| int    | addressId | Address ID  |

**Returns**:

| Type  | Name | Description                        |
|-------|------|------------------------------------|
| array | info | Array of customerAddressEntityItem |

The **customerAddressEntityItem** content is as follows:

| Type | Name | Description |
|----|----|----|
| int | customer_address_id | ID of the customer address |
| string | created_at | Date when the address was created |
| string | updated_at | Date when the address was updated |
| string | increment_id | Increment ID |
| string | city | name of the city |
| string | company | Name of the company |
| string | country_id | ID of the country |
| string | fax | Fax |
| string | firstname | Customer first name |
| string | lastname | Customer last name |
| string | middlename | Customer middle name |
| string | postcode | Customer postcode |
| string | prefix | Customer prefix |
| string | region | Name of the region |
| int | region_id | Region ID |
| string | street | Name of the street |
| string | suffix | Customer suffix |
| string | telephone | Telephone number |
| boolean | is_default_billing | True if the address is the default one for billing |
| boolean | is_default_shipping | True if the address is the default one for shipping |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'customer_address.info', '2');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->customerAddressInfo($sessionId, '2');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->customerAddressInfo((object)array('sessionId' => $sessionId->result, 'addressId' => '2'));   
var_dump($result->result);
```
###### Response Example SOAP V1
```php
array
  'customer_address_id' => string '2' (length=1)
  'created_at' => string '2012-03-29 13:20:08' (length=19)
  'updated_at' => string '2012-03-29 13:20:08' (length=19)
  'increment_id' => null
  'city' => string 'Las Vegas' (length=9)
  'company' => null
  'country_id' => string 'US' (length=2)
  'fax' => null
  'firstname' => string 'johny' (length=5)
  'lastname' => string 'doe' (length=3)
  'middlename' => null
  'postcode' => string '89032' (length=5)
  'prefix' => null
  'region' => string 'Nevada' (length=6)
  'region_id' => string '39' (length=2)
  'street' => string '3406 Hiney Road' (length=15)
  'suffix' => null
  'telephone' => string '702-283-9556' (length=12)
  'vat_id' => null
  'vat_is_valid' => null
  'vat_request_date' => null
  'vat_request_id' => null
  'vat_request_success' => null
  'is_default_billing' => boolean false
  'is_default_shipping' => boolean true
```

---

## customer_address.create — Address Create

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/customer/customerAddress/customer_address.create.html>*

### Module: Mage_Customer

#### Resource: customer_address

##### Method:

- customer_address.create (SOAP V1)
- customerAddressCreate (SOAP V2)

Create a new address for the customer

**Arguments:**

| Type   | Name        | Description                          |
|--------|-------------|--------------------------------------|
| string | sessionId   | Session ID                           |
| int    | customerId  | Customer ID                          |
| array  | addressdata | Array of customerAddressEntityCreate |

**Returns**:

| Type | Name   | Description                        |
|------|--------|------------------------------------|
| int  | result | ID of the created customer address |

The **customerAddressEntityCreate** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | city | Name of the city |
| string | company | Name of the company |
| string | country_id | Country ID |
| string | fax | Fax |
| string | firstname | Customer first name |
| string | lastname | Customer last name |
| string | middlename | Customer middle name |
| string | postcode | Postcode |
| string | prefix | Customer prefix |
| int | region_id | ID of the region |
| string | region | Name of the region |
| ArrayOfString | street | Array of street addresses |
| string | suffix | Customer suffix |
| string | telephone | Telephone number |
| boolean | is_default_billing | True if the address is the default one for billing |
| boolean | is_default_shipping | True if the address is the default one for shipping |

**Note**: If you want to leave any address fields empty, specify them as empty ones in the request body.

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call(
$session,
'customer_address.create',
array('customerId' => 2, 'addressdata' => array('firstname' => 'John', 'lastname' => 'Doe', 'street' => array('Street line 1', 'Streer line 2'), 'city' => 'Weaverville', 'country_id' => 'US', 'region' => 'Texas', 'region_id' => 3, 'postcode' => '96093', 'telephone' => '530-623-2513', 'is_default_billing' => FALSE, 'is_default_shipping' => FALSE)));
var_dump ($result);
```
###### Request Example SOAP V2
```php
$client = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

// If some stuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');
$result = $client->customerAddressCreate($session, '2', array('firstname' => 'John', 'lastname' => 'Doe', 'street' => array('Street line 1', 'Streer line 2'), 'city' => 'Weaverville', 'country_id' => 'US', 'region' => 'Texas', 'region_id' => 3, 'postcode' => '96093', 'telephone' => '530-623-2513', 'is_default_billing' => FALSE, 'is_default_shipping' => FALSE));

var_dump ($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->customerAddressCreate((object)array('sessionId' => $sessionId->result, 'customerId' => '2', 'addressData' => ((object)array(
'city' => 'Weaverville',
'country_id' => 'US',
'postcode' => '96093',
'region' => 'Texas',
'street' => array('Street line 1', 'Streer line 2'),
'telephone' => '847-431-7700',
'lastname' => 'Doe',
'firstname' => 'John',
'is_default_billing' => true
))));   
var_dump($result->result);
```

---

## customer_address.update — Address Update

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/customer/customerAddress/customer_address.update.html>*

### Module: Mage_Customer

#### Resource: customer_address

##### Method:

- customer_address.update (SOAP V1)
- customerAddressUpdate (SOAP V2)

Update address data of the required customer

**Arguments:**

| Type   | Name        | Description                          |
|--------|-------------|--------------------------------------|
| string | sessionId   | Session ID                           |
| int    | addressId   | Address ID                           |
| array  | addressdata | Array of customerAddressEntityCreate |

**Returns**:

| Type    | Description                             |
|---------|-----------------------------------------|
| boolean | True if the customer address is updated |

The **customerAddressEntityCreate** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | city | Name of the city |
| string | company | Name of the company |
| string | country_id | Country ID |
| string | fax | Fax |
| string | firstname | Customer first name |
| string | lastname | Customer last name |
| string | middlename | Customer middle name |
| string | postcode | Postcode |
| string | prefix | Customer prefix |
| int | region_id | ID of the region |
| string | region | Name of the region |
| ArrayOfString | street | Array of streets |
| string | suffix | Customer suffix |
| string | telephone | Telephone number |
| boolean | is_default_billing | True if the address is the default one for billing |
| boolean | is_default_shipping | True if the address is the default one for shipping |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call(
$session,
'customer_address.update',
array('addressId' => 8, 'addressdata' => array('firstname' => 'John', 'lastname' => 'Doe', 'street' => array('Street line 1', 'Streer line 2'), 'city' => 'Weaverville', 'country_id' => 'US', 'region' => 'Texas', 'region_id' => 3, 'postcode' => '96093', 'telephone' => '530-623-2513', 'is_default_billing' => TRUE, 'is_default_shipping' => FALSE)));
var_dump ($result);
```
###### Request Example SOAP V2
```php
$client = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

// If some stuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');
$result = $client->customerAddressUpdate($session, '8', array('firstname' => 'John', 'lastname' => 'Doe', 'street' => array('Street line 1', 'Streer line 2'), 'city' => 'Weaverville', 'country_id' => 'US', 'region' => 'Texas', 'region_id' => 3, 'postcode' => '96093', 'telephone' => '530-623-2513', 'is_default_billing' => FALSE, 'is_default_shipping' => FALSE));

var_dump ($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->customerAddressUpdate((object)array('sessionId' => $sessionId->result, 'addressId' => '8', 'addressData' => ((object)array(
'firstname' => 'John', 
'lastname' => 'Doe', 
'street' => array('Street line 1', 'Streer line 2'), 
'city' => 'Weaverville', 
'country_id' => 'US', 
'region' => 'Texas', 
'region_id' => 3, 
'postcode' => '96093', 
'telephone' => '530-623-2513', 
'is_default_billing' => TRUE, 
'is_default_shipping' => TRUE
))));   
var_dump($result->result);
```

---

## customer_address.delete — Address Delete

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/customer/customerAddress/customer_address.delete.html>*

### Module: Mage_Customer

#### Resource: customer_address

##### Method:

- customer_address.delete (SOAP V1)
- customerAddressDelete (SOAP V2)

Delete the required customer address.

**Arguments:**

| Type   | Name      | Description |
|--------|-----------|-------------|
| string | sessionId | Session ID  |
| int    | addressId | Address ID  |

**Returns**:

| Type    | Description                             |
|---------|-----------------------------------------|
| boolean | True if the customer address is deleted |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'customer_address.delete', '4');
var_dump ($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->customerAddressDelete($sessionId, '4');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->customerAddressDelete((object)array('sessionId' => $sessionId->result, 'addressId' => '4'));   
var_dump($result->result);
```

---
