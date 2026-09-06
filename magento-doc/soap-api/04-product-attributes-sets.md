# SOAP API — Product Attributes, Attribute Sets & Product Types

> Product attribute CRUD/options/types, attribute set and group management, product type list.

---

## Catalog Product Attribute

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttribute/catalogProductAttribute.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### Product Attributes

Allows you to retrieve product attributes and options.

**Resource Name**: catalog_product_attribute

**Aliases**:

- product_attribute

**Methods**:

- [product_attribute.currentStore](product_attribute.currentStore.html "product_attribute.currentStore") - Set/Get the current store view
- [product_attribute.list](product_attribute.list.html "product_attribute.list") - Retrieve the attribute list
- [product_attribute.options](product_attribute.options.html "product_attribute.options") - Retrieve the attribute options
- [product_attribute.addOption](product_attribute.addOption.html "product_attribute.addOption") - Add a new option for attributes with selectable fields
- [product_attribute.create](product_attribute.create.html "product_attribute.create") - Create a new attribute
- [product_attribute.info](product_attribute.info.html "product_attribute.info") - Get full information about an attribute with the list of options
- [product_attribute.remove](product_attribute.remove.html "product_attribute.remove") - Remove the required attribute
- [product_attribute.removeOption](product_attribute.removeOption.html "product_attribute.removeOption") - Remove an option for attributes with selectable fields
- [product_attribute.types](product_attribute.types.html "product_attribute.types") - Get the list of possible attribute types
- [product_attribute.update](product_attribute.update.html "product_attribute.update") - Update the required attribute

###### Faults:

| Fault Code | Fault Message |
|----|----|
| 100 | Requested store view not found. |
| 101 | Requested attribute not found. |
| 102 | Invalid request parameters. |
| 103 | Attribute code is invalid. Please use only letters (a-z), numbers (0-9) or underscore (\_) in this field, first character should be a letter. |
| 104 | Incorrect attribute type. |
| 105 | Unable to save attribute. |
| 106 | This attribute cannot be deleted. |
| 107 | This attribute cannot be edited. |
| 108 | Unable to add option. |
| 109 | Unable to remove option. |

###### Example:
```php
<pre>
<?php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

echo "<pre>";
// Create new attribute
$attributeToCreate = array(
    "attribute_code" => "new_attribute",
    "scope" => "store",
    "frontend_input" => "select",
    "is_unique" => 0,
    "is_required" => 0,
    "is_configurable" => 0,
    "is_searchable" => 0,
    "is_visible_in_advanced_search" => 0,
    "used_in_product_listing" => 0,
    "additional_fields" => array(
        "is_filterable" => 1,
        "is_filterable_in_search" => 1,
        "position" => 1,
        "used_for_sort_by" => 1
    ),
    "frontend_label" => array(
        array(
            "store_id" => 0,
            "label" => "A new attribute"
        )
    )
);

$attributeId = $proxy->call(
    $sessionId,
    "product_attribute.create",
    array(
        $attributeToCreate
    )
);

// Update attribute
$attributeToUpdate = array(
    "scope" => "global",
    "is_unique" => 1,
    "is_required" => 1,
    "is_configurable" => 1,
    "is_searchable" => 1,
    "is_visible_in_advanced_search" => 0,
    "used_in_product_listing" => 0,
    "additional_fields" => array(
        "is_filterable" => 01,
        "is_filterable_in_search" => 0,
        "position" => 2,
        "used_for_sort_by" => 0
    ),
    "frontend_label" => array(
        array(
            "store_id" => 0,
            "label" => "A Test Attribute"
        )
    )
);
$proxy->call(
    $sessionId,
    "product_attribute.update",
    array(
         "new_attribute",
         $attributeToUpdate
    )
);

// Add option
$optionToAdd = array(
    "label" => array(
        array(
            "store_id" => 0,
            "value" => "New Option"
        )
    ),
    "order" => 0,
    "is_default" => 0
);

$proxy->call(
    $sessionId,
    "product_attribute.addOption",
    array(
         $attributeId,
         $optionToAdd
    )
);

// Get info
$resultInfo = $proxy->call(
    $sessionId,
    "product_attribute.info",
    array(
         $attributeId
    )
);
echo "info result:\n";
print_r($resultInfo);

// List options
$resultListOptions = $proxy->call(
    $sessionId,
    "product_attribute.options",
    array(
         $attributeId
    )
);
echo "\n options result:\n";
print_r($resultListOptions);

// Remove option
$result = $proxy->call(
    $sessionId,
    "product_attribute.removeOption",
    array(
         $attributeId,
         $resultInfo['options'][0]['value']
    )
);

// remove attribute
$result = $proxy->call(
    $sessionId,
    "product_attribute.remove",
    array(
         $attributeId
    )
);
```

---

## product_attribute.types — Attribute Types

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttribute/product_attribute.types.html>*

#### Module: Product Attributes API

##### Resource: product_attribute

###### Method:

- product_attribute.types (SOAP V1)
- catalogProductAttributeTypes (SOAP V2)

Allows you to retrieve the list of possible attribute types.

**Arguments:**

| Type   | Name      | Description |
|--------|-----------|-------------|
| string | sessionId | Session ID  |

**Return:**

| Type  | Name   | Description                           |
|-------|--------|---------------------------------------|
| array | result | Array of catalogAttributeOptionEntity |

The **catalogAttributeOptionEntity** content is as follows:

| Type   | Name  | Description  |
|--------|-------|--------------|
| string | label | Option label |
| string | value | Option value |

**Faults:**

*No Faults.*

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$result = $proxy->call(
    $sessionId,
    "product_attribute.types"
);

