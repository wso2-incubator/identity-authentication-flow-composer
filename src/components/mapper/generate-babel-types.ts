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

import * as type from "@babel/types";
import * as syntax from "./adaptive-code-syntax";

/**
 * Create a object expression with a property.
 *
 * @param {string} identifier
 * @param {string} step
 *
 * @return {type.ObjectExpression}
 */
export const createObjectExpressionWithProperty = (identifier:string, step:string) : type.ObjectExpression => {
    return type.objectExpression([createSuccessFailurePropertyWithStep(identifier, step)]);
};

/**
 * Create a object property with a identifier and function expression.
 *
 * @param {string} identifier
 * @param {string} step
 *
 * @return {type.ObjectProperty}
 */
export const createSuccessFailurePropertyWithStep = (identifier:string, step:string) : type.ObjectProperty => {
    return type.objectProperty(
        type.identifier(identifier),
        type.functionExpression(null, [type.identifier(syntax.context)], type.blockStatement(
            [createExpressionStatement(step)]
        ))
    );
};

/**
 * Create a object expression with a object property containing a condition.
 *
 * @param {string} identifier
 * @param {string} condition
 *
 * @return {type.ObjectExpression}
 */
export const createObjectExpressionWithCondition = (identifier:string, condition:string) : type.ObjectExpression => {
    return type.objectExpression([createSuccessPropertyWithCondition(identifier, condition)]);
};

/**
 * Create a object property with a success identifier and a condition.
 *
 * @param {string} identifier
 * @param {string} condition
 *
 * @return {type.ObjectProperty}
 */
export const createSuccessPropertyWithCondition = (identifier:string, condition:string) : type.ObjectProperty => {
    return type.objectProperty(
        type.identifier(identifier),
        type.functionExpression(null, [type.identifier(syntax.context)], type.blockStatement(
            [createIfStatement(condition)]
        ))
    );
};

/**
 * Create a expression statement with a identifier and a numerical literal.
 *
 * @param {string} step
 *
 * @return {type.ExpressionStatement}
 */
export const createExpressionStatement = (step:string) : type.ExpressionStatement => {
    return type.expressionStatement(type.callExpression(
        type.identifier(syntax.stepExecutor),
        [type.numericLiteral(+step)])
    );
};

/**
 * Create a expression statement with a identifier, a numerical literal and a object expression.
 *
 * @param {string} step
 * @param {type.Statement} args
 *
 * @return {type.ExpressionStatement}
 */
export const createExpressionStatementWithSuccess = (step:string, args:type.Statement) : type.ExpressionStatement=> {
    return type.expressionStatement(type.callExpression(type.identifier(syntax.stepExecutor),
        [type.numericLiteral(+step), type.objectExpression(
            [type.objectProperty(
                type.identifier(syntax.onSuccess),
                type.functionExpression(null, [type.identifier(syntax.context)], type.blockStatement(
                    [args]
                )))]
        )]
    ));
};

/**
 * Create a variable declaration for the condition.
 *
 * @param {string} condition
 * @param {any|any[]} params
 *
 * @return {type.VariableDeclaration}
 */
export const createVariableDeclarationForCondition = (
    condition:string, params?:any|any[]
) : type.VariableDeclaration => {
    let parameters: any = type.arrayExpression([]);
    let variableNameForParameters = syntax.params;
    if (condition==="hasRole"){
        const roles = params.map((param:any)=>type.stringLiteral(param));
        parameters=type.arrayExpression(roles);
        variableNameForParameters = syntax.roles;
    }
    else if (condition==="isExceedInvalidAttempts"){
        parameters=type.numericLiteral(+params); variableNameForParameters = syntax.invalidAttemptsToStepUp;
    }
    return type.variableDeclaration(
        syntax.variable,
        [type.variableDeclarator(type.identifier(variableNameForParameters), parameters)]
    );
};

/**
 * Create a if statement without any arguments.
 *
 * @param {string} condition
 *
 * @return {type.IfStatement}
 */
export const createIfStatement = (condition:string) : type.IfStatement => {
    return type.ifStatement(type.callExpression(
        type.identifier(condition),
        [type.identifier(syntax.context)]), type.blockStatement([])
    );
};

/**
 * Create a if statement with arguments.
 *
 * @param {string} condition
 * @param {type.Statement} args
 *
 * @return {type.IfStatement}
 */
export const createIfStatementWithArguments = (condition:string, args:type.Statement) : type.IfStatement => {
    return type.ifStatement(type.callExpression(
        type.identifier(condition),
        [type.identifier(syntax.context)]), type.blockStatement([args])
    );
};
