import {
    UPDATE_PROFILE_INFO,
    UPDATE_PROFILE_INFO_SUCCESS,
    UPDATE_PROFILE_INFO_FAILURE,
    RESET_ERROR_MESSAGE
} from "./actions/types";

const initialState = {
    loading: false,
    infoUpdated: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_INFO:
            return {
                ...state,
                loading: true
            };
        case UPDATE_PROFILE_INFO_SUCCESS:
            return {
                ...state,
                ...action.payload,
                infoUpdated: true,
                loading: false
            };
        case UPDATE_PROFILE_INFO_FAILURE:
            return {
                ...state,
                error: action.error,
                infoUpdated: false,
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
