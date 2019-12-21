import { createAppContainer, createSwitchNavigator, DrawerNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';


import Login from '../screens/Login/index';
import SignUp from '../screens/SignUp/index';
import entryNavigation from '../screens/entryNavigation/index';
import Onboarding from '../screens/Onboarding/index';
import Walkthrough from '../screens/Walkthrough/index';
import ForgotPasswordPage from '../screens/ForgotPassword/index';
import AuthenticationPage from '../screens/Authentication/index';
import ChangePasswordPage from '../screens/Settings/Change_Password/index';
import SupportPage from '../screens/Support/index';
import LoanPage from '../screens/Loan/index';
import Dashboard from '../screens/Dashboard/index';

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
    Onboarding: { screen: Onboarding, navigationOptions: { header: null, tabBarVisible: false } },
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
