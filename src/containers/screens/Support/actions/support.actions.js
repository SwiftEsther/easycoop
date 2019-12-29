import { SEND_SUPPORT_MAIL, SEND_SUPPORT_MAIL_FAILURE, SEND_SUPPORT_MAIL_SUCCESS, RESET_ERROR_MESSAGE } from './types';

export const sendSupportMail = () => {
    return {
        type: SEND_SUPPORT_MAIL
    };
};
export const sendSupportMailSuccess = (payload) => {
    return {
        type: SEND_SUPPORT_MAIL_SUCCESS,
        payload
    };
};

export const sendSupportMailFailure = (error) => {
    return {
        type: SEND_SUPPORT_MAIL_FAILURE,
        error
    };
};

export const resetErrorMessage = () => {
    return {
        type: RESET_ERROR_MESSAGE
    };
};
