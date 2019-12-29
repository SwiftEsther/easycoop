import {
  UPDATE_KIN_INFO,
  UPDATE_KIN_INFO_SUCCESS,
  UPDATE_KIN_INFO_FAILURE,
  GET_KIN_INFO,
  GET_KIN_INFO_SUCCESS,
  GET_KIN_INFO_FAILURE,
  RESET_ERROR_MESSAGE
} from "./actions/types";

const initialState = {
  kinloading: false,
  kinUpdating: false,
  kinloaded: false,
  kinInfoUpdated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_KIN_INFO:
      return {
        ...state,
        kinUpdating: true
      };
    case UPDATE_KIN_INFO_SUCCESS:
      return {
        ...state,
        ...action.payload,
        kinInfoUpdated: true,
        kinUpdating: false
      };
    case UPDATE_KIN_INFO_FAILURE:
      return {
        ...state,
        error: action.error,
        kinInfoUpdated: false,
        kinUpdating: false
      };
    case GET_KIN_INFO:
      return {
        ...state,
        kinloading: true
      };
    case GET_KIN_INFO_SUCCESS:
      return {
        ...state,
        ...action.payload,
        kinloaded: true,
        kinloading: false
      };
    case GET_KIN_INFO_FAILURE:
      return {
        ...state,
        error: action.error,
        kinloaded: false,
        kinloading: false
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
