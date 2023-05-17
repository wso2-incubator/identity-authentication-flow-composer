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

import { useAuthContext } from "@asgardeo/auth-react";
import React, { FunctionComponent, ReactElement, useEffect } from "react";
import { AppHeader, PreLoader, ScriptBasedFlow, Sidebar, VisualFlow } from "./components";

/**
 * Main App component.
 *
 * @return {React.ReactElement}
 */
export const App: FunctionComponent = (): ReactElement => {
    const { state, trySignInSilently, signIn } = useAuthContext();
    const { isAuthenticated, isLoading } = state;

    useEffect(() => {
        if (isAuthenticated || isLoading) {
            return;
        }

        trySignInSilently()
            .then((response) => {
                if (!response) {
                    signIn();
                }
            })
            .catch(() => {
                signIn();
            });
    }, [isAuthenticated, isLoading, signIn, trySignInSilently]);

    if (isLoading || !isAuthenticated) {
        return <PreLoader />;
    }

    return (
        <div className="app">
            <AppHeader />
            <div className="app-body">
                <Sidebar />
                <VisualFlow />
                <ScriptBasedFlow />
            </div>
        </div>
    );
};
