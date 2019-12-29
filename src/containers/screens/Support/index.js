import React, { Component } from 'react';
import { TextInput, StatusBar, StyleSheet, TouchableOpacity, Keyboard, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage } from 'react-native';
import { systemWeights } from 'react-native-typography';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../lib/constants/colors';
import * as constants from '../../../../lib/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect, Dispatch } from "react-redux";
import { apiRequest } from "../../../lib/api/api";
import Header from '../../../components/Header';
import '../../../../lib/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import {scale, scaleHeight} from '../../../helpers/scale';
import GreenButton from '../../../components/GreenButton';
import {sendSupportMailSuccess} from './actions/support.actions';
import { supportMail } from '../../../lib/api/url';
import { showToast } from "../../../components/Toast/actions/toastActions";

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spinner: false,
            message: '',
            subject: "",
        }
    }

    changeState = (value) => {
        this.setState(value);
    }

    validate = async () => {
        if (this.state.message.length === 0 || this.state.subject.length === 0) {
            this.props.showToast('Kindly fill in all fields', 'error')
        }
        else {
            this.onhandleSendMail();
        }
    }

    onhandleSendMail = () => {
        const { userData } = this.props;
        Keyboard.dismiss();
        let { subject, message } = this.state;

        this.setState({
            spinner: true,
            modalLoader: true
        }, () => {
            apiRequest(supportMail, "post", {
              subject,
              fromUser: userData.username,
              fromUserEmailPassword: "",
              placeholder: {
                amount: 0,
                balance: 0,
                coop_admin_comment: "",
                coop_name: "",
                desc: "",
                first_name: "",
                last_name: "",
                loan_status: "",
                password: "",
                tnx: "",
                transaction_date: "",
                transaction_units: 0,
                username: userData.username
              },
            template: "",
            to_email: "cfc@myeasycoop.com",
            to_emails: [
              ""
            ],
              emailBody: `${message} Sent from ${userData.firstName}${userData.lastName} \n Email: ${userData.emailAddress} \n Phone Number: ${userData.phoneNumber}`
            })
              .then(res => {
                console.log(res);
                this.setState({
                  spinner: false,
                  message: "",
                  subject: ""
                });

                this.props.sendSupportMailSuccess(res.data);
                this.props.showToast("Mail Sent Successfully", "success");
                this.props.navigation.navigate("Dashboard");
              })
              .catch(error => {
                console.log('error', error);

                if (error.response) {
                  this.props.showToast(error.response.data.message, "error");
                  console.log('err',error.response);
                } else {
                  this.props.showToast(error.message, "error");
                }
                this.setState({
                  spinner: false
                });
              });
        })
    };


    render() {
        return (
            <SafeAreaView style={[theme.container]}>
                <Spinner visible={this.state.spinner} size="large" color="#000000" animation="none" overlayColor={'rgba(255, 255, 255, 0.1)'} />
                <StatusBar translucent={true} backgroundColor={colors.white} barStyle="dark-content" />
                <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid={true} scrollEnabled={true} alwaysBounceVertical={false} bounces={false}  style={{backgroundColor: '#fdfdfd'}}>
                    <View style={[theme.screen_pad,{marginTop: scaleHeight(70)}]}>
                        <View>
                            <View style={[theme.fill]}>
                                <Text style={[style.label]}>Subject</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.subject} onChangeText={subject=> this.changeState({subject:subject.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                    /> 
                                </View> 
                                <Text style={[style.label]}>Message</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput multiline={true} numberOfLines={10} scrollEnabled={true} value={this.state.message} onChangeText={message=> this.changeState({message:message.trim()})}
                                             
                                        /> 
                                </View>
                                <GreenButton button_text="Submit Message" handlePress= {this.validate}/>
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
        isLoading: state.support.loading,
        mailSent: state.support.mailSent
    };
};

const mapDispatchToProps = {
    showToast,
    sendSupportMailSuccess
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
    label: {
        fontFamily: 'nunito-medium',
        marginVertical: scaleHeight(16)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
