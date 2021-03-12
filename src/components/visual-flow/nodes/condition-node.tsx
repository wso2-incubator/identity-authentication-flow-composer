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

/**
 * Condition node interface prop types.
 */
export type ConditionNodeInterface = Node;

/**
 * Condition Node component.
 *
 * @param {ConditionNodeInterface} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const ConditionNode : FunctionComponent<ConditionNodeInterface> = (
    props: ConditionNodeInterface
) : ReactElement => {

    const {
        data
    } = props;

    const condition: string = data.condition;
    const args: string[] = data.args;

    return (
        <div className="condition-node">
            <Handle
                className="hidden-handle"
                id="targetLeft"
                type="target"
                position={ Position.Left }
            />
            <div>
                <div>
                    <svg height="58" width="58" viewBox="0 0 50 50">
                        <circle cx="25" cy="25" r="20" stroke="#0A84AE" strokeWidth="3" fill="none"/>
                        <g>
                            <circle cx="20" cy="20" r="3" stroke="#0A84AE" strokeWidth="3" fill="none"/>
                            <circle cx="30" cy="32" r="3" stroke="#0A84AE" strokeWidth="3" fill="none"/>
                            <line x1="20" y1="25" x2="20" y2="35" stroke="#0A84AE" strokeWidth="3"/>
                            <line x1="30" y1="16" x2="30" y2="27" stroke="#0A84AE" strokeWidth="3"/>
                            <line x1="25" y1="17" x2="30" y2="17" stroke="#0A84AE" strokeWidth="3"/>
                        </g>
                    </svg>
                </div>
                <div className="condition-node-text-container">
                    <div>{ condition }</div>
                    <div>{ args }</div>
                </div>
            </div>
            <Handle
                className="hidden-handle"
                type="source"
                position={ Position.Right }
                id="sourceRight"
            />
            <Handle
                className="hidden-handle"
                type="source"
                position={ Position.Top }
                id="sourceTop"
            />
        </div>
    );
};
