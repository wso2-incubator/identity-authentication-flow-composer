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
import { StepsReducerStateInterface } from "../../models";
import { ActionTypes, ReduxActions } from "../actions";

/**
 * Steps reducer initial state.
 */
const initialState: StepsReducerStateInterface = {
    attributesIdentifierStep: 1,
    steps: [{
        authenticators: ["basic"],
        stepId: 1
    }],
    subjectIdentifierStep: 1
};

/**
 * Reducer to handle the state of help panel related actions.
 *
 * @param {StepsReducerStateInterface} state - Previous state
 * @param {ReduxActions} action - Action type.
 * @returns The new state
 */
export const stepsReducer = (state: StepsReducerStateInterface = initialState,
    action: ReduxActions): StepsReducerStateInterface => {

    const index=state.steps.map(step=>step.stepId).indexOf(action?.payload?.stepId);

    switch (action.type) {

    case ActionTypes.SET_AUTHENTICATION_STEP:
        if(index===-1) {
            return {
                ...state,
                steps: state.steps.concat([{
                    authenticators: action.payload.authenticators,
                    stepId: action.payload.stepId
                }])
            };
        }else{
            return {
                ...state,
                steps: state.steps.map((item, id) => {
                    if (id !== index) {
                        return item;
                    }
                    return {
                        ...item,
                        authenticators: action.payload.authenticators
                    };
                })
            };
        }
    case ActionTypes.SET_INTERMEDIATE_AUTHENTICATION_STEP:
        return {
            ...state,
            steps: state.steps.map((item) => {
                if (item.stepId < action.payload.stepId) {
                    return item;
                } else {
                    return {
                        ...item,
                        stepId: item.stepId + 1
                    };
                }
            }).concat([{ authenticators: action.payload.authenticators, stepId: action.payload.stepId }])
        };

    case ActionTypes.SET_SUBJECT_IDENTIFIER_STEP:
        return {
            ...state,
            subjectIdentifierStep: action.payload
        };

    case ActionTypes.SET_ATTRIBUTES_IDENTIFIER_STEP:
        return{
            ...state,
            attributesIdentifierStep: action.payload
        };

    default: return state;
    }
};
