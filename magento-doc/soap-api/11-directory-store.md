# SOAP API — Directory (Countries/Regions) & Store Info

> Country and region lists, plus store/magento metadata methods.

---

## Directory

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/directory/directory.html>*

## Module: Mage_Directory

The Mage_Directory module allows you to retrieve country and region data.

##### Country

Allows you to retrieve a list of countries.

**Resource Name**: directory_country

**Aliases**:

- country

**Methods**:

- [directory_country.list](directory_country.list.html "directory_country.list") - Retrieve a list of countries

##### Region

Allows you to retrieve a list of regions within a country.

**Resource Name**: directory_region

**Aliases**:

- region

**Methods**:

- [directory_region.list](directory_region.list.html "directory_region.list") - Retrieve a list of regions in a specified country

---

## directory_country.list — Country List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/directory/directory_country.list.html>*

### Country API

Allows you to retrieve the list of countries from Magento.

**Module: Mage_Directory**

**Resource: directory_country**

**Aliases**:

- country

##### Method:

- directory_country.list (SOAP V1)
- directoryCountryList (SOAP V2)

Retrieve the list of countries from Magento.

**Aliases**:

- country.list

###### Arguments:

| Type   | Name      | Description |
|--------|-----------|-------------|
| string | sessionId | Session ID  |

###### Returns:

| Type  | Name      | Description                        |
|-------|-----------|------------------------------------|
| array | countries | An array of directoryCountryEntity |

The **directoryCountryEntity** content is as follows:

| Type   | Name       | Description                   |
|--------|------------|-------------------------------|
| string | country_id | ID of the retrieved country   |
| string | iso2_code  | ISO 2-alpha code              |
| string | iso3_code  | ISO 3-alpha code              |
| string | name       | Name of the retrieved country |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');
$countries = $proxy->call($sessionId, 'country.list');
var_dump($countries); // Countries list.
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->directoryCountryList($sessionId);
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->directoryCountryList((object)array('sessionId' => $sessionId->result));   
var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'country_id' => string 'AD' (length=2)
      'iso2_code' => string 'AD' (length=2)
      'iso3_code' => string 'AND' (length=3)
      'name' => string 'Andorra' (length=7)
  1 =>
    array
      'country_id' => string 'AE' (length=2)
      'iso2_code' => string 'AE' (length=2)
      'iso3_code' => string 'ARE' (length=3)
      'name' => string 'United Arab Emirates' (length=20)
  2 =>
    array
      'country_id' => string 'AF' (length=2)
      'iso2_code' => string 'AF' (length=2)
      'iso3_code' => string 'AFG' (length=3)
      'name' => string 'Afghanistan' (length=11)
```

---

## directory_region.list — Region List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/directory/directory_region.list.html>*

### Region API

Allows you to export the list of regions from Magento

### Module: Mage_Directory

#### Resource: directory_region

**Aliases:**

- region

###### Method:

- directory_region.list (SOAP V1)
- directoryRegionList (SOAP V2)

Retrieve the list of regions in the specified country.

**Aliases:**

- region.list

**Arguments:**

| Type   | Name      | Description                  |
|--------|-----------|------------------------------|
| string | sessionId | Session ID                   |
| string | country   | Country code in ISO2 or ISO3 |

**Returns:**

| Type  | Name                       | Description                       |
|-------|----------------------------|-----------------------------------|
| array | directoryRegionEntityArray | An array of directoryRegionEntity |

The **directoryRegionEntity** content is as follows:

| Type   | Name      | Description        |
|--------|-----------|--------------------|
| string | region_id | ID of the region   |
| string | code      | Region code        |
| string | name      | Name of the region |

**Faults:**

| Fault Code | Fault Message       |
|------------|---------------------|
| 101        | Country not exists. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');
$regions = $proxy->call($sessionId, 'region.list', 'US');

var_dump($regions); // Region list for USA.
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 
$sessionId = $proxy->login('apiUser', 'apiKey'); 

$result = $proxy->directoryRegionList($sessionId,'US');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->directoryRegionList((object)array('sessionId' => $sessionId->result, 'country' => 'US'));   
var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'region_id' => string '1' (length=1)
      'code' => string 'AL' (length=2)
      'name' => string 'Alabama' (length=7)
  1 =>
    array
      'region_id' => string '2' (length=1)
      'code' => string 'AK' (length=2)
      'name' => string 'Alaska' (length=6)
  2 =>
    array
      'region_id' => string '3' (length=1)
      'code' => string 'AS' (length=2)
      'name' => string 'American Samoa' (length=14)
  3 =>
    array
      'region_id' => string '4' (length=1)
      'code' => string 'AZ' (length=2)
      'name' => string 'Arizona' (length=7)
```

---

## Miscellaneous

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/miscellaneous/miscellaneous.html>*

The following APIs allow you to access additional Magento information.

### Module: Store View API

Allows you to retrieve information on the store view.

**Resource Name**: Store

