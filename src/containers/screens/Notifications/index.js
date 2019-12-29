import React, { Component } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  View,
  ToastAndroid,
  Alert,
  AsyncStorage,
  ScrollView
} from "react-native";
import { systemWeights } from "react-native-typography";
import theme from "../../../../assets/styles/globalStyles";
import * as colors from "../../../lib/constants/colors";
import * as constants from "../../../../lib/constants";
import Spinner from "react-native-loading-spinner-overlay";
import API from "../../../../lib/api";
import { RESET_PASSWORD } from "../../../../lib/constants";
import AuthenticationHeader from "../../../components/AuthenticationHeader";
import "../../../../lib/helpers";
import Header from "../../../components/Header";
import GeneralNotification from "../../../components/GeneralNotification";
import GuarantorRequest from "../../../components/GuarantorRequest";
import Savings from "../../../components/Savings";
import WithdrawTile from "../../../components/WithdrawTile";
import LoanTile from "../../../components/LoanTile";
import { showToast } from "../../../components/Toast/actions/toastActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomInput from "../../../components/CustomTextInput/CustomInput";
import Space from "../../../components/Space";
import GreenButton from "../../../components/GreenButton";
import { scale, scaleHeight } from "../../../helpers/scale";
import { AntDesign } from "@expo/vector-icons";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      notifications: []
    };
  }

  changeState = value => {
    this.setState(value);
  };

  render() {
    const DATA = [
      {
        type: "savings",
        id: "#AHH232938",
        title: "Voluntary savings credited - Jan",
        time: "3:30am"
      },
      {
        type: "savings",
        id: "#GHH232939",
        title: "Voluntary savings credited - Jan",
        time: "3:30am"
      },
      {
        type: "requests",
        name: "Mr Olabisi Suleiman",
        title: "Voluntary savings credited",
        amount: "200,000,000",
        time: "3:30am"
      },
      {
        type: "withdrawal",
        id: "#AHH232938",
        title: "Voluntary savings credited",
        status: "Not Approved",
        amount: "200,000,000",
        time: "3:30am"
      },
      {
        type: "loan",
        id: "#AHH232938",
        title: "Voluntary savings credited",
        status: "Not Approved",
        amount: "200,000,000",
        time: "3:30am"
      },
      {
        type: "general",
        id: "#AHH232938",
        title: "Loan Request",
        status: "been Approved and Credited",
        time: "3:30am"
      }
    ];

    function Item({ backgroundColor, title, item, type }) {
      return (
        <View style={[style.item, { backgroundColor }]}>
          {item.type === "general" && <GeneralNotification data={item} />}
          {item.type === "loan" && <LoanTile data={item} />}
          {item.type === "withdrawal" && <WithdrawTile data={item} />}
          {item.type === "requests" && <GuarantorRequest data={item} />}
          {item.type === "savings" && <Savings data={item} />}
        </View>
      );
    }

    return (
      <SafeAreaView>
        <Spinner
          visible={this.state.spinner}
          size="large"
          color="#000000"
          animation="none"
          overlayColor={"rgba(255, 255, 255, 0.1)"}
        />
        <StatusBar
          translucent={true}
          backgroundColor={colors.white}
          barStyle="dark-content"
        />
        <ScrollView
          style={{
            backgroundColor: "#fdfdfd"
          }}
        >
          <View
            style={{
              marginTop: scaleHeight(70),
              paddingVertical: scaleHeight(20),
              marginHorizontal: scale(10),
              borderBottomWidth: 2,
              borderBottomColor: "#f8f7f7"
            }}
          >
            <Text style={{ fontFamily: "nunito-bold" }}>Notifications</Text>
          </View>
          <FlatList
            data={DATA}
            renderItem={({ item, index }) =>
              index % 2 !== 0 ? (
                <Item
                  title={item.title}
                  type={item.type}
                  item={item}
                  backgroundColor="#f8f7f7"
                />
              ) : (
                <Item title={item.title} item={item} />
              )
            }
            keyExtractor={item => item.id}
          />
        </ScrollView>
        <Header navigation={{ ...this.props.navigation }} />
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  link: {
    fontSize: 15,
    paddingBottom: 16,
    paddingTop: 16,
    marginBottom: 28
  },
  primary: {
    paddingRight: 38,
    paddingLeft: 38
  },
  secondary: {
    paddingRight: 44,
    paddingLeft: 44
  },
  pageheader: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: scale(18),
    paddingVertical: scaleHeight(18),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  icon: {
    alignSelf: "flex-end",
    marginRight: scale(30)
  },
  input: {
    marginBottom: scaleHeight(12),
    marginRight: scale(40)
  },
  label: {
    fontFamily: "nunito-bold",
    marginVertical: scaleHeight(16)
  },
  container: {
    flex: 1
  },
  item: {
    backgroundColor: "#f9c2ff",
    marginVertical: 8,
  },
  title: {
    fontSize: 32
  }
});
