import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  RESET_ERROR_MESSAGE
} from "./actions/types";

const initialState = {
  loading: false,
  passwordChanged: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return {
        ...state,
        loading: true
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        ...action.payload,
        mpasswordChanged: true,
        loading: false
      };
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        error: action.error,
        passwordChanged: false,
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
