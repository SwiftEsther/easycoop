import { createAppContainer, createSwitchNavigator, DrawerNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';


import Login from '../containers/screens/Login/index';
import SignUp from '../containers/screens/SignUp/index';
import entryNavigation from '../containers/screens/entryNavigation/index';
import Onboarding from '../containers/screens/Onboarding/index';
import Walkthrough from '../containers/screens/Walkthrough/index';
import ForgotPasswordPage from '../containers/screens/ForgotPassword/index';
import AuthenticationPage from '../containers/screens/Authentication/index';
import ChangePasswordPage from '../containers/screens/Settings/Change_Password/index';
import SupportPage from '../containers/screens/Support/index';
import LoanPage from '../containers/screens/Loan/index';
import Withdrawal from '../containers/screens/Withdrawal/index';
import Dashboard from '../containers/screens/Dashboard/index';
import TransactionPage from '../containers/screens/transactionHistory/index';

const loginNavigation = createStackNavigator({
    Onboarding: { screen: Onboarding, navigationOptions: { header: null, tabBarVisible: false } },
    Login: { screen: Login, navigationOptions: { header: null, tabBarVisible: false } },
    ForgotPasswordPage: { screen: ForgotPasswordPage, navigationOptions: { header: null, tabBarVisible: false } },
    AuthenticationPage: { screen: AuthenticationPage, navigationOptions: { header: null, tabBarVisible: false } },
    SignUp: { screen: SignUp, navigationOptions: { header: null, tabBarVisible: false } },
  },
  {
    initialRouteName:  'Onboarding',
  }
);

const drawernav = createDrawerNavigator({
  Home: { screen: Dashboard, navigationOptions: { header: null, tabBarVisible: false } } 
})

const homeNavigation = createStackNavigator({
    Dashboard: { screen: Dashboard, navigationOptions: { header: null, tabBarVisible: false } },
    LoanPage: { screen: LoanPage, navigationOptions: { header: null, tabBarVisible: false } },
    Withdrawal: {screen: Withdrawal, navigationOptions: { header: null, tabBarVisible: false }},
    TransactionPage: {screen: TransactionPage, navigationOptions: { header: null, tabBarVisible: false }}
  },
  {
    initialRouteName:  'Dashboard',
  }
);

    // ChangePasswordPage: { screen: ChangePasswordPage, navigationOptions: { header: null, tabBarVisible: false } },
    // SupportPage: { screen: SupportPage, navigationOptions: { header: null, tabBarVisible: false } },
    // LoanPage: { screen: LoanPage, navigationOptions: { header: null, tabBarVisible: false } },
export default createAppContainer(createSwitchNavigator(
    {
      entryNavigation:entryNavigation,
      loginNavigation: loginNavigation,
      homeNavigation: homeNavigation,
      Walkthrough: Walkthrough,
      drawernav: drawernav
    },
    {
        initialRouteName: 'entryNavigation'
    }
));
