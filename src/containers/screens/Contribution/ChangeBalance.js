import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Text,
  Button,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { BottomSheet } from "react-native-btr";
import theme from "../../../../assets/styles/globalStyles";
import GreenButton from "../../../components/GreenButton";
import { Icon } from "react-native-elements";
import { scale, scaleHeight } from "../../../helpers/scale";
import CustomInput from "../../../components/CustomTextInput/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SuccessModal from "../../../components/SuccessModal";
import FailureModal from "../../../components/FailureModal";
import Spinner from "react-native-loading-spinner-overlay";
import { formatBalance } from "../../../lib/utils/helpers";
import { apiRequest } from "../../../lib/api/api";
import Toast from "../../../components/Toast/Toast";
import Modal from "react-native-modal";

import { updateContributionAmount } from "../../../lib/api/url";

export default class ChangeBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      success: false,
      failure: false,
      failureMessage: "",
      successMessage: ""
    };
  }

  showRequestFailure = () => {
    this.props._toggleView();
    this.setState({
      failure: !this.state.failure
    });
  };

  showRequestSuccess = () => {
    this.props._toggleView();
    this.setState({
      success: !this.state.success
    });
  };

  toggleRequest = () =>
    this.setState({
      success: !this.state.success
    });

  toggleFailure = () =>{
    this.props._toggleView();
    this.setState({
      failure: !this.state.failure
    });
  }
    

  changeState = value => {
    this.setState(value);
  };

  validate = async () => {
    if(this.state.amount <= 0) {
      this.setState({
        showToast: true,
        toastMessage: "Kindly enter a valid amount"
      });
    }
    else {
      this.onhandleUpdateAmount();
    }
  }

  onhandleUpdateAmount = () => {
    const { user } = this.props;
    this.setState(
      {
        spinner: true,
        modalLoader: true
      },
      () => {
        apiRequest(updateContributionAmount, "get", {
          params: {
            memberid: user.id,
            contributionamount: this.state.amount,
            notitificationcode: "",
            requirementcode: "UCA"
          }
        })
          .then(res => {
            this.setState({
              spinner: false
            });
            if (res) {
              console.log(res);
              this.setState({ amount: 0, successMessage: res.message });
              this.showRequestSuccess();
            } else {
              this.showRequestFailure();
            }
          })
          .catch(error => {
            if (error.response) {
              this.setState({failureMessage: error, amount:0})
              this.showRequestFailure();
              console.log("error response",error);
            } else {
              this.showRequestFailure();
            }
            this.setState({
              spinner: false
            });
          });
      }
    );
  };

  render() {
    const { width, height } = Dimensions.get("window");
    const { data } = this.props;
    return (
      <SafeAreaView>
        <Spinner
          visible={this.state.spinner}
          size="large"
          color="#000000"
          animation="none"
          overlayColor={"rgba(0, 0, 0, 0.5)"}
        />

          <Modal
              // animationType={"fade"}
              // transparent={true}
              // onRequestClose={this.closeModal}
              // onSwipe={() => this.closeModal()}
              // swipeDirection="down"

              // avoidKeyboard={true}
              animationIn={'slideInUp'}
              onBackdropPress={this.props._toggleView}
              isVisible={this.props.visible}
              style={{margin: 0}}
          >
              <View
                  style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      position: "absolute",
                      width:'100%',
                      zIndex:999999,
                      top: scale(80),
                      // top: -30,
                      // right: 0,
                  }}
              >
                  <TouchableOpacity activeOpacity={0.7} onPress={this.props.back}>
                      <Text
                          style={[
                              {
                                  color: "#fff",
                                  fontFamily: "nunito-bold",
                                  fontSize: 20,
                                  marginTop: scaleHeight(5),
                                  paddingVertical: scale(10),
                                  paddingHorizontal: scale(10)
                              }
                          ]}
                      >
                          Back
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      activeOpacity={0.7}
                      style={[{
                          paddingVertical: scale(9),
                          paddingHorizontal: scaleHeight(15)
                      },styles.icon]}
                  >
                      <Icon
                          name="close"
                          // iconStyle={[styles.icon]}
                          onPress={this.props._toggleView}
                      />
                  </TouchableOpacity>
              </View>
        {/*<BottomSheet*/}
          {/*visible={this.props.visible}*/}
          {/*onBackButtonPress={this.props._toggleView}*/}
        {/*>*/}
              <KeyboardAwareScrollView
                  keyboardShouldPersistTaps={"handled"}
                  enableOnAndroid={true}
                  scrollEnabled={true}
                  alwaysBounceVertical={false}
                  bounces={false}
                  contentContainerStyle={{
                      borderTopLeftRadius: scale(10),
                      borderTopRightRadius: scale(10),
                  }}
                  style={{
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      top: scale(150),
                      borderTopLeftRadius: scale(10),
                      borderTopRightRadius: scale(10),
                      backgroundColor: "white",
                  }}
              >

          {this.state.showToast && (
            <Toast
              message={this.state.toastMessage}
              type="error"
              onClickHandler={() => this.setState({ showToast: false })}
            />
          )}
          <View style={styles.bottomNavigationView}>
            <View
              style={[
                theme.container,
                styles.MainContainer,
                styles.header,
                { marginVertical: scaleHeight(20) }
              ]}
            >
              <Text
                style={{
                  width: width - 20,
                  paddingLeft: scale(20),
                  fontSize: 20,
                  fontFamily: "nunito-bold"
                }}
              >
                Change Savings Balance
              </Text>
            </View>
            <View
              style={[
                theme.container,
                styles.MainContainer,
                {
                  alignItems: "flex-start",
                  marginBottom: scaleHeight(50),
                  marginLeft: scale(20),
                  flex: 4
                }
              ]}
            >
              <View>
                <Text
                  style={{
                    color: "#138516",
                    fontFamily: "nunito-regular"
                  }}
                >
                  Present Voluntary Savings Amount
                </Text>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      marginVertical: scaleHeight(10)
                    }
                  ]}
                >
                  {/* <Icon name="naira"/> */}
                  <Text
                    style={{
                      fontFamily: "nunito-bold",
                      fontSize: 20,
                      color: "#575757"
                    }}
                  >{`₦${data.voluntaryBalance}`}</Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, { flex: 1 }]}>
                  Enter New Contribution Amount
                </Text>
                <View style={[styles.input, { width: width - 110, flex: 2 }]}>
                  <CustomInput
                    value={this.state.amount}
                    keyboardType="number-pad"
                    onChangeText={amount => this.changeState({ amount })}
                    style={[{ borderColor: "#d0d0d0" }]}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.buttons]}
              onPress={this.validate}
            >
              <GreenButton button_text="Submit Request" />
            </TouchableOpacity>
          </View>
              </KeyboardAwareScrollView>
        {/*</BottomSheet>*/}
          </Modal>
        <SuccessModal
          visible={this.state.success}
          _toggleView={this.toggleRequest}
          subtitle="Request Submitted Successfully"
          smallText={`${this.state.successMessage}`}
        />
        <FailureModal
          visible={this.state.failure}
          _toggleView={this.toggleFailure}
          subtitle="Request Submission Failed"
          smallText={`${this.state.failureMessage}`}
        />
      </SafeAreaView>
    );
  }
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#efefef",
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    // height: height / 1.4,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: scale(5)
  },
  bareIcon: {
    color: "#138516",
    borderRadius: 50,
    fontSize: scale(25),
    padding: scale(6),
    top: scaleHeight(-105),
    right: 0,
    position: "absolute"
  },
  icon: {
    borderRadius: 50,
    fontSize: 25,
    padding: 6,
      color: "#138516",
    backgroundColor: "#f5f5f5"
  },
  back: {},
  buttons: {
    flex: 2,
    alignSelf: "stretch",
    justifyContent: "center",
    marginHorizontal: scale(30),
    marginBottom: 30
  },
  link: {
    flex: 1,
    alignSelf: "stretch",
    alignContent: "center",
    paddingHorizontal: scale(15),
    paddingVertical: scaleHeight(20),
    fontSize: 12
  },
  input: {
    marginBottom: scaleHeight(12)
    // marginRight: scale(40)
  },
  label: {
    fontFamily: "nunito-bold",
    marginVertical: scaleHeight(20)
  }
});
