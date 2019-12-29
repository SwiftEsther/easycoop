import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { scale, scaleHeight } from '../helpers/scale';

const ProgressBar = (props) => (
  <View style={style.progress_bar}>
    <View style={[style.filler, { width: `${props.percentage || 0}%` }]}></View>
  </View>
);

const style = StyleSheet.create({
    progress_bar: {
        position: 'relative',
        height: scaleHeight(7),
        borderRadius: 4,
    }, 
    filler: {
        backgroundColor: '#00a3c9',
        height: '100%',
        borderRadius: 4,
    }
})

export default ProgressBar;
