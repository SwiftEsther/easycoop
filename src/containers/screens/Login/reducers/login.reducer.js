import { USER_LOGIN_SUCCESS } from '../actions/types';

const initialState = {
    username: '',
    password: '',
    id: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoggedIn:true
            }
        default:
            return state
    }
};
