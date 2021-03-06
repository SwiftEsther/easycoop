import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Platform,
  Text,
  Button,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { BottomSheet } from "react-native-btr";
import { connect, Dispatch } from "react-redux";
import theme from "../../../../assets/styles/globalStyles";
import { Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { scale, scaleHeight } from "../../../helpers/scale";
import { systemWeights } from "react-native-typography";
import ChangeBalance from "./ChangeBalance.js";
import ViewRequest from "./ViewRequest";
import { showToast } from "../../../components/Toast/actions/toastActions";
import {formatBalance} from '../../../lib/utils/helpers';
import { apiRequest } from "../../../lib/api/api";
import { getCurrentBalance } from "../../../lib/api/url";
import { getMemberBalancesSuccess } from "./actions/balances.actions";

class Contributions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showChangeBalance: false,
      request: false,
      voluntaryBalance: 0,
      compulsoryBalance: 0,
      walletBalance: null,
      targetSavingsBalance: null,
      sharesBalance: null,
      totalBalance: 0,
      shareUnitPrice: null,
      shareValue: null,
      balanceAsAt: "",
      toastMessage: "",
      currentBalance: 0
    };
  }

  showChangeForm = () => {
    // this.props._toggleView();
    this.setState({
      showChangeBalance: !this.state.showChangeBalance
    });
  };

  componentDidUpdate(prevProps, prevState){
    console.log(prevProps.visible)
    console.log(this.props.visible)
  }

  changeSavings = () => {
    this.setState({
      showChangeBalance: !this.state.showChangeBalance
    });
  };

  ongetCurrentBalance = () => {
    const {userData} = this.props;
    this.setState(
      {
        spinner: true,
        modalLoader: true
      },
      () => {
        apiRequest(getCurrentBalance, "get", {
            params: {memberid: userData.id}
        })
          .then(res => {
            this.setState({
              spinner: false
            });
            if (res) {
              console.log(res);
              this.setState({ currentBalance: res.voluntaryBalance });
              this.props.showToast(
                "Successfully fetched current balance",
                "success"
              );
            } else {
              this.props.showToast("Error", "error");
            }
          })
          .catch(error => {
            this.setState({
              spinner: false
            });
            if (error.response) {
              this.props.showToast(error.response.data.message, "error");
              console.log(error.response);
            } else {
              this.props.showToast(error, "error");
            }
          });
      }
    );
  };

  componentDidMount() {
    this.ongetCurrentBalance();
  }

  showRequest = () => {
    this.props._toggleView();
    this.setState({
      request: !this.state.request
    });
  };

  editRequest = () => {
    this.setState({
      request: !this.state.request
    });
  };

  render() {
    const {data, userData} = this.props;
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        enableOnAndroid={true}
        scrollEnabled={true}
        alwaysBounceVertical={false}
        bounces={false}
      >
        <BottomSheet
          visible={this.props.visible}
          onBackButtonPress={this.props._toggleView}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
                {
                    flexDirection: "row",
                    // justifyContent: "flex-end",
                    alignSelf:'flex-end',
                    marginBottom:scale(10),
                    marginRight:scale(10),
                    // paddingBottom: 10,
                    // paddingRight: 10
                },
                styles.icon
            ]}
          >
            <Icon
              name="close"
              onPress={this.props._toggleView}
            />
          </TouchableOpacity>
          <View style={styles.bottomNavigationView}>
            <View
              style={[
                theme.container,
                styles.MainContainer,
                styles.header,
                { marginVertical: scaleHeight(20), paddingBottom:scale(20) }
              ]}
            >
              <Image source={require("../../../../assets/icons/wallet.png")} />
              <Text
                style={[
                  {
                    width: width - 80,
                    paddingLeft: scale(20),
                    // paddingVertical: scaleHeight(15),
                    fontFamily: "nunito-bold",
                    fontSize: 20
                  }
                ]}
              >
                Contributors Balance
              </Text>
            </View>
            <View
              style={[
                theme.container,
                styles.MainContainer,
                {
                  alignItems: "flex-start",
                  justifyContent: "space-around",
                  flex: 6
                }
              ]}
            >
              <View style={{ paddingVertical: scaleHeight(10) }}>
                <Text
                  style={[
                    {
                      marginHorizontal: scaleHeight(20),
                      color: "#138516",
                      fontFamily: "nunito-regular"
                    }
                  ]}
                >
                  Mandatory Savings
                </Text>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      marginVertical: scaleHeight(10),
                      marginHorizontal: scale(20),
                      fontFamily: "Serif"
                    }
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: "nunito-bold",
                      fontSize: 20,
                      color: "#575757"
                    }}
                  >{`₦${formatBalance(data.compulsoryBalance)}`}</Text>
                </View>
              </View>
              <View style={{ paddingVertical: scaleHeight(10) }}>
                <Text
                  style={[
                    {
                      marginHorizontal: scaleHeight(20),
                      color: "#138516",
                      fontFamily: "nunito-regular"
                    }
                  ]}
                >
                  Voluntary Savings
                </Text>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      marginVertical: scaleHeight(10),
                      marginHorizontal: scale(20)
                    }
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: "nunito-bold",
                      fontSize: 20,
                      color: "#575757"
                    }}
                  >{`₦${formatBalance(this.state.currentBalance)}`}</Text>
                </View>
              </View>
            </View>
            <View style={[styles.buttons]}>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.link,
                    {
                      backgroundColor: "#fff",
                      paddingHorizontal: scale(10),
                      fontFamily: "nunito-medium"
                    }
                  ]}
                >
                  Request to change Voluntary Savings Amount
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{ flex: 1, backgroundColor: "#138516" }}
                onPress={this.showChangeForm}
              >
                <Text
                  style={[
                    styles.link,
                    {
                      color: "#fff",
                      textAlign: "center",
                      fontFamily: "nunito-medium"
                    }
                  ]}
                >
                  Make / View Request
                </Text>
              </TouchableOpacity>
            </View>
              <ChangeBalance
                  visible={this.state.showChangeBalance}
                  _toggleView={this.changeSavings}
                  userData={userData}
                  back={this.showChangeForm}
                  data={data}
                  user={userData}
              />
          </View>
        </BottomSheet>
        {/* <ViewRequest visible={this.state.request} _toggleView={this.editRequest} back={this.showRequest}/> */}
      </KeyboardAwareScrollView>
    );
  }
}

export default Contributions;

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
    alignSelf: "center",
    flex: 1,
    paddingVertical: 20
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    height: height / 1.6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: scale(5),
    fontFamily: "nunito-regular"
  },
  icon: {
    borderRadius: 50,
    fontSize: 25,
    padding: 6,
    color: "#138516",
    backgroundColor: "#f5f5f5"
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scaleHeight(25),
    flex: 2,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#efefef"
  },
  link: {
    alignSelf: "center",
    alignContent: "center",
    paddingVertical: scaleHeight(20),
    fontSize: 12
  }
});
