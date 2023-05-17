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
 * Traverse the AST and checking whether script has a VariableDeclarator for onLoginRequest(var onLoginRequest)
 * {@link https://babeljs.io/docs/en/babel-traverse}
 *
 * @param {File} ast
 *
 * @return {boolean}
 */
export const hasLoginRequest = (ast:File) : boolean => {
    let request: boolean = false;

    try{
        traverse(ast, {
            VariableDeclarator(path: any){
                if (path.node.id.name === syntax.loginRequest){
                    request = true;
                    path.stop(); //when the VariableDeclarator found stop traversing the ast
                }
            }
        });
    } catch(error){
        throw new Error("An error occurred while checking the login request in the script.");
    }

    return(request);
};

/**
 * Get the harmful operations' locations (For loops and while loops) in the script as an array.
 *
 * @param {File} ast
 *
 * @return {number[]}
 */
export const getHarmfulOperations = (ast:File) : number[] => {
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
    } catch(error){
        throw new Error("An error occurred while checking the harmful operations.");
    }

    return(harmfulLocationArray);
};

/**
 * Get the steps and conditions in a given node in an ast.
 *
 * @example
 * // returns {
 *     condition: "hasRole"
 *     onConditionSuccess: [2]
 *     remainingSuccess: [3]
 *  };
 * If the node is related to the following code segment
 *  onSuccess: function(context){
 *     if (hasRole){
 *         executeStep(2);
 *     }
 *     executeStep(3);
 *  }
 *
 * @param {File} node
 * @param {Scope} scope
 * @param {NodePath} parentPath
 * @param {Node} state
 *
 * @return {any} Returns the condition if there is one and the steps inside the condition as onConditionSuccess and
 * steps without a condition as remainingSuccess.
 */
export const getStepsInSuccessPath = (node: File, scope: Scope, parentPath: NodePath, state: Node): any => {
    let successSteps: Record<string, unknown>|undefined = undefined;

    try {
        traverse(node, {
            ObjectMember(path: any) {
                if (path.node.key.name === syntax.onSuccess) {
                    const steps = getCallExpressionsInPath(path.node, path.scope, path.parentPath, path.state);
                    const condition: any = getCondition(path.node, path.scope, path.parentPath, path.state);
                    const remaining = steps.filter((step: any) => condition.onSuccess.indexOf(step) === -1);
                    successSteps = {
                        condition: condition.condition,
                        onConditionSuccess: condition.onSuccess,
                        remainingSuccess: remaining
                    };
                }
                path.skip(); //  skips traversing the children of the current path
            }
        }, scope, state, parentPath);
    } catch (error){
        throw new Error("An error occurred while checking the steps in the success path.");
    }

    return successSteps;
};

/**
 * Get the authentication steps in the failure path of a given node of an ast.
 * Traverse the ast to find the Object Member onFail and get steps inside it.
 *
 * @example
 * // returns [2, 3];
 * If the given node contains,
 *  onFail{
 *     executeStep(2);
 *     executeStep(3);
 *  }
 *
 * @param {File} ast
 * @param {Scope} scope
 * @param {NodePath} parentPath
 * @param {Node} state
 *
 * @return {number|undefined} Return Authentication steps in the failure path.
 */
export const getStepsInFailurePath = (ast : File, scope:Scope, parentPath:NodePath, state:Node)
    : number[] => {
    const failSteps: number[] = [];

    traverse(ast, {
        ObjectMember(path: any){
            if (path.node.key.name===syntax.onFail){
                failSteps.push(getCallExpressionsInPath(path.node, path.scope, path.parentPath, path.state));
            }
            path.skip();
        }
    }, scope, state, parentPath);

    return failSteps;
};

/**
 * Get the condition with success steps as an array.
 * Traverse the given node of the ast. If an executeStep found, stop traversing from there, If not traverse for an
 * IfStatement get the condition name and the steps inside the condition.
 *
 * @example
 * // returns {
 *     condition: "hasRole"
 *     onSuccess: [2]
 *  };
 * If the node is related to the following code segment
 *  onSuccess: function(context) {
 *      if (hasRole) {
 *          executeStep(2);
 *      }
 *  }
 *
 * @param {File} node
 * @param {Scope} scope
 * @param {NodePath} parentPath
 * @param {any} state
 *
 * @return {any} Returns the condition with the steps inside the condition.
 */
