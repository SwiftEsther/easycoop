import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, Dimensions, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../lib/constants/colors';
import { scale, scaleHeight } from '../../../helpers/scale';
import { SafeAreaView } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FIRSTNAME } from '../../../../lib/constants';
import Withdraw from '../../screens/Withdraw/index';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../../../components/Header';
import SuccessModal from '../../../components/SuccessModal';
import FailureModal from '../../../components/FailureModal';
import BottomSheet from 'reanimated-bottom-sheet';
import Contributions from '../../screens/Contribution/index';
import WithdrawalRequest from '../../screens/Withdrawal/WithdrawalRequest';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DeleteModal from '../../../components/DeleteModal';
import DeleteSuccess from '../../../components/DeleteSuccess';
import { loginSuccess, logoutUserSuccess } from "../Login/actions/login.actions";
import { getMemberBalancesSuccess } from "./actions/dashboard.actions";
import NavigationService from "../../../../NavigationService";
import { showToast } from "../../../components/Toast/actions/toastActions";
import { connect, Dispatch } from "react-redux";
import { getmemberbalances } from "../../../lib/api/url";
import { registerForPushNotificationsAsync } from "../../../lib/utils/registerPushNotifications";
import { apiRequest } from "../../../lib/api/api";


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contributions: false,
            requestSuccess: false,
            failure: false,
            withdraw: false
            // userData: this.props.navigation.state.params.userData
        }

        registerForPushNotificationsAsync(this.props.userData.username)

    }


    _signOutAsync = async () => {
        this.props.logoutUserSuccess();
        AsyncStorage.removeItem('access_token');
        NavigationService.navigate('Login');
    };

    componentDidMount() {
        this.ongetBalances();
    }

    ongetBalances = () => {
      const {userData} = this.props;
        this.setState({
            spinner: true,
            modalLoader: true
        }, () => {
            apiRequest(getmemberbalances,
                'get',
                 {
                    params: {
                        memberid: userData.id
                    }
                }
            )
                .then(res => {
                    this.setState({
                        spinner: false,
                    })
                    if (res) {
                        console.log(res)
                        console.log(res.data) // undefined
                        let memberbalances = { ...res };

                        this.props.getMemberBalancesSuccess(memberbalances);
                        this.props.showToast('Successfully fetched member balances', 'success');
                        console.log(this.props.userData);
                        console.log(this.props.memberbalances)
                    } else {
                        this.props.showToast('Error', 'error');
                    }

                })
                .catch(error => {

                    if (error.response) {
                        this.props.showToast(error.response.data.message, 'error')
                        console.log(error.response)
                    } else {
                        this.props.showToast(error, 'error')
                    }
                    this.setState({
                        spinner: false,
                    })
                });
        })
    };

    showContributionsBal = () => this.setState({contributions: !this.state.contributions})
    showRequestSuccess = () => this.setState({requestSuccess: !this.state.requestSuccess})
    showFailureModal = () => this.setState({failure: !this.state.failure})
    showWithdrawalRequest = () => {
        this.setState({withdraw: !this.state.withdraw})
    }

    render() {
        const {userData, memberbalances} = this.props;
        return (
          <>
            <Spinner
              visible={this.state.spinner}
              size="large"
              color="#000000"
              animation="none"
              overlayColor={"rgba(0, 0, 0, 0.5)"}
            />
            <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
            <SafeAreaView
              style={[theme.container, { fontFamily: "nunito-bold" }]}
            >
              <View style={[theme.container, { backgroundColor: "#f4f6fa" }]}>
                <KeyboardAwareScrollView
                  keyboardShouldPersistTaps={"handled"}
                  enableOnAndroid={true}
                  scrollEnabled={true}
                  alwaysBounceVertical={false}
                  bounces={false}
                >
                  <View
                    style={[
                      theme.box_gap_tabbar,
                      { paddingHorizontal: scaleHeight(12) }
                    ]}
                  >
                    <Text
                      style={[
                        theme.typo_bold,
                        {
                          fontSize: 20,
                          marginTop: scaleHeight(10),
                          marginBottom: scaleHeight(20)
                        }
                      ]}
                    >
                      Hi,{" "}
                      {userData.firstName[0].toUpperCase() +
                        userData.firstName.slice(1)}
                    </Text>
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={[theme.flex1]}
                          onPress={() =>
                            this.setState({
                              contributions: !this.state.contributions
                            })
                          }
                        >
                          <View style={[styles.card]}>
                            <Image
                              style={[]}
                              source={require("../../../../assets/icons/wallet.png")}
                            />

                            <Text
                              numberOfLines={1}
                              style={[
                                { color: "#575757", fontFamily: "nunito-bold" }
                              ]}
                            >
                              Balances
                            </Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={[theme.flex1]}
                          onPress={this.showWithdrawalRequest}
                        >
                          <View
                            style={[styles.card]}
                            onPress={() =>
                              this.setState({ withdraw: !this.state.withdraw })
                            }
                          >
                            <Image
                              style={[]}
                              source={require("../../../../assets/icons/coins.png")}
                            />

                            <Text
                              numberOfLines={1}
                              style={{
                                color: "#575757",
                                fontFamily: "nunito-bold"
                              }}
                            >
                              Withdrawal Request
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={[theme.flex1]}
                          onPress={() =>
                            this.props.navigation.navigate("LoanPage")
                          }
                        >
                          <View style={[styles.card]}>
                            <Image
                              style={[]}
                              source={require("../../../../assets/icons/naira.png")}
                            />

                            <Text
                              numberOfLines={1}
                              style={{
                                color: "#575757",
                                fontFamily: "nunito-bold"
                              }}
                            >
                              My Loans
                            </Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={[theme.flex1]}
                          onPress={() =>
                            this.props.navigation.navigate("RequestHistory")
                          }
                        >
                          <View style={[styles.card]}>
                            <Image
                              source={require("../../../../assets/icons/currency.png")}
                            />

                            <Text
                              numberOfLines={1}
                              style={{
                                color: "#575757",
                                fontFamily: "nunito-bold"
                              }}
                            >
                              Request History
                            </Text>
                            <Text
                              numberOfLines={1}
                              style={{
                                color: "#575757",
                                fontFamily: "nunito-regular",
                                fontSize: 10
                              }}
                            >
                              Loan, Withdrawal, Savings Status
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </KeyboardAwareScrollView>
                <WithdrawalRequest
                  visible={this.state.withdraw}
                  _toggleView={this.showWithdrawalRequest}
                  data={memberbalances}
                  userData={userData}
                />
                <Contributions
                  visible={this.state.contributions}
                  _toggleView={this.showContributionsBal}
                  data={memberbalances}
                  userData={userData}
                />
                {/* <SuccessModal visible={this.state.requestSuccess} _toggleView={this.showRequestSuccess}
                                subtitle="Request Submitted Successfully"
                                smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/> */}
                {/* <FailureModal visible={this.state.failure} _toggleView={this.showFailureModal}
                                subtitle="Request Submission Failed"
                                smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/> */}
                {/* <DeleteSuccess visible={this.state.failure} _toggleView={this.showFailureModal}
                                smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/> */}
              </View>
              <Header dashboard={true} navigation={{ ...this.props.navigation }} />
              {/* <Withdraw visible={this.state.withdraw} _toggleView={()=>this.setState({withdraw: !this.state.withdraw})}/> */}
            </SafeAreaView>
          </>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        width: scale(160),
        height: scaleHeight(140),
        borderRadius: 7,
        justifyContent: 'space-between',
        paddingHorizontal: scale(12),
        paddingVertical: scaleHeight(25),
        marginVertical: scaleHeight(7)
    },
    card_text: {
        color: '#575757'
    }
});


const mapStateToProps = (state) => {
    return {
        userData: state.login,
        isLoading: state.dashboard.loading,
        isLoggedIn: state.login.isLoggedIn,
        memberbalances: state.dashboard
    };
};

const mapDispatchToProps = {
    showToast,
    loginSuccess,
    logoutUserSuccess,
    getMemberBalancesSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(index);
