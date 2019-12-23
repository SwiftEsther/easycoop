import React, { Component } from 'react';
import { connect, Dispatch } from "react-redux";
import { Keyboard, StatusBar, StyleSheet, TouchableOpacity, Image, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage } from 'react-native';
import { systemWeights } from 'react-native-typography';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../lib/constants/colors';
import * as constants from '../../../../lib/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import { axiosInstance } from "../../../lib/api/axiosClient";
import AuthenticationHeader from '../../../components/AuthenticationHeader';
import '../../../../lib/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import Space from '../../../components/Space';
import BlackButton from '../../../components/BlackButton';
import ButtonLink from '../../../components/ButtonLink';
import {recoverPasswordSuccess} from './actions/forgotpassword.actions';
import {showToast} from "../../../components/Toast/actions/toastActions";
import {resetPassword} from '../../../lib/api/url';
import SuccessModal from '../../../components/SuccessModal';

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apNumber: "",
            spinner: false,
            backgroundColor: '#fdfdfd',
            shadowColor: "#000",
            borderWidth: StyleSheet.hairlineWidth,
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
            success: false
        }
    }

    changeState = (value) => {
        this.setState(value);
    }

    forgotPassword = () => {
        if (this.state.apNumber.length == 0) {
            return(
                Alert.alert(
                    'Warning',
                    'Fill input',
                    [
                      {text: 'close', style: 'cancel'},
                    ],
                    { cancelable: false }
                )
            );
        } else {
            this.onhandleResetPassword()
        }
    }

    onhandleResetPassword = () => {
        Keyboard.dismiss();
        this.setState({
            spinner: true,
            modalLoader: true
        }, () => {
            axiosInstance
                .post(resetPassword, {params: {username: this.props.navigation.getParam('username', '')}})
                .then(res => {
                    this.setState({
                        spinner: false,
                    })
                    if (res.status === 200) {
                        let response = {...res.data};

                        this.props.recoverPasswordSuccess(response);
                        this.setState({success: !this.state.success})
                        
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
                    <View style={[theme.screen_pad]}>
                            <AuthenticationHeader text='Forgot Password' backFunction={() => this.props.navigation.goBack(null)} />
                        <View style={[theme.margin_left_right_25]}>
                            <View style={[theme.box_gap_more, theme.fill]}>
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Force number / AP Number</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput 
                                        value={this.state.apNumber} onChangeText={apNumber => this.changeState({apNumber: apNumber.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                    /> 
                                </View> 
                                <Text style={{textAlign: "center", color: "green", marginBottom: 60}} >validating number</Text>
                                <BlackButton button_text="Recover Password" handlePress= {this.forgotPassword}/>
                            </View>
                        </View>
                        
                    </View>
                </KeyboardAwareScrollView>
                <SuccessModal visible={this.state.success} _toggleView={()=>this.props.navigation.navigate('Login')} 
                                subtitle="Request Submitted Successfully"
                                smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        resetError: state.resetPassword.error,
        isLoading: state.resetPassword.loading,
        isPasswordReset: state.resetPassword.passwordReset
    };
};

const mapDispatchToProps = {
    showToast,
    recoverPasswordSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
