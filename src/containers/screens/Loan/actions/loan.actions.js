import {
  GET_LOAN_TYPES,
  GET_LOAN_TYPES_FAILURE,
  GET_LOAN_TYPES_SUCCESS,
  GET_GUARANTOR_REQUESTS,
  GET_GUARANTOR_REQUESTS_SUCCESS,
  GET_GUARANTOR_REQUESTS_FAILURE,
  RESET_ERROR_MESSAGE
} from "./types";

export const getLoanTypes = () => {
  return {
    type: GET_LOAN_TYPES
  };
};
export const getLoanTypesSuccess = payload => {
         return {
           type: GET_LOAN_TYPES_SUCCESS,
           payload
         };
       };

export const getLoanTypesFailure = error => {
         return {
           type: GET_LOAN_TYPES_FAILURE,
           error
         };
       };
export const getGuarantorRequests = () => {
  return {
    type: GET_GUARANTOR_REQUESTS
  };
};
export const getGuarantorRequestsSuccess = payload => {
         return {
           type: GET_GUARANTOR_REQUESTS_SUCCESS,
           payload
         };
       };

export const getGuarantorRequestsFailure = error => {
         return {
           type: GET_GUARANTOR_REQUESTS_FAILURE,
           error
         };
       };

export const resetErrorMessage = () => {
  return {
    type: RESET_ERROR_MESSAGE
  };
};
