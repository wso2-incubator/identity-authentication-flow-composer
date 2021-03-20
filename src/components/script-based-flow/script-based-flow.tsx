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
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { ScriptEditor } from "./script-editor";
import { AppState } from "../../store";
import { setAstFromScriptEditor } from "../../store/actions/actions";
import { GenerateCodeFromAst, ParseToAst } from "../../utils";

/**
 * Script based flow component.
 *
 * @return {React.ReactElement}
 */
export const ScriptBasedFlow: FunctionComponent = (): ReactElement => {

    const dispatch: Dispatch<any> = useDispatch();

    const [ast, changedFromVisualEditor] : [File, boolean] = useSelector(
        (state:AppState) => {
            return [state.astReducer.ast, state.astReducer.changedFromVisualEditor];
        },
        shallowEqual
    );

    const[code, setCode] = useState(GenerateCodeFromAst(ast));

    useEffect(()=>{
        if (changedFromVisualEditor) {
            setCode(GenerateCodeFromAst(ast));
        }
    }, [ast]);

    const setAstToStore = React.useCallback(
        (ast: File) => dispatch(setAstFromScriptEditor(ast)),
        [dispatch]
    );

    const handleCodeChanges = (value: string|undefined) : void => {
        if (value===undefined){
            value="";
        }
        setCode(value);
        setAstToStore(ParseToAst(value));
    };

    return (
        <div className="script-based-flow-wrapper">
            <div className="script-based-flow-header">
                <h3>Script Editor</h3>
            </div>
            <div className="script-editor-wrapper">
                <ScriptEditor
                    code={ code }
                    handleCodeChanges={ handleCodeChanges }
                />
            </div>
        </div>
    );
};
