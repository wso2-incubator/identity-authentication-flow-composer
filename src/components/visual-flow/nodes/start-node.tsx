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
import { Handle, Position } from "react-flow-renderer";

/**
 * Start Node component.
 * This is a custom node supported by react flow renderer library.
 * See {@link https://reactflow.dev/docs/api/node-types/} for its documentation
 * and {@link https://reactflow.dev/examples/custom-node/} for an example
 *
 * @return {React.ReactElement}
 */
export const StartNode: FunctionComponent = () : ReactElement => {

    return (
        <div className="start">
            <Handle
                className="hidden-handle"
                type="target"
                position={ Position.Left }
                id="targetLeft"
            />
            <Handle
                className="hidden-handle"
                type="target"
                position={ Position.Top }
                id="targetTop"
            />
            <svg viewBox="0 0 300 140" width="120">
                <g>
                    <rect x="10" y="10" rx="60" ry="60" height="120" width="280" fill="none" stroke="#0A84AE"
                        strokeWidth="6"/>
                    <circle cx="70" cy="70" r="38" stroke="#0A84AE" strokeWidth="6" fill="none" />
                    <text x="122" y="88" fill="#0A84AE" fontSize="42" fontWeight="750">START</text>
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink" x="-78px" y="52px" height="35"
                        viewBox="0 0 320 320" enableBackground="new 0 0 320.001 320.001;" xmlSpace="preserve">
                        <path
                            fill="#0A84AE"
                            d="M295.84,146.049l-256-144c-4.96-2.784-11.008-2.72-15.904,0.128C19.008,5.057,16,10.305,16,
                            16.001v288 c0,5.696,3.008,10.944,7.936,13.824c2.496,1.44,5.28,2.176,8.064,2.176c2.688,0,
                            5.408-0.672,7.84-2.048l256-144 c5.024-2.848,8.16-8.16step,8.16-13.952S300.864,148.897,295.84
                            ,146.049z"
                        />
                    </svg>
                </g>
            </svg>
            <Handle
                className="hidden-handle"
                type="source"
                position={ Position.Right }
                id= "sourceRight"
            />
        </div>
    );
};
