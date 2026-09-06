# SOAP API — Creating Your Own API & WS-I Compliance

> How to expose custom module methods through the SOAP/XML-RPC API and how WS-I compliance mode works.

---

## Create Your Own API (create_your_own_api)

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/create_your_own_api.html>*

- [Creating a Custom API or Extending the Core API](#CreateYourOwnAPI-CreatingaCustomAPIorExtendingtheCoreAPI)
  - [1. Creating an XML File that Will Define the API Resource](#CreateYourOwnAPI-1.CreatinganXMLFilethatWillDefinetheAPIResource)
  - [2. Adding a Resource Named Customer](#CreateYourOwnAPI-2.AddingaResourceNamedCustomer)
  - [3. Adding Faults](#CreateYourOwnAPI-3.AddingFaults)
  - [4. Describing the Access Control List (ACL) for the Resource](#CreateYourOwnAPI-4.DescribingtheAccessControlList-ACL-fortheResource)
  - [5. Creating PHP Code](#CreateYourOwnAPI-5.CreatingPHPCode)

  <!-- -->

  - [Creating a Custom Adapter](#CreateYourOwnAPI-CreatingaCustomAdapter)
    - [Common Error Messages](#CreateYourOwnAPI-CommonErrorMessages)

## Creating a Custom API or Extending the Core API

The Core API allows you to manage a set of common resources used in Magento. However, you may choose to have your own set of resources to manage, or you may wish to extend the Core API to handle additional resources.

This tutorial leads you through the process of creating a custom API for a customer module that handles basic customer information.

**Note:** This tutorial applies to v1 of the API.

To learn more about the Core API, to read Magento Core API calls.

For general information about the Magento API, go to the Introduction.

#### 1. Creating an XML File that Will Define the API Resource

Create a file named **api.xml** in the /etc folder in the customer module. Start with the empty structure, as follows:
```
<config>
    <api>
        <resources>
        </resources>
        <acl>
            <resources>
                <all>
                </all>
            </resources>
        </acl>
    </api>
</config>
```
#### 2. Adding a Resource Named Customer

Add an element named customer in the \<resources\> element. Add a \<methods\> element, with elements for list, create, info, update and remove methods for customer resource.

Note that:

- list will return all customers
- create will create a new customer
- info will return data on a specified customer
- update will update data on a specified customer
- remove will delete data on a specified customer
```
<config>
    <api>
....
        <resources>
            <customer translate="title" module="customer">
                <title>Customer Resource</title>
                <methods>
                    <list translate="title" module="customer">
                        <title>Retrieve customers</title>
                    </list>
                    <create translate="title" module="customer">
                        <title>Create customer</title>
                    </create>
                    <info translate="title" module="customer">
                        <title>Retrieve customer data</title>
                    </info>
                    <update translate="title" module="customer">
                        <title>Update customer data</title>
                    </update>
                    <delete>
                        <title>Delete customer</title>
                    </delete>
                </methods>
                <faults module="customer">
                </faults>
            </customer>
        </resources>
....
    </api>
</config>
```
#### 3. Adding Faults

The resource can return some faults, so add a \<faults\> element in the customer element, and list the various faults.
```
<config>
    <api>
....
        <resources>
            <customer translate="title" module="customer">
....
                <faults module="customer"> <!-- module="customer" specifies the module which will be used for translation. -->
                    <data_invalid> <!-- if we get invalid input data for customers -->
                        <code>100</code >
                        <!-- we cannot know all the errors that can appear, their details can be found in error message for call -->
                        <message>Invalid customer data. Details in error message.</message>
                    </data_invalid>
                    <filters_invalid>
                        <code>101</code >
                        <message>Invalid filters specified. Details in error message.</message>
                    </filters_invalid>
                    <not_exists>
                        <code>102</code >
                        <message>Customer doesn't exist.</message>
                    </not_exists>
                    <not_deleted>
                        <code>103</code >
                        <message>Customer was not deleted. Details in error message.</message>
                    </not_deleted>
                </faults>
            </customer>
        </resources>
....
    </api>
</config>
```
#### 4. Describing the Access Control List (ACL) for the Resource

In order to prevent unauthorized access to our custom API, you must first list the resources that are restricted within the \<acl\> element.
```
<config>
    <api>
....
        <acl>
            <resources>
                    <customer translate="title" module="customer">
                         <title>Customers</title>
                         <list translate="title" module="customer">
                            <title>View All</title>
                         </list>
                         <create translate="title" module="customer">
                            <title>Create</title>
                         </create>
                         <info translate="title" module="customer">
                            <title>Get Info</title>
                         </info>
                         <update translate="title" module="customer">
                            <title>Update</title>
                         </update>
                         <delete translate="title" module="customer">
                            <title>Delete</title>
                         </delete>
                    </customer>
            </resources>
        </acl>
    </api>
</config>
```
Then, map ACL resources to API resource methods by adding an \<acl\> element to each part of the resource that needs restricting:
```
<config>
    <api>
        <resources>
            <customer translate="title" module="customer">
                <title>Customer Resource</title>
                <acl>customer</acl>
                <methods>
                    <list translate="title" module="customer">
                        <title>Retrieve customers</title>
                        <acl>customer/list</acl>
                    </list>
                    <create translate="title" module="customer">
                        <title>Create customer</title>
                        <acl>customer/create</acl>
                    </create>
                    <info translate="title" module="customer">
                        <title>Retrieve customer data</title>
                        <acl>customer/info</acl>
                    </info>
                    <update translate="title" module="customer">
                        <title>Update customer data</title>
                        <acl>customer/update</acl>
                    </update>
                    <delete>
                        <title>Delete customer</title>
                        <acl>customer/delete</acl>
                    </delete>
                </methods>
              ....
            </customer>
        </resources>
....
    </api>
</config>
```
#### 5. Creating PHP Code

Next, write some PHP code to access the resources. Start by creating a class called Mage_Customer_Model_Customer_Api that extends Mage_Api_Model_Resource_Abstract. Save it into a file called **api.php**.
```
class Mage_Customer_Model_Customer_Api extends Mage_Api_Model_Resource_Abstract
{

    public function create($customerData)
    {
    }

    public function info($customerId)
    {
    }

    public function items($filters)
    {
    }

    public function update($customerId, $customerData)
    {
    }

    public function delete($customerId)
    {
    }
}
```
Note that you cannot create method "list" because it’s a PHP keyword, so instead the method is named items. In order to make this work, add a \<method\> element into the \<list\> element in **api.xml**, as shown below.
```
<config>
    <api>
        <resources>
            <customer translate="title" module="customer">
                <model>customer/api</model> <!-- our model -->
                <title>Customer Resource</title>
                <acl>customer</acl>
                <methods>
                    <list translate="title" module="customer">
                        <title>Retrieve customers</title>
                        <method>items</method> <!-- we have another method name inside our resource -->
                        <acl>customer/list</acl>
                    </list>
....
                </methods>
....
        </resources>
....
    </api>
</config>
```
Now add some simple functionality to the Mage_Customer_Model_Api methods you created.

Create a customer:
```php
public function create($customerData)
    {
        try {
            $customer = Mage::getModel('customer/customer')
                ->setData($customerData)
                ->save();
        } catch (Mage_Core_Exception $e) {
            $this->_fault('data_invalid', $e->getMessage());
            // We cannot know all the possible exceptions,
            // so let's try to catch the ones that extend Mage_Core_Exception
        } catch (Exception $e) {
            $this->_fault('data_invalid', $e->getMessage());
        }
        return $customer->getId();
    }
```
Retrieve customer info:
```php
public function info($customerId)
    {
        $customer = Mage::getModel('customer/customer')->load($customerId);
        if (!$customer->getId()) {
            $this->_fault('not_exists');
            // If customer not found.
        }
        return $customer->toArray();
        // We can use only simple PHP data types in webservices.
    }
```
Retrieve list of customers using filtering:
```php
public function items($filters)
    {
        $collection = Mage::getModel('customer/customer')->getCollection()
            ->addAttributeToSelect('*');

        if (is_array($filters)) {
            try {
                foreach ($filters as $field => $value) {
                    $collection->addFieldToFilter($field, $value);
                }
            } catch (Mage_Core_Exception $e) {
                $this->_fault('filters_invalid', $e->getMessage());
                // If we are adding filter on non-existent attribute
            }
        }

        $result = array();
        foreach ($collection as $customer) {
            $result[] = $customer->toArray();
        }

        return $result;
    }
```
Update a customer:
```php
public function update($customerId, $customerData)
    {
        $customer = Mage::getModel('customer/customer')->load($customerId);

        if (!$customer->getId()) {
            $this->_fault('not_exists');
            // No customer found
        }

        $customer->addData($customerData)->save();
        return true;
    }
```
Delete a customer:
```php
public function delete($customerId)
    {
        $customer = Mage::getModel('customer/customer')->load($customerId);

        if (!$customer->getId()) {
            $this->_fault('not_exists');
            // No customer found
        }

        try {
            $customer->delete();
        } catch (Mage_Core_Exception $e) {
            $this->_fault('not_deleted', $e->getMessage());
            // Some errors while deleting.
        }

        return true;
    }
```
### Creating a Custom Adapter

In order to create custom webservice adapter, implement the Mage_Api_Model_Server_Adapter_Interface, which is shown below.
```php
interface Mage_Api_Model_Server_Adapter_Interface
{
    /**
     * Set handler class name for webservice
     *
     * @param string $handler
     * @return Mage_Api_Model_Server_Adapter_Interface
     */
    function setHandler($handler);

    /**
     * Retrieve handler class name for webservice
     *
     * @return string [basc]
     */
    function getHandler();

    /**
     * Set webservice API controller
     *
     * @param Mage_Api_Controller_Action $controller
     * @return Mage_Api_Model_Server_Adapter_Interface
     */
    function setController(Mage_Api_Controller_Action $controller);

    /**
     * Retrieve webservice API controller
     *
     * @return Mage_Api_Controller_Action
     */
    function getController();

    /**
     * Run webservice
     *
     * @return Mage_Api_Model_Server_Adapter_Interface
     */
    function run();

    /**
     * Dispatch webservice fault
     *
     * @param int $code
     * @param string $message
     */
    function fault($code, $message);

} // Class Mage_Api_Model_Server_Adapter_Interface End
```
Here is an example implementation for XML-RPC:
```php
class Mage_Api_Model_Server_Adapter_Customxmlrpc
    extends Varien_Object
    implements Mage_Api_Model_Server_Adapter_Interface
{
     /**
      * XmlRpc Server
      *
      * @var Zend_XmlRpc_Server
      */
     protected $_xmlRpc = null;

     /**
     * Set handler class name for webservice
     *
     * @param string $handler
     * @return Mage_Api_Model_Server_Adapter_Xmlrpc
     */
    public function setHandler($handler)
    {
        $this->setData('handler', $handler);
        return $this;
    }

    /**
     * Retrieve handler class name for webservice
     *
     * @return string
     */
    public function getHandler()
    {
        return $this->getData('handler');
    }

     /**
     * Set webservice API controller
     *
     * @param Mage_Api_Controller_Action $controller
     * @return Mage_Api_Model_Server_Adapter_Xmlrpc
     */
    public function setController(Mage_Api_Controller_Action $controller)
    {
         $this->setData('controller', $controller);
         return $this;
    }

    /**
     * Retrieve webservice API controller
     *
     * @return Mage_Api_Controller_Action
     */
    public function getController()
    {
        return $this->getData('controller');
    }

    /**
     * Run webservice
     *
     * @param Mage_Api_Controller_Action $controller
     * @return Mage_Api_Model_Server_Adapter_Xmlrpc
     */
    public function run()
    {
        $this->_xmlRpc = new Zend_XmlRpc_Server();
        $this->_xmlRpc->setClass($this->getHandler());
        $this->getController()->getResponse()
            ->setHeader('Content-Type', 'text/xml')
            ->setBody($this->_xmlRpc->handle());
        return $this;
    }

    /**
     * Dispatch webservice fault
     *
     * @param int $code
     * @param string $message
     */
    public function fault($code, $message)
    {
        throw new Zend_XmlRpc_Server_Exception($message, $code);
    }
} // Class Mage_Api_Model_Server_Adapter_Customxmlrpc End
```
**Notes:** The setHandler, getHandler, setController and getController methods have a simple implementation that uses the Varien_Object getData and setData methods.

The run and fault methods are a native implementation for an XML-RPC webservice. The run method defines webservice logic in this adapter for creating an XML-RPC server to handle XML-RPC requests.
```php
public function run()
    {
        $this->_xmlRpc = new Zend_XmlRpc_Server();
        $this->_xmlRpc->setClass($this->getHandler());
        $this->getController()->getResponse()
            ->setHeader('Content-Type', 'text/xml')
            ->setBody($this->_xmlRpc->handle());
        return $this;
    }
```
The "fault" method allows you to send fault exceptions for XML-RPC service when handling requests.
```php
public function fault($code, $message)
    {
        throw new Zend_XmlRpc_Server_Exception($message, $code);
    }
```
#### Common Error Messages

The following are common error messages that you might receive when creating your own custom API.

**Invalid API path**

This error occurs when the methods listed in the **api.xml** file do not correspond exactly with those used in your PHP file.

For example, in your api.xml file, you might have this:
```
<config>
    <api>
        <resources>
            <checkout_cart translate="title" module="checkout">
                <model>checkout/cart_api</model>
                <title>Cart API</title>
                <methods>
                    <list translate="title" module="checkout">
                        <title>Retrieve cart data</title>
                        <method>info</method>
                    </list>
                </methods>
            </checkout_cart>
        </resources>
    ...
    </api>
</config>
```
You should have a corresponding info method in your PHP file.
```php
class Mage_Checkout_Model_Cart_Api extends Mage_Cart_Model_Api_Resource
{
    public function info()
    {
        ...
    }
}
```
If you are missing this method, the error "Invalid API path" will be returned.

---

## WS-I Compliance (wsi_compliance)

*Source: <https://devdocs-openmage.org/guides/m1x/api/soap/wsi_compliance.html>*

#### WS-I Compliance Mode

Magento provides you with the ability to use two modes for SOAP API V2. These are with WS-I compliance mode enabled and WS-I compliance mode disabled. The first one was introduced to make the system flexible, namely, to increase compatibility with .NET and Java programming languages.

To enable/disable the WS-I compliance mode, perform the following steps:

1.  In the Magento Admin Panel, go to **System \> Configuration \> Magento Core API**.
2.  In the WS-I Compliance drop-down, select **Yes** to enable the WS-I compliance mode and **No** to disable the WS-I compliance mode, correspondingly.\
    <img src="%7B%7B%20site.baseurl%20%7D%7D/guides/m1x/images/soap_wsi-config.png" style="border: 1px solid black" />

The WS-I compliant mode uses the same WSDL endpoint as SOAP API V2 does. The key difference is that XML namespaces are used in WS-I compliance mode.\

WSDL file with disabled WS-I compliance mode:\
<img src="%7B%7B%20site.baseurl%20%7D%7D/guides/m1x/images/soap_wsdl.png" style="border: 1px solid black" />

WSDL file with enabled WS-I compliance mode:\
<img src="%7B%7B%20site.baseurl%20%7D%7D/guides/m1x/images/soap_wsdl-wsi.png" style="border: 1px solid black" />

---
