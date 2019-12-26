import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Platform, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import theme from '../../../../assets/styles/globalStyles';
import GreenButton from '../../../components/GreenButton';
import { Icon } from 'react-native-elements';
import { scale, scaleHeight } from '../../../helpers/scale';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SuccessModal from '../../../components/SuccessModal';
import FailureModal from '../../../components/FailureModal';

export default class ChangeBalance extends Component {
    constructor(props) {
        super(props);
        this.state={
            amount: '',
            success: false,
            failure: false
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
            <>
                <BottomSheet
                    visible={this.props.visible}
                    onBackButtonPress={this.props._toggleView}
                >
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity activeOpacity={0.7} onPress={this.props.back}>
                        <Text style={[{color: '#fff', fontFamily: 'nunito-bold', fontSize: 20, marginTop: scaleHeight(5), paddingVertical: scale(10), paddingHorizontal: scale(10)}]}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={{paddingVertical: scale(9), paddingHorizontal: scaleHeight(15)}}>
                            <Icon name='close' iconStyle={[styles.icon]} onPress={this.props._toggleView}/>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.bottomNavigationView}>
                        <View style={[theme.container,styles.MainContainer, styles.header, { marginVertical: scaleHeight(20) }]}>
                            <Text style={{ width: width-20, paddingLeft: scale(20), fontSize: 20, fontFamily: 'nunito-bold'}}>Change Savings Balance</Text>
                        </View>
                        <View style={[theme.container, styles.MainContainer, { alignItems: 'flex-start', marginBottom: scaleHeight(50), marginLeft: scale(20), flex: 4 }]}>
                            <View >
                                <Text style={{ color: '#138516', fontFamily: 'nunito-regular' }}>Present Voluntary Savings Amount</Text>
                                <View style={[{ flexDirection: 'row', marginVertical: scaleHeight(10), fontFamily: 'Serif', fontSize: 20 }]}>
                                    {/* <Icon name="naira"/> */}
                                    <Text style={{fontFamily: 'nunito-bold', fontSize: 20, color: '#575757'}}>{`#100,000,000.00`}</Text>
                                </View>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={[styles.label,{flex:1}]}>Enter New Contribution Amount</Text>
                                <View style={[styles.input, {width: width-110,flex:2}]}>
                                    <CustomInput value={this.state.amount} keyboardType="number-pad" onChangeText={amount=> this.changeState({amount})}
                                        style={[{borderColor: '#d0d0d0'}]} 
                                    /> 
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={0.7} style={[styles.buttons]} onPress={this.showRequestFailure}>
                            <GreenButton button_text='Submit Request' />
                        </TouchableOpacity>
                    </View>
                    
                </BottomSheet>
                <SuccessModal visible={this.state.success} _toggleView={this.toggleRequest} 
                                subtitle="Request Submitted Successfully"
                                smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/>
                <FailureModal visible={this.state.failure} _toggleView={this.toggleFailure} 
                    subtitle="Request Submission Failed"
                    smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/>
            </>
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
      borderRadius: 50,
      fontSize: 25,
      padding: 6,
      color: '#138516',
      backgroundColor: '#f5f5f5'
    },
    back: {
        
    },
    buttons: {
        flex: 2,
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginHorizontal: scale(30),
        marginBottom: (30)
    },
    link: {
        flex: 1,
        alignSelf: 'stretch',
        alignContent: 'center',
        paddingHorizontal: scale(15),
        paddingVertical: scaleHeight(20),
        fontSize: 12
    },
    input: {
        marginBottom: scaleHeight(12),
        // marginRight: scale(40)
    },
    label: {
        fontFamily: 'nunito-bold',
        marginVertical: scaleHeight(20)
    }
});
