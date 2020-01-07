import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Picker
} from "react-native";
import { BottomSheet } from "react-native-btr";
import CustomInput from "../../../components/CustomTextInput/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import theme from "../../../../assets/styles/globalStyles";
import GreenButton from "../../../components/GreenButton";
import Spinner from 'react-native-loading-spinner-overlay';
import { Icon } from "react-native-elements";
import { scale, scaleHeight } from "../../../helpers/scale";
import Tabs from "../../../components/Tabs";
import { SafeAreaView } from "react-navigation";
import RequestSuccessful from "./RequestSuccessful";
import { apiRequest } from "../../../lib/api/api";
import FailureModal from "../../../components/FailureModal";
import BorderedTabs from "../../../components/BorderedTab";
import { withdrawVoluntaryContributions } from "../../../lib/api/url";
import Toast from "../../../components/Toast/Toast";
import { formatBalance } from "../../../lib/utils/helpers";
// import RequestSuccess from './RequestSuccess';

export default class WithdrawalRequest extends Component {
                 constructor(props) {
                   super(props);
                   this.state = {
                     amount: 0,
                     spinner: false,
                     success: false,
                     failure: false,
                     failureMessage: "",
                     successMessage: "",
                     showToast: false,
                     toastMessage: ""
                   };
                 }

                 changeState = value => {
                   this.setState(value);
                 };

                 checkStatus=()=> {
                  this.setState({
                    success: !this.state.success
                  });
                  this.props.navigation.navigate("RequestHistory", {
                    showWithdrawalRequests: true
                  });
                 }

                 showWithdrawSuccess = () => {
                   this.props._toggleView();
                   this.setState({
                     success: !this.state.success
                   });
                 };

                 toggleWithdraw = () =>
                   this.setState({
                     success: !this.state.success
                   });

                 showWithdrawFailure = () => {
                   this.props._toggleView();
                   this.setState({
                     failure: !this.state.failure
                   });
                 };

                 toggleFailure = () => {
                   this.props._toggleView();
                   this.setState({
                     failure: !this.state.failure
                   });
                 };

                 onhandleSubmitWithdrawal = () => {
                   const { userData } = this.props;
                   this.setState(
                     {
                       spinner: true,
                       modalLoader: true
                     },
                     () => {
                       apiRequest(withdrawVoluntaryContributions, "get", {
                         params: {
                           memberid: userData.id,
                           amount: this.state.amount,
                           notitificationcode: "",
                           requirementcode: "UCA"
                         }
                       })
                         .then(res => {
                           this.setState({
                             spinner: false
                           });
                           if (res) {
                             console.log(res);
                             console.log(res.data);
                             this.setState({ amount: 0, successMessage: res.message });
                             this.showWithdrawSuccess();
                           } else {
                             this.showWithdrawSuccess();
                           }
                         })
                         .catch(error => {
                           if (error.response) {
                             this.setState({
                               failureMessage: error,
                               amount: 0
                             });
                             this.showWithdrawFailure();
                             console.log("error response", error);
                           } else {
                             this.showWithdrawFailure();
                           }
                           this.setState({
                             spinner: false
                           });
                         });
                     }
                   );
                 };

                 validate = async () => {
                   const { data } = this.props;
                   if (this.state.amount <= 0 || this.state.amount>1000000000) {
                     this.setState({
                       showToast: true,
                       toastMessage:
                         "Kindly enter a valid amount between ₦100 and ₦1,000,000,000"
                     });
                   } else if (this.state.amount >= data.voluntaryBalance) {
                     this.setState({
                       showToast: true,
                       toastMessage:
                         "Kindly enter an amount that is less than your balance"
                     });
                          } else {
                            this.onhandleSubmitWithdrawal();
                          }
                 };

