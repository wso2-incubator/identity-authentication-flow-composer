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

import React, { FunctionComponent, ReactElement } from "react";
import {
    ArrowHeadType,
    EdgeText,
    Position,
    getEdgeCenter,
    getMarkerEnd,
    getSmoothStepPath
} from "react-flow-renderer";

/**
 * Custom Edge component Prop types.
 */
export interface CustomEdgeProps {
    /**
     * Id of the edge
     */
    id : string,
    /**
     * Source X of the edge.
     */
    sourceX : number,
    /**
     * Source Y of the edge.
     */
    sourceY : number,
    /**
     * Target X of the edge.
     */
    targetX : number,
    /**
     * Target Y of the edge.
     */
    targetY : number,
    /**
     * Source Position of the edge.
     */
    sourcePosition : Position,
    /**
     * Target Position of the edge.
     */
    targetPosition : Position,
    /**
     * Object to pass any data to the edge.
     */
    data : any,
    /**
     * Type of the arrow head of the edge.
     */
    arrowHeadType ?: ArrowHeadType,
    /**
     * Marker end id of the edge.
     */
    markerEndId : string,
    /**
     * offset of the edge.
     */
    offset: number
}

/**
 * Custom Edge component.
 *
 * @param {CustomEdgeProps} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const CustomEdge : FunctionComponent<CustomEdgeProps> = (props: CustomEdgeProps) : ReactElement => {

    const {
        id,
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        data,
        arrowHeadType,
        markerEndId
    } = props;

    let offset: number = data.offset;
    let targetOffsetX: number = data.targetOffsetX;
    let targetOffsetY: number = data.targetOffsetY;
    let middleOffset: number = data.middleOffset;
    let borderRadius: number = 0;
   
    if (offset === undefined) offset = 0;
    if (targetOffsetX === undefined) targetOffsetX = 0;
    if (targetOffsetY === undefined) targetOffsetY = 0;
    if (middleOffset === undefined) {
        middleOffset = 0;
        borderRadius = 20;
    }

    const center: [number, number, number, number] = getEdgeCenter({ sourceX, sourceY, targetX, targetY });
    const edgePath: string = getSmoothStepPath({
        borderRadius: borderRadius,
        centerX: center[0] - Math.abs(offset),
        centerY: center[1] - middleOffset,
        sourcePosition,
        sourceX,
        sourceY: sourceY + offset,
        targetPosition,
        targetX: targetX+targetOffsetX,
        targetY: targetY+targetOffsetY
    });
    const markerEnd: string = getMarkerEnd(arrowHeadType, markerEndId);

    return (
        <g>
            <path id={ id } className="react-flow__edge-path" d={ edgePath } markerEnd={ markerEnd } />
            <EdgeText
                x={ center[0] - center[2] }
                y={ center[1] - middleOffset/2 }
                label={ data.text }
                labelBgStyle={
                    {
                        fill: "#313234"
                    }
                }
                labelStyle={
                    {
                        fill: "#fff",
                        fontSize: 14,
                        letterSpacing: "1px"
                    }
                }
            />
        </g>
    );
};
