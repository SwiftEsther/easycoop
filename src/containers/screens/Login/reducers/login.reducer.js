import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, RESET_ERROR_MESSAGE} from '../actions/types';

const initialState = {
    username: '',
    password: '',
    error: '',
    loading: false,
    isLoggedIn: false,
}

export default (state=initialState, actionType) => {
    switch (actionType) {
        case LOGIN:
            return{
                ...state,
                loading: true
            }    
        case LOGIN_SUCCESS:
            return{
                ...state,
                ...action.payload,
                loading: false,
                isLoggedIn: true
            }  
        case LOGIN_FAILURE:
            return{
                ...state,
                error: action.error,
                loading: false,
                isLoggedIn: false
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
