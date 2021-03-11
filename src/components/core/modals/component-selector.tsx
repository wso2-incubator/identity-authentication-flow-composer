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
import { Modal } from "semantic-ui-react";
import { ReactComponent as ConditionIcon } from "../../../assets/condition.svg";
import { ReactComponent as StepIcon } from "../../../assets/step.svg";
import { ActionCard } from "../cards";

/**
 * Component Selector modal Prop types.
 */
export interface ComponentSelectorProps {
    /**
     * Is the component selector modal open
     */
    isOpen: boolean,
    /**
     * Callback function for cancel button
     */
    onCancel: ()=>void,
    /**
     * Callback function for step selection
     */
    onStepSelection: ()=>void,
    /**
     * Callback function for condition selection
     */
    onConditionSelection: ()=>void
}

/**
 * Component Selector Modal.
 *
 * @param {ComponentSelectorProps} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const ComponentSelector: FunctionComponent<ComponentSelectorProps> = (
    props: ComponentSelectorProps
) : ReactElement => {

    const {
        isOpen,
        onCancel,
        onStepSelection,
        onConditionSelection
    } = props;

    return (
        <Modal
            open={ isOpen }
            className="modal component-selector"
        >
            <Modal.Header>
                    Select a component
            </Modal.Header>
            <Modal.Content>
                <div className="modal-action-card-container">
                    <ActionCard
                        icon={ <StepIcon/> }
                        heading="Authentication Step"
                        subHeading="Add an authentication step by selecting authenticators"
                        onClick={ ()=>onStepSelection() }
                    />
                    <ActionCard
                        icon={ <ConditionIcon/> }
                        heading="Condition"
                        subHeading="Add a condition by selecting predefined conditions"
                        onClick={ ()=>onConditionSelection() }
                    />
                </div>
            </Modal.Content>
            <Modal.Actions>
                <button className="secondary-button float-right" onClick={ ()=>onCancel() }>Cancel</button>
            </Modal.Actions>
        </Modal>
    );
};
