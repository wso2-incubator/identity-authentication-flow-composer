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

import React, { FunctionComponent, ReactElement, useState } from "react";
import { Form, FormInput, Modal, Radio } from "semantic-ui-react";

const roles = [
    { key:"admin", text:"admin", value: "admin" },
    { key:"manager", text:"manager", value: "manager" },
    { key:"accountant", text:"accountant", value: "accountant" },
    { key:"everyone", text:"everyone", value: "everyone" }
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
    onDone: (checkedCondition: string, params?: any) => void,
    /**
     * Callback function for cancel selection
     */
    onCancel: () => void
}

/**
 * Condition List Modal.
 *
 * @param {ConditionsListProps} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
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
    const [selectedRoles, setSelectedRoles] :[any, any] = useState(["admin", "manager"]);
    const [minLoginAttempts, setMinLoginAttempts] :[any,any] = useState(3);

    return (
        <Modal
            open={ isOpen }
            className="modal condition-list"
        >
            <Modal.Header>
                Select Conditions
                <div className="modal-subheader">Select a condition to configure the authentication flow.</div>
            </Modal.Header>

            <Modal.Content>
                <Form>
                    <Form.Field>
                        <Radio
                            label="Has Role"
                            name="radioGroup"
                            value="hasRole"
                            checked={ checkedCondition === "hasRole" }
                            onChange={ () => setCheckedCondition("hasRole") }
                        />
                        <p className="condition-description">
                            Checking if the user is assigned to one of the given roles
                        </p>
                        { checkedCondition === "hasRole" &&
                            <Form.Dropdown
                                className="condition-input"
                                placeholder="Select Roles"
                                value={ selectedRoles }
                                fluid multiple selection
                                onChange={ (element, props)=>
                                    setSelectedRoles(props.value) }
                                options={ roles }
                            />
                        }
                    </Form.Field>
                    <Form.Field>
                        <div className="wrapper-flex-raw">
                            <Radio
                                label="Is Exceed Invalid Attempts"
                                name="radioGroup"
                                value="isExceedInvalidAttempts"
                                checked={ checkedCondition === "isExceedInvalidAttempts" }
                                onChange={ () => setCheckedCondition("isExceedInvalidAttempts") }
                            />
                            { checkedCondition === "isExceedInvalidAttempts" &&
                                <FormInput
                                    className="text-input-login-attempts-no"
                                    value={ minLoginAttempts }
                                    onChange={ (event) => setMinLoginAttempts(event.target.value) }
                                />
                            }
                        </div>
                        <p className="condition-description">
                            Checking if the user exceeds given number of failed login attempts
                        </p>
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label="Custom condition"
                            name="radioGroup"
                            value="custom"
                            checked={ checkedCondition === "custom" }
                            onChange={ () => setCheckedCondition("custom") }
                        />
                        <p className="condition-description">
                            You can define a custom condition using this
                        </p>
                        { checkedCondition === "custom" &&
                            <FormInput
                                className="condition-input"
                                placeholder="Condition name"
                                onChange={
                                    (event)=>setCustomConditionName(event.target.value)
                                }
                            />
                        }
                    </Form.Field>
                </Form>
            </Modal.Content>

            <Modal.Actions>
                <button
                    className="primary-button float-right"
                    disabled={ (checkedCondition === "custom" && customConditionName === "") ||
                        (checkedCondition === "hasRole" && selectedRoles.length === 0)
                    }
                    onClick={ ()=>{
                        if (checkedCondition === "custom") {
                            onDone(customConditionName);
                        } else if (checkedCondition === "hasRole") {
                            onDone(checkedCondition, selectedRoles);
                        } else if (checkedCondition === "isExceedInvalidAttempts") {
                            onDone(checkedCondition, minLoginAttempts);
                        } else {
                            onDone(checkedCondition);
                        }
                    } }
                >
                        Done
                </button>
                <button
                    className="secondary-button float-left"
                    onClick={ () => onCancel() }
                >
                        Cancel
                </button>
            </Modal.Actions>
        </Modal>
    );
};
