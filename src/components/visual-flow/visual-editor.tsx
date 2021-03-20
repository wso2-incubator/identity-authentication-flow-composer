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

import { File } from "@babel/types";
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import ReactFlow, { Background, BackgroundVariant, Controls, FlowElement } from "react-flow-renderer";
import { AiFillWarning } from "react-icons/all";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { edgeTypes } from "./edges";
import {
    AuthenticationOptionElement,
    AuthenticationStepElement,
    ConditionElement,
    ConnectorElement,
    CustomEdge,
    DoneElement,
    Edge,
    PlusElement,
    StartElement
} from "./flow-elements";
import { nodeTypes } from "./nodes";
import { AuthenticationStep } from "../../models";
import {
    setAstFromVisualEditor,
    setAuthenticationStep,
    setIntermediateAuthenticationStep
} from "../../store/actions/actions";
import {
    addCondition,
    addConditionBeforeStep, addStepToCondition,
    addSuccessFailureSteps,
    addSuccessFailureStepsBefore,
    addSuccessFailureStepsBeforeCondition,
    deleteStep,
    getAllStepsFromAst, getConditionArguments,
    getHarmfulOperations,
    hasLoginRequest
} from "../../utils";
import { ComponentSelector, ConditionsList, StepConfigurationModal } from "../core";

/**
 * Visual editor component Prop types.
 */
export interface VisualEditorProps {
    /**
     * Variant in the background of the visual editor flow
     */
    variant?: BackgroundVariant;
    /**
     * The gap between the dots or lines
     */
    flowGap?: number;
    /**
     * The color of the dots or lines
     */
    flowBackgroundColor?: string;
    /**
     * The radius of the dots or the stroke width of the lines
     */
    size?: number;
}

const stepHeight: number = 220;
const stepWidth: number = 300;
const distanceX: number = 350;
const gapX: number = 150;
const conditionWidth: number = 50;
let uniqueNodeIdList: any[] = []; //Array to keep a unique nodes id list
let lastStep: any = null;
let x: number = 20;
let y: number = 200;
let lastStepY: number = 200;
let stepsToSuccess: any[] = [];

