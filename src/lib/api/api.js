import axios from 'axios';
import { AsyncStorage } from "react-native";
import { USER_LOGOUT } from "../../screens/Auth/action/types";
import { store } from "../../../App";
import NavigationService from '../../../NavigationService';
import env from '../../../env.js'

import { showToast } from "../../components/Toast/actions/toastActions";

const ACCESS_TOKEN = 'access_token';


// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();

export class apiRequest {

        appendHeaders = (extraHeaders, isUpload) => {
            let username = await AsyncStorage.getItem(USERNAME);
            let password = await AsyncStorage.getItem(PASSWORD);
            if (extraHeaders) {
                this.headers = new Headers(extraHeaders);
            }
            else {
                this.headers = new Headers({
                    'Authorization': `Basic ${username}:${password}`,
                    'Content-Type': 'application/json'
                });

                if (isUpload) {
                    this.headers.delete('content-type');
                }

            }
        }

        get = (url) => {
            this.appendHeaders();
            return fetch(`${url}`, {
                headers: this.headers,
                method: "GET"
            }).then(this.processResponse);
        };

        post = (url, body, extraHeaders) => {
            this.appendHeaders(extraHeaders);
    
            return fetch(`${url}`, {
                body: isEncoded ? body : JSON.stringify(body),
                headers: this.headers,
                method: "POST"
            }).then(this.processResponse)
        };

        processResponse(response) {

            return new Promise((resolve, reject) => {
                // will resolve or reject depending on status, will pass both "status" and "data" in either case
                let func;
    
                response.status < 400 ? (func = resolve) : (func = reject);
    
                if (response.status === 401 && response.url.search('login') === -1) {
                    window.location.href = window.location.origin + '/';
                    localStorage.clear();
                    return;
                }
    
                return response
                    .json()
                    .then(data => func(data))
                    .catch(data => func(data));
            });
        }
}