export const getCondition = (node : File, scope:Scope, parentPath:NodePath, state:Node): any=> {
    let condition: string|undefined = undefined;
    let success: any[] = [];

    try {
        traverse(node, {
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
                success = getCallExpressionsInPath(path.node, path.scope, path.parentPath, path.state);
            }
        }, scope, state, parentPath);
    } catch (error) {
        throw new Error("An error occurred while returning the condition.");
    }

    return {
        condition: condition,
        onSuccess: success
    };
};

/**
 * Get the arguments of a condition.
 *
 * @example
 * // returns ["admin", "manager"];
 * If the condition in the ast is hasRole
 *
 * @param {File} ast
 *
 * @return {any[]} arguments as an array
 */
export const getConditionArguments = (ast : File): any => {
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
 * Get the call expressions in a given path of the ast. Traverse the given node of an ast, find for CallExpressions with
 * executeStep identifier an returns an array of an steps
 *
 * @example
 * // returns [2, 3];
 * If the node is related to the following code segment
 *  onSuccess: function(context) {
 *      executeStep(2);
 *      executeStep(3);
 *  }
 *
 * @param {File} node
 * @param {Scope} scope
 * @param {NodePath} parentPath
 * @param {any} state
 *
 * @return {number[]}
 */
export const getCallExpressionsInPath = (node : File, scope:Scope, parentPath:NodePath, state:Node): any => {
    const steps: number[] = [];

    traverse(node, {
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
 * Get all the steps and conditions of an ast.
 *
 * @example
 * // returns [{
 *     step: 1,
 *     onSuccess: {
 *         condition: "hasRole",
 *         onConditionSuccess: [2],
 *         remainingSuccess: []
 *     }
 *     onFail: [3]
 *  }, {
 *     step: 2,
 *     onSuccess: undefined
 *     onFail: []
 *  }, {
 *     step: 3,
 *     onSuccess: undefined
 *     onFail: []
 *  }
 *  ];
 * If the ast is related to the following code segment
 *  var onLoginRequest = function(context) {
 *      executeStep(1, {
 *          onSuccess: function(context){
 *              if(hasRole){
 *                  executeStep(2);
 *              }
 *          },
 *          onFail: function(context){
 *              executeStep(3);
 *          }
 *      });
 *  };
 *
 * @param {File} ast
 *
 * @return {any[]}
 */
export const getAllStepsFromAst = (ast : File) : any[] => {
    const stepsArray: any[] = [];

    try{
        traverse(ast, {
            CallExpression(path: any){
                if (path.node.callee.name===syntax.stepExecutor){
                    const success = getStepsInSuccessPath(path.node, path.scope, path.parentPath, path.state);
                    const fail = getStepsInFailurePath(path.node, path.scope, path.parentPath, path.state);
                    stepsArray.push({
                        onFail: fail,
                        onSuccess: success,
                        step: path.node.arguments[0].value
                    });
                }
            }
        });
        return(stepsArray);
    }
    catch(error){
        return(stepsArray);
    }
};

/**
 * Get the path of a given step in the ast.
 *
 * @param {File} ast
 * @param {string} step
 *
 * @return {any} Returns the path which contains the given step
 */
export const getPathOfStep = (ast:File, step:string) : any => {
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
 * Traverse the AST and save the each step in a CallExpression into a variable lastStep.
 * Also traverse for the IfStatement by checking the test.callee.name.
 * If the condition found stop traversing the ast and returns the lastStep with the path of the condition.
 *
 * Usage:
 * Last step and the path of the condition is required when adding step before condition.
 *
 * @param {File} ast
 * @param {string} condition
 *
 * @return {any[]} Returns the lastStep with the path of the condition
 */
export const getConditionPathWithLastStep = (ast:File, condition:string) : any[] => {
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
 * Usage:
 * To check whether there is a success path (onSuccess property) when adding a step to a success path of the step.
 *
 * @param {File} ast
 * @param {Scope} scope
 * @param {NodePath} parentPath
 * @param {Node} state
 * @param {string} type
 *
 * @return {any} Returns the success path (onSuccess node)
 */
export const getSuccessFailurePath = (
    ast : File, scope:Scope, parentPath:NodePath, state:Node, type:string
) : any => {
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
