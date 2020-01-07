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
import { Icon } from "react-native-elements";
import { scale, scaleHeight } from "../../../helpers/scale";
import Tabs from "../../../components/Tabs";
import { SafeAreaView } from "react-navigation";
import { apiRequest } from "../../../lib/api/api";
import FailureModal from "../../../components/FailureModal";
import BorderedTabs from "../../../components/BorderedTab";
import SelectDropdown from "../../../components/SelectPopUp/SelectPopUp";
import { calculateLoan } from "../../../lib/api/url";
import Recalculate from "./Recalculate";
import Toast from "../../../components/Toast/Toast";
import Spinner from "react-native-loading-spinner-overlay";
import TouchItem from "../../../components/TouchItem/_TouchItem";

export default class CalculateLoan extends Component {
                 constructor(props) {
                   super(props);
                   this.state = {
                     amount: 0,
                     success: false,
                     failure: false,
                     showRecalculate: false,
                     loanType: {},
                     duration: 0,
                     showToast: false,
                     toastMessage: "",
                       calculatedResult:{
                       schedules:[]
                       }
                   };
                 }

                 changeState = value => {
                   this.setState(value);
                 };

                 toggleToast = () => {
                   this.setState({ showToast: !this.state.showToast });
                 };

                 recalculate = () => {
                   this.props._toggleView();
                   this.setState({
                     showRecalculate: !this.state.showRecalculate
                   });
                 };

                 showCalculator = (calculatedResult) =>
                   this.setState({
                     showRecalculate: !this.state.showRecalculate,
                       calculatedResult
                   });

                 onhandleCalculateLoan = () => {
                   let amount =0;
                   if (this.state.loanType.loanClassId == "1") {
                     amount = this.state.loanType.fixedAmount;
                   } else amount = this.state.amount;
                   this.setState(
                     {
                       spinner: true,
                       modalLoader: true
                     },
                     () => {
                       apiRequest(calculateLoan, "get", {
                         params: {
                           amount,
                           loantypeid: this.state.loanType.id,
                           duration: this.state.duration
                         }
                       })
                         .then(res => {
                           this.setState({
                             spinner: false
                           });
                           if (res) {
                             console.log(res);
                             console.log(res.data);
                             this.showCalculator(res);
                           } else {
                             this.setState({ toastMessage: res.message });
                             this.toggleToast();
                           }
                         })
                         .catch(error => {
                           if (error.response) {
                             this.toggleToast();
                             this.setState({ toastMessage: error.response });
                             console.log(error.response);
                           } else {
                             this.toggleToast();
                             this.setState({
                               toastMessage: error.message
                             });
                           }
                           this.setState({
                             spinner: false
                           });
                         });
                     }
                   );
                 };

                 validate = async () => {
                   if (Object.entries(this.state.loanType).length <= 0) {
                     this.setState({
                       showToast: true,
                       toastMessage: "Kindly enter a valid loan type"
                     });
                   }
                   else if (this.state.amount <= 0 || this.state.amount>1000000000) {
                     this.setState({
                       showToast: true,
                       toastMessage: "Kindly enter a valid amount between ₦100 and ₦1,000,000,000"
                     });
                   } else if ((this.state.duration < 1 || this.state.duration > 12) && (this.state.loanType.loanClassId!==1) ) {
                     this.setState({
                       showToast: true,
                       toastMessage:
                         "Kindly enter a valid duration (Any number bewtween 1 and 12)"
                     });
                   } else {
                     this.onhandleCalculateLoan();
                   }
                 };

