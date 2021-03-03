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

import { AuthenticationStep } from "../../../models";

/**
 * Enum for application action types.
 *
 * @readonly
 * @enum {string}
 */
export enum ActionTypes {
    /**
     * Action type to set the AST(Abstract Syntax Tree) from the script editor for the application.
     *
     * @type {string}
     */
    SET_AST_FROM_SCRIPT_EDITOR = "SET_AST_FROM_SCRIPT_EDITOR",
    /**
     * Action type to set the AST(Abstract Syntax Tree) from the visual editor for the application.
     *
     * @type {string}
     */
    SET_AST_FROM_VISUAL_EDITOR = "SET_AST_FROM_VISUAL_EDITOR",
    /**
     * Action type to set the Authentication Step for the application.
     *
     * @type {string}
     */
    SET_AUTHENTICATION_STEP = "SET_AUTHENTICATION_STEP",
    /**
     * Action type to set the Intermediate Authentication Step for the application.
     *
     * @type {string}
     */
    SET_INTERMEDIATE_AUTHENTICATION_STEP = "SET_INTERMEDIATE_AUTHENTICATION_STEP",
    /**
     * Action type to set the Subject Identifier Step for the application.
     *
     * @type {string}
     */
    SET_SUBJECT_IDENTIFIER_STEP = "SET_SUBJECT_IDENTIFIER_STEP",
    /**
     * Action type to set the Attributes Identifier Step for the application.
     *
     * @type {string}
     */
    SET_ATTRIBUTES_IDENTIFIER_STEP = "SET_ATTRIBUTES_IDENTIFIER_STEP",
}

/**
 * Application base action interface.
 */
interface BasicActionInterface {
    type: ActionTypes;
}

/**
 * Action interface to set the AST(Abstract Syntax Tree) from the script editor for the application.
 */
export interface SetAstFromScriptEditorActionInterface extends BasicActionInterface {
    payload: any,
    type: ActionTypes.SET_AST_FROM_SCRIPT_EDITOR
}

/**
 * Action interface to set the AST(Abstract Syntax Tree) from the visual editor for the application.
 */
export interface SetAstFromVisualEditorActionInterface extends BasicActionInterface {
    payload: any,
    type: ActionTypes.SET_AST_FROM_VISUAL_EDITOR
}

/**
 * Action interface to set the Authentication Step for the application.
 */
export interface SetAuthenticationStepActionInterface extends BasicActionInterface {
    payload: AuthenticationStep,
    type: ActionTypes.SET_AUTHENTICATION_STEP
}

/**
 * Action interface to set the Intermediate Authentication Step for the application.
 */
export interface SetIntermediateAuthenticationStepActionInterface extends BasicActionInterface {
    payload: AuthenticationStep,
    type: ActionTypes.SET_INTERMEDIATE_AUTHENTICATION_STEP,
}

/**
 * Action interface to set the Subject Identifier Step for the application.
 */
export interface SetSubjectIdentifierActionInterface extends BasicActionInterface {
    payload: number,
    type: ActionTypes.SET_SUBJECT_IDENTIFIER_STEP,
}

/**
 * Action interface to set the Attributes Identifier Step for the application.
 */
export interface SetAttributesIdentifierActionInterface extends BasicActionInterface {
    payload: number,
    type: ActionTypes.SET_ATTRIBUTES_IDENTIFIER_STEP
}

/**
 * Export action interfaces.
 */
export type ReduxActions = SetAstFromScriptEditorActionInterface
    | SetAstFromVisualEditorActionInterface
    | SetAuthenticationStepActionInterface
    | SetIntermediateAuthenticationStepActionInterface
    | SetSubjectIdentifierActionInterface
    | SetAttributesIdentifierActionInterface;
