import React, { Component } from 'react';
import { TextInput, StatusBar, StyleSheet, TouchableOpacity, Image, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage } from 'react-native';
import { systemWeights } from 'react-native-typography';
import theme from '../../../../../assets/styles/globalStyles';
import * as colors from '../../../../lib/constants/colors';
import * as constants from '../../../../../lib/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import API from '../../../../../lib/api';
import {RESET_PASSWORD} from '../../../../../lib/constants';
import AuthenticationHeader from '../../../../components/AuthenticationHeader';
import '../../../../../lib/helpers';
import Header from '../../../../components/Header';
import {showToast} from "../../../../components/Toast/actions/toastActions";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../../../components/CustomTextInput/CustomInput';
import Space from '../../../../components/Space';
import GreenButton from '../../../../components/GreenButton';
import {scale, scaleHeight} from '../../../../helpers/scale';
import {AntDesign} from '@expo/vector-icons';

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
                <View style={{marginTop: scaleHeight(70)}}>
                    <View style={[style.pageheader]}>
                        <Text>Settings</Text>
                        <AntDesign
                            name="caretup"
                            size={scale(15)}
                            color="#138516"
                            style={style.icon}
                        />                        
                    </View>
                    <View >
                        <View style={{marginTop: scaleHeight(38), marginBottom: scaleHeight(20)}}>
                            <Text style={{color: '#138516', fontFamily: 'nunito-bold', paddingHorizontal: scale(18)}}>Password Reset Option</Text>
                        </View>
                        <View style={{paddingHorizontal: scale(18)}}>
                            <View style={[theme.fill]}>
                                <Text style={[style.label]}>Old Password</Text>
                                <View style={[style.input]}>
                                    <CustomInput value={this.state.oldPassword}
                                        onChangeText={oldPassword => this.changeState({oldPassword: oldPassword.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                    /> 
                                </View> 
                                <Text style={[style.label]}>New Password</Text>
                                <View style={[style.input]}>
                                    <CustomInput value={this.state.newPassword} onChangeText={newPassword=> this.changeState({newPassword:newPassword.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                    /> 
                                </View> 
                                <Text style={[style.label]}>Confirm Password</Text>
                                <View style={[style.input]}>
                                    <CustomInput value={this.state.confirmPassword} onChangeText={confirmPassword=> this.changeState({confirmPassword:confirmPassword.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                    /> 
                                </View> 
                                <View style={{marginLeft: scale(15), alignContent: 'flex-end'}}>
                                    <GreenButton button_text="Reset Password" handlePress={this.changePassword}/>
                                </View>
                            </View>
                        </View>
                    </View>
                    </View>
                </KeyboardAwareScrollView>
                <Header navigation={{...this.props.navigation}}/>
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
    pageheader: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: scale(18),
        paddingVertical: scaleHeight(18),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        alignSelf: 'flex-end',
        marginRight: scale(30)
    },
    input: {
        marginBottom: scaleHeight(12),
        marginRight: scale(40)
    },
    label: {
        fontFamily: 'nunito-bold',
        marginVertical: scaleHeight(16)
    }
});
