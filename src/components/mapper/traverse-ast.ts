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

import generate from "@babel/generator";
import traverse, { NodePath, Scope } from "@babel/traverse";
import { File } from "@babel/types";
import * as syntax from "./adaptive-code-syntax";

/**
 * Check whether the script has a login request.
 *
 * @param {File} ast
 * 
 * @return {boolean}
 */
export const HasLoginRequest = (ast:File) : boolean => {
    let request: boolean = false;
    try{
        traverse(ast, {
            VariableDeclarator(path: any){
                if (path.node.id.name === syntax.loginRequest){
                    request = true;
                    path.stop();
                }
            }
        });
    }
    catch(error){
        throw new Error(error);
    }
    return(request);
};

/**
 * Get the harmful operations' locations in the script as an array.
 *
 * @param {File} ast
 *
 * @return {number[]}
 */
export const GetHarmfulOperations = (ast:File) : number[] => {
    const harmfulLocationArray: number[] = [];
    try{
        traverse(ast, {
            ForStatement(path: any){
                harmfulLocationArray.push(path.node.body.loc.start.line);
            },
            WhileStatement(path: any){
                harmfulLocationArray.push(path.node.body.loc.start.line);
            }
        });
    }
    catch(error){
        throw new Error(error);
    }
    return(harmfulLocationArray);
};

/**
 * Get the harmful operations' locations in the script as an array.
 *
 * @param {File} ast
 * @param {Scope} scope
 * @param {NodePath} parentPath
 * @param {any} state
 * 
 * @return {any}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const GetStepsInSuccessPath = (ast : File, scope:Scope, parentPath:NodePath, state:any): any => {
    let successSteps: Record<string, unknown>|undefined = undefined;
    try {
        traverse(ast, {
            ObjectMember(path: any) {
                if (path.node.key.name === syntax.onSuccess) {
                    const steps = GetCallExpressionsInPath(path.node, path.scope, path.parentPath, path.state);
                    const condition: any = GetCondition(path.node, path.scope, path.parentPath, path.state);
                    const remaining = steps.filter((step: any) => condition.onSuccess.indexOf(step) === -1);
                    successSteps = {
                        condition: condition.condition,
                        onConditionSuccess: condition.onSuccess,
                        remainingSuccess: remaining
                    };
                }
                path.skip();
            }
        }, scope, state, parentPath);
    } catch (error){
        throw new Error(error);
    }
    return successSteps;
};

/**
 * Get the authentication steps in the failure path of a given step.
 *
 * @param {File} ast
 * @param {Scope} scope
 * @param {NodePath} parentPath
 * @param {any} state
 *
 * @return {number|undefined}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const GetStepsInFailurePath = (ast : File, scope:Scope, parentPath:NodePath, state:any)
    : number|undefined => {
    const failSteps: number[] = [];
    traverse(ast, {
        ObjectMember(path: any){
            if (path.node.key.name===syntax.onFail){
                failSteps.push(GetCallExpressionsInPath(path.node, path.scope, path.parentPath, path.state));
            }
            path.skip();
        }
    }, scope, state, parentPath);
    return failSteps.pop();
};

/**
 * Get the condition with success steps as an array.
 *
 * @param {File} ast
 * @param {Scope} scope
 * @param {NodePath} parentPath
 * @param {any} state
 *
 * @return {any}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const GetCondition = (ast : File, scope:Scope, parentPath:NodePath, state:any): any=> {
    let condition: string|undefined = undefined;
    let success: any[] = [];
    try {
        traverse(ast, {
            CallExpression(path: any) {
                if (path.node.callee.name === syntax.stepExecutor) {
                    path.stop();
                }
            }
            , IfStatement(path: any) {
                if (path.node.test.type === "Identifier") {
                    condition = path.node.test.name;
                } else if (path.node.test.type === "CallExpression") {
                    condition = path.node.test.callee.name;
                } else {
                    condition = generate(path.node.test).code;
                }
                success = GetCallExpressionsInPath(path.node, path.scope, path.parentPath, path.state);
            }
        }, scope, state, parentPath);
    } catch (error) {
        throw new Error(error);
    }
    return {
        condition: condition,
        onSuccess: success
    };
};

/**
 * Get the arguments of a condition.
 *
 * @param {File} ast
 *
 * @return {any[]} arguments as an array
 */
