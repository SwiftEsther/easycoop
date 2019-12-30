import React from 'react';
import { StyleSheet, View, Platform, Text, TouchableOpacity, Image, ScrollView, ScrollViewBase } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import theme from '../../assets/styles/globalStyles';
import GreenButton from '../components/GreenButton';
import { Icon } from 'react-native-elements';
import { scale, scaleHeight } from '../helpers/scale';

const FailureModal = (props) =>(
  <ScrollView>
    <BottomSheet
      visible={props.visible}
      onBackButtonPress={props._toggleView}
    >
      <TouchableOpacity activeOpacity={0.7} style={[ styles.icon]} onPress={props._toggleView}>
        <Icon name='close'/>
      </TouchableOpacity>
      <View style={styles.bottomNavigationView}>
          <View style={[theme.center, theme.padding_left_right_25]}>
            <Image source={require('../../assets/icons/cancel.png')} style={[theme.pad_bottom30]}/>
            {props.subtitle && <Text style={[theme.pad_bottom20, {color:'#f80000', fontSize: 20, fontFamily: 'nunito-bold'}]}>{props.subtitle}</Text>}
            {props.message && <Text style={[theme.typo_regular, theme.margin_left_right_25, {textAlign: 'center', fontSize: scale(14)}]}>
              {props.message}
            </Text>}
            {props.smallText && <Text style={[theme.margin_left_right_25, {textAlign: 'center', color:'#C6C6C6', fontFamily: 'nunito-regular'}]}>
              {props.smallText}
            </Text>}
          </View>
      </View>
    </BottomSheet>
  </ScrollView>
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
    height: scaleHeight(300),
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  icon: {
    backgroundColor: '#fff', 
    borderRadius:50, 
    fontSize: 25, 
    padding:6, 
    top: scaleHeight(250),
    right:10, 
    position: 'absolute'
  },
});
export default FailureModal;
