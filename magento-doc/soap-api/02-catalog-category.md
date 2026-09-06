# SOAP API — Catalog Category & Category Attributes

> Category tree/level/move operations, category CRUD, product assignment and category attributes.

---

## Catalog

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalog.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### Category

Allows you to manage categories and how products are assigned to categories.

**Resource Name**: catalog_category

**Aliases**:

- category

**Methods**:

- [catalog_category.currentStore](catalogCategory/catalog_category.currentStore.html "catalog_category.currentStore") - Set/Get the current store view
- [catalog_category.tree](catalogCategory/catalog_category.tree.html "catalog_category.tree") - Retrieve the hierarchical category tree
- [catalog_category.level](catalogCategory/catalog_category.level.html "catalog_category.level") - Retrieve one level of categories by a website, store view, or parent category
- [catalog_category.info](catalogCategory/catalog_category.info.html "catalog_category.info") - Retrieve the category data
- [catalog_category.create](catalogCategory/catalog_category.create.html "catalog_category.create") - Create a new category
- [catalog_category.update](catalogCategory/catalog_category.update.html "catalog_category.update") - Update a category
- [catalog_category.move](catalogCategory/catalog_category.move.html "catalog_category.move") - Move a category in its tree
- [catalog_category.delete](catalogCategory/catalog_category.delete.html "catalog_category.delete") - Delete a category
- [catalog_category.assignedProducts](catalogCategory/catalog_category.assignedProducts.html "catalog_category.assignedProducts") - Retrieve a list of products assigned to a category
- [catalog_category.assignProduct](catalogCategory/catalog_category.assignProduct.html "catalog_category.assignProduct") - Assign product to a category
- [catalog_category.updateProduct](catalogCategory/catalog_category.updateProduct.html "catalog_category.updateProduct") - Update an assigned product
- [catalog_category.removeProduct](catalogCategory/catalog_category.removeProduct.html "catalog_category.removeProduct") - Remove a product assignment

##### Category Attributes

Allows you to retrieve the list of category attributes and options.

**Resource Name**: catalog_category_attribute

**Aliases**:

- category_attribute

**Methods**:

- [catalog_category_attribute.currentStore](catalogCategoryAttributes/catalog_category_attribute.currentStore.html "catalog_category_attribute.currentStore") - Set/Get the current store view
- [catalog_category_attribute.list](catalogCategoryAttributes/catalog_category_attribute.list.html "catalog_category_attribute.list") - Retrieve the category attributes
- [catalog_category_attribute.options](catalogCategoryAttributes/catalog_category_attribute.options.html "catalog_category_attribute.options") - Retrieve the attribute options

##### Product

Allows you to manage products.

**Resource Name**: catalog_product

**Aliases**:

- product

**Methods**:

- [catalog_product.currentStore](catalogProduct/catalog_product.currentStore.html "catalog_product.currentStore") - Set/Get the current store view
- [catalog_product.list](catalogProduct/catalog_product.list.html "catalog_product.list") - Retrieve the list of products using filters
- [catalog_product.info](catalogProduct/catalog_product.info.html "catalog_product.info") - Retrieve information about the required product
- [catalog_product.create](catalogProduct/catalog_product.create.html "catalog_product.create") - Create a new product
- [catalog_product.update](catalogProduct/catalog_product.update.html "catalog_product.update") - Update a required product
- [catalog_product.setSpecialPrice](catalogProduct/catalog_product.setSpecialPrice.html "catalog_product.setSpecialPrice") - Set special price for a product
- [catalog_product.getSpecialPrice](catalogProduct/catalog_product.getSpecialPrice.html "catalog_product.getSpecialPrice") - Get special price for a product
- [catalog_product.delete](catalogProduct/catalog_product.delete.html "catalog_product.delete") - Delete a required product
- [catalog_product.listOfAdditionalAttributes](catalogProduct/catalog_product.listOfAdditionalAttributes.html "catalog_product.listOfAdditionalAttributes") - Get the list of additional attributes

##### Product Attributes

Allows you to retrieve product attributes and options.

**Resource Name**: catalog_product_attribute

**Aliases**:

- product_attribute

**Methods**:

- [product_attribute.currentStore](catalogProductAttribute/product_attribute.currentStore.html "product_attribute.currentStore") - Set/Get the current store view
- [product_attribute.list](catalogProductAttribute/product_attribute.list.html "product_attribute.list") - Retrieve the attribute list
- [product_attribute.options](catalogProductAttribute/product_attribute.options.html "product_attribute.options") - Retrieve the attribute options
- [product_attribute.addOption](catalogProductAttribute/product_attribute.addOption.html "product_attribute.addOption") - Add a new option for attributes with selectable fields
- [product_attribute.create](catalogProductAttribute/product_attribute.create.html "product_attribute.create") - Create a new attribute
- [product_attribute.info](catalogProductAttribute/product_attribute.info.html "product_attribute.info") - Get full information about an attribute with the list of options
- [product_attribute.remove](catalogProductAttribute/product_attribute.remove.html "product_attribute.remove") - Remove the required attribute
- [product_attribute.removeOption](catalogProductAttribute/product_attribute.removeOption.html "product_attribute.removeOption") - Remove an option for attributes with selectable fields
- [product_attribute.types](catalogProductAttribute/product_attribute.types.html "product_attribute.types") - Get the list of possible attribute types
- [product_attribute.update](catalogProductAttribute/product_attribute.update.html "product_attribute.update") - Update the required attribute

##### Product Attribute Sets

Allows you to retrieve product attribute sets.

**Resource Name**: catalog_product_attribute_set

**Aliases**:

- product_attribute_set

**Methods**:

