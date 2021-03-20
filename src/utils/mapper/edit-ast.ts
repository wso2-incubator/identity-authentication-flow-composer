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

import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { File } from "@babel/types";
import * as syntax from "./adaptive-code-syntax";
import {
    createExpressionStatement,
    createExpressionStatementWithSuccess,
    createIfStatement,
    createIfStatementWithArguments,
    createObjectExpressionWithCondition,
    createObjectExpressionWithProperty,
    createSuccessFailurePropertyWithStep,
    createSuccessPropertyWithCondition,
    createVariableDeclarationForCondition
} from "./generate-babel-types";
import { GetConditionPathWithLastStep, GetPathOfStep, GetSuccessFailurePath } from "./traverse-ast";

/**
 * Add a new step at the end of a the success or failure path of a step.
 *
 * @param {File} ast
 * @param {string} currentStep - which step the new step is going to be added
 * @param {string} nextStep - New step
 * @param {string} stepType - success or fail
 * 
 * @return {File} New ast
 */
export const AddSuccessFailureSteps = 
    (ast: File, currentStep: string, nextStep: string, stepType:string) : File => {
        const path = GetPathOfStep(ast, currentStep);
        const successPath = GetSuccessFailurePath(path.node, path.scope, path.parentPath, path.state, stepType);
        if (successPath === null) {
            const key = (stepType==="success")?syntax.onSuccess : syntax.onFail;
            if(path.node.arguments.length===1) {
                path.node.arguments.push(createObjectExpressionWithProperty(key, nextStep));
            }else{
                path.node.arguments[1].properties.push(createSuccessFailurePropertyWithStep(key, nextStep));
            }
        } else {
            successPath[0].value.body.body.push(createExpressionStatement(nextStep));
        }
        return ast;
    };

/**
 * Add a new step as a the success or failure step before a given step.
 *
 * @param {File} ast
 * @param {string} beforeStep - which step the new step is going to be add before
 *
 * @return {File} New ast
 */
export const AddSuccessFailureStepsBefore = (ast: File, beforeStep:string) : File => {
    const pathBefore = GetPathOfStep(ast, beforeStep);
    traverse(ast, {
        CallExpression(path: any) {
            if (path.node.callee.name === syntax.stepExecutor && path.node.arguments[0].value > +beforeStep-1) {
                path.node.arguments[0].value = path.node.arguments[0].value + 1;
            }
        }
    });
    const args = pathBefore.parentPath.parent.body[pathBefore.parentPath.key];
    pathBefore.parentPath.parent.body[pathBefore.parentPath.key] = createExpressionStatementWithSuccess(
        beforeStep, args
    );
    return ast;
};

/**
 * Add a new step as a the success or failure step before a given condition.
 *
 * @param {File} ast
 * @param {string} condition - which condition the new step is going to be add before
 *
 * @return {[File, number]} New ast, New step id
 */
export const AddSuccessFailureStepsBeforeCondition = (ast: File, condition:string) : [File, number] => {
    const [lastStep, pathBefore] = GetConditionPathWithLastStep(ast, condition);
    traverse(ast, {
        CallExpression(path: any) {
            if (path.node.callee.name === syntax.stepExecutor && path.node.arguments[0].value > lastStep) {
                path.node.arguments[0].value = path.node.arguments[0].value + 1;
            }
        }
    });
    const args = pathBefore.parent.body[pathBefore.key];
    pathBefore.parent.body[pathBefore.key] = createExpressionStatementWithSuccess(lastStep + 1, args);
    return [ast, lastStep+1];
};

/**
 * Add a condition to the ast after a given step with given params.
 *
 * @param {File} ast
 * @param {string} step
 * @param {string} condition
 * @param {any|any[]} params
 *
 * @return {File} New ast
 */
export const AddCondition = (ast:File, step:string, condition:string, params?:any|any[]) : File => {
    const path = GetPathOfStep(ast, step);
    const successPath = GetSuccessFailurePath(path.node, path.scope, path.parentPath, path.state, "success");
    if(successPath===null){
        if(path.node.arguments.length===1) {
            path.node.arguments.push(createObjectExpressionWithCondition(syntax.onSuccess, condition));
        }else{
            path.node.arguments[1].properties.push(createSuccessPropertyWithCondition(syntax.onSuccess, condition));
        }
    }else{
        successPath[0].value.body.body.push(createIfStatement(condition));
    }
    ast.program.body.unshift(parse(syntax.getConditionSyntax(condition)).program.body[0]);
    ast.program.body.unshift(createVariableDeclarationForCondition(condition, params));
    return ast;
};

/**
 * Add a condition to the ast before a given step with given params.
 *
 * @param {File} ast
 * @param {string} condition
 * @param {any|any[]} params
 * @param {string} beforeStep
 * 
 * @return {File} New ast
 */
export const AddConditionBeforeStep = (
    ast: File, beforeStep:string, condition: string, params:any|any[]
) : File => {
    const pathBefore = GetPathOfStep(ast, beforeStep);
    const args = pathBefore.parentPath.parent.body[0];
    pathBefore.parentPath.parent.body[0] = createIfStatementWithArguments(condition, args);
    ast.program.body.unshift(parse(syntax.getConditionSyntax(condition)).program.body[0]);
    ast.program.body.unshift(createVariableDeclarationForCondition(condition, params));
    return ast;
};

/**
 * Add a step to a given condition in the ast.
 *
 * @param {File} ast
 * @param {string} condition
 * @param {string} step
 *
 * @return {File} New ast
 */
export const AddStepToCondition = (ast:File, condition:string, step:string): File => {
    traverse(ast, {
        IfStatement(path: any){
            if (path.node.test.callee && path.node.test.callee.name===condition) {
                path.node.consequent.body.push(createExpressionStatement(step));
            }
        }
    });
    return ast;
};

/**
 * Delete a given step from the ast.
 *
 * @param {File} ast
 * @param {string} step
 *
 * @return {File} New ast
 */
export const DeleteStep = (ast:File, step:string) : File => {
    const parentPath = GetPathOfStep(ast, step).parentPath;
    delete(parentPath.parent.body[parentPath.key]);
    return ast;
};
