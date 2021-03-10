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

import { FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import React, { FunctionComponent, ReactElement, useState } from "react";
import ReactModal from "react-modal";
import Select from "react-select";

const roles = [
    { label:"admin", value: "admin" },
    { label:"manager", value: "manager" },
    { label:"accountant", value: "accountant" },
    { label:"everyone", value: "everyone" }
];

/**
 * Conditions List Modal Prop types.
 */
export interface ConditionsListProps {
    /**
     * Is the conditions list modal open
     */
    isOpen: boolean,
    /**
     * Callback function for done button
     */
    onDone: (checkedCondition:string, params?:any)=>void,
    /**
     * Callback function for cancel selection
     */
    onCancel: ()=>void
}

export const ConditionsList: FunctionComponent<ConditionsListProps> = (
    props: ConditionsListProps
) : ReactElement => {

    const {
        isOpen,
        onDone,
        onCancel
    } = props;

    const [checkedCondition, setCheckedCondition] = useState("hasRole");
    const [customConditionName, setCustomConditionName] = useState("");
    const [selectedRoles, setSelectedRoles] :[any, any] = useState([roles[0], roles[1]]);
    const [minLoginAttempts, setMinLoginAttempts] :[any,any] = useState(3);

    return (
        <ReactModal
            isOpen={ isOpen }
            className="modal condition-list"
            overlayClassName="overlay"
            bodyOpenClassName="modalOpened"
        >
            <div className="modal-header">
                    Select Conditions
                <div className="modal-subheader">Select a condition to configure the authentication flow.</div>
            </div>
            <div className="condition-modal-content-container">
                <FormControl component="fieldset">
                    <RadioGroup
                        className="condition-group"
                        aria-label="conditions"
                        name="conditions1"
                        value={ checkedCondition }
                        onChange={ (event, value)=>setCheckedCondition(value) }
                    >
                        <div className="condition-container">
                            <FormControlLabel value="hasRole" control={ <Radio /> } label="Has Role" />
                            <p className="condition-description">
                                Checking if the user is assigned to one of the given roles
                            </p>
                            { checkedCondition==="hasRole" &&
                                <Select
                                    options={ roles }
                                    isMulti
                                    onChange={ (options)=>
                                        setSelectedRoles(options) }
                                    value={ selectedRoles }
                                    className="condition-selector"
                                />
                            }
                        </div>

                        <div className="condition-container">
                            <div>
                                <FormControlLabel
                                    value="isExceedInvalidAttempts"
                                    control={ <Radio /> }
                                    label="Is Exceed Invalid Attempts"
                                />
                                { checkedCondition==="isExceedInvalidAttempts" &&
                                    <input
                                        className="textInputLoginAttemptsNo"
                                        value={ minLoginAttempts }
                                        onChange={ (event)=>
                                            setMinLoginAttempts(event.target.value)
                                        }
                                    />
                                }
                            </div>
                            <p className="condition-description">
                                Checking if the user exceeds given number of failed login attempts
                            </p>
                        </div>

                        <div className="condition-container">
                            <FormControlLabel value="custom" control={ <Radio /> } label="Custom condition" />
                            <p className="condition-description">You can define a custom condition using this</p>
                            { checkedCondition==="custom" &&
                                <input
                                    className="condition-input"
                                    placeholder={ "Condition name" }
                                    onChange={ (event)=>
                                        setCustomConditionName(event.target.value)
                                    }
                                />
                            }
                        </div>

                    </RadioGroup>
                </FormControl>
            </div>
            <div className="modal-button-container">
                <button
                    className="primary-button float-right"
                    disabled={ checkedCondition==="custom" && customConditionName==="" }
                    onClick={ ()=>{
                        if(checkedCondition==="custom"){
                            onDone(customConditionName);
                        }else if(checkedCondition==="hasRole"){
                            onDone(checkedCondition, selectedRoles);
                        }else if(checkedCondition==="isExceedInvalidAttempts") {
                            onDone(checkedCondition, minLoginAttempts);
                        }else {
                            onDone(checkedCondition);
                        }
                    } }
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
        </ReactModal>
    );
};
