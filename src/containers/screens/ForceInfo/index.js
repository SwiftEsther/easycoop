import React, { Component } from 'react';
import { TextInput, StatusBar, StyleSheet, TouchableOpacity, Image, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage } from 'react-native';
import { systemWeights } from 'react-native-typography';
import theme from '../../../../assets/styles/globalStyles';
// import * as colors from '../../../../assets/styles/colors';
import * as constants from '../../../../lib/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import API from '../../../../lib/api';
import AuthenticationHeader from '../../../components/AuthenticationHeader';
import '../../../../lib/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import Space from '../../../components/Space';
import BlackButton from '../../../components/BlackButton';
import ButtonLink from '../../../components/ButtonLink';
import base64 from 'base-64';
import GreenLineSeparator from '../../../components/GreenLineSeparator';
import Tabs from '../../../components/Tabs';

export default class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            action: '',
            spinner: false,
            firstName: '',
            surname: '',
            email: '',
            phone: ''
        }
    }

    changeState = (value) => {
        this.setState(value);
    }

    render() {
        return (
            <SafeAreaView style={[theme.container]}>
                <Spinner visible={this.state.spinner} size="large" color="#000000" animation="none" overlayColor={'rgba(255, 255, 255, 0.1)'} />
                <StatusBar translucent={true} backgroundColor={colors.white} barStyle="dark-content" />
                <View style={[style.headerContainer]}>
                    <TouchableOpacity activeOpacity={0.4} onPress={() => this.props.navigation.goBack(null)}>
                        <Image source={require('../../../../assets/icons/back_24px.png')} />
                    </TouchableOpacity>
                    <View style={[theme.margin_left_right_25, {marginTop: 10}]}>
                        <View style={[style.sign_up_header, theme.box_gap_more, {marginRight: 30}]}>
                            <View>
                                <Text style={[style.sign_up_header_text, theme.typo_bold]}>Sign Up</Text>
                                <GreenLineSeparator/>
                            </View>
                            
                            <Image source={require('../../../../assets/icons/Group.png')}/>
                        </View>
                    </View>
                </View>
                        
                {/* <View style={[style.buttons, {justifyContent: 'center', marginTop: 40}]}>
                    <Text style={[style.link,style.primary, {backgroundColor: '#138516'}]} onPress={() => console.log('Personal Info')}>Personal Info</Text>
                    <Text style={[style.link,style.secondary, {backgroundColor: '#e8e7e7'}]} onPress={() => console.log('Force Info')}>Force Info</Text>
                </View> */}
                {/* <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid={true}>
                    <View style={theme.padding_left_right_25}>
                        <View style={[theme.margin_left_right_25]}>
                            <View style={[theme.fill]}>
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>First Name</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.firstName} onChangeText={firstName=> this.changeState({firstName:firstName.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                    /> 
                                </View> 
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Surname</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.surname} onChangeText={surname=> this.changeState({surname:surname.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                    /> 
                                </View> 
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Email Address</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.email} onChangeText={email=> this.changeState({email:email.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                    /> 
                                </View> 
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Phone Number</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.phone} onChangeText={phone=> this.changeState({phone:phone.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                    /> 
                                </View> 
                                <View>
                                    <BlackButton button_text="Next" handlePress= {() => console.log('Next clicked')}/>
                                </View>
                                
                            </View>
                        </View>
                        
                    </View>
                </KeyboardAwareScrollView> */}
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    link: {
        fontSize: 15,
        ...systemWeights.bold,
        paddingBottom: 16,
        paddingTop: 16,
        marginBottom: 28
    },
    primary: {
        paddingRight: 38,
        paddingLeft: 38,
    },
    secondary: {
        paddingRight: 44,
        paddingLeft: 44
    },
    headerContainer: {
        marginRight: 50,
        marginLeft: 25,
        marginTop: 25
    },
    sign_up_header: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center', 
        marginBottom: 40,
    },
    sign_up_header_text: {
        fontSize:30,
        paddingBottom:10,
        width: 250
    },
});
