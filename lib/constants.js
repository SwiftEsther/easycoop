/* Base URL loaded from .env file */
global.BASE_URL = '';

export const LOGIN = "/credentials/v1/api/login";

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
export const FIRSTNAME = "FIRSTNAME";
export const FULLNAME = "FULLNAME";

/* Global Variable */
global._CURRENT_TOKEN = '';
global._FULLNAME = '';
global.tokenRegistered = '';
global.userData = {};