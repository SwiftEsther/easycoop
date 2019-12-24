import {SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE, RESET_ERROR_MESSAGE} from './actions/types';

const initialState = {
    // acceptedTermsAndConditions: false,
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    payPoint: "",
    rank: "",
    forceNumber: "",
    addressLine1: "my address",
    addressLine2: "my address 2",
    addressLine3: "my adress 3",
    cooperative: "my coperateive",
    cooperativeId: 2,
    cooperativeName: "my cop name",
    country: "Nigeria",
    forwardedToCooperative: true,
    gender: "male",
    genderId: 0,
    id: 0,
    joinCooperative: true,
    makeClaim: true,
    middleName: "MymiddleName",
    registerCooperative: true,
    rejectionReason: "non",
    state: "borno",
    stateId: 8,
    totalRecords: 0,
    treated: true
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
