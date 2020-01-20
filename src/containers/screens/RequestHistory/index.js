import React, { Component } from "react";
import {
  Text,
  Image,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
// import WithdrawalRequest from '../Withdrawal/WithdrawalRequest';
import theme from "../../../../assets/styles/globalStyles";
import { Colors } from "../../../lib/constants/colors";
import { scale, scaleHeight } from "../../../helpers/scale";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import Header from "../../../components/Header";
import Spinner from "react-native-loading-spinner-overlay";
import ViewWithdrawal from "../Withdrawal/ViewWithdrawal";
import { showToast } from "../../../components/Toast/actions/toastActions";
import { getSavingsHistory, getWithdrawalHistory, getLoanHistory } from "../../../lib/api/url";
import { ScrollView } from "react-native-gesture-handler";
import { connect, Dispatch } from "react-redux"; 
import BorderedTabs from "../../../components/BorderedTab";
import { apiRequest } from "../../../lib/api/api";
import { formatBalance } from "../../../lib/utils/helpers";
import {getLoanApplicationsSuccess, getWithdrawalHistorySuccess, getTransactionHistorySuccess} from './actions/RequestHistory.actions'

class index extends Component {
                 constructor(props) {
                   super(props);
                   this.state = {
                     withdraw: false,
                     selected: "1",
                     showLoans: true,
                     showWithdrawals: false,
                     showSavings: false,
                     spinner: false,
                     loanHistory: [],
                     withdrawalHistory: [],
                     transactions: []
                   };
                 }

                 showWithdrawalRequest = () => {
                   this.setState({ withdraw: !this.state.withdraw });
                 };

                 loans = () =>
                   this.setState(
                     this.setState({
                       showLoans: true,
                       selected: "1",
                       showSavings: false,
                       showWithdrawals: false
                     })
                   );

                 withdrawals = () =>
                   this.setState(
                     this.setState({
                       showLoans: false,
                       selected: "2",
                       showWithdrawals: true,
                       showSavings: false
                     })
                   );

                 savings = () =>
                   this.setState(
                     this.setState({
                       showLoans: false,
                       selected: "3",
                       showSavings: true,
                       showWithdrawals: false
                     })
                   );

                 componentDidMount() {
                   // const showWithdrawalRequests = this.props.navigation.state
                   //   .params.showWithdrawalRequests;

                     const showWithdrawalRequests =  this.props.navigation.getParam('showWithdrawalRequests', '')

                  //  this.onGetSavingsHistory();
                  if (showWithdrawalRequests) {
                    this.withdrawals();
                  }
                  this.onGetLoanHistory();
                   this.onGetWithdrawalHistory();
                  
                 }

                 onGetSavingsHistory = () => {
                   const { userData } = this.props;
                   this.setState(
                     {
                       spinner: true,
                       modalLoader: true
                     },
                     () => {
                       apiRequest(getSavingsHistory, "get", {
                         params: {
                           memberid: userData.id,
                           isvoluntary: false
                         }
                       })
                         .then(res => {
                           this.setState({
                             spinner: false
                           });
                           if (res) {
                             console.log(res);
                             console.log(res.data); // undefined
                             this.setState({
                               savingsHistory: []
                             });
                             this.props.getTransactionHistorySuccess(...res);
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

                 onGetWithdrawalHistory = () => {
                   this.setState(
                     {
                       spinner: true,
                       modalLoader: true
                     },
                     () => {
                       apiRequest(getWithdrawalHistory, "get")
                         .then(res => {
                           this.setState({
                             spinner: false
                           });
                           if (res) {
                             console.log(res);
                             console.log(res.data); // undefined
                             this.setState({
                               withdrawalHistory: res
                             });

                             this.props.getWithdrawalHistorySuccess(...res);
                           } else {
                             this.props.showToast("Error", "error");
                           }
                         })
                         .catch(error => {
                           console.log("hjfiuhifh", error);
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

                 onGetLoanHistory = () => {
                   this.setState(
                     {
                       spinner: true,
                       modalLoader: true
                     },
                     () => {
                       apiRequest(getLoanHistory, "get")
                         .then(res => {
                           this.setState({
                             spinner: false
                           });
                           if (res) {
                             console.log(res);
                             console.log(res.data); // undefined
                             this.setState({
                               loanHistory: res
                             });
                             this.props.getLoanApplicationsSuccess(...res);
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

                   function SavingsItem({}) {
                     return (
                       <View
                         style={{
                           alignItems: "flex-start",
                           paddingHorizontal: scale(14),
                           paddingVertical: scaleHeight(23),
                         }}
                       >
                         <View
                           style={{
                             flex: 1,
                             flexDirection: "row",
                             marginVertical: scaleHeight(4)
                           }}
                         >
                           <View style={{ flex: 2, flexDirection: "row" }}>
                             <Text
                               style={{
                                 flex: 1,
                                 fontFamily: "nunito-regular"
                               }}
                             >
                               {`Savings: `}{" "}
                             </Text>
                             <Text
                               style={{
                                 flex: 3,
                                 textAlign: "left",
                                 fontFamily: "nunito-bold",
                                 marginLeft: 2
                               }}
                             >{` #AGD212HSU`}</Text>
                           </View>
                           <Text
                             style={{
                               flex: 1,
                               textAlign: "right",
                               color: "#138516",
                               fontFamily: "nunito-regular"
                             }}
                           >
                             24-11-19
                           </Text>
                         </View>
                         <View
                           style={{
                             flex: 1,
                             flexDirection: "row",
                             marginVertical: scaleHeight(4)
                           }}
                         >
                           <Text
                             style={{
                               flex: 1,
                               color: "#9f9f9f",
                               fontFamily: "nunito-bold"
                             }}
                           >
                             Credited
                           </Text>
                           <Text
                             style={{
                               flex: 1,
                               textAlign: "right",
                               color: "#575757",
                               fontFamily: "nunito-bold"
                             }}
                           >
                             ₦100,000,000
                           </Text>
                         </View>
                       </View>
                     );
                   }
                   function LoanItem({item,backgroundColor}) {
                     return (
                       <View
                         style={{
                           alignItems: "flex-start",
                           paddingHorizontal: scale(14),
                           paddingVertical: scaleHeight(23),
                           backgroundColor: backgroundColor
                         }}
                       >
                         <View
                           style={{
                             flex: 1,
                             flexDirection: "row",
                             marginVertical: scaleHeight(4)
                           }}
                         >
                           <View style={{ flex: 2, flexDirection: "row" }}>
                             <Text
                               style={{
                                 flex: 1,
                                 fontFamily: "nunito-regular"
                               }}
                             >
                               Loan ID:{" "}
                             </Text>
                             <Text
                               style={{
                                 flex: 3,
                                 fontFamily: "nunito-bold",
                                 marginLeft: scale(3)
                               }}
                             >
                               {`${item.id}`}
                             </Text>
                           </View>
                           <Text
                             style={{
                               flex: 1,
                               textAlign: "right",
                               color: "#138516",
                               fontFamily: "nunito-regular"
                             }}
                           >
                             {`${item.sentDate.split('-').reverse().join('-')}`}
                           </Text>
                         </View>
                         <View
                           style={{
                             flex: 1,
                             flexDirection: "row",
                             marginVertical: scaleHeight(4)
                           }}
                         >
                           <Text
                             style={{
                               flex: 1,
                               color: "#f80000",
                               fontFamily: "nunito-bold"
                             }}
                           >
                             Not Approved
                           </Text>
                           <Text
                             style={{
                               flex: 1,
                               textAlign: "right",
                               color: "#575757",
                               fontFamily: "nunito-bold"
                             }}
                           >
                             {`₦${formatBalance(item.amount)}`}
                           </Text>
                         </View>
                         {false && (
                           <TouchableOpacity
                             activeOpacity={0.7}
                             style={{
                               marginBottom: scaleHeight(26),
                               marginTop: scaleHeight(40)
                             }}
                           >
                             <Text
                               style={[
                                 styles.defaultButton,
                                 theme.typo_bold,
                                 {
                                   backgroundColor: "#fff",
                                   paddingHorizontal: scale(30),
                                   borderWidth: StyleSheet.hairlineWidth,
                                   borderColor: "#138516"
                                 }
                               ]}
                             >
                               View Application
                             </Text>
                           </TouchableOpacity>
                         )}
                       </View>
                     );
                   }
                   function WithdrawalItem({item, backgroundColor}) {
                     return (
                       <View
                         style={{
                           alignItems: "flex-start",
                           paddingHorizontal: scale(14),
                           paddingVertical: scaleHeight(23),
                           backgroundColor: backgroundColor
                         }}
                       >
                         <View
                           style={{
                             flex: 1,
                             flexDirection: "row",
                             marginVertical: scaleHeight(4)
                           }}
                         >
                           <View style={{ flex: 2, flexDirection: "row" }}>
                             <Text
                               style={{
                                 flex: 5,
                                 fontFamily: "nunito-regular"
                               }}
                             >
                               Withdrawal ID:{" "}
                             </Text>
                             <Text
                               style={{
                                 flex: 6,
                                 textAlign: "left",
                                 fontFamily: "nunito-bold",
                               }}
                             >
                               {`${item.id}`}
                             </Text>
                           </View>
                           <Text
                             style={{
                               flex: 1,
                               textAlign: "right",
                               color: "#138516",
                               fontFamily: "nunito-regular"
                             }}
                           >
                             {`${item.sentDate
                               .split("-")
                               .reverse()
                               .join("-")}`}
                           </Text>
                         </View>
                         <View
                           style={{
                             flex: 1,
                             flexDirection: "row",
                             marginVertical: scaleHeight(4)
                           }}
                         >
                           <Text
                             style={{
                               flex: 1,
                               color: "#f80000",
                               fontFamily: "nunito-bold"
                             }}
                           >
                             Not Approved
                           </Text>
                           <Text
                             style={{
                               flex: 1,
                               textAlign: "right",
                               color: "#575757",
                               fontFamily: "nunito-bold"
                             }}
                           >
                             {`₦${formatBalance(item.amount)}`}
                           </Text>
                         </View>
                         {false && (
                           <TouchableOpacity
                             activeOpacity={0.7}
                             style={{
                               marginBottom: scaleHeight(26),
                               marginTop: scaleHeight(40)
                             }}
                           >
                             <Text
                               style={[
                                 styles.defaultButton,
                                 theme.typo_bold,
                                 {
                                   backgroundColor: "#fff",
                                   paddingHorizontal: scale(30),
                                   borderWidth: StyleSheet.hairlineWidth,
                                   borderColor: "#138516"
                                 }
                               ]}
                             >
                               View Request
                             </Text>
                           </TouchableOpacity>
                         )}
                       </View>
                     );
                   }
                   return (
                     <>
                       <StatusBar
                         backgroundColor={Colors.white}
                         barStyle="dark-content"
                       />
                       <Spinner
                         visible={this.state.spinner}
                         size="large"
                         color="#000000"
                         animation="none"
                         overlayColor={"rgba(0, 0, 0, 0.5)"}
                       />
                       <SafeAreaView
                         style={[{ flex: 1, fontFamily: "nunito-bold" }]}
                       >
                         <ScrollView
                           keyboardShouldPersistTaps={"handled"}
                           enableOnAndroid={true}
                         >
                           <View
                             style={[{ flex: 1, marginTop: scaleHeight(70) }]}
                           >
                             <BorderedTabs
                               tabNumber={3}
                               tab1Text="Loan"
                               tab2Text="Withdrawals"
                               tab3Text="Savings"
                               selected={this.state.selected}
                               tab1Event={this.loans}
                               tab2Event={this.withdrawals}
                               tab3Event={this.savings}
                             />
                             {this.state.showLoans && (
                               <FlatList
                                 data={this.state.loanHistory}
                                 renderItem={({ item, index }) => (
                                   <LoanItem
                                     item={item}
                                     backgroundColor={
                                       index % 2 !== 0 ? "#f8f7f7" : "#fff"
                                     }
                                   />
                                 )}
                                 keyExtractor={item => item.id}
                               />
                             )}
                             {this.state.showWithdrawals && (
                               <FlatList
                                 data={this.state.withdrawalHistory}
                                 renderItem={({ item, index }) => (
                                   <WithdrawalItem
                                     item={item}
                                     backgroundColor={
                                       index % 2 !== 0 ? "#f8f7f7" : "#fff"
                                     }
                                   />
                                 )}
                                 keyExtractor={item => item.id}
                               />
                             )}
                             {this.state.showSavings && (
                               <FlatList
                                 data={this.state.transactions}
                                 renderItem={({ item, index }) =>
                                   index % 2 !== 0 ? (
                                     <LoanItem />
                                   ) : (
                                     <SavingsItem />
                                   )
                                 }
                                 keyExtractor={item => item.id}
                               />
                             )}
                           </View>
                         </ScrollView>
                         {/* <View style={[{alignItems: 'flex-start', justifyContent: 'flex-start', flex: 1, marginTop: 100}]}>
                    <View style={{backgroundColor: 'red', }}>
                        <View style={{flex: 1, flexDirection: 'row',  backgroundColor: 'red'}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Text>Withdrawal ID: </Text>
                                <Text>#AGD212HSU</Text>
                            </View>
                            <Text style={{flex: 1}}>24-11-19</Text>
                            
                        </View>
                        <View style={{flex: 1, flexDirection: 'row',  backgroundColor: #138516}}>
                            <Text style={{flex: 1}}>Not Approved</Text>
                            <Text style={{flex: 1}}>₦100,000,000</Text>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} style={{width:width/2.5}} onPress={this.showWithdrawalRequest}>
                        <Text style={[styles.defaultButton, theme.typo_bold, {backgroundColor: '#fff', borderWidth: StyleSheet.hairlineWidth, borderColor: '#138516'}]}>View Request</Text>
                    </TouchableOpacity>
            </View> */}
                         <Header navigation={{ ...this.props.navigation }} />
                         {/* <WithdrawalRequest visible={this.state.withdraw} _toggleView={this.showWithdrawalRequest}/> */}

                         {/* <Withdraw visible={this.state.withdraw} _toggleView={()=>this.setState({withdraw: !this.state.withdraw})}/> */}
                       </SafeAreaView>
                     </>
                   );
                 }
               }

const mapStateToProps = state => {
  return {
    userData: state.login,
    isLoading:
      state.histories.loadingTransactions ||
      state.histories.loadingWithdrawals ||
      state.histories.loadingLoans,
    loanApplicationsFetched: state.histories.loanApplicationsFetched,
    transactionHistoryFetched: state.histories.transactionHistoryFetched,
    withdrawalHistoryFetched: state.histories.withdrawalHistoryFetched
  };
};

const mapDispatchToProps = {
  showToast,
  getLoanApplicationsSuccess,
  getTransactionHistorySuccess,
  getWithdrawalHistorySuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);


const styles = StyleSheet.create({
  defaultButton: {
    fontSize: 17,
    padding: scale(18),
    color: "#138516",
    borderRadius: 3,
    textAlign: "center",
    fontFamily: "nunito-bold"
  }
});
