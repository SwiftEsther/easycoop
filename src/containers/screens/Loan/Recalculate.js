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
import { formatBalance } from "../../../lib/utils/helpers";
import { apiRequest } from "../../../lib/api/api";
import { updateContributionAmount } from "../../../lib/api/url";
import { Toast } from "../../../components/Toast/Toast";

export default class Recalculate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      success: false,
      failure: false
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

  toggleFailure = () =>
    this.setState({
      failure: !this.state.failure
    });

  changeState = value => {
    this.setState(value);
  };

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
              console.log(res.data);
              this.showRequestSuccess();
            } else {
              this.showRequestFailure();
            }
          })
          .catch(error => {
            if (error.response) {
              this.showRequestFailure();
              console.log(error.response);
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

  validate = async () => {
    if (this.state.amount <= 0 || this.state.amount>1000000000) {
      console.log("Kindly enter a valid amount between ₦100 and ₦1,000,000,000");
    }
    this.onhandleUpdateAmount();
  };

  render() {
    const { width, height } = Dimensions.get("window");
    const { data } = this.props;
    return (
      <SafeAreaView>
        <BottomSheet
          visible={this.props.visible}
          onBackButtonPress={this.props._toggleView}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
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
                Recalculate
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                paddingVertical: scale(9),
                paddingHorizontal: scaleHeight(15)
              }}
            >
              <Icon
                name="close"
                iconStyle={[styles.icon]}
                onPress={this.props._toggleView}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomNavigationView}>
            <View
              style={[
                styles.MainContainer,
                styles.header,
                {
                  marginVertical: scaleHeight(20),
                  paddingBottom: scaleHeight(10)
                }
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
                Loan Schedule
              </Text>
            </View>
            <ScrollView style={{ alignSelf: "stretch" }}>
              <View
                style={{
                  paddingHorizontal: scale(14),
                  backgroundColor: "#f7f7f7",
                  alignSelf: "stretch"
                }}
              >
                <View>
                  <Text
                    style={[
                      styles.bold_text,
                      { marginVertical: scale(12), color: "#138516" }
                    ]}
                  >
                    Month 1
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", marginVertical: scale(12) }}
                >
                  <Text
                    style={[
                      styles.bold_text,
                      { marginRight: scale(11), color: "#827e7e" }
                    ]}
                  >
                    Principal Amount:
                  </Text>
                  <Text style={styles.bold_text}>₦100,000,000</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: scale(12),
                    color: "#827e7e"
                  }}
                >
                  <Text
                    style={[
                      styles.bold_text,
                      { marginRight: scale(11), color: "#827e7e" }
                    ]}
                  >
                    Monthly Payable:
                  </Text>
                  <Text style={styles.bold_text}>#100,000,000</Text>
                </View>
                <View
                  style={{ flexDirection: "row", marginVertical: scale(12) }}
                >
                  <Text
                    style={[
                      styles.bold_text,
                      { marginRight: scale(11), color: "#827e7e" }
                    ]}
                  >
                    Outstanding Balance:
                  </Text>
                  <Text style={styles.bold_text}>₦100,000,000</Text>
                </View>
                <View
                  style={{ flexDirection: "row", marginVertical: scale(12) }}
                >
                  <Text
                    style={[
                      styles.bold_text,
                      {
                        marginRight: scale(11),
                        color: "#827e7e"
                      }
                    ]}
                  >
                    Interest Rate:
                  </Text>
                  <Text style={[styles.bold_text, { color: "#138516" }]}>
                    10%
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </BottomSheet>
      </SafeAreaView>
    );
  }
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  MainContainer: {
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: 'nunito-bold',
    paddingTop: Platform.OS === "ios" ? 20 : 0
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#efefef",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    height: height / 1.2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: scale(5)
  },
  icon: {
    borderRadius: 50,
    fontSize: 25,
    padding: 6,
    color: "#138516",
    backgroundColor: "#f5f5f5"
  },
  link: {
    flex: 1,
    alignSelf: "stretch",
    alignContent: "center",
    paddingHorizontal: scale(15),
    paddingVertical: scaleHeight(20),
    fontSize: 12
  },
  bold_text: {
    fontFamily: "nunito-bold" 
  },
});
