import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, RESET_ERROR_MESSAGE} from './types';

export const login = () => {
    return {
        type: LOGIN
    };
};
export const loginSuccess = (payload) => {
    console.log(payload)
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
