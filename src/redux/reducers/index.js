import { combineReducers } from "redux";
import loginReducer from "../../containers/screens/Login/reducers/login.reducer";
import toastReducer from "../../components/Toast/toastReducer";
import forgotPasswordReducer from "../../containers/screens/Authentication/forgotpassword.reducer";
import changePasswordReducer from "../../containers/screens/Settings/Change_Password/changePassword.reducer";
import dashboardReducer from "../../containers/screens/Dashboard/dashboard.reducer";
import supportReducer from "../../containers/screens/Support/support.reducer";
import profileInfoReducer from "../../containers/screens/ProfileInfo/profileInfo.reducer";
import nextOfKinReducer from "../../containers/screens/NextOfKin/nextOfKin.reducer";

export default combineReducers({
  login: loginReducer,
  toast: toastReducer,
  forgotPassword: forgotPasswordReducer,
  changePassword: changePasswordReducer,
  dashboard: dashboardReducer,
  support: supportReducer,
  profile: profileInfoReducer,
  kin: nextOfKinReducer
});