                 render() {
                   const { data } = this.props;
                   return (
                     <SafeAreaView>
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
                             <Spinner visible={this.state.spinner} size="large" color="#000000" animation="none"
                                      overlayColor={'rgba(0, 0, 0, 0.5)'}/>
                           <View style={[styles.header]}>
                             <Image
                               source={require("../../../../assets/icons/calculator.png")}
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
                               Calculate Loan
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
                                 flex: 6
                               }
                             ]}
                           >
                             <View style={{flexDirection:'row'}}>
                               <View style={{flex:1}}>
                                 <Text style={[styles.label]}>
                                   Loan Summary
                                 </Text>
                                 <View
                                   style={[
                                     styles.pickerStlye,
                                     {
                                       borderWidth: StyleSheet.hairlineWidth
                                     }
                                   ]}
                                 >
                                   <SelectDropdown
                                     options={this.props.loanTypes || []}
                                     value={""}
                                     title={`Select Loan Type`}
                                     onChange={obj =>
                                       this.setState({
                                         loanType: obj
                                       })
                                     }
                                     dropdownImageStyle={{
                                       top: scale(10)
                                     }}
                                   >
                                     <View
                                       style={[
                                         {
                                           height: scale(40),
                                           paddingHorizontal: scale(20),
                                           justifyContent: "center"
                                         }
                                       ]}
                                       // onPress={this.onhandleSubmit}
                                     >
                                       {/*<Text style={styles.label}>Bank Name </Text>*/}
                                       <Text
                                         numberOfLines={1}
                                         style={styles.selectText}
                                       >
                                         {this.state.loanType.description || ""}
                                       </Text>
                                     </View>
                                   </SelectDropdown>
                                 </View>
                               </View>
                                 <View
                                     style={{
                                         // flex: 1,
                                         // justifyContent: "flex-end",
                                         marginLeft: 12,
                                     }}
                                 >
                                     <Text style={[styles.label]}>
                                         Interest Rate
                                     </Text>

                                     <View
                                         style={{
                                             height: scale(40),
                                             backgroundColor: "#d0e7d1",
                                             justifyContent: 'center', alignItems: 'center'
                                         }}
                                     >
                                         <Text
                                             style={[
                                                 theme.font15,
                                                 {
                                                     color: "#138516",
                                                     textAlign: "center",
                                                     textAlignVertical: "center"
                                                 }
                                             ]}
                                         >{`${this.state.loanType
                                             .interestRate || 0}%`}</Text>
                                     </View>
                                 </View>
                             </View>
                               {!!(this.state.loanType.loanClassId!==1) && (
                             <Text style={[styles.label]}>Amount</Text>
                               )}
                             <View
                               style={[styles.input, { width: width - 110 }]}
                             >
                                 {!!(this.state.loanType.loanClassId!==1) && (
                                     <CustomInput
                                         value={this.state.loanType.loanClassId===1?this.state.loanType.fixedAmount:this.state.amount}
                                         keyboardType="number-pad"
                                         editable={this.state.loanType.loanClassId!==1}
                                         onChangeText={amount =>
                                             this.changeState({ amount: amount.trim() })
                                         }
                                         style={[{}]}
                                     />
                                 )}
                                 {!!(this.state.loanType.loanClassId===1) && (
                                     <View>
                                     <Text style={[styles.label]}>Fixed Amount: {this.state.loanType.fixedAmount}</Text>
                                     <Text style={[styles.label]}>Monthly Deduction: {this.state.loanType.deduction}</Text>
                                     </View>
                                 )}

                             </View>
                               {!!(this.state.loanType.loanClassId!==1) && (  <View>
                                   <Text style={[styles.label]}>Duration</Text>
                                   <View
                                       style={[styles.input, { width: width - 110 }]}
                                   >
                                       <CustomInput
                                           value={this.state.duration}
                                           keyboardType="number-pad"
                                           onChangeText={duration =>
                                               this.changeState({ duration })
                                           }
                                           style={[{}]}
                                       />
                                   </View>
                               </View>)}

                           </View>
                           <TouchItem
                             activeOpacity={0.7}
                             style={[styles.buttons]}
                             onPress={this.validate}
                           >
                             <GreenButton button_text="Calculate Loan"  handlePress={this.validate} />
                           </TouchItem>
                         </View>
                       </BottomSheet>
                       <Recalculate
                         visible={this.state.showRecalculate}
                         calculatedResult={this.state.calculatedResult}
                         _toggleView={this.showCalculator}
                         back={this.recalculate}
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
    flex: 1,
    paddingTop: scaleHeight(10),
    paddingBottom: scaleHeight(20),
    fontFamily: "nunito-bold"
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    height: height / 1.2,
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
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    marginHorizontal: scale(30),
    marginBottom: scaleHeight(30)
  },
  input: {
    marginBottom: scaleHeight(12)
    // marginRight: scale(40)
  },
  pickerStlye: {
    color: "#9f9f9f",
    borderColor: "#d0d0d0",
    backgroundColor: "rgba(0, 13, 55, 0.02)",
    // width: width - 110
  },
  selectText: {
    fontFamily: "nunito-medium",
    fontSize: scale(15),
    color: "#9f9f9f"
  },
  label: {
    fontFamily: "nunito-bold",
    marginBottom: scaleHeight(11),
    marginTop: scaleHeight(20)
  }
});
