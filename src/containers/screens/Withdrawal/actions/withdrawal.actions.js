import {
  WITHDRAWAL_REQUEST,
  WITHDRAWAL_REQUEST_SUCCESS,
  WITHDRAWAL_REQUEST_FAILURE,
  RESET_ERROR_MESSAGE
} from "./types";

export const withdrawalRequest = () => {
  return {
    type: WITHDRAWAL_REQUEST
  };
};
export const withdrawalRequestSuccess = payload => {
         return {
           type: WITHDRAWAL_REQUEST_SUCCESS,
           payload
         };
       };

export const withdrawalRequestFailure = error => {
         return {
           type: WITHDRAWAL_REQUEST_FAILURE,
           error
         };
       };

export const resetErrorMessage = () => {
  return {
    type: RESET_ERROR_MESSAGE
  };
};
