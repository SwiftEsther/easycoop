import React from 'react';
import { StyleSheet, View, Platform, Text, Button, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import theme from '../../assets/styles/globalStyles';
import GreenButton from '../components/GreenButton';
import { Icon } from 'react-native-elements';
import { scale, scaleHeight } from '../helpers/scale';

const SuccessModal = (props) =>{
  console.log(props)
  return (
      <ScrollView>
          <BottomSheet
              visible={props.visible}
              onBackButtonPress={props._toggleView}
          >

              {!!props.bare && <TouchableOpacity activeOpacity={0.7} style={[ styles.bareIcon ]} onPress={props._toggleView}>
                  <Icon name='close'/>
              </TouchableOpacity>}
              {!props.bare && <TouchableOpacity activeOpacity={0.7} style={[ styles.icon ]} onPress={props._toggleView}>
                  <Icon name='close'/>
              </TouchableOpacity>}
              <View style={styles.bottomNavigationView}>
                  <View style={[{alignSelf: 'center',alignItems:'center'}]}>
                      <Image source={require('../../assets/icons/check_circle.png')} style={[theme.pad_bottom30]}/>
                      {!!props.subtitle && <Text style={[{textAlign: 'center',color:'#138516', fontSize: 20, fontFamily: 'nunito-bold'}, theme.pad_bottom20]}>{props.subtitle}</Text>}
                      {!!props.message && <Text style={[{textAlign: 'center', fontSize: scale(14)}]}>
                          {props.message}
                      </Text>}
                      {!!props.smallText && <Text style={[theme.typo_regular, theme.margin_left_right_25, {textAlign: 'center', fontSize: scale(10), color:'#C6C6C6'}]}>
                          {props.smallText}
                      </Text>}
                  </View>
              </View>
          </BottomSheet>
      </ScrollView>
  )
};
const { width, height } = Dimensions.get("window");
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
    height: height/2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bareIcon: {
    color: '#138516', 
    borderRadius:50, 
    fontSize: scale(25), 
    padding:scale(6), 
    top: scaleHeight(-205),
    right:0, 
    position: 'absolute'
  },
  icon: {
    backgroundColor: '#fff', 
    borderRadius:50, 
    fontSize: scale(25), 
    marginHorizontal: scale(9),
    padding:scale(6), 
    top: scaleHeight(220),
    right:0, 
    position: 'absolute'
  },
});
export default SuccessModal;
