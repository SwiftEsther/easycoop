import React, {Component} from 'react';
import { View, Image, AsyncStorage, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import style from './style';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../lib/constants/Colors';
import * as constants from '../../../../lib/constants';
import '../../../../lib/helpers';

export default class index extends Component {

  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    // this.createNotificationCount();
    setTimeout(() => {
      this.props.navigation.navigate('Walkthrough');
    }, 3000);
  }

  //Get notifications

//   createNotificationCount = async () => {
//     let data = JSON.parse(await AsyncStorage.getItem(constants.NOTIFICATION_COUNT) || '{}');
//     if(!data.friend)
//       setGlobalState(constants.NOTIFICATION_COUNT, JSON.stringify({friend: 0, challenge: 0, event: 0, group: 0}));
//   }
  
  resetData = () => {
    setGlobalState(constants.USER_DATA, "{}");
  }

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
        <View style={[style.container]} >
            <StatusBar hidden />
            <TouchableOpacity activeOpacity={0.7}>       
                <Image style={[theme.intro_logo]} source={require('../../../../assets/images/splash.png')} />
            </TouchableOpacity>
        </View>
    ); 
  }
} 