import React, { Component } from 'react';
import { TextInput, StatusBar, StyleSheet, TouchableOpacity, Image, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage } from 'react-native';
import { systemWeights } from 'react-native-typography';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../lib/constants/colors';
import * as constants from '../../../../lib/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import API from '../../../../lib/api';
import {RESET_PASSWORD} from '../../../../lib/constants';
import AuthenticationHeader from '../../../components/AuthenticationHeader';
import '../../../../lib/helpers';
import Header from '../../../components/Header';
import {showToast} from "../../../components/Toast/actions/toastActions";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import Space from '../../../components/Space';
import GreenButton from '../../../components/GreenButton';
import {scale, scaleHeight} from '../../../helpers/scale';
import {AntDesign} from '@expo/vector-icons';

export default class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spinner: false,
            notifications: []
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
                <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid={true} scrollEnabled={true} alwaysBounceVertical={false} bounces={false}  style={{backgroundColor: '#fdfdfd', paddingHorizontal: scale(18)}}>
                    <View>
                        <View style={{marginTop: scaleHeight(100)}}>
                            <Text style={{color: '#138516', fontFamily: 'nunito-bold'}}>Notifications</Text>
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
    pageheader: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: scale(18),
        paddingVertical: scaleHeight(18),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        alignSelf: 'flex-end',
        marginRight: scale(30)
    },
    input: {
        marginBottom: scaleHeight(12),
        marginRight: scale(40)
    },
    label: {
        fontFamily: 'nunito-bold',
        marginVertical: scaleHeight(16)
    }
});
