import React, { Component } from 'react';
import { View, Image, AsyncStorage, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import style from './style';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../lib/constants/colors';
import * as constants from '../../../../lib/constants';
import '../../../../lib/helpers';
import { showToast } from "../../../components/Toast/actions/toastActions";
import { loginSuccess } from "../Login/actions/login.actions";
import { connect } from "react-redux";

class index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.createNotificationCount();

    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    console.log(this.props.password);
    if (this.props.password) {
      this.props.navigation.navigate("Dashboard");
    } else {
      this.props.navigation.navigate("Onboarding");
    }

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // this.props.navigation.navigate('Auth');
    // this.props.navigation.navigate(userToken && userName ? 'Main' : 'Auth');
    // this.props.navigation.navigate('Auth');
  };

  //Get notifications

  //   createNotificationCount = async () => {
  //     let data = JSON.parse(await AsyncStorage.getItem(constants.NOTIFICATION_COUNT) || '{}');
  //     if(!data.friend)
  //       setGlobalState(constants.NOTIFICATION_COUNT, JSON.stringify({friend: 0, challenge: 0, event: 0, group: 0}));
  //   }

  resetData = () => {
    setGlobalState(constants.USER_DATA, "{}");
  };

  // loadData = async () => {

  //   // let userData = JSON.parse(await AsyncStorage.getItem(constants.USER_DATA) || '{}');
  //   // let status = "";
  //   // let token = "";  if needed

  //   // if(status === "LOGGEDIN") {
  //   //   if(token) {
  //   //     this.props.navigation.navigate('homeNavigation');
  //   //   }
  //   //   else {
  //   //     this.resetData();
  //   //     Toast("Your session has expired. Login again.", "OK");
  //   //     this.props.navigation.navigate('Login');
  //   //   }
  //   // }
  //   // else {
  //   //   this.props.navigation.navigate('loginNavigation');
  //   // }
  //   this.props.navigation.navigate('loginNavigation');
  // };

  render() {
    return (
      <View style={[style.container]}>
        <StatusBar hidden />
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            style={[theme.intro_logo]}
            source={require("../../../../assets/images/splash.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        loginError: state.login.error,
        login: state.login,
        password: state.login.password,
        isLoading: state.login.loading,
        isLoggedIn: state.login.isLoggedIn
    };
};

const mapDispatchToProps = {
    showToast,
    loginSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(index);