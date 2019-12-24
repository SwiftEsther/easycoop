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
        const {firstName, lastName, emailAddress, phoneNumber, payPoint, rank, forceID, forceNumber, forceNo, addressLine1, addressLine2, addressLine3, cooperative, cooperativeId, cooperativeName, country, forwardedToCooperative, gender, genderId, id, joinCooperative, makeClaim, middleName, registerCooperative, rejectionReason, state, stateId, totalRecords, treated} = this.state;
        const user = {firstName, lastName, emailAddress, phoneNumber, payPoint, rank, forceNo,addressLine1, addressLine2, addressLine3, cooperative, cooperativeId, cooperativeName, country, forwardedToCooperative, gender, genderId, id, joinCooperative, makeClaim, middleName, registerCooperative, rejectionReason, state, stateId, totalRecords, treated};

        console.log(postSignUp)
        this.setState({
            spinner: true,
            modalLoader: true
        }, () => {
            axiosInstance
                .post(postSignUp, {...state, forceNumber: forceID+forceNumber}, {
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
        const fields = [this.state.email, this.state.firstName, this.state.phone, this.state.surname];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].length == 0) {
                this.props.showToast('Kindly fill in the required fields', 'error')
                return false;
            }
        }
        this.setState({showTC: true})
    }

    validateProfileInfo = () => {
        const fields = [this.state.email, this.state.firstName, this.state.phone, this.state.surname];
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
            {sn: 1, mss: 'Abia', value: "State Police Command, Umuahia. Umuahia - Ohafia Rd, Nkata Ubeku, Umuahia"},
            {sn: 2, mss: 'Adamawa', value: "Adamawa State Police Headquarters"},
            {sn: 3, mss: 'Akwa Ibom', value: "The Nigeria Police Divisional Hqters 'E' Division. Akpan Horgan Ekpo Street, Uyo, Akwa Ibom"}
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
                            tab2Event={() => this.setState({
                                showProfileInfo: false,
                                selected: "2",
                                showForceInfo: true
                            })}/>
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
                                    <CustomInput value={this.state.policeId} keyboardType="number-pad"
                                                 onChangeText={policeId => this.changeState({policeId: policeId.trim()})}
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
                                        <CustomInput value={this.state.surname}
                                                     onChangeText={surname => this.changeState({surname: surname.trim()})}
                                                     style={[theme.flex1, theme.caption, theme.typo_regular, theme.light_border]}
                                        />
                                    </View>
                                    <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Email Address</Text>
                                    <View style={[theme.input_margin_bottom]}>
                                        <CustomInput value={this.state.email}
                                                     onChangeText={email => this.changeState({email: email.trim()})}
                                                     style={[theme.flex1, theme.caption, theme.typo_regular, theme.light_border]}
                                        />
                                    </View>

                                    <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Phone Number</Text>
                                    <View style={[theme.input_margin_bottom]}>
                                        <CustomInput value={this.state.phone}
                                                     onChangeText={phone => this.changeState({phone: phone.trim()})}
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