# Authentication Flow Composer
Authentication Flow Composer is a UI-based tool to design and configure the authentication flows for the WSO2 Identity
Server. This approach allows users to define the authentication flows without any prior syntax knowledge.

### Setup Identity Server for the application

* Install WSO2 Identity Server.
* Add the following code to <IS_HOME>/repository/conf/deployment.toml in WSO2 Identity Server to allow CORS
```toml
    [cors]
    allowed_origins = [
       "http://localhost:3000"
    ]
    supported_methods = [
       "GET",
       "POST",
       "HEAD",
       "OPTIONS",
       "PUT",
       "PATCH",
       "HEAD",
       "DELETE",
       "PATCH"
    ]
    exposed_headers = [ "Location" ]
```    

    
* Start the Identity Server using following commands from <IS_HOME>/bin.

##### 
    Linux   --> sh wso2server.sh
    Windows --> wso2server.bat

### Run the Application

* Download or clone the project source code from [https://github.com/wso2-incubator/identity-authentication-flow-composer](https://github.com/wso2-incubator/identity-authentication-flow-composer)
* Run `npm install` from the command line in the project root directory.
* Run `npm start`.
* Open http://localhost:3000 to view the application in the browser.
