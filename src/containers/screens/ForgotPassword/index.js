import React, { Component } from 'react';
import { connect, Dispatch } from "react-redux";
import { Keyboard, StatusBar, StyleSheet, TouchableOpacity, Image, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage } from 'react-native';
import { systemWeights } from 'react-native-typography';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../lib/constants/colors';
import * as constants from '../../../../lib/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import { axiosInstance } from "../../../lib/api/axiosClient";
import AuthenticationHeader from '../../../components/AuthenticationHeader';
import '../../../../lib/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import Space from '../../../components/Space';
import BlackButton from '../../../components/BlackButton';
import ButtonLink from '../../../components/ButtonLink';
import {showToast} from "../../../components/Toast/actions/toastActions";
import {scale,scaleHeight} from '../../../helpers/scale';

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
            this.props.navigation.navigate('AuthenticationPage', {username: this.state.username})
        }
    }

    render() {
        return (
          <SafeAreaView>
            <Spinner
              visible={this.state.spinner}
              size="large"
              color="#000000"
              animation="none"
              overlayColor={"rgba(255, 255, 255, 0.1)"}
            />
            <StatusBar
              translucent={true}
              backgroundColor={colors.white}
              barStyle="dark-content"
            />
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps={"handled"}
              enableOnAndroid={true}
              scrollEnabled={true}
              alwaysBounceVertical={false}
              bounces={false}
            >
              <View style={{ padding: 10 }}>
                <AuthenticationHeader
                  auth={true}
                  text="Forgot Password"
                  backFunction={() => this.props.navigation.goBack(null)}
                />
                <View style={{ marginHorizontal: scale(25) }}>
                  <View style={[theme.box_gap_more, theme.fill]}>
                    <Text
                      style={{
                        fontFamily: "nunito-bold",
                        marginVertical: scaleHeight(16)
                      }}
                    >
                      Force number / AP Number
                    </Text>
                    <View>
                      <CustomInput
                        value={this.state.username}
                        onChangeText={username =>
                          this.changeState({ username: username.trim() })
                        }
                        style={[{ marginBottom: scaleHeight(12) }]}
                      />
                    </View>
                    <Text
                      style={{
                        textAlign: "center",
                        marginBottom: scaleHeight(60),
                        flexWrap: "wrap"
                      }}
                    >
                      {" "}
                    </Text>
                    <BlackButton
                      button_text="Recover Password"
                      handlePress={this.forgotPassword}
                    />
                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </SafeAreaView>
        );
    }
}
