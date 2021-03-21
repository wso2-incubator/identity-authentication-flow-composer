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

import { File } from "@babel/types";
import React, { FunctionComponent, ReactElement } from "react";
import { BsGearFill, FiDatabase, FiLogIn, HiUsers } from "react-icons/all";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import templates from "../../../api/templates.json";
import { TemplateInterface } from "../../../models";
import {
    setAstFromVisualEditor,
    setAttributesIdentifier,
    setAuthenticationStep,
    setSubjectIdentifier
} from "../../../store/actions/actions";
import { parseToAst } from "../../../utils";

/**
 * Template component Prop types.
 */
export interface TemplateProps {
    /**
     * Object contains all the details about the template
     */
    templateObject: TemplateInterface
}

/**
 * Template component.
 *
 * @param {TemplateProps} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const Template: FunctionComponent<TemplateProps> = (props: TemplateProps) : ReactElement => {

    const {
        templateObject
    } = props;

    const dispatch: Dispatch<any> = useDispatch();

    const saveAstToStore = React.useCallback(
        (ast: File) => dispatch(setAstFromVisualEditor(ast)),
        [dispatch]
    );

    const saveAuthenticationStepToStore = React.useCallback(
        (step: any, factors:any[]) => dispatch(setAuthenticationStep(step, factors)),
        [dispatch]
    );

    const saveSubjectIdentifierToStore = React.useCallback(
        (step: number) => dispatch(setSubjectIdentifier(step)),
        [dispatch]
    );

    const saveAttributesIdentifierToStore = React.useCallback(
        (step: number) => dispatch(setAttributesIdentifier(step)),
        [dispatch]
    );

    const updateWithTemplate = (name:string) => {
        const template = templates.find(template => {
            return template.name === name;
        });
        saveSubjectIdentifierToStore(1);
        saveAttributesIdentifierToStore(1);
        if (template) {
            saveAstToStore(parseToAst(template.code.join("\n")));
            const authenticatorsArray = Object.values(template?.defaultAuthenticators);
            let stepNo: number = 1;
            for (const step of authenticatorsArray) {
                saveAuthenticationStepToStore(stepNo, step.local.concat(step.federated));
                stepNo += 1;
            }
        }
    };

    return (
        <div className="template-container"
            onClick={
                () => updateWithTemplate(templateObject.name)
            }
        >
            { templateObject.name === "Role-Based" ?
                <HiUsers/>
                : templateObject.name === "User Store-Based" ?
                    <FiDatabase/>
                    : templateObject.name === "Basic Login" ? <FiLogIn/>: <BsGearFill/> }
            <div className="template-text">{ templateObject.name }</div>
        </div>
    );
};
