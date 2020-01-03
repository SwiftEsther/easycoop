import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Platform, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import theme from '../../assets/styles/globalStyles';
import GreenButton from './GreenButton';
import WhiteButton from './WhiteButton';
import { Icon } from 'react-native-elements';
import { scale, scaleHeight } from '../helpers/scale';
import CustomInput from './CustomTextInput/CustomInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SuccessModal from './SuccessModal';
import FailureModal from './FailureModal';

export default class ApplicationStatus extends Component {
    constructor(props) {
        super(props);
        this.state={
            amount: '',
            success: false,
            failure: false,
            successMessage: "",
            failureMessage: ""
        }
    }

    showRequestFailure=()=>{
        this.props._toggleView();
          this.setState({
            failure: !this.state.failure
        })
      }

    showRequestSuccess=()=>{
        this.props._toggleView();
        this.setState({
        success: !this.state.success
    })
}

    toggleRequest=()=>this.setState({
        success: !this.state.success
    })

    toggleFailure=()=>this.setState({
        failure: !this.state.failure
      })
    
    changeState = (value) => {
        this.setState(value);
    }

    render() {
        const {width, height} = Dimensions.get('window');
        return (
          <ScrollView>
            <BottomSheet
              visible={this.props.visible}
              onBackButtonPress={this.props._toggleView}
            >
              <View>
                <TouchableOpacity activeOpacity={0.7} style={[styles.icon]}>
                  <Icon name="close" onPress={this.props._toggleView} />
                </TouchableOpacity>
              </View>

              <View style={styles.bottomNavigationView}>
                <View
                  style={[
                    styles.MainContainer,
                    styles.header,
                    { marginVertical: scaleHeight(20) }
                  ]}
                >
                  <Text
                    style={[
                      {
                        width: width,
                        paddingLeft: scale(20),
                        fontFamily: "nunito-bold",
                        fontSize: 20
                      }
                    ]}
                  >
                    Request was{" "}
                    {!this.props.rejected && (
                      <Text style={{ color: "#138516" }}>Approved</Text>
                    )}
                    {this.props.rejected && (
                      <Text style={{ color: "#f80000" }}>Not Approved</Text>
                    )}
                  </Text>
                </View>
                <View style={[{ marginHorizontal: scale(20), flex: 3 }]}>
                  <View>
                    <Text
                      style={{ color: "#138516", fontFamily: "nunito-bold" }}
                    >
                      Admin's Note:{" "}
                    </Text>
                    <Text
                      style={{
                        color: "#707070",
                        backgroundColor: "#f8f8f8",
                        fontFamily: "nunito-medium",
                        fontSize: 13,
                        marginVertical: scaleHeight(10),
                        padding: scale(20)
                      }}
                    >
                      {`${this.props.rejectionNote}`}
                    </Text>
                  </View>
                </View>
                <View style={[styles.buttons, { marginBottom: 50 }]}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.link]}
                    onPress={this.props.deleteApplication}
                  >
                    <WhiteButton button_text="Delete Application" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.link]}
                    onPress={this.props.reApply}
                  >
                    <GreenButton button_text="Apply Again" />
                  </TouchableOpacity>
                </View>
              </View>
            </BottomSheet>
            <SuccessModal
              visible={this.state.success}
              _toggleView={this.toggleRequest}
              subtitle="Request Submitted Successfully"
              smallText={`${this.state.successMessage}`}
            />
            <FailureModal
              visible={this.state.failure}
              _toggleView={this.toggleFailure}
              subtitle="Request Submission Failed"
              smallText={`${this.state.failureMessage}`}
            />
          </ScrollView>
        );
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
        flex: 1,
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        height: height / 1.4,
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
        top: scaleHeight(-50),
        right: scale(5),
        position: 'absolute',
        color: '#138516'
    },
    buttons: {
        flex: 2,
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginHorizontal: scale(10),
    },
    link: {
        flex: 1,
        alignSelf: 'stretch',
        alignContent: 'center',
        paddingHorizontal: scale(15),
        paddingVertical: scaleHeight(20),
    },
});
