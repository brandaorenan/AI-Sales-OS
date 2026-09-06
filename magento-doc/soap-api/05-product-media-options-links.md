# SOAP API — Product Media, Options, Links, Tags & Tier Prices

> Product images, custom options and values, downloadable links, related/up-sell/cross-sell links, tags and tier prices.

---

## Catalog Product Attribute Media

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttributeMedia/productImages.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### Product Images

Allows you to manage product images.

**Resource Name**: catalog_product_attribute_media

**Aliases**:

- product_attribute_media
- product_media

**Methods**:

- [catalog_product_attribute_media.currentStore](catalog_product_attribute_media.currentStore.html "catalog_product_attribute_media.currentStore") - Set/Get the current store view
- [catalog_product_attribute_media.list](catalog_product_attribute_media.list.html "catalog_product_attribute_media.list") - Retrieve the product images
- [catalog_product_attribute_media.info](catalog_product_attribute_media.info.html "catalog_product_attribute_media.info") - Retrieve the specified product image
- [catalog_product_attribute_media.types](catalog_product_attribute_media.types.html "catalog_product_attribute_media.types") - Retrieve product image types
- [catalog_product_attribute_media.create](catalog_product_attribute_media.create.html "catalog_product_attribute_media.create") - Upload a new image for a product
- [catalog_product_attribute_media.update](catalog_product_attribute_media.update.html "catalog_product_attribute_media.update") - Update an image for a product
- [catalog_product_attribute_media.remove](catalog_product_attribute_media.remove.html "catalog_product_attribute_media.remove") - Remove an image for a product

##### Faults

| Fault Code | Fault Message                                          |
|------------|--------------------------------------------------------|
| 100        | Requested store view not found.                        |
| 101        | Product not exists.                                    |
| 102        | Invalid data given. Details in error message.          |
| 103        | Requested image not exists in product images’ gallery. |
| 104        | Image creation failed. Details in error message.       |
| 105        | Image not updated. Details in error message.           |
| 106        | Image not removed. Details in error message.           |
| 107        | Requested product doesn’t support images               |

##### Examples

###### Example 1. Working with product images
```
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$newImage = array(
    'file' => array(
        'name' => 'file_name',
        'content' => base64_encode(file_get_contents('product.jpg')),
        'mime'    => 'image/jpeg'
    ),
    'label'    => 'Cool Image Through Soap',
    'position' => 2,
    'types'    => array('small_image'),
    'exclude'  => 0
);

$imageFilename = $proxy->call($sessionId, 'product_media.create', array('Sku', $newImage));

var_dump($imageFilename);

// Newly created image file
var_dump($proxy->call($sessionId, 'product_media.list', 'Sku'));

$proxy->call($sessionId, 'product_media.update', array(
    'Sku',
    $imageFilename,
    array('position' => 2, 'types' => array('image') /* Lets do it main image for product */)
));

// Updated image file
var_dump($proxy->call($sessionId, 'product_media.list', 'Sku'));

// Remove image file
$proxy->call($sessionId, 'product_media.remove', array('Sku', $imageFilename));

// Images without our file
var_dump($proxy->call($sessionId, 'product_media.list', 'Sku'));
```

---

## catalog_product_attribute_media.types — Media Types

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttributeMedia/catalog_product_attribute_media.types.html>*

### Module: Mage_Catalog

##### Resource:catalog_product_attribute_media

**Aliases:**

- product_attribute_media
- product_media

##### Method:

- catalog_product_attribute_media.types (SOAP V1)
- catalogProductAttributeMediaTypes (SOAP V2)

Allows you to retrieve product image types including standard image, small_image, thumbnail, etc. Note that if the product attribute set contains attributes of the Media Image type (**Catalog Input Type for Store Owner \> Media Image**), it will also be returned in the response.

**Aliases:**

- product_attribute_media.types
- product_media.types

**Arguments:**

| Type   | Name      | Description                     |
|--------|-----------|---------------------------------|
| string | sessionId | Session ID                      |
| string | setId     | ID of the product attribute set |

**Returns**:

| Type  | Name   | Description                                     |
|-------|--------|-------------------------------------------------|
| array | result | Array of catalogProductAttributeMediaTypeEntity |

The **catalogProductAttributeMediaTypeEntity** content is as follows:

| Type   | Name  | Description                             |
|--------|-------|-----------------------------------------|
| string | code  | Image type code                         |
| string | scope | Image scope (store, website, or global) |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_product_attribute_media.types', '4');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductAttributeMediaTypes($sessionId, '4');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductAttributeMediaTypes((object)array('sessionId' => $sessionId->result, 'setId' => '4'));

var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'code' => string 'image' (length=5)
      'scope' => string 'store' (length=5)
  1 =>
    array
      'code' => string 'small_image' (length=11)
      'scope' => string 'store' (length=5)
  2 =>
    array
      'code' => string 'thumbnail' (length=9)
      'scope' => string 'store' (length=5)
```

---

## catalog_product_attribute_media.currentStore — Current Store

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttributeMedia/catalog_product_attribute_media.currentStore.html>*

### Module: Mage_Catalog

##### Resource:catalog_product_attribute_media

**Aliases:**

- product_attribute_media
- product_media

##### Method:

- catalog_product_attribute_media.currentStore (SOAP V1)
- catalogProductAttributeMediaCurrentStore (SOAP V2)

Allows you to set/get the current store view.

**Aliases:**

- product_attribute_media.currentStore
- product_media.currentStore

**Arguments:**

| Type   | Name      | Description                      |
|--------|-----------|----------------------------------|
| string | sessionId | Session ID                       |
| string | storeView | Store view ID or code (optional) |

**Returns**:

| Type | Name      | Description   |
|------|-----------|---------------|
| int  | storeView | Store view ID |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_product_attribute_media.currentStore', 'english');
var_dump ($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary
 
$result = $proxy->catalogProductAttributeMediaCurrentStore($sessionId, 'english');
var_dump($result);
```

---

## catalog_product_attribute_media.list — Media List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttributeMedia/catalog_product_attribute_media.list.html>*

### Module: Mage_Catalog

##### Resource:catalog_product_attribute_media

**Aliases:**

- product_attribute_media
- product_media

##### Method:

- catalog_product_attribute_media.list (SOAP V1)
- catalogProductAttributeMediaList (SOAP V2)

Allows you to retrieve the list of product images.

**Aliases:**

- product_attribute_media.list
- product_media.list

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | product\productId | Product ID or SKU |
| string | storeView | Store view ID or code (optional) |
| string | identifierType | Defines whether the product ID or sku is passed in the 'product' parameter |

**Returns**:

| Type  | Name   | Description                        |
|-------|--------|------------------------------------|
| array | result | Array of catalogProductImageEntity |

The **catalogProductImageEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | file | Image file name |
| string | label | Image label |
| string | position | Image position |
| string | exclude | Defines whether the image will associate only to one of three image types |
| string | url | Image URL |
| ArrayOfString | types | Array of types |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_product_attribute_media.list', '2');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductAttributeMediaList($sessionId, '2');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductAttributeMediaList((object)array('sessionId' => $sessionId->result, 'productId' => '2'));

var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'file' => string '/b/l/blackberry8100_2.jpg' (length=25)
      'label' => string '' (length=0)
      'position' => string '1' (length=1)
      'exclude' => string '0' (length=1)
      'url' => string 'http://magentopath/blackberry8100_2.jpg' (length=71)
      'types' =>
        array
          0 => string 'image' (length=5)
          1 => string 'small_image' (length=11)
          2 => string 'thumbnail' (length=9)
```

---

## catalog_product_attribute_media.info — Media Info

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttributeMedia/catalog_product_attribute_media.info.html>*

### Module: Mage_Catalog

##### Resource:catalog_product_attribute_media

**Aliases:**

- product_attribute_media
- product_media

##### Method:

- catalog_product_attribute_media.info (SOAP V1)
- catalogProductAttributeMediaInfo (SOAP V2)

Allows you to retrieve information about the specified product image.

**Aliases:**

- product_attribute_media.info
- product_media.info

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | product\productId | Product ID or SKU |
| string | file | Name of the image file (e.g., /b/l/blackberry8100_2.jpg) |
| string | storeView | Store view ID or code (optional) |
| string | identifierType | Defines whether the product ID or SKU is passed in the 'product' parameter |

**Returns**:

| Type  | Name   | Description                        |
|-------|--------|------------------------------------|
| array | result | Array of catalogProductImageEntity |

The **catalogProductImageEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | file | Image file name |
| string | label | Image file label |
| string | position | Image file position |
| string | exclude | Defines whether the image will associate only to one of three image types |
| string | url | Image URL |
| ArrayOfString | types | Array of types |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_product_attribute_media.info', array('product' => '2', 'file' => '/b/l/blackberry8100_2.jpg'));
var_dump ($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductAttributeMediaInfo($sessionId, '2', '/b/l/blackberry8100_2.jpg');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductAttributeMediaInfo((object)array('sessionId' => $sessionId->result, 'productId' => '1', 'file' => '/i/m/image.png'));

var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  'file' => string '/b/l/blackberry8100_2.jpg' (length=25)
  'label' => string '' (length=0)
  'position' => string '1' (length=1)
  'exclude' => string '0' (length=1)
  'url' => string 'http://magentohost/media/catalog/product/b/l/blackberry8100_2.jpg' (length=71)
  'types' =>
    array
      0 => string 'image' (length=5)
      1 => string 'small_image' (length=11)
      2 => string 'thumbnail' (length=9)
```

---

## catalog_product_attribute_media.create — Create

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttributeMedia/catalog_product_attribute_media.create.html>*

### Module: Mage_Catalog

##### Resource:catalog_product_attribute_media

**Aliases:**

- product_attribute_media
- product_media

##### Method:

- catalog_product_attribute_media.create (SOAP V1)
- catalogProductAttributeMediaCreate (SOAP V2)

Allows you to upload a new product image.

**Aliases:**

- product_attribute_media.create
- product_media.create

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | product | Product ID or code |
| array | data | Array of catalogProductAttributeMediaCreateEntity |
| string | storeView | Store view ID or code (optional) |
| string | identifierType | Defines whether the product ID or SKU is passed in the 'product' parameter |

**Returns**:

| Type   | Name   | Description                              |
|--------|--------|------------------------------------------|
| string | result | Image file name (e.g., "/i/m/image.png") |

The **catalogProductAttributeMediaCreateEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| array | file | Array of catalogProductImageFileEntity |
| string | label | Image label |
| string | position | Image position |
| ArrayOfString | types | Array of types |
| string | exclude | Defines whether the image will associate only to one of three image types |
| string | remove | Remove image flag |

