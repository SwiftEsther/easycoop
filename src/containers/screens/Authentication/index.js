import React, { Component } from "react";
import { connect, Dispatch } from "react-redux";
import {
  Keyboard,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  View,
  ToastAndroid,
  Alert,
  AsyncStorage
} from "react-native";
import { systemWeights } from "react-native-typography";
import theme from "../../../../assets/styles/globalStyles";
import * as colors from "../../../lib/constants/colors";
import * as constants from "../../../../lib/constants";
import Spinner from "react-native-loading-spinner-overlay";
import { axiosInstance } from "../../../lib/api/axiosClient";
import AuthenticationHeader from "../../../components/AuthenticationHeader";
import "../../../../lib/helpers";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomInput from "../../../components/CustomTextInput/CustomInput";
import Space from "../../../components/Space";
import BlackButton from "../../../components/BlackButton";
import ButtonLink from "../../../components/ButtonLink";
import { recoverPasswordSuccess } from "./actions/forgotpassword.actions";
import { showToast } from "../../../components/Toast/actions/toastActions";
import { forgotPassword } from "../../../lib/api/url";
import SuccessModal from "../../../components/SuccessModal";
import { scaleHeight } from "../../../helpers/scale";

class AuthenticationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        spinner: false,
      spinner: false,
      backgroundColor: "#fdfdfd",
      shadowColor: "#000",
      borderWidth: StyleSheet.hairlineWidth,
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
      success: false,
      successMessage: ""
    };
  }

  changeState = value => {
    this.setState(value);
  };

  signIn = () => this.props.navigation.navigate("Login");

  onhandleForgotPassword = () => {
    const { navigation } = this.props;
    Keyboard.dismiss();
    this.setState(
      {
        spinner: true,
        modalLoader: true
      },
      () => {
        axiosInstance
          .get(forgotPassword, {
            params: { username: navigation.getParam("username", "") }
          })
          .then(res => {
            this.setState({
              spinner: false
            });
            if (res.status === 200) {
              let response = { ...res.data };

              this.props.recoverPasswordSuccess(response);
              this.setState({ success: !this.state.success, successMessage: res.message });
            } else {
              this.props.showToast("Error", "error");
            }
          })
          .catch(error => {
            if (error.response) {
              this.props.showToast(error.response.data.message, "error");
              console.log(error.response);
            } else {
              this.props.showToast(error.message, "error");
            }
            this.setState({
              spinner: false
            });
          });
      }
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={[theme.container]}>
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
        >
          <View style={[theme.screen_pad]}>
            <AuthenticationHeader
              auth={true}
              text="Authentication"
              backFunction={() => navigation.goBack(null)}
            />
            <View style={[theme.margin_left_right_25]}>
              <View style={[theme.box_gap_more, theme.fill]}>
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      marginBottom: scaleHeight(60),
                      flexWrap: "wrap"
                    }}
                  >
                    A message will be sent to your registered email and phone
                    number.{" "}
                  </Text>
                </View>
                <BlackButton
                  button_text="Send Password"
                  handlePress={this.onhandleForgotPassword}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <SuccessModal
          visible={this.state.success}
          _toggleView={() => navigation.navigate("Login")}
          subtitle="Recovery Password Sent"
          message={`${this.state.successMessage}`}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    resetError: state.forgotPassword.error,
    isLoading: state.forgotPassword.loading,
    isPasswordReset: state.forgotPassword.passwordReset
  };
};

const mapDispatchToProps = {
  showToast,
  recoverPasswordSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticationPage);
