import React, { Component } from 'react';
import { Keyboard, StatusBar, StyleSheet, TouchableOpacity, Image, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage } from 'react-native';
import { systemWeights } from 'react-native-typography';
import { connect, Dispatch } from "react-redux";
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
import base64 from 'base-64';
import GreenButton from '../../../../components/GreenButton';
import {scale, scaleHeight} from '../../../../helpers/scale';
import { postChangePassword } from "../../../../lib/api/url";
import { axiosInstance } from "../../../../lib/api/axiosClient";
import {AntDesign} from '@expo/vector-icons';
import {changePasswordSuccess} from "./actions/changePassword.actions";

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spinner: false,
            oldPassword: '',
            password: '',
            confirmPassword: ''
        }
    }

    changeState = (value) => {
        this.setState(value);
    }

    validate = async () => {
        if (this.state.oldPassword.length == 0 || this.state.password.length == 0 || this.state.confirmPassword.length == 0) {
            this.props.showToast('Kindly fill in all fields', 'error')
        } else if(this.state.password !== this.state.confirmPassword) {
            this.props.showToast('Kindly confirm your password', 'error')
        }
        else {
            this.onhandleReset()
        }
    }

    onhandleReset = () => {
        const {userData} = this.props;
        Keyboard.dismiss();
        let {oldPassword, password, confirmPassword} = this.state;

        console.log(postChangePassword)
        this.setState({
            spinner: true,
            modalLoader: true
        }, () => {
            axiosInstance
                .post(postChangePassword, {
                        headers: {
                            Authorization: `Basic ${base64.encode(userData.username + ":" + userData.password)}`,
                        },
                        params: {},
                        data: {password,oldPassword,confirmPassword}
                    }
                )
                .then(res => {
                    // this.props.clearUserData();
                    // this.props.resetCache();
                    // this.props.clearLoanDetails();
                    // token = res.data.data.token;
                    console.log(res)
                    this.setState({
                        spinner: false,
                    })
                    if (res.status === 200) {
                        // this.storeToken(token);
                        let userData = {...res.data};
                        userData.password = password;

                        this.props.changePasswordSuccess(userData);
                        this.props.showToast('Password Changed Successfully', 'success');
                        this.props.navigation.navigate('Login')
                    } else {
                        this.props.showToast('Error', 'error');
                    }

                })
                .catch(error => {

                    if (error.response) {
                        this.props.showToast(error.response.data.message, 'error')
                        console.log(error.response)
                    } else {
                        this.props.showToast(error.message, 'error')
                    }
                    this.setState({
                        spinner: false,
                    })
                });
        })
    };


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
                        <View style={{marginTop: scaleHeight(38), marginBottom: scaleHeight(20)}}>
                            <Text style={{color: '#138516', fontFamily: 'nunito-bold', paddingHorizontal: scale(18)}}>Password Reset Option</Text>
                        </View>
                        <View style={{paddingHorizontal: scale(18)}}>
                            <View style={[theme.fill]}>
                                <Text style={[style.label]}>Old Password</Text>
                                <View style={[style.input]}>
                                    <CustomInput value={this.state.oldPassword}
                                        secureTextEntry={true}
                                        onChangeText={oldPassword => this.changeState({oldPassword: oldPassword})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                    /> 
                                </View> 
                                <Text style={[style.label]}>New Password</Text>
                                <View style={[style.input]}>
                                    <CustomInput value={this.state.password}
                                        secureTextEntry={true} onChangeText={newPassword=> this.changeState({password:newPassword})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                    /> 
                                </View> 
                                <Text style={[style.label]}>Confirm Password</Text>
                                <View style={[style.input]}>
                                    <CustomInput value={this.state.confirmPassword}
                                        secureTextEntry={true} onChangeText={confirmPassword=> this.changeState({confirmPassword:confirmPassword})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                    /> 
                                </View> 
                                <View style={{marginLeft: scale(15), alignContent: 'flex-end'}}>
                                    <GreenButton button_text="Reset Password" handlePress={this.validate}/>
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

const mapStateToProps = (state) => {
    return {
        userData: state.login,
        isLoading: state.changePassword.loading,
        isPasswordChanged: state.changePassword.passwordChanged
    };
};

const mapDispatchToProps = {
    showToast,
    changePasswordSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
