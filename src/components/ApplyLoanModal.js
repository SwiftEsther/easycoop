import React, {Component} from 'react';
import { StyleSheet, View, Platform, Text, Image, ScrollView, ScrollViewBase } from 'react-native';
import { BottomSheet } from 'react-native-btr';
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
        showGuarantorInfo: false
     }
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
              <View style={[styles.itemContainer]}>
                <Tabs tab1Text="Loan Info" tab2Text="Gurantor Info" selected={this.state.selected}
                  tab1Event={() => this.setState({showLoanInfo: true, selected: "1", showGuarantorInfo:false})} 
                  tab2Event={() => this.setState({ showGuarantorInfo: true, selected: "2", showLoanInfo: false})}/>

                  <View>
                    {this.state.showLoanInfo && <View>
                        <Text>Loan Info</Text>
                      </View>}
                    {this.state.showGuarantorInfo && <View>
                        <Text>Gurantor Info</Text>
                      </View>}
                  </View>
                <View>
                  <GreenButton style={{padding: 30}} button_text='Proceed' handlePress={this.props.handleClick}/>
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
  }
});
