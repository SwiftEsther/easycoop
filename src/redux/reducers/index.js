import { combineReducers } from 'redux';
import authReducer from '../../containers/screens/Login/reducer/authReducer';

export default combineReducers({
    authentication: authReducer,
});
