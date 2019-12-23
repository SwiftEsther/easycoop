import React, { Component } from 'react';
import {connect, Dispatch} from "react-redux";
import { TextInput, Picker, StatusBar, StyleSheet, TouchableOpacity, Image, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage } from 'react-native';
import { systemWeights } from 'react-native-typography';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../lib/constants/Colors';
import * as constants from '../../../../lib/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import {SIGN_UP} from '../../../../lib/constants';
import style from './style';
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
import CustomModal from '../../../components/CustomModal';
import SuccessModal from '../../../components/SuccessModal';
import { scale, scaleHeight } from '../../../helpers/scale';


export default class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spinner: false,
            selected: "1",
            showProfileInfo: true,
            showForceInfo: false,
            policeId: '',
            rank: '',
            payPoint: '',
            id: '',
            surname: '',
            phone: '',
            email: '',
            firstName: '',
            showTC: false,
            success: false
        }
    }

    changeState = (value) => {
        this.setState(value);
    }

    acceptTerms = () => {
        this.setState({showTC: false})
        // Not properly working
        try {
            fetch(`${SIGN_UP}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: {
                    "policeId": this.state.policeId,
                    "rank": this.state.rank,
                    "payPoint": this.state.payPoint,
                    "forceNo": this.state.id,
                    "lastName": this.state.surname,
                    "phoneNumber": this.state.phone,
                    "emailAddress": this.state.email,
                    "firstName": this.state.firstName,
                    "acceptedTermsAndConditions":  false,
                    "accountClosed":  false,
                    "accountCreationDate": "",
                    "accountNumber": "",
                    "accountSuspended":  false,
                    "addressLine1": "",
                    "addressLine2": "",
                    "addressLine3": " ",
                    "alternateEmailAddress": "",
                    "alternatePhoneNumber": "",
                    "bank": "",
                    "bankId": 0,
                    "bankVerificationNumber": "",
                    "branchId": 0,
                    "contributionAmount": 0,
                    "contributionWithdrawalCount": 0,
                    "cooperative": "",
                    "cooperativeCode": "",
                    "cooperativeId": 2,
                    "cooperativeMembershipNumber": 0,
                    "country": "",
                    "dateOfBirth": "",
                    "firstTime":  false,
                    "gender": "",
                    "genderId": 0,
                    "hasEmailAddress":  false,
                    "hasPhoneNumber":  false,
                    "hasSecurityQuestions":  false,
                    "id": 0,
                    "ippisNo": "",
                    "isAccountModuleAdmin":  false,
                    "isCooperativeAdmin":  false,
                    "isSystemAdmin":  false,
                    "lastLoginDate": "",
                    "lga": "",
                    "locked":  false,
                    "middleName": "",
                    "occupation": "",
                    "participating":  false,
                    "state": "",
                    "stateId": 0,
                    "systemAdminPosition": "",
                    "yearlyIncome": 0
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({success: true})
                console.log(responseJson)
            });
        } catch(err) {
            console.log(err)
        }
    }

    showSuccessModal=()=>this.setState({success: !this.state.success})

    navigate = () => {
        this.props.navigation.navigate("Login")
    }

    signUp = () => {
        const isValid = this.validate();
        if (isValid) {
            this.setState({showTC: true})
        } else {
            return(
                Alert.alert(
                    'Warning',
                    'Fill every input',
                    [
                      {text: 'close', style: 'cancel'},
                    ],
                    { cancelable: false }
                )
            );
        }
    }

    validate = () => {
        const fields = [this.state.email, this.state.firstName, this.state.payPoint, this.state.phone, this.state.surname, this.state.id, this.state.rank, this.state.policeId];
        console.log(fields)
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].length == 0) {
                return false;
            }
        }
        return true
    }

    // _toggleView = () => {
    //     this.setState({showTC: !showTC});
    // };

    render() {
        const ranks = [
            {label: 'Constable', value: 'constable'},
            {label: 'Corporal', value: 'corporal'}, 
            {label: 'Sergent', value: 'sergent'},
            {label: 'Inspector ', value: 'inspector'}, 
            {label: 'ASP II', value: 'aspii'}, 
            {label: 'ASP I', value: 'aspi'},
            {label: 'DSP', value: 'dsp'},
            {label: 'Corporal', value: 'corporal'}, 
            {label: 'SP', value: 'sp'},
            {label: 'CSP', value: 'csp'}, 
            {label: 'ACP', value: 'acp'}, 
            {label: 'DCP ', value: 'dcp'},
            {label: 'CP', value: 'cp'},
            {label: 'AIG', value: 'aig'}, 
            {label: 'DIG', value: 'dig'}, 
            {label: 'IGP ', value: 'igp'}
        ]
        const payPoints = [{label: 'First Point', value: 'fPoint'}, {label: 'Second Point', value: 'sPoint'}, {label: 'Third Point', value: 'tPoint'}]
        const ids = [{label: 'First ID', value: 'fId'}, {label: 'Second ID', value: 'tId'}, {label: 'Third ID', value: 'tId'}]
        return (
            <SafeAreaView style={[theme.container]}>
                <Spinner visible={this.state.spinner} size="large" color="#000000" animation="none" overlayColor={'rgba(255, 255, 255, 0.1)'} />
                <StatusBar translucent={true} backgroundColor={colors.white} barStyle="dark-content" />
                <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid={true}>
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
                <View style={{marginHorizontal: scale(15)}}>
                    <Tabs 
                  tab1Text="Profile Info" tab2Text="Force Info" selected={this.state.selected}
                  tab1Event={() => this.setState({showForceInfo: false, selected: "1", showProfileInfo:true})} 
                  tab2Event={() => this.setState({ showProfileInfo: false, selected: "2", showForceInfo: true})} />
                </View>
                    {this.state.showForceInfo && <View style={{marginHorizontal: scale(20)}}>
                        <View style={[theme.margin_left_right_25]}>
                            <View style={[theme.fill]}>
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Police ID Type</Text>
                                <View style={[style.pickerStlye, { borderWidth: StyleSheet.hairlineWidth}]}>
                                    <Picker
                                        selectedValue={this.state.id}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({id: itemValue})
                                        }>
                                        <Picker.Item label= '---None---' value= '' />
                                        {ids.map((item, index) =><Picker.Item key={index} label={item.label} value={item.value} />)}
                                    </Picker>
                                </View> 
                                    <Text style={[theme.caption, theme.flex1, theme.padded_label, {paddingTop:scaleHeight(20)}]}>Police ID<Text style={{color: '#138516', fontSize: 12, fontFamily: 'nunito-medium'}}>&nbsp; Kindly enter only your number</Text></Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.policeId} keyboardType="number-pad" onChangeText={policeId=> this.changeState({policeId:policeId.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular, {borderColor: '#d0d0d0'}]} 
                                    /> 
                                </View> 
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Rank</Text>
                                <View style={[style.pickerStlye, { borderWidth: StyleSheet.hairlineWidth}]}>
                                    <Picker
                                        selectedValue={this.state.rank}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({rank: itemValue})
                                        }>
                                        <Picker.Item label= '' value= '' />
                                        {ranks.map((item, index) =><Picker.Item key={index} label={item.label} value={item.value} />)}
                                    </Picker>
                                </View>

                                <Text style={[theme.caption, theme.flex1, theme.padded_label, {paddingTop:20}]}>Select Pay Point</Text>
                                <View style={[style.pickerStlye, { borderWidth: StyleSheet.hairlineWidth}]}>
                                    <Picker
                                        selectedValue={this.state.payPoint}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({payPoint: itemValue})
                                        }>
                                        <Picker.Item label= '' value= '' />
                                        {payPoints.map((item, index) =><Picker.Item key={index} label={item.label} value={item.value} />)}
                                    </Picker>
                                </View>
                                
                                <View style={style.button}>
                                    <BlackButton button_text="Sign Up" handlePress={this.signUp}/>
                                </View>
                                
                            </View>
                        </View>
                        
                    </View>}
                    {
                        this.state.showProfileInfo && <View style={{marginHorizontal: scale(20)}}>
                        <View style={[theme.margin_left_right_25]}>
                            <View style={[theme.fill]}>
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>First Name</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.firstName} onChangeText={firstName=> this.changeState({firstName:firstName.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular, theme.light_border]} 
                                    /> 
                                </View> 
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Surname</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.surname} onChangeText={surname=> this.changeState({surname:surname.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular, theme.light_border]} 
                                    /> 
                                </View> 
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Email Address</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.email} onChangeText={email=> this.changeState({email:email.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular, theme.light_border]} 
                                    /> 
                                </View> 

                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Phone Number</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.phone} onChangeText={phone=> this.changeState({phone:phone.trim()})}
                                        keyboardType="number-pad" style={[theme.flex1, theme.caption, theme.typo_regular, theme.light_border]} 
                                    /> 
                                </View> 
                                <View style={style.button}>
                                    <BlackButton button_text="Next" handlePress= {() => this.setState({ showProfileInfo: false, selected: "2", showForceInfo: true})}/>
                                </View>
                                
                            </View>
                        </View>
                        
                    </View>
                    }
                </KeyboardAwareScrollView>
                <CustomModal visible={this.state.showTC} _toggleView={()=>this.setState({showTC: !this.state.showTC})} handleClick={this.acceptTerms}/>
                <SuccessModal visible={this.state.success} _toggleView={this.showSuccessModal} bare={true} close={this.navigate}
                    message={`A text message would be sent to your Phone number ${'+23470******11'} and Email ${'josh******43@gmail.com'}`}/>
            </SafeAreaView>
        );
    }
}
