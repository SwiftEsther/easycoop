import React, { Component } from "react";
import {
    TextInput,
    Picker,
    StatusBar,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    Text,
    View,
    ToastAndroid,
    Alert,
    AsyncStorage,
    Button, Keyboard
} from "react-native";
import { systemWeights } from "react-native-typography";
import theme from "../../../../assets/styles/globalStyles";
import Spinner from "react-native-loading-spinner-overlay";
import { SIGN_UP } from "../../../../lib/constants";
// import ImagePicker from "react-native-image-picker";
import style from "./style";
import "../../../../lib/helpers";
import Header from "../../../components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomInput from "../../../components/CustomTextInput/CustomInput";
import { Icon } from "react-native-elements";
import { scale, scaleHeight } from "../../../helpers/scale";
import { AntDesign } from "@expo/vector-icons";
import { showToast } from "../../../components/Toast/actions/toastActions";
import { connect, Dispatch } from "react-redux"; 
import {
  updatePersonalInfoSuccess,
  updateBankDetailsSuccess,
  updateContactInfoSuccess
} from "./actions/profileInfo.actions";
import {
  memberPersonalInformation,
  memberBankDetails,
  memberContactInformation
} from "../../../lib/api/url";
import SelectDropdown from "../../../components/SelectPopUp/SelectPopUp";

import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'
import TouchItem from "../../../components/TouchItem/_TouchItem";

import { Appearance } from 'react-native-appearance';
import { apiRequest } from "../../../lib/api/api";

