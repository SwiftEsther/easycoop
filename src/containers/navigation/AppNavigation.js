import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Login from '../screens/Login/index';
import SignUpPage from '../screens/SignUp/index';
import entryNavigation from '../screens/entryNavigation/index';
import Onboarding from '../screens/Onboarding/index';
import Walkthrough from '../screens/Walkthrough/index';
import ForgotPasswordPage from '../screens/ForgotPassword/index';
import AuthenticationPage from '../screens/Authentication/index';

const loginNavigation = createStackNavigator({
    Walkthrough: {screen: Walkthrough, navigationOptions: { header: null, tabBarVisible: false }},
    Onboarding: { screen: Onboarding, navigationOptions: { header: null, tabBarVisible: false } },
    Login: { screen: Login, navigationOptions: { header: null, tabBarVisible: false } },
    ForgotPasswordPage: { screen: ForgotPasswordPage, navigationOptions: { header: null, tabBarVisible: false } },
    AuthenticationPage: { screen: AuthenticationPage, navigationOptions: { header: null, tabBarVisible: false } },
    SignUp: { screen: SignUpPage, navigationOptions: { header: null, tabBarVisible: false } },
  },
  {
    initialRouteName:  'Walkthrough',
  }
);

export default createAppContainer(createSwitchNavigator(
    {
      entryNavigation:entryNavigation,
      loginNavigation: loginNavigation
    },
    {
        initialRouteName: 'entryNavigation'
    }
));
