import React, {Component} from 'react';
import { StyleSheet, Picker, View, Platform, Text, Image, ScrollView, ScrollViewBase } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import CustomInput from './CustomTextInput/CustomInput';
import theme from '../../assets/styles/globalStyles';
import GreenButton from '../components/GreenButton';
import { Icon } from 'react-native-elements';
import { scale } from '../helpers/scale';
import Tabs from './Tabs'

export default class ApplyLoanModal extends Component {

  constructor(props) {
     super(props);
     this.state = {
        selected: "1",
        showLoanInfo: true,
        showGuarantorInfo: false,
        amount: ''
     }
  }

  changeState = (value) => {
    this.setState(value);
  }

  render () {
    return (
      <ScrollView>
        <BottomSheet
          visible={this.props.visible}
          onBackButtonPress={this.props._toggleView}
          onBackdropPress={this.props._toggleView}
        >
          <View style={styles.bottomNavigationView}>
              <Icon name='close' iconStyle={[theme.typo_bold, styles.icon]} handlePress={this.props._toggleView}/>
              <View>
                <Tabs tab1Text="Loan Info" tab2Text="Gurantor Info" selected={this.state.selected}
                  tab1Event={() => this.setState({showLoanInfo: true, selected: "1", showGuarantorInfo:false})} 
                  tab2Event={() => this.setState({ showGuarantorInfo: true, selected: "2", showLoanInfo: false})}/>

                  <View>
                    {this.state.showLoanInfo && <View style={[styles.itemContainer]}>
                        <View style={[styles.loanType]}>
                          <View style={[styles.loanTypeItem1]}>
                            <Text style={{fontWeight: "bold"}}>Loan Type:</Text>
                            <Picker style={[styles.picker]}>
                                <Picker.Item label= 'All loans' value= '' />
                                <Picker.Item label= 'All' value= '' />
                                <Picker.Item label= 'All loanee' value= '' />
                            </Picker>
                          </View>
                          <View style={[styles.loanTypeItem2]}>
                            <Text style={{marginBottom: 10, fontWeight: "bold", fontSize: Platform.OS === 'ios' ? 12 : 15,}}>Interest Rate:</Text>
                            <View style={[styles.colouredBox]}>
                              <Text style={{color: "#148516", fontSize: 15}}>10%</Text>
                            </View>
                          </View>
                        </View>
                        <View style={[styles.loanType]}>
                          <View style={[styles.loanTypeItem1]}>
                            <Text style={{fontWeight: "bold"}}>Loan Type:</Text>
                            <View style={[theme.input_margin_bottom]}>
                                <CustomInput value={this.state.amount} onChangeText={amount => this.changeState({amount: amount.trim()})} onFocus={this.onFocus} maxLength={100} 
                                    style={[theme.flex1, theme.caption, theme.typo_regular]} 
                                /> 
                                </View>
                          </View>
                          <View style={[styles.loanTypeItem2]}>
                            <Text style={{marginBottom: 10, fontWeight: "bold", fontSize: Platform.OS === 'ios' ? 12 : 15,}}>Interest Rate:</Text>
                            <View style={[styles.colouredBox]}>
                              <Text style={{color: "#148516", fontSize: 15}}>10%</Text>
                            </View>
                          </View>
                        </View>
                        <View style={{padding: 20}}><Text style={{color: "#148516"}}>For this Loan type, you would require a guarantor</Text></View>
                        <View>
                          <GreenButton style={{padding: 30}} button_text='Proceed' handlePress={this.props.handleClick}/>
                        </View>
                      </View>}
                    {this.state.showGuarantorInfo && <View>
                        <Text>Gurantor Info</Text>
                      </View>}
                  </View>
              </View>
          </View>
        </BottomSheet>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#E0F7FA',
  },
  itemContainer: {
      flexDirection: "column"
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: scale(450),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  icon: {
    backgroundColor: '#fff', 
    borderRadius:50, 
    fontSize: scale(25), 
    padding:scale(6), 
    top: 16, 
    right:0, 
    position: 'absolute'
  },
  button: {
    width: '100%'
  },
  loanType: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15
  },
  loanTypeItem1: {
    flexDirection: "column",
    padding: 10,
    width: '70%'
  },
  loanTypeItem2: {
    flexDirection: "column",
    padding: 10,
    width: '30%'
  },
  picker: {
    margin: (Platform.OS === 'ios') ? -20 : 5,
    marginLeft: 0
  },
  colouredBox: {
    backgroundColor: "#D0E7D1",
    alignItems: "center",
    padding: 16,
    color: "#B8DBBA"
  }
});
