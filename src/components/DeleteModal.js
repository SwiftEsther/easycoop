import React, {Component} from 'react';
import { Dimensions, StyleSheet, View, Platform, Text, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import theme from '../../assets/styles/globalStyles';
import GreenButton from '../components/GreenButton';
import { Icon } from 'react-native-elements';
import { scale, scaleHeight } from '../helpers/scale';
import DeleteSuccess from './DeleteSuccess';
import FailureModal from './FailureModal';

export default class DeleteModal extends Component{
  constructor(props){
    super(props);

    this.state={
      success: false,
      failure: false
    }
  }

  showDeleteSuccess=()=>{
    this.props._toggleView();
      this.setState({
        success: !this.state.success
    })
  }

  showDeleteFailure=()=>{
    this.props._toggleView();
      this.setState({
        failure: !this.state.failure
    })
  }

  toggleFailure=()=>this.setState({
    failure: !this.state.failure
  })

  toggleDelete=()=>this.setState({
    success: !this.state.success
  })

  render() {
    return(
      <ScrollView>
        <BottomSheet
          visible={this.props.visible}
          onBackButtonPress={this.props._toggleView}
          onBackdropPress={this.props._toggleView}
        >
          <View style={styles.bottomNavigationView}>
            <View style={[styles.header]}>
              <Text style={[{fontSize: 20, fontFamily: 'nunito-bold', marginVertical: scaleHeight(25)}]}>Delete Request</Text>
            </View>
            <View style={{ flex: 3 }}>
              <View style={[theme.center, theme.padding_left_right_25]}>
                <Image source={require('../../assets/icons/bin.png')} style={[theme.pad_bottom30, {marginTop: scale(10)}]} />
              <Text style={[{ textAlign: 'center', color: '#504e4e', fontFamily: 'nunito-medium' }]}>
                    You are about to delete<Text style={{color:'#f80000'}}>{` ${this.props.itemAction} `}</Text> while on
                  <Text style={{color:'#f80000'}}>{` ${this.props.applicationSuccess} `}</Text>
                </Text>
              </View>
            <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={this.showDeleteFailure}>
              <GreenButton button_text='Delete Request' />
            </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
        <DeleteSuccess visible={this.state.success} _toggleView={this.toggleDelete} 
          smallText={`Request Deleted Successfully`}/>
          <FailureModal visible={this.state.failure} _toggleView={this.toggleFailure} 
            subtitle="Request Submission Failed"
            smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/>
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
    backgroundColor: '#E0F7FA',
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: scale(350),
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: scale(10)
  },
  icon: {
    backgroundColor: '#fff',
    borderRadius: 50,
    fontSize: scale(25),
    padding: scale(6),
    top: scale(-130),
    right: 0,
    position: 'absolute'
  },
  button: {
    marginTop: scaleHeight(20),
    bottom: 0,
    flex: 1,
    marginHorizontal: scale(20)
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#efefef',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    width: width,
    paddingHorizontal: scale(20)
  },
});
