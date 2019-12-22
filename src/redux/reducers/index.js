import { combineReducers } from 'redux';
import authReducer from '../../containers/screens/Login/reducer/authReducer'
// import transferReducer from '../../screens/Wallet/reducer/transferReducer';
// import billsReducer from '../../screens/Bills/reducer/billsReducer';


export default combineReducers({
    authentication: authReducer,
});
