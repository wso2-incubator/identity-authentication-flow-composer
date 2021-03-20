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
import { BiCheckCircle, BiErrorCircle } from "react-icons/all";
import { Modal } from "semantic-ui-react";

/**
 * Alert modal Prop types.
 */
export interface AlertModalProps {
    /**
     * Type of the alert
     */
    type: "success"|"error",
    /**
     * Header text of the alert
     */
    header: string,
    /**
     * Content of the alert
     */
    content: string,
    /**
     * Label for the primary button
     */
    primaryButtonLabel: string,
    /**
     * Is the alert modal open
     */
    isOpen: boolean,
    /**
     * Callback function for the primary button of the alert modal
     */
    onButtonClick: () => void
}

/**
 * Alert Modal.
 *
 * @param {AlertModalProps} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const AlertModal: FunctionComponent<AlertModalProps> = (
    props: AlertModalProps
): ReactElement => {

    const {
        type,
        header,
        content,
        primaryButtonLabel,
        isOpen,
        onButtonClick
    } = props;

    return (
        <Modal
            open={ isOpen }
            className="modal alert-modal"
        >
            <Modal.Header>
                <div className="modal-header-with-icon">
                    { type === "success" ? <BiCheckCircle className="success-icon"/> :
                        <BiErrorCircle className="error-icon"/>
                    }
                    { header }
                </div>
            </Modal.Header>
            <Modal.Actions>
                <div className="modal-content">{ content }</div>
            </Modal.Actions>
            <Modal.Actions>
                <div className="button-container">
                    <div>
                        <button
                            className="primary-button"
                            onClick={ () => onButtonClick() }
                        >
                            { primaryButtonLabel }
                        </button>
                    </div>
                </div>
            </Modal.Actions>
        </Modal>
    );
};
