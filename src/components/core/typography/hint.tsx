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
import { FaInfoCircle } from "react-icons/fa";

/**
 * Hint Component Props.
 */
export interface HintProps {
    /**
     * Text to include in the hint
     */
    hint: string
}

/**
 * Hint Component.
 *
 * @param {HintProps} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const Hint: FunctionComponent<HintProps> = (props: HintProps) : ReactElement => {

    const {
        hint
    } = props;

    return (
        <div className="hint-container">
            <FaInfoCircle className="hint-icon"/>
            <div className="hint-text">{ hint }</div>
        </div>
    );
};
