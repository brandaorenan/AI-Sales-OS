# REST API — HTTP Methods, GET Filters & Status Codes

> Supported HTTP verbs, query filters for list endpoints and common HTTP status codes.

---

## HTTP Methods (http_methods)

*Source: <https://devdocs-openmage.org/guides/m1x/api/rest/http_methods.html>*

### GET

**Retrieving Resources with the HTTP GET Method**

The HTTP GET method is defined in section 9.3 of the [RFC2616](http://www.ietf.org/rfc/rfc2616.txt) document:

> The GET method means retrieve whatever information (in the form of an entity) is identified by the Request-URI. If the Request-URI refers to a data-producing process, it is the produced data which shall be returned as the entity in the response and not the source text of the process, unless that text happens to be the output of the process.

You can retrieve a representation of a resource by getting its URL.

### POST and PUT

**Creating or Updating Resources with the HTTP POST and PUT Methods**

The POST method is defined in section 9.5 of the [RFC2616](http://www.ietf.org/rfc/rfc2616.txt) document:

> The POST method is used to request that the origin server accept the entity enclosed in the request as a new subordinate of the resource identified by the Request-URI in the Request-Line. POST is designed to allow a uniform method to cover the following functions:
>
> - Annotation of existing resources;
>
> <!-- -->
>
> - Posting a message to a bulletin board, newsgroup, mailing list, or similar group of articles;
>
> <!-- -->
>
> - Providing a block of data, such as the result of submitting a form, to a data-handling process;
>
> <!-- -->
>
> - Extending a database through an append operation.

The PUT method is defined in section 9.6 of the [RFC2616](http://www.ietf.org/rfc/rfc2616.txt) document:

> The PUT method requests that the enclosed entity be stored under the supplied Request-URI. If the Request-URI refers to an already existing resource, the enclosed entity SHOULD be considered as a modified version of the one residing on the origin server.

Creating or updating a resource involves performing an HTTP POST or HTTP PUT to a resource URL.

### DELETE

**Deleting Resources with the HTTP DELETE Method**

The DELETE method is defined in section 9.7 of the [RFC2616](http://www.ietf.org/rfc/rfc2616.txt) document:

> The DELETE method requests that the origin server delete the resource identified by the Request-URI. This method MAY be overridden by human intervention (or other means) on the origin server.

Deleting a resource is performed by means of making an HTTP DELETE request to the resource URL.

---

## GET Filters (get_filters)

*Source: <https://devdocs-openmage.org/guides/m1x/api/rest/get_filters.html>*

*JSON responses on this page contributed by Tim Reynolds*

Some requests use GET parameters in the URL. These are as follows:

- **filter** - specifies the filters for returned data
- **page** - specifies the page number which items will be returned
  - e.g., http://magentohost/api/rest/products?page=1
- **order**, **dir** - specifies the sort order of returned items and the order direction: 'asc' - returns items in the ascending order; 'dsc' - returns items in the descending order.
  - e.g., http://magentohost/api/rest/products?order=name&dir=dsc
  - e.g., http://magentohost/api/rest/products?order=name&dir=asc
- **limit** - limits the number of returned items in the response. Note that by default, 10 items are returned in the response. The maximum number is 100 items.
  - e.g., http://magentohost/api/rest/products?limit=2
- **neq** - "not equal to" - returns items with the specified attribute that is not equal to the defined value
  - e.g., [http://magentohost/api/rest/products?filter\[1\]\[attribute\]=entity_id&filter\[1\]\[neq\]=3](http://magentohost/api/rest/products?filter\%5B1\%5D\%5Battribute\%5D=entity_id&filter\%5B1\%5D\%5Bneq\%5D=3)
- **in** - "equals any of" - returns items that are equal to the item(s) with the specified attribute(s)
  - e.g., [http://magentohost/api/rest/products?filter\[1\]\[attribute\]=entity_id&filter\[1\]\[in\]=3](http://magentohost/api/rest/products?filter\%5B1\%5D\%5Battribute\%5D=entity_id&filter\%5B1\%5D\%5Bin\%5D=3)
- **nin** - "not equals any of" - returns items excluding the item with the specified attribute
  - e.g., [http://magentohost/api/rest/products?filter\[1\]\[attribute\]=entity_id&filter\[1\]\[nin\]=3](http://magentohost/api/rest/products?filter\%5B1\%5D\%5Battribute\%5D=entity_id&filter\%5B1\%5D\%5Bnin\%5D=3)
- **gt** - "greater than" - returns items with the specified attribute that is greater than the defined value
  - e.g., [http://magentohost/api/rest/products?filter\[1\]\[attribute\]=entity_id&filter\[1\]\[gt\]=3](http://magentohost/api/rest/products?filter\%5B1\%5D\%5Battribute\%5D=entity_id&filter\%5B1\%5D\%5Bgt\%5D=3)
  - e.g., [http://magentohost/api/rest/products?filter\[1\]\[attribute\]=price&filter\[1\]\[gt\]=300](http://magentohost/api/rest/products?filter\%5B1\%5D\%5Battribute\%5D=price&filter\%5B1\%5D\%5Bgt\%5D=300)
- **lt** - "less than" - returns items with the specified attribute that is less than the defined value
  - e.g., [http://magentohost/api/rest/products?filter\[1\]\[attribute\]=entity_id&filter\[1\]\[lt\]=4](http://magentohost/api/rest/products?filter\%5B1\%5D\%5Battribute\%5D=entity_id&filter\%5B1\%5D\%5Blt\%5D=4)
- **from**, **to** - specifies the range of attributes according to which items will be returned
  - e.g., [http://magentohost/api/rest/products?filter\[1\]\[attribute\]=entity_id&filter\[1\]\[from\]=1&filter\[1\]\[to\]=3](http://magentohost/api/rest/products?filter\%5B1\%5D\%5Battribute\%5D=entity_id&filter\%5B1\%5D\%5Bfrom\%5D=1&filter\%5B1\%5D\%5Bto\%5D=3)
  - e.g., [http://magentohost/api/rest/products?filter\[1\]\[attribute\]=price&filter\[1\]\[from\]=150&filter\[1\]\[to\]=350](http://magentohost/api/rest/products?filter\%5B1\%5D\%5Battribute\%5D=price&filter\%5B1\%5D\%5Bfrom\%5D=150&filter\%5B1\%5D\%5Bto\%5D=350)

If the attribute value consists of several words separated by a whitespace, the '%20' sign is used:

- e.g., [http://magentohost/api/rest/products?filter\[1\]\[attribute\]=name&filter\[1\]\[in\]=BlackBerry%208100%20Pearl](http://magentohost/api/rest/products?filter\%5B1\%5D\%5Battribute\%5D=name&filter\%5B1\%5D\%5Bin\%5D=BlackBerry%208100%20Pearl)

For example, to filter products with the description equal to simple01:

[http://magentohost/api/rest/products/?order=entity_id&filter\[0\]\[attribute\]=description&filter\[0\]\[in\]\[0\]=simple01](http://magentohost/api/rest/products/?order=entity_id&filter\%5B0\%5D\%5Battribute\%5D=description&filter\%5B0\%5D\%5Bin\%5D\%5B0\%5D=simple01)

To filter customers by email address:

[http://magentohost/api/rest/customers?filter\[1\]\[attribute\]=email&filter\[1\]\[in\]\[0\]=ryan@test.com](http://magentohost/api/rest/customers?filter\%5B1\%5D\%5Battribute\%5D=email&filter\%5B1\%5D\%5Bin\%5D\%5B0\%5D=ryan@test.com)

---

## Common HTTP Status Codes (common_http_status_codes)

*Source: <https://devdocs-openmage.org/guides/m1x/api/rest/common_http_status_codes.html>*

### HTTP Status Codes

The following table contains possible common HTTP status codes:

| Status Code | Message |
|----|----|
| 200 OK | \- |
| 201 Created | Resource was partially created |
| 207 Multi-Status | \- |
| 400 Bad Request | Resource data pre-validation error. Resource data invalid. Resource unknown error. The request data is invalid. Resource collection paging error. The paging limit exceeds the allowed number. Resource collection ordering error. Resource collection filtering error. Resource collection including additional attributes error. |
| 403 Forbidden | Access denied. |
| 404 Not Found | Resource not found. |
| 405 Method Not Allowed | Resource does not support method. Resource method not implemented yet. |
| 500 Internal Error | Unhandled simple errors. Resource internal error. |

### Error Messages

When the Magento API returns an error message, it returns it in your requested format. For example, an error in the XML format might look like the following:
```xml
<?xml version="1.0"?>
<magento_api>
  <messages>
    <error>
      <data_item>
        <code>404</code>
        <message>Resource not found.</message>
      </data_item>
    </error>
  </messages>
</magento_api>
```
An error in the JSON format might look like the following:
```
{"messages":{"error":[{"code":404,"message":"Resource not found."}]}}
```

---
