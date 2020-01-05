import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {scale, scaleHeight} from '../helpers/scale';
import {formatBalance} from '../lib/utils/helpers';
import RequestApprovalModal from "./RequestApprovalModal";
import { approveRejectGuarantorRequest } from "../lib/api/url";

class GuarantorRequest extends Component {
  constructor(props) {
    super(props);
  }

  onhandleApprove = () => {
    const { userData } = this.props;
    Keyboard.dismiss();
    let { subject, message } = this.state;

    this.setState(
      {
        spinner: true,
        modalLoader: true
      },
      () => {
        apiRequest(supportMail, "post", {
          subject,
          fromUser: userData.username,
          fromUserEmailPassword: "",
          placeholder: {
            amount: 0,
            balance: 0,
            coop_admin_comment: "",
            coop_name: "",
            desc: "",
            first_name: "",
            last_name: "",
            loan_status: "",
            password: "",
            tnx: "",
            transaction_date: "",
            transaction_units: 0,
            username: userData.username
          },
          template: "",
          to_email: "cfc@myeasycoop.com",
          to_emails: [""],
          emailBody: `${message} Sent from ${userData.firstName}${userData.lastName} \n Email: ${userData.emailAddress} \n Phone Number: ${userData.phoneNumber}`
        })
          .then(res => {
            console.log(res);
            this.setState({
              spinner: false,
              message: "",
              subject: ""
            });

            this.props.sendSupportMailSuccess(res.data);
            this.props.showToast("Mail Sent Successfully", "success");
            this.props.navigation.navigate("Dashboard");
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
  };

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: scale(9),
          paddingVertical: scaleHeight(26.5),
          borderBottomWidth: this.props.bordered ? 1 : 0,
          borderBottomColor: "#bdbdbd"
        }}
      >
        <Image source={require("../../assets/icons/man.png")} />
        <View
          style={{
            justifyContent: "space-between"
          }}
        >
          <Text style={{ fontFamily: "nunito-medium" }}>
            {`${this.props.data.requesterFirstName} ${this.props.data.requesterLastName}`}
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
            {`Loan Amount: ₦${formatBalance(this.props.data.requesterAmount)}`}
          </Text>
        </View>
        <View
          style={{ flexDirection: "column", justifyContent: "space-between" }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity activeOpacity={0.7} onPress={this.props.approve}>
              <Image
                style={{ marginRight: scale(10) }}
                source={require("../../assets/icons/green_check_circle.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={this.props.decline}>
              <Image source={require("../../assets/icons/green_cancel.png")} />
            </TouchableOpacity>
          </View>
          {this.props.data.time && (
            <View style={{ alignSelf: "flex-end" }}>
              <Text
                style={{ color: "#138516" }}
              >{`${this.props.data.time}`}</Text>
            </View>
          )}
        </View>
        {/* <RequestApprovalModal visible={this.state.showApprovalModal}/> */}
      </View>
    );
  }
}

export default GuarantorRequest;
