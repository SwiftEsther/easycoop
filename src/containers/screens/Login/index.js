import React, { Component } from 'react';
import { connect, Dispatch } from "react-redux";
import {
    TextInput,
    StatusBar,
    StyleSheet,
    Image,
    SafeAreaView,
    Text,
    View,
    Keyboard,
} from 'react-native';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../lib/constants/colors';
import AuthenticationHeader from '../../../components/AuthenticationHeader';
import Spinner from 'react-native-loading-spinner-overlay';
import '../../../../lib/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import CustomInputWithIcon from '../../../components/CustomTextInput/CustomInputWIthIcon';
import BlackButton from '../../../components/BlackButton';
import ButtonLink from '../../../components/ButtonLink';
import base64 from 'base-64';
import { scale, scaleHeight } from '../../../helpers/scale';
import { axiosInstance } from "../../../lib/api/axiosClient";
import { postLogIn } from "../../../lib/api/url";
import {showToast} from "../../../components/Toast/actions/toastActions";
import {loginSuccess} from "./actions/login.actions";


class Login extends Component {
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
            this.props.showToast('Kindly enter your username and password', 'error')
        } else {
            this.onhandleLogin()
        }
    }

    onhandleLogin = () => {
        Keyboard.dismiss();
        let {username, password} = this.state;

        console.log(postLogIn)
        this.setState({
            spinner: true,
            modalLoader: true
        }, () => {
            axiosInstance
                .get(postLogIn, {
                        headers: {
                            Authorization: `Basic ${base64.encode(username + ":" + password)}`,
                        },
                        params: {},
                        data: null
                    }
                )
                .then(res => {
                    // this.props.clearUserData();
                    // this.props.resetCache();
                    // this.props.clearLoanDetails();
                    // token = res.data.data.token;
                    console.log(res)
                    this.setState({
                        spinner: false,
                    })
                    if (res.status === 200) {
                        // this.storeToken(token);
                        let userData = {...res.data};
                        userData.password = password;

                        this.props.loginSuccess(userData);
                        this.props.showToast('Successfully logged in', 'success');
                        this.props.navigation.navigate('Dashboard')
                    } else {
                        this.props.showToast('Error', 'error');
                    }

                })
                .catch(error => {

                    if (error.response) {
                        this.props.showToast(error.response.data.message, 'error')
                        console.log(error.response)
                    } else {
                        this.props.showToast(error.message, 'error')
                    }
                    this.setState({
                        spinner: false,
                    })
                });
        })
    };

    onFocus() {
        this.setState({
            backgroundColor: '#fff',
            borderWidth: 0,
            shadowColor: "rgba(141, 141, 141, 0.23)",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.8,
            shadowRadius: 30,
            elevation: scale(2)
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
          <SafeAreaView>
            <Spinner
              visible={this.state.spinner}
              size="large"
              color="#000000"
              animation="none"
              overlayColor={"rgba(0, 0, 0, 0.5)"}
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
                  text="Sign In"
                  backFunction={() => this.props.navigation.goBack(null)}
                />
                <View style={{ marginHorizontal: scale(25) }}>
                  <View style={[]}>
                    <Text
                      style={{
                          fontFamily: "nunito-bold",
                          marginVertical: scaleHeight(16)
                      }}
                    >
                      Username
                    </Text>
                    <View>
                      <CustomInput
                        value={this.state.username}
                        onChangeText={username =>
                          this.changeState({ username: username.trim() })
                        }
                        onFocus={this.onFocus}
                        maxLength={100}
                        style={[{marginBottom: scaleHeight(12)}]}
                      />
                    </View>
                    <Text style={{fontFamily: "nunito-bold",
                          marginVertical: scaleHeight(16)}}
                      
                    >
                      Password
                    </Text>
                    <CustomInputWithIcon
                        value={this.state.username}
                        onChangeText={username =>
                          this.changeState({ username: username.trim() })
                        }
                        onFocus={this.onFocus}
                        maxLength={100}
                        style={[{marginBottom: scaleHeight(12)}]}
                      />
                    {/* <View
                      style={[
                        theme.SectionStyle,
                        {
                          borderWidth: this.state.borderWidth,
                          borderColor: "#868686",
                          padding: 10,
                          backgroundColor: this.state.backgroundColor,

                          shadowColor: this.state.shadowColor,
                          shadowOffset: {
                            width: this.state.shadowOffset.width,
                            height: this.state.shadowOffset.height
                          },
                          shadowOpacity: this.state.shadowOpacity,
                          shadowRadius: this.state.shadowRadius,
                          elevation: this.state.elevation
                        }
                      ]}
                    >
                      <Image
                        source={require("../../../../assets/icons/ic_lock_24px.png")}
                        style={[theme.image_icon]}
                      />
                      <TextInput
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={password =>
                          this.changeState({ password: password })
                        }
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        maxLength={scale(100)}
                        underlineColorAndroid={"transparent"}
                        style={[
                          {
                              flex: 1,
                          marginBottom: scaleHeight(12),
                            color: "#9f9f9f",
                            fontFamily: "nunito-regular"
                          }
                        ]}
                      />
                    </View> */}
                    <Text
                      style={[
                        {
                          color: "#707070",
                          fontFamily: "nunito-bold",
                          marginVertical: scaleHeight(20),
                          alignSelf: 'flex-end',
                          borderBottomWidth: 1,
                          borderBottomColor: '#707070'
                        },
                      ]}
                      onPress={() =>
                        this.props.navigation.navigate("ForgotPasswordPage")
                      }
                    >
                      Forgot Password ?
                    </Text>

                    <BlackButton
                      button_text="Sign In"
                      handlePress={this.validate}
                    />
                    <ButtonLink
                      button_text="Sign Up"
                      extraStyles={theme.box_gap12}
                      handlePress={this._navigate}
                    />
                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginError: state.login.error,
        isLoading: state.login.loading,
        isLoggedIn: state.login.isLoggedIn
    };
};

const mapDispatchToProps = {
    showToast,
    loginSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
