import { combineReducers } from 'redux';
import loginReducer from '../../containers/screens/Login/reducers/login.reducer';
import toastReducer from '../../components/Toast/toastReducer';
import forgotPasswordReducer from '../../containers/screens/Authentication/forgotpassword.reducer';
import changePasswordReducer from '../../containers/screens/Settings/Change_Password/changePassword.reducer';


export default combineReducers({
    login: loginReducer,
    toast: toastReducer,
    forgotPassword: forgotPasswordReducer,
    changePassword: changePasswordReducer
});
