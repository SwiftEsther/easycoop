import {GET_MEMBER_BALANCES, GET_MEMBER_BALANCES_SUCCESS, GET_MEMBER_BALANCES_FAILURE, RESET_ERROR_MESSAGE} from '../actions/types';

const initialState = {
    voluntaryBalance: 0,
    compulsoryBalance: 0,
    walletBalance: null,
    targetSavingsBalance: null,
    sharesBalance: null,
    totalBalance: 0,
    shareUnitPrice: null,
    shareValue: null,
    balanceAsAt: "",
    error: '',
    loading: false,
    memberBalancesFetched: false,
}

export default (state=initialState, action) => {
    switch (action.type) {
        case GET_MEMBER_BALANCES:
            return{
                ...state,
                loading: true
            }    
        case GET_MEMBER_BALANCES_SUCCESS:
            return{
                ...state,
                ...action.payload,
                loading: false,
                memberBalancesFetched: true
            }  
        case GET_MEMBER_BALANCES_FAILURE:
            return{
                ...state,
                error: action.error,
                loading: false,
                memberBalancesFetched: false
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
