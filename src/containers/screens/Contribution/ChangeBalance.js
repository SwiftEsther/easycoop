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
import { systemWeights } from 'react-native-typography';
import { render } from 'react-dom';

export default class ChangeBalance extends Component {
    constructor(props) {
        super(props);
        this.state={
            amount: '',
            success: false
        }
    }

    viewRequest() {

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
                    <TouchableOpacity activeOpacity={0.7} onPress={this.props.back} style={{width: width/3}}>
                        <Text style={[theme.font17, {color: '#fff', marginBottom: scaleHeight(15), paddingHorizontal: scale(10)}]}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={[theme.flex1]} onPress={this.props._toggleView}>
                            <Icon name='close' iconStyle={[theme.typo_bold, styles.icon]}/>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.bottomNavigationView}>
                        <View style={[theme.container, styles.MainContainer, styles.header, { marginVertical: scaleHeight(20) }]}>
                            <Text style={[theme.typo_bold, theme.font17, { width: width, paddingLeft: scale(20), }]}>Change Savings Balance</Text>
                        </View>
                        <View style={[theme.container, styles.MainContainer, { alignItems: 'flex-start', marginBottom: scaleHeight(50), marginHorizontal: scale(20), flex: 4 }]}>
                            <View >
                                <Text style={[theme.typo_regular, { fontSize: 11,color: '#138516' }]}>Present Voluntary Savings Amount</Text>
                                <View style={[theme.typo_bold, theme.font17, { flexDirection: 'row', marginVertical: scaleHeight(10), fontFamily: 'Serif', fontSize: 20 }]}>
                                    {/* <Icon name="naira"/> */}
                                    <Text style={[theme.font15]}>{`#100,000,000.00`}</Text>
                                </View>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={[theme.caption, theme.flex1,theme.padded_label, {paddingTop:scale(20),flex:1}]}>Enter New Contribution Amount</Text>
                                <View style={[theme.input_margin_bottom, {width: width-110,flex:2}]}>
                                    <CustomInput value={this.state.amount} keyboardType="number-pad" onChangeText={amount=> this.changeState({amount})}
                                        style={[theme.caption, theme.typo_regular, {borderColor: '#d0d0d0'}]} 
                                    /> 
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={0.7} style={[styles.buttons]} onPress={this.showRequestSuccess}>
                            <GreenButton button_text='Submit Request' />
                        </TouchableOpacity>
                    </View>
                    
                </BottomSheet>
                <SuccessModal visible={this.state.success} _toggleView={this.toggleRequest} 
                                subtitle="Request Submitted Successfully"
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
        width: '100%',
        height: height / 1.6,
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
});
