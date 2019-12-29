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
import { updateProfileInfoSuccess } from './actions/profileInfo.actions';
import { postChangePassword, postProfileInfo } from '../../../lib/api/url';
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
      gender: "",
      emailAddress: "",
      phoneNumber: "",
      dateOfBirth: "",
      accountNumber: "",
      bank: "",
      bvn: "",
      residentialAddress: "",
      country: "",
      state: "",
      localGovernment: "",
        isDateTimePickerVisible: false,
    };
  }

  changeState = value => {
    this.setState(value);
  };

    handleDatePicked = date => {
        console.warn("A date has been picked: ", date);
        this.formatDate(date)
        this.hideDateTimePicker();
    };


    formatDate(date) {

        this.setState({
            dateOfBirth: moment(date).format('DD/MM/YYYY')
        })

        // this.setState({birthdaydate: mths[month] + " " + day + ", " + year})

    }

    hideDateTimePicker = () => {
        this.setState({isDateTimePickerVisible: false});
    };


    validateProfileInfo = () => {
        if (!this.state.dateOfBirth || !this.state.firstName || !this.state.gender || !this.state.lastName) {
            this.props.showToast('Kindly fill in the required fields', 'error')
            return false;
        }else {
            this.onhandleUpdate();
        }
  }

  onhandleUpdate = () => {
    const { userData } = this.props;
    Keyboard.dismiss();
    const { firstName, lastName, emailAddress, phoneNumber, gender, dateOfBirth, accountNumber, bank, bvn, residentialAddress, country, state, localGovernment } = this.state;

    console.log(userData)
    this.setState({
      spinner: true,
      modalLoader: true
    }, () => {
      apiRequest(postProfileInfo, 'post', {
        memberid: userData.id,
        firstName,
        lastName,
        gender:gender.value,
        emailAddress,
        phoneNumber,
        dateOfBirth,
        accountNumber,
        bank,
        bankVerificationNumber:bvn,
        addressLine1: residentialAddress,
        country,
        state,
        lga:localGovernment,
          "branchId": 0,
          "cooperative": userData.cooperative,
          "cooperativeId": userData.cooperativeId,
          "genderId": userData.genderId,
          "id": userData.id,
          "middleName": userData.middleName,
          "occupation": "",
          "username": userData.username
      }).then(res => {
        console.log(res)
        this.setState({
          spinner: false,
        })

        this.props.updateProfileInfoSuccess(res.data);
        this.props.showToast('Profile Updated Successfully', 'success');
        this.props.navigation.navigate('Dashboard')

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
  };

  componentDidMount() {
    const { userData } = this.props;
    console.log(userData);
    this.setState({
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: userData.gender || '',
      emailAddress: userData.emailAddress,
      phoneNumber: userData.phoneNumber,
      dateOfBirth: userData.dateOfBirth,
      accountNumber: userData.accountNumber,
      bvn: userData.bankVerificationNumber,
      residentialAddress:
      userData.addressLine1 + userData.addressLine2 + userData.addressLine3,
      country: userData.country,
      state: userData.state,
      localGovernment: userData.lga
    });
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
              <Text>Profile Information</Text>
              <AntDesign
                name="caretup"
                size={scale(15)}
                color="#138516"
                style={style.icon}
              />
            </View>
            <View style={[style.Container]}>
              <View style={[style.fieldContainer]}>
                <View>
                    <Text style={[style.label]}>First Name</Text>
                  <View style={[style.input]}>
                    <CustomInput 
                        editable={false} selectTextOnFocus={false}
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
                                        editable={false} selectTextOnFocus={false}
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
                          value={''}
                          title={`Select Gender`}
                          onChange={(obj) => this.setState({
                              gender:obj
                          })}
                          dropdownImageStyle={{
                              top:scale(10)
                          }}
                      >
                          <View style={[theme.flex1, theme.caption, theme.typo_regular, theme.light_border,{height:scale(40),paddingHorizontal:scale(20), justifyContent:'center'}]}
                              // onPress={this.onhandleSubmit}
                          >
                              {/*<Text style={styles.label}>Bank Name </Text>*/}
                              <Text numberOfLines={1} style={style.selectText}>{this.state.gender.label || ''}</Text>
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
                            style={{height:scale(40), justifyContent:'center',paddingLeft:scale(15)}}
                                    onPress={() => this.setState({
                                        isDateTimePickerVisible: true
                                    })}>
                            <Text
                                style={style.selectText}>{this.state.dateOfBirth}</Text>
                        </TouchItem>
                    </View>


                </View>
              </View>
            </View>
            <View style={[style.pageheader]}>
              <Text>Contact Information</Text>
              <AntDesign
                name="caretup"
                size={scale(15)}
                color="#138516"
                style={style.icon}
              />
            </View>
            <View style={[style.Container]}>
              <View style={[style.fieldContainer]}>
                <View>
                  <Text style={[style.label]}>Email Address</Text>
                  <View style={[style.input]}>
                                    <CustomInput
                                        editable={false} selectTextOnFocus={false}
                      value={this.state.emailAddress}
                        disabled={true}
                      onChangeText={emailAddress =>
                        this.changeState({ emailAddress: emailAddress.trim() })
                      }
                    />
                  </View>
                  <Text style={[style.label]}>Phone Number</Text>
                  <View style={[style.input]}>
                    <CustomInput
                        editable={false} selectTextOnFocus={false}
                                        value={this.state.phoneNumber}
                                        disabled={true}
                      keyboardType="number-pad"
                      onChangeText={phoneNumber =>
                        this.changeState({ phoneNumber: phoneNumber.trim() })
                      }
                    />
                  </View>
                  <Text style={[style.label]}>Residential Address</Text>
                  <View style={[style.input]}>
                                    <CustomInput
                                        editable={false} selectTextOnFocus={false}
                                        editable={false} selectTextOnFocus={false}
                                        value={this.state.residentialAddress}
                                        disabled={true}
                      onChangeText={residentialAddress =>
                        this.changeState({
                          residentialAddress: residentialAddress
                        })
                      }
                    />
                  </View>
                  {/*<Text style={[style.label]}>Country</Text>*/}
                  {/*<View*/}
                    {/*style={[*/}
                      {/*style.input,*/}
                      {/*{ borderWidth: StyleSheet.hairlineWidth }*/}
                    {/*]}*/}
                  {/*>*/}
                    {/*<Picker*/}
                      {/*selectedValue={this.state.country}*/}
                      {/*onValueChange={country =>*/}
                        {/*this.changeState({ country: country })*/}
                      {/*}*/}
                    {/*>*/}
                      {/*<Picker.Item label="---None---" value="" />*/}
                      {/*{genders.map((item, index) => (*/}
                        {/*<Picker.Item*/}
                          {/*key={index}*/}
                          {/*label={item.label}*/}
                          {/*value={item.value}*/}
                        {/*/>*/}
                      {/*))}*/}
                    {/*</Picker>*/}
                  {/*</View>*/}
                  {/*<Text style={[style.label]}>State</Text>*/}
                  {/*<View*/}
                    {/*style={[*/}
                      {/*style.input,*/}
                      {/*{ borderWidth: StyleSheet.hairlineWidth }*/}
                    {/*]}*/}
                  {/*>*/}
                    {/*<Picker*/}
                      {/*selectedValue={this.state.state}*/}
                      {/*onValueChange={state =>*/}
                        {/*this.changeState({ state: state })*/}
                      {/*}*/}
                    {/*>*/}
                      {/*<Picker.Item label="---None---" value="" />*/}
                      {/*{genders.map((item, index) => (*/}
                        {/*<Picker.Item*/}
                          {/*key={index}*/}
                          {/*label={item.label}*/}
                          {/*value={item.value}*/}
                        {/*/>*/}
                      {/*))}*/}
                    {/*</Picker>*/}
                  {/*</View>*/}
                  {/*<Text style={[style.label]}>Local Government</Text>*/}
                  {/*<View*/}
                    {/*style={[*/}
                      {/*style.input,*/}
                      {/*{ borderWidth: StyleSheet.hairlineWidth }*/}
                    {/*]}*/}
                  {/*>*/}
                    {/*<Picker*/}
                      {/*selectedValue={this.state.localGovernment}*/}
                      {/*onValueChange={localGovernment =>*/}
                        {/*this.changeState({ localGovernment: localGovernment })*/}
                      {/*}*/}
                    {/*>*/}
                      {/*<Picker.Item label="---None---" value="" />*/}
                      {/*{genders.map((item, index) => (*/}
                        {/*<Picker.Item*/}
                          {/*key={index}*/}
                          {/*label={item.label}*/}
                          {/*value={item.value}*/}
                        {/*/>*/}
                      {/*))}*/}
                    {/*</Picker>*/}
                  {/*</View>*/}
                </View>
              </View>
            </View>
            <View style={[style.pageheader]}>
              <Text>Banking Details</Text>
              <AntDesign
                name="caretup"
                size={scale(15)}
                color="#138516"
                style={style.icon}
              />
            </View>
            <View style={[style.Container]}>
              <View style={[style.fieldContainer]}>
                <View>
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
                        this.changeState({
                          accountNumber: accountNumber.trim()
                        })
                      }
                    />
                  </View>
                  {/*<Text style={[style.label]}>Bank</Text>*/}
                  {/*<View*/}
                    {/*style={[*/}
                      {/*style.input,*/}
                      {/*{ borderWidth: StyleSheet.hairlineWidth }*/}
                    {/*]}*/}
                  {/*>*/}
                    {/*<Picker*/}
                      {/*selectedValue={this.state.bank}*/}
                      {/*onValueChange={bank => this.changeState({ bank: bank })}*/}
                    {/*>*/}
                      {/*<Picker.Item label="---None---" value="" />*/}
                      {/*{genders.map((item, index) => (*/}
                        {/*<Picker.Item*/}
                          {/*key={index}*/}
                          {/*label={item.label}*/}
                          {/*value={item.value}*/}
                        {/*/>*/}
                      {/*))}*/}
                    {/*</Picker>*/}
                  {/*</View>*/}
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 50,
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
            onPress={this.validateProfileInfo}

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
          <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              isDarkModeEnabled={colorScheme === 'dark'}
              // minimumDate={new Date()}
          />
        <Header navigation={{ ...this.props.navigation }} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.login,
    isLoading: state.profile.loading,
    infoUpdated: state.profile.infoUpdated
  };
};

const mapDispatchToProps = {
  showToast,
  updateProfileInfoSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);
