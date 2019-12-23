import { USER_LOGIN_SUCCESS } from './types';

import { axiosInstance } from '../../../../lib/api/axiosClient';

export const loginUserSuccess = () => {

    return dispatch => {
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
    }
};
