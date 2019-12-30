import {
  GET_LOAN_TYPES,
  GET_LOAN_TYPES_FAILURE,
  GET_LOAN_TYPES_SUCCESS,
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

export const resetErrorMessage = () => {
  return {
    type: RESET_ERROR_MESSAGE
  };
};
