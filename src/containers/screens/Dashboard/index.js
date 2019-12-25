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
import NavigationService from "../../../../NavigationService";
import { showToast } from "../../../components/Toast/actions/toastActions";
import { connect, Dispatch } from "react-redux";


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
    }


    _signOutAsync = async () => {
        this.props.logoutUserSuccess();
        AsyncStorage.removeItem('access_token');
        NavigationService.navigate('Login');
    };

    showContributionsBal = () => this.setState({contributions: !this.state.contributions})
    showRequestSuccess = () => this.setState({requestSuccess: !this.state.requestSuccess})
    showFailureModal = () => this.setState({failure: !this.state.failure})
    showWithdrawalRequest = () => {
        this.setState({withdraw: !this.state.withdraw})
    }

    render() {
        const {userData} = this.props;
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content"/>
                <SafeAreaView style={[theme.container, {fontFamily: 'nunito-bold'}]}>
                    <View style={[theme.container, {backgroundColor: '#f4f6fa',}]}>
                        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} style={theme.footerPad}>
                            <View style={[theme.box_gap_tabbar, {paddingHorizontal: scaleHeight(12)}]}>
                                <Text style={[theme.typo_bold, {
                                    fontSize: 20,
                                    marginTop: scaleHeight(10),
                                    marginBottom: scaleHeight(20)
                                }]}>Hi, {userData.firstName[0].toUpperCase() + userData.firstName.slice(1)}</Text>
                                <View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                                        <TouchableOpacity activeOpacity={0.7} style={[theme.flex1]}
                                                          onPress={() => this.setState({contributions: !this.state.contributions})}>
                                            <View style={[styles.card]}>
                                                <Image style={[]}
                                                       source={require('../../../../assets/icons/wallet.png')}/>

                                                <Text numberOfLines={1} style={[{color: '#575757',fontFamily: 'nunito-bold'}]}>Balances</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity activeOpacity={0.7} style={[theme.flex1]}
                                                          onPress={this.showWithdrawalRequest}>
                                            <View style={[styles.card]}
                                                  onPress={() => this.setState({withdraw: !this.state.withdraw})}>
                                                <Image style={[]}
                                                       source={require('../../../../assets/icons/coins.png')}/>

                                                <Text numberOfLines={1} style={{color: '#575757',fontFamily: 'nunito-bold'}}>Withdrawal Request</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                                        <TouchableOpacity activeOpacity={0.7} style={[theme.flex1]}
                                                          onPress={() => this.props.navigation.navigate("LoanPage")}>
                                            <View style={[styles.card]}>
                                                <Image style={[]}
                                                       source={require('../../../../assets/icons/naira.png')}/>

                                                <Text numberOfLines={1} style={{color: '#575757',fontFamily: 'nunito-bold'}}>My Loans</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity activeOpacity={0.7} style={[theme.flex1]} onPress={() => this.props.navigation.navigate("RequestHistory")}>
                                            <View style={[styles.card]}>
                                                <Image source={require('../../../../assets/icons/currency.png')} />

                                                <Text numberOfLines={1} style={{color: '#575757',fontFamily: 'nunito-bold'}}>Request History</Text>
                                                <Text numberOfLines={1} style={{color: '#575757',fontFamily: 'nunito-regular', fontSize: 10}}>Loan, Withdrawal, Savings Status</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                        <WithdrawalRequest visible={this.state.withdraw} _toggleView={this.showWithdrawalRequest}/>
                        <Contributions visible={this.state.contributions} _toggleView={this.showContributionsBal}/>
                        {/* <SuccessModal visible={this.state.requestSuccess} _toggleView={this.showRequestSuccess}
                                subtitle="Request Submitted Successfully"
                                smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/> */}
                        {/* <FailureModal visible={this.state.failure} _toggleView={this.showFailureModal}
                                subtitle="Request Submission Failed"
                                smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/> */}
                        {/* <DeleteSuccess visible={this.state.failure} _toggleView={this.showFailureModal}
                                smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/> */}
                    </View>
                    <Header navigation={{...this.props.navigation}}/>
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
        loginError: state.login.error,
        userData: state.login,
        isLoading: state.login.loading,
        isLoggedIn: state.login.isLoggedIn
    };
};

const mapDispatchToProps = {
    showToast,
    loginSuccess,
    logoutUserSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(index);
