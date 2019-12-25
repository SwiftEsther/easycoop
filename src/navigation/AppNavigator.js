import { createAppContainer, createSwitchNavigator, DrawerNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import React from 'react';
import { NetInfo, SafeAreaView, View, PanResponder } from 'react-native'
import { scale, scaleHeight } from '../helpers/scale';





import Login from '../containers/screens/Login/index';
import SignUp from '../containers/screens/SignUp/index';
import entryNavigation from '../containers/screens/entryNavigation/index';
import Onboarding from '../containers/screens/Onboarding/index';
import Walkthrough from '../containers/screens/Walkthrough/index';
import ForgotPasswordPage from '../containers/screens/ForgotPassword/index';
import AuthenticationPage from '../containers/screens/Authentication/index';
import ChangePasswordPage from '../containers/screens/Settings/Change_Password/index';
import SupportPage from '../containers/screens/Support/index';
import Notifications from '../containers/screens/Notifications/index';
import LoanPage from '../containers/screens/Loan/index';
import RequestHistory from '../containers/screens/RequestHistory/index';
import Dashboard from '../containers/screens/Dashboard/index';
import NavigationService from "../../NavigationService";
import Toast from '../components/Toast/Toast'
import { hideToast, showToast, showPersistentToast } from "../components/Toast/actions/toastActions";
import { connect } from 'react-redux'
import SideMenu from "../containers/screens/SideMenu";



import TransactionPage from '../containers/screens/transactionHistory/index';
import Notifications from "../containers/screens/Notification/Notifications";

const authNavigation = createStackNavigator({
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
  Home: { screen: Dashboard, navigationOptions: { header: null, tabBarVisible: false } },
  ResetPassword: { screen: ChangePasswordPage, navigationOptions: { header: null, tabBarVisible: false } },
})

const homeNavigation = createDrawerNavigator({
    Dashboard: { screen: Dashboard, navigationOptions: { header: null, tabBarVisible: false } },
    LoanPage: { screen: LoanPage, navigationOptions: { header: null, tabBarVisible: false } },
    RequestHistory: {screen: RequestHistory, navigationOptions: { header: null, tabBarVisible: false }},
    TransactionPage: {screen: TransactionPage, navigationOptions: { header: null, tabBarVisible: false }},
        Notifications: {screen: Notifications, navigationOptions: { header: null, tabBarVisible: false }}
    },
  {
    initialRouteName:  'Dashboard',
      drawerWidth:scale(280),
      contentComponent: props => <SideMenu {...props}/>,
  }
);

    // ChangePasswordPage: { screen: ChangePasswordPage, navigationOptions: { header: null, tabBarVisible: false } },
    // SupportPage: { screen: SupportPage, navigationOptions: { header: null, tabBarVisible: false } },
    // LoanPage: { screen: LoanPage, navigationOptions: { header: null, tabBarVisible: false } },
const AppContainer =  createAppContainer(createSwitchNavigator(
    {
      entryNavigation:entryNavigation,
      authNavigation: authNavigation,
      homeNavigation: homeNavigation,
      Walkthrough: Walkthrough,
      drawernav: drawernav
    },
    {
        initialRouteName: 'entryNavigation'
    }
));

class App extends React.Component {
    state = {
        inactive: false
    }



    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                {/*<StatusBar/>*/}
                <SafeAreaView style={{flex: 1}}>
                    {this.props.toastShow && <Toast
                        show={this.props.toastShow}
                        type={this.props.toastType}
                        message={this.props.toastMessage ? this.props.toastMessage.toString() : ''}
                        onClickHandler={this.props.hideToast}
                    />}
                    <AppContainer ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}/>
                </SafeAreaView>
            </View>)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        toastType: state.toast.boxType,
        toastShow: state.toast.show,
        toastMessage: state.toast.message,
    };
};

const mapDispatchToProps = {
    hideToast,
    showToast,
    showPersistentToast
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

