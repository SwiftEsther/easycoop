import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import theme from '../../assets/styles/globalStyles';
import GreenLineSeparator from './GreenLineSeparator';

const CalculateLoan = (props) => (
    <View>
        <TouchableOpacity style={style.container} activeOpacity={0.4} onPress={props.backFunction}>
            <View><Image source={require('../../assets/icons/Group.png')}/></View>
            <View style={{flexDirection: "column", justifyContent: "space-between"}}>
                <Text style={[style.textHeader]}>Calculate your loan</Text>
                <Text style={[style.textSubHeader]}>tap to calculate</Text>
            </View>
            <View style={{justifyContent: "center"}}>
                <Text>arrow</Text>
            </View>
        </TouchableOpacity>
    </View>
);

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#138516',
        borderRadius: 8,
        padding: 10,
        paddingBottom: 20,
        paddingTop: 20,
        margin: 20,
        marginTop: 0
    },
    textHeader: {
        color: "white",
        fontSize: 20
    },
    textSubHeader: {
        color: "white"
    }
})

export default CalculateLoan;
