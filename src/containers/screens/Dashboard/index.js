import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, Dimensions } from 'react-native';
import {Icon} from 'react-native-elements';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../../assets/styles/colors';
import { scale, scaleHeight } from '../../../helpers/scale';
import { SafeAreaView } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Withdraw from '../../screens/Withdraw/index';
import Header from '../../../components/Header';
import SuccessModal from '../../../components/SuccessModal';
import BottomSheet from 'reanimated-bottom-sheet';
import Contributions from '../../screens/Contribution/ContributionsBalance';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false
        }
    }

    // renderContent = () => (
    //     <SuccessModal visible={this.state.success} _toggleView={this.showSuccessModal} 
    //     subtitle="Recovery Password Sent"
    //     message={`A text message would be sent to your Phone number ${'+23470******11'} and Email ${'josh******43@gmail.com'}`}/>
    // )

    showSuccessModal=()=>this.setState({success: !this.state.success})

    render() {
        const deviceHeight = Dimensions.get('window').height;
        const deviceWidth = Dimensions.get('window').width;
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={[theme.container]}>
                    <View style={[theme.container, { backgroundColor: '#f4f6fa', }]}>
                        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} style={theme.footerPad}>
                            <View style={[theme.box_gap_tabbar, { paddingHorizontal: scaleHeight(12) }]}>
                                <Text style={[theme.typo_bold, { fontSize: 18, marginTop: scaleHeight(10), marginBottom: scaleHeight(20) }]}>Hi, Joshua</Text>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <TouchableOpacity activeOpacity={0.7} style={[theme.flex1]} onPress={() => this.setState({success: !this.state.success})}>
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
                                        <TouchableOpacity activeOpacity={0.7} style={[theme.flex1]} onPress={() => console.log('My Loans')}>
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
                    <SuccessModal visible={this.state.success} _toggleView={this.showSuccessModal} 
                        subtitle="Recovery Password Sent"
                        message={`A text message would be sent to your Phone number ${'+23470******11'} and Email ${'josh******43@gmail.com'}`}/>
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
