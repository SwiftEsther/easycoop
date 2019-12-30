import { combineReducers } from "redux";
import loginReducer from "../../containers/screens/Login/reducers/login.reducer";
import toastReducer from "../../components/Toast/toastReducer";
import forgotPasswordReducer from "../../containers/screens/Authentication/forgotpassword.reducer";
import changePasswordReducer from "../../containers/screens/Settings/Change_Password/changePassword.reducer";
import dashboardReducer from "../../containers/screens/Dashboard/dashboard.reducer";
import supportReducer from "../../containers/screens/Support/support.reducer";
import profileInfoReducer from "../../containers/screens/ProfileInfo/profileInfo.reducer";
import nextOfKinReducer from "../../containers/screens/NextOfKin/nextOfKin.reducer";
import RequestHistoryReducer from "../../containers/screens/RequestHistory/RequestHistory.reducer";
import loanTypesReducer from '../../containers/screens/Loan/loan.reducer';

export default combineReducers({
  login: loginReducer,
  toast: toastReducer,
  forgotPassword: forgotPasswordReducer,
  changePassword: changePasswordReducer,
  dashboard: dashboardReducer,
  support: supportReducer,
  profile: profileInfoReducer,
  kin: nextOfKinReducer,
  histories: RequestHistoryReducer,
  loan: loanTypesReducer
});
