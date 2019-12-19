/*Example of Bottom Sheet (Material Design)*/
import React, { Component } from 'react';
//import react in our project
import { StyleSheet, View, Platform, Text, Button, Image, Dimensions } from 'react-native';
//import basic react native components
import { BottomSheet } from 'react-native-btr';
//import for the bottom sheet
import theme from '../../assets/styles/globalStyles';
import GreenButton from '../components/GreenButton';
import { Icon } from 'react-native-elements';
//import to show social icons

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }
  
  render() {
    return (
      <View>
        <BottomSheet
          visible={this.props.visible}
          onBackButtonPress={this.props._toggleView}
          onBackdropPress={this.props._toggleView}
        >
          <View style={styles.bottomNavigationView}>
              <Icon name='close' iconStyle={[theme.typo_bold,{backgroundColor: '#fff', borderRadius:50, fontSize: 25, padding:6, top: 16, right:0, position: 'absolute'}]}/>
              <View style={[theme.center, theme.padding_left_right_25, {paddingTop: 270}]}>
                <Image source={require('../../assets/icons/take_a_note_2.png')} style={[theme.pad_bottom20]}/>
                <Text style={[theme.typo_bold, theme.font15, theme.pad_bottom]}>Terms and Conditions</Text>
                <Text style={[theme.typo_regular, theme.margin_left_right_25, theme.pad9, {textAlign: 'center', fontSize: 14}]}>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:
                </Text>
                <View style={{marginBottom: 40, marginTop: 40, bottom:0}}>
                    <GreenButton button_text='I Accept Terms &amp; Conditions'onClick={this.props.handleClick}/>
                </View>
                </View>
            </View>
        </BottomSheet>
      </View>
    );
  }
}
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