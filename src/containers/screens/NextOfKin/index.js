import React, { Component } from 'react';
import { TextInput, Picker, StatusBar, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage, Button } from 'react-native';
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
            dateOfBirth: '',
            residentialAddress: '',
            relationship: ''
        }
    }

    changeState = (value) => {
        this.setState(value);
    } 

    render() {
        
const {width,  height} = Dimensions.get('window');
const genders=[{label: 'Male', value: 'male'},{label: 'Female', value: 'female'}]
        return (
            <SafeAreaView>
                <Spinner visible={this.state.spinner} size="large" color="#000000" animation="none" overlayColor={'rgba(0, 0, 0, 0.5)'} />
                <StatusBar translucent={true} backgroundColor='#fff' barStyle="dark-content" />
                <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid={true} scrollEnabled={true} alwaysBounceVertical={false} bounces={false}>
                <View style={{marginTop: scaleHeight(70)}}>
                    <View style={[style.pageheader]}>
                        <Text>Next of Kin</Text>
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
                                        onChangeText={firstName => this.changeState({firstName: firstName.trim()})}
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
                                <Text style={[style.label]}>Email Address</Text>
                                <View style={[style.input]}>
                                    <CustomInput value={this.state.emailAddress}
                                        onChangeText={emailAddress=> this.changeState({emailAddress:emailAddress.trim()})}
                                    /> 
                                </View> 
                                <Text style={[style.label]}>Phone Number</Text>
                                <View style={[style.input]}>
                                    <CustomInput value={this.state.phoneNumber}
                                        onChangeText={phoneNumber => this.changeState({phoneNumber: phoneNumber})}
                                    /> 
                                </View> 
                                <Text style={[style.label]}>Residential Address</Text>
                                <View style={[style.input]}>
                                    <CustomInput value={this.state.residentialAddress}
                                        onChangeText={residentialAddress=> this.changeState({residentialAddress:residentialAddress})}
                                    /> 
                                </View> 
                                <Text style={[style.label]}>Relationship</Text>
                                <View style={[style.input]}>
                                    <CustomInput value={this.state.relationship}
                                        onChangeText={relationship=> this.changeState({relationship:relationship.trim()})}
                                    /> 
                                </View> 
                            </View>
                        </View>
                        <View style={{flexDirection: "row",marginBottom: scaleHeight(139)}}>
                            <View style={{justifyContent: "center"}}><Text>_______</Text></View>
                            <View style={{width: "70%", padding: 10, backgroundColor: "#F1F1F1", borderRadius: 10, flexDirection: "row", justifyContent: "space-around"}}>
                                <View style={{borderWidth: 2, borderColor: "#148516", borderRadius: 20}}><Icon name="add" ></Icon></View>
                                <View style={{justifyContent: "center"}}>
                                    <Text style={{color: "#707070", fontWeight: "bold"}}>Add more next of kin</Text>
                                </View>
                            </View>
                            <View style={{justifyContent: "center"}}><Text>_______</Text></View>
                        </View>                                    
                        </View>
                        </View>
                    </KeyboardAwareScrollView>
                    <View style={{position: "absolute", bottom: 100, flexDirection: "row", height:scaleHeight(45)}}>
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
