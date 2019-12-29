import { UPDATE_PROFILE_INFO, UPDATE_PROFILE_INFO_FAILURE, UPDATE_PROFILE_INFO_SUCCESS, RESET_ERROR_MESSAGE } from './types';

export const updateProfileInfo = () => {
    return {
        type: UPDATE_PROFILE_INFO
    };
};
export const updateProfileInfoSuccess = (payload) => {
    return {
        type: UPDATE_PROFILE_INFO_SUCCESS,
        payload
    };
};

export const updateProfileInfoFailure = (error) => {
    return {
        type: UPDATE_PROFILE_INFO_FAILURE,
        error
    };
};

export const resetErrorMessage = () => {
    return {
        type: RESET_ERROR_MESSAGE
    };
};
