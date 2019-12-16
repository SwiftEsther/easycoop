import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

const GreenLineSeparator = () => (
    <View style={style.separator} />
);

const style = StyleSheet.create({
    separator: {
        borderBottomColor: '#138516',
        borderBottomWidth: 4,
        width: 75,
        borderRadius: 2,
    },
});

export default GreenLineSeparator;
