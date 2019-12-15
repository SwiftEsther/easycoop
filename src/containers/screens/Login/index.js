import React, { Component } from 'react';
import { TextInput, StatusBar, StyleSheet, AsyncStorage, TouchableOpacity, Image, SafeAreaView, Text, View } from 'react-native';
import { systemWeights } from 'react-native-typography';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../../assets/styles/colors';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import {Space} from '../../../components/Space';
import BlackButton from '../../../components/BlackButton';

export default class index extends Component {
    constructor(props) {
        super(props);

        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);

        this.state = {
            email: '',
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
                    <View style={[theme.screen_pad, theme.gap_6]}>
                        <View style={[theme.sign_up_header, theme.box_gap_more]}>
                            <Text style={[theme.sign_up_header_text, theme.typo_bold]}>SignIn</Text>
                            <Image source={require('../../../../assets/icons/Group.png')} />
                        </View>
                        <View style={[theme.box_gap_more, theme.fill]}>
                            <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Username</Text>
                            <View style={[theme.input_margin_bottom]}>
                                <CustomInput value={this.state.email} onChangeText={email => this.changeState({email: email.trim()})} onFocus={this.onFocus} maxLength={100} 
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
                            onPress= {() => console.log('Forgot Password clicked')}
                            >Forgot Password ?</Text>
                            
                            <BlackButton button_text='Sign In' handlePress= {() => console.log('Sign clicked')}/>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}