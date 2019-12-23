import { combineReducers } from 'redux';
import loginReducer from '../../containers/screens/Login/reducers/login.reducer';

export default combineReducers({
    login: loginReducer,
});
