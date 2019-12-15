import React, {Component} from 'react';
import { View, Image, AsyncStorage, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import style from './style';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../../assets/styles/colors';
// import * as constants from '../../../lib/constants';
// import '../../../lib/helpers';

export default class index extends Component {

  constructor(props) {
    super(props);
  }
  
//   componentDidMount() {

//     this.createNotificationCount();
//     setTimeout(() => {
//       this.loadData();
//     }, 3000);
//   }

//   createNotificationCount = async () => {
//     let data = JSON.parse(await AsyncStorage.getItem(constants.NOTIFICATION_COUNT) || '{}');
//     if(!data.friend)
//       setGlobalState(constants.NOTIFICATION_COUNT, JSON.stringify({friend: 0, challenge: 0, event: 0, group: 0}));
//   }

//   tokenNotExpired = (token) => {  
//     let not_expired = true;
//     if(token !== "") {
//       let jwtDecode = require('jwt-decode');
//       let decoded = jwtDecode(token, { body: true });
//       if(new Date(decoded.exp * 1000).getTime() < new Date().getTime()) {
//         not_expired = false;
//       }
//     }
//     return not_expired;
//   }
  
//   resetData = () => {
//     setGlobalState(constants.ECASH_BALANCE, "0.0");
//     setGlobalState(constants.ECASH_CARD, "");
//     setGlobalState(constants.LAST_FETCHED_POSTS, "[]");
//     setGlobalState(constants.LAST_FETCHED_CHALLENGE, "[]");
//     setGlobalState(constants.LAST_FETCHED_GROUP, "[]");
//     setGlobalState(constants.USER_DATA, "{}");
//     setGlobalState(constants.FITNESS_DATA, "{}");
//   }

//   loadData = async () => {

//     let userData = JSON.parse(await AsyncStorage.getItem(constants.USER_DATA) || '{}');
//     let status = "";
//     let token = "";  
 
//     if(userData.status)
//       status = userData.status;
    
//     if(userData.access_token)
//       token = userData.access_token;

//     if(status === "LOGGEDIN") {
//       if(this.tokenNotExpired(token)) {
//         this.props.navigation.navigate('homeNavigation');
//       }
//       else {
//         this.resetData();
//         Toast("Your session has expired. Login again.", "OK");
//         this.props.navigation.navigate('Login');
//       }
//     }  
//     else {
//       this.props.navigation.navigate('loginNavigation');
//     }
//   };

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