import { combineReducers } from 'redux';
import loginReducer from '../../containers/screens/Login/reducers/login.reducer';
import toastReducer from '../../components/Toast/toastReducer';


export default combineReducers({
    login: loginReducer,
    toast: toastReducer,
});
