import React from 'react';
import { StyleSheet, View, Platform, Text, Image, ScrollView, ScrollViewBase, TouchableOpacity } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import theme from '../../assets/styles/globalStyles';
import GreenButton from '../components/GreenButton';
import { Icon } from 'react-native-elements';
import { scale } from '../helpers/scale';

const CustomModal = (props) =>(
  <ScrollView>
    <BottomSheet
      visible={props.visible}
      onBackButtonPress={props._toggleView}
      onBackdropPress={props._toggleView}
    >
      <View style={styles.bottomNavigationView}>
          {/*<Icon name='close' iconStyle={[theme.typo_bold, styles.icon]} handlePress={props._toggleView}/>*/}

          <TouchableOpacity activeOpacity={0.7} style={[theme.typo_bold, styles.icon]}  onPress={props._toggleView}>
              <Icon name='close'/>
          </TouchableOpacity>
          <View style={[theme.center, theme.padding_left_right_25, {paddingTop: 270}]}>
            <Image source={require('../../assets/icons/take_a_note_2.png')} style={[theme.pad_bottom20]}/>
            <Text style={[theme.typo_bold, theme.font15, theme.pad_bottom]}>Terms and Conditions</Text>
            <Text style={[theme.typo_regular, theme.margin_left_right_25, {textAlign: 'center', fontSize: scale(14), lineHeight:scale(18), color:'#000d37'}]}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </Text>
            <View style={styles.button}>
              <GreenButton button_text='I Accept Terms &amp; Conditions' handlePress={props.handleClick}/>
            </View>
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
    height: scale(450),
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
      paddingVertical:scale(30)
  },
  icon: {
    backgroundColor: '#fff', 
    borderRadius:50, 
    fontSize: scale(25), 
    padding:scale(6), 
    top: scale(-40),
    right:0, 
    position: 'absolute',
      zIndex:9999
  },
  button: {
    marginTop: 20, 
    bottom:0
  }
});
export default CustomModal;
