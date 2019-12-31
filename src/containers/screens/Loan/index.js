import React, { Component } from "react";
import {
  TextInput,
  ScrollView,
  Picker,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  View,
  FlatList,
  ToastAndroid,
  Alert,
  AsyncStorage
} from "react-native";
import { systemWeights } from "react-native-typography";
import theme from "../../../../assets/styles/globalStyles";
import * as colors from "../../../lib/constants/colors";
import * as constants from "../../../../lib/constants";
import Spinner from "react-native-loading-spinner-overlay";
import { SIGN_UP } from "../../../../lib/constants";
import style from "./style";
import { scale, scaleHeight } from "../../../helpers/scale";
import { showToast } from "../../../components/Toast/actions/toastActions";
import "../../../../lib/helpers";
import { Colors } from "../../../lib/constants/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomInput from "../../../components/CustomTextInput/CustomInput";
import Space from "../../../components/Space";
import BlackButton from "../../../components/BlackButton";
import ButtonLink from "../../../components/ButtonLink";
import GreenLineSeparator from "../../../components/GreenLineSeparator";
import Tabs from "../../../components/Tabs";
import ApplyLoanModal from "./ApplyLoanModal";
import ApplicationSuccessful from "./ApplicationSuccessful";
import ApplicationStatus from "./ApplicationStatus";
import EditApplication from "./EditApplication";
import ReviewApplication from "./ReviewApplication";
import Header from "../../../components/Header";
import ProgressBar from "../../../components/Progressbar";
import SelectDropdown from "../../../components/SelectPopUp/SelectPopUp";
import BorderedTabs from "../../../components/BorderedTab";
import CalculateLoan from "./CalculateLoan";
import { getLoanTypesSuccess, getGuarantorRequestsSuccess } from "./actions/loan.actions.js";
import { getLoanTypes, getAllGuarantorRequests } from "../../../lib/api/url";
import { apiRequest } from "../../../lib/api/api";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { connect, Dispatch } from "react-redux"; 

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      selected: "1",
      showLoan: true,
      showGuarantorRequests: false,
      success: false,
      loanApply: false,
      showCalculator: false,
      loanType: {},
      loanTypes: [],
      guarantorRequests: []
    };
  }

  changeState = value => {
    this.setState(value);
  };

  toggleCalculator = () => {
    this.setState({
      showCalculator: !this.state.showCalculator
    });
  };
  toggleLoanModal = () => {
    this.setState({
      loanApply: !this.state.loanApply
    });
  };

  loans = () =>
    this.setState({
      showLoan: true,
      selected: "1",
      showGuarantorRequests: false
    });

  requests = () =>
    this.setState({
      showLoan: false,
      selected: "2",
      showGuarantorRequests: true
    });

    componentDidMount () {
      this.ongetLoanTypes();
      this.ongetGuarantorRequests();
    }

  showLoanApply = () => this.setState({ loanApply: !this.state.loanApply });

  ongetLoanTypes = () => {
    const userData = this.props.navigation.state.params.userData;
    this.setState(
      {
        spinner: true,
        modalLoader: true
      },
      () => {
        apiRequest(getLoanTypes, "get", {
          params: {
            cooperativeid: userData.cooperativeId
          }
        })
          .then(res => {
            this.setState({
              spinner: false
            });
            if (res) {
              console.log(res);
              console.log(res.data); // undefined
              this.setState({ loanTypes: res });

              this.props.getLoanTypesSuccess(res);
              this.props.showToast(
                "Successfully fetched loan types",
                "success"
              );
            } else {
              this.props.showToast("Error", "error");
            }
          })
          .catch(error => {
            if (error.response) {
              this.props.showToast(error.response.data.message, "error");
              console.log(error.response);
            } else {
              this.props.showToast(error, "error");
            }
            this.setState({
              spinner: false
            });
          });
      }
    );
  };

  ongetGuarantorRequests = () => {
    const userData = this.props.navigation.state.params.userData;
    this.setState(
      {
        spinner: true,
        modalLoader: true
      },
      () => {
        apiRequest(getAllGuarantorRequests, "get", {
          params: {
            memberprofileid: userData.id
          }
        })
          .then(res => {
            this.setState({
              spinner: false
            });
            if (res) {
              console.log(res);
              console.log(res.data); // undefined
              this.setState({ guarantorRequests: res });

              this.props.getGuarantorRequestsSuccess(res);
              this.props.showToast(
                "Successfully fetched guarantors",
                "success"
              );
            } else {
              this.props.showToast("Error", "error");
            }
          })
          .catch(error => {
            if (error.response) {
              this.props.showToast(error.response.data.message, "error");
              console.log(error.response);
            } else {
              this.props.showToast(error, "error");
            }
            this.setState({
              spinner: false
            });
          });
      }
    );
  };

  render() {
    function GuarantorRequest(props) {
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: scale(9),
            paddingVertical: scaleHeight(26.5),
            borderBottomWidth: 1,
            borderBottomColor: "#bdbdbd"
          }}
        >
          <Image source={require("../../../../assets/icons/man.png")} />
          <View
            style={{
              justifyContent: "space-between"
            }}
          >
            <Text style={{ fontFamily: "nunito-medium" }}>
              {`${props.item.requesterFirstName} ${props.item.requesterLastName}`}
            </Text>
            <Text
              style={{
                marginVertical: scaleHeight(15),
                fontFamily: "nunito-regular",
                color: "#138516"
              }}
            >
              Guarantor Request{" "}
            </Text>
            <Text
              style={{
                fontFamily: "nunito-regular"
              }}
            >
              {`Loan Amount: ₦${props.item.requesterAmount}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity activeOpacity={0.7}>
              <Image
                style={{ marginRight: scale(10) }}
                source={require("../../../../assets/icons/green_check_circle.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Image
                source={require("../../../../assets/icons/green_cancel.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <>
        <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
        <SafeAreaView style={[theme.container]}>
          <Spinner
            visible={this.state.spinner}
            size="large"
            color="#000000"
            animation="none"
            overlayColor={"rgba(0, 0, 0, 0.5)"}
          />
          <ScrollView
            keyboardShouldPersistTaps={"handled"}
            enableOnAndroid={true}
          >
            <View
              style={[
                theme.container,
                style.MainContainer,
                { marginTop: scaleHeight(70) }
              ]}
            >
              <BorderedTabs
                tabNumber={2}
                tab1Text="Loan"
                tab2Text="Guarantor Requests"
                selected={this.state.selected}
                tab1Event={this.loans}
                tab2Event={this.requests}
              />

              {/* {this.state.showForceInfo && <View></View>} */}
              {this.state.showLoan && (
                <View style={{ backgroundColor: "#f4f6fa" }}>
                  <View style={[style.container2]}>
                    <Text
                      style={{
                        fontFamily: "nunito-bold",
                        marginBottom: scaleHeight(17)
                      }}
                    >
                      Loan Summary
                    </Text>
                    <View
                      style={[
                        style.pickerStlye,
                        {
                          borderWidth: StyleSheet.hairlineWidth
                        }
                      ]}
                    >
                      <SelectDropdown
                        options={this.state.loanTypes || []}
                        value={""}
                        title={`Select Loan Type`}
                        onChange={obj =>
                          this.setState({
                            loanType: obj
                          })
                        }
                        dropdownImageStyle={{
                          top: scale(10)
                        }}
                      >
                        <View
                          style={[
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
                            {this.state.loanType.description || ""}
                          </Text>
                        </View>
                      </SelectDropdown>
                    </View>
                    <Image
                      source={require("../../../../assets/icons/blue_naira.png")}
                    />
                    <View style={[style.amount]}>
                      <View>
                        <Text style={[style.amountText]}>Amount Due:</Text>
                        <Text style={[style.price]}>₦100,000,000</Text>
                      </View>
                      <View>
                        <Text style={[style.amountText]}>Amount Paid:</Text>
                        <Text style={[style.price]}>₦100,000,000</Text>
                      </View>
                    </View>
                    <View>
                      <ProgressBar percentage={50} />
                    </View>
                    <Text
                      style={{
                        marginTop: scaleHeight(13),
                        color: "#9f9f9f",
                        fontFamily: "nunito-medium"
                      }}
                    >
                      50%
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[style.icon]}
                    onPress={this.toggleLoanModal}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: "#00a3c9",
                        paddingHorizontal: scale(17),
                        paddingVertical: scaleHeight(20),
                        margin: scaleHeight(10),
                        borderRadius: 7
                      }}
                    >
                      <Image
                        source={require("../../../../assets/icons/naira.png")}
                      />
                      <View
                        style={{
                          justifyContent: "space-between"
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            fontFamily: "nunito-bold",
                            color: "#fff"
                          }}
                        >
                          Apply for Loans
                        </Text>
                        <Text
                          style={{
                            fontFamily: "nunito-regular",
                            color: "#fff"
                          }}
                        >
                          Long and Short Term Loans
                        </Text>
                      </View>
                      <View style={{ alignSelf: "center" }}>
                        <AntDesign name="caretright" size={15.5} color="#fff" />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.toggleCalculator}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: "#138516",
                        paddingHorizontal: scale(17),
                        paddingVertical: scaleHeight(20),
                        margin: scaleHeight(10),
                        borderRadius: 7
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "space-between",
                          marginLeft: scale(71)
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            fontFamily: "nunito-bold",
                            color: "#fff"
                          }}
                        >
                          Calculate Your Loan
                        </Text>
                        <Text
                          style={{
                            fontFamily: "nunito-regular",
                            color: "#fff",
                            marginTop: scaleHeight(9)
                          }}
                        >
                          Lorem Ipsum
                        </Text>
                      </View>
                      <View style={{ alignSelf: "center" }}>
                        <AntDesign name="caretright" size={15.5} color="#fff" />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {this.state.showGuarantorRequests && (
                <View>
                  <FlatList
                    data={this.state.guarantorRequests}
                    renderItem={({ item, index }) => (
                      <GuarantorRequest item={item} />
                    )}
                    keyExtractor={item => item.id}
                  />
                </View>
              )}
              {/* <ApplyLoanModal
                visible={this.state.showCalculator}
                _toggleView={this.toggleCalculator}
              /> */}
              {/* <ApplicationSuccessful 
                subtitle="Request Submission Failed"
                smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints`}
                visible={this.state.success} _toggleView={this.showSuccessModal} /> */}
              {/* <ApplicationStatus visible={this.state.success} _toggleView={this.showSuccessModal} /> */}
              {/* <EditApplication visible={this.state.success} _toggleView={this.showSuccessModal} 
                    subtitle="Recovery Password Sent"
                    message={`A text message would be sent to your Phone number ${'+23470******11'} and Email ${'josh******43@gmail.com'}`}/> */}
              <CalculateLoan
                visible={this.state.showCalculator}
                _toggleView={this.toggleCalculator}
                loanTypes={this.state.loanTypes}
              />
            </View>
          </ScrollView>
          <Header navigation={{ ...this.props.navigation }} />
          <ApplyLoanModal
            visible={this.state.loanApply}
            _toggleView={this.showLoanApply}
            loanTypes={this.state.loanTypes}
          />
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.login,
    isLoading: state.loan.loading || state.loan.loadingRequests,
    loanTypesLoaded: state.loan.loanTypesLoaded,
    requestsLoaded: state.loan.requestsLoaded
  };
};

const mapDispatchToProps = {
  showToast,
  getLoanTypesSuccess,
  getGuarantorRequestsSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);
