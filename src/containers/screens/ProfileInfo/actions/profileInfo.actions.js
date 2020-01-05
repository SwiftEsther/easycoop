import {
  UPDATE_PERSONAL_INFO,
  UPDATE_PERSONAL_INFO_FAILURE,
  UPDATE_PERSONAL_INFO_SUCCESS,
  UPDATE_BANK_DETAILS,
  UPDATE_BANK_DETAILS_FAILURE,
  UPDATE_BANK_DETAILS_SUCCESS,
  UPDATE_CONTACT_INFO,
  UPDATE_CONTACT_INFO_FAILURE,
  UPDATE_CONTACT_INFO_SUCCESS,
  RESET_ERROR_MESSAGE
} from "./types";

export const updatePersonalInfo = () => {
    return {
      type: UPDATE_PERSONAL_INFO
    };
};
export const updatePersonalInfoSuccess = (payload) => {
    return {
      type: UPDATE_PERSONAL_INFO_SUCCESS,
      payload
    };
};

export const updatePersonalInfoFailure = (error) => {
    return {
      type: UPDATE_PERSONAL_INFO_FAILURE,
      error
    };
};

export const updateContactInfo = () => {
    return {
        type: UPDATE_CONTACT_INFO
    };
};
export const updateContactInfoSuccess = (payload) => {
    return {
        type: UPDATE_CONTACT_INFO_SUCCESS,
        payload
    };
};

export const updateContactInfoFailure = error => {
         return {
           type: UPDATE_CONTACT_INFO_FAILURE,
           error
         };
       };

export const updateBankDetails = () => {
    return {
        type: UPDATE_BANK_DETAILS
    };
};
export const updateBankDetailsSuccess = (payload) => {
    return {
        type: UPDATE_BANK_DETAILS_SUCCESS,
        payload
    };
};

export const updateBankDetailsFailure = error => {
         return {
           type: UPDATE_BANK_DETAILS_FAILURE,
           error
         };
       };

export const resetErrorMessage = () => {
    return {
        type: RESET_ERROR_MESSAGE
    };
};
