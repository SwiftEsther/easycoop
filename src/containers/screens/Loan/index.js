import React, { Component } from 'react';
import { TextInput, Picker, StatusBar, StyleSheet, TouchableOpacity, Image, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage } from 'react-native';
import { systemWeights } from 'react-native-typography';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../lib/constants/colors';
import * as constants from '../../../../lib/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import {SIGN_UP} from '../../../../lib/constants';
import design from './style';
import ApplyLoan from '../../../components/ApplyLoan';
import CalculateLoan from '../../../components/CalculateLoan';
import '../../../../lib/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import Space from '../../../components/Space';
import BlackButton from '../../../components/BlackButton';
import ButtonLink from '../../../components/ButtonLink';
import GreenLineSeparator from '../../../components/GreenLineSeparator';
import Tabs from '../../../components/Tabs';
import ApplyLoanModal from './ApplyLoanModal';
import ApplicationSuccessful from './ApplicationSuccessful';
import ApplicationStatus from './ApplicationStatus';
import EditApplication from './EditApplication';
import ReviewApplication from './ReviewApplication';
import Header from "../../../components/Header";


export default class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spinner: false,
            buttonStyle: 'none',
            selected: "1",
            showProfileInfo: true,
            showForceInfo: false,
            showTC: false,
            success: false,
            loanApply: false
        }
    }

    changeState = (value) => {
        this.setState(value);
    }

    showLoanApply=()=>this.setState({loanApply: !this.state.loanApply})

    render() {
       return (
            <SafeAreaView style={[design.container1]}>
                <Spinner visible={this.state.spinner} size="large" color="#000000" animation="none" overlayColor={'rgba(255, 255, 255, 0.1)'} />
                <StatusBar translucent={true} backgroundColor={colors.white} barStyle="dark-content" />

                <Header navigation={{...this.props.navigation}}/>
                <Tabs buttonTabStyle={this.state.buttonStyle} tabStyle={design.tabStyle} leftTabStyle={design.leftTabStyle}
                  tab1Text="Loan" tab2Text="Gurantor request" selected={this.state.selected}
                  tab1Event={() => this.setState({showForceInfo: false, selected: "1", showProfileInfo:true})} 
                  tab2Event={() => this.setState({ showProfileInfo: false, selected: "2", showForceInfo: true})} />
                    
                <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid={true}>
                    {this.state.showForceInfo && <View>
                        
                    </View>}

                    {this.state.showProfileInfo && <View>
                        <View style={[design.container2]}>
                            <Text style={{fontSize: 15, fontWeight: "bold"}}>Loan Summary</Text>
                            <Picker style={[design.picker]}>
                                <Picker.Item label= 'All loans' value= '' />
                                <Picker.Item label= 'All' value= '' />
                                <Picker.Item label= 'All loanee' value= '' />
                            </Picker>
                            <Image source={require('../../../../assets/icons/Group.png')}/>
                            <View style={[design.amount]}>
                                <View style={{flexDirection: "column"}}>
                                    <Text style={[design.amountText]}>Amount Due:</Text>
                                    <Text style={[design.price]}>N100,000,000</Text>
                                </View>
                                <View style={{flexDirection: "column"}}>
                                    <Text style={[design.amountText]}>Amount Paid:</Text>
                                    <Text style={[design.price]}>N100,000,000</Text>
                                </View>
                            </View>
                        </View>

                        <View>
                            <ApplyLoan applyLoan={this.showLoanApply}/>
                        </View>
                        <View>
                            <CalculateLoan/>
                        </View>
                    </View>}
                </KeyboardAwareScrollView>
                <ApplyLoanModal visible={this.state.loanApply} _toggleView={this.showLoanApply}/>
                {/* <ApplicationSuccessful 
                subtitle="Request Submission Failed"
                smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints`}
                visible={this.state.success} _toggleView={this.showSuccessModal} /> */}
                {/* <ApplicationStatus visible={this.state.success} _toggleView={this.showSuccessModal} /> */}
                {/* <EditApplication visible={this.state.success} _toggleView={this.showSuccessModal} 
                    subtitle="Recovery Password Sent"
                    message={`A text message would be sent to your Phone number ${'+23470******11'} and Email ${'josh******43@gmail.com'}`}/> */}
                    
            </SafeAreaView>
        );
    }
}
