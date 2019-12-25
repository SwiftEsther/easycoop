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

const initialState = {
    memberId: '',
    loading: false,
    loanApplicationsFetched: false,
    transactionHistoryFetched: false,
    withdrawalHistoryFetched: false
}

export default (state=initialState, action) => {
    switch (action.type) {
        case GET_LOAN_APPLICATIONS:
            return{
                ...state,
                loading: true
            }    
        case GET_LOAN_APPLICATIONS_SUCCESS:
            return{
                ...state,
                ...action.payload,
                loanApplicationsFetched: true,
                loading: false
            }  
        case GET_LOAN_APPLICATIONS_FAILURE:
            return{
                ...state,
                error: action.error,
                loanApplicationsFetched: false,
                loading: false
            }  
        case GET_TRANSACTION_HISTORY:
            return{
                ...state,
                loading: true
            }    
        case GET_TRANSACTION_HISTORY_SUCCESS:
            return{
                ...state,
                ...action.payload,
                transactionHistoryFetched: true,
                loading: false
            }  
        case GET_TRANSACTION_HISTORY_FAILURE:
            return{
                ...state,
                error: action.error,
                transactionHistoryFetched: false,
                loading: false
            } 
        case GET_WITHDRAWAL_HISTORY:
            return{
                ...state,
                loading: true
            }    
        case GET_WITHDRAWAL_HISTORY_SUCCESS:
            return{
                ...state,
                ...action.payload,
                withdrawalHistoryFetched: true,
                loading: false
            }  
        case GET_WITHDRAWAL_HISTORY_FAILURE:
            return{
                ...state,
                error: action.error,
                withdrawalHistoryFetched: false,
                loading: false
            }
        case RESET_ERROR_MESSAGE:
            return{
                ...state,
                error: ""
            }
        default:
            return state;
    }
}
