import React, { Component } from 'react';
import { TextInput, StatusBar, StyleSheet, TouchableOpacity, Image, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage } from 'react-native';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../../assets/styles/colors';
import AuthenticationHeader from '../../../components/AuthenticationHeader';
import * as constants from '../../../../lib/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import {LOGIN} from '../../../../lib/constants';
import '../../../../lib/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import BlackButton from '../../../components/BlackButton';
import ButtonLink from '../../../components/ButtonLink';
import base64 from 'base-64';

export default class index extends Component {
    constructor(props) {
        super(props);

        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);

        this.state = {
            username: '',
            password: '',
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

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
    }

    changeState = (value) => {
        this.setState(value);
    }

    _navigate = () => {
        this.props.navigation.navigate('SignUp');
    }

    validate = async () => {
        if (this.state.username.length == 0 || this.state.password.length == 0) {
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
        } else {
            var headers = new Headers();
            headers.append("Authorization", "Basic " + base64.encode(this.state.username+":"+this.state.password));

            try {
                fetch(`${BASE_URL}${LOGIN}`, {headers: headers})
                .then((response) => response.json())
                .then((responseJson) => {
                    // get the response data from {responseJson} e.g responseJson.lastName
                    if (responseJson.errorcode != 200) {
                        // failed
                        return (
                            Alert.alert(
                                'Warning',
                                'Wrong password or username',
                                [
                                  {text: 'close', style: 'cancel'},
                                ],
                                { cancelable: false }
                            )
                        );
                    } else {
                        // sucessful login
                    }
                })
            } catch(err) {
                
            }
        }
    }

    redirect = (_stage) => {
        if(_stage === "LOGGEDIN") {
          this.props.navigation.navigate('Dashboard');
        }
        else {
            this.props.navigation.navigate('Register');
        }
    }

    onFocus() {
        this.setState({
            backgroundColor: '#fff',
            borderWidth: 0,
            shadowColor: "#fdfdfd",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 24
        });
    }

    onBlur() {
        this.setState({
            backgroundColor: '#fdfdfd',
            borderWidth: StyleSheet.hairlineWidth,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0
        })
    }

    render() {
        return (
            <SafeAreaView style={[theme.container]}>
                <Spinner visible={this.state.spinner} size="large" color="#000000" animation="none" overlayColor={'rgba(255, 255, 255, 0.1)'} />
                <StatusBar translucent={true} backgroundColor={colors.white} barStyle="dark-content" />
                <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
                    <View style={[theme.screen_pad]}>
                        <AuthenticationHeader text='Sign In' backFunction={() => this.props.navigation.goBack(null)}/>
                        <View style={[theme.margin_left_right_25]}>
                            <View style={[theme.box_gap_more, theme.fill]}>
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Username</Text>
                                <View style={[theme.input_margin_bottom]}>
                                <CustomInput value={this.state.username} onChangeText={username => this.changeState({username: username.trim()})} onFocus={this.onFocus} maxLength={100} 
                                    style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                /> 
                                </View>
                                <Text style={[theme.caption, theme.gap_2, theme.flex1, theme.padded_label]}>Password</Text>
                                <View 
                                    style={
                                        [theme.SectionStyle, 
                                            {
                                                borderWidth: this.state.borderWidth,
                                                padding: 10,
                                                backgroundColor: this.state.backgroundColor,
                                                
                                                shadowColor: this.state.shadowColor,
                                                shadowOffset: {
                                                    width: this.state.shadowOffset.width,
                                                    height: this.state.shadowOffset.height,
                                                },
                                                shadowOpacity: this.state.shadowOpacity,
                                                shadowRadius: this.state.shadowRadius,
                                                elevation: this.state.elevation
                                            }
                                        ]
                                    }>
                                    <Image source={require('../../../../assets/icons/ic_lock_24px.png')} style={[theme.image_icon]}/>
                                    <TextInput 
                                        value={this.state.password} 
                                        onChangeText={password=> this.changeState({password: password})} 
                                        onFocus={this.onFocus}
                                        onBlur={this.onBlur}
                                        maxLength={100} 
                                        underlineColorAndroid={'transparent'}
                                        style={
                                            [
                                                theme.flex1, 
                                                theme.caption, 
                                                theme.typo_regular, 
                                            ]
                                        } 
                                    />
                                </View> 
                                <Text style={
                                    [
                                        theme.caption_lite, 
                                        theme.typo_bold, theme.font15, 
                                        theme.fill, theme.pad_top15, 
                                        theme.underline, theme.textRight, 
                                        theme.flex1, theme.padded_label, 
                                        theme.margin_top_bottom30
                                    ]
                                }
                                onPress= {() => this.props.navigation.navigate('ForgotPasswordPage')}
                                >Forgot Password ?</Text>
                                
                                <BlackButton button_text='Sign In' handlePress= {this.props.navigation.navigate('Dashboard')}/>
                                <ButtonLink button_text='Sign Up' extraStyles={theme.box_gap12} handlePress={this._navigate} />
                            </View>
                        </View>
                        
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}