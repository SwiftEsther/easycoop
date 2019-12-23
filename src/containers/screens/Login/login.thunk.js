import {Dispatch} from 'react-redux';
import base64 from 'base-64';

import {LoginService} from './services/login.service';
import {
    login,
    loginFailure,
    loginSuccess,
    resetErrorMessage
} from './actions/login.actions';
import {apiRequest} from "../../../lib/api/api";
import {a} from "../../../lib/api/api";

const loginService = new LoginService();

export const doLogin = (auth) => {
    return (dispatch) => {
        dispatch(login());

        const extraHeaders = new Headers({
            Authorization: `Basic ${base64.encode(auth.username+":"+auth.password)}`,
            "Content-Type": "application/x-www-form-urlencoded"
        });

        loginService.
            LogIn(extraHeaders)
            .then((response) => {
                console.log(response)
                dispatch(loginSuccess(response));
            })
            .catch((error) => {
                console.log(error.request)
                console.log(error)
                dispatch(loginFailure(error.error_description || 'Server Error. Please try again'));

                setTimeout(() => {
                    dispatch(resetErrorMessage());
                }, 5000);
            });
    };
};
