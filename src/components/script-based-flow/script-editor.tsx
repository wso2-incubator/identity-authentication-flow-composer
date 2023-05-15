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

import Editor  from "@monaco-editor/react";
import React, { FunctionComponent, ReactElement } from "react";

/**
 * Script editor component Prop types.
 */
export interface ScriptEditorProps {
    /**
     * Height of the editor
     */
    height?: string;
    /**
     * Width of the editor
     */
    width?: string;
    /**
     * Editor Theme
     */
    theme?: "vs-dark" | "dark" | "light";
    /**
     * Language the code is written in.
     */
    language?: "javascript" | "json" | "typescript" | "htmlmixed";
    /**
     * Language the code is written in.
     */
    code?: string | undefined;
    /**
     * Function to handle changes of the code in the script editor
     */
    handleCodeChanges: (value: string | undefined) => void;
    /**
     * Should line select on line numbers
     */
    selectOnLineNumbers?: boolean;
}

/**
 * Script editor component.
 *
 * @param {ScriptEditorProps} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const ScriptEditor: FunctionComponent<ScriptEditorProps> = (
    props: ScriptEditorProps
): ReactElement => {

    const {
        height,
        width,
        theme,
        language,
        code,
        handleCodeChanges,
        selectOnLineNumbers
    } = props;

    return (
        <Editor
            value={ code }
            onChange={
                (value) => {
                    handleCodeChanges(value);
                }
            }
            height={ height }
            width={ width }
            language={ language }
            theme={ theme }
            options={
                {
                    selectOnLineNumbers
                }
            }
        />
    );
};

/**
 * Default props for the script editor component.
 */
ScriptEditor.defaultProps = {
    height: "100%",
    language: "javascript",
    selectOnLineNumbers: true,
    theme: "vs-dark",
    width: "100%"
};
