import env from '../../../env.js'


export const baseURL = env().baseUrl;

//----AUTH MANAGEMENT URLS---//



export const postAuthInit = baseURL  + '/credentials/v1/api/login';
