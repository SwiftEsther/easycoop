import {Dispatch} from 'react-redux';

import {RecoverPasswordService} from './forgotpassword.service';
import {
    recoverPassword,
    recoverPasswordFailure,
    recoverPasswordSuccess,
    resetErrorMessage
} from './actions/forgotpassword.actions';

const recoverPasswordService = new RecoverPasswordService();

export const doResetPassword = (body) => {
    return (dispatch) => {
        dispatch(RecoverPassword());

        recoverPasswordService
            .recoverPassword(body)
            .then((response) => {
                dispatch(recoverPasswordSuccess(response));
            })
            .catch((error) => {
                dispatch(recoverPasswordFailure(error.error_description || 'Server Error. Please try again'));

                setTimeout(() => {
                    dispatch(resetErrorMessage());
                }, 5000);
            });
    };
};
