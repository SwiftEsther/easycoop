import {
  GET_LOAN_TYPES_INFO,
  GET_LOAN_TYPES_INFO_SUCCESS,
  GET_LOAN_TYPES_INFO_FAILURE,
  RESET_ERROR_MESSAGE
} from "./actions/types";

const initialState = {
  loading: false,
  loanTypesLoaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_INFO:
      return {
        ...state,
        loading: true
      };
    case UPDATE_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loanTypesLoaded: true,
        loading: false
      };
    case UPDATE_PROFILE_INFO_FAILURE:
      return {
        ...state,
        error: action.error,
        loanTypesLoaded: false,
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
