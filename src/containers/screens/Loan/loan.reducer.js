import {
  GET_LOAN_TYPES,
  GET_LOAN_TYPES_SUCCESS,
  GET_LOAN_TYPES_FAILURE,
  RESET_ERROR_MESSAGE,
  GET_GUARANTOR_REQUESTS,
  GET_GUARANTOR_REQUESTS_SUCCESS,
  GET_GUARANTOR_REQUESTS_FAILURE
} from "./actions/types";

const initialState = {
  loading: false,
  loanTypesLoaded: false,
  loadingRequests: false,
  requestsLoaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOAN_TYPES:
      return {
        ...state,
        loading: true
      };
    case GET_LOAN_TYPES_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loanTypesLoaded: true,
        loading: false
      };
    case GET_LOAN_TYPES_FAILURE:
      return {
        ...state,
        error: action.error,
        loanTypesLoaded: false,
        loading: false
      };
    case GET_GUARANTOR_REQUESTS:
      return {
        ...state,
        loadingRequests: true
      };
    case GET_GUARANTOR_REQUESTS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        requestsLoaded: true,
        loadingRequests: false
      };
    case GET_GUARANTOR_REQUESTS_FAILURE:
      return {
        ...state,
        error: action.error,
        requestsLoaded: false,
        loadingRequests: false
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
