import React, {Component} from 'react';
import { Dimensions, StyleSheet, View, Platform, Text, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import theme from '../../../../assets/styles/globalStyles';
import GreenButton from '../../../components/GreenButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-elements';
import { scale, scaleHeight } from '../../../helpers/scale';
import ApplicationStatus from '../../../components/ApplicationStatus';
import ViewWithdrawal from './ViewWithdrawal';

export default class RequestSuccessful extends Component{
  constructor(props){
    super(props);

    this.state={
      success: false,
      failure: false,
      status: false
    }
  }

  showWithdrawSuccess=()=>{
    this.props._toggleView();
      this.setState({
        success: !this.state.success
    })
  }

    toggleWithdraw=()=>this.setState({
        success: !this.state.success
    })

    toggleStatus=()=>this.setState({status:!this.state.status});
    showRequestStatus=()=>{
      this.props._toggleView();
        this.setState({
          status: !this.state.status
      })
    }

  render() {
    return (
      <>
        <BottomSheet
          visible={this.props.visible}
          onBackButtonPress={this.props._toggleView}
        >
          <View
                           style={{
                             flexDirection: "row",
                             justifyContent: "flex-end"
                           }}
                         >
        <TouchableOpacity
            onPress={this.props._toggleView}
          activeOpacity={0.7}
          style={[styles.icon,]}
        >
          <Icon
            name="close"
          />
        </TouchableOpacity>
      </View>
          <View style={styles.bottomNavigationView}>
            <View style={[styles.header, { marginVertical: scaleHeight(10) }]}>
              <Image
                style={{}}
                source={require("../../../../assets/icons/coins.png")}
              />
              <Text
                style={[
                  theme.typo_bold,
                  theme.font17,
                  {
                    width: width - 80,
                    paddingLeft: scale(20),
                    paddingVertical: scaleHeight(15)
                  }
                ]}
              >
                Withdraw Funds
              </Text>
            </View>
            <View style={{ flex: 4 }}>
              <View style={[theme.center]}>
                <Image
                  source={require("../../../../assets/icons/check_circle.png")}
                  style={[theme.pad_bottom30, { marginTop: scale(10) }]}
                />
                {this.props.subtitle && (
                  <Text
                    style={[
                      theme.pad_bottom20,
                      {
                        color: "#138516",
                        textAlign: "center",
                        fontSize: 20,
                        fontFamily: "nunito-bold"
                      }
                    ]}
                  >
                    {this.props.subtitle}
                  </Text>
                )}
                <Text
                  style={[
                    theme.margin_left_right_25,
                    {
                      fontSize: scale(10),
                      textAlign: "center",
                      color: "#9f9f9f"
                    }
                  ]}
                >
                  {this.props.smallText}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={this.props.checkStatus}
            >
              <GreenButton button_text="Check Request Status" />
            </TouchableOpacity>
          </View>
        </BottomSheet>
        <ApplicationStatus
          visible={this.state.status}
          _toggleView={this.toggleStatus}
          subtitle="Request Submission Failed"
          smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}
        />
        {/* <DeleteSuccess visible={this.state.success} _toggleView={this.toggleDelete} 
          smallText={`Request Deleted Successfully`}/>
          <FailureModal visible={this.state.failure} _toggleView={this.toggleFailure} 
            subtitle="Request Submission Failed"
            smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/> */}
      </>
    );
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
  icon: {
    borderRadius: 50,
    marginVertical: scaleHeight(9),
    marginHorizontal: scale(9),
    fontSize: 25,
    padding: 6,
    color: "#138516",
    backgroundColor: "#f5f5f5"
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    height: height/1.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: scale(10)
  },
  button: {
    marginTop: scaleHeight(20),
    bottom: 0,
    flex: 1,
    alignSelf: 'stretch',
    marginHorizontal: scale(10),
    marginBottom: scaleHeight(20),
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#efefef',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1
  },
});
