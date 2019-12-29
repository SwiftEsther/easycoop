import {
    SEND_SUPPORT_MAIL,
    SEND_SUPPORT_MAIL_FAILURE,
    SEND_SUPPORT_MAIL_SUCCESS,
    RESET_ERROR_MESSAGE
} from "./actions/types";

const initialState = {
    loading: false,
    mailSent: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SEND_SUPPORT_MAIL:
            return {
                ...state,
                loading: true
            };
        case SEND_SUPPORT_MAIL_SUCCESS:
            return {
                ...state,
                ...action.payload,
                mailSent: true,
                loading: false
            };
        case SEND_SUPPORT_MAIL_FAILURE:
            return {
                ...state,
                error: action.error,
                mailSent: false,
                loading: false
            };
        case RESET_ERROR_MESSAGE:
            return {
                ...state,
                error: ""
            };
        default:
            return state;
    }
};
