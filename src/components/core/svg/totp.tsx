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

/**
 * Totp Authenticator SVG Component.
 *
 * @return {React.ReactElement}
 */
export const Totp: FunctionComponent = () : ReactElement => {
    return(
        <div className="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="240" viewBox="0 0 420 407">
                <g id="sms-otp" transform="translate(-748 1223)">
                    <g id="Rectangle_618" data-name="Rectangle 618" transform="translate(748 -1182)" fill="#fff" 
                        stroke="rgba(188,188,188,0.5)" strokeWidth="1">
                        <rect width="420" height="323" rx="21" stroke="none"/>
                        <rect x="0.5" y="0.5" width="419" height="322" rx="20.5" fill="none"/>
                    </g>
                    <text id="Authenticating_with_TOTP" data-name="Authenticating with TOTP" 
                        transform="translate(812 -1131)" fill="#323232" fontSize="24" 
                        fontFamily="Roboto-Regular, Roboto"
                    >
                        <tspan x="0" y="0">Authenticating with TOTP</tspan>
                    </text>
                    <g id="Component_4" data-name="Component 4" transform="translate(990 -954)">
                        <rect id="Rectangle_25" data-name="Rectangle 25" width="139" height="41" rx="4" fill="#f47b20"/>
                        <text id="Authenticate" transform="translate(10 9.658)" fill="#fff" fontSize="16" 
                            fontFamily="Roboto-Regular, Roboto" fontWeight="700">
                            <tspan x="11" y="16">Authenticate</tspan>
                        </text>
                    </g>
                    <g id="form.checkbox.unchecked" transform="translate(792 -995)">
                        <text id="Remember_the_device." data-name="Remember the device." transform="translate(27 14)" 
                            fill="rgba(0,0,0,0.8)" fontSize="14" fontFamily="Roboto-Regular, Roboto">
                            <tspan x="0" y="0">Remember the device.</tspan>
                        </text>
                        <g id="Group_510" data-name="Group 510">
                            <g id="Rectangle_133" data-name="Rectangle 133" fill="#fff" stroke="#d4d4d5" 
                                strokeWidth="1">
                                <rect width="17" height="17" rx="4" stroke="none"/>
                                <rect x="0.5" y="0.5" width="16" height="16" rx="3.5" fill="none"/>
                            </g>
                        </g>
                    </g>
                    <g id="Component_6" data-name="Component 6" transform="translate(790 -1051)">
                        <g id="Rectangle_25-2" data-name="Rectangle 25" fill="none" stroke="rgba(118,118,118,0.35)" 
                            strokeWidth="1">
                            <rect width="337.338" height="36" rx="4" stroke="none"/>
                            <rect x="0.5" y="0.5" width="336.338" height="35" rx="3.5" fill="none"/>
                        </g>
                        <text id="Enter_the_one_time_code" data-name="Enter the one time code" 
                            transform="translate(50 9)" fill="rgba(0,0,0,0.6)" fontSize="14" 
                            fontFamily="Roboto-Regular, Roboto" opacity="0.35">
                            <tspan x="0" y="15">Enter the one time code</tspan>
                        </text>
                        <g id="Group_511" data-name="Group 511" transform="translate(17.625 7.5)">
                            <g id="Group_511-2" data-name="Group 511">
                                <path id="Path_331" data-name="Path 331" d="M213.958,280.09l-.241,2.167a.382.382,0,0,0,
                                .38.424h1.528a.382.382,0,0,0,.38-.424l-.241-2.167a1.511,1.511,0,0,0,.625-1.229,1.528,
                                1.528,0,1,0-3.056,0A1.511,1.511,0,0,0,213.958,280.09Zm.9-1.993a.761.761,0,0,1,.33,
                                1.449.382.382,0,0,0-.213.386l.221,1.985h-.674l.221-1.985a.382.382,0,0,0-.213-.386.761.
                                761,0,0,1,.33-1.449Z" transform="translate(-207.986 -267.402)" fill="#767676"/>
                                <path id="Path_332" data-name="Path 332" d="M77.369,6.875H76.223V5.347a5.347,5.347,0,0,
                                0-10.695,0V6.875H64.382A.382.382,0,0,0,64,7.257v9.549a1.529,1.529,0,0,0,1.528,1.528H76.
                                223a1.529,1.529,0,0,0,1.528-1.528V7.257A.382.382,0,0,0,77.369,6.875ZM66.292,5.347a4.584,
                                4.584,0,1,1,9.167,0V6.875h-.764V5.347a3.82,3.82,0,1,0-7.639,0V6.875h-.764Zm7.639,0V6.
                                875H67.82V5.347a3.056,3.056,0,0,1,6.111,0Zm3.056,11.459a.765.765,0,0,1-.764.764H65.528a.
                                765.765,0,0,1-.764-.764V7.639H76.987Z" transform="translate(-64)" fill="#767676"/>
                            </g>
                        </g>
                    </g>
                    <text id="Enter_the_code_sent_to_your_mobile_phone:" 
                        data-name="Enter the code sent to your mobile phone:" transform="translate(792 -1084)" 
                        fill="rgba(0,0,0,0.8)" fontSize="14" fontFamily="Roboto-Regular, Roboto">
                        <tspan x="0" y="15">Enter the code sent to your mobile phone:</tspan>
                    </text>
                </g>
            </svg>
        </div>
    );
};
