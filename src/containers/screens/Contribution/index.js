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
          onBackdropPress={this.props._toggleView}
        >
          <Icon name='close' iconStyle={[theme.typo_bold, styles.icon]} handlePress={this.props._toggleView} />
          <View style={styles.bottomNavigationView}>
            <View style={[theme.container, styles.MainContainer, styles.header, { marginVertical: scaleHeight(20) }]}>
              <Image style={{}} source={require('../../../../assets/icons/wallet.png')} />
              <Text style={[theme.typo_bold, theme.font17, { width: width-80, paddingLeft: scale(20), paddingVertical: scaleHeight(15) }]}>Contributors Balance</Text>
            </View>
            <View style={[theme.container, styles.MainContainer, { alignItems: 'flex-start', justifyContent: 'space-between', marginVertical: scaleHeight(50), flex: 4 }]}>
              <View >
                <Text style={[theme.typo_regular, { fontSize: 11, marginHorizontal: scaleHeight(20), color: '#138516' }]}>Contributors Balance</Text>
                <View style={[theme.typo_bold, theme.font17, { flexDirection: 'row', marginVertical: scaleHeight(10), marginHorizontal: scale(20), fontFamily: 'Serif', fontSize: 20 }]}>
                  {/* <Icon name="naira"/> */}
                  <Text style={[theme.font15]}>{`#100,000,000.00`}</Text>
                </View>
              </View>
              <View>
                <Text style={[theme.typo_regular, { fontSize: 11, marginHorizontal: scaleHeight(20), color: '#138516' }]}>Contributors Balance</Text>
                <View style={[theme.typo_bold, theme.font17, { flexDirection: 'row', marginVertical: scaleHeight(10), marginHorizontal: scale(20), fontFamily: 'Serif', fontSize: 20 }]}>
                  {/* <Icon name="naira"/> */}
                  <Text style={[theme.font15]}>{`#100,000,000.00`}</Text>
                </View>
              </View>
            </View>
            <View style={[styles.buttons]}>
                <Text style={[styles.link, theme.font14, theme.flex1, { backgroundColor: '#fff', paddingLeft: scale(10)}]}>Request to change Voluntary Savings Amount</Text>
              <TouchableOpacity activeOpacity={0.7} style={{flex:1}} onPress={this.showRequest}>
              <Text style={[styles.link, theme.font14, { backgroundColor: '#138516', color: '#fff', textAlign: 'center', width: width/2.2}]}>Make /  RequestView</Text>
</TouchableOpacity>
          </View>
          </View>
        </BottomSheet>
      <ChangeBalance visible={this.state.showChangeBalance} _toggleView={this.changeSavings} back={this.showChangeForm} handleClick={() => console.log('gdjdhhhh')} />
      <ViewRequest visible={this.state.request} _toggleView={this.editRequest} back={this.showRequest} handleClick={() => console.log('gdjdhhhh')} />
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
