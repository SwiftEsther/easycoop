import React, { Component } from "react";
import {
  TextInput,
  Picker,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Text,
  View,
  ToastAndroid,
  Alert,
  AsyncStorage,
  Button
} from "react-native";
import { systemWeights } from "react-native-typography";
import theme from "../../../../assets/styles/globalStyles";
import Spinner from "react-native-loading-spinner-overlay";
import { SIGN_UP } from "../../../../lib/constants";
import style from "./style";
import "../../../../lib/helpers";
import Header from "../../../components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomInput from "../../../components/CustomTextInput/CustomInput";
import { Icon } from "react-native-elements";
import { scale, scaleHeight } from "../../../helpers/scale";
import { AntDesign } from "@expo/vector-icons";
import {updateKinInfoSuccess, getKinInfoSuccess} from "./actions/nextOfKin.actions";
import { apiRequest } from "../../../lib/api/api";
import { connect, Dispatch } from "react-redux"; 
import { showToast } from "../../../components/Toast/actions/toastActions";
import { getKinDetails, postKinInfo } from '../../../lib/api/url';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
        spinner: true,
        modalLoader: true,
      kins: [
        {
          accountClosed: false,
          accountCreationDate: "2019-12-21",
          accountNumber: "445563535",
          accountSuspended: false,
          addressLine1: "getgtgegegyt",
          addressLine2: "",
          addressLine3: "",
          alternateEmailAddress: "0",
          alternatePhoneNumber: "0",
          bank: "ABBEY MORTGAGE BANK",
          bankId: 1,
          bankVerificationNumber: "353454532",
          branchId: null,
          contributionAmount: 0,
          contributionWithdrawalCount: null,
          cooperative: "Nigeria Police Cooperative Society",
          cooperativeCode: "POLCOOP",
          cooperativeId: 2,
          cooperativeMembershipNumber: 0,
          country: "Nigeria",
          dateOfBirth: "2019-12-01",
          emailAddress: "estherakinloose@gmail.com",
          error: "",
          firstName: "esther",
          firstTime: false,
          forceNo: null,
          gender: null,
          genderId: 2,
          hasEmailAddress: true,
          hasPhoneNumber: true,
          hasSecurityQuestions: false,
          id: 4742427,
          ippisNo: "245522",
          isAccountModuleAdmin: false,
          isCooperativeAdmin: false,
          isLoggedIn: true,
          isSystemAdmin: false,
          lastLoginDate: "2019-12-26",
          lastName: "akinloose",
          lga: "",
          loading: false,
          locked: false,
          middleName: "",
          occupation: "",
          participating: true,
          password: "Pa$$w0rd",
          payPoint: null,
          phoneNumber: "+234893545334",
          state: "Abia",
          stateId: 1,
          systemAdminPosition: "",
          username: "esther.a",
          yearlyIncome: 0
        },
        {
          accountClosed: false,
          accountCreationDate: "2019-12-21",
          accountNumber: "445563535",
          accountSuspended: false,
          addressLine1: "getgtgegegyt",
          addressLine2: "",
          addressLine3: "",
          alternateEmailAddress: "0",
          alternatePhoneNumber: "0",
          bank: "ABBEY MORTGAGE BANK",
          bankId: 1,
          bankVerificationNumber: "353454532",
          branchId: null,
          contributionAmount: 0,
          contributionWithdrawalCount: null,
          cooperative: "Nigeria Police Cooperative Society",
          cooperativeCode: "POLCOOP",
          cooperativeId: 2,
          cooperativeMembershipNumber: 0,
          country: "Nigeria",
          dateOfBirth: "2019-12-01",
          emailAddress: "estherakinloose@gmail.com",
          error: "",
          firstName: "esther",
          firstTime: false,
          forceNo: null,
          gender: null,
          genderId: 2,
          hasEmailAddress: true,
          hasPhoneNumber: true,
          hasSecurityQuestions: false,
          id: 4742427,
          ippisNo: "245522",
          isAccountModuleAdmin: false,
          isCooperativeAdmin: false,
          isLoggedIn: true,
          isSystemAdmin: false,
          lastLoginDate: "2019-12-26",
          lastName: "akinloose",
          lga: "",
          loading: false,
          locked: false,
          middleName: "",
          occupation: "",
          participating: true,
          password: "Pa$$w0rd",
          payPoint: null,
          phoneNumber: "+234893545334",
          state: "Abia",
          stateId: 1,
          systemAdminPosition: "",
          username: "esther.a",
          yearlyIncome: 0
        }
      ]
    };
  }

  changeState = value => {
    this.setState(value);
  };

