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

import { ApplicationEndpointsInterface } from "../models";

const serverHost = "https://localhost:9443/t/carbon.super";

/**
 * Visual Editor component.
 *
 * @return {ApplicationEndpointsInterface}
 */
export const getApplicationsResourceEndpoints = () : ApplicationEndpointsInterface => {

    return {
        applications: `${serverHost}/api/server/v1/applications/`,
        authenticators: `${serverHost}/api/server/v1/configs/authenticators`,
        identityProviders: `${serverHost}/api/server/v1/identity-providers?filter=isEnabled eq "true"`,
        templates: `${serverHost}/api/server/v1/applications/meta/adaptive-auth-templates`
    };

};