/**
 * Visual Editor component.
 *
 * @param {VisualEditorProps} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const VisualEditor : FunctionComponent<VisualEditorProps> = (
    props: VisualEditorProps
) : ReactElement => {

    const {
        variant,
        flowGap,
        flowBackgroundColor,
        size
    } = props;

    const [visibleComponentSelector, setVisibleComponentSelector] = useState<boolean>(false);
    const [visibleStepConfigurationModal, setVisibleStepConfigurationModal] = useState<boolean>(false);
    const [visibleConditionsModal, setVisibleConditionsModal] = useState<boolean>(false);
    const [flowElements, setFlowElements] = useState<FlowElement[]>([]);
    const [stepToViewAuthFactors, setStep] = useState<any>(null);
    const [successFailure, setSuccessFailure] = useState<any>(null);
    const [nextStep, setNextStep] = useState<any>(null);
    const [endsWithCondition, setEndsWithCondition] = useState<any>(null);

    const [ast, steps] : [File, AuthenticationStep[]] = useSelector(
        (state:any) => {
            return [state.astReducer.ast, state.stepReducer.steps];
        },
        shallowEqual
    );

    const dispatch: Dispatch<any> = useDispatch();

    const saveAuthenticationStepToStore = React.useCallback(
        (step: number, factors: string[]) => dispatch(setAuthenticationStep(step, factors)),
        [dispatch]
    );

    const saveIntermediateAuthenticationStepToStore = React.useCallback(
        (step: number, factors: string[]) => dispatch(setIntermediateAuthenticationStep(step, factors)),
        [dispatch]
    );

    const saveAstToStore = React.useCallback(
        (ast: File) => dispatch(setAstFromVisualEditor(ast)),
        [dispatch]
    );

    const stepsArray = getAllStepsFromAst(ast);

    const addEdge = (
        source: string, target: string, color: string, label?: string, handler?: string, targetHandler?: string,
        custom: boolean = false
    ) => {
        if(custom) {
            setFlowElements((elements:any[])=>[
                ...elements,
                CustomEdge(`${source}${target}`, source, target, label, color, handler, targetHandler, undefined,
                    undefined, -40, 400)
            ]);
        } else {
            setFlowElements((elements: any[]) => [
                ...elements,
                Edge(`${source}${target}`, source, target, label, color, handler, targetHandler)]
            );
            stepsToSuccess = stepsToSuccess.filter((value) => {
                return value !== source;
            });
        }
    };

    const addElement = (step: string, xVal: number, yVal: number, type?: string, args?: string[]) => {

        if (type === "start") {
            setFlowElements((elements: any[]) => [...elements, StartElement(step, xVal, yVal)]);
        } else if (type === "condition") {
            setFlowElements((elements: any[]) => [...elements, ConditionElement(step, step, xVal, yVal, args)]);
            uniqueNodeIdList.push(step);
            stepsToSuccess.push(step);
        } else if (type === "done") {
            setFlowElements((elements: any[]) => [...elements, DoneElement(step, xVal, yVal)]);
        } else if (type === "plus") {
            setFlowElements((elements: any[]) => [...elements, PlusElement(step, xVal, yVal)]);
        } else if (type === "connector") {
            setFlowElements((elements: any[]) => [...elements, ConnectorElement(step, xVal, yVal)]);
        } else {
            const elementList: any[] = [];
            const authFactorsWithStep = steps.filter((element: any) => element.stepId === step);
            elementList.push(AuthenticationStepElement(step, xVal, yVal, () => onClickDelete(step),
                () => showAuthenticatorsList(step)));
            uniqueNodeIdList.push(step);
            lastStep = step;
            if (authFactorsWithStep.length > 0) {
                const isBasicIncluded = authFactorsWithStep[0].authenticators.indexOf("basic") !== -1;
                let authenticatorOptions;
                if (isBasicIncluded) {
                    authenticatorOptions = authFactorsWithStep[0].authenticators.filter(
                        (factor: any) => factor !== "basic");
                } else {
                    authenticatorOptions = authFactorsWithStep[0].authenticators;
                }
                if (authenticatorOptions.length > 0) {
                    elementList.push(ConnectorElement(step + "connector", xVal + 650, yVal - 12.5 + stepHeight));
                    uniqueNodeIdList.push(step + "connector");
                    if (isBasicIncluded) {
                        elementList.push(Edge(`${step}${step + "connector"}`, step, step + "connector",
                            " Basic ", "#D6D5E6", undefined, "targetLeft"));
                    }
                    const indexToSplit = authenticatorOptions.length / 2;
                    let firstHalf: any[] = [];
                    let secondHalf: any[] = [];
                    if (!isBasicIncluded && authenticatorOptions.length === 1) {
                        const factor = authenticatorOptions[0];
                        elementList.push(AuthenticationOptionElement(step + factor, factor, xVal + 350,
                            yVal + stepHeight / 2 - 28.5));
                        elementList.push(CustomEdge(`${step}${step + factor}`, step, step + factor,
                            undefined, "#D6D5E6", undefined, undefined));
                        elementList.push(CustomEdge(`${step + factor}${step + "connector"}`, step + factor,
                            step + "connector", undefined, "#D6D5E6", undefined,
                            "targetLeft", undefined));
                    } else {
                        if (authenticatorOptions.length === 1) {
                            firstHalf = authenticatorOptions;
                        } else {
                            [firstHalf, secondHalf] = [authenticatorOptions.slice(0, indexToSplit),
                                authenticatorOptions.slice(indexToSplit)];
                        }
                        for (const index1 in firstHalf) {
                            const factor1 = firstHalf[index1];
                            elementList.push(AuthenticationOptionElement(step + factor1, factor1, xVal + 380,
                                yVal - 100 - 300 * +index1));
                            elementList.push(CustomEdge(`${step}${step + factor1}`, step, step + factor1,
                                undefined, "#D6D5E6", undefined, undefined,
                                -10 * (+index1 + 1)));
                            elementList.push(CustomEdge(`${step + factor1}${step + "connector"}`,
                                step + factor1, step + "connector", undefined, "#D6D5E6",
                                undefined, "targetTop", undefined, 10 * +index1));
                        }
                        for (const index in secondHalf) {
                            const factor = secondHalf[index];
                            elementList.push(AuthenticationOptionElement(step + factor, factor, xVal + 380,
                                yVal + 260 + 300 * +index));
                            elementList.push(CustomEdge(`${step}${step + factor}`, step, step + factor,
                                undefined, "#D6D5E6", undefined, undefined,
                                10 * (+index + 1)));
                            elementList.push(CustomEdge(`${step + factor}${step + "connector"}`,
                                step + factor, step + "connector", undefined, "#D6D5E6",
                                undefined, "targetBottom", undefined, 10*+index));
                        }
                    }
                    stepsToSuccess.push(step + "connector");
                    x+=distanceX; //Add a space after adding authenticators
                }else{
                    stepsToSuccess.push(step);
                }
            }else{
                stepsToSuccess.push(step);
            }
            setFlowElements((elements: any[]) => [...elements, ...elementList]);
        }
    };

    const onComponentSelectorCancel = () =>{
        setVisibleComponentSelector(false);
    };

    const openStepConfigModal = () => {
        setVisibleComponentSelector(false);
        setVisibleStepConfigurationModal(true);
    };

    const openConditionModal = () => {
        setVisibleComponentSelector(false);
        setVisibleConditionsModal(true);
    };

    const addConditionToFlow = (condition: string, params?: any) => {
        let newAst : any;
        setVisibleConditionsModal(false);
        if (nextStep !== null){
            if (isNaN(+nextStep)) {
                // [newAst, step] = AddSuccessFailureStepsBeforeCondition(ast, beforeStep);
            } else {
                newAst = addConditionBeforeStep(ast, nextStep, condition, params);
            }
            setNextStep(null);
        } else {
            newAst = addCondition(ast, lastStep, condition, params);
            setEndsWithCondition(condition);
        }
        saveAstToStore(newAst);
    };

    const onClick = (element: any) => {
        if (element.type === "plus") {
            const newStep = element.id.split(" ")[1].split(".")[0];
            if (newStep !== "final") {
                setNextStep(newStep);
            }
            setVisibleComponentSelector(true);
            setSuccessFailure(null);
        } else if(element.type === "failure") {
            setSuccessFailure(element.id);
            setVisibleStepConfigurationModal(true);
        }
    };

    const onClickDelete = (step: string) => {
        const newAst = deleteStep(ast, step);
        saveAstToStore(newAst);
    };

    const showAuthenticatorsList = (step: string) => {
        setVisibleStepConfigurationModal(true);
        setStep(step);
    };

    const onStepConfigModalDone = (authFactors: any[]) => {
        let step: number;
        if (stepToViewAuthFactors === null) {
            let newAst;
            let currentStep = lastStep;
            let stepType = "success";
            if (successFailure !== null) {
                currentStep = successFailure[0];
                stepType = "failure";
                newAst = addSuccessFailureSteps(ast, currentStep, (+lastStep + 1).toString(), stepType);
                step = lastStep + 1;
                saveAuthenticationStepToStore(step, authFactors);
            } else if (nextStep !== null){
                if (isNaN(+nextStep)) {
                    [newAst, step] = addSuccessFailureStepsBeforeCondition(ast, nextStep);
                } else {
                    newAst = addSuccessFailureStepsBefore(ast, nextStep);
                    step = nextStep;
                }
                saveIntermediateAuthenticationStepToStore(+step, authFactors);
                setNextStep(null);
            }
            else if (endsWithCondition === null) {
                newAst = addSuccessFailureSteps(ast, currentStep, (+lastStep + 1).toString(), stepType);
                step = lastStep + 1;
                saveAuthenticationStepToStore(step, authFactors);
            }
            else {
                newAst = addStepToCondition(ast, endsWithCondition, (+lastStep + 1).toString());
                setEndsWithCondition(null);
                step = lastStep + 1;
                saveAuthenticationStepToStore(step, authFactors);
            }
            saveAstToStore(newAst);
        }else {
            step = stepToViewAuthFactors;
            saveAuthenticationStepToStore(step, authFactors);
            setStep(null);
        }
        setVisibleStepConfigurationModal(false);
    };

    useEffect(() => {
        uniqueNodeIdList = [];
        stepsToSuccess = [];
        x = 20; y = 200; lastStepY = 100; lastStepY = 200;
        setFlowElements([]);
        setVisibleComponentSelector(false);
        setVisibleStepConfigurationModal(false);
        setVisibleConditionsModal(false);
        setFlowElements([]);
        setSuccessFailure(null);

        for (const step of stepsArray){
            const currentStep = step.step;
            const onSuccessPath = step.onSuccess;
            const onFailurePath = step.onFail;

            if (uniqueNodeIdList.indexOf(currentStep) === -1) {
                if (uniqueNodeIdList.length < 1) {
                    addElement("start", x, y+stepHeight - 31.5, "start");
                    addEdge("start", "plus "+currentStep, "#D6D5E6");
                    x += gapX+115;
                } else {
                    y = lastStepY;
                    const last = uniqueNodeIdList[uniqueNodeIdList.length - 1];
                    addEdge(last, "plus " + currentStep, "#D6D5E6");
                }
                addElement("plus " + currentStep, x - gapX/2 - 15, y + stepHeight - 18.5, "plus");
                addElement(currentStep, x, y);
                addEdge("plus " + currentStep, currentStep, "#D6D5E6");
                x += stepWidth + gapX;
            }

            if (onSuccessPath !== undefined){
                const condition = onSuccessPath.condition;
                const successPath = onSuccessPath.onConditionSuccess;
                const remainSuccess = onSuccessPath.remainingSuccess;

                if(condition !== undefined && uniqueNodeIdList.indexOf(condition) === -1){
                    addElement("plus " + condition, x - gapX/2 - 15, y + 201.5, "plus");
                    addElement(condition, x, y + 185.5, "condition", getConditionArguments(ast).toString());
                    addEdge(uniqueNodeIdList[uniqueNodeIdList.length - 2], "plus "+condition, "#D6D5E6");
                    addEdge("plus "+condition, condition, "#D6D5E6");
                    addEdge(condition, "done", "red", "Else","sourceTop",
                        "targetTop", true);
                    x += gapX + conditionWidth;
                }

                for (const successStep of successPath){
                    if (uniqueNodeIdList.indexOf(successStep) === -1){
                        addElement("plus " + successStep, x - gapX/2 - 15, y + 201.5, "plus");
                        addElement(successStep, x, y);
                        addEdge("plus "+successStep, successStep, "#D6D5E6");
                        x+=stepWidth + gapX;
                    }
                    if (successPath.indexOf(successStep)===0){
                        addEdge(condition, "plus "+successStep, "#D6D5E6");
                    }
                    else{
                        addEdge(uniqueNodeIdList[uniqueNodeIdList.length - 3], "plus " + successStep,"#D6D5E6");
                    }
                }

                for (const successStep of remainSuccess){
                    if (uniqueNodeIdList.indexOf(successStep) === -1) {
                        if (remainSuccess.indexOf(successStep) === 0) {
                            addEdge(uniqueNodeIdList[uniqueNodeIdList.length - 1], "plus "+successStep, "#D6D5E6");
                        } else {
                            addEdge(remainSuccess[remainSuccess.indexOf(successStep) - 1], "plus "+successStep,
                                "#D6D5E6");
                        }
                        addElement("plus " + successStep, x - gapX/2 - 15, y + 201.5, "plus");
                        addElement(successStep, x, y);
                        addEdge("plus " + successStep, successStep, "#D6D5E6");
                        x += stepWidth + gapX;
                    }
                }
            }

            if (onFailurePath!==undefined) {
                for (const failureStep of onFailurePath) {
                    if (uniqueNodeIdList.indexOf(failureStep) === -1) {
                        uniqueNodeIdList.push(failureStep);
                    }
                }
            }
        }

        y += 186.5;
        if(stepsToSuccess.length !== 0) {
            addElement("done", x, y - 15, "done");
        }
        for (const step of stepsToSuccess){
            addElement("plus" + step + " final", x - gapX / 2 - 15, y + 15, "plus");
            addEdge("plus" + step + " final", "done", "#D6D5E6");
            addEdge(step, "plus" + step + " final", "#D6D5E6");
        }

    }, [ast, steps]);

    return (
        <>
            {
                (hasLoginRequest(ast) && getHarmfulOperations(ast).length===0) ? (
                    <div className="react-flow-container">
                        <ComponentSelector
                            isOpen={ visibleComponentSelector }
                            onCancel={ onComponentSelectorCancel }
                            onStepSelection={ openStepConfigModal }
                            onConditionSelection={ openConditionModal }
                        />
                        { visibleStepConfigurationModal && <StepConfigurationModal
                            isOpen={ visibleStepConfigurationModal }
                            onDone={ onStepConfigModalDone }
                            step={ stepToViewAuthFactors }
                            nextStep={ nextStep }
                            onCancel={ () => {
                                setVisibleStepConfigurationModal(false);
                                setStep(null);
                            }
                            }
                        />
                        }
                        <ConditionsList
                            isOpen={ visibleConditionsModal }
                            onDone={ addConditionToFlow }
                            onCancel={ ()=>{setVisibleConditionsModal(false);} }
                        />
                        <ReactFlow
                            elements={ flowElements }
                            nodesConnectable={ false }
                            nodeTypes={ nodeTypes }
                            edgeTypes={ edgeTypes }
                            onElementClick={ (params, element)=>onClick(element) }
                        >
                            <Controls className="flow-control"/>
                            <Background
                                color={ flowBackgroundColor }
                                gap={ flowGap }
                                variant={ variant }
                                size={ size }
                                className="flow-background"
                            />
                        </ReactFlow>
                    </div>
                ) : getHarmfulOperations(ast).length>0 ?
                    (<div className="warning">
                        <div className="warning-header"><AiFillWarning className="warning-icon"/>Error</div>
                        <div className="warning-content">
                            There is a harmful operation in the script. Therefore the visual flow cannot be generated
                        </div>
                    </div>
                    ) : (
                        <div/>
                    )
            }
        </>
    );
};

/**
 * Default props for the visual editor component.
 */
VisualEditor.defaultProps = {
    flowBackgroundColor: "#aaa",
    flowGap: 16,
    size: 0.5,
    variant: BackgroundVariant.Dots
};