const colorScheme = Appearance.getColorScheme();

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      gender: {},
      emailAddress: "",
      phoneNumber: "",
      dateOfBirth: "",
      accountNumber: "",
      bank: {},
      bvn: "",
      residentialAddress: "",
      country: {},
      state: {},
      lga: {},
      isDateTimePickerVisible: false,
      showProfileInfo: true,
      showBankingDetails: false,
      showContactInfo: false,
      avatarSource: '',
      imageData: '',
      imageType: '',
      imagePath: ''
    };
  }

  changeState = value => {
    this.setState(value);
  };

  toggleContactInfo = () => {
    this.setState({ showContactInfo: !this.state.showContactInfo });
  };

  toggleProfileInfo = () => {
    this.setState({ showProfileInfo: !this.state.showProfileInfo });
  };

  toggleBankDetails = () => {
    this.setState({ showBankingDetails: !this.state.showBankingDetails });
  };

  handleDatePicked = date => {
    console.warn("A date has been picked: ", date);
    this.formatDate(date);
    this.hideDateTimePicker();
  };

  formatDate(date) {
    this.setState({
      dateOfBirth: moment(date).format("DD/MM/YYYY")
    });

    // this.setState({birthdaydate: mths[month] + " " + day + ", " + year})
  }

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  validatePersonalInfo = () => {
    if (
      !this.state.dateOfBirth ||
      !this.state.firstName ||
      !this.state.gender ||
      !this.state.lastName
    ) {
      this.props.showToast("Kindly fill in the required fields", "error");
      return false;
    } else {
      this.saveMemberPersonalInfo();
    }
  };

  validateContactInfo = () => {
    if (
      !this.state.emailAddress ||
      !this.state.phoneNumber ||
      !this.state.residentialAddress ||
      !this.state.country ||
      !this.state.state ||
      !this.state.lga
    ) {
      this.props.showToast("Kindly fill in the required fields", "error");
      return false;
    } else {
      this.saveMemberContactInfo();
    }
  };

  validateBankDetails = () => {
    if (!this.state.bvn || !this.state.accountNumber || !this.state.bank) {
      this.props.showToast("Kindly fill in the required fields", "error");
      return false;
    } else {
      this.saveMemberBankDetails();
    }
  };

  saveMemberContactInfo = () => {
    const { userData } = this.props;
    Keyboard.dismiss();
    const {
      emailAddress,
      phoneNumber,
      residentialAddress,
      country,
      state,
      lga
    } = this.state;

    console.log(userData);
    this.setState(
      {
        spinner: true,
        modalLoader: true
      },
      () => {
        apiRequest(memberContactInformation, "post", {
          memberid: userData.id,
          emailAddress,
          phoneNumber,
          addressLine1: residentialAddress,
          addressLine2: "",
          addressLine3: "",
          country: country.value,
          state: state.label,
          stateId: state.id,
          lga: lga.value,
          branchId: 0,
          cooperative: userData.cooperative,
          cooperativeId: userData.cooperativeId,
          genderId: userData.genderId,
          id: userData.id
        })
          .then(res => {
            console.log(res);
            this.setState({
              spinner: false
            });

            this.props.updateContactInfoSuccess(res.data);
            this.props.showToast(
              "Contact Information Updated Successfully",
              "success"
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
      }
    );
  };

  saveMemberPersonalInfo = () => {
    const { userData } = this.props;
    Keyboard.dismiss();
    const { dateOfBirth, firstName, gender, lastName } = this.state;

    console.log(userData);
    this.setState(
      {
        spinner: true,
        modalLoader: true
      },
      () => {
        apiRequest(memberPersonalInformation, "post", {
          branchId: userData.branchId,
          dateOfBirth,
          firstName,
          gender: gender.label,
          lastName,
          middleName: userData.middleName,
          occupation: userData.occupation,
          cooperative: userData.cooperative,
          cooperativeId: userData.cooperativeId,
          genderId: userData.genderId,
          username: userData.username,
          id: userData.id,
          gender: "",
          occupation: 'userData.occupation'
        })
          .then(res => {
            console.log(res);
            this.setState({
              spinner: false
            });

            this.props.updatePersonalInfoSuccess(res.data);
            this.props.showToast(
              "Personal Information Updated Successfully",
              "success"
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
      }
    );
  };

  saveMemberBankDetails = () => {
    const { userData } = this.props;
    Keyboard.dismiss();
    const {
      accountNumber,
      bank,
      bvn
    } = this.state;

    console.log(userData);
    this.setState(
      {
        spinner: true,
        modalLoader: true
      },
      () => {
        apiRequest(memberBankDetails, "post", {
          bank: bank.label,
          bankId: bank.id,
          accountNumber,
          bankVerificationNumber: bvn,
          cooperative: userData.cooperative,
          cooperativeId: userData.cooperativeId,
          id: userData.id
        })
          .then(res => {
            console.log(res);
            this.setState({
              spinner: false
            });

            this.props.updateBankDetailsSuccess(res.data);
            this.props.showToast(
              "Bank Details Updated Successfully",
              "success"
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
      }
    );
  };

  // uploadImage = () => {
  //   let {imageData, imageType} = this.state;
  //   const profilePhoto = {imageString: imageData, imageType};

  //   this.setState(
  //     {
  //       spinner: true,
  //       modalLoader: true
  //     },
  //     () => {
  //       apiRequest('uploadlink', "post", {
  //         imageString: imageData,
  //         imageType
  //       })
  //         .then(res => {
  //           console.log(res);
  //           this.setState({
  //             spinner: false
  //           });
  //         })
  //         .catch(error => {
  //           console.log(error.response);

  //           if (error.response) {
  //             this.props.showToast(error.response.data.message, "error");
  //             console.log(error.response);
  //           } else {
  //             this.props.showToast(error.message, "error");
  //           }
  //           this.setState({
  //             spinner: false
  //           });
  //         });
  //     }
  //   );
  // }

  chooseImage = () => {
    const options = {
            title: 'Choose Profile Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            allowsEditing: true,
            maxWidth: 300, 
            maxHeight: 300,
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                Alert.alert("Image Pick Error", response.error)
            } else {
                const source = { uri: response.uri };
                this.setState({
                  avatarSource: source,
                    imageData: response.data,
                    imagePath: response.path,
                    imageType: response.type
                });
            }
        });r
  }

  componentDidMount() {
    const { userData } = this.props;
    console.log(userData);
    this.setState({
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: {label: userData.gender, id: userData.genderId},
      emailAddress: userData.emailAddress,
      phoneNumber: userData.phoneNumber,
      dateOfBirth: userData.dateOfBirth,
      accountNumber: userData.accountNumber,
      bvn: userData.bankVerificationNumber,
      residentialAddress:
        userData.addressLine1 + userData.addressLine2 + userData.addressLine3,
      country: {label: userData.country, value: userData.country},
      state: {label: userData.state, id: userData.stateId},
      lga: {label: userData.lga, value: userData.lga},
      bank: {label: userData.bank, id: userData.bankId}
    });
  }

  render() {
    const genders = [{ label: "Male", id: 1 }, { label: "Female", id: 2 }];
    const countries = [];
    const states = [];
    const banks = [];
    const lgas = [];

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
        <Header navigation={{ ...this.props.navigation }} />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"handled"}
          enableOnAndroid={true}
          scrollEnabled={true}
          alwaysBounceVertical={false}
          bounces={false}
        >
          <View style={{ marginTop: scaleHeight(70) }}>
            <View style={[style.pageheader]}>
              <Text>Profile Information</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.toggleProfileInfo}
              >
                <AntDesign
                  name={this.state.showProfileInfo ? "caretdown" : "caretup"}
                  size={scale(15)}
                  color="#138516"
                  style={style.icon}
                />
              </TouchableOpacity>
            </View>
            {this.state.showProfileInfo && (
              <View style={[style.Container]}>
                <View>
                  <View style={[style.fieldContainer]}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{marginTop: scaleHeight(20)}}
          >
            <Image source={require("../../../../assets/images/pexels_photo.png")} />
          </TouchableOpacity>
                    <Text style={[style.label]}>First Name</Text>
                    <View style={[style.input]}>
                      <CustomInput
                        editable={false}
                        selectTextOnFocus={false}
                        disabled={true}
                        value={this.state.firstName}
                        onChangeText={firstName =>
                          this.changeState({ firstName: firstName.trim() })
                        }
                      />
                    </View>
                    <Text style={[style.label]}>Last Name</Text>
                    <View style={[style.input]}>
                      <CustomInput
                        editable={false}
                        selectTextOnFocus={false}
                        value={this.state.lastName}
                        disabled={true}
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
                      <SelectDropdown
                        options={genders || []}
                        value={""}
                        title={`Select Gender`}
                        onChange={obj =>
                          this.setState({
                            gender: obj
                          })
                        }
                        dropdownImageStyle={{
                          top: scale(10)
                        }}
                      >
                        <View
                          style={[
                            theme.typo_regular,
                            theme.light_border,
                            {
                              height: scale(40),
                              paddingHorizontal: scale(20),
                              justifyContent: "center"
                            }
                          ]}
                          // onPress={this.onhandleSubmit}
                        >
                          <Text numberOfLines={1} style={style.selectText}>
                            {this.state.gender.label || ""}
                          </Text>
                        </View>
                      </SelectDropdown>
                    </View>

                    <Text style={[style.label]}>Date of Birth</Text>
                    <View
                      style={[
                        style.input,
                        { borderWidth: StyleSheet.hairlineWidth }
                      ]}
                    >
                      <TouchItem
                        style={{
                          height: scale(40),
                          justifyContent: "center",
                          paddingLeft: scale(15)
                        }}
                        onPress={() =>
                          this.setState({
                            isDateTimePickerVisible: true
                          })
                        }
                      >
                        <Text style={style.selectText}>
                          {this.state.dateOfBirth}
                        </Text>
                      </TouchItem>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        backgroundColor: "#FDFDFD",
                        flex: 2,
                        paddingVertical: scaleHeight(17)
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
                      style={{
                        backgroundColor: "#138516",
                        flex: 1,
                        paddingVertical: scaleHeight(17)
                      }}
                      onPress={this.validatePersonalInfo}
                    >
                      <View style={{ justifyContent: "center" }}>
                        <Text
                          style={{
                            color: "#fff",
                            fontFamily: "nunito-regular",
                            fontSize: 17,
                            alignSelf: "center"
                          }}
                        >
                          Save
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            <View style={[style.pageheader]}>
              <Text>Contact Information</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.toggleContactInfo}
              >
                <AntDesign
                  name={this.state.showContactInfo ? "caretdown" : "caretup"}
                  size={scale(15)}
                  color="#138516"
                  style={style.icon}
                />
              </TouchableOpacity>
            </View>
            {this.state.showContactInfo && (
              <View style={[style.Container]}>
                <View>
                  <View style={[style.fieldContainer]}>
                    <Text style={[style.label]}>Email Address</Text>
                    <View style={[style.input]}>
                      <CustomInput
                        selectTextOnFocus={false}
                        value={this.state.emailAddress}
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
                        selectTextOnFocus={false}
                        value={this.state.phoneNumber}
                        keyboardType="number-pad"
                        onChangeText={phoneNumber =>
                          this.changeState({ phoneNumber: phoneNumber.trim() })
                        }
                      />
                    </View>
                    <Text style={[style.label]}>Residential Address</Text>
                    <View style={[style.input]}>
                      <CustomInput
                        selectTextOnFocus={false}
                        value={this.state.residentialAddress}
                        onChangeText={residentialAddress =>
                          this.changeState({
                            residentialAddress: residentialAddress
                          })
                        }
                      />
                    </View>
                    <Text style={[style.label]}>Country</Text>
                    <View
                      style={[
                        style.input,
                        { borderWidth: StyleSheet.hairlineWidth }
                      ]}
                    >
                      <SelectDropdown
                        options={countries || []}
                        value={""}
                        title={`Select Country`}
                        onChange={obj =>
                          this.setState({
                            country: obj
                          })
                        }
                        dropdownImageStyle={{
                          top: scale(10)
                        }}
                      >
                        <View
                          style={[
                            theme.typo_regular,
                            theme.light_border,
                            {
                              height: scale(40),
                              paddingHorizontal: scale(20),
                              justifyContent: "center"
                            }
                          ]}
                          // onPress={this.onhandleSubmit}
                        >
                          {/*<Text style={styles.label}>Bank Name </Text>*/}
                          <Text numberOfLines={1} style={style.selectText}>
                            {this.state.country.label || ""}
                          </Text>
                        </View>
                      </SelectDropdown>
                    </View>
                    <Text style={[style.label]}>State</Text>
                    <View
                      style={[
                        style.input,
                        { borderWidth: StyleSheet.hairlineWidth }
                      ]}
                    >
                      <SelectDropdown
                        options={states || []}
                        value={""}
                        title={`Select State`}
                        onChange={obj =>
                          this.setState({
                            state: obj
                          })
                        }
                        dropdownImageStyle={{
                          top: scale(10)
                        }}
                      >
                        <View
                          style={[
                            theme.typo_regular,
                            theme.light_border,
                            {
                              height: scale(40),
                              paddingHorizontal: scale(20),
                              justifyContent: "center"
                            }
                          ]}
                          // onPress={this.onhandleSubmit}
                        >
                          {/*<Text style={styles.label}>Bank Name </Text>*/}
                          <Text numberOfLines={1} style={style.selectText}>
                            {this.state.state.label || ""}
                          </Text>
                        </View>
                      </SelectDropdown>
                    </View>
                    <Text style={[style.label]}>Local Government</Text>
                    <View
                      style={[
                        style.input,
                        { borderWidth: StyleSheet.hairlineWidth }
                      ]}
                    >
                      <SelectDropdown
                        options={lgas || []}
                        value={""}
                        title={`Select Local Government`}
                        onChange={obj =>
                          this.setState({
                            lga: obj
                          })
                        }
                        dropdownImageStyle={{
                          top: scale(10)
                        }}
                      >
                        <View
                          style={[
                            theme.typo_regular,
                            theme.light_border,
                            {
                              height: scale(40),
                              paddingHorizontal: scale(20),
                              justifyContent: "center"
                            }
                          ]}
                          // onPress={this.onhandleSubmit}
                        >
                          <Text numberOfLines={1} style={style.selectText}>
                            {this.state.lga.label || ""}
                          </Text>
                        </View>
                      </SelectDropdown>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        backgroundColor: "#FDFDFD",
                        flex: 2,
                        paddingVertical: scaleHeight(17)
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
                      style={{
                        backgroundColor: "#138516",
                        flex: 1,
                        paddingVertical: scaleHeight(17)
                      }}
                      onPress={this.validateContactInfo}
                    >
                      <View style={{ justifyContent: "center" }}>
                        <Text
                          style={{
                            color: "#fff",
                            fontFamily: "nunito-regular",
                            fontSize: 17,
                            alignSelf: "center"
                          }}
                        >
                          Save
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            <View style={[style.pageheader]}>
              <Text>Banking Details</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.toggleBankDetails}
              >
                <AntDesign
                  name={this.state.showBankingDetails ? "caretdown" : "caretup"}
                  size={scale(15)}
                  color="#138516"
                  style={style.icon}
                />
              </TouchableOpacity>
            </View>
            {this.state.showBankingDetails && (
              <View style={[style.Container]}>
                <View>
                  <View style={[style.fieldContainer]}>
                    <Text style={[style.label]}>BVN</Text>
                    <View style={[style.input]}>
                      <CustomInput
                        value={this.state.bvn}
                        keyboardType="number-pad"
                        onChangeText={bvn =>
                          this.changeState({ bvn: bvn.trim() })
                        }
                      />
                    </View>
                    <Text style={[style.label]}>AccountNumber</Text>
                    <View style={[style.input]}>
                      <CustomInput
                        value={this.state.accountNumber}
                        keyboardType="number-pad"
                        onChangeText={accountNumber =>
                          this.setState({
                            accountNumber: accountNumber.trim()
                          })
                        }
                      />
                    </View>

                    <Text style={[style.label]}>Bank</Text>
                    <View
                      style={[
                        style.input,
                        { borderWidth: StyleSheet.hairlineWidth }
                      ]}
                    >
                      <SelectDropdown
                        options={banks || []}
                        value={""}
                        title={`Select Bank`}
                        onChange={obj =>
                          this.setState({
                            bank: obj
                          })
                        }
                        dropdownImageStyle={{
                          top: scale(10)
                        }}
                      >
                        <View
                          style={[
                            theme.typo_regular,
                            theme.light_border,
                            {
                              height: scale(40),
                              paddingHorizontal: scale(20),
                              justifyContent: "center"
                            }
                          ]}
                          // onPress={this.onhandleSubmit}
                        >
                          {/*<Text style={styles.label}>Bank Name </Text>*/}
                          <Text numberOfLines={1} style={style.selectText}>
                            {this.state.bank.label || ""}
                          </Text>
                        </View>
                      </SelectDropdown>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        backgroundColor: "#FDFDFD",
                        flex: 2,
                        paddingVertical: scaleHeight(17)
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
                      style={{
                        backgroundColor: "#138516",
                        flex: 1,
                        paddingVertical: scaleHeight(17)
                      }}
                      onPress={this.saveMemberBankDetails}
                    >
                      <View style={{ justifyContent: "center" }}>
                        <Text
                          style={{
                            color: "#fff",
                            fontFamily: "nunito-regular",
                            fontSize: 17,
                            alignSelf: "center"
                          }}
                        >
                          Save
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          isDarkModeEnabled={colorScheme === "dark"}
          // minimumDate={new Date()}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.login,
    isLoading: state.profile.loading,
    personalInfoUpdated: state.profile.personalInfoUpdated,
    contactInfoUpdated: state.profile.contactInfoUpdated,
    bankDetailsUpdated: state.profile.bankDetailsUpdated
  };
};

const mapDispatchToProps = {
  showToast,
  updatePersonalInfoSuccess,
  updateContactInfoSuccess,
  updateBankDetailsSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);

