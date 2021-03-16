<h1 align = "center">Authentication Flow Composer</h1>

<p align="center">
  <br>
  Authentication Flow Composer is a UI-based tool to design and configure the authentication flows for the WSO2 Identity
  Server. 
  This approach allows users to define the authentication flows without any prior syntax knowledge.
  <br>
</p>

<hr>

## Getting Started

### Prerequisites

* Add the following code to `<IS_HOME>/repository/conf/deployment.toml` in WSO2 Identity Server to allow CORS.
  In this guide, the installation location of WSO2 Identity Server is referred to as `<IS_HOME>`.
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

* [Start the WSO2 Identity Server](https://is.docs.wso2.com/en/latest/setup/running-the-product/#starting-on-windowslinuxmac-os).

### Run the Application

* Download or clone the project source code from [https://github.com/wso2-incubator/identity-authentication-flow-composer](https://github.com/wso2-incubator/identity-authentication-flow-composer)
* Run `npm install` from the command line in the project root directory to install all dependencies.
* Run `npm start`.
* Open http://localhost:3000 to view the application in the browser.

## Contributing

We encourage you to report issues, improvements and feature requests regarding the project through [GitHub Issue Tracker](https://github.com/wso2-incubator/identity-authentication-flow-composer/issues).

## License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.
