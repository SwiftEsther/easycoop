import {
    GET_MEMBER_BALANCES,
    GET_MEMBER_BALANCES_SUCCESS,
    GET_MEMBER_BALANCES_FAILURE,
    RESET_ERROR_MESSAGE
} from "./actions/types";

const initialState = {
    error: "",
    loading: false,
    memberBalancesFetched: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_MEMBER_BALANCES:
            return {
                ...state,
                loading: true
            };
        case GET_MEMBER_BALANCES_SUCCESS:
        console.log(action.payload);
            return {
                ...state,
                ...action.payload,
                loading: false,
                memberBalancesFetched: true
            };
        case GET_MEMBER_BALANCES_FAILURE:
            console.log(action.error);
            return {
                ...state,
                error: action.error,
                loading: false,
                memberBalancesFetched: false
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