- [product_attribute_set.list](catalogProductAttributeSet/product_attribute_set.list.html "product_attribute_set.list") - Retrieve the list of product attribute sets
- [product_attribute_set.attributeAdd](catalogProductAttributeSet/product_attribute_set.attributeAdd.html "product_attribute_set.attributeAdd") - Add an attribute to the attribute set
- [product_attribute_set.attributeRemove](catalogProductAttributeSet/product_attribute_set.attributeRemove.html "product_attribute_set.attributeRemove") - Remove an attribute from an attribute set
- [product_attribute_set.create](catalogProductAttributeSet/product_attribute_set.create.html "product_attribute_set.create") - Create a new attribute set
- [product_attribute_set.groupAdd](catalogProductAttributeSet/product_attribute_set.groupAdd.html "product_attribute_set.groupAdd") - Add a new group for attributes in the attribute set
- [product_attribute_set.groupRemove](catalogProductAttributeSet/product_attribute_set.groupRemove.html "product_attribute_set.groupRemove") - Remove a group of attributes from an attribute set
- [product_attribute_set.groupRename](catalogProductAttributeSet/product_attribute_set.groupRename.html "product_attribute_set.groupRename") - Rename a group of attributes in an attribute set
- [product_attribute_set.remove](catalogProductAttributeSet/product_attribute_set.remove.html "product_attribute_set.remove") - Remove an attribute set

##### Product Types

Allows you to retrieve product types.

**Resource Name**: catalog_product_type

**Aliases**:

- product_type

**Methods**:

- [catalog_product_type.list](catalogProductTypes/catalog_product_type.list.html "catalog_product_type.list") - Retrieve the list of product types

##### Product Images

Allows you to manage product images.

**Resource Name**: catalog_product_attribute_media

**Aliases**:

- product_attribute_media
- product_media

**Methods**:

- [catalog_product_attribute_media.currentStore](catalogProductAttributeMedia/catalog_product_attribute_media.currentStore.html "catalog_product_attribute_media.currentStore") - Set/Get the current store view
- [catalog_product_attribute_media.list](catalogProductAttributeMedia/catalog_product_attribute_media.list.html "catalog_product_attribute_media.list") - Retrieve the product images
- [catalog_product_attribute_media.info](catalogProductAttributeMedia/catalog_product_attribute_media.info.html "catalog_product_attribute_media.info") - Retrieve the specified product image
- [catalog_product_attribute_media.types](catalogProductAttributeMedia/catalog_product_attribute_media.types.html "catalog_product_attribute_media.types") - Retrieve product image types
- [catalog_product_attribute_media.create](catalogProductAttributeMedia/catalog_product_attribute_media.create.html "catalog_product_attribute_media.create") - Upload a new image for a product
- [catalog_product_attribute_media.update](catalogProductAttributeMedia/catalog_product_attribute_media.update.html "catalog_product_attribute_media.update") - Update an image for a product
- [catalog_product_attribute_media.remove](catalogProductAttributeMedia/catalog_product_attribute_media.remove.html "catalog_product_attribute_media.remove") - Remove an image for a product

##### Product Tier Price

Allows you to retrieve and update product tier prices.

**Resource Name**: catalog_product_attribute_tier_price

**Aliases**:

- product_attribute_tier_price
- product_tier_price

**Methods**:

- [catalog_product_attribute_tier_price.info](catalogProductTierPrice/catalog_product_attribute_tier_price.info.html "catalog_product_attribute_tier_price.info") - Retrieve information about product tier prices
- [catalog_product_attribute_tier_price.update](catalogProductTierPrice/catalog_product_attribute_tier_price.update.html "catalog_product_attribute_tier_price.update") - Update the product tier prices

##### Product Links

Allows you to manage links for products, including related, cross-sells, up-sells, and grouped.

**Resource Name**: catalog_product_link

**Aliases**:

- product_link

**Methods**:

- [catalog_product_link.list](catalogProductLink/catalog_product_link.list.html "catalog_product_link.list") - Retrieve products linked to the specified product
- [catalog_product_link.assign](catalogProductLink/catalog_product_link.assign.html "catalog_product_link.assign") - Link a product to another product
- [catalog_product_link.update](catalogProductLink/catalog_product_link.update.html "catalog_product_link.update") - Update a product link
- [catalog_product_link.remove](catalogProductLink/catalog_product_link.remove.html "catalog_product_link.remove") - Remove a product link
- [catalog_product_link.types](catalogProductLink/catalog_product_link.types.html "catalog_product_link.types") - Retrieve product link types
- [catalog_product_link.attributes](catalogProductLink/catalog_product_link.attributes.html "catalog_product_link.attributes") - Retrieve product link type attributes

##### Product Downloadable Link

Allows you to add, remove, and retrieve a link to a downloadable product.

**Resource Name**: product_downloadable_link

###### Methods:

- [product_downloadable_link.add](catalogProductDownloadableLink/product_downloadable_link.add.html "product_downloadable_link.add") - Add a new link to the downloadable product
- [product_downloadable_link.list](catalogProductDownloadableLink/product_downloadable_link.list.html "product_downloadable_link.list") - Get the list of links for a downloadable product
- [product_downloadable_link.remove](catalogProductDownloadableLink/product_downloadable_link.remove.html "product_downloadable_link.remove") - Remove a link from a downloadable product

##### Product Tag

Allows you to add, update, remove, and retrieve product tags.

**Resource Name**: catalog_product_tag

**Aliases**:

- product_tag

###### Methods:

- [product_tag.add](catalogProductTag/product_tag.add.html "product_tag.add") - Retrieve the list of tags by the product ID
- [product_tag.info](catalogProductTag/product_tag.info.html "product_tag.info") - Retrieve information about a product tag
- [product_tag.add](catalogProductTag/product_tag.add.html "product_tag.add") - Add one or more tags to a product
- [product_tag.update](catalogProductTag/product_tag.update.html "product_tag.update") - Update an existing product tag
- [product_tag.remove](catalogProductTag/product_tag.remove.html "product_tag.remove") - Remove a product tag

##### Product Custom Option

Allows you to manage product custom options, including adding, updating, removing, and retrieving information.

**Resource Name**: catalog_product_custom_option

**Aliases**:

- product_custom_option

###### Methods:

- [product_custom_option.add](catalogProductCustomOption/product_custom_option.add.html "product_custom_option.add") - Add a new custom option to a product
- [product_custom_option.update](catalogProductCustomOption/product_custom_option.update.html "product_custom_option.update") - Update the product custom option
- [product_custom_option.types](catalogProductCustomOption/product_custom_option.types.html "product_custom_option.types") - Get the list of available custom option types
- [product_custom_option.list](catalogProductCustomOption/product_custom_option.list.html "product_custom_option.list") - Retrieve the list of product custom options
- [product_custom_option.info](catalogProductCustomOption/product_custom_option.info.html "product_custom_option.info") - Get full information about the custom option in a product
- [product_custom_option.remove](catalogProductCustomOption/product_custom_option.remove.html "product_custom_option.remove") - Remove the custom option

