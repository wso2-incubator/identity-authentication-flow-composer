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
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { Template } from "./sidebar-template";
import templates from "../../../api/templates.json";

/**
 * Sidebar component.
 *
 * @return {React.ReactElement}
 */
export const Sidebar: FunctionComponent = () : ReactElement => {

    return (
        <div className="sidebar">
            <h3 className="sidebar-header">
                Templates
            </h3>
            <div className="sidebar-options">
                { templates.map((template: any) => (
                    <Template
                        key={ template.name }
                        templateObject={ template }
                    />
                )) }
            </div>
            <div className="sidebar-bottom">
                <AiOutlineCopyrightCircle className="copyright-icon"/>
                2021 WSO2
            </div>
        </div>
    );
};
