import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Login from '../screens/Login/index';
import SignUp from '../screens/SignUp/index';
import entryNavigation from '../screens/entryNavigation/index';
import Onboarding from '../screens/Onboarding/index';
import Walkthrough from '../screens/Walkthrough/index';
import ForgotPasswordPage from '../screens/ForgotPassword/index';
import AuthenticationPage from '../screens/Authentication/index';
import ChangePasswordPage from '../screens/Settings/Change_Password/index';
import SupportPage from '../screens/Support/index';

const loginNavigation = createStackNavigator({
    Onboarding: { screen: Onboarding, navigationOptions: { header: null, tabBarVisible: false } },
    Login: { screen: Login, navigationOptions: { header: null, tabBarVisible: false } },
    ForgotPasswordPage: { screen: ForgotPasswordPage, navigationOptions: { header: null, tabBarVisible: false } },
    AuthenticationPage: { screen: AuthenticationPage, navigationOptions: { header: null, tabBarVisible: false } },
    SignUp: { screen: SignUp, navigationOptions: { header: null, tabBarVisible: false } },
    ChangePasswordPage: { screen: ChangePasswordPage, navigationOptions: { header: null, tabBarVisible: false } },
    SupportPage: { screen: SupportPage, navigationOptions: { header: null, tabBarVisible: false } }
  },
  {
    initialRouteName:  'Onboarding',
  }
);

export default createAppContainer(createSwitchNavigator(
    {
      entryNavigation:entryNavigation,
      Walkthrough: Walkthrough,
      loginNavigation: loginNavigation
    },
    {
        initialRouteName: 'entryNavigation'
    }
));
