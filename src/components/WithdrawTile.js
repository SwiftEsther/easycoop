import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import theme from '../../assets/styles/globalStyles';
import {scale, scaleHeight} from '../helpers/scale';

const WithdrawTile = props => (
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
          {`${props.data.id}`}
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
        {`₦${props.data.amount}`}
      </Text>
    </View>
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        marginVertical: scaleHeight(4)
      }}
    >
      <Text style={{ flex: 1, color: "#f80000", fontFamily: "nunito-bold" }}>
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
              paddingHorizontal: scale(20)
            }
          ]}
        >
          View Request
        </Text>
      </TouchableOpacity>
      <View style={{ alignSelf: "flex-end" }}>
        <Text style={{ color: "#138516" }}>{`${props.data.time}`}</Text>
      </View>
    </View>
  </View>
);

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