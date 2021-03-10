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

import React, { FunctionComponent, ReactComponentElement, ReactElement } from "react";

/**
 * Action Card Component Prop types.
 */
export interface ActionCardProps {
    /**
     * Icon of the action card
     */
    icon: ReactComponentElement<any>,
    /**
     * Heading for the action card
     */
    heading: string,
    /**
     * SubHeading for the action card
     */
    subHeading: string,
    /**
     * Callback function for on click of the component
     */
    onClick: ()=>void
}

/**
 * Action Card Component.
 *
 * @param {ActionCardProps} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const ActionCard: FunctionComponent<ActionCardProps> = (
    props: ActionCardProps
) : ReactElement => {

    const {
        icon,
        heading,
        subHeading,
        onClick
    } = props;

    return (
        <div className="action-card-container" onClick={ ()=>onClick() }>
            <div className="action-card-image-container">
                { icon }
            </div>
            <div className="action-card-bottom-container">
                <div className="action-card-bottom-text-container">
                    <div className="action-card-heading">{ heading }</div>
                    <div className="action-card-sub-heading">{ subHeading }</div>
                </div>
            </div>
        </div>
    );
};
