import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
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
import Toast from "../../../components/Toast/Toast";
import ReviewApplication from "./ReviewApplication";
import { getAllGuarantors } from "../../../lib/api/url";
import { apiRequest } from "../../../lib/api/api";
import SelectDropdown from "../../../components/SelectPopUp/SelectPopUp";

export default class ApplyLoanModal extends Component {
                 constructor(props) {
                   super(props);
                   this.state = {
                     selected: "1",
                     showLoanInfo: true,
                     showGuarantorInfo: false,
                     loanType: {},
                     amount: "",
                     guarantors: [{}],
                     review: false,
                     showToast: false,
                     toastMessage: ""
                   };
                 }

                 changeState = value => {
                   this.setState(value);
                 };

                 showReview = () => {
                   this.props._toggleView();
                   this.setState({
                     review: !this.state.review
                   });
                 };

                 showApplyForm = () => {
                   this.props._toggleView();
                   this.setState({
                     review: !this.state.review
                   });
                 };

                 toggleReview = () => {
                   this.setState({
                     review: !this.state.review
                   });
                 };

                 ongetGuarantors = (id) => {
                  
                   this.setState(
                     {
                       spinner: true,
                       modalLoader: true
                     },
                     () => {
                       apiRequest(getAllGuarantors, "get", {
                         params: {
                           loanapplicationid: id
                         }
                       })
                         .then(res => {
                           this.setState({
                             spinner: false
                           });
                           if (res) {
                             console.log(res);
                             console.log(res.data); // undefined
                             this.setState({ guarantors: res });
                           } else {
                             this.setState({toastMessage: res.messsage});
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

                 onhandleLoanApplication = () => {
                   Keyboard.dismiss();

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
                             this.showCalculator();
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

                 validateLoanInfo = () => {
                   if (Object.entries(this.state.loanType).length <= 0) {
                     this.setState({
                       showToast: true,
                       toastMessage: "Kindly enter a valid loan type"
                     });
                     return false;
                   } else if (this.state.amount <= 0) {
                     this.setState({
                       showToast: true,
                       toastMessage: "Kindly enter a valid amount"
                     });
                     return false;
                   }
                   this.setState({
                     showLoanInfo: false,
                     selected: "2",
                     showGuarantorInfo: true
                   });
                 };

                 render() {
                   function Guarantor(props) {
                     return (
                       <View
                         style={{
                           flexDirection: "row",
                           alignItems: "flex-start",
                           marginBottom: scaleHeight(30)
                         }}
                       >
                         <View
                           style={{
                             flex: 3,
                             flexDirection: "row"
                           }}
                         >
                           <Image
                             source={require("../../../../assets/icons/man.png")}
                             style={{ flex: 1 }}
                           />
                           <View
                             style={{
                               flex: 3,
                               justifyContent: "space-between",
                               paddingVertical: scaleHeight(10),
                               paddingHorizontal: scale(12)
                             }}
                           >
                             <Text style={{ color: "#504e4e" }}>
                               Mr Obasi Suleman
                             </Text>
                             <Text style={{ color: "#c1c1c1" }}>
                               joshuadavid@gmail.com
                             </Text>
                           </View>
                           <TouchableOpacity
                             activeOpacity={0.7}
                             onPress={() => console.log("cancel")}
                           >
                             <Icon
                               name="close"
                               iconStyle={[
                                 theme.typo_bold,
                                 styles.icon,
                                 {
                                   flex: 1,
                                   marginTop: scaleHeight(10),
                                   justifyContent: "flex-end",
                                   alignContent: "center"
                                 }
                               ]}
                             />
                           </TouchableOpacity>
                         </View>
                       </View>
                     );
                   }
                   return (
                     <SafeAreaView style={[theme.container]}>
                       <BottomSheet
                         visible={this.props.visible}
                         onBackButtonPress={this.props._toggleView}
                       >
                         <View
                           style={{
                             flexDirection: "row",
                             justifyContent: "space-between"
                           }}
                         >
                           <TouchableOpacity
                             activeOpacity={0.7}
                             onPress={this.props._toggleView}
                             style={{ width: width / 3 }}
                           >
                             <Text
                               style={[
                                 theme.font17,
                                 { color: "#fff", paddingHorizontal: scale(7) }
                               ]}
                             >
                               Back
                             </Text>
                           </TouchableOpacity>
                           <TouchableOpacity
                             activeOpacity={0.7}
                             onPress={this.props._toggleView}
                           >
                             <Icon
                               name="close"
                               iconStyle={[
                                 theme.typo_bold,
                                 styles.icon,
                                 styles.exit
                               ]}
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
                           <View style={{ flex: 1 }}>
                             <View style={[styles.header]}>
                               <Image
                                 style={{}}
                                 source={require("../../../../assets/icons/naira.png")}
                               />
                               <Text
                                 style={[
                                   theme.typo_bold,
                                   theme.font17,
                                   {
                                     width: width - 80,
                                     paddingLeft: scale(20),
                                     paddingVertical: scaleHeight(20)
                                   }
                                 ]}
                               >
                                 Apply For Loan
                               </Text>
                             </View>
                             <View style={{ flex: 1, marginTop: 10 }}>
                               <Tabs
                                 tab1Text="Loan Info"
                                 tab2Text="Gurantor Info"
                                 selected={this.state.selected}
                                 tab2Event={this.validateLoanInfo}
                                 tab1Event={() =>
                                   this.setState({
                                     showGuarantorInfo: false,
                                     selected: "1",
                                     showLoanInfo: true
                                   })
                                 }
                               />
                             </View>
                             <View style={{ flex: 6 }}>
                               {this.state.showLoanInfo && (
                                 <View
                                   style={[
                                     theme.container,
                                     styles.MainContainer
                                   ]}
                                 >
                                   <KeyboardAwareScrollView
                                     keyboardShouldPersistTaps={"handled"}
                                     enableOnAndroid={true}
                                     scrollEnabled={true}
                                     alwaysBounceVertical={false}
                                     bounces={false}
                                   >
                                     <View style={{ flexDirection: "row" }}>
                                       <View
                                         style={{
                                           flex: 2,
                                           flexDirection: "column",
                                           marginRight: 12
                                         }}
                                       >
                                         <View>
                                           <Text style={[styles.label]}>
                                             Loan Summary
                                           </Text>
                                           <View
                                             style={[
                                               styles.pickerStlye,
                                               {
                                                 borderWidth:
                                                   StyleSheet.hairlineWidth
                                               }
                                             ]}
                                           >
                                             <SelectDropdown
                                               options={
                                                 this.props.loanTypes || []
                                               }
                                               value={""}
                                               title={`Select Loan Type`}
                                               onChange={obj =>
                                                 {this.setState({
                                                   loanType: obj
                                                 });
                                                 if(obj.numberOfGuarantors > 0){this.ongetGuarantors(obj.id)}
                                                }
                                               }
                                               dropdownImageStyle={{
                                                 top: scale(10)
                                               }}
                                             >
                                               <View
                                                 style={[
                                                   {
                                                     height: scale(40),
                                                     paddingHorizontal: scale(
                                                       20
                                                     ),
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
                                                   {this.state.loanType
                                                     .description || ""}
                                                 </Text>
                                               </View>
                                             </SelectDropdown>
                                           </View>
                                         </View>
                                       </View>

                                       <View
                                         style={{
                                           flex: 1,
                                           justifyContent: "flex-end",
                                           marginLeft: 12
                                         }}
                                       >
                                         <Text
                                           style={[
                                             theme.caption,
                                             theme.flex1,
                                             theme.padded_label
                                           ]}
                                         >
                                           Interest Rate
                                         </Text>
                                         <View
                                           style={[
                                             theme.typo_bold,
                                             theme.font17
                                           ]}
                                         >
                                           <Text
                                             style={[
                                               theme.font15,
                                               {
                                                 color: "#138516",
                                                 backgroundColor: "#d0e7d1",
                                                 height: scaleHeight(40),
                                                 textAlign: "center",
                                                 textAlignVertical: "center"
                                               }
                                             ]}
                                           >{`${this.state.loanType
                                             .interestRate || 0}%`}</Text>
                                         </View>
                                       </View>
                                     </View>

                                     {this.state.loanType.requiresGuarantor ? (
                                       <Text
                                         style={[
                                           {
                                             fontSize: 11,
                                             color: "#138516",
                                             flexDirection: "row",
                                             alignItems: "flex-start",
                                             justifyContent: "flex-start",
                                             fontFamily: "nunito-regular",
                                             marginVertical: scaleHeight(20)
                                           }
                                         ]}
                                       >
                                         {`For this Loan type, you would require ${this.state.loanType.numberOfGuarantors} guarantor(s)`}
                                       </Text>
                                     ) : (
                                       <View
                                         style={{
                                           marginVertical: scaleHeight(20)
                                         }}
                                       ></View>
                                     )}
                                     <View
                                       style={{
                                         flexDirection: "row",
                                         alignItems: "flex-start",
                                         marginBottom: scaleHeight(30)
                                       }}
                                     >
                                       <View
                                         style={{
                                           flex: 2,
                                           flexDirection: "column",
                                           marginRight: 12
                                         }}
                                       >
                                         <Text
                                           style={[
                                             theme.caption,
                                             theme.flex1,
                                             theme.padded_label
                                           ]}
                                         >
                                           Amount
                                         </Text>
                                         <View style={[styles.pickerStlye]}>
                                           <CustomInput
                                             value={this.state.amount}
                                             keyboardType="number-pad"
                                             onChangeText={amount =>
                                               this.changeState({
                                                 amount: amount.trim()
                                               })
                                             }
                                             style={[
                                               theme.flex1,
                                               theme.caption,
                                               theme.typo_regular,
                                               { borderColor: "#d0d0d0" }
                                             ]}
                                           />
                                         </View>
                                       </View>

                                       <View
                                         style={{
                                           flex: 1,
                                           justifyContent: "flex-end",
                                           marginLeft: 12
                                         }}
                                       >
                                         <Text
                                           style={[
                                             theme.caption,
                                             theme.flex1,
                                             theme.padded_label
                                           ]}
                                         >
                                           Guarantor
                                         </Text>
                                         <View
                                           style={[
                                             theme.typo_bold,
                                             theme.font17
                                           ]}
                                         >
                                           <Text
                                             style={[
                                               theme.font15,
                                               {
                                                 color: "#138516",
                                                 backgroundColor: "#d0e7d1",
                                                 height: scaleHeight(40),
                                                 textAlignVertical: "center",
                                                 textAlign: "center"
                                               }
                                             ]}
                                           >
                                             {this.state.loanType
                                               .requiresGuarantor
                                               ? `Needed`
                                               : `Not Needed`}
                                           </Text>
                                         </View>
                                       </View>
                                     </View>
                                   </KeyboardAwareScrollView>
                                   <TouchableOpacity
                                     activeOpacity={0.7}
                                     style={[styles.buttons]}
                                     onPress={this.validateLoanInfo}
                                   >
                                     <GreenButton button_text="Proceed" />
                                   </TouchableOpacity>
                                 </View>
                               )}
                               {this.state.showGuarantorInfo && (
                                 <View
                                   style={[
                                     theme.container,
                                     styles.MainContainer
                                   ]}
                                 >
                                   <KeyboardAwareScrollView
                                     keyboardShouldPersistTaps={"handled"}
                                     enableOnAndroid={true}
                                     scrollEnabled={true}
                                     alwaysBounceVertical={false}
                                     bounces={false}
                                   >
                                     <View
                                       style={{
                                         flexDirection: "row",
                                         alignItems: "flex-start"
                                       }}
                                     >
                                       <View
                                         style={{
                                           flex: 2,
                                           flexDirection: "column"
                                         }}
                                       >
                                         <Text
                                           style={[
                                             theme.caption,
                                             theme.flex1,
                                             theme.padded_label
                                           ]}
                                         >
                                           Add a Guarantor{" "}
                                         </Text>
                                         <View style={[styles.pickerStlye]}>
                                           <CustomInput
                                             value={this.state.policeId}
                                             onChangeText={policeId =>
                                               this.changeState({
                                                 policeId: policeId.trim()
                                               })
                                             }
                                             style={[
                                               theme.flex1,
                                               theme.caption,
                                               theme.typo_regular
                                             ]}
                                           />
                                         </View>
                                         {this.state.loanType
                                           .requiresGuarantor ? (
                                           <Text
                                             style={[
                                               {
                                                 fontSize: 11,
                                                 color: "#138516",
                                                 flexDirection: "row",
                                                 alignItems: "flex-start",
                                                 justifyContent: "flex-start",
                                                 fontFamily: "nunito-regular",
                                                 marginVertical: scaleHeight(20)
                                               }
                                             ]}
                                           >
                                             {`At least ${this.state.loanType.numberOfGuarantors} guarantor(s)`}
                                           </Text>
                                         ) : (
                                           <View
                                             style={{
                                               marginVertical: scaleHeight(20)
                                             }}
                                           ></View>
                                         )}
                                         <View>
                                           <FlatList
                                             data={this.state.guarantors}
                                             renderItem={({ item, index }) => (
                                               <Guarantor item={item} />
                                             )}
                                             keyExtractor={item => item.id}
                                           />
                                         </View>
                                       </View>
                                     </View>
                                     {/* <View
                                       style={{
                                         flexDirection: "row",
                                         alignItems: "flex-start",
                                         marginBottom: scaleHeight(30)
                                       }}
                                     >
                                       <View
                                         style={{
                                           flex: 3,
                                           flexDirection: "row"
                                         }}
                                       >
                                         <Image
                                           source={require("../../../../assets/icons/man.png")}
                                           style={{ flex: 1 }}
                                         />
                                         <View
                                           style={{
                                             flex: 3,
                                             justifyContent: "space-between",
                                             paddingVertical: scaleHeight(10),
                                             paddingHorizontal: scale(12)
                                           }}
                                         >
                                           <Text style={{ color: "#504e4e" }}>
                                             Mr Obasi Suleman
                                           </Text>
                                           <Text style={{ color: "#c1c1c1" }}>
                                             joshuadavid@gmail.com
                                           </Text>
                                         </View>
                                         <TouchableOpacity
                                           activeOpacity={0.7}
                                           onPress={() => console.log("cancel")}
                                         >
                                           <Icon
                                             name="close"
                                             iconStyle={[
                                               theme.typo_bold,
                                               styles.icon,
                                               {
                                                 flex: 1,
                                                 marginTop: scaleHeight(10),
                                                 justifyContent: "flex-end",
                                                 alignContent: "center"
                                               }
                                             ]}
                                           />
                                         </TouchableOpacity>
                                       </View>
                                     </View> */}
                                   </KeyboardAwareScrollView>
                                   <TouchableOpacity
                                     activeOpacity={0.7}
                                     style={[styles.buttons, { flex: 1 }]}
                                     onPress={this.showApplyForm}
                                   >
                                     <GreenButton button_text="Proceed" />
                                   </TouchableOpacity>
                                 </View>
                               )}
                             </View>
                           </View>
                         </View>
                       </BottomSheet>
                       <ReviewApplication
                         visible={this.state.review}
                         _toggleView={this.toggleReview}
                         back={this.showApplyForm}
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
    marginTop: scale(20),
    paddingTop: Platform.OS === "ios" ? 20 : 0
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#efefef",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex: 1
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    height: scaleHeight(height / 1.1),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  exit: {
    backgroundColor: "#fff",
    marginRight: scale(10),
    marginBottom: scaleHeight(10)
  },

  icon: {
    borderRadius: 50,
    fontSize: 25,
    padding: scale(6),
    color: "#138516",
    backgroundColor: "#f5f5f5"
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
  },
  pickerStlye: {
    color: "#9f9f9f",
    borderColor: "#d0d0d0",
    backgroundColor: "rgba(0, 13, 55, 0.02)",
    height: scaleHeight(40),
    flexDirection: "column",
    justifyContent: "center"
  },
  buttons: {
    flex: 1,
    marginHorizontal: scale(10)
  }
});
