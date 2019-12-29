import { GET_MEMBER_BALANCES, GET_MEMBER_BALANCES_SUCCESS, GET_MEMBER_BALANCES_FAILURE, RESET_ERROR_MESSAGE, USER_LOGOUT } from './types';

export const getMemberBalances = () => {
    return {
        type: GET_MEMBER_BALANCES
    };
};
export const getMemberBalancesSuccess = (payload) => {
    return {
        type: GET_MEMBER_BALANCES_SUCCESS,
        payload
    };
};

export const getMemberBalancesFailure = (error) => {
    return {
        type: GET_MEMBER_BALANCES_FAILURE,
        error
    };
};

export const resetErrorMessage = () => {
    return {
        type: RESET_ERROR_MESSAGE
    };
};
