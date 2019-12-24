import React, { Component } from 'react';
import { connect, Dispatch } from "react-redux";
import {
    TextInput,
    Picker,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Text,
    View,
    ToastAndroid,
    Alert,
    AsyncStorage,
    Keyboard
} from 'react-native';
import { systemWeights } from 'react-native-typography';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../lib/constants/colors';
import * as constants from '../../../../lib/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import { SIGN_UP } from '../../../../lib/constants';
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
import SelectDropdown from "../../../components/SelectPopUp/SelectPopUp";
import { postSignUp } from "../../../lib/api/url";
import { axiosInstance } from "../../../lib/api/axiosClient";
import {showToast} from "../../../components/Toast/actions/toastActions";
import { loginSuccess } from "../Login/actions/login.actions";


 class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spinner: false,
            selected: "1",
            showProfileInfo: true,
            showForceInfo: false,
            firstName: "",
            lastName: "",
            emailAddress: "",
            phoneNumber: "",
            payPoint: "",
            rank: "",
            forceID: "",
            forceNumber: "",
            forceNo: "",
            addressLine1: "my address",
            addressLine2: "my address 2",
            addressLine3: "my adress 3",
            cooperative: "my coperateive",
            cooperativeId: 2,
            cooperativeName: "my cop name",
            country: "Nigeria",
            forwardedToCooperative: true,
            gender: "male",
            genderId: 0,
            id: 0,
            joinCooperative: true,
            makeClaim: true,
            middleName: "MymiddleName",
            registerCooperative: true,
            rejectionReason: "non",
            state: "borno",
            stateId: 8,
            totalRecords: 0,
            treated: true,
            showTC: false,
            success: false
        }
    }

    changeState = (value) => {
        this.setState(value);
    }

    onHandleRegister = () => {
        Keyboard.dismiss();
        const {firstName, lastName, emailAddress, phoneNumber, payPoint, rank, forceNumber, addressLine1, addressLine2, addressLine3, cooperative, cooperativeId, cooperativeName, country, forwardedToCooperative, gender, genderId, id, joinCooperative, makeClaim, middleName, registerCooperative, rejectionReason, state, stateId, totalRecords, treated} = this.state;

        console.log(postSignUp)
        this.setState({
            spinner: true,
            modalLoader: true
        }, () => {
            axiosInstance
                .post(postSignUp, {firstName, lastName, emailAddress, phoneNumber, payPoint, rank, forceNumber: this.state.forceID+this.state.forceNo, addressLine1, addressLine2, addressLine3, cooperative, cooperativeId, cooperativeName, country, forwardedToCooperative, gender, genderId, id, joinCooperative, makeClaim, middleName, registerCooperative, rejectionReason, state, stateId, totalRecords, treated}, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
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
                        this.props.showToast('Successfully registered', 'success');
                        this.setState({success: true})
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

    acceptTerms = () => {
        this.setState({showTC: false})
        this.onHandleRegister();
    }

    showSuccessModal = () => this.setState({success: !this.state.success})

    navigate = () => {
        this.props.navigation.navigate("Login")
    }

    signUp = () => {
        const fields = [this.state.forceID, this.state.forceNo, this.state.rank, this.state.payPoint];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].length == 0) {
                this.props.showToast('Kindly fill in the required fields', 'error')
                return false;
            }
        }
        this.setState({showTC: true})
    }

    validateProfileInfo = () => {
        const fields = [this.state.emailAddress, this.state.firstName, this.state.phoneNumber, this.state.lastName];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].length == 0) {
                this.props.showToast('Kindly fill in the required fields', 'error')
                return false;
            }
        }
        this.setState({
            showProfileInfo: false,
            selected: "2",
            showForceInfo: true
        })
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
        const payPoints = [
            {sn:1, mss:"Abia", value: "State Police Command, Umuahia. Umuahia - Ohafia Rd, Nkata Ubeku, Umuahia"},
            {sn:2, mss:"Adamawa", value: "Adamawa State Police Headquarters"},
            {sn:3, mss:"Akwa Ibom", value: "The Nigeria Police Divisional Hqters 'E' Division. Akpan Horgan Ekpo Street, Uyo, Akwa Ibom"},
            {sn:4, mss:"Anambra", value: "Anambra State Police Headquarters, Akwa"},
            {sn:5, mss:"Bauchi", value: "Bauchi State Police Command Bauchi"},
            {sn:6, mss:"Bayelsa", value: "Bayelsa  State Police Command  Bayelsa"},
            {sn:7, mss:"Benue", value: "Nigeria Police Station, Ugbokolo division. Old Otukpo Rd, Ugbokolo"},
            {sn:8, mss:"Borno", value: "Borno State Police Headquarters."},
            {sn:9, mss:"Cross RIV     ", value: "Enugu State Police Headquarters, Cross River"},
            {sn:10, mss:"Delta", value: "The Nigeria Police Delta State Police Command Headqurters. Okpanam Rd, GRA Phase I, Asaba"},
            {sn:11, mss:"Ebonyi", value: "Ebonyi State Police Command, Abakaliki"},
            {sn:12, mss:"Edo", value: "Adesuwa Sapele Road, Oka, Benin City, Edo State"},
            {sn:13, mss:"Ekiti", value: "The Nigerian Police, Ado Central Divisional Headquarters. Barrack Road, Ado Ekiti"},
            {sn:14, mss:"Enugu", value: "Enugu State Police Headquarters"},
            {sn:15, mss:"FCT", value: "Federal Capital Territory Command, Abuja"},
            {sn:16, mss:"FHQ ANNEX", value: "Kam Selem House, Moloney Street, Obalende, Lagos"},
            {sn:17, mss:"FHQ Abuja", value: "Life-Camp, Gwarinpa, Abuja, FCT"},
            {sn:18, mss:"Gombe", value: "Police Area Command, Gombe"},
            {sn:19, mss:"Imo", value: "Police Officers Wives Association, Imo State Command Head Quarters, 460271, Owerri"},
            {sn:20, mss:"Jigawa", value: "Jigawa State Police Headquarters"},
            {sn:21, mss:"Kaduna", value: "Kaduna State Police Headquarters"},
            {sn:22, mss:"Kano", value: "Police Zonal Headquarters, Kano. Katsina Road, Faggae, Ajingi, Kano"},
            {sn:23, mss:"Kebbi", value: "Kebbi State Police Command Mosque Birnin Kebbi"},
            {sn:24, mss:"Kogi", value: "Zone 8 police commandHeadquarters, Lokoja"},
            {sn:25, mss:"Kwara", value: "Kwara State Police Headquarters"},
            {sn:26, mss:"Katsina", value: "Katsina State Police Headquarters"},
            {sn:27, mss:"Lagos", value: "Lagos State Police Command Oduduwa, Ikeja"},
            {sn:28, mss:"Nasarawa", value: "Nasarawa State Police Headquarters,"},
            {sn:29, mss:"Niger", value: "Nigerian Police Force Headquarters Minna. Yakubu Lami Rd, Minna"},
            {sn:30, mss:"Ogun", value: "Eleweran Police Headquarters, Abeokuta"},
            {sn:31, mss:"Ondo", value: "Ondo State Police Headquarters, Akin Akinbobola St, Akure"},
            {sn:32, mss:"Osun", value: "Osogbo Area Command Headquarters, Osogbo"},
            {sn:33, mss:"Oyo", value: "Plot 30, Block XII, Oluyole Estate, MKO Abiola Way, Oluyole, Ibadan"},
            {sn:34, mss:"Plateau", value: "Nigerian Police Force, Plateau State Command Headquarters. 45 Gomwalk Rd, Jos"},
            {sn:35, mss:"POLAC", value: "Police Academy Wudil, Kano"},
            {sn:36, mss:"Rivers", value: "Rivers State Police Headquarters, Moscow Rd, Port Harcourt"},
            {sn:37, mss:"Sokoto", value: "Sokoto State Police Headquarters"},
            {sn:38, mss:"STAFFPOL", value: "Police Staff College, Jos"},
            {sn:39, mss:"Taraba", value: "Taraba State Police Headquarters"},
            {sn:40, mss:"Yobe", value: "Yobe State Police Headquarters"},
            {sn:41, mss:"Zamfara", value: "Zamfara State Police Headquarters"},
            {sn:42, mss:"PCI Ikeja", value: "Police College Ikeja"}
        ]
        const forceIDs = [{label: 'AP', value: 'AP'}, {label: 'FN', value: 'FN'}]

        return (
            <SafeAreaView style={[theme.container]}>
                <Spinner visible={this.state.spinner} size="large" color="#000000" animation="none"
                         overlayColor={'rgba(0, 0, 0, 0.5)'}/>
                <StatusBar translucent={true} backgroundColor={colors.white} barStyle="dark-content"/>
                <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid={true}>
                    <View style={[style.headerContainer]}>
                        <TouchableOpacity activeOpacity={0.4} onPress={() => this.props.navigation.goBack(null)}>
                            <Image source={require('../../../../assets/icons/back_24px.png')}/>
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
                            tab1Event={() => this.setState({
                                showForceInfo: false,
                                selected: "1",
                                showProfileInfo: true
                            })}
                            tab2Event={this.validateProfileInfo}/>
                    </View>
                    {this.state.showForceInfo && <View style={{marginHorizontal: scale(20)}}>
                        <View style={[theme.margin_left_right_25]}>
                            <View style={[theme.fill]}>
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Force ID Type</Text>
                                <View style={[style.pickerStlye, {borderWidth: StyleSheet.hairlineWidth}]}>
                                    <Picker
                                        selectedValue={this.state.id}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({id: itemValue})
                                        }>
                                        <Picker.Item label='---None---' value=''/>
                                        {forceIDs.map((item, index) => <Picker.Item key={index} label={item.label}
                                                                               value={item.value}/>)}
                                    </Picker>

                                    {/*<SelectDropdown*/}
                                        {/*options={ids || []}*/}
                                        {/*value={''}*/}
                                        {/*textStyle={{*/}
                                            {/*color: '#484848',*/}
                                            {/*fontFamily: 'nunito-medium',*/}
                                            {/*marginRight: scale(3),*/}
                                            {/*fontSize: scale(16)*/}
                                        {/*}}*/}
                                        {/*title={`Select Police Id Type`}*/}
                                        {/*onChange={(obj) => this.setState({*/}
                                            {/*id:obj*/}
                                        {/*})}*/}
                                    {/*>*/}
                                        {/*<View style={styles.select}*/}
                                            {/*// onPress={this.onhandleSubmit}*/}
                                        {/*>*/}
                                            {/*/!*<Text style={styles.label}>Bank Name </Text>*!/*/}
                                            {/*<Text numberOfLines={1} style={styles.value}>{this.state.id.label || ''}</Text>*/}
                                        {/*</View>*/}
                                    {/*</SelectDropdown>*/}
                                </View>
                                <Text
                                    style={[theme.caption, theme.flex1, theme.padded_label, {paddingTop: scaleHeight(20)}]}>Force
                                    ID<Text style={{
                                        color: '#138516',
                                        fontSize: 12,
                                        fontFamily: 'nunito-medium'
                                    }}>&nbsp; Kindly enter only your number</Text></Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.forceNo} keyboardType="number-pad"
                                                 onChangeText={forceNo => this.changeState({forceNo: forceNo.trim()})}
                                                 style={[theme.flex1, theme.caption, theme.typo_regular, {borderColor: '#d0d0d0'}]}
                                    />
                                </View>
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Rank</Text>
                                <View style={[style.pickerStlye, {borderWidth: StyleSheet.hairlineWidth}]}>
                                    <Picker
                                        selectedValue={this.state.rank}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({rank: itemValue})
                                        }>
                                        <Picker.Item label='---None---' value=''/>
                                        {ranks.map((item, index) => <Picker.Item key={index} label={item.label}
                                                                                 value={item.value}/>)}
                                    </Picker>
                                </View>

                                <Text style={[theme.caption, theme.flex1, theme.padded_label, {paddingTop: 20}]}>Select
                                    Pay Point</Text>
                                <View style={[style.pickerStlye, {borderWidth: StyleSheet.hairlineWidth}]}>
                                    <Picker
                                        selectedValue={this.state.payPoint}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({payPoint: itemValue})
                                        }>
                                        <Picker.Item label='---None---' value=''/>
                                        {payPoints.map((item, index) => <Picker.Item key={index} label={item.mss}
                                                                                     value={item.value}/>)}
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
                                        <CustomInput value={this.state.firstName}
                                                     onChangeText={firstName => this.changeState({firstName: firstName.trim()})}
                                                     style={[theme.flex1, theme.caption, theme.typo_regular, theme.light_border]}
                                        />
                                    </View>
                                    <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Surname</Text>
                                    <View style={[theme.input_margin_bottom]}>
                                        <CustomInput value={this.state.lastName}
                                                     onChangeText={lastName => this.changeState({lastName: lastName.trim()})}
                                                     style={[theme.flex1, theme.caption, theme.typo_regular, theme.light_border]}
                                        />
                                    </View>
                                    <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Email Address</Text>
                                    <View style={[theme.input_margin_bottom]}>
                                        <CustomInput value={this.state.emailAddress}
                                                     onChangeText={emailAddress => this.changeState({emailAddress: emailAddress.trim()})}
                                                     style={[theme.flex1, theme.caption, theme.typo_regular, theme.light_border]}
                                        />
                                    </View>

                                    <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Phone Number</Text>
                                    <View style={[theme.input_margin_bottom]}>
                                        <CustomInput value={this.state.phoneNumber}
                                                     onChangeText={phoneNumber => this.changeState({phoneNumber: phoneNumber.trim()})}
                                                     keyboardType="number-pad"
                                                     style={[theme.flex1, theme.caption, theme.typo_regular, theme.light_border]}
                                        />
                                    </View>
                                    <View style={style.button}>
                                        <BlackButton button_text="Next" handlePress={this.validateProfileInfo}/>
                                    </View>

                                </View>
                            </View>

                        </View>
                    }
                </KeyboardAwareScrollView>
                <CustomModal visible={this.state.showTC} _toggleView={() => this.setState({showTC: !this.state.showTC})}
                             handleClick={this.acceptTerms}/>
                <SuccessModal visible={this.state.success} _toggleView={()=>navigation.navigate('Login')} 
                    subtitle="Password Sent"
                    message={`A text message was sent to your registered Phone Number and email address.`}/>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginError: state.login.error,
        isLoading: state.login.loading,
        isLoggedIn: state.login.isLoggedIn
    };
};

const mapDispatchToProps = {
    showToast,
    loginSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(index);