                 render() {
                   const { data } = this.props;
                   return (
                     <SafeAreaView>
                       <Spinner
                         visible={this.state.spinner}
                         size="large"
                         color="#000000"
                         animation="none"
                         overlayColor={"rgba(0, 0, 0, 0.5)"}
                       />
                       <BottomSheet
                         visible={this.props.visible}
                         onBackButtonPress={this.props._toggleView}
                       >
                         <View
                           style={{
                             flexDirection: "row",
                             justifyContent: "flex-end"
                           }}
                         >
                           <TouchableOpacity
                             activeOpacity={0.7}
                             style={{
                               paddingVertical: scale(9),
                               paddingHorizontal: scaleHeight(15)
                             }}
                           >
                             <Icon
                               name="close"
                               iconStyle={[styles.icon]}
                               onPress={this.props._toggleView}
                             />
                           </TouchableOpacity>
                         </View>

                         {this.state.showToast && (
                           <Toast
                             message={this.state.toastMessage}
                             type="error"
                             onClickHandler={() =>
                               this.setState({ showToast: false })
                             }
                           />
                         )}
                         <View style={styles.bottomNavigationView}>
                           <View
                             style={[
                               theme.container,
                               styles.MainContainer,
                               styles.header,
                               { marginVertical: scaleHeight(20) }
                             ]}
                           >
                             <Image
                               source={require("../../../../assets/icons/coins.png")}
                             />
                             <Text
                               style={[
                                 {
                                   width: width - 80,
                                   paddingLeft: scale(10),
                                   paddingVertical: scaleHeight(15),
                                   fontFamily: "nunito-bold",
                                   fontSize: 20
                                 }
                               ]}
                             >
                               Withdraw Funds
                             </Text>
                           </View>
                           <View
                             style={[
                               theme.container,
                               styles.MainContainer,
                               {
                                 alignItems: "flex-start",
                                 marginBottom: scaleHeight(50),
                                 marginLeft: scale(20),
                                 flex: 4
                               }
                             ]}
                           >
                             <View>
                               <Text
                                 style={{
                                   color: "#138516",
                                   fontFamily: "nunito-regular"
                                 }}
                               >
                                 Present Voluntary Savings Amount
                               </Text>
                               <View
                                 style={[
                                   {
                                     flexDirection: "row",
                                     marginVertical: scaleHeight(10)
                                   }
                                 ]}
                               >
                                 {/* <Icon name="naira"/> */}
                                 <Text
                                   style={{
                                     fontFamily: "nunito-bold",
                                     fontSize: 20,
                                     color: "#575757"
                                   }}
                                 >{`₦${formatBalance(
                                   data.voluntaryBalance
                                 )}`}</Text>
                               </View>
                             </View>
                             <View style={{ flex: 1 }}>
                               <Text style={[styles.label, { flex: 1 }]}>
                                 Amount
                               </Text>
                               <View
                                 style={[
                                   styles.input,
                                   { width: width - 110, flex: 1 }
                                 ]}
                               >
                                 <CustomInput
                                   value={this.state.amount}
                                   keyboardType="number-pad"
                                   onChangeText={amount =>
                                     this.changeState({ amount })
                                   }
                                   style={[{ borderColor: "#d0d0d0" }]}
                                 />
                               </View>
                             </View>
                           </View>
                           <TouchableOpacity
                             activeOpacity={0.7}
                             style={[styles.buttons]}
                             onPress={this.validate}
                           >
                             <GreenButton button_text="Submit Withdrawal" />
                           </TouchableOpacity>
                         </View>
                       </BottomSheet>
                       <RequestSuccessful
                         visible={this.state.success}
                         _toggleView={this.toggleWithdraw}
                         subtitle="Withdrawal Request Submitted Successfully"
                         smallText={`${this.state.successMessage}`}
                         checkStatus={this.checkStatus}
                       />
                       <FailureModal
                         visible={this.state.failure}
                         _toggleView={this.toggleFailure}
                         subtitle="Request Submission Failed"
                         smallText={`${this.state.failureMessage}`}
                       />
                     </SafeAreaView>
                   );
                 }
               }

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 2,
    paddingHorizontal: scale(10),
    marginTop: scaleHeight(20),
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    marginLeft: scale(10)
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#efefef",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginHorizontal: scale(13),
    flex: 2,
    fontFamily: "nunito-bold"
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    height: height / 1.4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },

  icon: {
    borderRadius: 50,
    fontSize: 25,
    padding: 6,
    color: "#138516",
    backgroundColor: "#f5f5f5"
  },
  pickerStlye: {
    color: "#504e4e",
    fontFamily: "nunito-medium",
    borderColor: "#d0d0d0",
    backgroundColor: "rgba(0, 13, 55, 0.02)",
    height: scaleHeight(40),
    flexDirection: "column",
    justifyContent: "center"
  },
  buttons: {
    flex: 2,
    alignSelf: "stretch",
    justifyContent: "center",
    marginHorizontal: scale(30),
    marginBottom: 30
  },
  input: {
    marginBottom: scaleHeight(12)
    // marginRight: scale(40)
  },
  label: {
    fontFamily: "nunito-bold",
    marginVertical: scaleHeight(20)
  }
});
