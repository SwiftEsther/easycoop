import env from '../../../env.js'


export const baseURL = env().baseUrl;
export const utilityBaseUrl = env().utilityBaseUrl;
export const frontendUrl = env().frontendUrl;

//----AUTH MANAGEMENT URLS---//



export const postAuthInit = baseURL  + '/auth/onboard/init';
export const postConfirmOtp = baseURL  + '/auth/onboard/otp';
export const postAddPin = baseURL  + '/auth/onboard/pin';
export const postCreatePassword = baseURL  + '/auth/onboard/password';
export const postVerifyBVN = utilityBaseUrl + '/util/verify/bvn';
export const postUploadFile = utilityBaseUrl  + '/util/upload/photo';
export const confirmBVN = baseURL  + '/auth/onboard/bvn';
export const postBankDetails = baseURL  + '/auth/onboard/bank';
export const postVerifyBankAccount = utilityBaseUrl  + '/util/verify/bank';
export const postAddEmail = baseURL  + '/auth/onboard/email';
export const postAddPhoto = baseURL  + '/auth/onboard/photo';
export const getUserProfile = baseURL  + '/api/v3/user/details';
export const getAllBanks = utilityBaseUrl  + '/util/codes/fetch/bank';
export const getAllLoanPurposes = utilityBaseUrl  + '/util/codes/fetch/purpose-of-loan';
export const getMarketData = baseURL  + '/api/v3/market/loans';
export const postLogin = baseURL  + '/auth/login';
export const postRegister = baseURL  + '/api/v3/register'; //test@tobe.com


//-forgot password
export const postResetPasswordOtp = baseURL  + '/auth/reset/password/send-reset-otp';
export const postResetPassword= baseURL  + '/auth/reset/password';



//--SETTINGS URLS
export const postChangePassword = baseURL  + '/settings/password';
export const postPinResetOtp = baseURL  + '/settings/reset/pin/otp';
export const postPinReset = baseURL  + '/settings/reset/pin';
export const postPinChange = baseURL  + '/settings/pin';
export const putUpdateProfile = baseURL  + '/settings/profile';


//--BANKS / CARDS
export const getAllUserBanks = baseURL  + '/settings/banks';
export const deleteBank = (id) => baseURL  + `/settings/banks/${id}`;
export const deleteCard = (id) => baseURL  + `/settings/card/${id}`;
export const getAllUserCards = baseURL  + '/settings/cards';
export const postAddBank = baseURL  + '/settings/banks';
export const postInitCard = baseURL  + '/settings/card/init';
export const postVerifyCard = baseURL  + '/settings/card';





//-LOANS......

export const getLoans = baseURL  + '/loan';
export const getRunningLoan = baseURL  + '/loan/running';
export const getUserLoanDetails = (id) => baseURL  + `/loan/${id}`;
export const getLoanOptions = baseURL  + '/loan/score/options';
export const postLoanEligibility = baseURL  + '/loan/score';
export const postCreateLoan = baseURL  + '/loan';
export const postRepayLoan = baseURL  + '/loan/repay';




// --transactions ----

export const getTransactions = baseURL  + '/transaction';
export const getTheTransactionDetails = (id) => baseURL  + `/transaction/${id}`;


































export const checkUsernames = (username) => baseURL  + '/user/check_username/' + username;
export const postForgotPassword = baseURL  + `/api/v3/forgot`;
export const postChangePin = baseURL  + `/password/reset`;



//--HOME ENDPOINTS --//
export const getLoanHistory = (username) => baseURL +  '/me/loans/' + username;
export const getTransactHistory = (username) => baseURL +  '/me/transactionhistory/paginated/' + username;
export const getActiveCurrentLoan = (username) =>  baseURL +  '/me/loan/current/' + username;
export const getTheAgentDashboard = (agent_code) =>  baseURL +  '/agent/analytics/' + agent_code;
export const getAgentClientLoans = (agent_code) =>  baseURL +  '/agent/client/active/loans/' + agent_code;
export const getAllRefereesData= (agent_code) =>  baseURL +  '/agent/clients/' + agent_code;
export const getWallet = (username) =>  baseURL +  `/me/wallet/balance/${username}/W001`;
export const getSavingsWallet = (username) =>  baseURL +  `/me/wallet/balance/${username}/W002`;
export const getAgentsWallet = (username) =>  baseURL +  `/me/wallet/balance/${username}/W0A1`;
export const postPayFull = (loanCode,username) =>  baseURL +  `/payments/clientpay/${loanCode}/${username}`;
export const postPayPartial = (loanCode,username, amount) =>  baseURL +  `/payments/clientpay/partial/${loanCode}/${username}/${amount}`;
export const getAcceptRejectLoan = (decision,id) =>  baseURL +  `/register/offerdecision/${decision}/${id}`;
export const getBankList = baseURL +  `/banklist`;
export const postContacts = baseURL +  `/mobilecontact`;
export const postAllSMS = baseURL +  `/mobilesms`;

//LOAN
// export const postCreateLoan =  baseURL +  '/loans/createloanrecord';
export const verifyBvn =  (bvn) => baseURL +  '/me/verifybvn/' + bvn;






//TRANSFER
export const getAllBeneficiariesAccounts = (username) =>  baseURL +  `/me/beneficiaries/${username}`;
export const getTheAccountName =  baseURL +  `/bank/verifyaccount`;
export const postTransferFunds =  baseURL +  `/me/wallet/transferfunds`;
export const postAddBeneficiary =  baseURL +  `/add/beneficiary`;


//BILLS
export const postBuyAirtime=  baseURL +  `/topup/airtime`;
export const postBuyDataPlan=  baseURL +  `/topup/data`;
export const postBuyMultichoice=  baseURL +  `/topup/multichoice`;
export const getDataPlansByAirtime =  (provider) => baseURL +  `/topup/dataplans/${provider}`;
export const getValidateMultichoiceAccount=  (account,service) => baseURL +  `/topup/multichoice/${account}/${service}`;



