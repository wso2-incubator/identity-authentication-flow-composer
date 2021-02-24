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
 *
 */

// Base ESLint Config which can be extended to be used in the development environment.

module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:import/typescript",
        "plugin:react-hooks/recommended"
    ],
    globals: {
    // no-undef complains about globalThis @see {@link https://github.com/eslint/eslint/issues/11553}
        globalThis: false
    },
    overrides: [
        {
            env: {
                browser: true,
                es6: true,
                node: true
            },
            extends: [
                "eslint:recommended",
                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended"
            ],
            files: ["**/*.tsx", "**/*.ts"],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                ecmaVersion: 9,
                sourceType: "module"
            },
            rules: {
                "@typescript-eslint/explicit-function-return-type": 0,
                "@typescript-eslint/no-empty-function": [ "error", { "allow": ["constructors"] } ],
                "@typescript-eslint/no-explicit-any": 0,
                "@typescript-eslint/no-inferrable-types": "off",
                "@typescript-eslint/no-use-before-define": [
                    "warn",
                    {
                        classes: false,
                        functions: false,
                        typedefs: false,
                        variables: false
                    }
                ],
                "eol-last": "error",
                // In development, error level is set to `warn`. This will be overridden
                // by the production env linting config.
                "no-debugger": 1,
                "no-undef": 1,
                "no-use-before-define": "off"
            },
            settings: {
                react: {
                    version: "detect"
                }
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 9,
        sourceType: "module"
    },
    plugins: ["import"],
    rules: {
        "comma-dangle": ["warn", "never"],
        "eol-last": "error",
        "import/order": [
            "warn",
            {
                "alphabetize": {
                    caseInsensitive: true,
                    order: "asc"
                },
                "groups": [ "builtin", "external", "index", "sibling", "parent", "internal" ]
            }
        ],
        "indent": ["error", 4],
        "jsx-quotes": [ "warn", "prefer-double" ],
        "max-len": ["warn", { "code": 120 }],
        "no-console": "warn",
        "no-duplicate-imports": "warn",
        "no-restricted-imports": ["warn", { "patterns": ["@wso2is/**/dist/**"] }],
        "no-unused-vars": 1,
        "object-curly-spacing": ["warn", "always"],
        "quotes": ["warn", "double"],
        "react-hooks/exhaustive-deps": ["off"],
        "react/display-name": 0,
        "react/jsx-curly-spacing": [
            "warn",
            {
                allowMultiline: true,
                children: { "when": "always" },
                spacing: { objectLiterals: "always" },
                when: "always"
            }
        ],
        "react/no-children-prop": 0,
        "react/prop-types": 1,
        "semi": 1,
        "sort-imports": ["warn", {
            "ignoreCase": false,
            "ignoreDeclarationSort": true,
            "ignoreMemberSort": false
        }],
        "sort-keys": ["warn", "asc", { "caseSensitive": true, "minKeys": 2, "natural": false }]
    },
    settings: {
        react: {
            version: "detect"
        }
    }
};
