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
import { Handle, Node, Position } from "react-flow-renderer";
import Jwt from "../../../assets/jwt.png";
import { Facebook, Fido, Google, Instagram, Totp, Twitter } from "../../core";

/**
 * Authentication option node interface prop types.
 */
export type AuthenticationOptionNodeInterface = Node;

/**
 * Authentication Option Node component.
 *
 * @param {AuthenticationOptionNodeInterface} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const AuthenticationOptionNode : FunctionComponent<AuthenticationOptionNodeInterface> = (
    props: AuthenticationOptionNodeInterface
) : ReactElement => {

    const {
        data
    } = props;

    const type: string = data.type;

    return (
        <div className="authentication-option-node">
            <Handle
                className="hidden-handle"
                type="target"
                position={ Position.Left }
                id="targetLeft"
            />
            { type === "Google" ? <Google/>
                : type === "Facebook" ? <Facebook/>
                    : type === "Instagram" ? <Instagram/>
                        : type === "Twitter" ? <Twitter/>
                            : type === "fido" ? <Fido/>
                                : type === "totp" ? <Totp/>
                                    :<div className="common-authentication-option-node">
                                        <div className="common-authentication-option-node-text">{ type }</div>
                                        { type === "jwt-basic" ?
                                            <img src={ Jwt } alt="Jwt" width="150" height="106"/>
                                            :
                                            <div>
                                                <svg className="authentication-option-common-icon" width="50"
                                                    height="50" viewBox="0 0 512.005 512.005">
                                                    <path className="path fill secondary"
                                                        d="M256.003 234.672c-11.76 0-21.333 9.573-21.333 21.333 0 7.792
                                                        4.409 14.329 10.667 18.053v13.947a10.66 10.66 0 0010.667 10.667
                                                        10.66 10.66 0 0010.667-10.667v-13.947c6.258-3.724 10.667-10.262
                                                        10.667-18.053-.002-11.76-9.575-21.333-21.335-21.333zM256.003
                                                        149.339c-17.646 0-32 14.354-32
                                                        32v10.667h64v-10.667c0-17.646-14.355-32-32-32z"/>
                                                    <path className="path fill secondary"
                                                        d="M440.888 64.609l-181.333-64a10.65 10.65 0 00-7.104
                                                        0l-181.333 64a10.683 10.683 0 00-7.115 10.063v128c0 165.646
                                                        24.563 226.188 187.198 308.188 1.51.76 3.156 1.146 4.802
                                                        1.146a10.67 10.67 0 004.802-1.146c162.635-82 187.198-142.542
                                                        187.198-308.188v-128c0-4.521-2.855-8.552-7.115-10.063zm-88.885
                                                        255.396c0 11.76-9.573 21.333-21.333 21.333H181.336c-11.76
                                                        0-21.333-9.573-21.333-21.333V213.339c0-11.76 9.573-21.333
                                                        21.333-21.333v-10.667c0-41.167 33.5-74.667 74.667-74.667s74.667
                                                        33.5 74.667 74.667v10.667c11.76 0 21.333 9.573 21.333
                                                        21.333v106.666z"/>
                                                </svg>
                                            </div>
                                        }
                                    </div>
            }
            <Handle
                className="hidden-handle"
                type="source"
                position={ Position.Right }
                id="sourceRight"
            />
        </div>
    );

};
