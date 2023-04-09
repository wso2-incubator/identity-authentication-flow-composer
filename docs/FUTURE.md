# Future of the Project

## Gaps in the existing implementation

### Gaps in Adaptive Script

- Need to define authentication steps within the script so that the users can define the entire authentication flow through both the visual editor and the script editor.
  
    - Have authenticationOptions - but it is for the step filtering. Refer [Adaptive Authentication JS API Reference](https://is.docs.wso2.com/en/latest/references/adaptive-authentication-js-api-reference/#step-filtering)
    
- Need to define the subject identifier and the attributes identifier through the script.

#### Suggested script -

```js
/* You can use Step.init(), useSubjectIdentifierFrom, useAttributesFrom,  
 * executeStep functions for define the authentication flow 
 * */
 
Step.init(1, ['basic']); //(stepId: number , authenticators: string[]):AuthenticationStep
Step.init(2, ['Google', 'Facebook']);
 
useSubjectIdentifierFrom(1); //Define subject identifier
useAttributesFrom(1); //Define attributes identifier
 
var rolesToStepUp = ['admin', 'manager'];
 
var onLoginRequest = function(context) {
   executeStep(1,
   {
     onSuccess: function(context) {
       
       // Extracting authenticated subject from the first step
       var user = context.currentKnownSubject;
       
       if (hasAnyOfTheRoles(user, rolesToStepUp)) { // Checking if the user is assigned to one of the given roles 
         executeStep(2); //onSuccess - Login Successful, onFail - stay on the same page with an error.
       }
       
     }
   }
 );
};
```

## Integrating the Composer with Console

### Identified Tasks

- [x] Remove @material/ui dependency and use semantic-ui instead
  
- [x] Use less instead of css
  
- [ ] Move styles to @wso2is/theme
  
- [ ] Refactor styles to align with console
  
- [ ] Refactor API calls and use the http client from the SDK for authorization rather than basicauth

- [ ] Make it a npm package

### Identified Improvements

- [ ] Analyze the bundle and see the footprint due to having babel in runtime.

- [ ] Think about the layout when integrated with the console. Maybe have a fullscreen option ?

- [ ] Replace SVGs used in visual flow with simple icons and show screens only when hover on them.

- [ ] Improve to support different cases such as onFail, switch case statements (Used in ACR-based template) etc.

- [ ] Add functionality to show errors in the UI to handle the following scenario.

```javascript
try {
    //...............
} catch (error) {
    throw new Error(error);
}
```

- [ ] Templates, roles are hardcoded currently. Have to get them from the server.

- [ ] Add an actual script and see the behaviour.

### Notes

Following code has been used to open the Authentication Flow Composer from the console in a separate window.

  ```ts
  const openAuthenticationFlowDesigner = (): void => {
     window.open(`http://localhost:3000?appId=${appId}&callbackUrl=${window.location}`, 
  '_self','noopener');
  };
  ```

Here callback url is used to route the user back to the console after updating the Authentication Flow from the composer.

## Integrating Language Server

- Require three components

    - Language Server - WSO2 Identity server’s language server

    - Language Client -  [Monaco-language-client](https://github.com/TypeFox/monaco-languageclient) can be connected to the script editor in the Authentication flow Composer which was implemented using Monaco.

    - Proxy for communication - jsonrpc-ws-proxy can be used.

- Problems encountered:

    - Websocket is required to communicate between language server and client.

      But since the Identity Server’s Language server is secured, authentication is required in communication.
      
      But there is no way to send authorization headers with the websocket in the client(browser) side.

    - Editor feels like lagging.

Blogs referred:

[1] https://medium.com/dscddu/language-server-protocol-adding-support-for-multiple-language-servers-to-monaco-editor-a3c35e42a98d

[2] https://medium.com/@wathsara/introduction-to-language-server-protocol-lsp-644a61dcd4be

## Implement the Failure Flow

- Need to think about a way of layouting the flow when adding the failure flow to the authentication flow composer.

    - May be design an algorithm for layouting

    - Or else try automatic layout - React flow renderer’s documentation recently updated for supporting an automatic layout with dagre library -  https://reactflow.dev/examples/layouting
