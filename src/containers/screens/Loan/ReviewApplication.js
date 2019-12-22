import React, { Component } from 'react';
import { StyleSheet, View, Platform, Text, Image, TouchableOpacity, Dimensions, Picker } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import theme from '../../../../assets/styles/globalStyles';
import GreenButton from '../../../components/GreenButton';
import WhiteButton from '../../../components/WhiteButton';
import { Icon } from 'react-native-elements';
import { scale, scaleHeight } from '../../../helpers/scale';
import Tabs from '../../../components/Tabs'
import { SafeAreaView } from 'react-navigation';
import DeleteModal from '../../../components/DeleteModal';
import ApplicationSuccessful from './ApplicationSuccessful';

export default class ReviewApplication extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: "1",
      showLoanInfo: true,
      showGuarantorInfo: false,
      loanType: '',
      amount: '',
      guarantos: [],
      showDelete: false,
      deleted: false,
      success: false
    }
  }

  changeState = (value) => {
    this.setState(value);
  }

  toggleApplication = () => this.setState({
    success: true
  })

  showApplicationSuccess = () => {
    this.props._toggleView();
    this.setState({
      success: !this.state.success
    })
  }

  showDeleteModal = () => {
    this.props._toggleView();
    this.setState({
      showDelete: !this.state.showDelete
    })
  }

  delete = () => {
    this.setState({
      showDelete: !this.state.showDelete
    })
  }

  toggleDelete = () => this.setState({ deleted: !this.state.deleted })

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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity activeOpacity={0.7} onPress={this.props.back} style={{ width: width / 3 }}>
              <Text style={[theme.font17, { color: '#fff', paddingHorizontal: scale(7) }]}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={this.props._toggleView}>
              <Icon name='close' iconStyle={[theme.typo_bold, styles.icon, styles.exit]} />
            </TouchableOpacity>
          </View>


          <View style={styles.bottomNavigationView}>
            <View style={{ flex: 1 }}>

              <View style={[theme.container, styles.MainContainer, styles.header, { marginVertical: scaleHeight(20) }]}>
                <View style={{ width: width - 10, }}>
                  <Text style={[theme.typo_bold, theme.font17]} >Review Application</Text>
                </View>
              </View>
              <View style={{ flex: 9 }}>
                <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid={true}>
                  <View style={[theme.container, styles.MainContainer]}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginRight: scale(12) }}>
                      <View style={{ flex: 2, flexDirection: 'column' }}>
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
                          <Text style={[theme.font15, { color: '#138516', backgroundColor: '#d0e7d1', height: scaleHeight(40), width: scale(90), textAlign: 'center', textAlignVertical: 'center', }]}>{`10%`}</Text>
                        </View>
                      </View>
                    </View>
                    <Text style={[theme.typo_regular, { fontSize: 11, color: '#138516', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', marginVertical: scaleHeight(20) }]}>For this Loan type, you would require a guarantor</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: scaleHeight(30), }}>
                      <View style={{ flex: 2, flexDirection: 'column', marginRight: 12 }}>
                        <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Amount</Text>
                        <View style={[styles.pickerStlye, { borderWidth: StyleSheet.hairlineWidth }]}>
                          <CustomInput value={this.state.policeId} keyboardType="number-pad" onChangeText={policeId => this.changeState({ policeId: policeId.trim() })}
                            style={[theme.flex1, theme.caption, theme.typo_regular, { borderColor: '#d0d0d0' }]}
                          />
                        </View>
                      </View>

                      <View style={{ flex: 1, justifyContent: 'flex-end', marginLeft: 12, }}>
                      </View>
                    </View>
                  </View>
                  <View style={[theme.container, styles.MainContainer]}>
                    <Text style={[theme.typo_regular, { fontSize: 11, color: '#138516', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginVertical: scaleHeight(20) }]}>At least Two guarantor is needed.</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: scaleHeight(30) }}>
                      <View style={{ flex: 3, flexDirection: 'row', marginRight: 12 }}>
                        <Image source={require('../../../../assets/images/pexels_photo_2x.png')} style={{ flex: 1 }} />
                        <View style={{ flex: 3, justifyContent: 'space-between', paddingVertical: scaleHeight(10), paddingLeft: scale(10) }}>
                          <Text style={{ color: '#504e4e' }}>Mr Obasi Suleman</Text>
                          <Text style={{ color: '#c1c1c1' }}>joshuadavid@gmail.com</Text>
                        </View>
                      </View>
                    </View>
                    <View style={[styles.buttons]}>
                      <TouchableOpacity activeOpacity={0.7} style={[styles.link]} onPress={this.showDeleteModal}>
                        <WhiteButton button_text='Edit Applications' />
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.7} style={[styles.link]} onPress={()=>this.toggleApplication}>
                        <GreenButton button_text='Apply For Loan' />
                      </TouchableOpacity>
                    </View>
                  </View>

                </KeyboardAwareScrollView>
              </View>
            </View>
          </View>
        </BottomSheet>
        <DeleteModal visible={this.state.showDelete} _toggleView={this.toggleDelete}
          smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`} />
        <ApplicationSuccessful visible={this.state.success} _toggleView={this.toggleApplication}
          subtitle="Request Submitted Successfully"
          smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`} />
      </SafeAreaView>
    );
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 2,
    paddingHorizontal: scale(10),
    paddingTop: Platform.OS === 'ios' ? 20 : 0
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#efefef',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    height: scaleHeight(height - 30),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: scale(5)
  },
  exit: {
    backgroundColor: '#fff',
    marginRight: scale(10),
    marginBottom: scaleHeight(5)
  },

  icon: {
    borderRadius: 50,
    fontSize: 25,
    padding: scale(6),
    color: '#138516',
    right: 0
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
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    marginHorizontal: scale(10)
  },
  defaultButton: {
    fontSize: 17,
    padding: scale(18),
    color: '#138516',
    borderRadius: 3,
    textAlign: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#138516',
    marginRight: scale(10)
  }
});
