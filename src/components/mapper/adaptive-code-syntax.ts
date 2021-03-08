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

export const begin = "var onLoginRequest = function(context){executeStep(1);}";
export const loginRequest = "onLoginRequest";
export const stepExecutor = "executeStep";
export const onSuccess = "onSuccess";
export const onFail = "onFail";
export const context = "context";
export const params = "params";
export const variable = "var";
export const roles = "rolesToStepUp";
export const invalidAttemptsToStepUp = "invalidAttemptsToStepUp";
export const hasRolesDefaultVar = "hasRole";
export const user = "user";
export const currentKnownSubject = "currentKnownSubject";

export const getConditionSyntax = (condition:string) : string => {
    let code = `var ${condition}= function (context){\n`;
    if (condition === "hasRole") {
        code+= "var user = context.currentKnownSubject;\nreturn hasAnyOfTheRoles(user, rolesToStepUp);\n";
    }
    else if (condition === "isExceedInvalidAttempts") {
        code+=
        "var failedLoginAttemptsBeforeSuccessClaim= " +
        "'http://wso2.org/claims/identity/failedLoginAttemptsBeforeSuccess';" +
        "var user = context.steps[1].subject;\n" +
        "   if (user.localClaims[failedLoginAttemptsBeforeSuccessClaim] >= invalidAttemptsToStepUp) {\n" +
        "       return true;\n" +
        "   } else {\n" +
        "       return false;\n" +
        "   }";
    }
    else {code+= "//You can define and return the condition from here\n\n";}
    code+="};";
    return code;
};

