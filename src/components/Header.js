import React, { Component } from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {scale, scaleHeight} from '../helpers/scale';
import theme from '../../assets/styles/globalStyles';
import { Ionicons, Entypo } from "@expo/vector-icons";
import {
  getMemberNotificationsCount
} from "../lib/api/url";
import { apiRequest } from "../lib/api/api";
import { connect, Dispatch } from "react-redux";

class Header extends Component {
                 constructor(props) {
                   super(props);
                   this.state = {
                     unreadNotificationsLength: 0
                   };
                 }

componentDidMount() {
  this.ongetNotificationsCount()
}

                 ongetNotificationsCount = () => {
                   const { userData } = this.props;
                   this.setState(
                     {
                       spinner: true,
                       modalLoader: true
                     },
                     () => {
                       apiRequest(getMemberNotificationsCount, "get", {
                         params: {
                           memberid: userData.id
                         }
                       })
                         .then(res => {
                           this.setState({
                             spinner: false
                           });
                           if (res) {
                             this.setState({ unreadNotificationsLength: res });
                           } else {
                             this.props.showToast("Error", "error");
                           }
                         })
                         .catch(error => {
                           if (error.response) {
                             this.props.showToast(
                               error.response.data.message,
                               "error"
                             );
                             console.log(error.response);
                           } else {
                             this.props.showToast(error, "error");
                           }
                           this.setState({
                             spinner: false
                           });
                         });
                     }
                   );
                 };

                 render() {
                   console.log(this.props);
                   return (
                     <View
                       style={[
                         styles.container,
                         theme.fill,
                         {
                           position: "absolute",
                           left: 0,
                           right: 0,
                           top: 0,
                           backgroundColor: "#fff",
                           paddingBottom: scaleHeight(20)
                         }
                       ]}
                     >
                       <View style={{ flexDirection: "row" }}>
                         <TouchableOpacity
                           activeOpacity={0.7}
                           style={[theme.flex1]}
                           onPress={() => this.props.navigation.openDrawer()}
                         >
                           {/*<TouchableOpacity  activeOpacity={0.7} style={[theme.flex1]} onPress={this.props.navigation.openDrawer()}>*/}
                           <Entypo
                             name="menu"
                             size={30}
                             style={styles.icons}
                             // color={this.props.activeItemKey === 'Dashboard'?'white':'black'}
                           />
                         </TouchableOpacity>
                         <View style={[styles.separator]}></View>
                         <View>
                           <TouchableOpacity
                             activeOpacity={0.7}
                             onPress={() =>
                               this.props.navigation.navigate("Notifications")
                             }
                           >
                             <Ionicons
                               name="ios-notifications-outline"
                               size={30}
                               style={styles.icons}
                               // color={this.props.activeItemKey === 'Dashboard'?'white':'black'}
                             />
                           </TouchableOpacity>
                           {!!this.state.unreadNotificationsLength > 0 && (
                             <View style={styles.badge}>
                               <Text
                                 style={{
                                   textAlign: "center",
                                   justifyContent: "center",
                                   color: "white",
                                   fontSize: scale(8),
                                   fontFamily: "nunito-bold"
                                 }}
                               >
                                 {this.state.unreadNotificationsLength}
                               </Text>
                             </View>
                           )}
                         </View>
                       </View>

                       <TouchableOpacity
                         activeOpacity={0.7}
                         style={[theme.flex1]}
                         onPress={() =>
                           this.props.navigation.navigate("Dashboard")
                         }
                       >
                         {!this.props.dashboard && (
                           <Entypo
                             name="home"
                             size={20}
                             style={styles.icons}
                             //color={this.props.activeItemKey === 'Dashboard'?'white':'black'}
                           />
                         )}
                         {this.props.dashboard && (
                           <TouchableOpacity
                             activeOpacity={0.7}
                             onPress={() =>
                               this.props.navigation.navigate("Profile")
                             }
                           >
                             <Image
                               source={require("../../assets/images/pexels_photo.png")}
                             />
                           </TouchableOpacity>
                         )}
                       </TouchableOpacity>

                       {/* <Image source={require('../../assets/images/pexels_photo.png')} style={[styles.avatar]}/> */}
                     </View>
                   );
                 }
               }

               const mapStateToProps = (state) => {
    return {
        userData: state.login,
    };
};

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

const styles=StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scale(11),
        paddingTop: scaleHeight(25) 
    },
    avatar: {

    },
    badge: {
        position: 'absolute',
        width: scale(12),
        height: scale(12),
        backgroundColor:'#d80101',
        borderRadius: scale(6),
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white',
        top: scale(-4),
        right: scale(-4),
        zIndex:99999
    },
    separator: {
        borderRightColor: '#bdbdbd',
        borderRightWidth: 1,
        height: scaleHeight(21),
        alignSelf: 'center',
        marginHorizontal: scale(26)
    }
})
