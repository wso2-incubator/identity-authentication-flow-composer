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
import { BiCircle } from "react-icons/all";

/**
 * Connector Node component.
 *
 * @return {React.ReactElement}
 */
export const ConnectorNode : FunctionComponent = (): ReactElement => {

    return (
        <div className="connector-node">
            <Handle
                className="hidden-handle"
                type="target"
                position={ Position.Top }
                id="targetTop"
            />
            <Handle
                className="hidden-handle"
                type="target"
                position={ Position.Left }
                id="targetLeft"
            />
            <div>
                <BiCircle/>
            </div>
            <Handle
                className="hidden-handle"
                type="target"
                position={ Position.Bottom }
                id="targetBottom"
            />
            <Handle
                className="hidden-handle"
                type="source"
                position={ Position.Right }
                id= "sourceRight"
            />
        </div>
    );
};
