import React from 'react';
import { StyleSheet, View, Platform, Text, Button, Image, ScrollView, ScrollViewBase } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import theme from '../../assets/styles/globalStyles';
import GreenButton from '../components/GreenButton';
import { Icon } from 'react-native-elements';
import { scale } from '../helpers/scale';

const SuccessModal = (props) =>(
  <ScrollView>
    <BottomSheet
      visible={props.visible}
      onBackButtonPress={props._toggleView}
      onBackdropPress={props._toggleView}
    >
      <View style={styles.bottomNavigationView}>
          <Icon name='close' iconStyle={[theme.typo_bold, styles.icon]} handlePress={props._toggleView}/>
          <View style={[theme.center, theme.padding_left_right_25]}>
            <Image source={require('../../assets/icons/check_circle.png')} style={[theme.pad_bottom30]}/>
            <Text style={[theme.typo_regular, theme.margin_left_right_25, {textAlign: 'center', fontSize: scale(14), lineHeight: 20}]}>
              {props.message}
            </Text>
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
    height: scale(400),
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  icon: {
    color: '#138516', 
    borderRadius:50, 
    fontSize: scale(25), 
    padding:scale(6), 
    top: -150,
    right:0, 
    position: 'absolute'
  },
});
export default SuccessModal;
