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
import { Handle, Node, Position } from "react-flow-renderer";
import { MdDelete, MdModeEdit } from "react-icons/all";
import { shallowEqual, useSelector } from "react-redux";
import { Popup } from "semantic-ui-react";
import { AuthenticationStep } from "../../../models";
import { Basic, IdentifierFirst, LoginBox } from "../../core";

/**
 * Step node interface prop types.
 */
export type StepNodeInterface = Node;

/**
 * Step Node component.
 * This is a custom node supported by react flow renderer library.
 * See {@link https://reactflow.dev/docs/api/node-types/} for its documentation
 * and {@link https://reactflow.dev/examples/custom-node/} for an example
 *
 * @param {StepNodeInterface} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const StepNode: FunctionComponent<StepNodeInterface> = (
    props: StepNodeInterface
) : ReactElement => {

    const {
        data
    } = props;

    const stepId: number = data.text;
    const onClick: ()=>void = data.onClick;
    const showAuthenticatorsList: ()=>void = data.showAuthenticatorsList;

    let factors: string[] = [];

    const [steps, useSubjectFrom, useAttributesFrom] : [AuthenticationStep[], number, number] = useSelector(
        (state:any) => {
            return [
                state.stepReducer.steps,
                state.stepReducer.subjectIdentifierStep,
                state.stepReducer.attributesIdentifierStep
            ];
        },
        shallowEqual
    );

    const step = steps.filter((step:any)=>+step.stepId==+stepId);

    if (step.length>0) {
        factors = step[0].authenticators;
    }

    return (
        <div className="step-wrapper">
            <div className="step-header">
                <h4 className="step-header-text">Step { stepId }</h4>
                <div className="header-label-container">
                    { stepId==useSubjectFrom &&
                        <Popup
                            content="Subject identifier is used from this step"
                            trigger={
                                <div className="step-header-label">
                                    Subject
                                </div>
                            }
                        />
                    }
                    { stepId==useAttributesFrom &&
                        <Popup
                            content="Attributes are used from this step"
                            trigger={
                                <div className="step-header-label">
                                    Attributes
                                </div>
                            }
                        />
                    }
                </div>
            </div>
            <div className="step-container">
                <div className="step-top-bar">
                    <Popup
                        content="Edit"
                        trigger={
                            <button className="step-button" onClick={ showAuthenticatorsList }>
                                <MdModeEdit/>
                            </button>
                        }
                    />
                    <Popup
                        content="Remove"
                        trigger={
                            <button className="step-button" onClick={ onClick }><MdDelete/></button>
                        }
                    />
                </div>
                <Handle
                    type="target"
                    position={ Position.Left }
                    style={ { opacity : 0 } }
                />
                { (factors.indexOf("basic")!==-1)? (
                    <Basic options={ factors.filter((factor)=>factor!=="basic") }/>
                )
                    :(factors.indexOf("identifier-first")!==-1)? (
                        <IdentifierFirst options={ factors.filter((factor)=>factor!=="identifier-first") }/>
                    )
                        :(<LoginBox options={ factors }/>)
                }
                <Handle
                    type="source"
                    position={ Position.Right }
                    id= { "branch" }
                    style={ { opacity:0 } }
                />
                <Handle
                    type="source"
                    position={ Position.Bottom }
                    id="failure"
                    style={ { backgroundColor: "#8d4a4a", opacity:0 } }
                />
                <Handle
                    id="failTarget"
                    type="target"
                    position={ Position.Top }
                    style={ { opacity : 0 } }
                />
            </div>
        </div>
    );

};
