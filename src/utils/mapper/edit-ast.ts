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
import { getConditionPathWithLastStep, getPathOfStep, getSuccessFailurePath } from "./traverse-ast";

/**
 * Add a new step at the end of a the success or failure path of a step.
 *
 * @example
 * If we want to add a new step after step 2 in the flow, first get the path of step 2 in the AST using getPathOfStep.
 * Then using that path get the success path(onSuccess) of the step 2 with getSuccessFailurePath.
 * If it is null that means there is no `onSuccess` in the code of executeStep(2); Then,
 *  If the path of the step 2 has one argument only that means it looks like executeStep(2);
 *  Then have to add a ObjectExpression with a object property `onSuccess` as below into that as the second argument.
 *      {
 *          onSuccess: function(context) {
 *              executeStep(3);
 *          }
 *      }
 *  Else if the path of the step 2 has more arguments that means it looks like `executeStep(2, {});`
 *  Then we have to add following node related to the following code segment as a object property into second argument.
 *      onSuccess: function(context){
 *          executeStep(3)
 *      }
 * But if the success path is not null that means the code looks like below we can just add executeStep(3) inside that.
 *  executeStep(2, {
 *      onSuccess: function(context) {
 *      }
 *  }
 *
 * @param {File} ast
 * @param {string} currentStep - which step the new step is going to be added
 * @param {string} nextStep - New step
 * @param {string} stepType - success or fail
 * 
 * @return {File} New ast
 */
export const addSuccessFailureSteps =
    (ast: File, currentStep: string, nextStep: string, stepType:string) : File => {
        const path = getPathOfStep(ast, currentStep);
        const successPath = getSuccessFailurePath(path.node, path.scope, path.parentPath, path.state, stepType);
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
 * @example
 * If we want to add an authentication step before step 2,
 * First traverse the ast and shift all the steps from step 2 by +1 (2 -> 3, 3 -> 4...),
 * and then add the new step as step 2 to the flow.
 *
 * @param {File} ast
 * @param {string} beforeStep - which step the new step is going to be add before
 *
 * @return {File} New ast
 */
export const addSuccessFailureStepsBefore = (ast: File, beforeStep:string) : File => {
    const pathBefore = getPathOfStep(ast, beforeStep);
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
 * @example
 * Suppose the flow has 2 steps, then a condition and another step after the condition.
 * If we want to add a step before condition,
 * First find the last step before condition(step 2) and the path of the condition using getConditionPathWithLastStep.
 * Then shift all the steps after the condition (after step 2).
 * Then using the path of the condition insert step 3 inside the condition.
 *
 * @param {File} ast
 * @param {string} condition - which condition the new step is going to be add before
 *
 * @return {[File, number]} New ast, New step id
 */
export const addSuccessFailureStepsBeforeCondition = (ast: File, condition:string) : [File, number] => {
    const [lastStep, pathBefore] = getConditionPathWithLastStep(ast, condition);
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
 * @example
 * If we want to add a condition after step 2 in the flow, first get the path of step 2 in the AST using getPathOfStep.
 * Then using that path get the success path(onSuccess) of the step 2 with getSuccessFailurePath.
 * If it is null that means there is no `onSuccess` in the code of executeStep(2); Then,
 *  If the path of the step 2 has one argument only that means it looks like executeStep(2);
 *  Then have to add a ObjectExpression with a object property `onSuccess` as below into that as the second argument.
 *      {
 *          onSuccess: function(context) {
 *              if (hasRole) {}
 *          }
 *      }
 *  Else if the path of the step 2 has more arguments that means it looks like `executeStep(2, {});`
 *  Then we have to add following node related to the following code segment as a object property into second argument.
 *      onSuccess: function(context){
 *          if (hasRole) {}
 *      }
 * But if the success path is not null that means the code looks like below, we can just add if (hasRole){} inside that.
 *  executeStep(2, {
 *      onSuccess: function(context) {
 *      }
 *  }
 * Finally, we need to unshift the code to add required variable definitions for conditions at the beginning of the code
 *
 * @param {File} ast
 * @param {string} step
 * @param {string} condition
 * @param {any|any[]} params
 *
 * @return {File} New ast
 */
export const addCondition = (ast:File, step:string, condition:string, params?:any|any[]) : File => {
    const path = getPathOfStep(ast, step);
    const successPath = getSuccessFailurePath(path.node, path.scope, path.parentPath, path.state, "success");
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
 * If we want to add a condition before step first we need to get the path of that step.
 * Then we can replace the node with that step with the condition and add that node inside the condition.
 * @summary {wrap the step with the condition}
 * Finally, we need to unshift the code to add required variable definitions for conditions at the beginning of the code
 *
 * @param {File} ast
 * @param {string} condition
 * @param {any|any[]} params
 * @param {string} beforeStep
 *
 * @return {File} New ast
 */
export const addConditionBeforeStep = (
    ast: File, beforeStep:string, condition: string, params:any|any[]
) : File => {
    const pathBefore = getPathOfStep(ast, beforeStep);
    const args = pathBefore.parentPath.parent.body[0];
    pathBefore.parentPath.parent.body[0] = createIfStatementWithArguments(condition, args);
    ast.program.body.unshift(parse(syntax.getConditionSyntax(condition)).program.body[0]);
    ast.program.body.unshift(createVariableDeclarationForCondition(condition, params));
    return ast;
};

/**
 * Add a step to a given condition in the ast.
 * First traverse the ast to find IfStatements. Check whether the test.callee.name is matching with the condition.
 * Then if it is matched push the step into the condition's consequent body.
 *
 * @param {File} ast
 * @param {string} condition
 * @param {string} step
 *
 * @return {File} New ast
 */
export const addStepToCondition = (ast:File, condition:string, step:string): File => {
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
 * First find the path of the step in the AST.
 * From that path get the parent and the key related to the step, and use delete parent[key]; to remove the node from
 * the AST.
 *
 * @param {File} ast
 * @param {string} step
 *
 * @return {File} New ast
 */
export const deleteStep = (ast:File, step:string) : File => {
    const parentPath = getPathOfStep(ast, step).parentPath;
    delete(parentPath.parent.body[parentPath.key]);
    return ast;
};
