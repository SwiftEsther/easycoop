import React from 'react';
import {Image, Modal, View, Text } from 'react-native';
import { scale } from "../../lib/utils/scaleUtils";

export const LoaderText =  ({visible, desciption}) => {
    if (visible) {
        return (
            <Modal
                transparent={true}
                onRequestClose={() => {}}>
              <View
              style={{
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: scale(30)
              }}>
                  <Text style={{
                    fontFamily:'graphik-regular',
                      fontSize:scale(20),
                      color:'white',
                      lineHeight:scale(22)
                  }}>{desciption}</Text>

              </View>
            </Modal>)
    }
    return null
};
