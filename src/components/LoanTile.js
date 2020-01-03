import React, { Component } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight, StyleSheet } from "react-native";
import theme from "../../assets/styles/globalStyles";
import { scale, scaleHeight } from "../helpers/scale";

class LoanTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false
    };
  }

  toggleButton = () => {
    this.setState({ showButton: !this.state.showButton });
  };

  render() {
    return (
      <TouchableHighlight
        key={this.props.data.value}
        underlayColor="#f7f7f7"
        activeOpacity={0.75}
        onPress={this.toggleButton}
      >
        <View
          style={{
            paddingVertical: scaleHeight(13),
            paddingHorizontal: scale(10)
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginVertical: scaleHeight(4)
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontFamily: "nunito-regular" }}>Loan ID: </Text>
              <Text
                style={{
                  textAlign: "left",
                  fontFamily: "nunito-bold",
                  paddingLeft: scale(1)
                }}
              >
                {`${this.props.data.id}`}
              </Text>
            </View>
            <Text
              style={{
                flex: 1,
                textAlign: "right",
                color: "#575757",
                fontFamily: "nunito-bold"
              }}
            >
              {`₦${this.props.data.amount}`}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginVertical: scaleHeight(4)
            }}
          >
            <Text
              style={{ flex: 1, color: "#f80000", fontFamily: "nunito-bold" }}
            >
              Not Approved
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: scaleHeight(26)
            }}
          >
            {!this.state.showButton && <View></View>}
            {this.state.showButton && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  marginTop: scaleHeight(15)
                }}
              >
                <Text
                  style={[
                    styles.defaultButton,
                    {
                      backgroundColor: "#fff",
                      borderWidth: StyleSheet.hairlineWidth,
                      borderColor: "#138516",
                      paddingHorizontal: scale(20),
                      paddingVertical: scaleHeight(13)
                    }
                  ]}
                >
                  View Application
                </Text>
              </TouchableOpacity>
            )}
            <View style={{ alignSelf: "flex-end", alignItems: "flex-end" }}>
              <Text
                style={{ color: "#138516", textAlign: "right" }}
              >{`${this.props.data.time}`}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );

  }
} 
    const styles = StyleSheet.create({
      defaultButton: {
        fontSize: 17,
        padding: scale(13),
        color: "#138516",
        borderRadius: 3,
        textAlign: "center",
        fontFamily: "nunito-bold"
      }
    });

export default LoanTile;
