import {RECOVER_PASSWORD, RECOVER_PASSWORD_SUCCESS, RECOVER_PASSWORD_FAILURE, RESET_ERROR_MESSAGE} from './types';

export const recoverPassword = () => {
    return {
        type: RECOVER_PASSWORD
    };
};
export const recoverPasswordSuccess = (payload) => {
    return {
        type: RECOVER_PASSWORD_SUCCESS,
        payload
    };
};

export const recoverPasswordFailure = (error) => {
    return {
        type: RECOVER_PASSWORD_FAILURE,
        error
    };
};

export const resetErrorMessage = () => {
    return {
        type: RESET_ERROR_MESSAGE
    };
};
