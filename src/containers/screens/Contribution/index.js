import React, {Component} from 'react';
import { Dimensions,StyleSheet, View, Platform, Text, Button, Image, ScrollView, ScrollViewBase } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import theme from '../../../../assets/styles/globalStyles';
import GreenButton from '../../../components/GreenButton';
import { Icon } from 'react-native-elements';
import { scale, scaleHeight } from '../../../helpers/scale';
import { systemWeights } from 'react-native-typography';
import { render } from 'react-dom';

export default class Contributions extends  Component{
  constructor(props){
    super(props);
  }

  render() {
    return(
      <ScrollView>
        <BottomSheet
          visible={this.props.visible}
          onBackButtonPress={this.props._toggleView}
          onBackdropPress={this.props._toggleView}
        >
            <Icon name='close' iconStyle={[theme.typo_bold, styles.icon]} handlePress={this.props._toggleView}/>
          <View style={styles.bottomNavigationView}>
              <View style={[theme.container, styles.MainContainer,styles.header]}>
                <Image source={require('../../../../assets/icons/wallet.png')}/>
                <Text style={[theme.typo_bold, theme.font17,{marginVertical: scaleHeight(20),paddingRight: scale(100), paddingLeft: scale(20)}]}>Contributors Balance</Text>
              </View>
              <View style={[theme.container, styles.MainContainer,{alignItems: 'flex-start', justifyContent: 'space-between', marginVertical: scaleHeight(50), flex: 4}]}>
                <View >
                  <Text style={[theme.typo_regular,{fontSize: 11,marginHorizontal: scaleHeight(20), color: '#138516'}]}>Contributors Balance</Text>
                  <View style={[theme.typo_bold, theme.font17,{flexDirection: 'row',marginVertical: scaleHeight(10),marginHorizontal: scale(20), fontFamily: 'Serif', fontSize: 20}]}>
                    {/* <Icon name="naira"/> */}
                    <Text style={[theme.font15]}>{`#100,000,000.00`}</Text>
                  </View>
                </View>
                <View>
                  <Text style={[theme.typo_regular,{fontSize: 11,marginHorizontal: scaleHeight(20), color: '#138516'}]}>Contributors Balance</Text>
                  <View style={[theme.typo_bold, theme.font17,{flexDirection: 'row',marginVertical: scaleHeight(10),marginHorizontal: scale(20), fontFamily: 'Serif', fontSize: 20}]}>
                    {/* <Icon name="naira"/> */}
                    <Text style={[theme.font15]}>{`#100,000,000.00`}</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.buttons]}>
                <Text style={[styles.link, {backgroundColor: '#fff'}]} onPress={() => this.props.navigation.navigate('SignUp')}>Request to change Voluntary Savings Amount</Text>
                <Text style={[styles.link, {backgroundColor: '#138516', color: '#fff', textAlign: 'center'}]} onPress={() => this.props.navigation.navigate('Login')}>Make /  RequestView</Text>
              </View>
          </View>
        </BottomSheet>
      </ScrollView>
    )
  }
}

const {width,  height} = Dimensions.get('window');
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
    height: height/1.5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: scale(5)
  },
  bareIcon: {
    color: '#138516', 
    borderRadius:50, 
    fontSize: scale(25), 
    padding:scale(6), 
    top: scaleHeight(-105),
    right:0, 
    position: 'absolute'
  },
  icon: {
    backgroundColor: '#fff', 
    borderRadius:50, 
    fontSize: scale(25), 
    alignSelf: 'flex-end',
    padding:scale(6), 
    top: scaleHeight(-65),
    right:0, 
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
