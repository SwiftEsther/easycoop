import React, { Component } from 'react';
import { StyleSheet, View, Platform, Text, Image } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import theme from '../../assets/styles/globalStyles';
import GreenButton from '../components/GreenButton';
import { Icon } from 'react-native-elements';

const SuccessModal =(props)=>(
    <View>
        <BottomSheet
          visible={props.sucess}
          onBackButtonPress={props._closeSuccessModal}
          onBackdropPress={props._closeSuccessModal}
        >
            <View style={styles.bottomNavigationView}>
                <Icon name='close' iconStyle={[theme.typo_bold,{backgroundColor: '#fff', borderRadius:50, fontSize: 25, padding:6, top: 16, right:0, position: 'absolute'}]}/>
                <View style={[theme.center, theme.padding_left_right_25, {paddingTop: 270}]}>
                <Image source={require('../../assets/icons/check_circle.png')} style={[theme.pad_bottom20]}/>
                {props.sub_heading && <Text style={[theme.typo_bold, theme.font15, theme.pad_bottom]}>{props.sub_heading}</Text>}
                <Text style={[theme.typo_regular, theme.margin_left_right_25, theme.pad9, {textAlign: 'center', fontSize: 14}]}>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:
                </Text>
                <View style={{marginBottom: 40, marginTop: 40, bottom:0}}>
                    <GreenButton button_text='I Accept Terms &amp; Conditions'onClick={props.handleClick}/>
                </View>
                </View>
            </View>
        </BottomSheet>
    </View>
);

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#E0F7FA',
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 500,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default SuccessModal;
