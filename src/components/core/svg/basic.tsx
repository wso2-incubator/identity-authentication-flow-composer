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
import { AuthenticationOptionButton } from "./authentication-option-button";

/**
 * Basic Authenticator SVG Component Prop types.
 */
export interface BasicAuthenticatorProps {
    /**
     * Authentication Option with basic login
     */
    options: string[]
}

/**
 * Basic Authenticator SVG Component.
 *
 * @param {BasicAuthenticatorProps} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const Basic: FunctionComponent<BasicAuthenticatorProps> = (props: BasicAuthenticatorProps) : ReactElement => {
    
    const {
        options
    } = props;
    
    const Y: number = options.length * 50;
    const height: number = 740 + Y;
    const viewBox: string = `0 0 526 ${height}`;
    
    return(
        <div className="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="365" viewBox={ viewBox }>
                <g id="login" transform="translate(-748 1219)">
                    <g id="Rectangle_618" data-name="Rectangle 618" transform="translate(748 -1172.461)" fill="#fff"
                        stroke="rgba(188,188,188,0.5)" strokeWidth="1">
                        <rect width="526" height={ 630+Y } rx="21" stroke="none"/>
                        <rect x="0.5" y="0.5" width="525" height={ 630+Y } rx="20.5" fill="none"/>
                    </g>
                    <text id="Sign_In" data-name="Sign In" transform="translate(966 -1089.461)" fill="#323232" 
                        fontSize="29" fontFamily="Roboto-Regular, Roboto">
                        <tspan x="0" y="0">Sign In</tspan>
                    </text>
                    <text id="Forgot_Username_or_Password_" data-name="Forgot Username or Password?" 
                        transform="translate(806 -887.461)" fill="#323232" fontSize="18" 
                        fontFamily="Roboto-Regular, Roboto"
                    >
                        <tspan x="0" y="0">Forgot </tspan><tspan y="0" fill="#f47b20">Username</tspan>
                        <tspan y="0" xmlSpace="preserve"> or </tspan>
                        <tspan y="0" fill="#f47b20">Password</tspan>
                        <tspan y="0">?</tspan>
                    </text>
                    <text id="Create_Account" data-name="Create Account" transform="translate(806 -639.461)" 
                        fill="#f47b20" fontSize="21" fontFamily="Helvetica"><tspan x="0" y="0">Create Account</tspan>
                    </text>
                    <g id="Component_1" data-name="Component 1" transform="translate(1065 -670.461)">
                        <rect id="Rectangle_25" data-name="Rectangle 25" width="158" height="51" rx="4" 
                            transform="translate(0 0)" fill="#f47b20"/>
                        <text id="Continue" transform="translate(0 12.085)" fill="#fff" fontSize="16" 
                            fontFamily="Roboto-Regular, Roboto" fontWeight="700">
                            <tspan x="46.132" y="18">Continue</tspan>
                        </text>
                    </g>
                    <g id="form.checkbox.unchecked" transform="translate(806 -852.461)">
                        <text id="Remember_me_on_this_computer" data-name="Remember me on this computer" 
                            transform="translate(34 17)" fill="rgba(0,0,0,0.8)" fontSize="17" 
                            fontFamily="Roboto-Regular, Roboto"><tspan x="0" y="0">Remember me on this computer</tspan>
                        </text>
                        <g id="Group_510" data-name="Group 510">
                            <g id="Rectangle_133" data-name="Rectangle 133" transform="translate(0 0)" fill="#fff" 
                                stroke="#d4d4d5" strokeWidth="1">
                                <rect width="21" height="21" rx="4" stroke="none"/>
                                <rect x="0.5" y="0.5" width="20" height="20" rx="3.5" fill="none"/>
                            </g>
                        </g>
                    </g>
                    <g id="Component_2" data-name="Component 2" transform="translate(800.558 -1051.338)">
                        <g id="Rectangle_25-2" data-name="Rectangle 25" fill="none" stroke="rgba(118,118,118,0.35)" 
                            strokeWidth="1">
                            <rect width="422.135" height="45.049" rx="4" stroke="none"/>
                            <rect x="0.5" y="0.5" width="421.135" height="44.049" rx="3.5" fill="none"/>
                        </g>
                        <text id="Username" transform="translate(62.569 11.262)" fill="rgba(0,0,0,0.6)" fontSize="14" 
                            fontFamily="Roboto-Regular, Roboto" opacity="0.35">
                            <tspan x="0" y="13">Username</tspan>
                        </text>
                        <path id="user" 
                            d="M9.2,10.517A5.259,5.259,0,1,0,3.944,5.259,5.258,5.258,0,0,0,9.2,10.517Zm3.681,
                            1.315H12.2a7.152,7.152,0,0,1-5.99,0H5.522A5.523,5.523,0,0,0,0,17.354v1.709a1.973,1.973,0,0,
                            0,1.972,1.972H16.433a1.973,1.973,0,0,0,1.972-1.972V17.354A5.523,5.523,0,0,0,12.884,11.832Z" 
                            transform="translate(21.273 11.262)" fill="#767676"/>
                    </g>
                    <g id="Component_3" data-name="Component 3" transform="translate(800.558 -988.769)">
                        <g id="Rectangle_25-3" data-name="Rectangle 25" fill="none" stroke="rgba(118,118,118,0.35)" 
                            strokeWidth="1">
                            <rect width="422.135" height="45.049" rx="4" stroke="none"/>
                            <rect x="0.5" y="0.5" width="421.135" height="44.049" rx="3.5" fill="none"/>
                        </g>
                        <text id="Password" transform="translate(62.569 11.262)" fill="rgba(0,0,0,0.6)" fontSize="14" 
                            fontFamily="Roboto-Regular, Roboto" opacity="0.35">
                            <tspan x="0" y="13">Password</tspan>
                        </text>
                        <path id="user-2" data-name="user" 
                            d="M9.2,10.517A5.259,5.259,0,1,0,3.944,5.259,5.258,5.258,0,0,0,9.2,10.517Zm3.681,
                              1.315H12.2a7.152,7.152,0,0,1-5.99,0H5.522A5.523,5.523,0,0,0,0,17.354v1.709a1.973,1.973,0,
                              0,0,1.972,1.972H16.433a1.973,1.973,0,0,0,1.972-1.972V17.354A5.523,5.523,0,0,0,12.884,
                              11.832Z" transform="translate(21.273 11.262)" fill="#767676"/>
                    </g>
                    <text id="We_use_browser_cookies_to_track_your_session_to_give_better_experience.
                    _You_can_refer_our_Cookie_Policy_for_more_details._By_signing_in_you_agree_to_our_Privacy_Policy" 
                    data-name="We use browser cookies to track your session to give better experience. You can 
                          refer our Cookie Policy for more details. By signing in, you agree to our Privacy Policy" 
                    transform="translate(806 -792.461)" fill="rgba(0,0,0,0.8)" fontSize="14" 
                    fontFamily="Roboto-Regular, Roboto">
                        <tspan x="0" y="13">We use browser cookies to track your session to give better </tspan>
                        <tspan x="0" y="35">experience. You can refer our </tspan>
                        <tspan y="35" fill="#f47b20">Cookie Policy</tspan>
                        <tspan y="35" xmlSpace="preserve"> for more details.</tspan>
                        <tspan x="0" y="57"/><tspan x="0" y="79">By signing in, you agree to our </tspan>
                        <tspan y="79" fill="#f47b20">Privacy Policy</tspan>
                    </text>
                </g>
                <svg xmlns="http://www.w3.org/2000/svg" x="195" y="50" width="150" height="47.13" 
                    viewBox="0 0 325.5 47.13">
                    <g id="logo-1" transform="translate(-401.5 -178.71)">
                        <path id="Path_2308" data-name="Path 2308" 
                            d="M720.99,178.71l1.93,3.35-2.14,3.72h4.28l1.94,3.35H714.97Z" fill="#ff7300"/>
                        <path id="Path_2309" data-name="Path 2309" 
                            d="M705.95,189.13l1.94-3.36,4.28.01-2.14-3.72,1.93-3.35,6.02,10.42Z" fill="#ff7300"/>
                        <path id="Path_2310" data-name="Path 2310" 
                            d="M718.62,196.94l-2.14-3.71-2.15,3.71h-3.87l6.02-10.42,6.01,10.42Z"/>
                        <path id="Path_2311" data-name="Path 2311" 
                            d="M445.61,225.82V218h19.66a3.27,3.27,0,1,0,0-6.54h-8.6a11.06,11.06,0,0,1,
                            0-22.12h19.66v7.79H456.67a3.419,3.419,0,0,0-3.31,3.32,3.26,3.26,0,0,0,3.27,3.27h8.6a11.06,
                            11.06,0,0,1,0,22.12Z"/>
                        <path id="Path_2312" data-name="Path 2312" 
                            d="M497.42,225.82a18.23,18.23,0,1,1,0-36.45h15.36v7.79H497.42a10.44,10.44,0,0,0,0,
                            20.87H505v-6.54h-5.73V203.7h13.52v22.12Z"/>
                        <path id="Path_2313" data-name="Path 2313" 
                            d="M587.11,225.82,569.53,208.4v17.42h-7.79V189.37H581.4a11.05,11.05,0,0,1,7.82,18.87,11.63,
                            11.63,0,0,1-3.12,2.26l-2.32,1.13L598,225.82ZM581.4,203.7a3.3,3.3,0,0,0,0-6.59H569.53v6.54Z"
                        />
                        <path id="Path_2314" data-name="Path 2314" 
                            d="M600.89,225.82V189.37h15.36a18.23,18.23,0,1,1,0,36.45ZM616.25,218a10.44,10.44,0,0,0,
                            0-20.87h-7.57V218Z"/>
                        <path id="Path_2315" data-name="Path 2315" 
                            d="M688.54,225.82a18.21,18.21,0,1,1,12.89-5.34,17.42,17.42,0,0,1-12.89,5.34Zm0-28.66a10.45,
                            10.45,0,1,0,7.37,3.06A10.13,10.13,0,0,0,688.54,197.16Z"/>
                        <path id="Path_2316" data-name="Path 2316" 
                            d="M401.5,225.82h8.71l12.34-21.37,12.33,21.37h8.7l-21.03-36.45Z"/>
                        <path id="Path_2317" data-name="Path 2317" 
                            d="M516.16,225.82h8.71l12.33-21.37,12.33,21.37h8.71L537.2,189.37Z"/>
                        <path id="Path_2318" data-name="Path 2318" 
                            d="M637.84,225.71V189.39h30.45v7.72H645.61v6.68h17.01v7.53H645.61v6.66h22.68v7.73Z"/>
                    </g>
                </svg>
                <g>
                    { options.length>0 && (
                        <g>
                            <line x1="87" y1="630" x2="197" y2="630" stroke="#CACBCE" strokeWidth="2"/>
                            <text fontFamily="Cambria" fontSize="16" id="OR">
                                <tspan id="svg_1" y={ 635 } x={ 255 }>OR</tspan>
                            </text>
                            <line x1="327" y1="630" x2="437" y2="630" stroke="#CACBCE" strokeWidth="2"/>
                        </g>
                    ) }
                    { options.map((option: string, index:number) => {
                        const x=87, y=660+55*index;
                        return (
                            <AuthenticationOptionButton key={ option } type={ option } x={ x } y={ y }/>
                        );})
                    }
                </g>
            </svg>
        </div>
    );
};
