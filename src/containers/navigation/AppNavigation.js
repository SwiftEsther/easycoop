import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Login from '../screens/Login/index';
import SignUpPage from '../screens/SignUp/index';
import entryNavigation from '../screens/entryNavigation/index';

const AppNavigation = createStackNavigator({
    entryNavigation:entryNavigation,
    Login: { screen: Login, navigationOptions: { header: null, tabBarVisible: false } },
    SignUp: SignUpPage
  },
  {
    initialRouteName:  'entryNavigation',
  }
);

export default createAppContainer(AppNavigation);