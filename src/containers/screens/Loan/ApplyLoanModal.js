import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Platform,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Picker
} from "react-native";
import { BottomSheet } from "react-native-btr";
import Modal from "react-native-modal";
import CustomInput from "../../../components/CustomTextInput/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import theme from "../../../../assets/styles/globalStyles";
import GreenButton from "../../../components/GreenButton";
import { Icon } from "react-native-elements";
import { scale, scaleHeight } from "../../../helpers/scale";
import Tabs from "../../../components/Tabs";
import { SafeAreaView } from "react-navigation";
import Toast from "../../../components/Toast/Toast";
import ReviewApplication from "./ReviewApplication";
import { getAllGuarantors, getGuarantorForUser, postApplyForLoan } from "../../../lib/api/url";
import { apiRequest } from "../../../lib/api/api";
import SelectDropdown from "../../../components/SelectPopUp/SelectPopUp";
import { showToast, hideToast } from "../../../components/Toast/actions/toastActions";
import { connect, Dispatch } from "react-redux";

import { changePasswordSuccess } from "../Settings/Change_Password/actions/changePassword.actions";
import { loginSuccess } from "../Login/actions/login.actions";
import Spinner from "react-native-loading-spinner-overlay";
import TouchItem from "../../../components/TouchItem/_TouchItem";
import ApplicationSuccessful from "./ApplicationSuccessful";


class ApplyLoanModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "1",
            showLoanInfo: true,
            showGuarantorInfo: false,
            loanType: {},
            amount: "",
            guarantor: "",
            guarantors: [],
            review: false,
            showToast: false,
            toastMessage: ""
        };
    }

    changeState = value => {
        this.setState(value);
    };


    showReview = () => {
        // this.props._toggleView();
        this.setState({
            review: !this.state.review
        });
    };

    showApplyForm = () => {
        // this.props._toggleView();
        if (this.state.loanType.requiresGuarantor) {
            if (this.state.guarantors.length < this.state.loanType.numberOfGuarantors) {
                this.props.showToast('Please enter the required number of guarantors', 'error');
                //
                // this.setState({
                //     toastMessage: "Please enter the required number of guarantors",
                //     showToast: true
                // });
                return
            }
        }
        this.setState({
            review: !this.state.review
        });
    };

    toggleReview = () => {
        this.setState({
            review: false
        });
    };

    ongetGuarantors = () => {

        if (!this.state.guarantor) return

        let existingGuarantor = this.state.guarantors.find(g => g.username === this.state.guarantor)
        if (existingGuarantor) {
            this.props.showToast("You can't enter the same guarantor twice", 'error');
            return
        }
        this.setState(
            {
                spinner: true,
                fetchingGuarantors: true
            },
            () => {
                apiRequest(getGuarantorForUser, "get", {
                    params: {
                        coopId: this.props.userData.cooperativeId,
                        username: this.state.guarantor,
                    }
                })
                    .then(res => {
                        this.setState({
                            spinner: false
                        });
                        if (res) {
                            console.log(res);
                            let guarantors = [...this.state.guarantors]
                            guarantors.push(res)
                            this.setState({guarantors});
                        } else {
                            this.props.showToast(res.message, 'error');

                            // this.setState({toastMessage: res.messsage});
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            this.props.showToast(error.response.data.message, 'error');
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

    onLoanApply = () => {

        this.setState(
            {
                spinner: true,
                fetchingGuarantors: true
            },
            () => {
                apiRequest(postApplyForLoan, "post", {
                    "active": true,
                    "amount": this.state.amount,
                    "applicationDate": new Date(),
                    // "cancelled": true,
                    "cooperative": this.props.userData.cooperative,
                    "cooperativeId": this.props.userData.cooperativeId,
                    "duration": this.state.loanType.paymentDurationValue,
                    "endDate": "",
                    "firstName": "",
                    "guarantors": [
                        // {
                        //     "active": true,
                        //     "approved": true,
                        //     "firstName": "string",
                        //     "id": 0,
                        //     "lastName": "string",
                        //     "loanApplicationId": 0,
                        //     "memberProfileId": 0,
                        //     "middleName": "string",
                        //     "rejected": true,
                        //     "requesterAmount": 0,
                        //     "requesterFirstName": "string",
                        //     "requesterLastName": "string",
                        //     "requesterMiddleName": "string",
                        //     "username": "string"
                        // }
                        ...this.state.guarantors
                    ],
                    "id": 0,
                    "insuranceAmount": 0,
                    "insuranceInterestRate": 0,
                    "insured": true,
                    "interestRate": 0,
                    "interestToPay": 0,
                    "lastName": "",
                    "loanToPay": 0,
                    "loanType": this.state.loanType.description,
                    "loanTypeId": this.state.loanType.id,
                    "memberProfileId": this.props.userData.id,
                    "middleName": "",
                    "netExposure": 0,
                    // "paid": true,
                    "periodTypeId": 0,
                    "periodicPaybackAmount": 0,
                    // "schedules": [
                    //     {
                    //         "amountPayable": 0,
                    //         "balanceToPay": 0,
                    //         "firstName": "string",
                    //         "id": 0,
                    //         "interestAmount": 0,
                    //         "lastName": "string",
                    //         "loanApplicationId": 0,
                    //         "memberId": 0,
                    //         "middleName": "string",
                    //         "outstandingBalance": 0,
                    //         "paid": true,
                    //         "paidDate": "string",
                    //         "payableDate": "string",
                    //         "principalAmount": 0,
                    //         "remainingPrincipal": 0
                    //     }
                    // ],
                    // "sentForApproval": true,
                    "startDate": "",
                    "totalPayableAmount": 0
                })
                    .then(res => {
                        this.setState({
                            spinner: false
                        });
                        if (res) {
                            console.log(res);

                            this.setState({
                                selected: "1",
                                showLoanInfo: true,
                                showGuarantorInfo: false,
                                review: false,
                                success: true
                            })
                        } else {
                            this.props.showToast(res.message, 'error');

                            // this.setState({toastMessage: res.messsage});
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            this.props.showToast(error.response.data.message, 'error');
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

    onhandleLoanApplication = () => {
        Keyboard.dismiss();

        this.setState(
            {
                spinner: true,
                modalLoader: true
            },
            () => {
                apiRequest(calculateLoan, "get", {
                    params: {
                        amount,
                        loantypeid: this.state.loanType.id,
                        duration: this.state.duration
                    }
                })
                    .then(res => {
                        this.setState({
                            spinner: false
                        });
                        if (res) {
                            console.log(res);
                            console.log(res.data);
                            this.showCalculator();
                        } else {
                            this.setState({toastMessage: res.message});
                            this.toggleToast();
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            this.toggleToast();
                            this.setState({toastMessage: error.response});
                            console.log(error.response);
                        } else {
                            this.toggleToast();
                            this.setState({
                                toastMessage: error.message
                            });
                        }
                        this.setState({
                            spinner: false
                        });
                    });
            }
        );
    };

    validateLoanInfo = () => {
        if (Object.entries(this.state.loanType).length <= 0) {
            // this.setState({
            //     toastMessage: 'Kindly enter a valid loan type',
            //     showToast: true
            // });

            this.props.showToast('Kindly enter a valid loan type', 'error');


            return false;
        } else if (this.state.amount <= 0) {
            this.props.showToast('Kindly enter a valid amount', 'error');
            // this.setState({
            //     toastMessage: 'Kindly enter a valid amount',
            //     showToast: true
            // });


            return false;
        }
        this.setState({
            showLoanInfo: false,
            selected: "2",
            showGuarantorInfo: true
        });
    };

    deleteGuarantor = (id) => {
        let guar = this.state.guarantors.filter(g => g.id !== id);
        this.setState({
            guarantors: guar
        })
    }

    render() {
        console.log(this.state)
        const Guarantor = ({item}) => {
            return (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "flex-start",
                        marginBottom: scaleHeight(30)
                    }}
                >
                    <View
                        style={{
                            flex: 3,
                            flexDirection: "row"
                        }}
                    >
                        {/*<Image*/}
                        {/*source={require("../../../../assets/icons/man.png")}*/}
                        {/*style={{flex: 1}}*/}
                        {/*/>*/}

                        <View
                            style={{
                                flex: 3,
                                justifyContent: "space-between",
                                paddingVertical: scaleHeight(10),
                                paddingHorizontal: scale(12)
                            }}
                        >
                            <Text style={{color: "#504e4e", fontFamily: 'nunito-medium', fontSize: scale(15)}}>
                                {item.firstName} {item.lastName}
                            </Text>
                            <Text style={{color: "#c1c1c1", fontFamily: 'nunito-regular', fontSize: scale(15)}}>
                                {item.username}
                            </Text>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={[styles.icon]}
                            onPress={() => this.deleteGuarantor(item.id)}
                        >
                            <Icon
                                name="close"
                                iconStyle={[
                                    theme.typo_bold,
                                    // styles.icon,
                                    {
                                        color: "#138516",
                                        // flex: 1,
                                        // marginTop: scaleHeight(10),
                                        // justifyContent: "flex-end",
                                        // alignContent: "center"
                                    }
                                ]}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }


        return (
            <View>

                {!!this.state.review && (<Modal
                    // visible={this.props.visible}
                    // onBackButtonPress={this.props._toggleView}


                    // avoidKeyboard={true}
                    animationIn={'slideInUp'}
                    onBackdropPress={this.props._toggleView}
                    isVisible={this.props.visible}
                    style={{margin: 0, paddingTop: scale(24)}}
                >
                    <View
                        style={{

                            flexDirection: "row",
                            justifyContent: "space-between",
                            position: "absolute",
                            width: '100%',
                            zIndex: 999,
                            paddingHorizontal: scale(15),
                            top: scale(25)
                        }}
                    >
                        <Spinner visible={this.state.spinner} size="large" color="#000000" animation="none"
                                 overlayColor={'rgba(0, 0, 0, 0.5)'}/>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => this.setState({review: false})}
                            style={{width: width / 3}}
                        >
                            <Text
                                style={[
                                    theme.font17,
                                    {color: "#fff", paddingHorizontal: scale(7)}
                                ]}
                            >
                                Back
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.icon}
                            onPress={this.props._toggleView}
                        >
                            <Icon
                                name="close"
                                iconStyle={[
                                    theme.typo_bold,
                                    // styles.icon,
                                    // styles.exit
                                ]}
                            />
                        </TouchableOpacity>
                    </View>
                    {/*{this.state.showToast && (*/}
                    {/*<Toast*/}
                    {/*message={this.state.toastMessage}*/}
                    {/*type="error"*/}
                    {/*onClickHandler={() =>*/}
                    {/*this.setState({showToast: false})*/}
                    {/*}*/}
                    {/*/>*/}
                    {/*)}*/}

                    {this.props.toastShow && <Toast
                        show={this.props.toastShow}
                        type={this.props.toastType}
                        message={this.props.toastMessage ? this.props.toastMessage.toString() : ''}
                        onClickHandler={this.props.hideToast}
                    />}
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        top: scale(80),
                        borderTopLeftRadius: scale(10),
                        borderTopRightRadius: scale(10),
                        backgroundColor: "white",
                        paddingTop: scale(20),
                        paddingHorizontal: scale(15)
                    }}>
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
                                borderTopLeftRadius: scale(10),
                                borderTopRightRadius: scale(10),
                            }}
                        >
                            <View style={styles.bottomNavigationView}>
                                <View style={{}}>
                                    <View style={[styles.header]}>
                                        <Image
                                            style={{}}
                                            source={require("../../../../assets/icons/naira.png")}
                                        />
                                        <Text
                                            style={[
                                                theme.typo_bold,
                                                theme.font17,
                                                {
                                                    width: width - 80,
                                                    paddingLeft: scale(20),
                                                    paddingVertical: scaleHeight(20)
                                                }
                                            ]}
                                        >
                                            Review Application
                                        </Text>
                                    </View>

                                    <View style={{}}>
                                        <View
                                            style={[
                                                theme.container,
                                                // styles.MainContainer
                                            ]}
                                        >
                                            <View style={{flexDirection: "row", alignItems: 'flex-start'}}>
                                                <View
                                                    style={{
                                                        flex: 2,
                                                        flexDirection: "column",
                                                        marginRight: 12
                                                    }}
                                                >
                                                    <View>
                                                        <Text style={[styles.label]}>
                                                            Loan Summary
                                                        </Text>
                                                        <View
                                                            style={[
                                                                styles.pickerStlye,
                                                                {
                                                                    borderWidth:
                                                                    StyleSheet.hairlineWidth
                                                                }
                                                            ]}
                                                        >
                                                            <SelectDropdown
                                                                options={
                                                                    this.props.loanTypes || []
                                                                }
                                                                value={""}
                                                                disabled={true}
                                                                title={`Select Loan Type`}
                                                                onChange={obj => {
                                                                    console.log(obj)
                                                                    this.setState({
                                                                        loanType: obj
                                                                    });
                                                                    // if (obj.numberOfGuarantors > 0) {
                                                                    //     this.ongetGuarantors(obj.id)
                                                                    // }
                                                                }
                                                                }
                                                                dropdownImageStyle={{
                                                                    top: scale(10)
                                                                }}
                                                            >
                                                                <View
                                                                    style={[
                                                                        {
                                                                            height: scale(40),
                                                                            paddingHorizontal: scale(
                                                                                20
                                                                            ),
                                                                            justifyContent: "center"
                                                                        }
                                                                    ]}
                                                                    // onPress={this.onhandleSubmit}
                                                                >
                                                                    {/*<Text style={styles.label}>Bank Name </Text>*/}
                                                                    <Text
                                                                        numberOfLines={1}
                                                                        style={styles.selectText}
                                                                    >
                                                                        {this.state.loanType
                                                                            .description || ""}
                                                                    </Text>
                                                                </View>
                                                            </SelectDropdown>
                                                        </View>
                                                    </View>
                                                </View>

                                                <View
                                                    style={{
                                                        flex: 1,
                                                        justifyContent: "flex-end",
                                                        marginLeft: 12
                                                    }}
                                                >
                                                    <Text style={[styles.label]}>
                                                        Interest Rate
                                                    </Text>

                                                    <View
                                                        style={{
                                                            height: scale(40),
                                                            backgroundColor: "#d0e7d1",
                                                            justifyContent: 'center', alignItems: 'center'
                                                        }}
                                                    >
                                                        <Text
                                                            style={[
                                                                theme.font15,
                                                                {
                                                                    color: "#138516",
                                                                    textAlign: "center",
                                                                    textAlignVertical: "center"
                                                                }
                                                            ]}
                                                        >{`${this.state.loanType
                                                            .interestRate || 0}%`}</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            {this.state.loanType.requiresGuarantor ? (
                                                <Text
                                                    style={[
                                                        {
                                                            fontSize: 11,
                                                            color: "#138516",
                                                            flexDirection: "row",
                                                            alignItems: "flex-start",
                                                            justifyContent: "flex-start",
                                                            fontFamily: "nunito-regular",
                                                            marginVertical: scaleHeight(20)
                                                        }
                                                    ]}
                                                >
                                                    {`For this Loan type, you would require ${this.state.loanType.numberOfGuarantors} guarantor(s)`}
                                                </Text>
                                            ) : (
                                                <View
                                                    style={{
                                                        marginVertical: scaleHeight(15)

                                                    }}
                                                ></View>
                                            )}
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    alignItems: "flex-start",
                                                    marginBottom: scaleHeight(30)
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flex: 2,
                                                        flexDirection: "column",
                                                        marginRight: 12
                                                    }}
                                                >

                                                    <Text style={[styles.label]}>
                                                        Amount
                                                    </Text>
                                                    <View style={[styles.pickerStlye]}>
                                                        <CustomInput
                                                            value={this.state.amount}
                                                            keyboardType="number-pad"
                                                            editable={false}
                                                            onChangeText={amount =>
                                                                this.changeState({
                                                                    amount: amount
                                                                })
                                                            }
                                                            style={[
                                                                theme.flex1,
                                                                theme.caption,
                                                                theme.typo_regular,
                                                                {borderColor: "#d0d0d0"}
                                                            ]}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            {/*<TouchableOpacity*/}
                                            {/*activeOpacity={0.7}*/}
                                            {/*style={[styles.buttons]}*/}
                                            {/*onPress={this.validateLoanInfo}*/}
                                            {/*>*/}

                                            {/*<GreenButton button_text="Proceed" handlePress={this.validateLoanInfo}/>*/}
                                            {/*</TouchableOpacity>*/}
                                        </View>


                                        <View
                                            style={[
                                                theme.container,
                                                styles.MainContainer
                                            ]}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    alignItems: "flex-start"
                                                }}
                                            >
                                                <View
                                                    style={{width: '100%'}}

                                                >
                                                    <Text
                                                        style={[
                                                            theme.caption,
                                                            theme.flex1,
                                                            theme.padded_label
                                                        ]}
                                                    >
                                                        Guarantors

                                                    </Text>
                                                    {/*<View style={[styles.pickerStlye]}>*/}
                                                    {/*<CustomInput*/}
                                                    {/*value={this.state.guarantor}*/}
                                                    {/*onChangeText={guarantor =>*/}
                                                    {/*this.changeState({*/}
                                                    {/*guarantor: guarantor.trim()*/}
                                                    {/*})*/}
                                                    {/*}*/}
                                                    {/*autoCorrect={false}*/}
                                                    {/*style={[*/}
                                                    {/*theme.flex1,*/}
                                                    {/*theme.caption,*/}
                                                    {/*theme.typo_regular*/}
                                                    {/*]}*/}
                                                    {/*onSubmitEditing={this.ongetGuarantors}*/}
                                                    {/*blurOnSubmit={true}*/}
                                                    {/*/>*/}
                                                    {/*</View>*/}
                                                    {this.state.loanType
                                                        .requiresGuarantor ? (
                                                        <Text
                                                            style={[
                                                                {
                                                                    fontSize: 11,
                                                                    color: "#138516",
                                                                    flexDirection: "row",
                                                                    alignItems: "flex-start",
                                                                    justifyContent: "flex-start",
                                                                    fontFamily: "nunito-regular",
                                                                    marginVertical: scaleHeight(20)
                                                                }
                                                            ]}
                                                        >
                                                            {`At least ${this.state.loanType.numberOfGuarantors} guarantor(s)`}
                                                        </Text>
                                                    ) : (
                                                        <View
                                                            style={{
                                                                marginVertical: scaleHeight(20)
                                                            }}
                                                        ></View>
                                                    )}
                                                    <View>
                                                        <FlatList
                                                            data={this.state.guarantors}
                                                            renderItem={({item, index}) => (
                                                                <Guarantor item={item}/>
                                                            )}
                                                            keyExtractor={item => item.id}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            {/* <View
                                       style={{
                                         flexDirection: "row",
                                         alignItems: "flex-start",
                                         marginBottom: scaleHeight(30)
                                       }}
                                     >
                                       <View
                                         style={{
                                           flex: 3,
                                           flexDirection: "row"
                                         }}
                                       >
                                         <Image
                                           source={require("../../../../assets/icons/man.png")}
                                           style={{ flex: 1 }}
                                         />
                                         <View
                                           style={{
                                             flex: 3,
                                             justifyContent: "space-between",
                                             paddingVertical: scaleHeight(10),
                                             paddingHorizontal: scale(12)
                                           }}
                                         >
                                           <Text style={{ color: "#504e4e" }}>
                                             Mr Obasi Suleman
                                           </Text>
                                           <Text style={{ color: "#c1c1c1" }}>
                                             joshuadavid@gmail.com
                                           </Text>
                                         </View>
                                         <TouchableOpacity
                                           activeOpacity={0.7}
                                           onPress={() => console.log("cancel")}
                                         >
                                           <Icon
                                             name="close"
                                             iconStyle={[
                                               theme.typo_bold,
                                               styles.icon,
                                               {
                                                 flex: 1,
                                                 marginTop: scaleHeight(10),
                                                 justifyContent: "flex-end",
                                                 alignContent: "center"
                                               }
                                             ]}
                                           />
                                         </TouchableOpacity>
                                       </View>
                                     </View> */}

                                            {/*<TouchableOpacity*/}
                                            {/*activeOpacity={0.7}*/}
                                            {/*style={[styles.buttons, {flex: 1}]}*/}
                                            {/*onPress={this.showApplyForm}*/}
                                            {/*>*/}

                                            <TouchItem style={{
                                                width: '100%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginBottom: scale(28)
                                            }}
                                                       onPress={() => this.setState({
                                                           review: false,
                                                           showGuarantorInfo: false,
                                                           selected: "1",
                                                           showLoanInfo: true
                                                       })}
                                            >
                                                <Text style={{
                                                    fontFamily: 'nunito-bold',
                                                    fontSize: scale(17), color: '#138516'
                                                }}>Edit Applications</Text>
                                            </TouchItem>
                                            <GreenButton button_text="Proceed" handlePress={this.onLoanApply}/>
                                            {/*</TouchableOpacity>*/}
                                        </View>

                                    </View>
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                    </View>
                </Modal>)}

                {!this.state.review && (<Modal
                    // visible={this.props.visible}
                    // onBackButtonPress={this.props._toggleView}


                    // avoidKeyboard={true}
                    animationIn={'slideInUp'}
                    onBackdropPress={this.props._toggleView}
                    isVisible={this.props.visible}
                    style={{margin: 0, paddingTop: scale(24)}}
                >
                    <View
                        style={{

                            flexDirection: "row",
                            justifyContent: "flex-end",
                            position: "absolute",
                            width: '100%',
                            zIndex: 999,
                            paddingHorizontal: scale(15),
                            top: scale(25)
                        }}
                    >
                        <Spinner visible={this.state.spinner} size="large" color="#000000" animation="none"
                                 overlayColor={'rgba(0, 0, 0, 0.5)'}/>
                        {/*<TouchableOpacity*/}
                        {/*activeOpacity={0.7}*/}
                        {/*onPress={this.props._toggleView}*/}
                        {/*style={{width: width / 3}}*/}
                        {/*>*/}
                        {/*<Text*/}
                        {/*style={[*/}
                        {/*theme.font17,*/}
                        {/*{color: "#fff", paddingHorizontal: scale(7)}*/}
                        {/*]}*/}
                        {/*>*/}
                        {/*Back*/}
                        {/*</Text>*/}
                        {/*</TouchableOpacity>*/}
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.icon}
                            onPress={this.props._toggleView}
                        >
                            <Icon
                                name="close"
                                iconStyle={[
                                    theme.typo_bold,
                                    // styles.icon,
                                    // styles.exit
                                ]}
                            />
                        </TouchableOpacity>
                    </View>
                    {/*{this.state.showToast && (*/}
                    {/*<Toast*/}
                    {/*message={this.state.toastMessage}*/}
                    {/*type="error"*/}
                    {/*onClickHandler={() =>*/}
                    {/*this.setState({showToast: false})*/}
                    {/*}*/}
                    {/*/>*/}
                    {/*)}*/}

                    {this.props.toastShow && <Toast
                        show={this.props.toastShow}
                        type={this.props.toastType}
                        message={this.props.toastMessage ? this.props.toastMessage.toString() : ''}
                        onClickHandler={this.props.hideToast}
                    />}
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        top: scale(80),
                        borderTopLeftRadius: scale(10),
                        borderTopRightRadius: scale(10),
                        backgroundColor: "white",
                        paddingTop: scale(20)
                    }}>
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
                                borderTopLeftRadius: scale(10),
                                borderTopRightRadius: scale(10),
                            }}
                        >
                            <View style={styles.bottomNavigationView}>
                                <View style={{}}>
                                    <View style={[styles.header]}>
                                        <Image
                                            style={{}}
                                            source={require("../../../../assets/icons/naira.png")}
                                        />
                                        <Text
                                            style={[
                                                theme.typo_bold,
                                                theme.font17,
                                                {
                                                    width: width - 80,
                                                    paddingLeft: scale(20),
                                                    paddingVertical: scaleHeight(20)
                                                }
                                            ]}
                                        >
                                            Apply For Loan
                                        </Text>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Tabs
                                            tab1Text="Loan Info"
                                            tab2Text="Guarantor Info"
                                            selected={this.state.selected}
                                            tab2Event={this.validateLoanInfo}
                                            tab1Event={() =>
                                                this.setState({
                                                    showGuarantorInfo: false,
                                                    selected: "1",
                                                    showLoanInfo: true
                                                })
                                            }
                                        />
                                    </View>
                                    <View style={{flex: 6}}>
                                        {this.state.showLoanInfo && (
                                            <View
                                                style={[
                                                    theme.container,
                                                    styles.MainContainer
                                                ]}
                                            >
                                                <View style={{flexDirection: "row", alignItems: 'flex-start'}}>
                                                    <View
                                                        style={{
                                                            flex: 2,
                                                            flexDirection: "column",
                                                            marginRight: 12
                                                        }}
                                                    >
                                                        <View>
                                                            <Text style={[styles.label]}>
                                                                Loan Summary
                                                            </Text>
                                                            <View
                                                                style={[
                                                                    styles.pickerStlye,
                                                                    {
                                                                        borderWidth:
                                                                        StyleSheet.hairlineWidth
                                                                    }
                                                                ]}
                                                            >
                                                                <SelectDropdown
                                                                    options={
                                                                        this.props.loanTypes || []
                                                                    }
                                                                    value={""}
                                                                    title={`Select Loan Type`}
                                                                    onChange={obj => {
                                                                        console.log(obj)
                                                                        this.setState({
                                                                            loanType: obj
                                                                        });
                                                                        // if (obj.numberOfGuarantors > 0) {
                                                                        //     this.ongetGuarantors(obj.id)
                                                                        // }
                                                                    }
                                                                    }
                                                                    dropdownImageStyle={{
                                                                        top: scale(10)
                                                                    }}
                                                                >
                                                                    <View
                                                                        style={[
                                                                            {
                                                                                height: scale(40),
                                                                                paddingHorizontal: scale(
                                                                                    20
                                                                                ),
                                                                                justifyContent: "center"
                                                                            }
                                                                        ]}
                                                                        // onPress={this.onhandleSubmit}
                                                                    >
                                                                        {/*<Text style={styles.label}>Bank Name </Text>*/}
                                                                        <Text
                                                                            numberOfLines={1}
                                                                            style={styles.selectText}
                                                                        >
                                                                            {this.state.loanType
                                                                                .description || ""}
                                                                        </Text>
                                                                    </View>
                                                                </SelectDropdown>
                                                            </View>
                                                        </View>
                                                    </View>

                                                    <View
                                                        style={{
                                                            flex: 1,
                                                            justifyContent: "flex-end",
                                                            marginLeft: 12
                                                        }}
                                                    >
                                                        <Text style={[styles.label]}>
                                                            Interest Rate
                                                        </Text>

                                                        <View
                                                            style={{
                                                                height: scale(40),
                                                                backgroundColor: "#d0e7d1",
                                                                justifyContent: 'center', alignItems: 'center'
                                                            }}
                                                        >
                                                            <Text
                                                                style={[
                                                                    theme.font15,
                                                                    {
                                                                        color: "#138516",
                                                                        textAlign: "center",
                                                                        textAlignVertical: "center"
                                                                    }
                                                                ]}
                                                            >{`${this.state.loanType
                                                                .interestRate || 0}%`}</Text>
                                                        </View>
                                                    </View>
                                                </View>

                                                {this.state.loanType.requiresGuarantor ? (
                                                    <Text
                                                        style={[
                                                            {
                                                                fontSize: 11,
                                                                color: "#138516",
                                                                flexDirection: "row",
                                                                alignItems: "flex-start",
                                                                justifyContent: "flex-start",
                                                                fontFamily: "nunito-regular",
                                                                marginVertical: scaleHeight(20)
                                                            }
                                                        ]}
                                                    >
                                                        {`For this Loan type, you would require ${this.state.loanType.numberOfGuarantors} guarantor(s)`}
                                                    </Text>
                                                ) : (
                                                    <View
                                                        style={{
                                                            marginVertical: scaleHeight(15)

                                                        }}
                                                    ></View>
                                                )}
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        alignItems: "flex-start",
                                                        marginBottom: scaleHeight(30)
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            flex: 2,
                                                            flexDirection: "column",
                                                            marginRight: 12
                                                        }}
                                                    >

                                                        <Text style={[styles.label]}>
                                                            Amount
                                                        </Text>
                                                        <View style={[styles.pickerStlye]}>
                                                            <CustomInput
                                                                value={this.state.amount}
                                                                keyboardType="number-pad"
                                                                onChangeText={amount =>
                                                                    this.changeState({
                                                                        amount: amount
                                                                    })
                                                                }
                                                                style={[
                                                                    theme.flex1,
                                                                    theme.caption,
                                                                    theme.typo_regular,
                                                                    {borderColor: "#d0d0d0"}
                                                                ]}
                                                            />
                                                        </View>
                                                    </View>

                                                    <View
                                                        style={{
                                                            flex: 1,
                                                            justifyContent: "flex-end",
                                                            marginLeft: 12

                                                        }}
                                                    >
                                                        <Text style={[styles.label]}>
                                                            Guarantor
                                                        </Text>

                                                        <View
                                                            style={{
                                                                height: scale(40),
                                                                backgroundColor: "#d0e7d1",
                                                                justifyContent: 'center', alignItems: 'center'
                                                            }}
                                                        >
                                                            <Text
                                                                style={[
                                                                    theme.font15,
                                                                    {
                                                                        color: "#138516",
                                                                        // backgroundColor: "#d0e7d1",
                                                                        // height: scaleHeight(40),
                                                                        textAlignVertical: "center",
                                                                        textAlign: "center"
                                                                    }
                                                                ]}
                                                            >
                                                                {this.state.loanType
                                                                    .requiresGuarantor
                                                                    ? `Needed`
                                                                    : `Not Needed`}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                {/*<TouchableOpacity*/}
                                                {/*activeOpacity={0.7}*/}
                                                {/*style={[styles.buttons]}*/}
                                                {/*onPress={this.validateLoanInfo}*/}
                                                {/*>*/}

                                                <GreenButton button_text="Proceed" handlePress={this.validateLoanInfo}/>
                                                {/*</TouchableOpacity>*/}
                                            </View>
                                        )}
                                        {this.state.showGuarantorInfo && (
                                            <View
                                                style={[
                                                    theme.container,
                                                    styles.MainContainer
                                                ]}
                                            >
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        alignItems: "flex-start"
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            flex: 2,
                                                            flexDirection: "column"
                                                        }}
                                                    >
                                                        <Text
                                                            style={[
                                                                theme.caption,
                                                                theme.flex1,
                                                                theme.padded_label
                                                            ]}
                                                        >
                                                            Add a Guarantor{" "}

                                                        </Text>
                                                        <View style={[styles.pickerStlye]}>
                                                            <CustomInput
                                                                value={this.state.guarantor}
                                                                onChangeText={guarantor =>
                                                                    this.changeState({
                                                                        guarantor: guarantor.trim()
                                                                    })
                                                                }
                                                                autoCorrect={false}
                                                                style={[
                                                                    theme.flex1,
                                                                    theme.caption,
                                                                    theme.typo_regular
                                                                ]}
                                                                onSubmitEditing={this.ongetGuarantors}
                                                                blurOnSubmit={true}
                                                            />
                                                        </View>
                                                        {this.state.loanType
                                                            .requiresGuarantor ? (
                                                            <Text
                                                                style={[
                                                                    {
                                                                        fontSize: 11,
                                                                        color: "#138516",
                                                                        flexDirection: "row",
                                                                        alignItems: "flex-start",
                                                                        justifyContent: "flex-start",
                                                                        fontFamily: "nunito-regular",
                                                                        marginVertical: scaleHeight(20)
                                                                    }
                                                                ]}
                                                            >
                                                                {`At least ${this.state.loanType.numberOfGuarantors} guarantor(s)`}
                                                            </Text>
                                                        ) : (
                                                            <View
                                                                style={{
                                                                    marginVertical: scaleHeight(20)
                                                                }}
                                                            ></View>
                                                        )}
                                                        <View>
                                                            <FlatList
                                                                data={this.state.guarantors}
                                                                renderItem={({item, index}) => (
                                                                    <Guarantor item={item}/>
                                                                )}
                                                                keyExtractor={item => item.id}
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                                {/* <View
                                       style={{
                                         flexDirection: "row",
                                         alignItems: "flex-start",
                                         marginBottom: scaleHeight(30)
                                       }}
                                     >
                                       <View
                                         style={{
                                           flex: 3,
                                           flexDirection: "row"
                                         }}
                                       >
                                         <Image
                                           source={require("../../../../assets/icons/man.png")}
                                           style={{ flex: 1 }}
                                         />
                                         <View
                                           style={{
                                             flex: 3,
                                             justifyContent: "space-between",
                                             paddingVertical: scaleHeight(10),
                                             paddingHorizontal: scale(12)
                                           }}
                                         >
                                           <Text style={{ color: "#504e4e" }}>
                                             Mr Obasi Suleman
                                           </Text>
                                           <Text style={{ color: "#c1c1c1" }}>
                                             joshuadavid@gmail.com
                                           </Text>
                                         </View>
                                         <TouchableOpacity
                                           activeOpacity={0.7}
                                           onPress={() => console.log("cancel")}
                                         >
                                           <Icon
                                             name="close"
                                             iconStyle={[
                                               theme.typo_bold,
                                               styles.icon,
                                               {
                                                 flex: 1,
                                                 marginTop: scaleHeight(10),
                                                 justifyContent: "flex-end",
                                                 alignContent: "center"
                                               }
                                             ]}
                                           />
                                         </TouchableOpacity>
                                       </View>
                                     </View> */}

                                                {/*<TouchableOpacity*/}
                                                {/*activeOpacity={0.7}*/}
                                                {/*style={[styles.buttons, {flex: 1}]}*/}
                                                {/*onPress={this.showApplyForm}*/}
                                                {/*>*/}

                                                <GreenButton button_text="Proceed" handlePress={this.showApplyForm}/>
                                                {/*</TouchableOpacity>*/}
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                    </View>
                </Modal>)}

                {!!this.state.success && (
                    <ApplicationSuccessful
                        visible={this.state.success}
                        _toggleView={() => {
                            this.setState({
                                selected: "1",
                                showLoanInfo: true,
                                showGuarantorInfo: false,
                                success: false,
                                review: false
                            })
                            this.props._toggleView()
                        }}
                        {...this.props}
                        subtitle="Request Submitted Successfully"

                        smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/>
                )}

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.login,
        isLoading: state.changePassword.loading,
        isPasswordChanged: state.changePassword.passwordChanged,
        toastType: state.toast.boxType,
        toastShow: state.toast.show,
        toastMessage: state.toast.message,
    };
};
const mapDispatchToProps = {
    showToast,
    hideToast
    // changePasswordSuccess,
    // loginSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyLoanModal);


const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        margin: 2,
        paddingHorizontal: scale(10),
        marginTop: scale(20),
        paddingTop: Platform.OS === "ios" ? 20 : 0
    },
    header: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#efefef",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: scale(16),
        justifyContent: "flex-start",
        marginBottom: scale(20),
        paddingBottom: scale(20)
        // flex: 1
    },
    bottomNavigationView: {
        backgroundColor: "#fff",
        // height: scaleHeight(height / 1.1),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // justifyContent: "flex-start",
        // alignItems: "flex-start"
    },
    exit: {
        backgroundColor: "#fff",
        marginRight: scale(10),
        marginBottom: scaleHeight(10)
    },

    icon: {
        borderRadius: scale(19),
        width: scale(38),
        height: scale(38),
        fontSize: 25,
        padding: scale(6),
        color: "#138516",
        backgroundColor: "#f5f5f5"

    },
    selectText: {
        fontFamily: "nunito-medium",
        fontSize: scale(15),
        color: "#9f9f9f"
    },
    label: {
        fontFamily: "nunito-bold",
        marginBottom: scaleHeight(11),
        marginTop: scaleHeight(20)
    },
    pickerStlye: {
        color: "#9f9f9f",
        borderColor: "#d0d0d0",
        backgroundColor: "rgba(0, 13, 55, 0.02)",
        height: scaleHeight(40),
        flexDirection: "column",
        justifyContent: "center"
    },
    buttons: {
        flex: 1,
        marginHorizontal: scale(10)
    }
});
