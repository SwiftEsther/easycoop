import React, {Component} from 'react';
import { StyleSheet, View, Platform, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import theme from '../../assets/styles/globalStyles';
import GreenButton from '../components/GreenButton';
import { Icon } from 'react-native-elements';
import { scale, scaleHeight } from '../helpers/scale';
import HTMLView from 'react-native-htmlview';
import {TERMSANDCONDITIONS} from '../../src/lib/constants/constants';

class CustomModal extends Component {
  constructor(props) {
    super(props);
  }

  appendBR = (text) => text.replace(/(?:\r\n|\r\n)/g, '<br />')

  render() {
    return(
  <ScrollView>
    <BottomSheet
      visible={this.props.visible}
      onBackButtonPress={this.props._toggleView}
    >
          <TouchableOpacity activeOpacity={0.7} style={[styles.icon]}>
              <Icon name='close' onPress={this.props._toggleView}/>
          </TouchableOpacity>
      <View style={styles.bottomNavigationView}>
          <ScrollView alwaysBounceHorizontal={true} contentContainerStyle={{alignContent: 'center', justifyContent: 'center'}} style={{paddingHorizontal: scale(25)}}>
            <View style={{justifyContent: 'center', alignContent: 'center'}}>
              <Image source={require('../../assets/icons/take_a_note_2.png')} style={{marginVertical: scaleHeight(25), alignSelf: 'center'}}/>
              <View>
                <HTMLView addLineBreaks={false} value={TERMSANDCONDITIONS} stylesheet={styles}/>
              </View>
              

              {/* <Text style={[{textAlign: 'center', fontSize: scale(14), lineHeight:scale(18), color:'#000d37', marginHorizontal: scale(25)}]}>
                  {TERMSANDCONDITIONS}
              </Text> */}
              <View style={styles.button}>
                <GreenButton button_text='I Accept Terms &amp; Conditions' handlePress={this.props.handleClick}/>
              </View>
          </View>
          </ScrollView>
          
      </View>
    </BottomSheet>
  </ScrollView>
);
  }
}
  
const {width,  height} = Dimensions.get('window');

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#E0F7FA',
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    height: height/1.3,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
      
  },
  icon: {
    backgroundColor: '#fff', 
    borderRadius:50, 
    fontSize: scale(25), 
    padding:scale(6), 
    top: scale(80),
    right:0, 
    position: 'absolute',
      zIndex:9999,
      marginHorizontal: scale(9)
  },
  button: {
    marginTop: scaleHeight(20),
    bottom:0
  }
});
export default CustomModal;
