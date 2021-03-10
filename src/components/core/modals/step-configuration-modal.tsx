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

import { Checkbox, ListItemText, MenuItem } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { getAuthenticators } from "../../../api";
import { setAttributesIdentifier, setSubjectIdentifier } from "../../../store/actions/actions";
import { Authenticator } from "../cards";
import { Hint } from "../typography";

/**
 * Step Configuration Modal Prop types.
 */
export interface StepConfigurationModalProps {
    /**
     * Is the step configuration modal open
     */
    isOpen: boolean,
    /**
     * Callback function for done button
     */
    onDone: (checkedList: any)=>void,
    /**
     * Authentication step id
     */
    step: number,
    /**
     * Next authentication step id
     */
    nextStep: number,
    /**
     * Callback function for cancel selection
     */
    onCancel: ()=>void
}

/**
 * Step Configuration Modal.
 *
 * @param {StepConfigurationModalProps} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const StepConfigurationModal: React.FC<StepConfigurationModalProps> = (
    props: StepConfigurationModalProps
) => {
    
    const { 
        isOpen, 
        onDone, 
        step, 
        nextStep, 
        onCancel 
    } = props;

    let factors: any[] = [];
    let factorsOfFirstStep: any[] = [];
    let prefix : any = null;
    if (step===null){
        prefix = "New";
    }

    const [authFactors, setAuthFactors] = useState([]);
    const [idpList, setIdpList] = useState([]);

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
                setIdpList(response.data.identityProviders);
            })
            .catch((error) => {
                throw new Error(error);
            });
    }, []);

    const [steps, useSubjectFrom, useAttributesFrom] : any = useSelector(
        (state:any) => {
            return [state.stepReducer.steps,state.stepReducer.useSubjectFrom, state.stepReducer.useAttributesFrom];
        },
        shallowEqual
    );

    const dispatch: Dispatch<any> = useDispatch();

    const changeSubjectIdentifier = React.useCallback(
        (step: number) => dispatch(setAttributesIdentifier(step)),
        [dispatch]
    );

    const changeAttributesFRom = React.useCallback(
        (step: number) => dispatch(setSubjectIdentifier(step)),
        [dispatch]
    );

    const currentStep = steps.filter((element:any)=>element.id===step);
    if (currentStep.length>0){
        factors=currentStep[0].options;
    }

    const firstStep = steps.filter((element:any)=>element.id===1);
    if (firstStep.length>0){
        factorsOfFirstStep=firstStep[0].options;
    }

    const [checkedList, setCheckedList] : [any, any] = useState(factors);
    const [useSubjectFromThisStep, setUseSubjectFromThisStep] : [any, any] = useState(useSubjectFrom===step);
    const [useAttributesFromThisStep, setUseAttributesFromThisStep] : [any, any] = useState(useAttributesFrom===step);

    const onChange = (name?:string) => {
        if(checkedList.indexOf(name)===-1){
            setCheckedList((checkedList:any[])=>[...checkedList, name]);
        }else{
            setCheckedList(
                (checkedList:any[])=>[
                    ...checkedList.slice(0, checkedList.indexOf(name)),
                    ...checkedList.slice(checkedList.indexOf(name) + 1)
                ]
            );
        }
    };

    const onClick = () => {
        if (useSubjectFrom===step && !useSubjectFromThisStep){
            changeSubjectIdentifier(1);
        }else if (!(useSubjectFrom===step) && useSubjectFromThisStep){
            if (step===null && nextStep===null) {
                changeSubjectIdentifier(steps.length+1);
            }else if (step===null) {
                changeSubjectIdentifier(nextStep);
            }else {
                changeSubjectIdentifier(step);
            }
        }
        if (useAttributesFrom===step && !useAttributesFromThisStep){
            changeAttributesFRom(1);
        }else if(!(useAttributesFrom===step) && useAttributesFromThisStep){
            if (step===null && nextStep===null){
                changeAttributesFRom(steps.length+1);
            }else if (step===null){
                changeAttributesFRom(nextStep);
            }else {
                changeAttributesFRom(step);
            }
        }
        onDone(checkedList);
    };

    return (
        <ReactModal
            isOpen={ isOpen }
            className="modal step-config-modal"
            overlayClassName="overlay"
            bodyOpenClassName="modalOpened"
        >
            <div className="step-config-container">
                <div className="modal-header">
                    { prefix } Step { step } Configuration
                    <div className="modal-subheader">
                        Configure authentication step by selecting the local/federated authenticators.
                    </div>
                </div>
                <div className="step-config-menu">
                    <div className="menu-item-container">
                        <MenuItem value="subject" className="menu-item">
                            <Checkbox
                                className="checkbox"
                                color="default"
                                checked={ useSubjectFromThisStep }
                                onChange={ (event, checked) => setUseSubjectFromThisStep(checked) }
                            />
                            <ListItemText primary={ "Use subject identifier from this step" } className="menuItemName"/>
                        </MenuItem>
                        <Hint hint="This option will use the subject identifier from this step"/>
                    </div>
                    <div className="menu-item-container">
                        <MenuItem value="attributes" className="menu-item">
                            <Checkbox
                                className="checkbox"
                                color="default"
                                checked={ useAttributesFromThisStep }
                                onChange={ (event, checked) => setUseAttributesFromThisStep(checked) }
                            />
                            <ListItemText primary={ "Use attributes from this step" } className="menuItemName"/>
                        </MenuItem>
                        <Hint hint="This option will use the attributes identifier from this step"/>
                    </div>
                </div>

                <div className="authenticators-header">Authenticators</div>
                <div className="authenticators-section-header">Local</div>
                <div className="authenticators-section-container">
                    { authFactors.map((factor: any) => {
                        let disabled = false;
                        if(factor.displayName==="fido" || factor.displayName==="totp"){
                            if (step===1 || nextStep==1) {
                                disabled = true;
                            }else if(factorsOfFirstStep.indexOf("basic")===-1 &&
                                factorsOfFirstStep.indexOf("identifier-first")===-1){
                                disabled = true;
                            }
                        }
                        const checked = checkedList.indexOf(factor.displayName)!==-1 && !disabled;
                        return(
                            <Authenticator
                                key={ factor.id }
                                factorName={ factor.displayName }
                                factorType={ factor.type }
                                checked={ checked }
                                onChange={ onChange }
                                disabled={ disabled }
                            />
                        );})
                    }
                </div>
                <div className="authenticators-section-header">Social Login</div>
                <div className="authenticators-section-container">
                    { idpList.map((factor: any) => {
                        const checked = checkedList.indexOf(factor.name)!==-1;
                        return(
                            <Authenticator
                                key={ factor.id }
                                factorName={ factor.name }
                                factorType={ factor.type }
                                checked={ checked }
                                onChange={ onChange }
                                disabled={ false }
                            />
                        );
                    }) }
                </div>

                <div className="modal-button-container">
                    <div>
                        <button
                            className="primary-button float-right"
                            onClick={ ()=>onClick() }
                            disabled={ checkedList.length===0 }
                        >
                            Done
                        </button>
                        <button
                            className="secondary-button"
                            onClick={ ()=>onCancel() }
                        >
                            Cancel
                        </button>
                    </div>
                </div>

            </div>
        </ReactModal>
    );
};
