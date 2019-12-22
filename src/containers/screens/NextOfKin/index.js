import React, { Component } from 'react';
import { TextInput, Picker, StatusBar, StyleSheet, TouchableOpacity, Image, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage, Button } from 'react-native';
import { systemWeights } from 'react-native-typography';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../../assets/styles/colors';
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
                <KeyboardAwareScrollView>
                    <View style={[style.Container]}>
                        <View style={[style.header, theme.fill]}>
                            <Text style={{color: "#575757"}}>Next of Kin</Text>
                            <Text>arrow-up</Text>
                        </View>
                        <View style={[style.fieldContainer]}>
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
                                <Text style={{fontWeight: "bold"}}>Relationship</Text>
                                <TextInput style={[style.Input]}/>
                            </View>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <View style={{justifyContent: "center"}}><Text>_______</Text></View>
                            <View style={{width: "70%", padding: 10, backgroundColor: "#F1F1F1", borderRadius: 10, flexDirection: "row", justifyContent: "space-around"}}>
                                <View style={{borderWidth: 2, borderColor: "#148516", borderRadius: 20, padding: 0}}><Icon name="add" ></Icon></View>
                                <View style={{justifyContent: "center"}}>
                                    <Text style={{color: "#707070", fontWeight: "bold"}}>Add more next of kin</Text>
                                </View>
                            </View>
                            <View style={{justifyContent: "center"}}><Text>_______</Text></View>
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