import React from "react";
import {View, Text, Image} from 'react-native';
import {scale, scaleHeight} from '../helpers/scale';

const GuarantorRequest = props => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: scaleHeight(26.5),
      borderBottomColor: "#bdbdbd",
      paddingHorizontal: scale(10)
    }}
  >
    <Image source={require("../../assets/icons/man.png")} />
    <View
      style={{
        justifyContent: "space-between"
      }}
    >
      <Text style={{ fontFamily: "nunito-medium" }}>
        {`${props.data.name}`}{" "}
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
        {`Loan Amount: #${props.data.amount}`}
      </Text>
    </View>
    <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Image
          style={{ marginRight: scale(10) }}
          source={require("../../assets/icons/green_check_circle.png")}
        />
        <Image source={require("../../assets/icons/green_cancel.png")} />
      </View>
      <View style={{ alignSelf: "flex-end" }}>
        <Text style={{ color: "#138516" }}>{`${props.data.time}`}</Text>
      </View>
    </View>
  </View>
);

export default GuarantorRequest;
