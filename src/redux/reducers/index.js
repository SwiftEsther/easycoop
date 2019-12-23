import { combineReducers } from 'redux';
import loginReducer from '../../containers/screens/Login/reducers/login.reducer';
import toastReducer from '../../components/Toast/toastReducer';
import resetPasswordReducer from '../../containers/screens/ForgotPassword/forgotpassword.reducer';


export default combineReducers({
    login: loginReducer,
    toast: toastReducer,
    resetPassword: resetPasswordReducer
});
