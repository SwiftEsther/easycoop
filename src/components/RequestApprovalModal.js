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
import theme from "../../assets/styles/globalStyles";
import GreenButton from "../components/GreenButton";
import { Icon } from "react-native-elements";
import { connect, Dispatch } from "react-redux";
import { scale, scaleHeight } from "../helpers/scale";
import Spinner from "react-native-loading-spinner-overlay";
import SuccessModal from "./SuccessModal";
import {formatBalance} from '../lib/utils/helpers';
import { showToast } from "./Toast/actions/toastActions";
import { apiRequest } from "../lib/api/api";
import { approveRejectGuarantorRequest } from "../lib/api/url";

class RequestApprovalModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      failure: false,
      subtitle: "",
      smallText: ""
    };
  }

  showSuccess = () => {
    this.props._toggleView();
    this.setState({
      success: !this.state.success
    });
  };

  toggleSuccess = () =>
    this.setState({
      success: !this.state.success
    });

  onhandleRequest =(guarantor, approve)=>{
    console.log(guarantor, approve)
    this.setState(
      {
        spinner: true,
        modalLoader: true
      },
      () => {
        apiRequest(approveRejectGuarantorRequest, "get", {
          params:{
            approve,
          guarantorid: guarantor.id
          }
        })
          .then(res => {
            console.log(res);
            this.setState({
              spinner: false,
              subtitle: `Guarantor Request ${
                approve ? "Successful" : "Declined"
              }`,
              smallText: `A notification would be sent to ${guarantor.requesterFirstName} ${guarantor.requesterLastName}`
            });
            this.showSuccess();
            this.props.reloadRequests();
          })
          .catch(error => {
            console.log("error", error);

            if (error.response) {
              this.props.showToast(error.response.data.message, "error");
              console.log("err", error.response);
            } else {
              this.props.showToast(error.message, "error");
            }
            this.setState({
              spinner: false
            });
          });
      }
    );
  }

  render() {
    return (
      <View>
        <BottomSheet
          visible={this.props.visible}
          onBackButtonPress={this.props._toggleView}
          onBackdropPress={this.props._toggleView}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.icon]}
            onPress={this.props._toggleView}
          >
            <Icon name="close" />
          </TouchableOpacity>
          <Spinner
            visible={this.state.spinner}
            size="large"
            color="#000000"
            animation="none"
            overlayColor={"rgba(0, 0, 0, 0.5)"}
          />
          <View style={styles.bottomNavigationView}>
            <View style={[styles.header]}>
              <Text
                style={[
                  {
                    fontSize: 20,
                    fontFamily: "nunito-bold",
                    marginVertical: scaleHeight(25),
                    paddingLeft: scale(5)
                  }
                ]}
              >
                {`${this.props.action} Request`}
              </Text>
            </View>
            <View style={{ flex: 3 }}>
              {/* <View style={[theme.center, theme.padding_left_right_25]}>
                <Image
                  source={require("../../assets/icons/check_circle.png")}
                  style={[theme.pad_bottom30, { marginTop: scale(10) }]}
                />
                <Text
                  style={[
                    {
                      textAlign: "center",
                      color: "#504e4e",
                      fontFamily: "nunito-medium"
                    }
                  ]}
                >
                  You are about to delete
                  <Text
                    style={{ color: "#f80000" }}
                  >{` ${this.props.itemAction} `}</Text>{" "}
                  while on
                  <Text
                    style={{ color: "#f80000" }}
                  >{` ${this.props.applicationSuccess} `}</Text>
                </Text>
              </View> */}
              <View
                style={{
                  marginTop: scaleHeight(50),
                  marginLeft: scale(9)
                }}
              >
                <Text
                  style={{ fontFamily: "nunito-medium", color: "#504e4e" }}
                >{`You are about to ${this.props.action ||
                  ""} Request to be a Guarantor of`}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: scale(9),
                  paddingVertical: scaleHeight(26.5)
                }}
              >
                <Image source={require("../../assets/icons/man.png")} />
                <View
                  style={{
                    justifyContent: "space-between",
                    flex: 2,
                    marginLeft: scale(23)
                  }}
                >
                  <Text
                    style={{ fontFamily: "nunito-medium", color: "#504e4e" }}
                  >
                    {`${this.props.guarantor.requesterFirstName} ${this.props.guarantor.requesterLastName}`}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "nunito-bold",
                      color: "#138516"
                    }}
                  >
                    {`Loan Amount: ₦${formatBalance(
                      this.props.guarantor.requesterAmount
                    )}`}
                  </Text>
                </View>
              </View>
            </View>
            {this.props.action.toLowerCase() === "approve" && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={() => this.onhandleRequest(this.props.guarantor, true)}
              >
                <GreenButton button_text={`${"Approve"} Request`} />
              </TouchableOpacity>
            )}
            {this.props.action.toLowerCase() === "decline" && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={() =>
                  this.onhandleRequest(this.props.guarantor, false)
                }
              >
                <GreenButton button_text={`${"Decline"} Request`} />
              </TouchableOpacity>
            )}
          </View>
        </BottomSheet>
        <SuccessModal
          visible={this.state.success}
          _toggleView={this.toggleSuccess}
          subtitle={this.state.subtitle || " "}
          smallText={this.state.smallText || " "}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.login,
  };
};

const mapDispatchToProps = {
  showToast,
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "#E0F7FA"
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: height / 1.6,
    justifyContent: "center",
    alignItems: "flex-start",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: scale(8)
  },
  icon: {
    backgroundColor: "#fff",
    borderRadius: 50,
    fontSize: scale(25),
    padding: scale(6),
    top: scaleHeight(150),
    right: 0,
    position: "absolute",
    marginHorizontal: scale(9)
  },
  button: {
    marginTop: scaleHeight(20),
    bottom: 0,
    flex: 1,
    marginHorizontal: scale(20),
    alignSelf: "stretch"
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#efefef",
    flexDirection: "row",
    justifyContent: "flex-start",
    flex: 1,
    alignSelf: 'stretch',
    marginHorizontal: scale(10)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestApprovalModal);
