/**
 * Copyright (c) 2021-2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { AuthProvider } from "@asgardeo/auth-react";
import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./styles/index.less";
import { Provider } from "react-redux";
import { App } from "./app";
import reportWebVitals from "./report-web-vitals";
import { store } from "./store";

ReactDOM.render(
    <Provider store={ store }>
        <AuthProvider
            config={ {
                baseUrl: process.env.REACT_APP_ASGARDEO_SERVICES_URL as string,
                clientID: process.env.REACT_APP_ASGARDEO_CLIENT_ID as string,
                scope: [ "openid","profile" ],
                signInRedirectURL: process.env.REACT_APP_ASGARDEO_LOGIN_CALLBACK_URL as string,
                signOutRedirectURL: process.env.REACT_APP_ASGARDEO_LOGOUT_CALLBACK_URL as string
            } }
        >
            <App />
        </AuthProvider>
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