##### Product Custom Option Value

Allows you to manage product custom option values, including adding, updating, removing, and retrieving information.

**Resource Name**: catalog_product_custom_option_value

**Aliases**:

- product_custom_option_value

###### Methods:

- [product_custom_option_value.add](catalogProductCustomOptionValue/product_custom_option_value.add.html "product_custom_option_value.add") - Add a new custom option value to a selectable custom option
- [product_custom_option_value.list](catalogProductCustomOptionValue/product_custom_option_value.list.html "product_custom_option_value.list") - Retrieve the list of product custom option values
- [product_custom_option_value.info](catalogProductCustomOptionValue/product_custom_option_value.info.html "product_custom_option_value.info") - Retrieve full information about the specified product custom option value
- [product_custom_option_value.update](catalogProductCustomOptionValue/product_custom_option_value.update.html "product_custom_option_value.update") - Update the custom option value
- [product_custom_option_value.remove](catalogProductCustomOptionValue/product_custom_option_value.remove.html "product_custom_option_value.remove") - Remove the custom option value

---

## Catalog Category

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogCategory/catalogCategory.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### Category

Allows you to manage categories and how products are assigned to categories.

**Resource Name**: catalog_category

**Aliases**:

- category

**Methods**:

- [catalog_category.currentStore](catalog_category.currentStore.html "catalog_category.currentStore") - Set/Get the current store view
- [catalog_category.tree](catalog_category.tree.html "catalog_category.tree") - Retrieve the hierarchical category tree
- [catalog_category.level](catalog_category.level.html "catalog_category.level") - Retrieve one level of categories by a website, store view, or parent category
- [catalog_category.info](catalog_category.info.html "catalog_category.info") - Retrieve the category data
- [catalog_category.create](catalog_category.create.html "catalog_category.create") - Create a new category
- [catalog_category.update](catalog_category.update.html "catalog_category.update") - Update a category
- [catalog_category.move](catalog_category.move.html "catalog_category.move") - Move a category in its tree
- [catalog_category.delete](catalog_category.delete.html "catalog_category.delete") - Delete a category
- [catalog_category.assignedProducts](catalog_category.assignedProducts.html "catalog_category.assignedProducts") - Retrieve a list of products assigned to a category
- [catalog_category.assignProduct](catalog_category.assignProduct.html "catalog_category.assignProduct") - Assign product to a category
- [catalog_category.updateProduct](catalog_category.updateProduct.html "catalog_category.updateProduct") - Update an assigned product
- [catalog_category.removeProduct](catalog_category.removeProduct.html "catalog_category.removeProduct") - Remove a product assignment

##### Faults

| Fault Code | Fault Message                                   |
|------------|-------------------------------------------------|
| 100        | Requested store view not found.                 |
| 101        | Requested website not found.                    |
| 102        | Category not exists.                            |
| 103        | Invalid data given. Details in error message.   |
| 104        | Category not moved. Details in error message.   |
| 105        | Category not deleted. Details in error message. |
| 106        | Requested product is not assigned to category.  |

##### Example 1. Working with categories
```
function getSomeRandomCategory(&$categories, $targetLevel, $currentLevel = 0) {
    if (count($categories)==0) {
        return false;
    }
    if ($targetLevel == $currentLevel) {
        return $categories[array_rand($categories)];
    } else {
        return getSomeRandomCategory($categories[array_rand($categories)]['children'], $targetLevel + 1);
    }
}

$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');
$allCategories = $proxy->call($sessionId, 'category.tree'); // Get all categories.

// select random category from tree
while (($selectedCategory = getSomeRandomCategory($allCategories, 3)) === false) {}

// create new category
$newCategoryId = $proxy->call(
    $sessionId,
    'category.create',
    array(
        $selectedCategory['category_id'],
         array(
                'name'=>'Newopenerp',
                'is_active'=>1,
                'include_in_menu'=>2,
                'available_sort_by'=>'position',
                'default_sort_by'=>'position'
               )
    )
);

$newData = array('is_active'=>1);
// update created category on German store view
$proxy->call($sessionId, 'category.update', array($newCategoryId, $newData, 'german'));

$firstLevel = $proxy->call($sessionId, 'category.level', array(null, 'german', $selectedCategory['category_id']));

var_dump($firstLevel);

// If you wish remove category, uncomment next line
//$proxy->call($sessionId, 'category.delete', $newCategoryId);
```
##### Example 2. Working with assigned products
```
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');

$categoryId = 5; // Put here your category id
$storeId = 1; // You can add store level

$assignedProducts = $proxy->call($sessionId, 'category.assignedProducts', array($categoryId, $storeId));
var_dump($assignedProducts); // Will output assigned products.

// Assign product
$proxy->call($sessionId, 'category.assignProduct', array($categoryId, 'someProductSku', 5));

// Update product assignment position
$proxy->call($sessionId, 'category.updateProduct', array($categoryId, 'someProductSku', 25));

// Remove product assignment
$proxy->call($sessionId, 'category.removeProduct', array($categoryId, 'someProductSku'));
```

---

## catalog_category.currentStore — Current Store

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogCategory/catalog_category.currentStore.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### Resource Name: catalog_category

**Aliases:**

- category

###### Method:

- catalog_category.currentStore (SOAP V1)
- catalogCategoryCurrentStore (SOAP V2)

Allows you to set/get the current store view.

**Aliases:**

- category.currentStore

**Arguments:**

| Type   | Name      | Description           |
|--------|-----------|-----------------------|
| string | sessionId | Session ID            |
| string | storeView | Store view ID or code |

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

