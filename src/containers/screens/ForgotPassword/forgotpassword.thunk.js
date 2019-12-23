import {Dispatch} from 'react-redux';

import {RecoverPasswordService} from './forgotpassword.service';
import RecoverPassword from './forgotpassword.reducer';
import {
    recoverPassword,
    recoverPasswordFailure,
    recoverPasswordSuccess,
    resetErrorMessage
} from './actions/forgotpassword.actions';
import { resetPassword } from '../../../lib/api/url';

const recoverPasswordService = new SignupService();

export const doResetPassword = (body) => {
    return (dispatch) => {
        dispatch(RecoverPassword());

        RecoverPasswordService
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
