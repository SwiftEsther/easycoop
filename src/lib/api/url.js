import env from '../../../env.js'


export const credentials = env().credentials;
export const cooperative = env().cooperative;
export const account = env().account;
export const loan = env().loan;
export const api = env().api;

//----AUTH MANAGEMENT URLS---//

export const postLogIn = credentials  + '/credentials/v1/api/login';
export const postSignUp = cooperative + '/cooperative/v1/nonauth/policejoincooperative';
export const forgotPassword = credentials + '/credentials/v1/auth/resetpassword';
export const getWithdrawalHistory = account +'/viewwithdrawalhistory';
export const postChangePassword = credentials + '/credentials/v1/api/changepassword';
export const getloanApplications = loan + '/loan/v1/api/viewallmemberloanapplications';
export const getmemberbalances = account + '/account/v1/api/getmemberbalances';
export const supportMail = api + "/api/radicalmonitor/v1/email/sendgeneralemailfrontend";
export const postProfileInfo = account + '/account/v1/api/savememberpersonalinformation';
export const postKinInfo = credentials + '/credentials/v1/api/saveusernextofkindetailsmultiple';
export const getKinDetails = credentials + "/credentials/v1/api/viewusernextofkindetails";
export const updateContributionAmount = account + '/account/v1/api/updatecontributionamount';
