import {CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE, RESET_ERROR_MESSAGE} from './types';

export const changePassword = () => {
    return {
        type: CHANGE_PASSWORD
    };
};
export const changePasswordSuccess = (payload) => {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        payload
    };
};

export const changePasswordFailure = (error) => {
    return {
        type: CHANGE_PASSWORD_FAILURE,
        error
    };
};

export const resetErrorMessage = () => {
    return {
        type: RESET_ERROR_MESSAGE
    };
};
