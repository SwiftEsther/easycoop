import { CHANGE_BALANCE, CHANGE_BALANCE_SUCCESS, CHANGE_BALANCE_FAILURE, RESET_ERROR_MESSAGE,USER_LOGOUT} from './types';

export const changeBalance = () => {
    return {
        type: CHANGE_BALANCE
    };
};
export const changeBalanceSuccess = (payload) => {
    return {
        type: CHANGE_BALANCE_SUCCESS,
        payload
    };
};

export const changeBalanceFailure = (error) => {
    return {
        type: CHANGE_BALANCE_FAILURE,
        error
    };
};

export const resetErrorMessage = () => {
    return {
        type: RESET_ERROR_MESSAGE
    };
};
