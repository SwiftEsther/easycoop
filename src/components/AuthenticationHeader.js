import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import theme from '../../assets/styles/globalStyles';
import GreenLineSeparator from './GreenLineSeparator';

const AuthenticationHeader = (props) => (
    <View style={style.fixed_up}>
        <TouchableOpacity activeOpacity={0.4} onPress={props.backFunction}>
            <Image source={require('../../assets/icons/back_24px.png')} />
        </TouchableOpacity>
        <View style={[theme.margin_left_right_25]}>
            <View style={[style.sign_up_header, theme.box_gap_more]}>
                <View>
                    <Text style={[style.sign_up_header_text, theme.typo_bold]}>{props.text}</Text>
                    <GreenLineSeparator/>
                </View>
                
                <Image source={require('../../assets/icons/Group.png')} />
            </View>
        </View>
    </View>
);

const style = StyleSheet.create({
    sign_up_header: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'flex-start', 
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    sign_up_header_text: {
        fontSize:30,
        paddingBottom:10,
        width: 100
    },
    fixed_up: {
        top: 0
    },
})

export default AuthenticationHeader;
