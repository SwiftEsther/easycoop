import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Platform, Text, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import theme from '../../../../assets/styles/globalStyles';
import { Icon } from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { scale, scaleHeight } from '../../../helpers/scale';
import { systemWeights } from 'react-native-typography';
import ChangeBalance from './ChangeBalance.js';
import ViewRequest from './ViewRequest';
import { render } from 'react-dom';

export default class Contributions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showChangeBalance: false,
      request: false
    }
  }

  showChangeForm = () => {
    this.props._toggleView();
    this.setState({
      showChangeBalance: !this.state.showChangeBalance
    });
  }

  changeSavings = () => {
    this.setState({
      showChangeBalance: !this.state.showChangeBalance
    });
  }

  showRequest = () => {
    this.props._toggleView();
    this.setState({
      request: !this.state.request
    });
  }

  editRequest = () => {
    this.setState({
      request: !this.state.request
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView>
        <BottomSheet
          visible={this.props.visible}
          onBackButtonPress={this.props._toggleView}
        >
            <TouchableOpacity activeOpacity={0.7} style={{flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 10, paddingRight: 10}}>
              <Icon name='close' iconStyle={[styles.icon]} onPress={this.props._toggleView} />
            </TouchableOpacity>
          <View style={styles.bottomNavigationView}>
          
            <View style={[theme.container, styles.MainContainer, styles.header, { marginVertical: scaleHeight(20) }]}>

              <Image style={{}} source={require('../../../../assets/icons/wallet.png')} />
              <Text style={[theme.typo_bold, theme.font17, { width: width-80, paddingLeft: scale(20), paddingVertical: scaleHeight(15) }]}>Contributors Balance</Text>
            </View>
            <View style={[theme.container, styles.MainContainer, { alignItems: 'flex-start', justifyContent: 'space-around', flex: 6}]}>
              <View style={{ paddingVertical: scaleHeight(10) }}>
                <Text style={[theme.typo_regular, { fontSize: 11, marginHorizontal: scaleHeight(20), color: '#138516' }]}>Contributors Balance</Text>
                <View style={[theme.typo_bold, theme.font17, { flexDirection: 'row', marginVertical: scaleHeight(10), marginHorizontal: scale(20), fontFamily: 'Serif', fontSize: 20 }]}>
                 
                  <Text style={[theme.font15]}>{`#100,000,000.00`}</Text>
                </View>
              </View>
              <View style={{ paddingVertical: scaleHeight(10) }}>
                <Text style={[theme.typo_regular, { fontSize: 11, marginHorizontal: scaleHeight(20), color: '#138516' }]}>Contributors Balance</Text>
                <View style={[theme.typo_bold, theme.font17, { flexDirection: 'row', marginVertical: scaleHeight(10), marginHorizontal: scale(20), fontFamily: 'Serif', fontSize: 20 }]}>
                 
                  <Text style={[theme.font15]}>{`#100,000,000.00`}</Text>
                </View>
              </View>
            </View>
            <View style={[styles.buttons]}>
                <Text style={[styles.link, theme.font14, theme.flex1, { backgroundColor: '#fff', paddingLeft: scale(10)}]}>Request to change Voluntary Savings Amount</Text>
              <TouchableOpacity activeOpacity={0.7} style={{flex:1}} onPress={this.showRequest}>
              <Text style={[styles.link, theme.font14, { backgroundColor: '#138516', color: '#fff', textAlign: 'center', width: width/2.2}]}>Make / View Request</Text>
</TouchableOpacity>
          </View>
          </View>
        </BottomSheet>
      <ChangeBalance visible={this.state.showChangeBalance} _toggleView={this.changeSavings} back={this.showChangeForm} />
      <ViewRequest visible={this.state.request} _toggleView={this.editRequest} back={this.showRequest}/>
      </KeyboardAwareScrollView >
    )
  }
}

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
    alignSelf: 'center',
    flex: 1,
    paddingVertical: 20
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    height: height / 1.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: scale(5),
    fontFamily: 'nunito-regular'
  },
  icon: {
    borderRadius: 50,
    fontSize: 25,
    padding: 6,
    color: '#138516',
    backgroundColor: '#f5f5f5',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleHeight(5),
    flex: 2,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#efefef',
  },
  link: {
    alignSelf: 'center',
    alignContent: 'center',
    paddingVertical: scaleHeight(20),
    fontSize: 12
  },
});
