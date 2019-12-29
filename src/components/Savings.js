import React from "react";
import { View, Text, Image } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { scale, scaleHeight } from "../helpers/scale";

const Savings = props => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: scaleHeight(26.5),
      borderBottomColor: "#bdbdbd",
      paddingHorizontal: scale(10)
    }}
  >
    <MaterialCommunityIcons
      name="arrow-down-drop-circle-outline"
      size={32}
      color="#138516"
    />
    <View
      style={{
        justifyContent: "space-between"
      }}
    >
      <Text style={{ fontFamily: "nunito-medium" }}>
        {`${props.data.title}`}{" "}
      </Text>
      <Text
        style={{
          marginVertical: scaleHeight(15),
          fontFamily: "nunito-regular",
          color: "#138516"
        }}
      >
        {`ID: ${props.data.id}`}
      </Text>
    </View>
    <View style={{ flexDirection: "column", justifyContent: "flex-end" }}>
      <View style={{ alignSelf: "flex-end" }}>
        <Text style={{ color: "#138516" }}>{`${props.data.time}`}</Text>
      </View>
    </View>
  </View>
);

export default Savings;