The **catalogProductImageFileEntity** content is as follows:

| Type   | Name    | Description                        |
|--------|---------|------------------------------------|
| string | content | Image content (base_64 encoded)    |
| string | mime    | Image mime type (e.g., image/jpeg) |
| string | name    | Image name                         |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$productId = 2;
$file = array(
	'content' => '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAXABcDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDLooor8XP4DCiiigAooooAKKKKAP/Z',
	'mime' => 'image/jpeg'
);

$result = $proxy->call(
	$session,
	'catalog_product_attribute_media.create',
	array(
		$productId,
		array('file'=>$file, 'label'=>'Label', 'position'=>'100', 'types'=>array('thumbnail'), 'exclude'=>0)
	)
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$productId = 2;
$file = array(
	'content' => '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAXABcDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDLooor8XP4DCiiigAooooAKKKKAP/Z',
	'mime' => 'image/jpeg'
);

$result = $proxy->catalogProductAttributeMediaCreate(
	$session,
	$productId,
	array('file' => $file, 'label' => 'Label', 'position' => '100', 'types' => array('thumbnail'), 'exclude' => 0)
);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductAttributeMediaCreate((object)array('sessionId' => $sessionId->result, 'productId' => '1', 'data' => ((object)array(
'label' => 'image_label',
'position' => '1',
'types' => array('thumbnail'),
'exclude' => '0',
'file' => ((object)array(
'content' => '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAXABcDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDLooor8XP4DCiiigAooooAKKKKAP/Z',
'mime' => 'image/png',
'name' => 'image'
))))));

var_dump($result->result);
```

---

## catalog_product_attribute_media.update — Media Update

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttributeMedia/catalog_product_attribute_media.update.html>*

### Module: Mage_Catalog

##### Resource:catalog_product_attribute_media

**Aliases:**

- product_attribute_media
- product_media

##### Method:

- catalog_product_attribute_media.update (SOAP V1)
- catalogProductAttributeMediaUpdate (SOAP V2)

Allows you to update the product image.

**Aliases:**

- product_attribute_media.update
- product_media.update

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | product\productId | Product ID or code |
| string | file | Image file name (e.g., /i/m/image.jpeg) |
| array | data | Array of catalogProductAttributeMediaCreateEntity |
| string | storeView | Store view ID or code |
| string | identifierType | Defines whether the product ID or SKU is passed in the 'product' parameter |

**Notes**: You should specify only those parameters which you want to be updated. Parameters that were not specified in the request, will preserve the previous values.

**Returns**:

| Type    | Name   | Description                      |
|---------|--------|----------------------------------|
| boolean | result | Result of product image updating |

The **catalogProductAttributeMediaCreateEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| array | file | Array of catalogProductImageFileEntity |
| string | label | Product image label |
| string | position | Product image position |
| ArrayOfString | types | Array of types |
| string | exclude | Defines whether the image will associate only to one of three image types |
| string | remove | Image remove flag |

The **catalogProductImageFileEntity** content is as follows:

| Type   | Name    | Description                             |
|--------|---------|-----------------------------------------|
| string | content | Product image content (base_64 encoded) |
| string | mime    | Image mime type (e.g., image/jpeg)      |
| string | name    | Image name                              |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$productId = 1;
$file = '/i/m/image.jpg';

$newFile = array(
	'content' => '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAXABcDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDLooor8XP4DCiiigAooooAKKKKAP/Z',
	'mime' => 'image/jpeg'
);

$result = $client->call(
	$session,
	'catalog_product_attribute_media.update',
	array(
		$productId,
		$file,
		array('file' => $newFile, 'label' => 'New label', 'position' => '50', 'types' => array('image'), 'exclude' => 1)
	)
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$productId = 1;
$file = '/i/m/image.jpg';

$newFile = array(
'content' => '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAXABcDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDLooor8XP4DCiiigAooooAKKKKAP/Z',
'mime' => 'image/jpeg'
);

$result = $client->catalogProductAttributeMediaUpdate(
$session,
$productId,
$file,
array('file' => $newFile, 'label' => 'New label', 'position' => '50', 'types' => array('image'), 'exclude' => 1)
);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductAttributeMediaUpdate((object)array('sessionId' => $sessionId->result, 'productId' => '1', 'file' => '/t/u/tulips.jpg', 'data' => ((object)array(
'label' => 'tulips',
'position' => '1',
'remove' => '0',
'types' => array('small_image')
))));

var_dump($result->result);
```

---

## catalog_product_attribute_media.remove — Media Remove

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttributeMedia/catalog_product_attribute_media.remove.html>*

### Module: Mage_Catalog

##### Resource:catalog_product_attribute_media

**Aliases:**

- product_attribute_media
- product_media

##### Method:

- catalog_product_attribute_media.remove (SOAP V1)
- catalogProductAttributeMediaRemove (SOAP V2)

Allows you to remove the image from a product.

**Aliases:**

- product_attribute_media.remove
- product_media.remove

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | product\productId | Product ID or SKU |
| string | file | Image file name (e.g., /b/l/blackberry8100_2.jpg) |
| string | identifierType | Defines whether the product ID or SKU is passed in the 'product' parameter |

**Returns**:

| Type        | Description                                     |
|-------------|-------------------------------------------------|
| boolean\int | True (1) if the image is removed from a product |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_product_attribute_media.remove', array('product' => '3', 'file' => '/b/l/blackberry8100_2.jpg'));
var_dump ($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductAttributeMediaRemove($sessionId, '3', '/b/l/blackberry8100_2.jpg');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductAttributeMediaRemove((object)array('sessionId' => $sessionId->result, 'productId' => '3', 'file' => '/b/l/blackberry8100_2.jpg'));

var_dump($result->result);
```

---

## Catalog Product Custom Option

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductCustomOption/catalogProductCustomOption.html>*

### Module: Mage_Catalog

##### Resource: catalog_product_custom_option

**Aliases**: product_custom_option

###### Methods:

- [product_custom_option.add](product_custom_option.add.html "product_custom_option.add") - Add a new custom option to a product
- [product_custom_option.update](product_custom_option.update.html "product_custom_option.update") **- ** Update the product custom option
- [product_custom_option.types](product_custom_option.types.html "product_custom_option.types") **- ** Get the list of available custom option types
- [product_custom_option.list](product_custom_option.list.html "product_custom_option.list") **- ** Retrieve the list of product custom options
- [product_custom_option.info](product_custom_option.info.html "product_custom_option.info") **- ** Get full information about the custom option in a product
- [product_custom_option.remove](product_custom_option.remove.html "product_custom_option.remove") **- ** Remove the custom option

###### Faults:

| Fault Code | Fault Message |
|----|----|
| 101 | Product with requested id does not exist. |
| 102 | Provided data is invalid. |
| 103 | Error while saving an option. Details are in the error message. |
| 104 | Store with requested code/id does not exist. |
| 105 | Option with requested id does not exist. |
| 106 | Invalid option type provided. Call 'types' to get list of allowed option types. |
| 107 | Error while deleting an option. Details are in the error message. |

---

## product_custom_option.types — Product Custom Option Types

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductCustomOption/product_custom_option.types.html>*

#### Module: Complex Product API

##### Resource: product_custom_option

###### Method:

- product_custom_option.types (SOAP V1)
- catalogProductCustomOptionTypes (SOAP V2)

Allows you to retrieve the list of available custom option types.

**Arguments:**

| Type   | Name      | Description |
|--------|-----------|-------------|
| string | sessionId | Session ID  |

**Return:**

| Type  | Name   | Description                              |
|-------|--------|------------------------------------------|
| array | result | Array of catalogProductCustomOptionTypes |

The **catalogProductCustomOptionTypesEntity** content is as follows:

| Type   | Name  | Description         |
|--------|-------|---------------------|
| string | label | Custom option label |
| string | value | Custom option value |

**Faults:**

*No faults*

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'product_custom_option.types');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductCustomOptionTypes($sessionId);
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductCustomOptionTypes((object)array('sessionId' => $sessionId->result));
var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'label' => string 'Field' (length=5)
      'value' => string 'field' (length=5)
  1 =>
    array
      'label' => string 'Area' (length=4)
      'value' => string 'area' (length=4)
  2 =>
    array
      'label' => string 'File' (length=4)
      'value' => string 'file' (length=4)
  3 =>
    array
      'label' => string 'Drop-down' (length=9)
      'value' => string 'drop_down' (length=9)
  4 =>
    array
      'label' => string 'Radio Buttons' (length=13)
      'value' => string 'radio' (length=5)
  5 =>
    array
      'label' => string 'Checkbox' (length=8)
      'value' => string 'checkbox' (length=8)
  6 =>
    array
      'label' => string 'Multiple Select' (length=15)
      'value' => string 'multiple' (length=8)
  7 =>
    array
      'label' => string 'Date' (length=4)
      'value' => string 'date' (length=4)
  8 =>
    array
      'label' => string 'Date & Time' (length=11)
      'value' => string 'date_time' (length=9)
  9 =>
    array
      'label' => string 'Time' (length=4)
      'value' => string 'time' (length=4)
```

---

## product_custom_option.list — Product Custom Option List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductCustomOption/product_custom_option.list.html>*

#### Module: Complex Product API

##### Resource: product_custom_option

###### Method:

- product_custom_option.list (SOAP V1)
- catalogProductCustomOptionList (SOAP V2)

Allows you to retrieve the list of custom options for a specific product.

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | productId | Product ID |
| string | store | Store view ID or code (optional but required for WS-I mode) |

**Return:**

| Type  | Name   | Description                             |
|-------|--------|-----------------------------------------|
| array | result | Array of catalogProductCustomOptionList |

The **catalogProductCustomOptionList** content is as follows:

| Type   | Name       | Description                                   |
|--------|------------|-----------------------------------------------|
| string | option_id  | Custom option ID                              |
| string | title      | Custom option title                           |
| string | type       | Custom option type                            |
| string | sort_order | Custom option sort order                      |
| int    | is_require | Defines whether the custom option is required |

**Faults:**

| Fault Code | Fault Message                                |
|------------|----------------------------------------------|
| 101        | Product with requested id does not exist.    |
| 104        | Store with requested code/id does not exist. |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'product_custom_option.list', '1');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductCustomOptionList($sessionId, '1');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductCustomOptionList((object)array('sessionId' => $sessionId->result, 'productId' => '1', 'store' => '1'));
var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'option_id' => string '1' (length=1)
      'title' => string 'model' (length=5)
      'type' => string 'drop_down' (length=9)
      'is_require' => string '1' (length=1)
      'sort_order' => string '0' (length=1)
```

---

## product_custom_option.info — Product Custom Option Info

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductCustomOption/product_custom_option.info.html>*

#### Module: Complex Product API

##### Resource: product_custom_option

###### Method:

- product_custom_option.info (SOAP V1)
- catalogProductCustomOptionInfo (SOAP V2)

Allows you to retrieve full information about the custom option in a product.

**Arguments:**

| Type   | Name      | Description                      |
|--------|-----------|----------------------------------|
| string | sessionId | Session ID                       |
| string | optionId  | Option ID                        |
| string | store     | Store view ID or code (optional) |

**Return:**

| Type  | Name   | Description                                   |
|-------|--------|-----------------------------------------------|
| array | result | Array of catalogProductCustomOptionInfoEntity |

The **catalogProductCustomOptionInfoEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | title | Custom option title |
| string | type | Custom option type. Can have one of the following values: "fixed" or "percent" |
| string | sort_order | Custom option sort order |
| int | is_require | Defines whether the custom option is required |
| array | additional_fields | Array of catalogProductCustomOptionAdditionalFields |

The **catalogProductCustomOptionAdditionalFields** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | title | Custom option title |
| string | price | Custom option price |
| string | price_type | Price type. Possible values are as follows: "fixed" or "percent" |
| string | sku | Custom option SKU |
| string | max_characters | Maximum number of characters for the customer input on the frontend (optional) |
| string | sort_order | Custom option sort order |
| string | file_extension | List of file extensions allowed to upload by the user on the frontend (optional; for the **File** input type) |
| string | image_size_x | Width limit for uploaded images (optional; for the **File** input type) |
| string | image_size_y | Height limit for uploaded images (optional; for the **File** input type) |
| string | value_id | Value ID |

**Faults:**

| Fault Code | Fault Message                                |
|------------|----------------------------------------------|
| 101        | Product with requested id does not exist.    |
| 104        | Store with requested code/id does not exist. |
| 105        | Option with requested id does not exist.     |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'product_custom_option.info', '1');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductCustomOptionInfo($sessionId, '1');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductCustomOptionInfo((object)array('sessionId' => $sessionId->result, 'optionId' => '1'));
var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  'title' => string 'model' (length=5)
  'type' => string 'drop_down' (length=9)
  'is_require' => string '1' (length=1)
  'sort_order' => string '0' (length=1)
  'additional_fields' =>
    array
      0 =>
        array
          'value_id' => string '1' (length=1)
          'title' => string 'monoblock' (length=9)
          'price' => string '139.9900' (length=8)
          'price_type' => string 'fixed' (length=5)
          'sku' => string 'monoblock' (length=9)
          'sort_order' => string '0' (length=1)
      1 =>
        array
          'value_id' => string '2' (length=1)
          'title' => string 'slider' (length=6)
          'price' => string '239.9900' (length=8)
          'price_type' => string 'fixed' (length=5)
          'sku' => string 'slider' (length=6)
          'sort_order' => string '0' (length=1)
```

---

## product_custom_option.add — Product Custom Option Add

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductCustomOption/product_custom_option.add.html>*

#### Module: Complex Product API

##### Resource: product_custom_option

###### Method:

- product_custom_option.add (SOAP V1)
- catalogProductCustomOptionAdd (SOAP V2)

Allows you to add a new custom option for a product.

**Arguments:**

| Type   | Name      | Description                              |
|--------|-----------|------------------------------------------|
| string | sessionId | Session ID                               |
| string | productId | Product ID                               |
| array  | data      | Array of catalogProductCustomOptionToAdd |
| string | store     | Store view ID or code (optional)         |

**Return:**

| Type    | Description                        |
|---------|------------------------------------|
| boolean | True if the custom option is added |

The **catalogProductCustomOptionToAdd** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | title | Option title |
| string | type | Option type |
| string | sort_order | Option sort order |
| int | is_require | Defines whether the option is required |
| array | additional_fields | Array of catalogProductCustomOptionAdditionalFields |

The **catalogProductCustomOptionAdditionalFieldsEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | title | Custom option title |
| string | price | Custom option price |
| string | price_type | Price type. Possible values are as follows: "fixed" or "percent" |
| string | sku | Custom option SKU |
| string | max_characters | Maximum number of characters for the customer input on the frontend (optional) |
| string | sort_order | Custom option sort order |
| string | file_extension | List of file extensions allowed to upload by the user on the frontend (optional) |
| string | image_size_x | Width limit for uploaded images (optional) |
| string | image_size_y | Height limit for uploaded images (optional) |
| string | value_id | Value ID |

**Faults:**

| Fault Code | Fault Message |
|----|----|
| 101 | Product with requested id does not exist. |
| 102 | Provided data is invalid. |
| 103 | Error while saving an option. Details are in the error message. |
| 104 | Store with requested code/id does not exist. |
| 106 | Invalid option type provided. Call 'types' to get list of allowed option types. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');
$productId = 1;// Existing product ID

// Add custom option of Text Field type
$customTextFieldOption = array(
    "title" => "Custom Text Field Option Title",
    "type" => "field",
    "is_require" => 1,
    "sort_order" => 0,
    "additional_fields" => array(
        array(
            "price" => 10.00,
            "price_type" => "fixed",
            "sku" => "custom_text_option_sku",
            "max_characters" => 255
        )
    )
);
$resultCustomTextFieldOptionAdd = $proxy->call(
    $sessionId,
    "product_custom_option.add",
    array(
        $productId,
        $customTextFieldOption
    )
);

// Add custom option of File type
$customFileOption = array(
    "title" => "Custom File Option Title",
    "type" => "file",
    "is_require" => 1,
    "sort_order" => 5,
    "additional_fields" => array(
        array(
            "price" => 10.00,
            "price_type" => "fixed",
            "sku" => "custom_file_option_sku",
            "file_extension" => "jpg",
            "image_size_x" => 800,
            "image_size_y" => 600
        )
    )
);
$resultCustomFileOptionAdd = $proxy->call(
    $sessionId,
    "product_custom_option.add",
    array(
        $productId,
        $customFileOption
    )
);

// Add custom option of Dropdown type
$customDropdownOption = array(
    "title" => "Custom Dropdown Option Title",
    "type" => "drop_down",
    "is_require" => 1,
    "sort_order" => 10,
    "additional_fields" => array(
        array(
            "title" => "Dropdown row #1",
            "price" => 10.00,
            "price_type" => "fixed",
            "sku" => "custom_select_option_sku_1",
            "sort_order" => 0
        ),
        array(
            "title" => "Dropdown row #2",
            "price" => 10.00,
            "price_type" => "fixed",
            "sku" => "custom_select_option_sku_2",
            "sort_order" => 5
        )
    )
);
$resultCustomDropdownOptionAdd = $proxy->call(
    $sessionId,
    "product_custom_option.add",
    array(
        $productId,
        $customDropdownOption
    )
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login('apiUser', 'apiKey');

$result = $proxy->catalogProductCustomOptionAdd($sessionId, '1', array('title' => 'title',
'type' => 'field',
'sort_order' => '1',
'is_require' => 1,
'additional_fields' => array(array(
'price' => '15',
'price_type' => 'fixed',
'sku' => 'sku',
'max_characters' => '100'
))));
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Example)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductCustomOptionAdd((object)array('sessionId' => $sessionId->result, 'productId' => '1', 'store' => '1', 'data' => ((object)array(
'title' => 'title',
'type' => 'field',
'sort_order' => '1',
'is_require' => 1,
'additional_fields' => array(array(
'price' => '15',
'price_type' => 'fixed',
'sku' => 'sku',
'max_characters' => '100'
))))));
var_dump($result->result);
```

---

## product_custom_option.update — Product Custom Option Update

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductCustomOption/product_custom_option.update.html>*

#### Module: Complex Product API

##### Resource: product_custom_option

###### Method:

- product_custom_option.update (SOAP V1)
- catalogProductCustomOptionUpdate (SOAP V2)

Allows you to update the required product custom option.

**Arguments:**

| Type   | Name      | Description                                 |
|--------|-----------|---------------------------------------------|
| string | sessionId | Session ID                                  |
| string | optionId  | Option ID                                   |
| array  | data      | Array of catalogProductCustomOptionToUpdate |
| string | store     | Store view ID or code (optional)            |

**Return:**

| Type        | Description                              |
|-------------|------------------------------------------|
| boolean\int | True (1) if the custom option is updated |

The **catalogProductCustomOptionToUpdate** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | title | Title of the custom option to be updated |
| string | type | Custom option type |
| string | sort_order | Custom option sort order |
| int | is_require | Defines whether the custom option is required |
| array | additional_fields | Array of catalogProductCustomOptionAdditionalFields |

The **catalogProductCustomOptionAdditionalFields** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | title | Custom option title |
| string | price | Custom option price |
| string | price_type | Price type. Possible values are as follows: "fixed" or "percent" |
| string | sku | Custom option SKU |
| string | max_characters | Maximum number of characters for the customer input on the frontend (optional) |
| string | sort_order | Custom option sort order |
| string | file_extension | List of file extensions allowed to upload by the user on the frontend (optional; for the **File** input type) |
| string | image_size_x | Width limit for uploaded images (optional; for the **File** input type) |
| string | image_size_y | Height limit for uploaded images (optional; for the **File** input type) |
| string | value_id | Value ID |

**Faults:**

| Fault Code | Fault Message |
|----|----|
| 101 | Product with requested id does not exist. |
| 102 | Provided data is invalid. |
| 103 | Error while saving an option. Details are in the error message. |
| 104 | Store with requested code/id does not exist. |
| 105 | Option with requested id does not exist. |
| 106 | Invalid option type provided. Call 'types' to get list of allowed option types. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');
$selectOptionId = 1379;
$selectOptionValueId = 794;
$textOptionId = 1380;
$fileOptionId = 1381;

// Update custom option of Text Field type
$customTextFieldOption = array(
    "title" => "Custom Text Field Option Title Updated",
    "type" => "field",
    "is_require" => 1,
    "sort_order" => 20,
    "additional_fields" => array(
        array(
            "price" => 13.00,
            "price_type" => "fixed",
            "sku" => "custom_text_option_sku_updated",
            "max_characters" => 127
        )
    )
);
$resultCustomTextFieldOptionUpdate = $proxy->call(
    $sessionId,
    "product_custom_option.update",
    array(
         $textOptionId,
         $customTextFieldOption
    )
);

// Update custom option of File type
$customFileOption = array(
    "title" => "Custom File Option Title Updated",
    "additional_fields" => array(
        array(
            "image_size_x" => 800,
            "image_size_y" => 999
        )
    )
);
$resultCustomFileOptionUpdate = $proxy->call(
    $sessionId,
    "product_custom_option.update",
    array(
         $fileOptionId,
         $customFileOption
    )
);

// Update custom option of Dropdown type
$customDropdownOption = array(
    "title" => "Custom Dropdown Option Title Updated to Multiselect",
    "type" => "multiple",
    "additional_fields" => array(
        array(
            "value_id" => $selectOptionValueId,
            "price" => 14.00,
            "price_type" => 'percent',
            "sku" => "custom_select_option_sku_1 updated",
            "sort_order" => 26
        )
    )
);
$resultCustomDropdownOptionUpdate = $proxy->call(
    $sessionId,
    "product_custom_option.update",
    array(
         $selectOptionId,
         $customDropdownOption
    )
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login('apiUser', 'apiKey');

$result = $proxy->catalogProductCustomOptionUpdate($sessionId, '1', array(
'title' => 'title_updated',
'is_require' => 0,
'sort_order' => '2'
));
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductCustomOptionUpdate((object)array('sessionId' => $sessionId->result, 'optionId' => '1', 'data' => ((object)array(
'title' => 'title_updated',
'is_require' => 0,
'sort_order' => '2'
))));
var_dump($result->result);
```

---

## product_custom_option.remove — Product Custom Option Remove

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductCustomOption/product_custom_option.remove.html>*

#### Module: Complex Product API

##### Resource: product_custom_option

###### Method:

- product_custom_option.remove (SOAP V1)
- catalogProductCustomOptionRemove (SOAP V2)

Allows you to remove a custom option from the product.

**Arguments:**

| Type   | Name      | Description      |
|--------|-----------|------------------|
| string | sessionId | Session ID       |
| string | optionId  | Custom option ID |

**Return:**

| Type    | Description                          |
|---------|--------------------------------------|
| boolean | True if the custom option is removed |

**Faults:**

| Fault Code | Fault Message |
|----|----|
| 105 | Option with requested id does not exist. |
| 107 | Error while deleting an option. Details are in the error message. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');
$optionId  = 1;// Existing option ID

$result = $proxy->call(
    $sessionId,
    "product_custom_option.remove",
    array(
        $optionId
    )
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductCustomOptionRemove($sessionId, '1');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductCustomOptionRemove((object)array('sessionId' => $sessionId->result, 'optionId' => '1'));
var_dump($result->result);
```

---

## Catalog Product Custom Option Value

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductCustomOptionValue/catalogProductCustomOptionValue.html>*

### Module: Mage_Catalog

##### Resource: catalog_product_custom_option_value

**Aliases**: product_custom_option_value

###### Methods:

- [product_custom_option_value.add](product_custom_option_value.add.html "product_custom_option_value.add") -  Add a new custom option value to a selectable custom option
- [product_custom_option_value.list](product_custom_option_value.list.html "product_custom_option_value.list") -  Retrieve the list of product custom option values
- [product_custom_option_value.info](product_custom_option_value.info.html "product_custom_option_value.info") -  Retrieve full information about the specified product custom option value
- [product_custom_option_value.update](product_custom_option_value.update.html "product_custom_option_value.update") -  Update the custom option value
- [product_custom_option_value.remove](product_custom_option_value.remove.html "product_custom_option_value.remove") -  Remove the custom option value

###### Faults:

| Fault Code | Fault Message |
|----|----|
| 101 | Option value with requested id does not exist. |
| 102 | Error while adding an option value. Details are in the error message. |
| 103 | Option with requested id does not exist. |
| 104 | Invalid option type. |
| 105 | Store with requested code/id does not exist. |
| 106 | Can not delete option. |
| 107 | Error while updating an option value. Details are in the error message. |
| 108 | Title field is required. |
| 109 | Option should have at least one value. Can not delete last value. |

---

## product_custom_option_value.list — Product Custom Value List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductCustomOptionValue/product_custom_option_value.list.html>*

#### Module: Complex Product API

##### Resource: product_custom_option_value

###### Method:

- product_custom_option_value.list (SOAP V1)
- catalogProductCustomOptionValueList (SOAP V2)

Allows you to retrieve the list of product custom option values. Note that the method is available only for the option **Select** Input Type.

**Arguments:**

| Type   | Name      | Description                      |
|--------|-----------|----------------------------------|
| string | sessionId | Session ID                       |
| string | optionId  | Option ID                        |
| string | store     | Store view ID or code (optional) |

**Returns**:

| Type  | Name   | Description                                  |
|-------|--------|----------------------------------------------|
| array | result | Array of catalogProductCustomOptionValueList |

The **catalogProductCustomOptionValueListEntity** content is as follows:

| Type   | Name       | Description                                       |
|--------|------------|---------------------------------------------------|
| string | value_id   | Custom option value ID                            |
| string | title      | Custom option value title                         |
| string | price      | Option value price                                |
| string | price_type | Price type. Possible values: "fixed" or "percent" |
| string | sku        | Custom option value SKU                           |
| string | sort_order | Option value sort order (optional)                |

**Faults**:

| Fault Code | Fault Message |
|----|----|
| 101 | Provided data is invalid. |
| 102 | Error while adding an option value. Details are in the error message. |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'product_custom_option_value.list', '3');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductCustomOptionValueList($sessionId, '3');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductCustomOptionValueList((object)array('sessionId' => $sessionId->result, 'optionId' => '3'));

var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'value_id' => string '1' (length=1)
      'title' => string 'monoblock' (length=9)
      'price' => string '139.9900' (length=8)
      'price_type' => string 'fixed' (length=5)
      'sku' => string 'monoblock' (length=9)
      'sort_order' => string '0' (length=1)
  1 =>
    array
      'value_id' => string '2' (length=1)
      'title' => string 'slider' (length=6)
      'price' => string '239.9900' (length=8)
      'price_type' => string 'fixed' (length=5)
      'sku' => string 'slider' (length=6)
      'sort_order' => string '0' (length=1)
```

---

## product_custom_option_value.info — Product Custom Value Info

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductCustomOptionValue/product_custom_option_value.info.html>*

#### **Module: Complex Product API**

##### **Resource: product_custom_option_value**

###### Method:

- product_custom_option_value.info (SOAP V1)
- catalogProductCustomOptionValueInfo (SOAP V2)

Allows you to retrieve full information about the specified product custom option value.

**Arguments:**

| Type   | Name      | Description                      |
|--------|-----------|----------------------------------|
| string | sessionId | Session ID                       |
| string | valueId   | Value ID                         |
| string | store     | Store view ID or code (optional) |

**Return:**

| Type  | Name   | Description                                        |
|-------|--------|----------------------------------------------------|
| array | result | Array of catalogProductCustomOptionValueInfoEntity |

The **catalogProductCustomOptionValueInfoEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | value_id | Option value ID |
| string | option_id | Option ID |
| string | sku | Custom option value row SKU |
| string | sort_order | Option value sort order |
| string | default_price | Option value default price |
| string | default_price_type | Default price type. Possible values are as follows: "fixed" or "percent" |
| string | store_price | Option value store price |
| string | store_price_type | Store price type. Possible values are as follows: "fixed" or "percent" |
| string | price | Option value price |
| string | price_type | Price type. Possible values are as follows: "fixed" or "percent" |
| string | default_title | Option value default title |
| string | store_title | Option value store title |
| string | title | Option value title |

**Faults:**

| Fault Code | Fault Message                                  |
|------------|------------------------------------------------|
| 101        | Option value with requested id does not exist. |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'product_custom_option_value.info', '5');
var_dump($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductCustomOptionValueInfo($sessionId, '5');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductCustomOptionValueInfo((object)array('sessionId' => $sessionId->result, 'valueId' => '5'));

var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  'option_id' => string '5' (length=1)
  'sku' => string 'slider' (length=6)
  'sort_order' => string '0' (length=1)
  'default_title' => string 'slider' (length=6)
  'store_title' => string 'slider' (length=6)
  'title' => string 'slider' (length=6)
  'default_price' => string '239.9900' (length=8)
  'default_price_type' => string 'fixed' (length=5)
  'store_price' => string '239.9900' (length=8)
  'store_price_type' => string 'fixed' (length=5)
  'price' => string '239.9900' (length=8)
  'price_type' => string 'fixed' (length=5)
  'value_id' => string '2' (length=1)
```

---

## product_custom_option_value.add — Product Custom Value Add

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductCustomOptionValue/product_custom_option_value.add.html>*

#### Module: Complex Product API

##### Resource: product_custom_option_value

###### Method:

- product_custom_option_value.add (SOAP V1)
- catalogProductCustomOptionValueAdd (SOAP V2)

Allows you to add a new custom option value to a custom option. Note that the custom option value can be added only to the option with the **Select** Input Type.

**Arguments:**

| Type   | Name      | Description                                 |
|--------|-----------|---------------------------------------------|
| string | sessionId | Session ID                                  |
| string | optionId  | Option ID                                   |
| array  | data      | Array of catalogProductCustomOptionValueAdd |
| string | store     | Store view ID or code (optional)            |

**Return:**

| Type    | Description                              |
|---------|------------------------------------------|
| boolean | True if the custom option value is added |

The **catalogProductCustomOptionValueAdd** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | title | Custom option value title |
| string | price | Custom option value price |
| string | price_type | Type of the custom option value price. Can have one of the following values: "fixed" or "percent" |
| string | sku | Custom option value row SKU |
| string | sort_order | Custom option value sort order |

**Faults:**

| Fault Code | Fault Message |
|----|----|
| 101 | Option value with requested id does not exist. |
| 102 | Error while adding an option value. Details are in the error message. |
| 104 | Invalid option type. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');
$productOptionId = 1;// Existing product option ID

// Add custom option value
$customOptionValue = array(
    "title" => "Some value text 1",
    "price" => 10.00,
    "price_type" => "fixed",
    "sku" => "custom_text_option_sku",
    "sort_order" => 0
);
$resultCustomOptionValueAdd = $proxy->call(
    $sessionId,
    "product_custom_option_value.add",
    array(
        $productOptionId,
        array($customOptionValue)
    )
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login('apiUser', 'apiKey');

$result = $proxy->catalogProductCustomOptionValueAdd($sessionId, '10', array(array(
'title' => 'value',
'price' => '99.99',
'price_type' => 'fixed',
'sku' => 'sku',
'sort_order' => '1'
)));
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductCustomOptionValueAdd((object)array('sessionId' => $sessionId->result, 'optionId' => '10', 'data' => array(array(
'title' => 'value',
'price' => '99.99',
'price_type' => 'fixed',
'sku' => 'sku',
'sort_order' => '1'
))));
var_dump($result->result);
```

---

## product_custom_option_value.update — Product Custom Value Update

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductCustomOptionValue/product_custom_option_value.update.html>*

#### Module: Complex Product API

##### Resource: product_custom_option_value

###### Method:

- product_custom_option_value.update (SOAP V1)
- catalogProductCustomOptionValueUpdate (SOAP V2)

Allows you to update the product custom option value.

**Arguments:**

| Type   | Name      | Description                                          |
|--------|-----------|------------------------------------------------------|
| string | sessionId | Session ID                                           |
| string | valueId   | Value ID                                             |
| array  | data      | Array of catalogProductCustomOptionValueUpdateEntity |
| string | storeId   | Store view ID or code (optional)                     |

**Return:**

| Type    | Description                                |
|---------|--------------------------------------------|
| boolean | True if the custom option value is updated |

The **catalogProductCustomOptionValueUpdateEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | title | Option value title |
| string | price | Option value price |
| string | price_type | Price type. Possible values are as follows: "fixed" or "percent" |
| string | sku | Custom option value row SKU |
| string | sort_order | Custom option value sort order |

**Faults:**

| Fault Code | Fault Message |
|----|----|
| 101 | Option value with requested id does not exist. |
| 103 | Option with requested id does not exist. |
| 104 | Invalid option type. |
| 107 | Error while updating an option value. Details are in the error message. |
| 108 | Title field is required. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$productOptionId = 1;// Existing option ID

// Get last value from option values list
$optionValues = $proxy->call($sessionId, "product_custom_option_value.list", array($productOptionId));
$optionValue = reset($optionValues);
$valueId = $optionValue['value_id'];
// Update custom option value
$customOptionValue = array(
    "title" => "new title",
    "price" => 12.00,
    "price_type" => "percent",
    "sku" => "custom_text_option_2",
    "sort_order" => 2
);
$resultCustomOptionValueUpdate = $proxy->call(
    $sessionId,
    "product_custom_option_value.update",
    array(
         $valueId,
         $customOptionValue
    )
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login('apiUser', 'apiKey');

$result = $proxy->catalogProductCustomOptionValueUpdate($sessionId, '2', array(
'title' => 'value',
'price' => '20',
'price_type' => 'fixed',
'sku' => 'sku'
));

var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductCustomOptionValueUpdate((object)array('sessionId' => $sessionId->result, 'valueId' => '2', 'data' => ((object)array(
'title' => 'value',
'sku' => 'sku',
'price' => '199',
'price_type' => 'percent'
))));

var_dump($result->result);
```

---

## product_custom_option_value.remove — Product Custom Value Remove

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductCustomOptionValue/product_custom_option_value.remove.html>*

#### Module: Complex Product API

##### Resource: product_custom_option_value

###### Method:

- product_custom_option_value.remove (SOAP V1)
- catalogProductCustomOptionValueRemove (SOAP V2)

Allows you to remove the custom option value from a product.

**Arguments:**

| Type   | Name      | Description            |
|--------|-----------|------------------------|
| string | sessionId | Session ID             |
| string | valueId   | Custom option value ID |

**Return:**

| Type        | Description                                    |
|-------------|------------------------------------------------|
| boolean\int | True (1) if the custom option value is removed |

**Faults:**

| Fault Code | Fault Message |
|----|----|
| 103 | Option with requested id does not exist. |
| 106 | Can not delete option. |
| 109 | Option should have at least one value. Can not delete last value. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$productOptionId = 4;// Existing option ID
// Get last value from option values list
$optionValues = $proxy->call($sessionId, "product_custom_option_value.list", array($productOptionId));
$optionValue = reset($optionValues);
$valueId = $optionValue['value_id'];

$result = $proxy->call(
    $sessionId,
    "product_custom_option_value.remove",
    array(
         $valueId
    )
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductCustomOptionValueRemove($sessionId, '4');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductCustomOptionValueRemove((object)array('sessionId' => $sessionId->result, 'valueId' => '4'));
var_dump($result->result);
```

---

## Catalog Product Downloadable Link

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductDownloadableLink/catalogProductDownloadableLink.html>*

### Module: Complex Product API

##### Resource: product_downloadable_link

###### Methods:

- [product_downloadable_link.add](product_downloadable_link.add.html "product_downloadable_link.add") - Add a new link to the downloadable product
- [product_downloadable_link.list](product_downloadable_link.list.html "product_downloadable_link.list") - Get the list of links for a downloadable product
- [product_downloadable_link.remove](product_downloadable_link.remove.html "product_downloadable_link.remove") - Remove a link from a downloadable product

---

## product_downloadable_link.list — Downloadable Link List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductDownloadableLink/product_downloadable_link.list.html>*

#### Module: Complex Product API

##### Resource: product_downloadable_link

###### Method:

- product_downloadable_link.list (SOAP V1)
- catalogProductDownloadableLinkList (SOAP V2)

Allows you to retrieve a list of links of a downloadable product.

**Arguments**:

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | productId | Product ID or SKU |
| string | store | Store view ID or code (optional) |
| string | identifierType | Defines whether the product ID or SKU is passed in the request |

**Return:**

| Type  | Name   | Description                                       |
|-------|--------|---------------------------------------------------|
| array | result | Array of catalogProductDownloadableLinkListEntity |

The **catalogProductDownloadableLinkListEntity** content is as follows:

| Type  | Name    | Description                                         |
|-------|---------|-----------------------------------------------------|
| array | links   | Array of catalogProductDownloadableLinkEntity       |
| array | samples | Array of catalogProductDownloadableLinkSampleEntity |

The **catalogProductDownloadableLinkEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | link_id | Link ID |
| string | title | Link title |
| string | price | Downloadable link price value  |
| int | number_of_downloads | Maximum number of possible downloads |
| int | is_unlimited | Defines whether the number of downloads is unlimited |
| int | is_shareable | Defines whether the link is shareable |
| string | link_url | Link URL address |
| string | link_type | Type of the link data source. Can have one of the following values: "file" or "url" |
| string | sample_file | Sample file name |
| string | sample_url | Sample URL |
| string | sample_type | Type of sample data source. Can have one of the following values: "file" or "url" |
| int | sort_order | Link sort order |
| array | file_save | Array of catalogProductDownloadableLinkFileInfoEntity |
| array | sample_file_save | Array of catalogProductDownloadableLinkFileInfoEntity |

The **catalogProductDownloadableLinkSampleEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | sample_id | Sample ID |
| string | product_id | Product ID |
| string | sample_file | Sample file name |
| string | sample_url | Sample URL |
| string | sample_type | Sample type. Can have one of the following values: "file" or "url" |
| string | sort_order | Sort order |
| string | default_title | Default title |
| string | store_title | Store title |
| string | title | Sample title |

The **catalogProductDownloadableLinkFileInfoEntity** content is as follows:

| Type   | Name   | Description |
|--------|--------|-------------|
| string | file   | File        |
| string | name   | File name   |
| int    | size   | File size   |
| string | status | Status      |

**Faults:**\
*No Faults*

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$downloadableProductId = '5';

$resultList = $proxy->call(
    $sessionId,
    'product_downloadable_link.list',
    array($downloadableProductId)
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductDownloadableLinkList($sessionId, '5', null, 'sku');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductDownloadableLinkList((object)array('sessionId' => $sessionId->result, 'productId' => '5'));

var_dump($result->result);
```
###### Response Example SOAP V1
```php
array
  'links' =>
    array
      0 =>
        array
          'link_id' => string '1' (length=1)
          'title' => string 'link 1' (length=11)
          'price' => string '30.0000' (length=7)
          'number_of_downloads' => string '0' (length=1)
          'is_shareable' => string '1' (length=1)
          'link_url' => null
          'link_type' => string 'file' (length=4)
          'sample_file' => string '/s/o/software.jpg' (length=17)
          'sample_url' => null
          'sample_type' => string 'file' (length=4)
          'sort_order' => string '1' (length=1)
          'file_save' =>
            array
              ...
          'sample_file_save' =>
            array
              ...
          'is_unlimited' => int 1
  'samples' =>
    array
      0 =>
        array
          'sample_id' => string '1' (length=1)
          'product_id' => string '5' (length=1)
          'sample_url' => null
          'sample_file' => string '/s/o/software.jpg' (length=17)
          'sample_type' => string 'file' (length=4)
          'sort_order' => string '2' (length=1)
          'default_title' => string 'Sample 1' (length=8)
          'store_title' => string 'Sample 1' (length=8)
          'title' => string 'Sample 1' (length=8)
```

---

## product_downloadable_link.add — Downloadable Link Add

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductDownloadableLink/product_downloadable_link.add.html>*

#### Module: Complex Product API

##### Resource: product_downloadable_link

###### Method:

- product_downloadable_link.add (SOAP V1)
- catalogProductDownloadableLinkAdd (SOAP V2)

Allows you to add a new link to a downloadable product.

**Arguments**:

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | productId | Product ID |
| array | resource | Array of catalogProductDownloadableLinkAddEntity |
| string | resourceType | Resource type. Can have one of the following values: "sample" or "link". |
| string | store | Store view ID or code (optional) |
| string | identifierType | Type of the product identifier. Can have one of the following values: "sku" or "id". |

**Return**:

| Type | Name   | Description                                         |
|------|--------|-----------------------------------------------------|
| int  | result | Result of adding a link to the downloadable product |

The **catalogProductDownloadableLinkAddEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | title | Link title |
| string | price | Custom option value row price |
| int | is_unlimited | Defines whether the number of downloads is unlimited |
| int | number_of_downloads | Maximum number of possible downloads |
| int | is_shareable | Defines whether the link is shareable |
| array | sample | Array of catalogProductDownloadableLinkAddSampleEntity |
| string | type | Type of the data source. Can have one of the following values: "file" or "url" |
| array | file | Array of catalogProductDownloadableLinkFileEntity |
| string | link_url | Link URL address |
| string | sample_url | Sample URL address |
| int | sort_order | Link sort order |

The **catalogProductDownloadableLinkAddSampleEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | type | Type of the data source. Can have one of the following values: "file" or "url"  |
| array | file | Array of catalogProductDownloadableLinkFileEntity |
| string | url | URL to upload |

The **catalogProductDownloadableLinkFileEntity** content is as follows:

| Type   | Name           | Description         |
|--------|----------------|---------------------|
| string | name           | File name           |
| string | base64_content | BASE64 encoded file |

**Faults**:

| Fault Code | Fault Message                                    |
|------------|--------------------------------------------------|
| 414        | Unable to save action. Details in error message. |
| 415        | Validation error has occurred.                   |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');
$filesPath = '/var/www/ws/tests/WebService/etc/Modules/Downloadable/Product/Link';
$downloadableProductId = 'downloadable_demo_product';

$items = array(
    'small' => array(
        'link' => array(
            'title' => 'Test file',
            'price' => '123',
            'is_unlimited' => '1',
            'number_of_downloads' => '111',
            'is_shareable' => '0',
            'sample' => array(
                'type' => 'file',
                'file' =>
                array(
                    'filename' => 'files/test.txt',
                ),
                'url' => 'http://www.magentocommerce.com/img/logo.gif',
            ),
            'type' => 'file',
            'file' =>
            array(
                'filename' => 'files/test.txt',
            ),
            'link_url' => 'http://www.magentocommerce.com/img/logo.gif',
        ),
        'sample' => array(
            'title' => 'Test sample file',
            'type' => 'file',
            'file' => array(
                'filename' => 'files/image.jpg',
            ),
            'sample_url' => 'http://www.magentocommerce.com/img/logo.gif',
            'sort_order' => '3',
        )
    ),
    'big' => array(
        'link' => array(
            'title' => 'Test url',
            'price' => '123',
            'is_unlimited' => '0',
            'number_of_downloads' => '111',
            'is_shareable' => '1',
            'sample' => array(
                'type' => 'url',
                'file' => array(
                    'filename' => 'files/book.pdf',
                ),
                'url' => 'http://www.magentocommerce.com/img/logo.gif',
            ),
            'type' => 'url',
            'file' => array(
                'filename' => 'files/song.mp3',
            ),
            'link_url' => 'http://www.magentocommerce.com/img/logo.gif',
        ),
        'sample' => array(
            'title' => 'Test sample url',
            'type' => 'url',
            'file' => array(
                'filename' => 'files/image.jpg',
            ),
            'sample_url' => 'http://www.magentocommerce.com/img/logo.gif',
            'sort_order' => '3',
        )
    )
);

$result = true;
foreach ($items as $item) {
    foreach ($item as $key => $value) {
        if ($value['type'] == 'file') {
            $filePath = $filesPath . '/' . $value['file']['filename'];
            $value['file'] = array('name' => str_replace('/', '_', $value['file']['filename']), 'base64_content' => base64_encode(file_get_contents($filePath)), 'type' => $value['type']);
        }
        if ($value['sample']['type'] == 'file') {
            $filePath = $filesPath . '/' . $value['sample']['file']['filename'];
            $value['sample']['file'] = array('name' => str_replace('/', '_', $value['sample']['file']['filename']), 'base64_content' => base64_encode(file_get_contents($filePath)));
        }
        if (!$proxy->call(
            $sessionId,
            'product_downloadable_link.add',
            array($downloadableProductId, $value, $key)
        )
        ) {
            $result = false;
        }
    }
}
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductDownloadableLinkAdd((object)array('sessionId' => $sessionId->result, 'productId' => '3', 'resourceType' => 'link', 'resource' => ((object)array(
'title' => 'link',
'price' => '10.99',
'sample' => array(
'type' => 'url',
'url' => 'http://sometesturl.com')
))));

var_dump($result->result);
``````php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductDownloadableLinkAdd((object)array('sessionId' => $sessionId->result, 'productId' => '3', 'resourceType' => 'link', 'resource' => ((object)array(
'title' => 'link_2',
'price' => '11.99',
'type' => 'file',
'file' => array(
'name' => 'file_test',
'base64_content' => '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAXABcDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDLooor8XP4DCiiigAooooAKKKKAP/Z'
)
))));

var_dump($result->result);
```

---

## product_downloadable_link.remove — Downloadable Link Remove

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductDownloadableLink/product_downloadable_link.remove.html>*

#### Module: Complex Product API

##### Resource: product_downloadable_link

###### Method:

- product_downloadable_link.remove (SOAP V1)
- catalogProductDownloadableLinkRemove (SOAP V2)

Allows you to remove a link/sample from a downloadable product.

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | linkId/sampleId | Link/sample ID |
| string | resourceType | Resource type. Can have one of the following values: 'sample' or 'link' |

**Return:**

| Type    | Description                                                    |
|---------|----------------------------------------------------------------|
| boolean | True if the link/sample is removed from a downloadable product |

**Faults**:

| Fault Code | Fault Message                                    |
|------------|--------------------------------------------------|
| 412        | Link or sample with specified ID was not found.  |
| 415        | Validation error has occurred.                   |
| 416        | Unable to remove link. Details in error message. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$sampleId = 7;
$linkId = 9;

$resultSample = $proxy->call(
    $sessionId,
    'product_downloadable_link.remove',
    array($sampleId, 'sample')
);

$resultLink = $proxy->call(
    $sessionId,
    'product_downloadable_link.remove',
    array($linkId, 'link')
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductDownloadableLinkRemove($sessionId, '7', 'sample');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductDownloadableLinkRemove((object)array('sessionId' => $sessionId->result, 'linkId' => '7', 'resourceType' => 'sample'));
var_dump($result->result);
```

---

## Catalog Product Link

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductLink/catalogProductLink.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### Product Links

Allows you to manage links for products, including related, cross-sells, up-sells, and grouped.

**Resource Name**: catalog_product_link

**Aliases**:

- product_link

**Methods**:

- [catalog_product_link.list](catalog_product_link.list.html "catalog_product_link.list") - Retrieve products linked to the specified product
- [catalog_product_link.assign](catalog_product_link.assign.html "catalog_product_link.assign") - Link a product to another product
- [catalog_product_link.update](catalog_product_link.update.html "catalog_product_link.update") - Update a product link
- [catalog_product_link.remove](catalog_product_link.remove.html "catalog_product_link.remove") - Remove a product link
- [catalog_product_link.types](catalog_product_link.types.html "catalog_product_link.types") - Retrieve product link types
- [catalog_product_link.attributes](catalog_product_link.attributes.html "catalog_product_link.attributes") - Retrieve product link type attributes

##### Faults

| Fault Code | Fault Message                                 |
|------------|-----------------------------------------------|
| 100        | Given invalid link type.                      |
| 101        | Product not exists.                           |
| 102        | Invalid data given. Details in error message. |
| 104        | Product link not removed.                     |

##### Examples

###### Example 1. Working with product links
```
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

// Get list of related products
var_dump($proxy->call($sessionId, 'product_link.list', array('related', 'Sku')));

// Assign related product
$proxy->call($sessionId, 'product_link.assign', array('related', 'Sku', 'Sku2', array('position'=>0, 'qty'=>56)));

var_dump($proxy->call($sessionId, 'product_link.list', array('related', 'Sku')));

// Update related product
$proxy->call($sessionId, 'product_link.update', array('related', 'Sku', 'Sku2', array('position'=>2)));

var_dump($proxy->call($sessionId, 'product_link.list', array('related', 'Sku')));

// Remove related product
$proxy->call($sessionId, 'product_link.remove', array('related', 'Sku', 'Sku2'));

var_dump($proxy->call($sessionId, 'product_link.list', array('related', 'Sku')));
```

---

## catalog_product_link.types — Product Link Types

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductLink/catalog_product_link.types.html>*

### Module: Mage_Catalog

##### Resource: catalog_product_link

**Aliases:**

- product_link

###### Method:

- catalog_product_link.types (SOAP V1)
- catalogProductLinkTypes (SOAP V2)

Allows you to retrieve the list of product link types.

**Aliases:**

- product_link.types

**Arguments:**

| Type   | Name      | Description |
|--------|-----------|-------------|
| string | sessionId | Session ID  |

**Returns**:

| Type          | Name   | Description         |
|---------------|--------|---------------------|
| ArrayOfString | result | Array of link types |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'product_link.types');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductLinkTypes($sessionId);
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');
$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductLinkTypes((object)array('sessionId' => $sessionId->result));

var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  0 => string 'related' (length=7)
  1 => string 'up_sell' (length=7)
  2 => string 'cross_sell' (length=10)
  3 => string 'grouped' (length=7)
```

---

## catalog_product_link.attributes — Product Link Attributes

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductLink/catalog_product_link.attributes.html>*

### Module: Mage_Catalog

##### Resource: catalog_product_link

**Aliases:**

- product_link

###### Method:

- catalog_product_link.attributes (SOAP V1)
- catalogProductLinkAttributes (SOAP V2)

Allows you to retrieve the product link type attributes.

**Aliases:**

- product_link.attributes

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | type | Type of the link (cross_sell, up_sell, related, or grouped) |

**Returns**:

| Type  | Name   | Description                                |
|-------|--------|--------------------------------------------|
| array | result | Array of catalogProductLinkAttributeEntity |

The **catalogProductLinkAttributeEntity** content is as follows:

| Type   | Name | Description    |
|--------|------|----------------|
| string | code | Attribute code |
| string | type | Attribute type |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_product_link.attributes', 'related');
var_dump ($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductLinkAttributes($sessionId, 'related');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');
$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductLinkAttributes((object)array('sessionId' => $sessionId->result, 'type' => 'related'));

var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'code' => string 'position' (length=8)
      'type' => string 'int' (length=3)
```

---

## catalog_product_link.assign — Product Link Assign

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductLink/catalog_product_link.assign.html>*

### Module: Mage_Catalog

##### Resource: catalog_product_link

**Aliases:**

- product_link

###### Method:

- catalog_product_link.assign (SOAP V1)
- catalogProductLinkAssign (SOAP V2)

Allows you to assign a product link (cross_sell, grouped, related, or up_sell) to another product.

**Aliases:**

- product_link.assign

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | type | Type of the link (cross_sell, grouped, related, or up_sell) |
| string | product\productId | Product ID or SKU |
| string | linkedProduct\linkedProductId | Product ID or SKU for the link |
| array | data | Array of catalogProductLinkEntity |
| string | identifierType | Defines whether the product ID or SKU is passed in the 'product' parameter |

**Returns**:

| Type    | Description                                 |
|---------|---------------------------------------------|
| boolean | True if the link is assigned to the product |

The **catalogProductLinkEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | product_id | Product ID |
| string | type | Type of the link (cross_sell, grouped, related, or up_sell) |
| string | set | Product attribute set |
| string | sku | Product SKU |
| string | position | Position of the product |
| string | qty | Quantity of products |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apikey');

$result = $client->call($session, 'catalog_product_link.assign', array('type' => 'related', 'product' => '1', 'linkedProduct' => '4'));
var_dump ($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductLinkAssign($sessionId, 'related', '1', '4');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');
$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductLinkAssign((object)array('sessionId' => $sessionId->result, 'type' => 'related', 'productId' => '1', 'linkedProductId' => '4'));

var_dump($result->result);
```

---

## catalog_product_link.update — Product Link Update

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductLink/catalog_product_link.update.html>*

### Module: Mage_Catalog

##### Resource: catalog_product_link

**Aliases:**

- product_link

###### Method:

- catalog_product_link.update (SOAP V1)
- catalogProductLinkUpdate (SOAP V2)

Allows you to update the product link.

**Aliases:**

- product_link.update

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | type | Type of the link (cross_sell, grouped, related, or up_sell) |
| string | product\productId | Product ID or SKU |
| string | linkedProduct\linkedProductId | Product ID or SKU for the link |
| array | data | Array of catalogProductLinkEntity |
| string | identifierType | Defines whether the product ID or SKU is passed in the 'product' parameter |

**Returns**:

| Type        | Name   | Description                     |
|-------------|--------|---------------------------------|
| boolean\int | result | True (1) if the link is updated |

The **catalogProductLinkEntity** content is as follows:

| Type   | Name       | Description           |
|--------|------------|-----------------------|
| string | product_id | Product ID            |
| string | type       | Type of the link      |
| string | set        | Product attribute set |
| string | sku        | Product SKU           |
| string | position   | Position              |
| string | qty        | Quantity              |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$productId = '1';
$linkedProductId = '2';
$data = array(
	'position' => '50'
);

$result = $proxy->call(
	$session,
	'catalog_product_link.update',
	array(
		'cross_sell',
		$productId,
		$linkedProductId,
		$data
	)
);
```
###### Request Example SOAP V2
```php
<?php

$client = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$session = $client->login('apiUser', 'apiKey');

$data = array(
   "position" => 15
  );

$identifierType = "product_id";
$type = "related";
$product = "1";
$linkedProduct = "3";

$orders = $client->catalogProductLinkUpdate($session, $type, $product, $linkedProduct, $data, $identifierType);

echo 'Number of results: ' . count($orders) . '<br/>';
var_dump ($orders);
?>
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');
$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductLinkUpdate((object)array('sessionId' => $sessionId->result, 'type' => 'cross_sell', 'productId' => '1', 'linkedProductId' => '2', 'data' => ((object)array(
'position' => '1'
))));

var_dump($result->result);
```

---

## catalog_product_link.list — Product Link List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductLink/catalog_product_link.list.html>*

### Module: Mage_Catalog

##### Resource: catalog_product_link

**Aliases:**

- product_link

###### Method:

- catalog_product_link.list (SOAP V1)
- catalogProductLinkList (SOAP V2)

Allows you to retrieve the list of linked products for a specific product.

**Aliases:**

- product_link.list

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | type | Type of the link (cross_sell, up_sell, related, or grouped) |
| string | product\productId | Product ID or SKU |
| string | identifierType | Defines whether the product ID or SKU is passed in the 'product' parameter |

**Returns**:

| Type  | Name   | Description                       |
|-------|--------|-----------------------------------|
| array | result | Array of catalogProductLinkEntity |

The **catalogProductLinkEntity** content is as follows:

| Type   | Name       | Description           |
|--------|------------|-----------------------|
| string | product_id | Product ID            |
| string | type       | Type of the link      |
| string | set        | Product attribute set |
| string | sku        | Product SKU           |
| string | position   | Position              |
| string | qty        | Quantity              |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_product_link.list', array('type' => 'related', 'product' => '1'));
var_dump ($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductLinkList($sessionId, 'related', '1');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');
$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductLinkList((object)array('sessionId' => $sessionId->result, 'type' => 'related', 'productId' => '1'));

var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'product_id' => string '3' (length=1)
      'type' => string 'simple' (length=6)
      'set' => string '4' (length=1)
      'sku' => string 'canonxt' (length=7)
      'position' => string '1' (length=1)
  1 =>
    array
      'product_id' => string '4' (length=1)
      'type' => string 'simple' (length=6)
      'set' => string '4' (length=1)
      'sku' => string 'canon_powershot' (length=15)
      'position' => string '0' (length=1)
```

---

## catalog_product_link.remove — Product Link Remove

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductLink/catalog_product_link.remove.html>*

### Module: Mage_Catalog

##### Resource: catalog_product_link

**Aliases:**

- product_link

###### Method:

- catalog_product_link.remove (SOAP V1)
- catalogProductLinkRemove (SOAP V2)

Allows you to remove the product link from a specific product.

**Aliases:**

- product_link.remove

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | type | Type of the link (cross_sell, up_sell, related, or grouped) |
| string | product\productId | Product ID or SKU |
| string | linkedProduct\linkedProductId | Product ID or SKU for the link |
| string | identifierType | Defines whether the product ID or SKU is passed in the 'product' parameter |

**Returns**:

| Type        | Description                                    |
|-------------|------------------------------------------------|
| boolean\int | True (1) if the link is removed from a product |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_product_link.remove', array('type' => 'related', 'product' => '1', 'linkedProduct' => '4'));
var_dump ($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductLinkRemove($sessionId, 'related', '1', '4');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');
$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductLinkRemove((object)array('sessionId' => $sessionId->result, 'type' => 'related', 'productId' => '1', 'linkedProductId' => '4'));

var_dump($result->result);
```

---

## Catalog Product Tag

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductTag/catalogProductTag.html>*

### Module: Tag

Allows you to operate with product tags.

##### Resource: catalog_product_tag

**Aliases**: product_tag

###### Methods:

- [product_tag.list](product_tag.list.html "product_tag.list") - Retrieve the list of tags by the product ID
- [product_tag.info](product_tag.info.html "product_tag.info") - Retrieve information about a product tag
- [product_tag.add](product_tag.add.html "product_tag.add") - Add one or more tags to a product
- [product_tag.update](product_tag.update.html "product_tag.update") - Update an existing product tag
- [product_tag.remove](product_tag.remove.html "product_tag.remove") - Remove a product tag

###### Faults:

| Fault Code | Fault Message                                       |
|------------|-----------------------------------------------------|
| 101        | Requested store does not exist.                     |
| 102        | Requested product does not exist.                   |
| 103        | Requested customer does not exist.                  |
| 104        | Requested tag does not exist.                       |
| 105        | Provided data is invalid.                           |
| 106        | Error while saving tag. Details in error message.   |
| 107        | Error while removing tag. Details in error message. |

###### Example:
```
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');
$productId = 2;
$customerId = 10002;
$store = 'default';

// Add tags
$data = array('product_id' => $productId, 'store' => $store, 'customer_id' => $customerId, 'tag' => "First 'Second tag' Third");
echo "Adding Tag... ";
$addResult = $proxy->call(
    $sessionId,
    "product_tag.add",
    array($data)
);
echo ((count($addResult) == 3) ? "Done!" : "Fail!");
echo "<br />";
print_r($addResult);
$tagId = reset($addResult);

// Get tag info
echo "<br />Get Tag Info (id = $tagId)... ";
$infoResult = $proxy->call(
    $sessionId,
    "product_tag.info",
    array($tagId, $store)
);
echo "Done!<br />";
print_r($infoResult);

// Update tag data
$data = array('status' => -1, 'base_popularity' => 12, 'name' => 'Changed name');
echo "<br />Update Tag (id = $tagId)... ";
$updateResult = $proxy->call(
    $sessionId,
    "product_tag.update",
    array($tagId, $data, $store)
);
echo ($updateResult ? "Done!" : "Fail!");

// Retrieve list of tags by product
echo "<br />Tag list for product with id = $productId... ";
$listResult = $proxy->call(
    $sessionId,
    "product_tag.list",
    array($productId, $store)
);
echo (count($listResult) ? "Done!" : "Fail!");
echo "<br />";
print_r($listResult);

// Remove existing tag
echo "<br />Remove Tag (id = $tagId)... ";
$removeResult = $proxy->call(
    $sessionId,
    "product_tag.remove",
    array($tagId)
);
echo ($removeResult ? "Done!" : "Fail!");
```

---

## product_tag.list — Product Tag List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductTag/product_tag.list.html>*

#### Module: Tag API

##### Resource: catalog_product_tag

**Aliases**: product_tag

###### Method:

- catalog_product_tag.list (SOAP V1)
- catalogProductTagList (SOAP V2)

Allows you to retrieve the list of tags for a specific product.

**Arguments:**

| Type   | Name      | Description           |
|--------|-----------|-----------------------|
| string | sessionId | Session ID            |
| string | productId | Product ID            |
| string | store     | Store view code or ID |

**Return:**

| Type  | Name   | Description                          |
|-------|--------|--------------------------------------|
| array | result | Array of catalogProductTagListEntity |

The **catalogProductTagListEntity** content is as follows:

| Type   | Name   | Description |
|--------|--------|-------------|
| string | tag_id | Tag ID      |
| string | name   | Tag name    |

**Faults:**

| Fault Code | Fault Message                     |
|------------|-----------------------------------|
| 101        | Requested store does not exist.   |
| 102        | Requested product does not exist. |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_product_tag.list', array('productId' => '4', 'store' => '2'));
var_dump ($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductTagList($sessionId, '4', '2');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductTagList((object)array('sessionId' => $sessionId->result, 'productId' => '4', 'store' => '2'));
var_dump($result->result);
```
###### Response Example SOAP V1
```php
array
  3 =>
    array
      'tag_id' => string '3' (length=1)
      'name' => string 'canon' (length=5)
  4 =>
    array
      'tag_id' => string '4' (length=1)
      'name' => string 'digital' (length=7)
```

---

## product_tag.info — Product Tag Info

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductTag/product_tag.info.html>*

#### Module: Tag API

##### Resource: catalog_product_tag

**Aliases**: product_tag

###### Method:

- catalog_product_tag.info (SOAP V1)
- catalogProductTagInfo (SOAP V2)

Allows you to retrieve information about the required product tag.

**Arguments:**

| Type   | Name      | Description           |
|--------|-----------|-----------------------|
| string | sessionId | Session ID            |
| string | tagId     | Tag ID                |
| string | store     | Store view code or ID |

**Return:**

| Type  | Name   | Description                          |
|-------|--------|--------------------------------------|
| array | result | Array of catalogProductTagInfoEntity |

The **catalogProductTagInfoEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | name | Tag name |
| string | status | Tag status |
| string | base_popularity | Tag base popularity for a specific store |
| associativeArray | products | Associative array of tagged products with related product ID as a key and popularity as a value |

**Faults:**

| Fault Code | Fault Message                   |
|------------|---------------------------------|
| 101        | Requested store does not exist. |
| 104        | Requested tag does not exist.   |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_product_tag.info', array('tagId' => '4', 'store' => '2'));
var_dump ($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductTagInfo($sessionId, '4', '2');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductTagInfo((object)array('sessionId' => $sessionId->result, 'tagId' => '4', 'store' => '2'));
var_dump($result->result);
```
###### Response Example SOAP V1
```php
array
  'status' => string '1' (length=1)
  'name' => string 'digital' (length=7)
  'base_popularity' => int 0
  'products' =>
    array
      1 => string '1' (length=1)
      3 => string '1' (length=1)
      4 => string '1' (length=1)
```

---

## product_tag.add — Product Tag Add

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductTag/product_tag.add.html>*

#### Module: Tag Api

##### Resource: catalog_product_tag

**Aliases**: product_tag

###### Method:

- catalog_product_tag.add (SOAP V1)
- catalogProductTagAdd (SOAP V2)

Allows you to add one or more tags to a product.

**Arguments:**

| Type   | Name      | Description                         |
|--------|-----------|-------------------------------------|
| string | sessionId | Session ID                          |
| array  | data      | Array of catalogProductTagAddEntity |

**Return:**

| Type | Name | Description |
|----|----|----|
| array | result | Associative array of added tags with the tag name as a key and the tag ID as a value |

The **catalogProductTagAddEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | tag | Tag to be added (can contain several tags separated with white spaces). A tag that contains several words should be enclosed in single quotes. |
| string | product_id | Product ID |
| string | customer_id | Customer ID |
| string | store | Store ID |

**Faults:**

| Fault Code | Fault Message                                     |
|------------|---------------------------------------------------|
| 101        | Requested store does not exist.                   |
| 102        | Requested product does not exist.                 |
| 103        | Requested customer does not exist.                |
| 105        | Provided data is invalid.                         |
| 106        | Error while saving tag. Details in error message. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');
$data = array('product_id' => 2, 'store' => 'default', 'customer_id' => 10002, 'tag' => "First 'Second tag' Third");
echo "Adding Tag... ";
$addResult = $proxy->call(
    $sessionId,
    "product_tag.add",
    array($data)
);
echo ((count($addResult) == 3) ? "Done!" : "Fail!");
echo "<br />";
print_r($addResult);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login('apiUser', 'apiKey');

$result = $proxy->catalogProductTagAdd($sessionId, array(
'tag' => 'album',
'product_id' => '3',
'customer_id' => '1',
'store' => '0'
));
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductTagAdd((object)array('sessionId' => $sessionId->result, 'data' => ((object)array(
'tag' => 'album',
'product_id' => '3',
'customer_id' => '1',
'store' => '0'
))));
var_dump($result->result);
```

---

## product_tag.update — Product Tag Update

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductTag/product_tag.update.html>*

#### Module: Tag API

##### Resource: catalog_product_tag

**Aliases**: product_tag

###### Method:

- catalog_product_tag.update (SOAP V1)
- catalogProductTagUpdate (SOAP V2)

Allows you to update information about an existing product tag.

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | tagId | ID of the tag to be updated |
| array | data | Array of catalogProductTagUpdateEntity |
| string | store | Store view code or ID (optional; required for WS-I compliance mode) |

**Return:**

| Type    | Description                        |
|---------|------------------------------------|
| boolean | True if the product tag is updated |

The **catalogProductTagUpdateEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | name | Tag name |
| string | status | Tag status. Can have the following values: -1 - Disabled, 0 - Pending, 1- Approved |
| string | base_popularity | Tag base popularity |

**Faults:**

| Fault Code | Fault Message                                     |
|------------|---------------------------------------------------|
| 101        | Requested store does not exist.                   |
| 104        | Requested tag does not exist.                     |
| 105        | Provided data is invalid.                         |
| 106        | Error while saving tag. Details in error message. |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_product_tag.update', array('tagId' => '4', 'data' => array('name' => 'digital_1')));
var_dump ($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); 

$sessionId = $proxy->login('apiUser', 'apiKey'); 
 
$result = $proxy->catalogProductTagUpdate($sessionId, '1', array(
'name' => 'tag',
'status' => '1'
));   
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductTagUpdate((object)array('sessionId' => $sessionId->result, 'tagId' => '1', 'store' => '0', 'data' => ((object)array(
'name' => 'tag',
'status' => '1',
'base_popularity' => null
))));
var_dump($result->result);
```

---

## product_tag.remove — Product Tag Remove

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductTag/product_tag.remove.html>*

#### Module: Tag API

##### Resource: catalog_product_tag

**Aliases**: product_tag

###### Method:

- catalog_product_tag.remove (SOAP V1)
- catalogProductTagRemove (SOAP V2)

Allows you to remove an existing product tag.

**Arguments:**

| Type   | Name      | Description |
|--------|-----------|-------------|
| string | sessionId | Session ID  |
| string | tagId     | Tag ID      |

**Return:**

| Type        | Description                            |
|-------------|----------------------------------------|
| boolean\int | True (1) if the product tag is removed |

**Faults:**

| Fault Code | Fault Message                                       |
|------------|-----------------------------------------------------|
| 104        | Requested tag does not exist.                       |
| 107        | Error while removing tag. Details in error message. |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_product_tag.remove', '3');
var_dump ($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductTagRemove($sessionId, '3');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductTagRemove((object)array('sessionId' => $sessionId->result, 'tagId' => '3'));
var_dump($result->result);
```

---

## Catalog Product Tier Price

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductTierPrice/catalogProductTierPrice.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### Product Tier Price

Allows you to retrieve and update product tier prices.

**Resource Name**: catalog_product_attribute_tier_price

**Aliases**:

- product_attribute_tier_price
- product_tier_price

**Methods**:

- [catalog_product_attribute_tier_price.info](catalog_product_attribute_tier_price.info.html "catalog_product_attribute_tier_price.info") - Retrieve information about product tier prices
- [catalog_product_attribute_tier_price.update](catalog_product_attribute_tier_price.update.html "catalog_product_attribute_tier_price.update") - Update the product tier prices

##### Faults

| Fault Code | Fault Message                                      |
|------------|----------------------------------------------------|
| 100        | Product not exists.                                |
| 101        | Invalid data given. Details in error message.      |
| 102        | Tier prices not updated. Details in error message. |

##### Examples
```
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

// Get tier prices
$tierPrices = $proxy->call($sessionId, 'product_tier_price.info', 'Sku');

var_dump($tierPrices);

// Add new
$tierPrices[] = array(
    'website'           => 'all',
    'customer_group_id' => 'all',
    'qty'               => 68,
    'price'             => 18.20
);

// Update tier prices
$proxy->call($sessionId, 'product_tier_price.update', array('Sku', $tierPrices));

// Compare values
var_dump($proxy->call($sessionId, 'product_tier_price.info', 'Sku'));

var_dump($tierPrices);
```

---

## catalog_product_attribute_tier_price.info — Product Attribute Tier Price Info

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductTierPrice/catalog_product_attribute_tier_price.info.html>*

### Module: Mage_Catalog

##### Resource: catalog_product_attribute_tier_price

**Aliases:**

- product_attribute_tier_price
- product_tier_price

###### Method:

- catalog_product_attribute_tier_price.info (SOAP V1)
- catalogProductAttributeTierPriceInfo (SOAP V2)

Allows you to retrieve information about product tier prices.

**Aliases:**

- product_attribute_tier_price.info
- product_tier_price.info

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | product\productId | Product ID or SKU |
| string | identifierType | Defines whether the product ID or SKU is passed in the 'product' parameter |

**Returns**:

| Type  | Name   | Description                            |
|-------|--------|----------------------------------------|
| array | result | Array of catalogProductTierPriceEntity |

The **catalogProductTierPriceEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | customer_group_id | Customer group ID |
| string | website | Website |
| int | qty | Quantity of items to which the price will be applied |
| double | price | Price that each item will cost |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_product_attribute_tier_price.info', 'productId');
var_dump($result);
```
###### Request Example SOAP V2
```php
$client = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$productId = 1;

$result = $client->catalogProductAttributeTierPriceInfo(
	$session,
	$productId
);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductAttributeTierPriceInfo((object)array('sessionId' => $sessionId->result, 'productId' => '1'));

var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'customer_group_id' => string '1' (length=1)
      'website' => string 'all' (length=3)
      'qty' => string '2.0000' (length=6)
      'price' => string '129.9900' (length=8)
```
###### Response Example SOAP V2
```
array
  0 =>
    object(stdClass)[2]
      public 'customer_group_id' => string '0' (length=1)
      public 'website' => string 'all' (length=3)
      public 'qty' => int 5
      public 'price' => float 99
  1 =>
    object(stdClass)[3]
      public 'customer_group_id' => string '0' (length=1)
      public 'website' => string 'all' (length=3)
      public 'qty' => int 10
      public 'price' => float 98
```

---

## catalog_product_attribute_tier_price.update — Product Attribute Tier Price Update

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductTierPrice/catalog_product_attribute_tier_price.update.html>*

### Module: Mage_Catalog

##### Resource: catalog_product_attribute_tier_price

**Aliases:**

- product_attribute_tier_price
- product_tier_price

###### Method:

- catalog_product_attribute_tier_price.update (SOAP V1)
- catalogProductAttributeTierPriceUpdate (SOAP V2)

Allows you to update the product tier prices.

**Aliases:**

- product_attribute_tier_price.update
- product_tier_price.update

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | product\productId | Product ID or SKU |
| array | tierPrices | Array of catalogProductTierPriceEntity |
| string | identifierType | Defines whether the product ID or SKU is passed in the 'product' parameter |

**Returns**:

| Type        | Name   | Description                                   |
|-------------|--------|-----------------------------------------------|
| boolean\int | result | True (1) if the product tier price is updated |

The **catalogProductTierPriceEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | customer_group_id | Customer group ID |
| string | website | Website |
| int | qty | Quantity of items to which the price will be applied |
| double | price | Price that each item will cost |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$productId = 1;
$tierPrices = array(
	array('customer_group_id' => '0', 'website' => '0', 'qty' => '50', 'price' => '9.90')
);

$result = $proxy->call(
	$sessionId,
	'product_attribute_tier_price.update',
	array(
		$productId,
		$tierPrices
	)
);

var_dump($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$productId = 1;
$tierPrices = array(
	array('customer_group_id' => '0', 'website' => '0', 'qty' => '50', 'price' => '9.90')
);

$result = $proxy->catalogProductAttributeTierPriceUpdate(
	$sessionId,
	$productId,
	$tierPrices
);

var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');
$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$productId = 1;
$tierPrices = array(
	array('customer_group_id' => '0', 'website' => '0', 'qty' => '50', 'price' => '9.90')
);

$result = $proxy->catalogProductAttributeTierPriceUpdate((object)array(
'sessionId' => $sessionId->result,
'productId' => $productId,
'tierPrices' => $tierPrices
));

var_dump($result->result);
```

---
