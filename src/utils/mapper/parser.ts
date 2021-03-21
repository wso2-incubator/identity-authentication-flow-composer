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

import { parse } from "@babel/parser";
import { File } from "@babel/types";

/**
 * Generate code from and AST(Abstract Syntax Tree).
 *
 * {@link https://babeljs.io/docs/en/babel-parser}
 *
 * @example
 * // returns {
    "type": "File",
    "start": 0,
    "end": 9,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 9
        }
    },
    "errors": [],
    "program": {
        "type": "Program",
        "start": 0,
        "end": 9,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 9
            }
        },
        "sourceType": "script",
        "interpreter": null,
        "body": [
            {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 9,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 9
                    }
                },
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 9,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 9
                            }
                        },
                        "id": {
                            "type": "Identifier",
                            "start": 4,
                            "end": 5,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 5
                                },
                                "identifierName": "a"
                            },
                            "name": "a"
                        },
                        "init": {
                            "type": "NumericLiteral",
                            "start": 8,
                            "end": 9,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 8
                                },
                                "end": {
                                    "line": 1,
                                    "column": 9
                                }
                            },
                            "extra": {
                                "rawValue": 2,
                                "raw": "2"
                            },
                            "value": 2
                        }
                    }
                ],
                "kind": "var"
            }
        ],
        "directives": []
    },
    "comments": []
 }
 * parseToAst("var a = 2");
 *
 * @param {string} value - Javascript code which need to parse to an AST.
 *
 * @return {File} Returns the Abstract Syntax Tree.
 */
export const parseToAst = (value:string) : File => {
    try {
        return parse(value);
    }catch (e) {
        return parse("");
    }
};
