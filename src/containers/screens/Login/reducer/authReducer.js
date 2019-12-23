import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    RESET_AUTH_DATA,
    UPDATE_USER_DATA
} from '../action/types';
const initialState = {
    username: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    email: '',
    gender: '',
    access_token: '',
};

/**
 * authentication reducer
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGOUT:
            let access_token = !!action.removeAccessToken?'':state.access_token;
            return {
                ...state,
                isLoggedIn:false,
                access_token
                // ...initialState,
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoggedIn:true
            }
        case RESET_AUTH_DATA:
            return {
                ...initialState,
            }
        case UPDATE_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
};
