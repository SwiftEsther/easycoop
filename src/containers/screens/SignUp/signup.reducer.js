import {SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE, RESET_ERROR_MESSAGE} from './actions/types';

const initialState = {
    firstName: '',
    lastName: '', 
    email: '',
    phoneNumber: '',
    forceNumber: '',
    acceptedTermsAndConditions: false, 
    paypoint: '',
    apNumber: '',
    error: '',
    loading: false
}

export default (state=initialState, actionType) => {
    switch (actionType) {
        case SIGNUP:
            return{
                ...state,
                loading: true
            }    
        case SIGNUP_SUCCESS:
            return{
                ...state,
                user: action.payload,
                loading: false
            }  
        case SIGNUP_FAILURE:
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
