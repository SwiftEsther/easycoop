import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import theme from '../../assets/styles/globalStyles';
import GreenLineSeparator from './GreenLineSeparator';
import { scale,scaleHeight } from '../helpers/scale';

const AuthenticationHeader = (props) => (
    <View>
        <TouchableOpacity activeOpacity={0.4} onPress={props.backFunction}>
            <Image source={require('../../assets/icons/back_24px.png')} />
        </TouchableOpacity>
        <View style={[{justifyContent: 'space-between', marginHorizontal: scale(20)}]}>
            <View style={[style.sign_up_header, {marginTop: scaleHeight(30)}]}>
                <View style={{flex:8}}>
                    <Text style={[style.sign_up_header_text]}>{props.text}</Text>
                    <GreenLineSeparator/>
                </View>
                <View style={{flex:1}}>
                    {props.auth && <Image source={require('../../assets/icons/lock_icon.png')} style={{alignSelf: 'flex-end'}}/>}
                    {!props.auth && <Image source={require('../../assets/icons/Group.png')} style={{alignSelf: 'flex-end'}}/>}
                </View>
                
            </View>
        </View>
    </View>
);

const style = StyleSheet.create({
    sign_up_header: {
        flex:1,
        flexDirection: 'row',
        marginBottom: scaleHeight(40),
    },
    sign_up_header_text: {
        fontSize:30,
        paddingBottom:scaleHeight(10),
        fontFamily: 'nunito-bold',
    },
})

export default AuthenticationHeader;
