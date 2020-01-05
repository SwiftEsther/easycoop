import {
  UPDATE_PERSONAL_INFO,
  UPDATE_PERSONAL_INFO_SUCCESS,
  UPDATE_PERSONAL_INFO_FAILURE,
  UPDATE_BANK_DETAILS,
  UPDATE_BANK_DETAILS_FAILURE,
  UPDATE_BANK_DETAILS_SUCCESS,
  UPDATE_CONTACT_INFO,
  UPDATE_CONTACT_INFO_FAILURE,
  UPDATE_CONTACT_INFO_SUCCESS,
  RESET_ERROR_MESSAGE
} from "./actions/types";

const initialState = {
    loading: false,
    personalInfoUpdated: false,
    contactInfoUpdated: false,
    bankDetailsUpdated: false
};

export default (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_PERSONAL_INFO:
        return {
          ...state,
          loading: true
        };
      case UPDATE_PERSONAL_INFO_SUCCESS:
        return {
          ...state,
          ...action.payload,
          personalInfoUpdated: true,
          loading: false
        };
      case UPDATE_PERSONAL_INFO_FAILURE:
        return {
          ...state,
          error: action.error,
          personalInfoUpdated: false,
          loading: false
        };
      case UPDATE_CONTACT_INFO:
        return {
          ...state,
          loading: true
        };
      case UPDATE_CONTACT_INFO_SUCCESS:
        return {
          ...state,
          ...action.payload,
          contactInfoUpdated: true,
          loading: false
        };
      case UPDATE_CONTACT_INFO_FAILURE:
        return {
          ...state,
          error: action.error,
          contactInfoUpdated: false,
          loading: false
        };
      case UPDATE_BANK_DETAILS:
        return {
          ...state,
          loading: true
        };
      case UPDATE_BANK_DETAILS_SUCCESS:
        return {
          ...state,
          ...action.payload,
          bankDetailsUpdated: true,
          loading: false
        };
      case UPDATE_BANK_DETAILS_FAILURE:
        return {
          ...state,
          error: action.error,
          bankDetailsUpdated: false,
          loading: false
        };
      case RESET_ERROR_MESSAGE:
        return {
          ...state,
          error: ""
        };
      default:
        return state;
    }
};
