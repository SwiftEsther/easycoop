import React, { Component } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  SafeAreaView,
  Text,
  View,
  ToastAndroid,
  Alert,
  AsyncStorage,
  ScrollView
} from "react-native";
import { systemWeights } from "react-native-typography";
import theme from "../../../../assets/styles/globalStyles";
import * as colors from "../../../lib/constants/colors";
import * as constants from "../../../../lib/constants";
import Spinner from "react-native-loading-spinner-overlay";
import API from "../../../../lib/api";
import { RESET_PASSWORD } from "../../../../lib/constants";
import AuthenticationHeader from "../../../components/AuthenticationHeader";
import "../../../../lib/helpers";
import Header from "../../../components/Header";
import GeneralNotification from "../../../components/GeneralNotification";
import GuarantorRequest from "../../../components/GuarantorRequest";
import Savings from "../../../components/Savings";
import WithdrawTile from "../../../components/WithdrawTile";
import LoanTile from "../../../components/LoanTile";
import { showToast } from "../../../components/Toast/actions/toastActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomInput from "../../../components/CustomTextInput/CustomInput";
import Space from "../../../components/Space";
import GreenButton from "../../../components/GreenButton";
import ApplicationStatus from "../../../components/ApplicationStatus";
import { scale, scaleHeight } from "../../../helpers/scale";
import { getMemberNotifications } from "../../../lib/api/url";
import { apiRequest } from "../../../lib/api/api";
import { AntDesign } from "@expo/vector-icons";
import { connect, Dispatch } from "react-redux";

import { updateProfileInfoSuccess } from "../ProfileInfo/actions/profileInfo.actions";

class index extends Component {
                 constructor(props) {
                   super(props);

                   this.state = {
                     spinner: false,
                     notifications: [],
                     viewApplication: false,
                    requestStatusModal: false,
                    requestRejected: false,
                    rejectionNote:''
                   };
                 }

                 viewRequest = () => {
                   this.setState({
                     requestStatusModal: !this.state.requestStatusModal,
                    //  requestRejected: rejected,
                    //  rejectionNote
                   });
                 }

                 changeState = value => {
                   this.setState(value);
                 };

                 componentDidMount() {
                   this.ongetNotifications();
                 }

                 ongetNotifications = () => {
                   this.setState(
                     {
                       spinner: true,
                       modalLoader: true
                     },
                     () => {
                       apiRequest(getMemberNotifications, "get")
                         .then(res => {
                           this.setState({
                             spinner: false
                           });
                           if (res) {
                             console.log(res);
                             console.log(res.data); // undefined
                            this.setState({notifications: res})
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
                   function Item({ backgroundColor, title, item, type }) {
                     return (
                       <View style={[style.item, { backgroundColor }]}>
                         {item.notificationTypeId === 1 && (
                           <TouchableHighlight
                             key={item.value}
                             underlayColor="#f7f7f7"
                             activeOpacity={0.75}
                             onPress={() => {
                               this.props.navigation.navigate("LoanPage", {
                                 switchToGuarantors: true
                               });
                             }}
                           >
                             <GeneralNotification data={item} />
                           </TouchableHighlight>
                         )}
                         {item.notificationTypeId == 2 &&
                           item.requestTagId == 2 && <LoanTile data={item} />}
                         {item.notificationTypeId == 2 &&
                           item.requestTagId == 1 && (
                             <WithdrawTile data={item}/>
                           )}
                         {item.type === "requests" && (
                           <GuarantorRequest data={item} />
                         )}
                         {item.type === "savings" && <Savings data={item} />}
                       </View>
                     );
                   }

                   return (
                     <SafeAreaView>
                       <Spinner
                         visible={this.state.spinner}
                         size="large"
                         color="#000000"
                         animation="none"
                         overlayColor={"rgba(255, 255, 255, 0.1)"}
                       />
                       <StatusBar
                         translucent={true}
                         backgroundColor={colors.white}
                         barStyle="dark-content"
                       />
                       <View
                         style={{
                           backgroundColor: "#fdfdfd"
                         }}
                       >
                         <View
                           style={{
                             marginTop: scaleHeight(70),
                             paddingVertical: scaleHeight(20),
                             marginHorizontal: scale(10),
                             borderBottomWidth: 2,
                             borderBottomColor: "#f8f7f7"
                           }}
                         >
                           <Text style={{ fontFamily: "nunito-bold" }}>
                             Notifications
                           </Text>
                         </View>
                         <FlatList
                           data={this.state.notifications}
                           renderItem={({ item, index }) =>
                             index % 2 !== 0 ? (
                               <Item
                                 title={item.title}
                                 item={item}
                                 backgroundColor="#f8f7f7"
                               />
                             ) : (
                               <Item title={item.title} item={item} />
                             )
                           }
                           keyExtractor={item => item.id}
                         />
                       </View>
                       <Header navigation={{ ...this.props.navigation }} />
                       <ApplicationStatus 
                       visible={this.state.requestStatusModal} 
                       rejected={this.state.requestRejected}
                       rejectionNote={this.state.rejectionNote}
                       />
                     </SafeAreaView>
                   );
                 }
               }


const mapStateToProps = state => {
    return {
        // userData: state.login,
        // isLoading: state.profile.loading,
        // infoUpdated: state.profile.infoUpdated
    };
};

const mapDispatchToProps = {
    showToast,
    updateProfileInfoSuccess
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(index);

const style = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  link: {
    fontSize: 15,
    paddingBottom: 16,
    paddingTop: 16,
    marginBottom: 28
  },
  primary: {
    paddingRight: 38,
    paddingLeft: 38
  },
  secondary: {
    paddingRight: 44,
    paddingLeft: 44
  },
  pageheader: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: scale(18),
    paddingVertical: scaleHeight(18),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  icon: {
    alignSelf: "flex-end",
    marginRight: scale(30)
  },
  input: {
    marginBottom: scaleHeight(12),
    marginRight: scale(40)
  },
  label: {
    fontFamily: "nunito-bold",
    marginVertical: scaleHeight(16)
  },
  container: {
    flex: 1
  },
  item: {
    backgroundColor: "#f9c2ff",
  },
  title: {
    fontSize: 32
  }
});