componentDidMount () {
const {userData} = this.props;
this.setState({
    spinner: true,
    modalLoader: true
},
 () => {
    apiRequest(getKinDetails, 'get', {params: {memberid: userData.id}})
        .then(res => {
            console.log(res);
            let joined = this.state.kins.concat(res);
            this.setState({ spinner: false,kins: joined });
            this.props.getKinInfoSuccess(res);
        this.props.showToast('Next of Kin fetched Successfully', 'success');
        })
        .catch(error => {
            console.log(error.response)
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
}

  addKin = () => {
      var joined = this.state.kins.concat({});
      this.setState({ kins: joined });
  }

  render() {
    const genders = [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" }
    ];
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
          backgroundColor="#fff"
          barStyle="dark-content"
        />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"handled"}
          enableOnAndroid={true}
          scrollEnabled={true}
          alwaysBounceVertical={false}
          bounces={false}
        >
          <View style={{ marginTop: scaleHeight(70) }}>
            <View style={[style.pageheader]}>
              <Text>Next of Kin</Text>
              <AntDesign
                name="caretup"
                size={scale(15)}
                color="#138516"
                style={style.icon}
              />
            </View>
            <View style={[style.Container]}>
              {this.state.kins && this.state.kins.map((kin, index) => (
                <View style={[style.fieldContainer]}>
                  <View>
                    <Text style={[style.label]}>First Name</Text>
                    <View style={[style.input]}>
                      <CustomInput
                        value={kin.firstName}
                        onChangeText={firstName =>
                          this.changeState({ firstName: firstName.trim() })
                        }
                      />
                    </View>
                    <Text style={[style.label]}>Last Name</Text>
                    <View style={[style.input]}>
                      <CustomInput
                        value={kin.lastName}
                        onChangeText={lastName =>
                          this.changeState({ lastName: lastName.trim() })
                        }
                      />
                    </View>
                    <Text style={[style.label]}>Gender</Text>
                    <View
                      style={[
                        style.input,
                        { borderWidth: StyleSheet.hairlineWidth }
                      ]}
                    >
                      <Picker
                        selectedValue={kin.gender}
                        onValueChange={gender =>
                          this.changeState({ gender: gender })
                        }
                      >
                        <Picker.Item label="---None---" value="" />
                        {genders.map((item, index) => (
                          <Picker.Item
                            key={index}
                            label={item.label}
                            value={item.value}
                          />
                        ))}
                      </Picker>
                    </View>
                    <Text style={[style.label]}>Email Address</Text>
                    <View style={[style.input]}>
                      <CustomInput
                        value={kin.emailAddress}
                        onChangeText={emailAddress =>
                          this.changeState({
                            emailAddress: emailAddress.trim()
                          })
                        }
                      />
                    </View>
                    <Text style={[style.label]}>Phone Number</Text>
                    <View style={[style.input]}>
                      <CustomInput
                        value={kin.phoneNumber}
                        onChangeText={phoneNumber =>
                          this.changeState({ phoneNumber: phoneNumber })
                        }
                      />
                    </View>
                    <Text style={[style.label]}>Residential Address</Text>
                    <View style={[style.input]}>
                      <CustomInput
                        value={kin.residentialAddress}
                        onChangeText={residentialAddress =>
                          this.changeState({
                            residentialAddress: residentialAddress
                          })
                        }
                      />
                    </View>
                    <Text style={[style.label]}>Relationship</Text>
                    <View style={[style.input]}>
                      <CustomInput
                        value={kin.relationship}
                        onChangeText={relationship =>
                          this.changeState({
                            relationship: relationship.trim()
                          })
                        }
                      />
                    </View>
                  </View>
                </View>
              ))}
              <View
                style={{ flexDirection: "row", marginBottom: scaleHeight(139) }}
              >
                <View
                  style={{
                    borderBottomColor: "#f1f1f1",
                    borderBottomWidth: 1,
                    width: 75,
                    borderRadius: 2,
                    alignSelf: "center"
                  }}
                ></View>
                <TouchableOpacity activeOpacity={0.4} onPress={this.addKin}
                  style={{
                    width: "70%",
                    padding: 10,
                    backgroundColor: "#F1F1F1",
                    borderRadius: 10,
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: "#148516",
                      borderRadius: 20
                    }}
                  >
                    <Icon name="add"></Icon>
                  </View>
                  <View style={{ justifyContent: "center" }}>
                    <Text style={{ color: "#707070", fontFamily: 'nunito-bold', fontSize: 20 }}>
                      Add more next of kin
                    </Text>
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    borderBottomColor: "#f1f1f1",
                    borderBottomWidth: 1,
                    width: 75,
                    borderRadius: 2,
                    alignSelf: "center"
                  }}
                ></View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 100,
            flexDirection: "row",
            height: scaleHeight(45)
          }}
        >
          <View
            style={{
              justifyContent: "center",
              backgroundColor: "#FDFDFD",
              width: "60%"
            }}
          >
            <Text
              style={{
                color: "#138516",
                fontFamily: "nunito-regular",
                fontSize: 17,
                paddingLeft: scale(20)
              }}
            >
              You Are Making Changes
            </Text>
          </View>
          <TouchableOpacity
            style={{ backgroundColor: "#138516", padding: 15, width: "40%" }}
          >
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  marginLeft: 15,
                  color: "#fff",
                  fontFamily: "nunito-regular",
                  fontSize: 17
                }}
              >
                Save Settings
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Header navigation={{ ...this.props.navigation }} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.login,
    isLoading: state.kin.kinloading || state.kin.kinupdating,
    kinInfoUpdated: state.kin.kinInfoUpdated,
    kinloaded: state.kin.kinloaded
  };
};

const mapDispatchToProps = {
  showToast,
  getKinInfoSuccess,
  updateKinInfoSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);

