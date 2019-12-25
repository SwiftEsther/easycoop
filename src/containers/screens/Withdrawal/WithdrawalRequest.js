import React, { Component } from 'react';
import { StyleSheet, View, Platform, Text, Image, TouchableOpacity, Dimensions, Picker } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import theme from '../../../../assets/styles/globalStyles';
import GreenButton from '../../../components/GreenButton';
import { Icon } from 'react-native-elements';
import { scale, scaleHeight } from '../../../helpers/scale';
import Tabs from '../../../components/Tabs'
import { SafeAreaView } from 'react-navigation';
import RequestSuccessful from './RequestSuccessful';
import BorderedTabs from '../../../components/BorderedTab';
// import RequestSuccess from './RequestSuccess';

export default class WithdrawalRequest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      withdrawalAccount: '',
      amount: '',
      success: false,
      selected:"1"
    }
  }

  changeState = (value) => {
    this.setState(value);
  }

//   showReview = () => {
//     this.props._toggleView();
//     this.setState({
//       review: !this.state.review
//     });
//   }

//   showApplyForm = () => {
//     this.props._toggleView();
//     this.setState({
//       review: !this.state.review
//     });
//   }

//   toggleReview = () => {
//     this.setState({
//       review: !this.state.review
//     });
//   }

showWithdrawSuccess=()=>{
    this.props._toggleView();
      this.setState({
        success: !this.state.success
    })
  }

    toggleWithdraw=()=>this.setState({
        success: !this.state.success
    })

  render() {
    const loans = [{ label: 'First Loan', value: 'fLoan' }, { label: 'Second Loan', value: 'sLoan' }, { label: 'Third Loan', value: 'tLoan' }]
    const payPoints = [{ label: 'First Point', value: 'fPoint' }, { label: 'Second Point', value: 'sPoint' }, { label: 'Third Point', value: 'tPoint' }]
    const ids = [{ label: 'First ID', value: 'fId' }, { label: 'Second ID', value: 'tId' }, { label: 'Third ID', value: 'tId' }]
    return (
      <SafeAreaView style={[theme.container]}>
        <BottomSheet
          visible={this.props.visible}
          onBackButtonPress={this.props._toggleView}
        >
            <TouchableOpacity activeOpacity={0.7} style={{flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 10, paddingRight: 10}}>
              <Icon name='close' iconStyle={[styles.icon]} onPress={this.props._toggleView} />
            </TouchableOpacity>
          <View style={styles.bottomNavigationView}>
            <KeyboardAwareScrollView>
              <View style={{ flex: 1 }}>
              <View style={[styles.header]}>
                <Image style={{}} source={require('../../../../assets/icons/coins.png')} />
                <Text style={[theme.typo_bold, theme.font17, { width: width - 80, paddingLeft: scale(20), marginVertical: scaleHeight(20),}]}>Withdraw Funds</Text>
              </View>
              <View style={{ flex: 6, marginHorizontal: scale(10)}}>
                <View style={[theme.container, styles.MainContainer,]}>
                  <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid={true}>
                    <View style={{ flexDirection: 'row', width: width/1.4, marginBottom: scaleHeight(30),}}>
                      <View style={{ flex: 2, flexDirection: 'column', marginRight: 12 }}>
                        <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Choose Withdrawal Amount</Text>
                        <View style={[styles.pickerStlye, { borderWidth: StyleSheet.hairlineWidth }]}>
                          <Picker
                            selectedValue={this.state.id}
                            onValueChange={(itemValue, itemIndex) =>
                              this.setState({ id: itemValue })
                            }>
                            <Picker.Item label='All Loans' value='' />
                            {ids.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)}
                          </Picker>
                        </View>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'flex-start',  width: width/1.4 }}>
                      <View style={{ flex: 2, flexDirection: 'column', marginRight: 12 }}>
                        <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Amount</Text>
                        <View style={[styles.pickerStlye]}>
                          <CustomInput value={this.state.policeId} keyboardType="number-pad" onChangeText={policeId => this.changeState({ policeId: policeId.trim() })}
                            style={[ {color:'#504e4e', fontFamily: 'nunito-medium', borderColor: '#d0d0d0' }]}
                          />
                        </View>
                      </View>
                    </View>
              <View style={{flex:1}}>
                <TouchableOpacity activeOpacity={0.7} style={[styles.buttons]} onPress={this.showWithdrawSuccess}>
                    <GreenButton button_text='Submit Withdrawal' />
                  </TouchableOpacity>
              </View>
                  </KeyboardAwareScrollView>
                </View>
              </View>
                  
            </View>
            </KeyboardAwareScrollView>
            
          </View>
        </BottomSheet>
        <RequestSuccessful visible={this.state.success} _toggleView={this.toggleWithdraw} 
                                subtitle="Withdrawal Request Submitted Successfully"
                                smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/>
      </SafeAreaView >
    );
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 2,
    paddingHorizontal: scale(10),
    marginTop: scaleHeight(20),
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    marginLeft: scale(10)
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#efefef',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: scaleHeight(10),
    marginHorizontal: scale(13),
    flex: 1,
    fontFamily: 'nunito-bold' 
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    height: height /1.2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  icon: {
    borderRadius: 50,
    fontSize: 25,
    padding: 6,
    color: '#138516',
    backgroundColor: '#f5f5f5',
  },
  pickerStlye: {
    color:'#504e4e', 
    fontFamily: 'nunito-medium',
    borderColor: '#d0d0d0',
    backgroundColor: 'rgba(0, 13, 55, 0.02)',
    height: scaleHeight(40),
    flexDirection: 'column',
    justifyContent: 'center'
  },
  buttons: {
    flex: 1,
    marginTop: scaleHeight(30),
    marginRight: scale(40)
  },
});
