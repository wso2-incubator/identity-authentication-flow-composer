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

import { ArrowHeadType, FlowElement } from "react-flow-renderer";

/**
 * Flow Element For Authentication Step.
 *
 * @param {string} step
 * @param {number} x - position
 * @param {number} y - position
 * @param {()=>void} onClick
 * @param {()=>void} showAuthenticatorsList
 *
 * @return {FlowElement}
 */
export const AuthenticationStepElement = (
    step:string, x:number, y:number, onClick:()=>void, showAuthenticatorsList:() => void
) : FlowElement => {

    return ({
        data: {
            onClick: onClick,
            showAuthenticatorsList: showAuthenticatorsList,
            text: step
        },
        id: step,
        position: { x: x, y: y },
        type: "authenticationStep"
    });

};

/**
 * Flow Element For Condition.
 *
 * @param {string} id
 * @param {string} condition
 * @param {number} x - position
 * @param {number} y - position
 * @param {string[]} args - arguments for the condition
 *
 * @return {FlowElement}
 */
export const ConditionElement = ( 
    id:string, condition:string, x:number, y:number, args?:string[] 
) : FlowElement => {

    return ({
        data: {
            args: args,
            condition: condition
        },
        id: id,
        position: { x: x, y: y },
        type: "condition"
    });

};

/**
 * Flow Element For Done.
 *
 * @param {string} id
 * @param {number} x - position
 * @param {number} y - position
 *
 * @return {FlowElement}
 */
export const DoneElement = (id:string, x:number, y:number) : FlowElement => {

    return ({
        id: id,
        position: { x: x, y: y },
        type: "done"
    });

};

/**
 * Flow Element For Plus Button.
 *
 * @param {string} id
 * @param {number} x - position
 * @param {number} y - position
 *
 * @return {FlowElement}
 */
export const PlusElement = (id:string, x:number, y:number) : FlowElement => {

    return ({
        id: id,
        position: { x: x, y: y },
        type: "plus"
    });

};

/**
 * Flow Element For Authentication Option.
 *
 * @param {string} id
 * @param {string} type
 * @param {number} x - position
 * @param {number} y - position
 *
 * @return {FlowElement}
 */
export const AuthenticationOptionElement = (id:string, type:string, x:number, y:number) : FlowElement => {

    return ({
        data: {
            type: type
        },
        id: id,
        position: { x: x, y: y },
        type: "authenticationOption"
    });

};

/**
 * Flow Element For connector which connect authentication options of a authentication step.
 *
 * @param {string} id
 * @param {number} x - position
 * @param {number} y - position
 *
 * @return {FlowElement}
 */
export const ConnectorElement = (id:string, x:number, y:number) : FlowElement => {

    return ({
        id: id,
        position: { x: x, y: y },
        type: "connector"
    });

};

/**
 * Flow Element For indicating start of the flow.
 *
 * @param {string} id
 * @param {number} x - position
 * @param {number} y - position
 *
 * @return {FlowElement}
 */
export const StartElement = (id:string, x:number, y:number) : FlowElement => {

    return ({
        id: id,
        position: { x: x, y: y },
        type: "start"
    });
};

/**
 * Flow Element For indicating failure flow.
 *
 * @param {string} id
 * @param {number} x - position
 * @param {number} y - position
 *
 * @return {FlowElement}
 */
export const FailureElement = (id:string, x:number, y:number) : FlowElement => {

    return ({
        id: id,
        position: { x: x, y: y },
        type: "failure"
    });
};

/**
 * Flow Element For custom edge.
 *
 * @param {string} id
 * @param {string|null} source
 * @param {string|null} target
 * @param {string|undefined} label
 * @param {string} color
 * @param {string} handler
 * @param {string} targetHandler
 * @param {number} offset
 * @param {number} targetOffsetX
 * @param {number} targetOffsetY
 * @param {number} middleOffset
 *
 * @return {FlowElement}
 */
export const CustomEdge = (
    id:string,
    source:string,
    target:string,
    label:string|undefined,
    color:string,
    handler?:string,
    targetHandler?:string,
    offset?:number,
    targetOffsetX?:number,
    targetOffsetY?:number,
    middleOffset?:number
) : FlowElement => {

    return ({
        arrowHeadType: ArrowHeadType.Arrow,
        data: {
            color:color,
            labelBgStyle: { backgroundColor: color, color: "white" },
            middleOffset: middleOffset,
            offset: offset,
            targetOffsetX: targetOffsetX,
            targetOffsetY: targetOffsetY,
            text : label
        },
        id: id,
        source: source,
        sourceHandle: handler,
        target: target,
        targetHandle: targetHandler,
        type: "custom"
    });
};

/**
 * Flow Element For normal edge.
 *
 * @param {string} id
 * @param {string|null} source
 * @param {string|null} target
 * @param {string|undefined} label
 * @param {string} color
 * @param {string} handler
 * @param {string} targetHandler
 *
 * @return {FlowElement}
 */
export const Edge = (
    id:string,
    source:string,
    target:string,
    label:string|undefined,
    color:string,
    handler?:string,
    targetHandler?:string
): FlowElement => {

    return ({
        arrowHeadType: ArrowHeadType.Arrow,
        id: id,
        label: label,
        labelBgStyle: { fill: "#313234" },
        labelStyle: {
            fill:"#fff",
            fontSize: 14,
            letterSpacing:"1px"
        },
        source: source,
        sourceHandle: handler,
        target: target,
        targetHandle: targetHandler,
        type: "step"
    });
};
