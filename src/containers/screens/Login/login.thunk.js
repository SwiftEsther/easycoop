import {Dispatch} from 'react-redux';

import {LoginService} from './services/login.service';
import Login from './reducers/login.reducer';
import {
    login,
    loginFailure,
    loginSuccess,
    resetErrorMessage
} from './actions/login.actions';

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
                dispatch(loginSuccess(response));
            })
            .catch((error) => {
                dispatch(loginFailure(error.error_description || 'Server Error. Please try again'));

                setTimeout(() => {
                    dispatch(resetErrorMessage());
                }, 5000);
            });
    };
};
