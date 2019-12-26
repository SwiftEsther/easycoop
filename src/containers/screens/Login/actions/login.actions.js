import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, RESET_ERROR_MESSAGE,USER_LOGOUT} from './types';

export const login = () => {
    return {
        type: LOGIN
    };
};
export const loginSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload
    };
};


export const loginFailure = (error) => {
    return {
        type: LOGIN_FAILURE,
        error
    };
};

export const resetErrorMessage = () => {
    return {
        type: RESET_ERROR_MESSAGE
    };
};

export const logoutUserSuccess = () => {
    return {
        type: USER_LOGOUT
    };
};