import env from '../../../env.js'


export const credentials = env().credentials;
export const cooperative = env().cooperative;
export const account = env().account;
export const loan = env().loan;
export const api = env().api;

//----AUTH MANAGEMENT URLS---//

export const postLogIn = credentials  + '/credentials/v1/api/login';
export const postSignUp = cooperative + 'cooperative/v1/nonauth/policejoincooperative';
export const resetPassword = credentials + '/credentials/v1/auth/resetpassword';
export const getWithdrawalLoans = account +'/viewwithdrawalhistory'
