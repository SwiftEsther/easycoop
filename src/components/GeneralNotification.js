import React from 'react';
import { View, Text } from 'react-native';
import {scale, scaleHeight} from '../helpers/scale';

const GeneralNotification = props => (
  // <View
  //   style={{ paddingVertical: scaleHeight(13), paddingHorizontal: scale(10) }}
  // >
  //   <Text style={{ fontFamily: "nunito-regular" }}>
  //     Your <Text style={{ color: "#138516" }}>{`${props.data.title}`}</Text> for{" "}
  //     <Text style={{ color: "#138516" }}>#1,000,000</Text> has{" "}
  //     <Text>{`${props.data.status}`}</Text> to your account.
  //   </Text>
  //   <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
  //     <View style={{ flexDirection: "row" }}>
  //       <Text style={{ fontFamily: "nunito-regular" }}>Loan ID: </Text>
  //       <Text
  //         style={{
  //           textAlign: "left",
  //           fontFamily: "nunito-bold",
  //           paddingLeft: scale(1),
  //           color: "#138516"
  //         }}
  //       >
  //         {`${props.data.id}`}
  //       </Text>
  //     </View>
  //     <View style={{ alignSelf: "flex-end" }}>
  //       <Text style={{ color: "#138516" }}>{`${props.data.time}`}</Text>
  //     </View>
  //   </View>
  // </View>

  <View
    style={{ paddingVertical: scaleHeight(13), paddingHorizontal: scale(10) }}
  >
    <Text style={{ fontFamily: "nunito-regular" }}>
      Your <Text style={{ color: "#138516" }}>{`${props.data.title}`}</Text> for{" "}
      <Text style={{ color: "#138516" }}>{`${props.data.filename}`}</Text>{" "}
    </Text>
  </View>
);

export default GeneralNotification;
