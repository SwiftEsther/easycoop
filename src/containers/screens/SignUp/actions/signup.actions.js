import {SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE, RESET_ERROR_MESSAGE} from './types';

export const signup = () => {
    return {
        type: SIGNUP
    };
};
export const signupSuccess = (payload) => {
    return {
        type: SIGNUP_SUCCESS,
        payload
    };
};

export const signupFailure = (error) => {
    return {
        type: SIGNUP_FAILURE,
        error
    };
};

export const resetErrorMessage = () => {
    return {
        type: RESET_ERROR_MESSAGE
    };
};
