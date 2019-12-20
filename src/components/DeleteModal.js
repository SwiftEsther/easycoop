import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Platform, Text, Button, Image, ScrollView, ScrollViewBase } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import theme from '../../assets/styles/globalStyles';
import GreenButton from '../components/GreenButton';
import { Icon } from 'react-native-elements';
import { scale, scaleHeight } from '../helpers/scale';
import { systemWeights } from 'react-native-typography';
import { render } from 'react-dom';

const DeleteModal = (props) => (
    <ScrollView>
        <BottomSheet
            visible={props.visible}
            onBackButtonPress={props._toggleView}
            onBackdropPress={props._toggleView}
        >
            <Icon name='close' iconStyle={[theme.typo_bold, styles.icon]} handlePress={props._toggleView} />
            <View style={styles.bottomNavigationView}>
                <View style={[theme.container, styles.MainContainer, styles.header]}>
                    <Text style={[theme.typo_bold, theme.font17, { marginVertical: scaleHeight(20), paddingRight: scale(100), paddingLeft: scale(20) }]}>Delete Request</Text>
                </View>
                <View style={[theme.center, theme.padding_left_right_25]}>
                    <Image source={require('../../assets/icons/bin.png')} style={[theme.pad_bottom30]} />
                    {props.subtitle && <Text style={[theme.typo_bold, theme.font15, theme.pad_bottom20, { color: '#f80000' }]}>{props.subtitle}</Text>}
                    {props.message && <Text style={[theme.typo_regular, theme.margin_left_right_25, { textAlign: 'center', fontSize: scale(14) }]}>
                        {props.message}
                    </Text>}
                    {props.smallText && <Text style={[theme.typo_regular, theme.margin_left_right_25, { textAlign: 'center', fontSize: scale(10), color: '#C6C6C6' }]}>
                        {props.smallText}
                    </Text>}
                </View>
            </View>
        </BottomSheet>
    </ScrollView>
);

export default DeleteModal;

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
    },
    header: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#efefef',
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 2,
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: height / 1.5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: scale(5)
    },
    bareIcon: {
        color: '#138516',
        borderRadius: 50,
        fontSize: scale(25),
        padding: scale(6),
        top: scaleHeight(-105),
        right: 0,
        position: 'absolute'
    },
    icon: {
        backgroundColor: '#fff',
        borderRadius: 50,
        fontSize: scale(25),
        alignSelf: 'flex-end',
        padding: scale(6),
        top: scaleHeight(-65),
        right: 0,
        position: 'absolute'
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#efefef'
    },
    link: {
        flex: 1,
        alignSelf: 'center',
        alignContent: 'center',
        paddingHorizontal: scale(15),
        paddingVertical: scaleHeight(20),
        fontSize: 12
    },
});
