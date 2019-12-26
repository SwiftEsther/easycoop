import React, { Component } from 'react';
import { TextInput, Picker, StatusBar, Image, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage, Button } from 'react-native';
import { systemWeights } from 'react-native-typography';
import theme from '../../../../assets/styles/globalStyles';
import Spinner from 'react-native-loading-spinner-overlay';
import {SIGN_UP} from '../../../../lib/constants';
import style from './style';
import '../../../../lib/helpers';
import Header from '../../../components/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import { Icon } from 'react-native-elements';
import {scale, scaleHeight} from '../../../helpers/scale';
import {AntDesign} from '@expo/vector-icons';
import GreenButton from '../../../components/GreenButton';


export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: '',
            gender: '',
            emailAddress: '',
            phoneNumber: '',
            dateOfBirth: ''
        }
    }

    changeState = (value) => {
        this.setState(value);
    } 

    render() {
const genders=[{label: 'Male', value: 'male'},{label: 'Female', value: 'female'}]
        return (
            <SafeAreaView>
                <Spinner visible={this.state.spinner} size="large" color="#000000" animation="none" overlayColor={'rgba(0, 0, 0, 0.5)'} />
                <StatusBar translucent={true} backgroundColor='#fff' barStyle="dark-content" />
                <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
                <View style={{marginTop: scaleHeight(70)}}>
                    <View style={[style.pageheader]}>
                        <Text>Profile Information</Text>
                        <AntDesign
                            name="caretup"
                            size={scale(15)}
                            color="#138516"
                            style={style.icon}
                        />                        
                    </View>
                    <View style={[style.Container]}>
                        <View style={[style.fieldContainer]}>
                            <View>
                            <Text style={[style.label]}>First Name</Text>
                                <View style={[style.input]}>
                                    <CustomInput value={this.state.firstName}
                                        onChangeText={firstName=> this.changeState({firstName:firstName.trim()})}
                                    /> 
                                </View>
                                <Text style={[style.label]}>Last Name</Text>
                                <View style={[style.input]}>
                                    <CustomInput value={this.state.lastName}
                                        onChangeText={lastName=> this.changeState({lastName:lastName.trim()})}
                                    /> 
                                </View> 
                                <Text style={[style.label]}>Gender</Text>
                                <View style={[style.input, { borderWidth: StyleSheet.hairlineWidth }]}>
                                    <Picker
                                        selectedValue={this.state.gender}
                                        onValueChange={gender=> this.changeState({gender:gender})}>
                                        <Picker.Item label='---None---' value='' />
                                        {genders.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)}
                                    </Picker>
                                </View> 
                            </View>
                        </View>                                   
                        </View>                        
                        <View style={[style.pageheader]}>
                        <Text>Contact Information</Text>
                        <AntDesign
                            name="caretup"
                            size={scale(15)}
                            color="#138516"
                            style={style.icon}
                        />                        
                    </View>
                    <View style={[style.Container]}>
                        <View style={[style.fieldContainer]}>
                            <View>
                                <Text style={[style.label]}>Email Address</Text>
                                <View style={[style.input]}>
                                    <CustomInput value={this.state.emailAddress}
                                        onChangeText={emailAddress => this.changeState({emailAddress: emailAddress.trim()})}
                                    /> 
                                </View> 
                                <Text style={[style.label]}>Phone Number</Text>
                                <View style={[style.input]}>
                                    <CustomInput value={this.state.phoneNumber}
                                    keyboardType="number-pad"
                                        onChangeText={phoneNumber=> this.changeState({phoneNumber:phoneNumber.trim()})}
                                    /> 
                                </View>  
                            </View>
                        </View>                                   
                        </View>    
                        </View>
                    </KeyboardAwareScrollView>
                    <View style={{position: "absolute", bottom: 50, flexDirection: "row", height:scaleHeight(45)}}>
                        <View style={{justifyContent: "center", backgroundColor: "#FDFDFD", width: "60%"}}>
                            <Text style={{color:"#138516", fontFamily: 'nunito-regular', fontsize: 17, paddingLeft: scale(29)}}>You Are Making Changes</Text>
                        </View>
                        <TouchableOpacity
                            style={{backgroundColor:"#138516", padding: 15, width: "40%"}}>
                                <View style={{justifyContent: "center"}}>
                                    <Text style={{marginLeft: 15, color:"#fff", fontFamily: 'nunito-regular', fontsize: 17}}>Save Settings</Text>
                                </View>
                        </TouchableOpacity>
                        
                    </View>
                <Header navigation={{...this.props.navigation}}/>
            </SafeAreaView>
        );
    }
}