$result = $client->call($session, 'category.currentStore', '1');
var_dump ($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary
 
$result = $proxy->catalogCategoryCurrentStore($sessionId, '1');
var_dump($result);
```

---

## catalog_category.tree — Category Tree

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogCategory/catalog_category.tree.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### Resource Name: catalog_category

**Aliases:**

- category

###### Method:

- catalog_category.tree (SOAP V1)
- catalogCategoryTree (SOAP V2)

Allows you to retrieve the hierarchical tree of categories.

**Aliases:**

- category.tree

**Arguments:**

| Type   | Name      | Description                          |
|--------|-----------|--------------------------------------|
| string | sessionId | Session ID                           |
| string | parentId  | ID of the parent category (optional) |
| string | storeView | Store view (optional)                |

**Returns:**

| Type  | Name | Description                  |
|-------|------|------------------------------|
| array | tree | Array of catalogCategoryTree |

The **catalogCategoryTree** content is as follows:

| Type   | Name        | Description                      |
|--------|-------------|----------------------------------|
| int    | category_id | Category ID                      |
| int    | parent_id   | Parent category ID               |
| string | name        | Category name                    |
| int    | position    | Category position                |
| int    | level       | Category level                   |
| array  | children    | Array of CatalogCategoryEntities |

The **catalogCategoryEntity** content is as follows:

| Type   | Name        | Description                            |
|--------|-------------|----------------------------------------|
| int    | category_id | Category ID                            |
| int    | parent_id   | Parent category ID                     |
| string | name        | Category name                          |
| int    | is_active   | defines whether the category is active |
| int    | position    | Category position                      |
| int    | level       | Category level                         |
| array  | children    | Array of CatalogCategoryEntities       |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_category.tree');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogCategoryTree($sessionId);
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogCategoryTree((object)array('sessionId' => $sessionId->result, 'parentId' => '15'));
var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  'category_id' => string '1' (length=1)
  'parent_id' => string '0' (length=1)
  'name' => string 'Root Catalog' (length=12)
  'is_active' => null
  'position' => string '0' (length=1)
  'level' => string '0' (length=1)
  'children' =>
    array
      0 =>
        array
          'category_id' => string '2' (length=1)
          'parent_id' => string '1' (length=1)
          'name' => string 'Default Category' (length=16)
          'is_active' => string '1' (length=1)
          'position' => string '1' (length=1)
          'level' => string '1' (length=1)
          'children' =>
            array
              ...
      1 =>
        array
          'category_id' => string '3' (length=1)
          'parent_id' => string '1' (length=1)
          'name' => string 'root_category' (length=13)
          'is_active' => string '1' (length=1)
          'position' => string '2' (length=1)
          'level' => string '1' (length=1)
          'children' =>
            array
              ...
```

---

## catalog_category.level — Category Level

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogCategory/catalog_category.level.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### Resource Name: catalog_category

**Aliases:**

- category

###### Method:

- catalog_category.level (SOAP V1)
- catalogCategoryLevel (SOAP V2)

Allows you to retrieve one level of categories by a website, a store view, or a parent category.

**Aliases:**

- category.level

**Arguments:**

| Type   | Name           | Description                      |
|--------|----------------|----------------------------------|
| string | sessionId      | Session ID                       |
| string | website        | Website ID or code (optional)    |
| string | storeView      | Store view ID or code (optional) |
| string | parentCategory | Parent category ID (optional)    |

**Returns**:

| Type  | Name | Description                                |
|-------|------|--------------------------------------------|
| array | tree | Array of CatalogCategoryEntitiesNoChildren |

The **CatalogCategoryEntitityNoChildren** content is as follows:

| Type   | Name        | Description                            |
|--------|-------------|----------------------------------------|
| int    | category_id | Category ID                            |
| int    | parent_id   | Parent category ID                     |
| string | name        | Category name                          |
| int    | is_active   | Defines whether the category is active |
| int    | position    | Category position                      |
| int    | level       | Category level                         |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_category.level');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary
 
$result = $proxy->catalogCategoryLevel($sessionId);
var_dump($result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'category_id' => string '2' (length=1)
      'parent_id' => int 1
      'name' => string 'Default Category' (length=16)
      'is_active' => string '1' (length=1)
      'position' => string '1' (length=1)
      'level' => string '1' (length=1)
  1 =>
    array
      'category_id' => string '3' (length=1)
      'parent_id' => int 1
      'name' => string 'root_category' (length=13)
      'is_active' => string '1' (length=1)
      'position' => string '2' (length=1)
      'level' => string '1' (length=1)
```

---

## catalog_category.info — Category Info

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogCategory/catalog_category.info.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### Resource Name: catalog_category

**Aliases:**

- category

###### Method:

- catalog_category.info (SOAP V1)
- catalogCategoryInfo (SOAP V2)

Allows you to retrieve information about the required category.

**Aliases:**

- category.info

**Arguments:**

| Type          | Name       | Description                      |
|---------------|------------|----------------------------------|
| string        | sessionId  | Session ID                       |
| int           | categoryId | Category ID                      |
| string        | storeView  | Store view ID or code (optional) |
| ArrayOfString | attributes | Array of attributes (optional)   |

**Returns**:

| Type  | Name | Description                  |
|-------|------|------------------------------|
| array | info | Array of catalogCategoryInfo |

The **catalogCategoryInfo** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | category_id | Category ID |
| int | is_active | Defines whether the category is active |
| string | position | Category position |
| string | level | Category level |
| string | parent_id | Parent category ID |
| string | all_children | All child categories of the current category |
| string | children | Names of direct child categories |
| string | created_at | Date when the category was created |
| string | updated_at | Date when the category was updated |
| string | name | Category name |
| string | url_key | A relative URL path which can be entered in place of the standard target path (optional) |
| string | description | Category description |
| string | meta_title | Category meta title |
| string | meta_keywords | Category meta keywords |
| string | meta_description | Category meta description |
| string | path | Path |
| string | url_path | URL path |
| int | children_count | Number of child categories |
| string | display_mode | Content that will be displayed on the category view page (optional) |
| int | is_anchor | Defines whether the category is anchored |
| ArrayOfString | available_sort_by | All available options by which products in the category can be sorted |
| string | custom_design | The custom design for the category (optional) |
| string | custom_apply_to_products  | Apply the custom design to all products assigned to the category (optional) |
| string | custom_design_from | Date starting from which the custom design will be applied to the category (optional) |
| string | custom_design_to | Date till which the custom design will be applied to the category (optional) |
| string | page_layout | Type of page layout that the category should use (optional) |
| string | custom_layout_update | Custom layout update (optional) |
| string | default_sort_by | The default option by which products in the category are sorted |
| int | landing_page | Landing page (optional) |
| int | include_in_menu | Defines whether the category is available on the Magento top menu bar |
| string | filter_price_range | Price range of each price level displayed in the layered navigation block |
| int | custom_use_parent_settings | Defines whether the category will inherit custom design settings of the category to which it is assigned. 1 - Yes, 0 - No |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_category.info', '5');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogCategoryInfo($sessionId, '5');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogCategoryInfo((object)array('sessionId' => $sessionId->result, 'categoryId' => '5'));
var_dump($result->result);
```
###### Response Example SOAP V1
```
array
  'category_id' => string '5' (length=1)
  'is_active' => string '1' (length=1)
  'position' => string '1' (length=1)
  'level' => string '2' (length=1)
  'parent_id' => int 3
  'increment_id' => null
  'created_at' => string '2012-03-29 12:30:51' (length=19)
  'updated_at' => string '2012-03-29 14:25:08' (length=19)
  'name' => string 'Mobile Phones' (length=13)
  'url_key' => string 'mobile-phones' (length=13)
  'thumbnail' => null
  'description' => string 'Category for cell phones' (length=24)
  'image' => null
  'meta_title' => string 'Cell Phones' (length=11)
  'meta_keywords' => string 'cell, phone' (length=11)
  'meta_description' => null
  'include_in_menu' => string '1' (length=1)
  'path' => string '1/3/4' (length=5)
  'all_children' => string '4' (length=1)
  'path_in_store' => null
  'children' => string '' (length=0)
  'url_path' => string 'mobile-phones.html' (length=18)
  'children_count' => string '0' (length=1)
  'display_mode' => string 'PRODUCTS' (length=8)
  'landing_page' => null
  'is_anchor' => string '1' (length=1)
  'available_sort_by' => null
  'default_sort_by' => null
  'filter_price_range' => null
  'custom_use_parent_settings' => string '1' (length=1)
  'custom_apply_to_products' => null
  'custom_design' => null
  'custom_design_from' => null
  'custom_design_to' => null
  'page_layout' => null
  'custom_layout_update' => null
```

---

## catalog_category.create — Create Category

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogCategory/catalog_category.create.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### **Resource Name:** catalog_category

**Aliases:**

- category

###### Method:

- catalog_category.create (SOAP V1)
- catalogCategoryCreate (SOAP V2)

Create a new category and return its ID.

**Aliases:**

- category.create

**Arguments:**

| Type   | Name         | Description                          |
|--------|--------------|--------------------------------------|
| string | sessionId    | Session ID                           |
| int    | parentId     | Parent category ID                   |
| array  | categoryData | Array of catalogCategoryEntityCreate |
| string | storeView    | Store view ID or code (optional)     |

**Returns**:

| Type | Name         | Description                |
|------|--------------|----------------------------|
| int  | attribute_id | ID of the created category |

The **categoryData** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | name | Name of the created category |
| int | is_active | Defines whether the category will be visible in the frontend |
| int | position | Position of the created category (optional) |
| ArrayOfString | available_sort_by | All available options by which products in the category can be sorted |
| string | custom_design | The custom design for the category (optional) |
| int | custom_apply_to_products | Apply the custom design to all products assigned to the category (optional) |
| string | custom_design_from | Date starting from which the custom design will be applied to the category (optional) |
| string | custom_design_to | Date till which the custom design will be applied to the category (optional) |
| string | custom_layout_update | Custom layout update (optional) |
| string | default_sort_by | The default option by which products in the category are sorted |
| string | description | Category description (optional) |
| string | display_mode | Content that will be displayed on the category view page (optional) |
| int | is_anchor | Defines whether the category will be anchored (optional) |
| int | landing_page | Landing page (optional) |
| string | meta_description | Category meta description (optional) |
| string | meta_keywords | Category meta keywords (optional) |
| string | meta_title | Category meta title (optional) |
| string | page_layout | Type of page layout that the category should use (optional) |
| string | url_key | A relative URL path which can be entered in place of the standard target path (optional) |
| int | include_in_menu | Defines whether the category is visible on the top menu bar |
| string | filter_price_range | Price range of each price level displayed in the layered navigation block (optional) |
| int | custom_use_parent_settings | Defines whether the category will inherit custom design settings of the category to which it is assigned. 1 - Yes, 0 - No (optional) |

**Notes**: The **position** parameter is deprecated, the category will be positioned anyway in the end of the list and you can not set the position directly. You should use the catalog_category.move method instead. You cannot also assign a root category to the specified store.

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If some stuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');
$result = $client->call($session, 'catalog_category.create', array(2, array(
    'name' => 'Category name',
    'is_active' => 1,
    'position' => 1,
    //<!-- position parameter is deprecated, category anyway will be positioned in the end of list
    //and you can not set position directly, use catalog_category.move instead -->
    'available_sort_by' => 'position',
    'custom_design' => null,
    'custom_apply_to_products' => null,
    'custom_design_from' => null,
    'custom_design_to' => null,
    'custom_layout_update' => null,
    'default_sort_by' => 'position',
    'description' => 'Category description',
    'display_mode' => null,
    'is_anchor' => 0,
    'landing_page' => null,
    'meta_description' => 'Category meta description',
    'meta_keywords' => 'Category meta keywords',
    'meta_title' => 'Category meta title',
    'page_layout' => 'two_columns_left',
    'url_key' => 'url-key',
    'include_in_menu' => 1,
)));

var_dump ($result);
```
###### Request Example SOAP V2
```php
$client = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

// If some stuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');
$result = $client->catalogCategoryCreate($session, 2, array(
    'name' => 'Category name 2',
    'is_active' => 1,
    'position' => 1,
    //<!-- position parameter is deprecated, category anyway will be positioned in the end of list
    //and you can not set position directly, use catalog_category.move instead -->
    'available_sort_by' => array('position'),
    'custom_design' => null,
    'custom_apply_to_products' => null,
    'custom_design_from' => null,
    'custom_design_to' => null,
    'custom_layout_update' => null,
    'default_sort_by' => 'position',
    'description' => 'Category description',
    'display_mode' => null,
    'is_anchor' => 0,
    'landing_page' => null,
    'meta_description' => 'Category meta description',
    'meta_keywords' => 'Category meta keywords',
    'meta_title' => 'Category meta title',
    'page_layout' => 'two_columns_left',
    'url_key' => 'url-key',
    'include_in_menu' => 1,
));

var_dump ($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogCategoryCreate((object)array('sessionId' => $sessionId->result, 'parentId' => '5', 'categoryData' => ((object)array(
    'name' => 'category',
    'is_active' => '1',
    'position' => '1',
    'available_sort_by' => array('position'),
    'default_sort_by' => 'position',
    'description' => 'Category description',
    'is_anchor' => '1',
    'include_in_menu' => '1'
))));
var_dump($result->result);
```

---

## catalog_category.update — Category Update

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogCategory/catalog_category.update.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### **Resource Name:** catalog_category

**Aliases:**

- category

###### Method:

- catalog_category.update (SOAP V1)
- catalogCategoryUpdate (SOAP V2)

Update the required category. Note that you should specify only those parameters which you want to be updated.

**Aliases:**

- category.update

**Arguments**:

| Type   | Name         | Description                             |
|--------|--------------|-----------------------------------------|
| string | sessionId    | Session ID                              |
| int    | categoryId   | ID of the category to be updated        |
| array  | categoryData | An array of catalogCategoryEntityCreate |
| string | storeView    | Store view ID or code (optional)        |

**Returns**:

| Type    | Description                     |
|---------|---------------------------------|
| boolean | True if the category is updated |

The **catalogCategoryEntityCreate** content is as follows:

| Type | Name | Description |
|----|----|----|
| string | name | Name of the category to be updated |
| int | is_active | Defines whether the category is visible in the frontend |
| int | position | Position of the category to be updated |
| arrayOfString | available_sort_by | All available options by which products in the category can be sorted |
| string | custom_design | The custom design for the category |
| int | custom_apply_to_products  | Apply the custom design to all products assigned to the category |
| string | custom_design_from | Date starting from which the custom design will be applied to the category |
| string | custom_design_to | Date till which the custom design will be applied to the category |
| string | custom_layout_update | Custom layout update |
| string | default_sort_by | The default option by which products in the category are sorted |
| string | description | Category description |
| string | display_mode | Content that will be displayed on the category view page |
| int | is_anchor | Defines whether the category will be anchored |
| int | landing_page | Landing page |
| string | meta_description | Category meta description |
| string | meta_keywords | Category meta keywords |
| string | meta_title | Category meta title |
| string | page_layout | Type of page layout that the category should use |
| string | url_key | A relative URL path which can be entered in place of the standard target path |
| int | include_in_menu | Defines whether the category is visible on the top menu bar in the frontend |
| string | filter_price_range | Price range of each price level displayed in the layered navigation block |
| int | custom_use_parent_settings | Defines whether the category will inherit custom design settings of the category to which it is assigned. 1 - Yes, 0 - No |

**Faults**:\
*No Faults*

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If some stuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');
$result = $client->call($session, 'catalog_category.update', array(23, array(
    'name' => 'Category name',
    'is_active' => 1,
    'position' => 1,
    //<!-- position parameter is deprecated, category anyway will be positioned in the end of list
    //and you can not set position directly, use catalog_category.move instead -->
    'available_sort_by' => 'position',
    'custom_design' => null,
    'custom_apply_to_products' => null,
    'custom_design_from' => null,
    'custom_design_to' => null,
    'custom_layout_update' => null,
    'default_sort_by' => 'position',
    'description' => 'Category description',
    'display_mode' => null,
    'is_anchor' => 0,
    'landing_page' => null,
    'meta_description' => 'Category meta description',
    'meta_keywords' => 'Category meta keywords',
    'meta_title' => 'Category meta title',
    'page_layout' => 'two_columns_left',
    'url_key' => 'url-key',
    'include_in_menu' => 1,
)));

var_dump ($result);
```
###### Request Example SOAP V2
```php
$client = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

// If some stuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');
$result = $client->catalogCategoryUpdate($session, 23, array(
    'name' => 'Category name 2',
    'is_active' => 1,
    'position' => 1,
    //<!-- position parameter is deprecated, category anyway will be positioned in the end of list
    //and you can not set position directly, use catalog_category.move instead -->
    'available_sort_by' => array('position'),
    'custom_design' => null,
    'custom_apply_to_products' => null,
    'custom_design_from' => null,
    'custom_design_to' => null,
    'custom_layout_update' => null,
    'default_sort_by' => 'position',
    'description' => 'Category description',
    'display_mode' => null,
    'is_anchor' => 0,
    'landing_page' => null,
    'meta_description' => 'Category meta description',
    'meta_keywords' => 'Category meta keywords',
    'meta_title' => 'Category meta title',
    'page_layout' => 'two_columns_left',
    'url_key' => 'url-key',
    'include_in_menu' => 1,
));

var_dump ($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogCategoryUpdate((object)array('sessionId' => $sessionId->result, 'categoryId' => '23', 'categoryData' => ((object)array(
    'name' => 'Category Name Updated',
    'is_active' => '1',
    'position' => '1',
    'available_sort_by' => array('name'),
    'default_sort_by' => 'name',
    'description' => 'Category description',
    'is_anchor' => '1',
    'include_in_menu' => '1'
))));
var_dump($result->result);
```

---

## catalog_category.move — Category Move

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogCategory/catalog_category.move.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### Resource Name: catalog_category

**Aliases:**

- category

###### Method:

- catalog_category.move (SOAP V1)
- catalogCategoryMove (SOAP V2)

Allows you to move the required category in the category tree.

**Aliases:**

- category.move

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| int | categoryId | ID of the category to be moved |
| int | parentId | ID of the new parent category |
| string | afterId | ID of the category after which the required category will be moved (optional for V1 and V2) |

**Returns**:

| Type    | Name | Description                   |
|---------|------|-------------------------------|
| boolean | id   | True if the category is moved |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_category.move', array('categoryId' => '4', 'parentId' => '3'));
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogCategoryMove($sessionId, '4', '3');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogCategoryMove((object)array('sessionId' => $sessionId->result, 'categoryId' => '19', 'parentId' => '8', 'afterId' => '4'));
var_dump($result->result);
```
**Note**: Please make sure that you are not moving the category to any of its own children. There are no extra checks to prevent doing it through API, and you won’t be able to fix this from the admin interface later.

---

## catalog_category.delete — Category Delete

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogCategory/catalog_category.delete.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### Resource Name: catalog_category

**Aliases:**

- category

###### Method:

- catalog_category.delete (SOAP V1)
- catalogCategoryDelete (SOAP V2)

Allows you to delete the required category.

**Aliases:**

- category.delete

**Arguments:**

| Type   | Name       | Description                      |
|--------|------------|----------------------------------|
| string | sessionId  | Session ID                       |
| int    | categoryId | ID of the category to be deleted |

**Returns**:

| Type    | Description                     |
|---------|---------------------------------|
| boolean | True if the category is deleted |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_category.delete', '7');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogCategoryDelete($sessionId, '7');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogCategoryDelete((object)array('sessionId' => $sessionId->result, 'categoryId' => '7'));
var_dump($result->result);
```

---

## catalog_category.assignedProducts — Assigned Products

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogCategory/catalog_category.assignedProducts.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### Resource Name: catalog_category

**Aliases:**

- category

###### Method:

- catalog_category.assignedProducts (SOAP V1)
- catalogCategoryAssignedProducts (SOAP V2)

Retrieve the list of products assigned to a required category.

**Aliases:**

- category.assignedProducts

**Arguments:**

| Type   | Name       | Description                 |
|--------|------------|-----------------------------|
| string | sessionId  | Session ID                  |
| int    | categoryId | ID of the required category |

**Returns**:

| Type  | Name   | Description                     |
|-------|--------|---------------------------------|
| array | result | Array of catalogAssignedProduct |

The **catalogAssignedProduct** content is as follows:

| Type   | Name       | Description                      |
|--------|------------|----------------------------------|
| int    | product_id | ID of the assigned product       |
| string | type       | Product type                     |
| int    | set        | Attribute set ID                 |
| string | sku        | Product SKU                      |
| int    | position   | Position of the assigned product |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_category.assignedProducts', '4');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogCategoryAssignedProducts($sessionId, '4');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogCategoryAssignedProducts((object)array('sessionId' => $sessionId->result, 'categoryId' => '4'));
var_dump($result->result);
```
###### Response Example SOAP V1
```php
array
  0 =>
    array
      'product_id' => string '1' (length=1)
      'type' => string 'simple' (length=6)
      'set' => string '4' (length=1)
      'sku' => string 'n2610' (length=5)
      'position' => string '1' (length=1)
  1 =>
    array
      'product_id' => string '2' (length=1)
      'type' => string 'simple' (length=6)
      'set' => string '4' (length=1)
      'sku' => string 'b8100' (length=5)
      'position' => string '1' (length=1)
```

---

## catalog_category.assignProduct — Assign Product

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogCategory/catalog_category.assignProduct.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### Resource Name: catalog_category

**Aliases:**

- category

###### Method:

- catalog_category.assignProduct (SOAP V1)
- catalogCategoryAssignProduct (SOAP V2)

Assign a product to the required category.

**Aliases:**

- category.assignProduct

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| int | categoryId | ID of the category |
| string | product/productId | ID or SKU of the product to be assigned to the category |
| string | position | Position of the assigned product in the category (optional) |
| string | identifierType | Defines whether the product ID or SKU is passed in the 'product' argument |

**Returns**:

| Type    | Description                                               |
|---------|-----------------------------------------------------------|
| boolean | True if the product is assigned to the specified category |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_category.assignProduct', array('categoryId' => '4', 'product' => '1'));
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogCategoryAssignProduct($sessionId, '4', '3');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogCategoryAssignProduct((object)array('sessionId' => $sessionId->result, 'categoryId' => '5', 'productId' => '1', 'position' => '5'));
var_dump($result->result);
```

---

## catalog_category.updateProduct — Category Product Update

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogCategory/catalog_category.updateProduct.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### Resource Name: catalog_category

**Aliases:**

- category

###### Method:

- catalog_category.updateProduct (SOAP V1)
- catalogCategoryUpdateProduct (SOAP V2)

Allows you to update the product assigned to a category. The product position is updated.

**Aliases:**

- category.updateProduct

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| int | categoryId | ID of the category to which the product is assigned |
| string | productId | ID or SKU of the product to be updated |
| string | position | Position of the product in the category (optional) |
| string | identifierType | Defines whether the product ID or SKU is passed in the 'product' parameter |

**Returns**:

| Type    | Description                                    |
|---------|------------------------------------------------|
| boolean | True if the product is updated in the category |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_category.updateProduct', array('categoryId' => '4', 'product' => '1', 'position' => '3'));
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogCategoryUpdateProduct($sessionId, '4', '1', '3');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogCategoryUpdateProduct((object)array('sessionId' => $sessionId->result, 'categoryId' => '4', 'productId' => '1', 'position' => '3'));
var_dump($result->result);
```

---

## catalog_category.removeProduct — Remove Product

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogCategory/catalog_category.removeProduct.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### Resource Name: catalog_category

**Aliases:**

- category

###### Method:

- catalog_category.removeProduct (SOAP V1)
- catalogCategoryRemoveProduct (SOAP V2)

Allows you to remove the product assignment from the category.

**Aliases:**

- category.removeProduct

**Arguments:**

| Type | Name | Description |
|----|----|----|
| string | sessionId | Session ID |
| int | categoryId | Category ID |
| string | productId | ID or SKU of the product to be removed from the category |
| string | identifierType | Defines whether the product ID or SKU is passed in the 'product' parameter |

**Returns**:

| Type    | Description                                      |
|---------|--------------------------------------------------|
| boolean | True if the product is removed from the category |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_category.removeProduct', array('categoryId' => '4', 'product' => '3'));
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogCategoryRemoveProduct($sessionId, '4', '3');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$sessionId = $proxy->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $proxy->catalogCategoryRemoveProduct((object)array('sessionId' => $sessionId->result, 'categoryId' => '4', 'productId' => '3'));
var_dump($result->result);
```

---

## Category Attributes

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogCategoryAttributes/categoryAttributes.html>*

### Module: Mage_Catalog

The Mage_Catalog module allows you to manage categories and products.

##### Category Attributes

Allows you to retrieve the list of category attributes and options.

**Resource Name**: catalog_category_attribute

**Aliases**:

- category_attribute

**Methods**:

- [catalog_category_attribute.currentStore](catalog_category_attribute.currentStore.html "catalog_category_attribute.currentStore") - Set/Get the current store view
- [catalog_category_attribute.list](catalog_category_attribute.list.html "catalog_category_attribute.list") - Retrieve the category attributes
- [catalog_category_attribute.options](catalog_category_attribute.options.html "catalog_category_attribute.options") - Retrieve the attribute options

##### Faults

| Fault Code | Fault Message                   |
|------------|---------------------------------|
| 100        | Requested store view not found. |
| 101        | Requested attribute not found.  |

##### Examples

###### Example 1. Retrieving attributes and options
```
$proxy = new SoapClient('http://magentohost/api/soap/?wsdl');
$sessionId = $proxy->login('apiUser', 'apiKey');
$attributes = $proxy->call($sessionId, 'category_attribute.list');
foreach ($attributes as &$attribute) {
   if (isset($attribute['type'])
       && ($attribute['type'] == 'select' || $attribute['type'] == 'multiselect')) {
       $attribute['options'] = $proxy->call($sessionId, 'category_attribute.options', $attribute['code']);
   }
}
var_dump($attributes);
```

---

## catalog_category_attribute.currentStore — Current Store

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogCategoryAttributes/catalog_category_attribute.currentStore.html>*

### Module: Mage_Catalog

##### Resource: catalog_category_attribute

**Aliases:**

- category_attribute

###### Method:

- catalog_category_attribute.currentStore (SOAP V1)
- catalogCategoryAttributeCurrentStore (SOAP V2)

Allows you to set/get the current store view.

**Aliases:**

- category_attribute.currentStore

**Arguments:**

| Type   | Name      | Description           |
|--------|-----------|-----------------------|
| string | sessionId | Session ID            |
| string | storeView | Store view ID or code |

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

$result = $client->call($session, 'catalog_category_attribute.currentStore', 'english');
var_dump ($result);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary
 
$result = $proxy->catalogCategoryAttributeCurrentStore($sessionId, 'english');
var_dump($result);
```

---

## catalog_category_attribute.list — Attribute List

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogCategoryAttributes/catalog_category_attribute.list.html>*

### Module: Mage_Catalog

##### Resource: catalog_category_attribute

**Aliases:**

- category_attribute

###### Method:

- catalog_category_attribute.list (SOAP V1)
- catalogCategoryAttributeList (SOAP V2)

Allows you to retrieve the list of category attributes.

**Aliases:**

- category_attribute.list

**Arguments:**

| Type   | Name      | Description |
|--------|-----------|-------------|
| string | sessionId | Session ID  |

**Returns**:

| Type  | Name   | Description                     |
|-------|--------|---------------------------------|
| array | result | Array of catalogAttributeEntity |

The **catalogAttributeEntity** content is as follows:

| Type   | Name         | Description                                |
|--------|--------------|--------------------------------------------|
| int    | attribute_id | Attribute ID                               |
| string | code         | Attribute code                             |
| string | type         | Attribute type                             |
| string | required     | Defines whether the attribute is required  |
| string | scope        | Attribute scope: global, website, or store |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_category_attribute.list',);
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogCategoryAttributeList($sessionId);
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$client = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$session = $client->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $client->catalogCategoryAttributeList((object)array('sessionId' => $session->result));

var_dump ($result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'attribute_id' => null
      'code' => string 'parent_id' (length=9)
      'type' => null
      'required' => null
      'scope' => string 'global' (length=6)
  1 =>
    array
      'attribute_id' => null
      'code' => string 'increment_id' (length=12)
      'type' => null
      'required' => null
      'scope' => string 'global' (length=6)
  2 =>
    array
      'attribute_id' => null
      'code' => string 'updated_at' (length=10)
      'type' => null
      'required' => null
      'scope' => string 'global' (length=6)
```

---

## catalog_category_attribute.options — Attribute Options

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/catalog/catalogCategoryAttributes/catalog_category_attribute.options.html>*

### Module: Mage_Catalog

##### Resource: catalog_category_attribute

**Aliases:**

- category_attribute

###### Method:

- catalog_category_attribute.options (SOAP V1)
- catalogCategoryAttributeOptions (SOAP V2)

Allows you to retrieve the attribute options.

**Aliases:**

- category_attribute.options

**Arguments:**

| Type   | Name        | Description           |
|--------|-------------|-----------------------|
| string | sessionId   | Session ID            |
| string | attributeId | Attribute ID or code  |
| string | storeView   | Store view ID or code |

**Returns**:

| Type  | Name   | Description                           |
|-------|--------|---------------------------------------|
| array | result | Array of catalogAttributeOptionEntity |

The **catalogAttributeOptionEntity** content is as follows:

| Type   | Name  | Description  |
|--------|-------|--------------|
| string | label | Option label |
| string | value | Option value |

##### Examples

###### Request Example SOAP V1
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'catalog_category_attribute.options', '65');
var_dump($result);

// If you don't need the session anymore
//$client->endSession($session);
```
###### Request Example SOAP V2
```php
$proxy = new SoapClient('http://magentohost/api/v2_soap/?wsdl'); // TODO : change url
$sessionId = $proxy->login('apiUser', 'apiKey'); // TODO : change login and pwd if necessary

$result = $proxy->catalogCategoryAttributeOptions($sessionId, '65');
var_dump($result);
```
###### Request Example SOAP V2 (WS-I Compliance Mode)
```php
$client = new SoapClient('http://magentohost/api/v2_soap/?wsdl');

$session = $client->login((object)array('username' => 'apiUser', 'apiKey' => 'apiKey'));

$result = $client->catalogCategoryAttributeOptions((object)array('sessionId' => $session->result, 'attributeId' => '65'));

var_dump ($result);
```
###### Response Example SOAP V1
```
array
  0 =>
    array
      'label' => string 'Yes' (length=3)
      'value' => int 1
  1 =>
    array
      'label' => string 'No' (length=2)
      'value' => int 0
```

---
