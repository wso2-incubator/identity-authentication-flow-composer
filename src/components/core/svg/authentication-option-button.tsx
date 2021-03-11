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

import React from "react";
import { AuthenticatorIcons } from "./authenticator-icons";

/**
 * Authentication Option Button SVG Component Prop types.
 */
export interface AuthenticationOptionButtonProps {
    /**
     * Authentication Option type
     */
    type:string,
    /**
     * Authentication Option x position
     */
    x:number,
    /**
     * Authentication Option y position
     */
    y:number
}

/**
 * Authentication Option Button SVG Component.
 *
 * @param {AuthenticationOptionButtonProps} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const AuthenticationOptionButton: React.FC<AuthenticationOptionButtonProps> = (
    props: AuthenticationOptionButtonProps
) => {

    const {
        type,
        x,
        y
    } = props;

    const iconX: number = x + 10;
    const iconY: number = y + 3;
    const iconHeight: number = 30;
    const iconWidth: number = 30;

    return(
        <g>
            <rect fill="#fff" rx="8" x={ x } y={ y } id="Rectangle_25" className="option-button-rectangle"/>
            <AuthenticatorIcons type={ type } iconX={ iconX } iconY={ iconY } iconHeight={ iconHeight }
                iconWidth={ iconWidth }/>
            <text x={ x } y={ y } className="option-button-text" id="Sign_In_With_Google_Idp">
                <tspan className="option-text-left" id="svg_1" y={ y+22 } x={ x+60 }>Sign In With </tspan>
                <tspan className="option-text-right" id="svg_2" y={ y+22 }>{ type }</tspan>
            </text>
        </g>
    );
};
