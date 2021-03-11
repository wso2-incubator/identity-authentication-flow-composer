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

import _ from "lodash";
import { ParseToAst, begin } from "../../components";
import { AstReducerStateStateInterface } from "../../models";
import { ActionTypes, ReduxActions } from "../actions";

/**
 * Ast Reducer initial state.
 */
const initialState: AstReducerStateStateInterface = {
    ast: ParseToAst(begin),
    changedFromVisualEditor: false
};

/**
 * Reducer to handle the state of help panel related actions.
 *
 * @param {AstReducerStateStateInterface} state - Previous state
 * @param {ReduxActions} action - Action type.
 * @returns The new state
 */
export const astReducer = (state: AstReducerStateStateInterface = initialState,
    action: ReduxActions): AstReducerStateStateInterface => {

    switch (action.type) {
    case ActionTypes.SET_AST_FROM_SCRIPT_EDITOR:
        return {
            ast: _.cloneDeep(action.payload),
            changedFromVisualEditor: false
        };
    case ActionTypes.SET_AST_FROM_VISUAL_EDITOR:
        return  {
            ast: _.cloneDeep(action.payload),
            changedFromVisualEditor: true
        };
    default:
        return state;
    }
};
