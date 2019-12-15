import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Login from '../screens/Login/index';
import entryNavigation from '../screens/entryNavigation/index';

const loginNavigation = createStackNavigator({
    // Intro: { screen: Intro, navigationOptions: { header: null, tabBarVisible: false } },
    Login: { screen: Login, navigationOptions: { header: null, tabBarVisible: false } }
}, 
  {
    initialRouteName:  'Login',
  }
);

export default createAppContainer(createSwitchNavigator(
    {
      entryNavigation:entryNavigation,
      Login: loginNavigation
    },
    {
        initialRouteName: 'entryNavigation'
    }
));