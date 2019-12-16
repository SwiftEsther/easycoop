import React, { Component } from 'react';
import { TextInput, StatusBar, StyleSheet, TouchableOpacity, Image, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage } from 'react-native';
import { systemWeights } from 'react-native-typography';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../../assets/styles/colors';
import * as constants from '../../../../lib/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import API from '../../../../lib/api';
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

        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);

        this.state = {
            action: '',
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
        this.setState({action: 'Next'});
    }

    changeState = (value) => {
        this.setState(value);
    }

    redirect = (_stage) => {
        if(_stage === "LOGGEDIN") {
          this.props.navigation.navigate('Dashboard');
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
                    <View style={[theme.screen_pad, theme.gap_3]}>
                        <Image source={require('../../../../assets/icons/back_24px.png')} />
                        <View style={[theme.margin_left_right_25]}>
                            <View style={[theme.sign_up_header, theme.box_gap_more]}>
                                <Text style={[theme.sign_up_header_text, theme.typo_bold]}>Sign Up</Text>
                                <Image source={require('../../../../assets/icons/Group.png')} />
                            </View>
                            <View style={[theme.box_gap_more, theme.fill]}>
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Username</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.username} onChangeText={username => this.changeState({username: username.trim()})} onFocus={this.onFocus} maxLength={100} 
                                        style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                    /> 
                                </View> 
                                
                                <BlackButton button_text="Next" handlePress= {() => console.log('Next clicked')}/>
                            </View>
                        </View>
                        
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}