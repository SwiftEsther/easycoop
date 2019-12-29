import React, { Component } from 'react';
import { TextInput, ScrollView, Picker, StatusBar, StyleSheet, TouchableOpacity, Image, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage } from 'react-native';
import { systemWeights } from 'react-native-typography';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../lib/constants/colors';
import * as constants from '../../../../lib/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import {SIGN_UP} from '../../../../lib/constants';
import style from './style';
import { scale, scaleHeight } from "../../../helpers/scale";
import '../../../../lib/helpers';
import { Colors } from "../../../lib/constants/colors";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import Space from '../../../components/Space';
import BlackButton from '../../../components/BlackButton';
import ButtonLink from '../../../components/ButtonLink';
import GreenLineSeparator from '../../../components/GreenLineSeparator';
import Tabs from '../../../components/Tabs';
import ApplyLoanModal from './ApplyLoanModal';
import ApplicationSuccessful from './ApplicationSuccessful';
import ApplicationStatus from './ApplicationStatus';
import EditApplication from './EditApplication';
import ReviewApplication from './ReviewApplication';
import Header from "../../../components/Header";
import ProgressBar from '../../../components/Progressbar';
import SelectDropdown from "../../../components/SelectPopUp/SelectPopUp";
import BorderedTabs from "../../../components/BorderedTab";
import CalculateLoan from './CalculateLoan';
import {AntDesign,MaterialIcons} from '@expo/vector-icons';


export default class index extends Component {
                 constructor(props) {
                   super(props);

                   this.state = {
                     spinner: false,
                     selected: "1",
                     showLoan: true,
                     showGuarantorRequests: false,
                     success: false,
                     loanApply: false,
                     showCalculator: false
                   };
                 }

                 changeState = value => {
                   this.setState(value);
                 };

                 toggleCalculator = () => {
    this.setState({
      showCalculator: !this.state.showCalculator
    });
  }
    toggleLoanModal = () => {
    this.setState({
      loanApply: !this.state.loanApply
    });
  };


                 loans = () =>this.setState({
                    showLoan: true,
                    selected: "1",
                    showGuarantorRequests: false,
                });

                requests = () =>this.setState({
                    showLoan: false,
                    selected: "2",
                    showGuarantorRequests: true,
                });

                 showLoanApply = () =>
                   this.setState({ loanApply: !this.state.loanApply });

