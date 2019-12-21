import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, Dimensions } from 'react-native';
import {Icon} from 'react-native-elements';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../../assets/styles/colors';
import { scale, scaleHeight } from '../../../helpers/scale';
import { SafeAreaView } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {FIRSTNAME} from '../../../../lib/constants';
import Withdraw from '../../screens/Withdraw/index';
import Header from '../../../components/Header';
import SuccessModal from '../../../components/SuccessModal';
import FailureModal from '../../../components/FailureModal';
import BottomSheet from 'reanimated-bottom-sheet';
import Contributions from '../../screens/Contribution/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DeleteModal from '../../../components/DeleteModal';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showContributionsBalance: false,
            requestSuccess: false,
            failure: false,
            userData: this.props.navigation.state.params.userData
        }
    }

    // renderContent = () => (
    //     <SuccessModal visible={this.state.success} _toggleView={this.showSuccessModal} 
    //     subtitle="Recovery Password Sent"
    //     message={`A text message would be sent to your Phone number ${'+23470******11'} and Email ${'josh******43@gmail.com'}`}/>
    // )

    showContributionsBal=()=>this.setState({showContributionsBalance: !this.state.showContributionsBalance})
    showRequestSuccess=()=>this.setState({requestSuccess: !this.state.requestSuccess})
    showFailureModal=()=>this.setState({failure: !this.state.failure})

    render() {
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={[theme.container]}>
                    <View style={[theme.container, { backgroundColor: '#f4f6fa', }]}>
                        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} style={theme.footerPad}>
                            <View style={[theme.box_gap_tabbar, { paddingHorizontal: scaleHeight(12) }]}>
                                <Text style={[theme.typo_bold, { fontSize: 18, marginTop: scaleHeight(10), marginBottom: scaleHeight(20) }]}>{this.state.userData.firstName}</Text>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <TouchableOpacity activeOpacity={0.7} style={[theme.flex1]} onPress={() => this.setState({failure: !this.state.failure})}>
                                            <View style={[styles.card]}>
                                                <Image style={[]} source={require('../../../../assets/icons/wallet.png')} />

                                                <Text numberOfLines={1} style={[theme.caption, theme.font15, theme.typo_bold]}>Balances</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity activeOpacity={0.7} style={[theme.flex1]} onPress={() => console.log('Withdrawal Request')}>
                                            <View style={[styles.card]} onPress={() => this.setState({ withdraw: !this.state.withdraw })}>
                                                <Image style={[]} source={require('../../../../assets/icons/coins.png')} />

                                                <Text numberOfLines={1} style={[theme.caption, theme.font15, theme.typo_bold]}>Withdrawal Request</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <TouchableOpacity activeOpacity={0.7} style={[theme.flex1]} onPress={() => this.props.navigation.navigate("LoanPage")}>
                                            <View style={[styles.card]}>
                                                <Image style={[]} source={require('../../../../assets/icons/wallet.png')} />

                                                <Text numberOfLines={1} style={[theme.caption, theme.font15, theme.typo_bold]}>My Loans</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity activeOpacity={0.7} style={[theme.flex1]} onPress={() => console.log('Request History')}>
                                            <View style={[styles.card]}>
                                                <Image style={[]} source={require('../../../../assets/icons/currency.png')} />

                                                <Text numberOfLines={1} style={[theme.caption, theme.font15, theme.typo_bold]}>Request History</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                        {/* <Contributions visible={this.state.showContributionsBalance} _toggleView={this.showSuccessModal} 
                            subtitle="Recovery Password Sent"
                            message={`A text message would be sent to your Phone number ${'+23470******11'} and Email ${'josh******43@gmail.com'}`}/> */}
                            {/* <SuccessModal visible={this.state.requestSuccess} _toggleView={this.showRequestSuccess} 
                                subtitle="Request Submitted Successfully"
                                smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/> */}
                            {/* <FailureModal visible={this.state.failure} _toggleView={this.showFailureModal} 
                                subtitle="Request Submission Failed"
                                smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/> */}
                            <DeleteModal visible={this.state.failure} _toggleView={this.showFailureModal} 
                                smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/>
                    </View>
                    <Header />
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
    card_image: {
        width: scale(61),
        height: scaleHeight(61)
    },
    card_text: {
        color: '#575757'
    }
});
