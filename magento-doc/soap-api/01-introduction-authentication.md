# SOAP API — Introduction & Authentication

> Protocols (SOAP/XML-RPC), WSDL endpoints, API versions (v1/v2/WS-I), session handling and global faults.

**Note:** Read this first: it explains how to connect, authenticate and choose between SOAP v1 and v2.

---

## Introduction to the Magento 1.x SOAP API

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/introduction.html>*

## Introduction

The Magento SOAP v1 API provides you with the ability to manage your eCommerce stores by providing calls for working with resources such as customers, categories, products, and sales orders. It also allows you to manage shopping carts and inventory.

A SOAP v2 API version has been available since Magento 1.3, and a WS-I compliant version has been available since Magento 1.6.

### Supported Types

The Magento API supports [SOAP](http://en.wikipedia.org/wiki/SOAP) and [XML-RPC](http://en.wikipedia.org/wiki/XML_RPC), where SOAP is the default protocol.

#### SOAP

To connect to Magento SOAP web services, load the [WSDL](http://en.wikipedia.org/wiki/WSDL) into your SOAP client from either of these URLs:
```
http://magentohost/api/?wsdl
``````
http://magentohost/api/soap/?wsdl
```
where magentohost is the domain for your Magento host.

As of v1.3, you may also use the following URL to access the Magento API v2, which has been added to improve compatibility with Java and .NET:
```
http://magentohost/api/v2_soap?wsdl=1
```
The following PHP example shows how to make SOAP calls to the Magento API v1:
```php
$client = new SoapClient('http://magentohost/api/soap/?wsdl');

// If somestuff requires API authentication,
// then get a session token
$session = $client->login('apiUser', 'apiKey');

$result = $client->call($session, 'somestuff.method');
$result = $client->call($session, 'somestuff.method', 'arg1');
$result = $client->call($session, 'somestuff.method', array('arg1', 'arg2', 'arg3'));
$result = $client->multiCall($session, array(
     array('somestuff.method'),
     array('somestuff.method', 'arg1'),
     array('somestuff.method', array('arg1', 'arg2'))
));

// If you don't need the session anymore
$client->endSession($session);
```
#### XML-RPC

To use XML-RPC, load the following URL into your XML-RPC client:
```
http://magentohost/api/xmlrpc/
```
where magentohost is the domain for your Magento host.

The following PHP example shows how to make XML-RPC calls:
```php
$client = new Zend_XmlRpc_Client('http://magentohost/api/xmlrpc/');

// If somestuff requires API authentication,
// we should get session token
$session = $client->call('login', array('apiUser', 'apiKey'));

$client->call('call', array($session, 'somestuff.method', array('arg1', 'arg2', 'arg3')));
$client->call('call', array($session, 'somestuff.method', array('arg1')));
$client->call('call', array($session, 'somestuff.method'));
$client->call('multiCall', array($session,
     array(
        array('somestuff.method', 'arg1'),
        array('somestuff.method', array('arg1', 'arg2')),
        array('somestuff.method')
     )
));

// If you don't need the session anymore
$client->call('endSession', array($session));
```
The XML-RPC only supports the version 1 of the Magento API.

### API Methods

The following table contains the API methods that can be called from your SOAP or XML-RPC client on the Magento v1 API.

| Method | Description | Return Value |
|----|----|----|
| startSession() | Start the API session and return session ID. | string |
| endSession(sessionId) | End the API session. | boolean |
| login(apiUser, apiKey) | Start the API session, return the session ID, and authorize the API user. | string |
| call(sessionId, resourcePath,array arguments) | Call the API resource that is allowed in the current session. See Note below. | mixed |
| multiCall(sessionId, array calls,array options) | Call the API resource’s methods that are allowed for current session. See Notes below. | array |
| resources(sessionId) | Return a list of available API resources and methods allowed for the current session. | array |
| globalFaults(sessionId) | Return a list of fault messages and their codes that do not depend on any resource. | array |
| resourceFaults(sessionId, resourceName) | Return a list of the specified resource fault messages, if this resource is allowed in the current session. | array |

**Note:** For **call** and **multiCall**, if no session is specified, you can call only resources that are not protected by ACL.

**Note:** For **multiCall**, if the "break" option is specified, multiCall breaks on first error.

The Magento SOAP API v2 does not support the call() and multiCall() methods, and instead provides a separate method for each API resource.

### Global API Faults

The following table contains fault codes that apply to all SOAP/XML-RPC API calls.

| Fault Code | Fault Message                               |
|------------|---------------------------------------------|
| 0          | Unknown Error                               |
| 1          | Internal Error. Please see log for details. |
| 2          | Access denied.                              |
| 3          | Invalid API path.                           |
| 4          | Resource path is not callable.              |

### SOAP API Version v2

Since Magento 1.3, version v2 of the SOAP API has also been available. The main difference between v1 and v2 is that instead of using methods call and multiCall, it has separate methods for each action.

For example, consider the following PHP code using SOAP v1.
```php
$params = array(array(
    'status'=>array('eq'=>'pending'),
    'customer_is_guest'=>array('eq'=>'1'))
));
$result = $client->call($sessionId, 'sales_order.list', $params);
```
With SOAP v2, the following code would be equivalent.
```php
$params = array('filter' => array(
    array('key' => 'status', 'value' => 'pending'),
    array('key' => 'customer_is_guest', 'value' => '1')
));
$result = $client->salesOrderList($sessionId, $params);
```
Note that the WSDL for SOAP v1 and SOAP v2 are different. Note that in SOAP v1, customizing the API did not involve changing the WSDL. In SOAP v2, changes to the WSDL are required.

You can configure the SOAP v2 API to be [WS-I](http://www.ws-i.org/) compliant in the system configuration menu. To do this, set **Services \> Magento Core API \> WS-I Compliance** to **Yes**.

Note that the WSDL for the SOAP v2 API is different when in WS-I compliant mode.

Using the WS-I compliant SOAP v2 API WSDL, it is easy to automatically generate client classes for Java, .NET, and other languages using standard libraries.

---
