import {
    RESET_ERROR_MESSAGE,
    GET_LOAN_APPLICATIONS,
    GET_LOAN_APPLICATIONS_FAILURE,
    GET_LOAN_APPLICATIONS_SUCCESS,
    GET_TRANSACTION_HISTORY,
    GET_TRANSACTION_HISTORY_FAILURE,
    GET_TRANSACTION_HISTORY_SUCCESS,
    GET_WITHDRAWAL_HISTORY,
    GET_WITHDRAWAL_HISTORY_FAILURE,
    GET_WITHDRAWAL_HISTORY_SUCCESS
} from './types';

export const getLoanApplications = () => {
    return {
        type: GET_LOAN_APPLICATIONS
    };
};
export const getLoanApplicationsSuccess = (payload) => {
    console.log(payload)
    return {
        type: GET_LOAN_APPLICATIONS_SUCCESS,
        payload
    };
};

export const getLoanApplicationsFailure = (error) => {
    return {
        type: GET_LOAN_APPLICATIONS_FAILURE,
        error
    };
};

export const getTransactionHistory = () => {
    return {
        type: GET_TRANSACTION_HISTORY
    };
};
export const getTransactionHistorySuccess = (payload) => {    
    console.log(payload)
    return {
        type: GET_TRANSACTION_HISTORY_SUCCESS,
        payload
    };
};

export const getTransactionHistoryFailure = (error) => {
    return {
        type: GET_TRANSACTION_HISTORY_FAILURE,
        error
    };
};

export const getWithdrawalHistory = () => {
    return {
        type: GET_WITHDRAWAL_HISTORY
    };
};
export const getWithdrawalHistorySuccess = (payload) => {
    console.log(payload)
    return {
        type: GET_WITHDRAWAL_HISTORY_SUCCESS,
        payload
    };
};

export const getWithdrawalHistoryFailure = (error) => {
    return {
        type: GET_WITHDRAWAL_HISTORY_FAILURE,
        error
    };
};

export const resetErrorMessage = () => {
    return {
        type: RESET_ERROR_MESSAGE
    };
};
