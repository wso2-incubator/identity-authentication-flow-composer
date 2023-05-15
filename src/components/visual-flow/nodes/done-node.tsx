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
import { AiOutlineCheckCircle } from "react-icons/ai";

/**
 * Done Node component.
 * This is a custom node supported by react flow renderer library.
 * See {@link https://reactflow.dev/docs/api/node-types/} for its documentation
 * and {@link https://reactflow.dev/examples/custom-node/} for an example
 *
 * @return {React.ReactElement}
 */
export const DoneNode : FunctionComponent = () : ReactElement => {

    return (
        <div className="done-node">
            <Handle
                className="hidden-handle"
                id="targetLeft"
                type="target"
                position={ Position.Left }
            />
            <Handle
                className="hidden-handle"
                type="target"
                position={ Position.Top }
                style = { { top: 40 } }
                id="targetTop"
            />
            <div>
                <AiOutlineCheckCircle/>
            </div>
            <div className="done-node-bottom-text">Done</div>
        </div>
    );
};
