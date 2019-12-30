import {
  WITHDRAWAL_REQUEST,
  WITHDRAWAL_REQUEST_SUCCESS,
  WITHDRAWAL_REQUEST_FAILURE,
  RESET_ERROR_MESSAGE
} from "./actions/types";

const initialState = {
  error: "",
  loading: false,
  requestSent: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WITHDRAWAL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case WITHDRAWAL_REQUEST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        requestSent: true
      };
    case WITHDRAWAL_REQUEST_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
        requestSent: false
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
