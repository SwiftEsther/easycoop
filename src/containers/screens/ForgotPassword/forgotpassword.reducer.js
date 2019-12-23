import {RECOVER_PASSWORD, RECOVER_PASSWORD_SUCCESS, RECOVER_PASSWORD_FAILURE, RESET_ERROR_MESSAGE} from './actions/types';

const initialState = {
    forceNumber: '',
    apNumber: '',
    error: '',
    loading: false,
    passwordReset: false
}

export default (state=initialState, actionType) => {
    switch (actionType) {
        case RECOVER_PASSWORD:
            return{
                ...state,
                loading: true
            }    
        case RECOVER_PASSWORD_SUCCESS:
            return{
                ...state,
                passwordReset: true,
                loading: false
            }  
        case RECOVER_PASSWORD_FAILURE:
            return{
                ...state,
                error: action.error,
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
