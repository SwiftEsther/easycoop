import { apiRequest } from '../../../../lib/api/api';
import { postAuthInit } from '../../../../lib/api/url';
import base64 from 'base-64';

export const loginService ={
    logUserIn
};

function logUserIn() {
    return apiRequest(postAuthInit, "GET", {auth: base64.encode(username+":"+password)} );
}
