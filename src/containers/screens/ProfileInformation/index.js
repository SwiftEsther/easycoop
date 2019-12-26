import React, { Component } from 'react';
import { TextInput, Picker, StatusBar, StyleSheet, TouchableOpacity, Image, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage, Button } from 'react-native';
import { systemWeights } from 'react-native-typography';
import { Header , Avatar  } from 'react-native-elements';
import theme from '../../../../assets/styles/globalStyles';
// import * as colors from '../../../../assets/styles/colors';
import Spinner from 'react-native-loading-spinner-overlay';
import {SIGN_UP} from '../../../../lib/constants';
import style from './style';
import '../../../../lib/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import { Icon } from 'react-native-elements';
import GreenButton from '../../../components/GreenButton';


export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: ""
        }
    }

    changeState = (value) => {
        this.setState(value);
    } 

    render() {
        return (
            <SafeAreaView>
                <StatusBar translucent={true} backgroundColor={colors.white} barStyle="dark-content" />
                <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid={true} scrollEnabled={true} alwaysBounceVertical={false} bounces={false}>
                    <View style={[style.Container]}>
                        <View style={[style.header, theme.fill]}>
                            <Text style={{color: "#575757"}}>Profile Infomation</Text>
                            <Text>arrow-up</Text>
                        </View>
                        <View style={[style.fieldContainer, {marginBottom: 30}]}>
                            <View style={[style.field], {marginBottom: 30}}>
                                <Avatar
                                rounded
                                size='large'
                                title='AH'
                                />
                            </View>
                            <View style={[style.field]}>
                                <Text style={{fontWeight: "bold"}}>First Name</Text>
                                <TextInput style={[style.Input]}/>
                            </View>
                            <View style={[style.field]}>
                                <Text style={{fontWeight: "bold"}}>Last Name</Text>
                                <TextInput style={[style.Input]}/>
                            </View>
                            <View style={[style.field]}>
                                {/* Gender */}
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Gender</Text>
                                <View style={[style.pickerStlye, { borderWidth: StyleSheet.hairlineWidth}]}>
                                    <Picker
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({rank: itemValue})
                                        }>
                                        <Picker.Item label= 'Male' value= 'Male' />
                                        <Picker.Item label= 'Female' value= 'Female' />
                                    </Picker>
                                </View>
                            </View>

                            {/* DOB */}

                            <View>
                                <Text style={{fontWeight: "bold"}}>Date of Birth</Text>
                            </View>
                        </View>

                        <View style={[style.header, theme.fill]}>
                            <Text style={{color: "#575757"}}>Contact Information</Text>
                            <Text>arrow-up</Text>
                        </View>
                        <View style={[style.fieldContainer, {marginBottom: 30}]}>
                            <View style={[style.field]}>
                                <Text style={{fontWeight: "bold"}}>Email Address</Text>
                                <TextInput style={[style.Input]}/>
                            </View>
                            <View style={[style.field]}>
                                <Text style={{fontWeight: "bold"}}>Phone Number</Text>
                                <TextInput style={[style.Input]}/>
                            </View>
                            <View style={[style.field]}>
                                <Text style={{fontWeight: "bold"}}>Residential Address</Text>
                                <TextInput style={[style.Input]}/>
                            </View>
                            <View style={[style.field]}>
                                {/* Country */}
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Country</Text>
                                <View style={[style.pickerStlye, { borderWidth: StyleSheet.hairlineWidth}]}>
                                    <Picker
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({rank: itemValue})
                                        }>
                                        <Picker.Item label= 'Nigeria' value= 'Nigeria' />
                                    </Picker>
                                </View>
                            </View>
                            <View style={[style.field]}>
                                {/* State */}
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>State</Text>
                                <View style={[style.pickerStlye, { borderWidth: StyleSheet.hairlineWidth}]}>
                                    <Picker
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({rank: itemValue})
                                        }>
                                        <Picker.Item label= 'Lagos' value= 'lagos' />
                                        <Picker.Item label= 'Ogun' value= 'ogun' />
                                    </Picker>
                                </View>
                            </View>
                            <View style={[style.field]}>
                                {/* L.G.A */}
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>L.G.A</Text>
                                <View style={[style.pickerStlye, { borderWidth: StyleSheet.hairlineWidth}]}>
                                    <Picker
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({rank: itemValue})
                                        }>
                                        <Picker.Item label= 'Ikeja' value= 'ikeja' />
                                    </Picker>
                                </View>
                            </View>
                        </View>
                        
                        <View style={[style.header, theme.fill]}>
                            <Text style={{color: "#575757"}}>Banking Details</Text>
                            <Text>arrow-up</Text>
                        </View>
                        <View style={[style.fieldContainer]}>
                            <View style={[style.field]}>
                                <Text style={{fontWeight: "bold"}}>BVN</Text>
                                <TextInput style={[style.Input]}/>
                            </View>
                            <View style={[style.field]}>
                                <Text style={{fontWeight: "bold"}}>Account Number</Text>
                                <TextInput style={[style.Input]}/>
                            </View>
                            <View style={[style.field]}>
                                {/* Bank */}
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Bank</Text>
                                <View style={[style.pickerStlye, { borderWidth: StyleSheet.hairlineWidth}]}>
                                    <Picker
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({rank: itemValue})
                                        }>
                                        <Picker.Item label= 'Gtb' value= 'Gtb' />
                                        <Picker.Item label= 'Access bank' value= 'access' />
                                    </Picker>
                                </View>
                            </View>
                        </View>
                                                           
                    </View>
                    </KeyboardAwareScrollView>
                    <View style={{position: "absolute", bottom: 0, flexDirection: "row", padding: 15}}>
                        <View style={{justifyContent: "center", backgroundColor: "#FDFDFD", width: "60%"}}>
                            <Text style={{color:"#138516"}}>You Are Making Changes</Text>
                        </View>
                        <TouchableOpacity
                            style={{backgroundColor:"#138516", padding: 15, width: "40%"}}>
                                <View style={{justifyContent: "center"}}>
                                    <Text style={{marginLeft: 15, color:"#fff"}}>Save Settings</Text>
                                </View>
                        </TouchableOpacity>
                        
                    </View>
            </SafeAreaView>
        );
    }
}