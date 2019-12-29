import {
  CHANGE_BALANCE,
  CHANGE_BALANCE_SUCCESS,
  CHANGE_BALANCE_FAILURE,
  RESET_ERROR_MESSAGE
} from "./actions/types";

const initialState = {
  error: "",
  loading: false,
  changed: false
};

export default (state = initialState, action) => {
  switch (action.type) {
      case CHANGE_BALANCE:
      return {
        ...state,
        loading: true
      };
      case CHANGE_BALANCE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        changed: true
      };
      case CHANGE_BALANCE_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
        changed: false
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