export const GetConditionArguments = (ast : File): any => {
    let params: any[] = [];
    traverse(ast, {
        VariableDeclarator(path: any){
            if(path.node.id.name===syntax.roles){
                params = path.node.init.elements.map((ele:any)=>ele.value);
            }else if (path.node.id.name === syntax.invalidAttemptsToStepUp){
                params = path.node.init.value;
            }
        }
    });
    return params;
};

/**
 * Get the call expressions in a given path of the ast.
 *
 * @param {File} ast
 * @param {Scope} scope
 * @param {NodePath} parentPath
 * @param {any} state
 *
 * @return {number[]}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const GetCallExpressionsInPath = (ast : File, scope:Scope, parentPath:NodePath, state:any): any => {
    const steps: number[] = [];
    traverse(ast, {
        CallExpression(path: any){
            if (path.node.callee.name===syntax.stepExecutor) {
                steps.push(path.node.arguments[0].value);
            }
            path.skip();
        }
    }, scope, state, parentPath);
    return steps;
};

/**
 * Get the call expressions in a given path of the ast.
 *
 * @param {File} ast
 *
 * @return {any[]}
 */
export const GetAllStepsFromAst = (ast : File) : any[] => {
    const stepsArray: any[] = [];
    try{
        traverse(ast, {
            CallExpression(path: any){
                if (path.node.callee.name===syntax.stepExecutor){
                    const success = GetStepsInSuccessPath(path.node, path.scope, path.parentPath, path.state);
                    const fail = GetStepsInFailurePath(path.node, path.scope, path.parentPath, path.state);
                    stepsArray.push({
                        onFail: fail,
                        onSuccess: success,
                        step: path.node.arguments[0].value
                    });
                }
            }
        });
    }
    catch(error){
        throw new Error(error);
    }
    return(stepsArray);
};

/**
 * Get the path of a given step in the ast.
 *
 * @param {File} ast
 * @param {string} step
 *
 * @return {any}
 */
export const GetPathOfStep = (ast:File, step:string) : any => {
    let stepPath : any = {};
    traverse(ast, {
        CallExpression(path: any){
            if (path.node.callee.name===syntax.stepExecutor && path.node.arguments[0].value === +step) {
                stepPath = path;
            }
        }
    });
    return stepPath;
};

/**
 * Get the path of a given condition with the last step in the ast.
 *
 * @param {File} ast
 * @param {string} condition
 *
 * @return {any[]}
 */
export const GetConditionPathWithLastStep = (ast:File, condition:string) : any[] => {
    let stepPath : any = {};
    let lastStep : any = 0;
    traverse(ast, {
        CallExpression(path: any){
            if (path.node.callee.name===syntax.stepExecutor) {
                lastStep = path.node.arguments[0].value;
            }
        },
        IfStatement(path: any){
            if (path.node.test.callee && path.node.test.callee.name===condition) {
                stepPath = path;
                path.stop();
            }else if (path.node.test && path.node.test.name===condition) {
                stepPath = path;
                path.stop();
            }else if (path.node.test.left.callee.object.name===condition){
                stepPath = path;
                path.stop();
            }
        }
    });
    return [lastStep, stepPath];
};

/**
 * Get the success or the failure path of a given step.
 *
 * @param {File} ast
 * @param {Scope} scope
 * @param {NodePath} parentPath
 * @param {any} state
 * @param {string} type
 * 
 * @return {any}
 */
export const GetSuccessFailurePath =
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    (ast : File, scope:Scope, parentPath:NodePath, state:any, type:string) : any => {
        let successPath : any = null;
        traverse(ast, {
            ObjectMember(path: any){
                const key = (type==="success") ? syntax.onSuccess : syntax.onFail;
                if (path.node.key.name===key){
                    successPath = [path.node, path.scope, path.parentPath, path.state];
                }
                path.skip();
            }
        }, scope, state, parentPath);
        return successPath;
    };
