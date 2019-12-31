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
export const getWithdrawalHistory = account + "account/v1/api/getnotificationssentfrommember_withdrawal";
export const postChangePassword = credentials + '/credentials/v1/api/changepassword';
// export const getloanApplications = loan + '/loan/v1/api/viewallmemberloanapplications';
export const getmemberbalances = account + '/account/v1/api/getmemberbalances';
export const supportMail = api + "/api/radicalmonitor/v1/email/sendgeneralemailfrontend";
// export const postProfileInfo = account + '/account/v1/api/savememberpersonalinformation';
export const postProfileInfo = credentials + '/credentials/v1/api/saveuserpersonalinformation';
export const postKinInfo = credentials + '/credentials/v1/api/saveusernextofkindetailsmultiple';
export const getKinDetails = credentials + "/credentials/v1/api/viewusernextofkindetailsmultiple";
export const updateContributionAmount = account + '/account/v1/api/updatecontributionamount';
export const withdrawVoluntaryContributions = account + "/account/v1/api/withdrawvoluntarycontributions";
export const getSavingsHistory = account + "/account/v1/api/viewcontributionhistory";
export const getLoanHistory = account + "/account/v1/api/getnotificationssentfrommember_loan";
export const getLoanTypes = loan + "/loantype/v1/api/getcooperativeloantypes";
export const getAllGuarantorRequests = loan + "/loan/v1/api/viewallguarantorrequests";
export const getMemberNotifications = account + "/account/v1/api/getnotificationssenttomember";
export const calculateLoan = loan + "/loan/v1/api/calculateloan";
//--PROFILE URLS
export const postNextOfKin = credentials + "/credentials/v1/api/saveusernextofkindetailsmultiple";
export const getAllGuarantors = loan + "/loan/v1/api/viewallguarantors";
export const getMemberNotificationsCount = account + "/account/v1/api/getcountcfnotificationssenttomember";
export const postLoanAppliaction = loan + "/loan/v1/api/submitloanapplication";
