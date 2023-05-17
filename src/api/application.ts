/**
 * Copyright (c) 2021-2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
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

import { AsgardeoSPAClient } from "@asgardeo/auth-react";
import { getApplicationsResourceEndpoints } from "../configs";
import { AuthenticationSequenceInterface, HttpMethod } from "../models";

/**
 * This is a wrapper function for the AsgardeoSPAClient's httpRequest function.
 * @function
 * @returns {function} - Returns a function that calls AsgardeoSPAClient.getInstance().httpRequest.
 */
const httpRequest = AsgardeoSPAClient.getInstance()!.httpRequest!.bind(AsgardeoSPAClient.getInstance());

/**
 * Gets the application details.
 *
 * @param {string|null} appId
 *
 * @return {Promise<any>} A promise containing the response.
 *
 * TODO: Use this function to get the application details to show the existing authentication flow of the application
 *  from the console when the Authentication Flow Composer opens
 */
export const getApplicationDetails = (appId: string | null): Promise<any> => {
    const requestConfig =  {
        headers: {
            Accept: "application/json"
        },
        method: HttpMethod.GET,
        url: `${getApplicationsResourceEndpoints().applications}${appId}`
    };

    return httpRequest(requestConfig)
        .then((response) => {
            if (response?.status !== 200) {
                return Promise.reject(new Error("Failed to update authentication sequence"));
            }

            return Promise.resolve(response);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Gets the authenticators or the idp list.
 *
 * @param {string} type
 *
 * @return {Promise<any>} A promise containing the response.
 */
export const getAuthenticators = (type?: string): Promise<any> => {
    const requestConfig = {
        headers: {
            Accept: "application/json"
        },
        method: HttpMethod.GET,
        url: type === "idp"
            ? getApplicationsResourceEndpoints().identityProviders
            : getApplicationsResourceEndpoints().authenticators
    };

    return httpRequest(requestConfig)
        .then((response) => {
            if (response?.status !== 200) {
                return Promise.reject(new Error("Failed to update authentication sequence"));
            }

            return Promise.resolve(response);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Gets the templates.
 *
 * @return {Promise<any>} A promise containing the response.
 *
 * Current implementation use templates from templates.json
 * TODO: Use this function to get the templates from the server.
 */
export const getTemplates = (): Promise<any> => {
    const httpRequestConfig = {
        headers: {
            Accept: "application/json"
        },
        method: HttpMethod.GET,
        url: getApplicationsResourceEndpoints().templates,

    };

    return httpRequest(httpRequestConfig)
        .then((response) => {
            if (response?.status !== 200) {
                return Promise.reject(new Error("Failed to get templates"));
            }

            return Promise.resolve(response);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Gets the authenticators or the idp list.
 *
 * @param {AuthenticationSequenceInterface} authenticationSequence
 * @param {string|null} appId
 *
 * @return {Promise<any>} A promise containing the response.
 */
export const updateAuthenticationSequence = (
    authenticationSequence: AuthenticationSequenceInterface,
    appId: string | null
): Promise<any> => {
    const requestConfig = {
        body: { authenticationSequence },
        headers: {
            Accept: "application/json"
        },
        method: HttpMethod.PATCH,
        url: `${getApplicationsResourceEndpoints().applications}${appId}`,
    };

    return httpRequest(requestConfig)
        .then((response) => {
            if (response?.status !== 200) {
                return Promise.reject(new Error("Failed to update authentication sequence"));
            }

            return Promise.resolve(response);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};
