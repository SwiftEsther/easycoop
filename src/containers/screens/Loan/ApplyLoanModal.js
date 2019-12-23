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
import ReviewApplication from './ReviewApplication';

export default class ApplyLoanModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: "1",
      showLoanInfo: true,
      showGuarantorInfo: false,
      loanType: '',
      amount: '',
      guarantos: [],
      review: false
    }
  }

  changeState = (value) => {
    this.setState(value);
  }

  showReview = () => {
    this.props._toggleView();
    this.setState({
      review: !this.state.review
    });
  }

  showApplyForm = () => {
    this.props._toggleView();
    this.setState({
      review: !this.state.review
    });
  }

  toggleReview = () => {
    this.setState({
      review: !this.state.review
    });
  }

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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity activeOpacity={0.7} onPress={this.props._toggleView} style={{width: width/3}}>
                <Text style={[theme.font17, {color: '#fff', paddingHorizontal: scale(7)}]}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={this.props._toggleView}>
                    <Icon name='close' iconStyle={[theme.typo_bold, styles.icon,styles.exit]}/>
                </TouchableOpacity>
            </View>
          <View style={styles.bottomNavigationView}>
            <View style={{ flex: 1 }}>
              <View style={[styles.header]}>
                <Image style={{}} source={require('../../../../assets/icons/naira.png')} />
                <Text style={[theme.typo_bold, theme.font17, { width: width - 80, paddingLeft: scale(20), paddingVertical: scaleHeight(20) }]}>Apply For Loan</Text>
              </View>
              <View style={{ flex: 1, marginTop: 10 }}>
                <Tabs tab1Text="Loan Info" tab2Text="Gurantor Info" selected={this.state.selected}
                  tab2Event={() => this.setState({ showLoanInfo: false, selected: "2", showGuarantorInfo: true })}
                  tab1Event={() => this.setState({ showGuarantorInfo: false, selected: "1", showLoanInfo: true })} />
              </View>
              <View style={{ flex: 6 }}>
                {this.state.showLoanInfo && <View style={[theme.container, styles.MainContainer,]}>
                  <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid={true}>
                    <View style={{ flexDirection: 'row', }}>
                      <View style={{ flex: 2, flexDirection: 'column', marginRight: 12 }}>
                        <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Loan Type</Text>
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

                      <View style={{ flex: 1, justifyContent: 'flex-end', marginLeft: 12 }}>
                        <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Interest Rate</Text>
                        <View style={[theme.typo_bold, theme.font17]}>
                          <Text style={[theme.font15, { color: '#138516', backgroundColor: '#d0e7d1', height: scaleHeight(40), textAlign: 'center', textAlignVertical: 'center', }]}>{`10%`}</Text>
                        </View>
                      </View>

                    </View>

                    <Text style={[theme.typo_regular, { fontSize: 11, color: '#138516', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', marginVertical: scaleHeight(20) }]}>For this Loan type, you would require a guarantor</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: scaleHeight(30) }}>
                      <View style={{ flex: 2, flexDirection: 'column', marginRight: 12 }}>
                        <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Amount</Text>
                        <View style={[styles.pickerStlye, { borderWidth: StyleSheet.hairlineWidth }]}>
                          <CustomInput value={this.state.policeId} keyboardType="number-pad" onChangeText={policeId => this.changeState({ policeId: policeId.trim() })}
                            style={[theme.flex1, theme.caption, theme.typo_regular, { borderColor: '#d0d0d0' }]}
                          />
                        </View>
                      </View>

                      <View style={{ flex: 1, justifyContent: 'flex-end', marginLeft: 12, }}>
                        <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Guarantor</Text>
                        <View style={[theme.typo_bold, theme.font17]}>
                          <Text style={[theme.font15, { color: '#138516', backgroundColor: '#d0e7d1', height: scaleHeight(40), textAlignVertical: 'center', textAlign: 'center' }]}>{`Needed`}</Text>
                        </View>
                      </View>
                    </View>
                  </KeyboardAwareScrollView>
                  <TouchableOpacity activeOpacity={0.7} style={[styles.buttons]} onPress={() => this.setState({ showLoanInfo: false, selected: "2", showGuarantorInfo: true })}>
                    <GreenButton button_text='Proceed' />
                  </TouchableOpacity>
                </View>}
                {this.state.showGuarantorInfo && <View style={[theme.container, styles.MainContainer]}>
                  <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid={true}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                      <View style={{ flex: 2, flexDirection: 'column' }}>
                        <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Add a Guarantor </Text>
                        <View style={[styles.pickerStlye]}>
                          <CustomInput value={this.state.policeId} keyboardType="number-pad" onChangeText={policeId => this.changeState({ policeId: policeId.trim() })}
                            style={[theme.flex1, theme.caption, theme.typo_regular, { borderColor: '#d0d0d0' }]}
                          />
                        </View>
                      </View>
                    </View>
                    <Text style={[theme.typo_regular, { fontSize: 11, color: '#138516', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginVertical: scaleHeight(20) }]}>At least Two guarantor is needed.</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: scaleHeight(30) }}>
                      <View style={{ flex: 3, flexDirection: 'row' }}>
                        <Image source={require('../../../../assets/images/pexels_photo.png')} style={{ flex: 1 }} />
                        <View style={{ flex: 3, justifyContent: 'space-between', paddingVertical: scaleHeight(10),paddingHorizontal: scale(12)}}>
                          <Text style={{ color: '#504e4e' }}>Mr Obasi Suleman</Text>
                          <Text style={{ color: '#c1c1c1' }}>joshuadavid@gmail.com</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>console.log('cancel')}>
                          <Icon name='close' iconStyle={[theme.typo_bold, styles.icon, { flex: 1, marginTop: scaleHeight(10), justifyContent: 'flex-end', alignContent: 'center' }]} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </KeyboardAwareScrollView>
                  <TouchableOpacity activeOpacity={0.7} style={[styles.buttons, { flex: 1 }]} onPress={(this.showApplyForm)}>
                    <GreenButton button_text='Proceed' />
                  </TouchableOpacity>
                </View>}

              </View>
            </View>
          </View>
        </BottomSheet>
        <ReviewApplication visible={this.state.review} _toggleView={this.toggleReview} back={this.showApplyForm}  />
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
    marginTop: scale(20),
    paddingTop: Platform.OS === 'ios' ? 20 : 0
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#efefef',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    height: scaleHeight(height / 1.1),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  exit: {
    backgroundColor: '#fff', 
    marginRight: scale(10), 
    marginBottom: scaleHeight(10)
},

  icon: {
    borderRadius: 50,
    fontSize: 25,
    padding: scale(6),
    color: '#138516',
    backgroundColor: '#f5f5f5'
  },
  pickerStlye: {
    color: '#9f9f9f',
    borderColor: '#d0d0d0',
    backgroundColor: 'rgba(0, 13, 55, 0.02)',
    height: scaleHeight(40),
    flexDirection: 'column',
    justifyContent: 'center'
  },
  buttons: {
    flex: 1,
    marginHorizontal: scale(10)
  },
});
