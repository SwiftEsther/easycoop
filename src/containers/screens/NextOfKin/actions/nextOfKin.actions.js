import {
  UPDATE_KIN_INFO,
  UPDATE_KIN_INFO_FAILURE,
  UPDATE_KIN_INFO_SUCCESS,
  GET_KIN_INFO,
  GET_KIN_INFO_FAILURE,
  GET_KIN_INFO_SUCCESS,
  RESET_ERROR_MESSAGE
} from "./types";

export const updateKinInfo = () => {
  return {
    type: UPDATE_KIN_INFO
  };
};
export const updateKinInfoSuccess = payload => {
  return {
    type: UPDATE_KIN_INFO_SUCCESS,
    payload
  };
};

export const updateKinInfoFailure = error => {
  return {
    type: UPDATE_KIN_INFO_FAILURE,
    error
  };
};

export const getKinInfo = () => {
  return {
    type: GET_KIN_INFO
  };
};
export const getKinInfoSuccess = payload => {
  return {
    type: GET_KIN_INFO_SUCCESS,
    payload
  };
};

export const getKinInfoFailure = error => {
  return {
    type: GET_KIN_INFO_FAILURE,
    error
  };
};

export const resetErrorMessage = () => {
  return {
    type: RESET_ERROR_MESSAGE
  };
};
