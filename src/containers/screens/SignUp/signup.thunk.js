import {Dispatch} from 'react-redux';

import {SignupService} from './signup.sevice';
import Signup from './signup.reducer';
import {
    signup,
    signupFailure,
    signupSuccess,
    resetErrorMessage
} from './actions/signup.actions';
import { signUp } from '../../../lib/api/url';

const signupService = new SignupService();

export const doSignup = (body) => {
    return (dispatch) => {
        dispatch(signup());

        signupService
            .signUp(body)
            .then((response) => {
                dispatch(signupSuccess(response));
            })
            .catch((error) => {
                dispatch(signupFailure(error.error_description || 'Server Error. Please try again'));

                setTimeout(() => {
                    dispatch(resetErrorMessage());
                }, 5000);
            });
    };
};