echo "<pre>";
var_dump($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductAttributeTypes($sessionId);
var_dump($result);
```
###### Response Example SOAP V1
```
array
  0 =>
      'value' => 'text'
      'label' => 'Text Field'
  1 =>
      'value' => 'textarea'
      'label' => 'Text Area'
  2 =>
      'value' => 'date'
      'label' => 'Date'
  3 =>
      'value' => 'boolean'
      'label' => 'Yes/No'
  4 =>
      'value' => 'multiselect'
      'label' => 'Multiple Select'
  5 =>
      'value' => 'select'
      'label' => 'Dropdown'
  6 =>
      'value' => 'price'
      'label' => 'Price'
  7 =>
      'value' => 'media_image'
      'label' => 'Media Image'
```

---

## product_attribute.currentStore — Current Store

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttribute/product_attribute.currentStore.html>*

### Module: Mage_Catalog

##### Resource: catalog_product_attribute

**Aliases:**

- product_attribute

###### Method:

- catalog_product_attribute.currentStore (SOAP V1)
- catalogProductAttributeCurrentStore (SOAP V2)

Allows you to set/get the current store view.

**Aliases:**

- product_attribute.currentStore

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

$result = $client->call($session, 'catalog_product_attribute.currentStore', 'english');
var_dump ($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary
 
$result = $proxy->catalogProductAttributeCurrentStore($sessionId, 'english');
var_dump($result);
```

---

## product_attribute.list — Attribute List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttribute/product_attribute.list.html>*

### Module: Mage_Catalog

##### Resource: catalog_product_attribute

**Aliases:**

- product_attribute

##### Method:

- catalog_product_attribute.list (SOAP V1)
- catalogProductAttributeList (SOAP V2)

Allows you to retrieve the list of product attributes.

**Aliases:**

- product_attribute.list

**Arguments:**

| Type   | Name      | Description             |
|--------|-----------|-------------------------|
| string | sessionId | Session ID              |
| int    | setId     | ID of the attribute set |

**Returns**:

| Type  | Name   | Description                     |
|-------|--------|---------------------------------|
| array | result | Array of catalogAttributeEntity |

The **catalogAttributeEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| int | attribute_id | Attribute ID |
| string | code | Attribute code |
| string | type | Attribute type |
| string | required | Defines whether the attribute is required |
| string | scope | Attribute scope. Possible values: 'store', 'website', or 'global' |

**Faults:**

*No faults*

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$setid = 4; // Existing attribute set id

$result = $proxy->call(
    $sessionId,
    "product_attribute.list",
    array(
         $setId
    )
);
echo "<pre>";
var_dump($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductAttributeList($sessionId, '4');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductAttributeList((object)array('sessionId' => $sessionId->result, 'setId' => '4'));

var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'attribute_id' => string '71' (length=2)
      'code' => string 'name' (length=4)
      'type' => string 'text' (length=4)
      'required' => string '1' (length=1)
      'scope' => string 'store' (length=5)
  1 =>
    array
      'attribute_id' => string '72' (length=2)
      'code' => string 'description' (length=11)
      'type' => string 'textarea' (length=8)
      'required' => string '1' (length=1)
      'scope' => string 'store' (length=5)
```

---

## product_attribute.options — Attribute Options

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttribute/product_attribute.options.html>*

### Module: Mage_Catalog

##### Resource: catalog_product_attribute

**Aliases:**

- product_attribute

###### Method:

- catalog_product_attribute.options (SOAP V1)
- catalogProductAttributeOptions (SOAP V2)

Allows you to retrieve the product attribute options.

**Aliases:**

- product_attribute.options

**Arguments:**

| Type   | Name        | Description                      |
|--------|-------------|----------------------------------|
| string | sessionId   | Session ID                       |
| string | attributeId | Attribute ID or code             |
| string | storeView   | Store view ID or code (optional) |

**Returns**:

| Type  | Name   | Description                           |
|-------|--------|---------------------------------------|
| array | result | Array of catalogAttributeOptionEntity |

The **catalogAttributeOptionEntity** content is as follows:

| Type   | Name  | Description  |
|--------|-------|--------------|
| string | label | Option label |
| string | value | Option value |

**Faults:**

| Fault Code | Fault Message                  |
|------------|--------------------------------|
| 101        | Requested attribute not found. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$attributeId = 11; // Existing selectable attribute ID

$result = $proxy->call(
    $sessionId,
    "product_attribute.options",
    array(
         $attributeId
    )
);
echo "<pre>";
var_dump($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductAttributeOptions($sessionId, '11');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductAttributeOptions((object)array('sessionId' => $sessionId->result, 'attributeId' => '11'));

var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  1 =>
    array
      'value' => string '5' (length=1)
      'label' => string 'blue' (length=4)
  2 =>
    array
      'value' => string '4' (length=1)
      'label' => string 'green' (length=5)
  3 =>
    array
      'value' => string '3' (length=1)
      'label' => string 'yellow' (length=6)
```

---

## product_attribute.info — Attribute Info

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttribute/product_attribute.info.html>*

#### Module: Product Attributes API

##### Resource: product_attribute

###### Method:

- product_attribute.info (SOAP V1)
- catalogProductAttributeInfo (SOAP V2)

Allows you to get full information about a required attribute with the list of options.

**Arguments:**

| Type   | Name      | Description          |
|--------|-----------|----------------------|
| string | sessionId | Session ID           |
| string | attribute | Attribute code or ID |

**Return:**

| Type  | Name   | Description                            |
|-------|--------|----------------------------------------|
| array | result | Array of catalogProductAttributeEntity |

The **catalogProductAttributeEntity** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | attribute_id | Attribute ID |
| string | attribute_code | Attribute code |
| string | frontend_input | Attribute type |
| string | scope | Attribute scope |
| string | default_value | Attribute default value |
| int | is_unique | Defines whether the attribute is unique |
| int | is_required | Defines whether the attribute is required |
| ArrayOfString | apply_to | Apply to. Empty for "Apply to all" or array of the following possible values: 'simple', 'grouped', 'configurable', 'virtual', 'bundle', 'downloadable', 'giftcard' |
| int | is_configurable | Defines whether the attribute can be used for configurable products |
| int | is_searchable | Defines whether the attribute can be used in Quick Search |
| int | is_visible_in_advanced_search | Defines whether the attribute can be used in Advanced Search |
| int | is_comparable | Defines whether the attribute can be compared on the frontend |
| int | is_used_for_promo_rules | Defines whether the attribute can be used for promo rules |
| int | is_visible_on_front | Defines whether the attribute is visible on the frontend |
| int | used_in_product_listing | Defines whether the attribute can be used in product listing |
| associativeArray | additional_fields | Array of additional fields |
| array | options | Array of catalogAttributeOptionEntity |
| array | frontend_label | Array of catalogProductAttributeFrontendLabel |

The **catalogAttributeOptionEntity** content is as follows:

| Type   | Name  | Description |
|--------|-------|-------------|
| string | label | Text label  |
| string | value | Option ID   |

The **catalogProductAttributeFrontendLabelEntity** content is as follows:

| Type   | Name     | Description |
|--------|----------|-------------|
| string | store_id | Store ID    |
| string | label    | Text label  |

The **AdditionaFieldsEntity** array of additional fields for the **text** type is as follows:

| Type | Name | Description |
|----|----|----|
| string | frontend_class | Input Validation for Store Owner. Possible values: 'validate-number' (Decimal Number), 'validate-digits' (Integer Number), 'validate-email', 'validate-url', 'validate-alpha' (Letters), 'validate-alphanum' (Letters (a-z, A-Z), or Numbers (0-9)) |
| boolean | is_html_allowed_on_front | Defines whether the HTML tags are allowed on the frontend |
| boolean | used_for_sort_by | Defines whether it is used for sorting in product listing |

The **AdditionaFieldsEntity** array of additional fields for the **text area** type is as follows:

| Type | Name | Description |
|----|----|----|
| boolean | is_wysiwyg_enabled | Enable WYSIWYG flag |
| boolean | is_html_allowed_on_front | Defines whether the HTML tags are allowed on the frontend |

The **AdditionaFieldsEntity** array of additional fields for the **date** and **boolean** types is as follows:

| Type | Name | Description |
|----|----|----|
| boolean | used_for_sort_by | Defines whether it is used for sorting in product listing |

The **AdditionaFieldsEntity** array of additional fields for the **multiselect** type is as follows:

| Type | Name | Description |
|----|----|----|
| boolean | is_filterable | Defines whether it used in layered navigation |
| boolean | is_filterable_in_search | Defines whether it is used in search results layered navigation |
| int | position | Position |

The **AdditionaFieldsEntity** array of additional fields for the **select** and **price** types is as follows:

| Type | Name | Description |
|----|----|----|
| boolean | is_filterable | Defines whether it used in layered navigation |
| boolean | is_filterable_in_search | Defines whether it is used in search results layered navigation |
| int | position | Position |
| boolean | used_for_sort_by | Defines whether it is used for sorting in product listing |

**Faults:**

| Fault Code | Fault Message                  |
|------------|--------------------------------|
| 101        | Requested attribute not found. |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'product_attribute.info', '11');
var_dump ($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductAttributeInfo($sessionId, '11');
var_dump($result);
```
###### Response Example SOAP V1
```
array
  'attribute_id' => string '11' (length=3)
  'attribute_code' => string 'new_special_price' (length=17)
  'frontend_input' => string 'text' (length=4)
  'default_value' => null
  'is_unique' => string '0' (length=1)
  'is_required' => string '0' (length=1)
  'apply_to' =>
    array
      empty
  'is_configurable' => string '0' (length=1)
  'is_searchable' => string '0' (length=1)
  'is_visible_in_advanced_search' => string '0' (length=1)
  'is_comparable' => string '0' (length=1)
  'is_used_for_promo_rules' => string '0' (length=1)
  'is_visible_on_front' => string '0' (length=1)
  'used_in_product_listing' => string '0' (length=1)
  'frontend_label' =>
    array
      0 =>
        array
          'store_id' => int 0
          'label' => string 'special price' (length=13)
      1 =>
        array
          'store_id' => int 2
          'label' => string 'special price' (length=13)
  'scope' => string 'store' (length=5)
  'additional_fields' =>
    array
      'frontend_class' => null
      'is_html_allowed_on_front' => string '1' (length=1)
      'used_for_sort_by' => string '0' (length=1)
```

---

## product_attribute.create — Create Attribute

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttribute/product_attribute.create.html>*

#### Module: Product Attributes API

##### Resource: product_attribute

###### Method:

- product_attribute.create (SOAP V1)
- catalogProductAttributeCreate (SOAP V2)

Allows you to create a new product attribute.

**Arguments:**

| Type   | Name      | Description                                    |
|--------|-----------|------------------------------------------------|
| string | sessionId | Session ID                                     |
| array  | data      | Array of catalogProductAttributeEntityToCreate |

**Returns:**

| Type | Name   | Description                 |
|------|--------|-----------------------------|
| int  | result | ID of the created attribute |

The **catalogProductAttributeEntityToCreate** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | attribute_code | Attribute code |
| string | frontend_input | Attribute type |
| string | scope | Attribute scope. Possible values are as follows: 'store', 'website', or 'global' |
| string | default_value | Attribute default value |
| int | is_unique | Defines whether the attribute is unique |
| int | is_required | Defines whether the attribute is required |
| ArrayOfString | apply_to | Apply to. Empty for "Apply to all" or array of the following possible values: 'simple', 'grouped', 'configurable', 'virtual', 'bundle', 'downloadable', 'giftcard' |
| int | is_configurable | Defines whether the attribute can be used for configurable products |
| int | is_searchable | Defines whether the attribute can be used in Quick Search |
| int | is_visible_in_advanced_search | Defines whether the attribute can be used in Advanced Search |
| int | is_comparable | Defines whether the attribute can be compared on the frontend |
| int | is_used_for_promo_rules | Defines whether the attribute can be used for promo rules |
| int | is_visible_on_front | Defines whether the attribute is visible on the frontend |
| int | used_in_product_listing | Defines whether the attribute can be used in product listing |
| associativeArray | additional_fields | Array of additional fields |
| array | frontend_label | Array of catalogProductAttributeFrontendLabel |

The **catalogProductAttributeFrontendLabelEntity** content is as follows:

| Type   | Name     | Description |
|--------|----------|-------------|
| string | store_id | Store ID    |
| string | label    | Text label  |

**Notes**: The "label" value for the "store_id" value set to 0 must be specified. An attribute cannot be created without specifying the label for store_id=0.

The **AdditionaFieldsEntity** array of additional fields for the **text** type is as follows:

| Type | Name | Description |
|----|----|----|
| string | frontend_class | Input Validation for Store Owner. Possible values are as follows: 'validate-number' (Decimal Number), 'validate-digits' (Integer Number), 'validate-email', 'validate-url', 'validate-alpha' (Letters), 'validate-alphanum' (Letters (a-z, A-Z), or Numbers (0-9)) |
| boolean | is_html_allowed_on_front | Defines whether the HTML tags are allowed on the frontend |
| boolean | used_for_sort_by | Defines whether it is used for sorting in product listing |

The **AdditionaFieldsEntity** array of additional fields for the **text area** type is as follows:

| Type | Name | Description |
|----|----|----|
| boolean | is_wysiwyg_enabled | Enable WYSIWYG flag |
| boolean | is_html_allowed_on_front | Defines whether the HTML tags are allowed on the frontend |

The **AdditionaFieldsEntity** array of additional fields for the **date** and **boolean** types is as follows:

| Type | Name | Description |
|----|----|----|
| boolean | used_for_sort_by | Defines whether it is used for sorting in product listing |

The **AdditionaFieldsEntity** array of additional fields for the **multiselect** type is as follows:

| Type | Name | Description |
|----|----|----|
| boolean | is_filterable | Defines whether it is used in layered navigation |
| boolean | is_filterable_in_search | Defines whether it is used in search results layered navigation |
| int | position | Position |

The **AdditionaFieldsEntity** array of additional fields for the **select** and **price** types is as follows:

| Type | Name | Description |
|----|----|----|
| boolean | is_filterable | Defines whether it is used in layered navigation |
| boolean | is_filterable_in_search | Defines whether it is used in search results layered navigation |
| int | position | Position |
| boolean | used_for_sort_by | Defines whether it is used for sorting in product listing |

**Faults:**

| Fault Code | Fault Message |
|----|----|
| 102 | Invalid request parameters. |
| 103 | Attribute code is invalid. Please use only letters (a-z), numbers (0-9) or underscore (\_) in this field, first character should be a letter. |
| 104 | Incorrect attribute type. |
| 105 | Unable to save attribute. |

##### Examples

###### Request Example SOAP V1
```php
<?php

$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If some stuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$attributeToUpdate = array(
    "scope" => "global",
 "default_value" => "100",
    "frontend_input" => "text",
    "is_unique" => 0,
    "is_required" => 0,
    "is_configurable" => 0,
    "is_searchable" => 0,
    "is_visible_in_advanced_search" => 0,
    "used_in_product_listing" => 0,
    "additional_fields" => array(
        "is_filterable" => 1,
        "is_filterable_in_search" => 1,
        "position" => 1,
        "used_for_sort_by" => 1
    ),
    "frontend_label" => array(
        array(
            "store_id" => 0,
            "label" => "Updated attribute"
        )
    )
);

$attributeCode = 'code1';

$result = $client->call($session, 'product_attribute.update', array($attributeCode, $attributeToUpdate));
var_dump ($result);
 
// If you don't need the session anymore
//$client->endSession($session);

?>
```
###### Request Example SOAP V2
```php
<?php
//ini_set("soap.wsdl_cache_enabled", 0);

$client = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

//V2
$session = $client->login('apiUser', 'apiKey');

// V2 WS-I Mode
//$response = $client->login(array('username' => 'apiUser', 'apiKey' => 'apiKey'));
//$session = $response->result;

//v2

$data = array(
   "attribute_code" => "test_attribute",
   "frontend_input" => "text",
   "scope" => "1",
   "default_value" => "1",
   "is_unique" => 0,
   "is_required" => 0,
   "apply_to" => array("simple"),
   "is_configurable" => 0,
   "is_searchable" => 0,
   "is_visible_in_advanced_search" => 0,
   "is_comparable" => 0,
   "is_used_for_promo_rules" => 0,
   "is_visible_on_front" => 0,
   "used_in_product_listing" => 0,
   "additional_fields" => array(),
   "frontend_label" => array(array("store_id" => "0", "label" => "some label"))
  );

$orders = $client->catalogProductAttributeCreate($session, $data);

//V2 WSI
//WSDL WSI Sample is not complete
//$result = $client->catalogProductAttributeCreate(array("sessionId" => $session, "data" => $data));
//$orders = $result->result->complexObjectArray;

echo 'Number of results: ' . count($orders) . '<br/>';
var_dump ($orders);
?>
```

---

## product_attribute.update — Attribute Update

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttribute/product_attribute.update.html>*

#### Module: Product Attributes API

##### Resource: product_attribute

###### Method:

- product_attribute.update (SOAP V1)
- catalogProductAttributeUpdate (SOAP V2)

Allows you to update the required attribute.

**Arguments:**

| Type   | Name      | Description                                    |
|--------|-----------|------------------------------------------------|
| string | sessionId | Session ID                                     |
| string | attribute | Attribute code or ID                           |
| array  | data      | Array of catalogProductAttributeEntityToUpdate |

**Returns:**

| Type    | Description                      |
|---------|----------------------------------|
| boolean | True if the attribute is updated |

The **catalogProductAttributeEntityToUpdate** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | scope | Attribute scope. Possible values are as follows: 'store', 'website', or 'global' |
| string | default_value | Attribute default value |
| int | is_unique | Defines whether the attribute is unique |
| int | is_required | Defines whether the attribute is required |
| ArrayOfString | apply_to | Apply to. Empty for "Apply to all" or array of the following possible values: 'simple', 'grouped', 'configurable', 'virtual', 'bundle', 'downloadable', 'giftcard' |
| int | is_configurable | Defines whether the attribute can be used for configurable products |
| int | is_searchable | Defines whether the attribute can be used in Quick Search |
| int | is_visible_in_advanced_search | Defines whether the attribute can be used in Advanced Search |
| int | is_comparable | Defines whether the attribute can be compared on the frontend |
| int | is_used_for_promo_rules | Defines whether the attribute can be used for promo rules |
| int | is_visible_on_front | Defines whether the attribute can be visible on the frontend |
| int | used_in_product_listing | Defines whether the attribute can be used in product listing |
| associativeArray | additional_fields | Array of additional fields |
| array | frontend_label | Array of catalogProductAttributeFrontendLabel |

The **AdditionaFieldsEntity** array of additional fields for the **text** type is as follows:

| Type | Name | Description |
|----|----|----|
| string | frontend_class | Input Validation for Store Owner. Possible values: 'validate-number' (Decimal Number), 'validate-digits' (Integer Number), 'validate-email', 'validate-url', 'validate-alpha' (Letters), 'validate-alphanum' (Letters (a-z, A-Z), or Numbers (0-9)) |
| boolean | is_html_allowed_on_front | Defines whether the HTML tags are allowed on the frontend |
| boolean | used_for_sort_by | Defines whether it is used for sorting in product listing |

The **AdditionaFieldsEntity** array of additional fields for the **text area** type is as follows:

| Type | Name | Description |
|----|----|----|
| boolean | is_wysiwyg_enabled | Enable WYSIWYG flag |
| boolean | is_html_allowed_on_front | Defines whether the HTML tags are allowed on the frontend |

The **AdditionaFieldsEntity** array of additional fields for the **date** and **boolean** types is as follows:

| Type | Name | Description |
|----|----|----|
| boolean | used_for_sort_by | Defines whether it is used for sorting in product listing |

The **AdditionaFieldsEntity** array of additional fields for the **multiselect** type is as follows:

| Type | Name | Description |
|----|----|----|
| boolean | is_filterable | Defines whether it used in layered navigation |
| boolean | is_filterable_in_search | Defines whether it is used in search results layered navigation |
| integer | position | Position |

The **AdditionaFieldsEntity** array of additional fields for the **select** and **price** types is as follows:

| Type | Name | Description |
|----|----|----|
| boolean | is_filterable | Defines whether it used in layered navigation |
| boolean | is_filterable_in_search | Defines whether it is used in search results layered navigation |
| integer | position | Position |
| boolean | used_for_sort_by | Defines whether it is used for sorting in product listing |

The **catalogProductAttributeFrontendLabel** content is as follows:

| Type   | Name     | Description |
|--------|----------|-------------|
| string | store_id | Store ID    |
| string | label    | Text label  |

**Faults:**

| Fault Code | Fault Message                    |
|------------|----------------------------------|
| 101        | Requested attribute not found.   |
| 105        | Unable to save attribute.        |
| 107        | This attribute cannot be edited. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$attributeToUpdate = array(
    "scope" => "global",
    "is_unique" => 1,
    "is_required" => 1,
    "is_configurable" => 1,
    "is_searchable" => 1,
    "is_visible_in_advanced_search" => 0,
    "used_in_product_listing" => 0,
    "additional_fields" => array(
        "is_filterable" => 1,
        "is_filterable_in_search" => 0,
        "position" => 2,
        "used_for_sort_by" => 0
    ),
    "frontend_label" => array(
        array(
            "store_id" => 0,
            "label" => "A Test Attribute"
        )
    )
);

$result = $proxy->call(
    $sessionId,
    "product_attribute.update",
    array(
        $attributeToUpdate
    )
);
```
###### Request Example SOAP V2
```php
<?php
//ini_set("soap.wsdl_cache_enabled", 0);

$client = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

//V2
$session = $client->login('apiUser', 'apiKey');

// V2 WS-I Mode
//$response = $client->login(array('username' => 'apiUser', 'apiKey' => 'apiKey'));
//$session = $response->result;

//v2
$attributeCode = "code1";
$data = array(
   "frontend_input" => "text",
   "scope" => "1",
   "default_value" => "1",
   "is_unique" => 0,
   "is_required" => 0,
   "apply_to" => array("simple"),
   "is_configurable" => 0,
   "is_searchable" => 0,
   "is_visible_in_advanced_search" => 0,
   "is_comparable" => 0,
   "is_used_for_promo_rules" => 0,
   "is_visible_on_front" => 0,
   "used_in_product_listing" => 0,
   "additional_fields" => array(),
   "frontend_label" => array(array("store_id" => "0", "label" => "some random label updated"))
  );

$orders = $client->catalogProductAttributeUpdate($session, $attributeCode, $data); 

//V2 WSI
//WSDL WSI Sample is not complete
//$result = $client->catalogProductAttributeCreate(array("sessionId" => $session, "data" => $data));
//$orders = $result->result->complexObjectArray;

echo 'Number of results: ' . count($orders) . '<br/>';
var_dump ($orders);
?>
```

---

## product_attribute.remove — Attribute Remove

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttribute/product_attribute.remove.html>*

#### Module: Product Attributes API

##### Resource: product_attribute

###### Method:

- product_attribute.remove (SOAP V1)
- catalogProductAttributeRemove (SOAP V2)

Allows you to remove the required attribute from a product.

**Arguments:**

| Type   | Name      | Description          |
|--------|-----------|----------------------|
| string | sessionId | Session ID           |
| string | attribute | Attribute code or ID |

**Return:**

| Type    | Description                      |
|---------|----------------------------------|
| boolean | True if the attribute is removed |

**Faults:**

| Fault Code | Fault Message                     |
|------------|-----------------------------------|
| 101        | Requested attribute not found.    |
| 106        | This attribute cannot be deleted. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$attributeCode = "11";

$result = $proxy->call(
    $sessionId,
    "product_attribute.remove",
    array(
         $attributeCode
    )
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductAttributeRemove($sessionId, '11');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$client = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$session = $client->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $client->catalogProductAttributeRemove((object)array('sessionId' => $session->result, 'attribute' => '11'));

var_dump ($result);
```

---

## product_attribute.addOption — Add Option

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttribute/product_attribute.addOption.html>*

#### Module: Product Attributes API

##### Resource: product_attribute

###### Method:

- product_attribute.addOption (SOAP V1)
- catalogProductAttributeAddOption (SOAP V2)

Allows you to add a new option for attributes with selectable fields.

**Arguments:**

| Type   | Name      | Description                                       |
|--------|-----------|---------------------------------------------------|
| string | sessionId | Session ID                                        |
| string | attribute | Attribute code or ID                              |
| array  | data      | Array of catalogProductAttributeOptionEntityToAdd |

**Return:**

| Type    | Name   | Description     |
|---------|--------|-----------------|
| boolean | result | True on success |

The **catalogProductAttributeOptionEntityToAdd** content is as follows:

| Type  | Name       | Description                                 |
|-------|------------|---------------------------------------------|
| array | label      | Array of catalogProductAttributeOptionLabel |
| int   | order      | Option order                                |
| int   | is_default | Defines whether the option is a default one |

The **catalogProductAttributeOptionLabel** content is as follows:

| Type          | Name     | Description             |
|---------------|----------|-------------------------|
| ArrayOfString | store_id | Array of store view IDs |
| string        | value    | Text label              |

**Faults:**

| Fault Code | Fault Message                  |
|------------|--------------------------------|
| 101        | Requested attribute not found. |
| 104        | Incorrect attribute type.      |
| 108        | Unable to add option.          |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$attributeCode = "new_attribute";
$optionToAdd = array(
    "label" => array(
        array(
            "store_id" => 0,
            "value" => "New Option"
        )
    ),
    "order" => 0,
    "is_default" => 0
);

$result = $proxy->call(
    $sessionId,
    "product_attribute.addOption",
    array(
         $attributeCode,
         $optionToAdd
    )
);
```
###### Request Example SOAP V2
```php
<?php
$client = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

//V2
$session = $client->login('apiUser', 'apiKey');

// V2 WS-I Mode
//$response = $client->login(array('username' => 'apiUser', 'apiKey' => 'apiKey'));
//$session = $response->result;

$attributeCode = "new_attribute";

//v2

$label = array (
   array(
    "store_id" => array("0"),
    "value" => "some random data"
   )
  );

$data = array(
   "label" => $label,
   "order" => "10",
   "is_default" => "1"
  );

$orders = $client->catalogProductAttributeAddOption($session, $attributeCode, $data); 

//V2 WSI
//WSDL WSI does not describe this method
//$result = $client->catalogProductAttributeAddOption(...);
//$orders = $result->result->complexObjectArray;

var_dump ($orders);
?>
```

---

## product_attribute.removeOption — Remove Option

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttribute/product_attribute.removeOption.html>*

#### Module: Product Attributes API

##### Resource: product_attribute

###### Method:

- product_attribute.removeOption (SOAP V1)
- catalogProductAttributeRemoveOption (SOAP V2)

Allows you to remove the option for an attribute.

**Arguments:**

| Type   | Name      | Description          |
|--------|-----------|----------------------|
| string | sessionId | Session ID           |
| string | attribute | Attribute code or ID |
| string | optionId  | Option ID            |

**Return:**

| Type    | Description                   |
|---------|-------------------------------|
| boolean | True if the option is removed |

**Faults:**

| Fault Code | Fault Message                  |
|------------|--------------------------------|
| 101        | Requested attribute not found. |
| 104        | Incorrect attribute type.      |
| 109        | Unable to remove option.       |

##### Examples

###### Request example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$attributeCode = "2";
$optionId = 11; // Existing option ID

$result = $proxy->call(
    $sessionId,
    "product_attribute.removeOption",
    array(
         $attributeCode,
         $optionId
    )
);
```
###### Request example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductAttributeRemoveOption($sessionId, '2', '11');
var_dump($result);
```

---

## Catalog Product Attribute Set

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttributeSet/productAttributeSet.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### Product Attribute Sets

Allows you to retrieve product attribute sets.

**Resource Name**: catalog_product_attribute_set

**Aliases**:

- product_attribute_set

**Methods**:

- [product_attribute_set.list](product_attribute_set.list.html "product_attribute_set.list") - Retrieve the list of product attribute sets
- [product_attribute_set.attributeAdd](product_attribute_set.attributeAdd.html "product_attribute_set.attributeAdd") - Add an attribute to the attribute set
- [product_attribute_set.attributeRemove](product_attribute_set.attributeRemove.html "product_attribute_set.attributeRemove") - Remove an attribute from an attribute set
- [product_attribute_set.create](product_attribute_set.create.html "product_attribute_set.create") - Create a new attribute set
- [product_attribute_set.groupAdd](product_attribute_set.groupAdd.html "product_attribute_set.groupAdd") - Add a new group for attributes in the attribute set
- [product_attribute_set.groupRemove](product_attribute_set.groupRemove.html "product_attribute_set.groupRemove") - Remove a group of attributes from an attribute set
- [product_attribute_set.groupRename](product_attribute_set.groupRename.html "product_attribute_set.groupRename") - Rename a group of attributes in an attribute set
- [product_attribute_set.remove](product_attribute_set.remove.html "product_attribute_set.remove") - Remove an attribute set

###### Faults:

| Fault Code | Fault Message |
|----|----|
| 100 | Attribute set with requested id does not exist. |
| 101 | Invalid data given. |
| 102 | Error while creating attribute set. Details in error message. |
| 103 | Error while removing attribute set. Details in error message. |
| 104 | Attribute set with requested id does not exist. |
| 105 | Unable to remove attribute set as it has related goods. Use forceProductsRemove parameter to remove attribute set with all goods. |
| 106 | Attribute with requested id does not exist. |
| 107 | Error while adding attribute to attribute set. Details in error message. |
| 108 | Attribute group with requested id does not exist. |
| 109 | Requested attribute is already in requested attribute set. |
| 110 | Error while removing attribute from attribute set. Details in error message. |
| 111 | Requested attribute is not in requested attribute set. |
| 112 | Requested group exist already in requested attribute set. |
| 113 | Error while adding group to attribute set. Details in error message. |
| 114 | Error while renaming group. Details in error message. |
| 115 | Error while removing group from attribute set. Details in error message. |
| 116 | Group can not be removed as it contains system attributes. |
| 117 | Group can not be removed as it contains attributes, used in configurable products. |

###### Example:
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

echo "<pre>";
// create new set
$setName = "New Test Set";
$skeletonId = 4;

$setId = $proxy->call(
    $sessionId,
    "product_attribute_set.create",
    array(
         $setName,
         $skeletonId
    )
);

// Get list
$setList = $proxy->call(
    $sessionId,
    "product_attribute_set.list"
);
echo "Set list:\n";
print_r($setList);

// create group
$groupName = "Test Group";
$groupId = $proxy->call(
    $sessionId,
    "product_attribute_set.groupAdd",
    array(
         $setId,
         $groupName
    )
);

// rename group
$newGroupName = "New Test Group";
$result = $proxy->call(
    $sessionId,
    "product_attribute_set.groupRename",
    array(
         $groupId,
         $newGroupName
    )
);

// add attribute
$attributeId = 83;
$result = $proxy->call(
    $sessionId,
    "product_attribute_set.attributeAdd",
    array(
         $attributeId,
         $setId
    )
);

//remove attribute
$result = $proxy->call(
    $sessionId,
    "product_attribute_set.attributeRemove",
    array(
         $attributeId,
         $setId
    )
);

// remove group
$result = $proxy->call(
    $sessionId,
    "product_attribute_set.groupRemove",
    array(
         $groupId
    )
);

// remove set
$result = $proxy->call(
    $sessionId,
    "product_attribute_set.remove",
    array(
         $setId
    )
);
```

---

## product_attribute_set.list — Attribute Set List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttributeSet/product_attribute_set.list.html>*

### Module:Mage_Catalog

##### Resource:catalog_product_attribute_set

**Aliases:**

- product_attribute_set

###### Method:

- catalog_product_attribute_set.list (SOAP V1)
- catalogProductAttributeSetList (SOAP V2)

Allows you to retrieve the list of product attribute sets.

**Aliases:**

- product_attribute_set.list

**Arguments:**

| Type   | Name      | Description |
|--------|-----------|-------------|
| string | sessionId | Session ID  |

**Returns**:

| Type  | Name   | Description                               |
|-------|--------|-------------------------------------------|
| array | result | Array of catalogProductAttributeSetEntity |

The **catalogProductAttributeSetEntity** content is as follows:

| Type   | Name   | Description             |
|--------|--------|-------------------------|
| int    | set_id | ID of the attribute set |
| string | name   | Attribute set name      |

**Faults:**

*No faults.*

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_product_attribute_set.list');
var_dump ($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductAttributeSetList($sessionId);
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductAttributeSetList((object)array('sessionId' => $sessionId->result));
var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'set_id' => string '4' (length=1)
      'name' => string 'Default' (length=7)
  1 =>
    array
      'set_id' => string '9' (length=1)
      'name' => string 'products_set' (length=12)
```

---

## product_attribute_set.create — Attribute Set Create

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttributeSet/product_attribute_set.create.html>*

#### Module: Product Attribute Set API

##### Resource: product_attribute_set

###### Method:

- product_attribute_set.create (SOAP V1)
- catalogProductAttributeSetCreate (SOAP V2)

Allows you to create a new attribute set based on another attribute set.

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| string | attributeSetName | Attribute set name |
| string | skeletonSetId | Attribute set ID basing on which the new attribute set will be created |

**Return:**

| Type | Name  | Description                     |
|------|-------|---------------------------------|
| int  | setId | ID of the created attribute set |

**Faults:**

| Fault Code | Fault Message                                                 |
|------------|---------------------------------------------------------------|
| 100        | Attribute set with requested id does not exist.               |
| 101        | Invalid data given.                                           |
| 102        | Error while creating attribute set. Details in error message. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$setName = "New Attribute Set";
$skeletonId = 4;

$newSetId = $proxy->call(
    $sessionId,
    "product_attribute_set.create",
    array(
         $setName,
         $skeletonId
    )
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$attributeSetName = 'New Attribute Set';
$skeletonId = 4;

$result = $client->catalogProductAttributeSetCreate(
    $sessionId,
    $attributeSetName,
    $skeletonId
);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductAttributeSetCreate((object)array('sessionId' => $sessionId->result, 'attributeSetName' => 'New Attribute Set', 'skeletonSetId' => '4'));
var_dump($result->result);
```

---

## product_attribute_set.remove — Attribute Set Remove

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttributeSet/product_attribute_set.remove.html>*

#### Module: Product Attribute Set API

##### Resource: product_attribute_set

###### Method:

- product_attribute_set.remove (SOAP V1)
- catalogProductAttributeSetRemove (SOAP V2)

Allows you to remove an existing attribute set.

**Arguments:**

| Type   | Name                | Description                          |
|--------|---------------------|--------------------------------------|
| string | sessionId           | Session ID                           |
| string | attributeSetId      | Attribute set ID                     |
| string | forceProductsRemove | Force product remove flag (optional) |

**Return:**

| Type        | Name      | Description                              |
|-------------|-----------|------------------------------------------|
| boolean\int | isRemoved | True (1) if the attribute set is removed |

**Faults:**

| Fault Code | Fault Message |
|----|----|
| 103 | Error while removing attribute set. Details in error message. |
| 104 | Attribute set with requested id does not exist. |
| 105 | Unable to remove attribute set as it has related goods. Use forceProductsRemove parameter to remove attribute set with all goods. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$setId = 5;

$result = $proxy->call(
    $sessionId,
    "product_attribute_set.remove",
    array(
         $setId
    )
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductAttributeSetRemove($sessionId, '5');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductAttributeSetRemove((object)array('sessionId' => $sessionId->result, 'attributeSetId' => '5'));
var_dump($result->result);
```

---

## product_attribute_set.attributeAdd — Attribute Set Add

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttributeSet/product_attribute_set.attributeAdd.html>*

#### Module: Product Attribute Set API

##### Resource: product_attribute_set

###### Method:

- product_attribute_set.attributeAdd (SOAP V1)
- catalogProductAttributeSetAttributeAdd (SOAP V2)

Allows you to add an existing attribute to an attribute set.

**Arguments:**

| Type   | Name             | Description           |
|--------|------------------|-----------------------|
| string | sessionId        | Session ID            |
| string | attributeId      | Attribute ID          |
| string | attributeSetId   | Attribute set ID      |
| string | attributeGroupId | Group ID (optional)   |
| string | sortOrder        | Sort order (optional) |

**Note**: If the *attributeGroupId* parameter is not passed, the attribute is added to the *General* group by default.

**Returns:**

| Type    | Name    | Description                                        |
|---------|---------|----------------------------------------------------|
| boolean | isAdded | True if the attribute is added to an attribute set |

**Faults:**

| Fault Code | Fault Message |
|----|----|
| 104 | Attribute set with requested id does not exist. |
| 106 | Attribute with requested id does not exist. |
| 107 | Error while adding attribute to attribute set. Details in error message. |
| 108 | Attribute group with requested id does not exist. |
| 109 | Requested attribute is already in requested attribute set. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$setId = 5;
$attributeId = 83;

$result = $proxy->call(
    $sessionId,
    "product_attribute_set.attributeAdd",
    array(
         $attributeId,
         $setId
    )
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$setId = 5;
$attributeId = 83;

$result = $proxy->catalogProductAttributeSetAttributeAdd(
    $sessionId,
    $attributeId,
    $setId
);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductAttributeSetAttributeAdd((object)array('sessionId' => $sessionId->result, 'attributeId' => '5', 'attributeSetId' => '83'));
var_dump($result->result);
```

---

## product_attribute_set.attributeRemove — Attribute Remove

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttributeSet/product_attribute_set.attributeRemove.html>*

#### Module: Product Attribute Set API

##### Resource: product_attribute_set

###### Method:

- product_attribute_set.attributeRemove (SOAP V1)
- catalogProductAttributeSetAttributeRemove (SOAP V2)

Allows you to remove an existing attribute from an attribute set.

**Arguments:**

| Type   | Name           | Description      |
|--------|----------------|------------------|
| string | sessionId      | Session ID       |
| string | attributeId    | Attribute ID     |
| string | attributeSetId | Attribute set ID |

**Returns:**

| Type    | Name      | Description                                            |
|---------|-----------|--------------------------------------------------------|
| boolean | isRemoved | True if the attribute is removed from an attribute set |

**Faults:**

| Fault Code | Fault Message |
|----|----|
| 104 | Attribute set with requested id does not exist. |
| 106 | Attribute with requested id does not exist. |
| 110 | Error while removing attribute from attribute set. Details in error message. |
| 111 | Requested attribute is not in requested attribute set. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$setId = 5;
$attributeId = 83;

$result = $proxy->call(
    $sessionId,
    "product_attribute_set.attributeRemove",
    array(
         $attributeId,
         $setId
    )
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductAttributeSetAttributeRemove($sessionId, '5', '83');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductAttributeSetAttributeRemove((object)array('sessionId' => $sessionId->result, 'attributeId' => '5', 'attributeSetId' => '83'));
var_dump($result->result);
```

---

## product_attribute_set.groupAdd — Attribute Set Group Add

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttributeSet/product_attribute_set.groupAdd.html>*

#### Module: Product Attribute Set API

##### Resource: product_attribute_set

###### Method:

- product_attribute_set.groupAdd (SOAP V1)
- catalogProductAttributeSetGroupAdd (SOAP V2)

Allows you to add a new group for attributes to the attribute set.

**Arguments:**

| Type   | Name           | Description      |
|--------|----------------|------------------|
| string | sessionId      | Session ID       |
| string | attributeSetId | Attribute set ID |
| string | groupName      | Group name       |

**Return:**

| Type | Name   | Description             |
|------|--------|-------------------------|
| int  | result | ID of the created group |

**Faults:**

| Fault Code | Fault Message |
|----|----|
| 112 | Requested group exist already in requested attribute set. |
| 113 | Error while adding group to attribute set. Details in error message. |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'product_attribute_set.groupAdd', array('attributeSetId' => '9', 'groupName' => 'new_group'));
var_dump ($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductAttributeSetGroupAdd($sessionId, '9', 'new_group');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://maentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductAttributeSetGroupAdd((object)array('sessionId' => $sessionId->result, 'attributeSetId' => '9', 'groupName' => 'new_group'));
var_dump($result->result);
```

---

## product_attribute_set.groupRemove — Attribute Set Group Remove

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttributeSet/product_attribute_set.groupRemove.html>*

#### Module: Product Attribute Set API

##### Resource: product_attribute_set

###### Method:

- product_attribute_set.groupRemove (SOAP V1)
- catalogProductAttributeSetGroupRemove (SOAP V2)

Allows you to remove a group from an attribute set.

**Arguments:**

| Type   | Name             | Description |
|--------|------------------|-------------|
| string | sessionId        | Session ID  |
| string | attributeGroupId | Group ID    |

**Return:**

| Type        | Description                      |
|-------------|----------------------------------|
| boolean\int | True (1) if the group is removed |

**Faults:**

| Fault Code | Fault Message |
|----|----|
| 108 | Attribute group with requested id does not exist. |
| 115 | Error while removing group from attribute set. Details in error message. |
| 116 | Group can not be removed as it contains system attributes. |
| 117 | Group can not be removed as it contains attributes, used in configurable products. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$groupId = 70;

$result = $proxy->call(
    $sessionId,
    "product_attribute_set.groupRemove",
    array(
         $groupId
    )
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductAttributeSetGroupRemove($sessionId, '70');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductAttributeSetGroupRemove((object)array('sessionId' => $sessionId->result, 'attributeGroupId' => '70'));
var_dump($result->result);
```

---

## product_attribute_set.groupRename — Attribute Set Group Rename

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductAttributeSet/product_attribute_set.groupRename.html>*

#### Module: Product Attribute Set API

##### Resource: product_attribute_set

###### Method:

- product_attribute_set.groupRename (SOAP V1)
- catalogProductAttributeSetGroupRename (SOAP V2)

Allows you to rename a group in the attribute set.

**Arguments:**

| Type   | Name      | Description                          |
|--------|-----------|--------------------------------------|
| string | sessionId | Session ID                           |
| string | groupId   | ID of the group that will be renamed |
| string | groupName | New name for the group               |

**Return:**

| Type        | Description                      |
|-------------|----------------------------------|
| boolean\int | True (1) if the group is renamed |

**Faults:**

| Fault Code | Fault Message                                         |
|------------|-------------------------------------------------------|
| 108        | Attribute group with requested id does not exist.     |
| 114        | Error while renaming group. Details in error message. |

##### Examples

###### Request Example SOAP V1
```php
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$groupId = 100;
$groupName = "New Group";

echo "Renaming group...";
$result = $proxy->call(
    $sessionId,
    "product_attribute_set.groupRename",
    array(
         $groupId,
         $groupName
    )
);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductAttributeSetGroupRename($sessionId, '100', 'New Group');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductAttributeSetGroupRename((object)array('sessionId' => $sessionId->result, 'groupId' => '100', 'groupName' => 'New Group'));
var_dump($result->result);
```

---

## Catalog Product Types

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductTypes/productTypes.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### Product types

Allows you to retrieve product types.

**Resource Name**: catalog_product_type

**Aliases**:

- product_type

**Methods**:

- [catalog_product_type.list](catalog_product_type.list.html "catalog_product_type.list") - Retrieve the list of product types

##### Examples

###### Example 1. Retrieving the product types
```
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');
$types = $proxy->call($sessionId, 'product_type.list');

var_dump($types);
```

---

## catalog_product_type.list — Product Type List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogProductTypes/catalog_product_type.list.html>*

### Module: Mage_Catalog

##### Resource: catalog_product_type

**Aliases:**

- product_type

###### Method:

- catalog_product_type.list (SOAP V1)
- catalogProductTypeList (SOAP V2)

Allows you to retrieve the list of product types.

**Aliases:**

- product_type.list

**Arguments:**

| Type   | Name      | Description |
|--------|-----------|-------------|
| string | sessionId | Session ID  |

**Returns**:

| Type  | Name   | Description                       |
|-------|--------|-----------------------------------|
| array | result | Array of catalogProductTypeEntity |

The **catalogProductTypeEntity** content is as follows:

| Type   | Name  | Description                      |
|--------|-------|----------------------------------|
| string | type  | Product type                     |
| string | label | Product label in the Admin Panel |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_product_type.list');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogProductTypeList($sessionId);
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogProductTypeList((object)array('sessionId' => $sessionId->result));
var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'type' => string 'simple' (length=6)
      'label' => string 'Simple Product' (length=14)
  1 =>
    array
      'type' => string 'grouped' (length=7)
      'label' => string 'Grouped Product' (length=15)
  2 =>
    array
      'type' => string 'configurable' (length=12)
      'label' => string 'Configurable Product' (length=20)
  3 =>
    array
      'type' => string 'virtual' (length=7)
      'label' => string 'Virtual Product' (length=15)
  4 =>
    array
      'type' => string 'bundle' (length=6)
      'label' => string 'Bundle Product' (length=14)
  5 =>
    array
      'type' => string 'downloadable' (length=12)
      'label' => string 'Downloadable Product' (length=20)
```

---
