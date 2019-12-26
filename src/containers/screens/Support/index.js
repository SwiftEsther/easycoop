import React, { Component } from 'react';
import { TextInput, StatusBar, StyleSheet, TouchableOpacity, Image, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage } from 'react-native';
import { systemWeights } from 'react-native-typography';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../lib/constants/colors';
import * as constants from '../../../../lib/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import API from '../../../../lib/api';
import Header from '../../../components/Header';
import '../../../../lib/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import Space from '../../../components/Space';
import {scale, scaleHeight} from '../../../helpers/scale';
import GreenButton from '../../../components/GreenButton';
import ButtonLink from '../../../components/ButtonLink';

export default class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spinner: false,
            message: '',
            subject: ''
        }
    }

    changeState = (value) => {
        this.setState(value);
    }

    render() {
        return (
            <SafeAreaView style={[theme.container]}>
                <Spinner visible={this.state.spinner} size="large" color="#000000" animation="none" overlayColor={'rgba(255, 255, 255, 0.1)'} />
                <StatusBar translucent={true} backgroundColor={colors.white} barStyle="dark-content" />
                <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid={true} scrollEnabled={true} alwaysBounceVertical={false} bounces={false}  style={{backgroundColor: '#fdfdfd'}}>
                    <View style={[theme.screen_pad,{marginTop: scaleHeight(70)}]}>
                        <View>
                            <View style={[theme.fill]}>
                                <Text style={[style.label]}>Subject</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.subject} onChangeText={subject=> this.changeState({subject:subject.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                    /> 
                                </View> 
                                <Text style={[style.label]}>Message</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput multiline={true} numberOfLines={10} scrollEnabled={true} value={this.state.message} onChangeText={message=> this.changeState({message:message.trim()})}
                                             
                                        /> 
                                </View>
                                <GreenButton button_text="Submit Message" handlePress= {() => console.log('reset clicked')}/>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <Header navigation={{...this.props.navigation}}/>
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    link: {
        fontSize: 15,
        ...systemWeights.bold,
        paddingBottom: 16,
        paddingTop: 16,
        marginBottom: 28
    },
    primary: {
        paddingRight: 38,
        paddingLeft: 38,
    },
    secondary: {
        paddingRight: 44,
        paddingLeft: 44
    },
    label: {
        fontFamily: 'nunito-medium',
        marginVertical: scaleHeight(16)
    }
});
