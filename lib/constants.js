/* Base URL loaded from .env file */
global.BASE_URL = 'http://137.117.211.230:8000';

export const LOGIN = "/credentials/v1/api/login";
export const RESET_PASSWORD = '/credentials/v1/auth/resetpassword';
export const CHANGE_PASSWORD = '/credentials/v1/auth/changepassword';
export const SIGN_UP = 'http://137.117.211.230:8080/cooperative/v1/nonauth/policejoincooperative';

/* Response Messages */
export const BACKEND_ISSUE = "Unable to complete your request at the moment. Try again later.";
export const UNKNOWN_ERROR_MESSAGE = "Unable to complete your request at the moment. Check your internet connection.";
export const FIELD_REQUIRED = "All fields are required to proceed.";
export const FAILED_OTP_REQUEST = "Unable to forward OTP to your phone number. Try resend the OTP.";
export const INVALID_OTP = "Invalid / Expired OTP code. Try again.";
export const MAX_FETCH_LIST = 12;
export const SUCCESS_TRANS_MESSAGE = "Your transaction was successful. Thank you";

/* Variable Constants */
export const ACTIVE_EMAIL = 'ACTIVE_EMAIL';
export const LAST_EMAIL = 'LAST_EMAIL';
export const FIRSTNAME = "";
export const FULLNAME = "FULLNAME";

/* Global Variable */
global._CURRENT_TOKEN = '';
global._FULLNAME = '';
global.tokenRegistered = '';
global.userData = {};