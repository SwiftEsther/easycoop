import React, { Component } from 'react';
import { TextInput, StatusBar, StyleSheet, TouchableOpacity, Image, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage } from 'react-native';
import { systemWeights } from 'react-native-typography';
import theme from '../../../../../assets/styles/globalStyles';
import * as colors from '../../../../../assets/styles/colors';
import * as constants from '../../../../../lib/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import API from '../../../../../lib/api';
import {RESET_PASSWORD} from '../../../../../lib/constants';
import AuthenticationHeader from '../../../../components/AuthenticationHeader';
import '../../../../../lib/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../../../components/CustomTextInput/CustomInput';
import Space from '../../../../components/Space';
import GreenButton from '../../../../components/GreenButton';
import ButtonLink from '../../../../components/ButtonLink';

export default class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spinner: false,
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    }

    changeState = (value) => {
        this.setState(value);
    }

    changePassword = () => {
        if (this.state.newPassword.length == 0 || this.state.oldPassword.length == 0 || this.state.confirmPassword.length == 0) {
            return (
                Alert.alert(
                    'Warning',
                    'Fill every input',
                    [
                        {text: 'close', style: 'cancel'},
                    ],
                    { cancelable: false }
                )
            );
        } else {
            try {
                fetch(`${BASE_URL}${RESET_PASSWORD}`, {
                    method: 'POST',
                    body: {
                        confirmPassword: this.state.confirmPassword,
                        oldPassword: this.state.oldPassword,
                        password: this.state.newPassword,
                    }
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    // get the response data from {responseJson} e.g responseJson.lastName]
                    console.log(responseJson)
                    if (responseJson.errorcode != 200) {
                        // failed
                        return (
                            Alert.alert(
                                'Warning',
                                'An error occured',
                                [
                                    {text: 'close', style: 'cancel'},
                                ],
                                { cancelable: false }
                            )
                        );
                    } else {
                        // sucessful login
                        console.log(responseJson)
                    }
                })
            } catch(err) {
                
            }
        }
    }


    render() {
        return (
            <SafeAreaView style={[theme.container]}>
                <Spinner visible={this.state.spinner} size="large" color="#000000" animation="none" overlayColor={'rgba(255, 255, 255, 0.1)'} />
                <StatusBar translucent={true} backgroundColor={colors.white} barStyle="dark-content" />
                <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
                    <View style={[theme.screen_pad]}>
                        <View>
                            <Text>Reset Password Option</Text>
                        </View>
                        <View style={[theme.margin_left_right_25]}>
                            <View style={[theme.fill]}>
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Old Password</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.oldPassword}
                                        onChangeText={oldPassword => this.changeState({oldPassword: oldPassword.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                    /> 
                                </View> 
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>New Password</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.newPassword} onChangeText={newPassword=> this.changeState({newPassword:newPassword.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                    /> 
                                </View> 
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Confirm Password</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.confirmPassword} onChangeText={confirmPassword=> this.changeState({confirmPassword:confirmPassword.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                    /> 
                                </View> 
                                <GreenButton button_text="Reset Password" handlePress={this.changePassword}/>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
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
    }
});
