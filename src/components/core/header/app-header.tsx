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

import { File } from "@babel/types";
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { VscDebugRestart } from "react-icons/all";
import { shallowEqual, useSelector } from "react-redux";
import { getAuthenticators, updateAuthenticationSequence } from "../../../api";
import Icon from "../../../assets/asgardeo-logo.svg";
import { AuthenticationSequenceInterface, AuthenticationSequenceType, AuthenticationStep } from "../../../models";
import { GenerateCodeFromAst } from "../../mapper";
import { AlertModal } from "../modals";


/**
 * App header component.
 *
 * @return {React.ReactElement}
 */
export const AppHeader: FunctionComponent = () : ReactElement => {

    const [authFactors, setAuthFactors] = useState<any>([]);
    const [visibleSuccessAlertModal, setVisibleSuccessAlertModal] = useState<boolean>(false);
    const [visibleErrorAlertModal, setVisibleErrorAlertModal] = useState<boolean>(false);
    const searchUrlPrams = new URLSearchParams(window.location.search);
    const appId: string|null = searchUrlPrams.get("appId");
    const callbackUrl: string|null = searchUrlPrams.get("callbackUrl");

    useEffect(() => {
        getAuthenticators()
            .then((response) => {
                setAuthFactors(response.data);
            })
            .catch((error) => {
                throw new Error(error);
            });
        getAuthenticators("idp")
            .then((response) => {
                setAuthFactors((elements: any)=>[...elements, ...response.data.identityProviders]);
            })
            .catch((error) => {
                throw new Error(error);
            });
    }, []);

    const getInfo = (option:any) : any => {
        return authFactors.filter((factor:any)=> {
            return factor.displayName ? factor.displayName === option : factor.name === option;
        });
    };

    const [ast, steps, subjectStepId, attributeStepId] : [File, AuthenticationStep[], number, number] = useSelector(
        (state:any) => {
            return [state.astReducer.ast, state.stepReducer.steps, state.stepReducer.subjectIdentifierStep,
                state.stepReducer.attributesIdentifierStep];
        },
        shallowEqual
    );

    const handleOnClickUpdate = () => {

        if (authFactors.length !==1 && appId !== null && callbackUrl !== null) {

            const stepsToRequest = steps.filter((step: any) =>
                step.authenticators.length !== 0
            ).map((step: any) => {
                return {
                    id: step.stepId,
                    options: step.authenticators.map((option: any) => {
                        const optionInfo: any = getInfo(option)[0];
                        return {
                            authenticator: optionInfo.type ? optionInfo.name :
                                optionInfo.federatedAuthenticators.authenticators.find(
                                    (authenticator:any) =>
                                        authenticator.authenticatorId===optionInfo.federatedAuthenticators.
                                            defaultAuthenticatorId
                                ).name,
                            idp: optionInfo.type ? optionInfo.type : optionInfo.name
                        };
                    })
                };
            });

            const authenticationSequence: AuthenticationSequenceInterface = {
                attributeStepId: attributeStepId,
                script: GenerateCodeFromAst(ast),
                steps: stepsToRequest,
                subjectStepId: subjectStepId,
                type: AuthenticationSequenceType.USER_DEFINED
            };

            updateAuthenticationSequence(authenticationSequence, appId).then(() => {
                setVisibleSuccessAlertModal(true);
            }).catch(() => {
                setVisibleErrorAlertModal(true);
            });
        } else {
            setVisibleErrorAlertModal(true);
        }

    };

    return (
        <header className="app-header">
            <img src={ Icon } alt="" className="app-header-icon"/>
            <div className="app-header-text">Authentication Flow Composer</div>
            <div>
                <button
                    className="app-header-button reset"
                    onClick={ ()=>window.location.reload() }
                >
                    <VscDebugRestart className="reset-icon"/> Reset
                </button>
                <button
                    className="app-header-button update"
                    onClick={ ()=> handleOnClickUpdate() }
                >
                    Update
                </button>
            </div>
            <AlertModal
                isOpen = { visibleSuccessAlertModal }
                type = "success"
                header= "Update Successful"
                content= "We will route you back to the console and you can continue from there."
                primaryButtonLabel= "Confirm"
                onButtonClick={ ()=>{ 
                    setVisibleSuccessAlertModal(false);
                    window.open(callbackUrl+"?activeTabIndex=4", "_self","noopener");
                } }
            />
            <AlertModal
                isOpen = { visibleErrorAlertModal }
                type = "error"
                header= "Error!"
                content= "Something went wrong."
                primaryButtonLabel= "OK"
                onButtonClick={ ()=>{ setVisibleErrorAlertModal(false); } }
            />
        </header>
    );
};
