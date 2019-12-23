import env from '../../../env.js'


export const baseURL = env().baseUrl;
export const otherURL = env().otherURL;

//----AUTH MANAGEMENT URLS---//

export const postLogIn = baseURL  + '/credentials/v1/api/login';
export const signUp = baseURL + 'cooperative/v1/nonauth/policejoincooperative';
export const resetPassword = baseURL + '/credentials/v1/auth/resetpassword';