###### Methods:

- [store.info](store.info.html "store.info") - Get information about a store view
- [store.list](store.list.html "store.list") - Get the list of store views

### Module: Mage_Core API

Allows you to get information about the current Magento installation.

**Resource Name**: core_magento

**Aliases:** magento

###### Method:

- [core_magento.info](magento.info.html "magento.info")

---

## magento.info — Magento Info

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/miscellaneous/magento.info.html>*

### Magento Info API

Allows you to get information about the current Magento installation.

#### Module: Mage_Core

##### Resource: core_magento

**Aliases:** magento

###### Method:

- core_magento.info (SOAP V1)
- magentoInfo (SOAP V2)

Allows you to retrieve information about Magento version and edition.

**Aliases**: magento.info

**Arguments**:

| Type   | Name      | Description |
|--------|-----------|-------------|
| string | sessionId | Session ID  |

**Returns**:

| Type | Name | Description |
|----|----|----|
| string | magento_version | Magento version |
| string | magento_edition | Magento edition (Community, Professional, Enterprise) |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');
$magentoInfo = $proxy->call(
    $sessionId,
    'magento.info'
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->magentoInfo($sessionId);
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->magentoInfo((object)array('sessionId' => $sessionId->result));   

var_dump($result->result);
```
###### Response Example SOAP V1
```php
array
  'magento_edition' => string 'Community' (length=9)
  'magento_version' => string '1.4.2.0-rc1' (length=11)
```

---

## store.info — Store Info

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/miscellaneous/store.info.html>*

#### Module: Store View API

##### Resource: store

###### Method:

- store.info (SOAP V1)
- storeInfo (SOAP V2)

Allows you to retrieve information about the required store view.

**Arguments:**

| Type   | Name      | Description                      |
|--------|-----------|----------------------------------|
| string | sessionId | Session ID                       |
| string | storeId   | Store view ID or code (optional) |

**Return:**

| Type  | Name   | Description          |
|-------|--------|----------------------|
| array | result | Array of storeEntity |

The **storeEntity** content is as follows:

| Type   | Name       | Description                         |
|--------|------------|-------------------------------------|
| int    | store_id   | Store view ID                       |
| string | code       | Store view code                     |
| int    | website_id | Website ID                          |
| int    | group_id   | Group ID                            |
| string | name       | Store name                          |
| int    | sort_order | Store view sort order               |
| int    | is_active  | Defines whether the store is active |

**Faults:**

| Fault Code | Fault Message                   |
|------------|---------------------------------|
| 101        | Requested store view not found. |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'store.info', '2');
var_dump ($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->storeInfo($sessionId, '2');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->storeInfo((object)array('sessionId' => $sessionId->result, 'storeId' => '2'));   

var_dump($result->result);
```
###### Response Example SOAP V1
```php
array
  'store_id' => string '2' (length=1)
  'code' => string 'english' (length=7)
  'website_id' => string '2' (length=1)
  'group_id' => string '2' (length=1)
  'name' => string 'English' (length=7)
  'sort_order' => string '0' (length=1)
  'is_active' => string '1' (length=1)
```

---

## store.list — Store List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/miscellaneous/store.list.html>*

#### Module: Store View API

##### Resource: store

###### Method:

- store.list (SOAP V1)
- storeList (SOAP V2)

Allows you to retrieve the list of store views.

**Arguments:**

| Type   | Name      | Description |
|--------|-----------|-------------|
| string | sessionId | Session ID  |

**Return:**

| Type  | Name   | Description          |
|-------|--------|----------------------|
| array | result | Array of storeEntity |

The **storeEntity** content is as follows:

| Type   | Name       | Description                         |
|--------|------------|-------------------------------------|
| int    | store_id   | Store view ID                       |
| string | code       | Store view code                     |
| int    | website_id | Website ID                          |
| int    | group_id   | Group ID                            |
| string | name       | Store view name                     |
| int    | sort_order | Store view sort order               |
| int    | is_active  | Defines whether the store is active |

**Faults:**\
*No Faults*

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'store.list');
var_dump ($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->storeList($sessionId);
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey')); 
 
$result = $proxy->storeList((object)array('sessionId' => $sessionId->result));   

var_dump($result->result);
```
###### Response Example SOAP V1
```php
array
  0 =>
    array
      'store_id' => string '1' (length=1)
      'code' => string 'default' (length=7)
      'website_id' => string '1' (length=1)
      'group_id' => string '1' (length=1)
      'name' => string 'Default Store View' (length=18)
      'sort_order' => string '0' (length=1)
      'is_active' => string '1' (length=1)
  1 =>
    array
      'store_id' => string '2' (length=1)
      'code' => string 'english' (length=7)
      'website_id' => string '2' (length=1)
      'group_id' => string '2' (length=1)
      'name' => string 'English' (length=7)
      'sort_order' => string '0' (length=1)
      'is_active' => string '1' (length=1)
```

---
