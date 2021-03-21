/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
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

import React, { FunctionComponent, ReactElement } from "react";
import { Popup } from "semantic-ui-react";
import { AuthenticatorIcons } from "../svg";

/**
 * Authenticator Card Component Prop types.
 */
export interface AuthenticatorProps {
    /**
     * Authentication factor's name
     */
    factorName: string,
    /**
     * Authentication factor's type
     */
    factorType: string,
    /**
     * Whether the authentication factor is selected
     */
    checked: boolean,
    /**
     * Callback function on change the authentication factor selection status
     */
    onChange: (factorName: string) => void
    /**
     * Whether the authentication factor is disabled
     */
    disabled: boolean,
}

/**
 * Authenticator Component.
 *
 * @param {AuthenticatorProps} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const Authenticator: FunctionComponent<AuthenticatorProps> = (
    props: AuthenticatorProps
) : ReactElement => {

    const {
        factorName,
        factorType,
        checked,
        onChange,
        disabled
    } = props;

    return(
        <div className="authenticator-wrapper">

            <Popup
                trigger={
                    <span className="disabled-button-wrapper">
                        <button
                            className={ checked ? "authenticator select": "authenticator unselect" }
                            onClick={ ()=> {
                                onChange(factorName);
                            } }
                            disabled={ disabled }
                        >
                            <div className={ factorType }>
                                <AuthenticatorIcons
                                    type={ factorName+"-icon" }
                                    iconX={ 0 }
                                    iconY={ 0 }
                                    iconHeight={ 40 }
                                    iconWidth={ 40 }
                                />
                            </div>
                        </button>
                    </span>
                }
                disabled = { factorName !== "fido" && factorName !== "totp" }
                content = { "This is a second factor authenticator and this can be used only if a basic authenticator" +
                        " or a identifier-first authenticator has been added in a previous step" }
                position="top center"
                wide={ true }
            />

            <Popup
                content={ factorName }
                trigger={
                    <div className="authenticator-name">
                        { factorName }
                    </div>
                }
                position="bottom center"
            />
        </div>
    );
};