                 render() {
                   const ranks = [
                     { label: "Constable", value: "constable" },
                     { label: "Corporal", value: "corporal" },
                     { label: "Sergent", value: "sergent" },
                     { label: "Inspector ", value: "inspector" },
                     { label: "ASP II", value: "aspii" },
                     { label: "ASP I", value: "aspi" },
                     { label: "DSP", value: "dsp" },
                     { label: "Corporal", value: "corporal" },
                     { label: "SP", value: "sp" },
                     { label: "CSP", value: "csp" },
                     { label: "ACP", value: "acp" },
                     { label: "DCP ", value: "dcp" },
                     { label: "CP", value: "cp" },
                     { label: "AIG", value: "aig" },
                     { label: "DIG", value: "dig" },
                     { label: "IGP ", value: "igp" }
                   ];
                   return (
                     <>
                       <StatusBar
                         backgroundColor={Colors.white}
                         barStyle="dark-content"
                       />
                       <SafeAreaView
                         style={[
                           theme.container,
                           {
                             fontFamily: "nunito-bold"
                           }
                         ]}
                       >
                         <ScrollView
                           keyboardShouldPersistTaps={"handled"}
                           enableOnAndroid={true}
                         >
                           <View
                             style={[
                               theme.container,
                               style.MainContainer,
                               { marginTop: scaleHeight(70) }
                             ]}
                           >
                             <BorderedTabs
                               tabNumber={2}
                               tab1Text="Loan"
                               tab2Text="Guarantor Requests"
                               selected={this.state.selected}
                               tab1Event={this.loans}
                               tab2Event={this.requests}
                             />

                             <KeyboardAwareScrollView
                               keyboardShouldPersistTaps={"handled"}
                               enableOnAndroid={true}
                               scrollEnabled={true}
                               alwaysBounceVertical={false}
                               bounces={false}
                             >
                               {/* {this.state.showForceInfo && <View></View>} */}
                               {this.state.showLoan && (
                                 <View style={{ backgroundColor: "#f4f6fa" }}>
                                   <View style={[style.container2]}>
                                     <Text
                                       style={{
                                         fontFamily: "nunito-bold",
                                         marginBottom: scaleHeight(11)
                                       }}
                                     >
                                       Loan Summary
                                     </Text>
                                     <View
                                       style={[
                                         style.pickerStlye,
                                         {
                                           borderWidth: StyleSheet.hairlineWidth
                                         }
                                       ]}
                                     >
                                       <SelectDropdown
                                         options={ranks || []}
                                         value={""}
                                         title={`Select Rank`}
                                         onChange={obj =>
                                           this.setState({
                                             rank: obj
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
                                             style={style.selectText}
                                           >
                                             {"dig"}
                                           </Text>
                                         </View>
                                       </SelectDropdown>
                                     </View>
                                     <Image
                                       source={require("../../../../assets/icons/blue_naira.png")}
                                     />
                                     <View style={[style.amount]}>
                                       <View>
                                         <Text style={[style.amountText]}>
                                           Amount Due:
                                         </Text>
                                         <Text style={[style.price]}>
                                           #100,000,000
                                         </Text>
                                       </View>
                                       <View>
                                         <Text style={[style.amountText]}>
                                           Amount Paid:
                                         </Text>
                                         <Text style={[style.price]}>
                                           #100,000,000
                                         </Text>
                                       </View>
                                     </View>
                                     <View>
                                       <ProgressBar percentage={50} />
                                     </View>
                                     <Text
                                       style={{
                                         marginTop: scaleHeight(13),
                                         color: "#9f9f9f",
                                         fontFamily: "nunito-medium"
                                       }}
                                     >
                                       50%
                                     </Text>
                                   </View>
                                   <TouchableOpacity
                                     activeOpacity={0.7}
                                     style={[style.icon]}
                                     onPress={this.toggleLoanModal}
                                   >
                                     <View
                                       style={{
                                         flexDirection: "row",
                                         justifyContent: "space-between",
                                         backgroundColor: "#00a3c9",
                                         paddingHorizontal: scale(17),
                                         paddingVertical: scaleHeight(20),
                                         margin: scaleHeight(10),
                                         borderRadius: 7
                                       }}
                                     >
                                       <Image
                                         source={require("../../../../assets/icons/naira.png")}
                                       />
                                       <View
                                         style={{
                                           justifyContent: "space-between"
                                         }}
                                       >
                                         <Text
                                           style={{
                                             fontSize: 20,
                                             fontFamily: "nunito-bold",
                                             color: "#fff"
                                           }}
                                         >
                                           Apply for Loans
                                         </Text>
                                         <Text
                                           style={{
                                             fontFamily: "nunito-regular",
                                             color: "#fff"
                                           }}
                                         >
                                           Long and Short Term Loans
                                         </Text>
                                       </View>
                                       <View style={{ alignSelf: "center" }}>
                                         <AntDesign
                                           name="caretright"
                                           size={15.5}
                                           color="#fff"
                                         />
                                       </View>
                                     </View>
                                   </TouchableOpacity>
                                   <TouchableOpacity
                                     activeOpacity={0.7}
                                     onPress={this.toggleCalculator}
                                   >
                                     <View
                                       style={{
                                         flexDirection: "row",
                                         justifyContent: "space-between",
                                         backgroundColor: "#138516",
                                         paddingHorizontal: scale(17),
                                         paddingVertical: scaleHeight(20),
                                         margin: scaleHeight(10),
                                         borderRadius: 7
                                       }}
                                     >
                                       <View
                                         style={{
                                           justifyContent: "space-between",
                                           marginLeft: scale(71)
                                         }}
                                       >
                                         <Text
                                           style={{
                                             fontSize: 20,
                                             fontFamily: "nunito-bold",
                                             color: "#fff"
                                           }}
                                         >
                                           Calculate Your Loan
                                         </Text>
                                         <Text
                                           style={{
                                             fontFamily: "nunito-regular",
                                             color: "#fff",
                                             marginTop: scaleHeight(9)
                                           }}
                                         >
                                           Lorem Ipsum
                                         </Text>
                                       </View>
                                       <View style={{ alignSelf: "center" }}>
                                         <AntDesign
                                           name="caretright"
                                           size={15.5}
                                           color="#fff"
                                         />
                                       </View>
                                     </View>
                                   </TouchableOpacity>
                                 </View>
                               )}
                               {this.state.showGuarantorRequests && (
                                 <View>
                                   <View
                                     style={{
                                       flexDirection: "row",
                                       justifyContent: "space-between",
                                       marginHorizontal: scale(9),
                                       paddingVertical: scaleHeight(26.5),
                                       borderBottomWidth: 1,
                                       borderBottomColor: "#bdbdbd"
                                     }}
                                   >
                                     <Image
                                       source={require("../../../../assets/icons/man.png")}
                                     />
                                     <View
                                       style={{
                                         justifyContent: "space-between"
                                       }}
                                     >
                                       <Text
                                         style={{ fontFamily: "nunito-medium" }}
                                       >
                                         Mr Olabisi Suleman{" "}
                                       </Text>
                                       <Text
                                         style={{
                                           marginVertical: scaleHeight(15),
                                           fontFamily: "nunito-regular",
                                           color: "#138516"
                                         }}
                                       >
                                         Guarantor Request{" "}
                                       </Text>
                                       <Text
                                         style={{
                                           fontFamily: "nunito-regular"
                                         }}
                                       >
                                         Loan Amount: $200,000,000{" "}
                                       </Text>
                                     </View>
                                     <View
                                       style={{
                                         flexDirection: "row",
                                         justifyContent: "space-between"
                                       }}
                                     >
                                       <Image
                                         style={{ marginRight: scale(10) }}
                                         source={require("../../../../assets/icons/green_check_circle.png")}
                                       />
                                       <Image
                                         source={require("../../../../assets/icons/green_cancel.png")}
                                       />
                                     </View>
                                   </View>
                                 </View>
                               )}
                             </KeyboardAwareScrollView>
                             <ApplyLoanModal
                               visible={this.state.showCalculator}
                               _toggleView={this.toggleCalculator}
                             />
                             {/* <ApplicationSuccessful 
                subtitle="Request Submission Failed"
                smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints`}
                visible={this.state.success} _toggleView={this.showSuccessModal} /> */}
                             {/* <ApplicationStatus visible={this.state.success} _toggleView={this.showSuccessModal} /> */}
                             {/* <EditApplication visible={this.state.success} _toggleView={this.showSuccessModal} 
                    subtitle="Recovery Password Sent"
                    message={`A text message would be sent to your Phone number ${'+23470******11'} and Email ${'josh******43@gmail.com'}`}/> */}
                             <CalculateLoan
                               visible={this.state.showCalculator}
                               _toggleView={this.toggleCalculator}
                             />
                           </View>
                         </ScrollView>
                         <Header navigation={{ ...this.props.navigation }} />
                         <ApplyLoanModal
                           visible={this.state.loanApply}
                           _toggleView={this.showLoanApply}
                         />
                       </SafeAreaView>
                     </>
                   );
                 }
               }
