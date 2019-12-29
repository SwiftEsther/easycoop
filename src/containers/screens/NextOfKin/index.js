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
  Button,
  Keyboard
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
import { getKinDetails } from '../../../lib/api/url';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
        spinner: true,
        modalLoader: true,
        kins: [],
        kinDetails: {
         firstName: "",
         lastName: "",
         gender: "",
         emailAddress:"",
         phoneNumber: "",
         residentialAddress: "",
         relationship: ""
        }
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
            this.setState({ spinner: false,kins: res });
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

createNewKin=()=> {
  var joined = this.state.kins.concat(this.state.kinDetails);
  this.setState({ kins: joined });
}

validateKin= () => {
  let {
    firstName,
    lastName,
    gender,
    emailAddress,
    phoneNumber,
    residentialAddress,
    relationship
  } = this.state.kinDetails;
        const fields = [firstName, lastName, emailAddress,gender,phoneNumber, residentialAddress, relationship];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].length === 0) {
                this.props.showToast('Kindly fill in the required fields', 'error')
                return false;
            }
            else {
              this.addKin()
            }
        }
    }

  addKin = () => {
      const {userData} = this.props;
        Keyboard.dismiss();
        let {firstName, lastName, gender, emailAddress, phoneNumber, residentialAddress, relationship} = this.state.kinDetails;

        this.setState({
            spinner: true,
            modalLoader: true
        }, () => {
            apiRequest(postChangePassword, "post", {
              addressLine1: residentialAddress,
              addressLine2: "",
              addressLine3: "",
              alternateEmailAddress: "",
              alternatePhoneNumber: "",
              country: "",
              gender: "male",
              emailAddress,
              firstName,
              genderId: 0,
              id: 0,
              lastName,
              lga: "",
              memberProfileId: userData.id,
              middleName: "",
              phoneNumber,
              relationship,
              stateId: 0
            })
              .then(res => {
                console.log(res);
                this.setState({
                  spinner: false
                });

                this.props.updateKinInfoSuccess(res);
                this.props.showToast(
                  `${firstName} ${lastName} added Successfully`,
                );
              })
              .catch(error => {
                console.log(error.response);

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
        })
      
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
                style={{ flexDirection: "row", marginBottom: scaleHeight(139), paddingTop: scaleHeight(20) }}
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
                <TouchableOpacity activeOpacity={0.4} onPress={this.createNewKin}
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
            style={{ backgroundColor: "#138516",width: "40%", paddingTop: scale(5)}} onPress={this.validateKin}
          >
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  marginLeft: scale(15),
                  color: "#fff",
                  fontFamily: "nunito-regular",
                  fontSize: 17,
                  textAlign: 'center',
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

