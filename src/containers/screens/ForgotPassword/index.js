import React, { Component } from 'react';
import { TextInput, StatusBar, StyleSheet, TouchableOpacity, Image, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage } from 'react-native';
import { systemWeights } from 'react-native-typography';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../lib/constants/Colors';
import * as constants from '../../../../lib/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import {RESET_PASSWORD} from '../../../../lib/constants';
import AuthenticationHeader from '../../../components/AuthenticationHeader';
import '../../../../lib/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import Space from '../../../components/Space';
import BlackButton from '../../../components/BlackButton';
import ButtonLink from '../../../components/ButtonLink';
import base64 from 'base-64';

export default class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
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
            elevation: 0
        }
    }

    changeState = (value) => {
        this.setState(value);
    }

    forgotPassword = () => {
        if (this.state.username.length == 0) {
            return(
                Alert.alert(
                    'Warning',
                    'Fill input',
                    [
                      {text: 'close', style: 'cancel'},
                    ],
                    { cancelable: false }
                )
            );
        } else {
            const api = `${BASE_URL}${RESET_PASSWORD}`
            var url = new URL(api),
            params = {username: this.state.username}
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            try {
                fetch(url)
                .then((response) => response.json())
                    .then((responseJson) => {
                        // get the response data from {responseJson} e.g responseJson.lastName
                        console.log(responseJson);
                        this.props.navigation.navigate('AuthenticationPage')
                    })
            } catch (err) {

            }
        }
    }

    render() {
        return (
            <SafeAreaView style={[theme.container]}>
                <Spinner visible={this.state.spinner} size="large" color="#000000" animation="none" overlayColor={'rgba(255, 255, 255, 0.1)'} />
                <StatusBar translucent={true} backgroundColor={colors.white} barStyle="dark-content" />
                <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
                    <View style={[theme.screen_pad]}>
                            <AuthenticationHeader text='Forgot Password' backFunction={() => this.props.navigation.goBack(null)} />
                        <View style={[theme.margin_left_right_25]}>
                            <View style={[theme.box_gap_more, theme.fill]}>
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Force number / AP Number</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput 
                                        value={this.state.username} onChangeText={username => this.changeState({username: username.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                    /> 
                                </View> 
                                <Text style={{textAlign: "center", color: "green", marginBottom: 60}} >validating number</Text>
                                <BlackButton button_text="Recover Password" handlePress= {this.forgotPassword}/>
                            </View>
                        </View>
                        
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}