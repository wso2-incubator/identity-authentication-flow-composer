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
import {
    ActionTypes,
    SetAstFromScriptEditorActionInterface,
    SetAstFromVisualEditorActionInterface, SetAttributesIdentifierActionInterface,
    SetAuthenticationStepActionInterface,
    SetIntermediateAuthenticationStepActionInterface,
    SetSubjectIdentifierActionInterface
} from "./types";

/**
 * Redux action to set the AST from the Script Editor.
 *
 * @param {File} ast - Abstract Syntax Tree.
 * @return {SetAstFromScriptEditorActionInterface} An action of type `SET_AST_FROM_SCRIPT_EDITOR`
 */
export const setAstFromScriptEditor = (ast: File): SetAstFromScriptEditorActionInterface => ({
    payload: ast,
    type: ActionTypes.SET_AST_FROM_SCRIPT_EDITOR
});

/**
 * Redux action to set the AST from Visual Editor.
 *
 * @param {File} ast - Abstract Syntax tree.
 * @return {SetAstFromVisualEditorActionInterface} An action of type `SET_AST_FROM_VISUAL_EDITOR`
 */
export const setAstFromVisualEditor = (ast: File): SetAstFromVisualEditorActionInterface => ({
    payload: ast,
    type: ActionTypes.SET_AST_FROM_VISUAL_EDITOR
});

/**
 * Redux action to set an Authentication Step.
 *
 * @param {number} stepId - ID of the step.
 * @param {string[]} authenticators - Authentication factors of the step
 * @return {SetAuthenticationStepActionInterface} An action of type `SET_AUTHENTICATION_STEP`
 */
export const setAuthenticationStep = (stepId:number, authenticators:string[])
    : SetAuthenticationStepActionInterface => ({
    payload: { authenticators: authenticators, stepId: stepId },
    type: ActionTypes.SET_AUTHENTICATION_STEP
});

/**
 * Redux action to set an Intermediate Authentication Step.
 *
 * @param {number} stepId - ID of the step.
 * @param {string[]} authenticators - Authentication factors of the step
 * @return {SetIntermediateAuthenticationStepActionInterface} An action of type `SET_INTERMEDIATE_AUTHENTICATION_STEP`
 */
export const setIntermediateAuthenticationStep = (stepId:number, authenticators:string[])
    : SetIntermediateAuthenticationStepActionInterface => ({
    payload: { authenticators: authenticators, stepId: stepId },
    type: ActionTypes.SET_INTERMEDIATE_AUTHENTICATION_STEP
});

/**
 * Redux action to set the Subject Identifier.
 *
 * @param {number} stepId - ID of a step to use subject identifier.
 * @return {SetSubjectIdentifierActionInterface} An action of type `SET_SUBJECT_IDENTIFIER_STEP`
 */
export const setSubjectIdentifier = (stepId:number): SetSubjectIdentifierActionInterface => ({
    payload: stepId,
    type: ActionTypes.SET_SUBJECT_IDENTIFIER_STEP
});

/**
 * Redux action to set the Attributes Identifier.
 *
 * @param {number} stepId - ID of a step to use attributes.
 * @return {SetAttributesIdentifierActionInterface} An action of type `SET_ATTRIBUTES_IDENTIFIER_STEP`
 */
export const setAttributesIdentifier = (stepId:number): SetAttributesIdentifierActionInterface => ({
    payload: stepId,
    type: ActionTypes.SET_ATTRIBUTES_IDENTIFIER_STEP
});


