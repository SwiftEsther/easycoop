import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Platform, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import theme from '../../../../assets/styles/globalStyles';
import GreenButton from '../../../components/GreenButton';
import WhiteButton from '../../../components/WhiteButton';
import { Icon } from 'react-native-elements';
import { scale, scaleHeight } from '../../../helpers/scale';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SuccessModal from '../../../components/SuccessModal';
import FailureModal from '../../../components/FailureModal';
import WithdrawalRequest from './WithdrawalRequest';

export default class ViewWithdrawal extends Component {
    constructor(props) {
        super(props);
        this.state={
            amount: '',
            success: false,
            failure: false,
            withdraw: false
        }
    }

    showWithdrawalRequest = () => {
        this.setState({withdraw: !this.state.withdraw})
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
                    onBackdropPress={this.props._toggleView}
                >
                    <View >
                        <TouchableOpacity activeOpacity={0.7} style={[theme.flex1]} onPress={this.props._toggleView}>
                            <Icon name='close' iconStyle={[theme.typo_bold, styles.icon]}/>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.bottomNavigationView}>
                        <View style={[theme.container, styles.MainContainer, styles.header, { marginVertical: scaleHeight(20) }]}>
                            <Text style={[theme.typo_bold, theme.font17, { width: width, paddingLeft: scale(20), }]}>Request was <Text style={{color: '#f80000'}}>Not Approved</Text></Text>
                        </View>
                        <View style={[theme.container, styles.MainContainer, { alignItems: 'flex-start', marginBottom: scaleHeight(50), marginHorizontal: scale(20), flex: 4 }]}>
                            <View >
                                <Text style={{color: '#138516', marginTop: 20}}>Admin's Note: </Text>
                                <Text style={{color: '#707070', backgroundColor: '#f8f8f8',marginVertical: scaleHeight(10), padding: scale(20)}}>
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.buttons]}>
                            <TouchableOpacity activeOpacity={0.7} style={[styles.link]} onPress={this.showChangeForm}>
                                <WhiteButton button_text='Delete Application'/>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} style={[styles.link]} onPress={this.showWithdrawalRequest}>
                                <GreenButton button_text='Apply Again' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </BottomSheet>
                <WithdrawalRequest visible={this.state.withdraw} _toggleView={this.showWithdrawalRequest}/>
                <SuccessModal visible={this.state.success} _toggleView={this.toggleRequest} 
                                subtitle="Request Submitted Successfully"
                                smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/>
                <FailureModal visible={this.state.failure} _toggleView={this.toggleFailure} 
                    subtitle="Request Submission Failed"
                    smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/>
            </ScrollView>
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
        height: height / 1.2,
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
        position: 'absolute'
    },
    buttons: {
        flex: 2,
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginHorizontal: scale(10),
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
});
