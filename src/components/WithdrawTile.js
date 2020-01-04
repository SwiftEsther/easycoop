import React, {Component} from 'react';
import {View, Text, TouchableHighlight, TouchableOpacity, StyleSheet} from 'react-native';
import theme from '../../assets/styles/globalStyles';
import {scale, scaleHeight} from '../helpers/scale';
import ApplicationStatus from "./ApplicationStatus";

class WithdrawTile extends Component {
  constructor(props) {
    super(props);
    this.state= {
      showButton: false,
      success:true
    }
  }

  toggleButton=()=>{
    this.setState({showButton: !this.state.showButton})
  }

  render() {
    return (
      <>
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
            <View style={{ flex: 2, flexDirection: "row" }}>
              <Text style={{ flex: 5, fontFamily: "nunito-regular" }}>
                Withdrawal ID:{" "}
              </Text>
              <Text
                style={{
                  flex: 6,
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
                onPress={this.props.viewRequest}
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
                  View Request
                </Text>
              </TouchableOpacity>
            )}
            <View style={{ alignSelf: "flex-end" }}>
              <Text
                style={{ color: "#138516" }}
              >{`${this.props.data.time}`}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
        </>
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
    fontFamily: 'nunito-bold'
  }
});

export default WithdrawTile
