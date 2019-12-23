import React, { Component } from 'react';
import { TextInput, StatusBar, StyleSheet, TouchableOpacity, Image, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage } from 'react-native';
import { systemWeights } from 'react-native-typography';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../lib/constants/Colors';
import * as constants from '../../../../lib/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import API from '../../../../lib/api';
import AuthenticationHeader from '../../../components/AuthenticationHeader';
import '../../../../lib/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import Space from '../../../components/Space';
import BlackButton from '../../../components/BlackButton';
import SuccessModal from '../../../components/SuccessModal';
import ButtonLink from '../../../components/ButtonLink';
import base64 from 'base-64';

export default class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
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

    showSuccessModal=()=>this.setState({success: !this.state.success})

    changeState = (value) => {
        this.setState(value);
    }

    navigate = () => {
        console.log("here")
        this.props.navigation.navigate("Login")
    }

    redirect = (_stage) => {
        
    }

    onFocus() {
        this.setState({
            backgroundColor: '#fff',
            borderWidth: 0,
            shadowColor: "#fdfdfd",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 24
        });
    }

    onBlur() {
        this.setState({
            backgroundColor: '#fdfdfd',
            borderWidth: StyleSheet.hairlineWidth,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0
        })
    }

    render() {
        return (
            <SafeAreaView style={[theme.container]}>
                <Spinner visible={this.state.spinner} size="large" color="#000000" animation="none" overlayColor={'rgba(255, 255, 255, 0.1)'} />
                <StatusBar translucent={true} backgroundColor={colors.white} barStyle="dark-content" />
                <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
                    <View style={[theme.screen_pad]}>
                            <AuthenticationHeader text='Authentication' backFunction={() => this.props.navigation.goBack(null)} />
                        <View style={[theme.margin_left_right_25]}>
                            <View style={[theme.box_gap_more, theme.fill]}>
                                <View>
                                    <Text style={{textAlign: "center", color: "green", marginBottom: 60, flexWrap: "wrap"}} >vA textasdbaksbd asdfkhbasfkj sdkfhbaskfbskjbfdasdfh
                                    sdfjhabsdfjkasvdhjbfaksjdhfabsvdmnf </Text>
                                </View>
                                <BlackButton button_text="Send Password"  handlePress={()=>this.setState({success: !this.state.success})}/>
                            </View>
                        </View>
                        
                    </View>
                </KeyboardAwareScrollView>
                <SuccessModal visible={this.state.success} _toggleView={this.showSuccessModal} 
                    subtitle="Recovery Password Sent"
                    close={this.navigate}
                    message={`A text message would be sent to your Phone number ${'+23470******11'} and Email ${'josh******43@gmail.com'}`}/>
            </SafeAreaView>
        );
    }
}