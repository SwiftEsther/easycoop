import React, { Component } from 'react';
import { TextInput, Picker, StatusBar, StyleSheet, TouchableOpacity, Image, SafeAreaView, Text, View, ToastAndroid, Alert, AsyncStorage } from 'react-native';
import { systemWeights } from 'react-native-typography';
import theme from '../../../../assets/styles/globalStyles';
import * as colors from '../../../../assets/styles/colors';
import * as constants from '../../../../lib/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import API from '../../../../lib/api';
import style from './style';
import AuthenticationHeader from '../../../components/AuthenticationHeader';
import '../../../../lib/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../../components/CustomTextInput/CustomInput';
import Space from '../../../components/Space';
import BlackButton from '../../../components/BlackButton';
import ButtonLink from '../../../components/ButtonLink';
import base64 from 'base-64';
import GreenLineSeparator from '../../../components/GreenLineSeparator';
import Tabs from '../../../components/Tabs';
import CustomModal from '../../../components/CustomModal';


export default class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            action: '',
            spinner: false,
            selected: "1",
            showProfileInfo: true,
            showForceInfo: false,
            policeIdType: '',
            policeId: '',
            rank: '',
            payPoint: '',
            id: '',
            showTC: false
        }
    }

    changeState = (value) => {
        this.setState(value);
    }

    // _toggleView = () => {
    //     this.setState({showTC: !showTC});
    // };

    render() {
        const ranks = [{label: 'First Rank', value: 'fRank'}, {label: 'Second Rank', value: 'sRank'}, {label: 'Third Rank', value: 'tRank'}]
        const payPoints = [{label: 'First Point', value: 'fPoint'}, {label: 'Second Point', value: 'sPoint'}, {label: 'Third Point', value: 'tPoint'}]
        const ids = [{label: 'First ID', value: 'fId'}, {label: 'Second ID', value: 'tId'}, {label: 'Third ID', value: 'tId'}]
        return (
            <SafeAreaView style={[theme.container]}>
                <Spinner visible={this.state.spinner} size="large" color="#000000" animation="none" overlayColor={'rgba(255, 255, 255, 0.1)'} />
                <StatusBar translucent={true} backgroundColor={colors.white} barStyle="dark-content" />
                <View style={[style.headerContainer]}>
                    <TouchableOpacity activeOpacity={0.4} onPress={() => this.props.navigation.goBack(null)}>
                        <Image source={require('../../../../assets/icons/back_24px.png')} />
                    </TouchableOpacity>
                    <View style={[theme.margin_left_right_25, {marginTop: 10}]}>
                        <View style={[style.sign_up_header, theme.box_gap_more, {marginRight: 30}]}>
                            <View>
                                <Text style={[style.sign_up_header_text, theme.typo_bold]}>Sign Up</Text>
                                <GreenLineSeparator/>
                            </View>
                            
                            <Image source={require('../../../../assets/icons/Group.png')}/>
                        </View>
                    </View>
                </View>

                <Tabs 
                  tab1Text="Profile Info" tab2Text="Force Info" selected={this.state.selected}
                  tab1Event={() => this.setState({showForceInfo: false, selected: "1", showProfileInfo:true})} 
                  tab2Event={() => this.setState({ showProfileInfo: false, selected: "2", showForceInfo: true})} />
                    
                <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid={true}>
                    {this.state.showForceInfo && <View style={theme.padding_left_right_25}>
                        <View style={[theme.margin_left_right_25]}>
                            <View style={[theme.fill]}>
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Police ID Type</Text>
                                <View style={[style.pickerStlye, { borderWidth: StyleSheet.hairlineWidth}]}>
                                    <Picker
                                        selectedValue={this.state.id}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({id: itemValue})
                                        }>
                                        <Picker.Item label= '---None---' value= '' />
                                        {ids.map((item, index) =><Picker.Item key={index} label={item.label} value={item.value} />)}
                                    </Picker>
                                </View> 
                                <Text style={[theme.caption, theme.flex1, theme.padded_label, {paddingTop:20}]}>Police ID</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.phone} keyboardType="number-pad" onChangeText={phone=> this.changeState({phone:phone.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular, {borderColor: '#d0d0d0'}]} 
                                    /> 
                                </View> 
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Rank</Text>
                                <View style={[style.pickerStlye, { borderWidth: StyleSheet.hairlineWidth}]}>
                                    <Picker
                                        selectedValue={this.state.rank}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({rank: itemValue})
                                        }>
                                        <Picker.Item label= '' value= '' />
                                        {ranks.map((item, index) =><Picker.Item key={index} label={item.label} value={item.value} />)}
                                    </Picker>
                                </View>

                                <Text style={[theme.caption, theme.flex1, theme.padded_label, {paddingTop:20}]}>Select Pay Point</Text>
                                <View style={[style.pickerStlye, { borderWidth: StyleSheet.hairlineWidth}]}>
                                    <Picker
                                        selectedValue={this.state.payPoint}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({payPoint: itemValue})
                                        }>
                                        <Picker.Item label= '' value= '' />
                                        {payPoints.map((item, index) =><Picker.Item key={index} label={item.label} value={item.value} />)}
                                    </Picker>
                                </View>
                                
                                <View style={style.button}>
                                    <BlackButton button_text="Sign Up" handlePress= {() => this.setState({showTC: true})}/>
                                </View>
                                
                            </View>
                        </View>
                        
                    </View>}
                    {
                        this.state.showProfileInfo && <View style={theme.padding_left_right_25}>
                        <View style={[theme.margin_left_right_25]}>
                            <View style={[theme.fill]}>
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>First Name</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.firstName} onChangeText={firstName=> this.changeState({firstName:firstName.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular, theme.light_border]} 
                                    /> 
                                </View> 
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Surname</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.surname} onChangeText={surname=> this.changeState({surname:surname.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular, theme.light_border]} 
                                    /> 
                                </View> 
                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Email Address</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.email} onChangeText={email=> this.changeState({email:email.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular, theme.light_border]} 
                                    /> 
                                </View> 

                                <Text style={[theme.caption, theme.flex1, theme.padded_label]}>Phone Number</Text>
                                <View style={[theme.input_margin_bottom]}>
                                    <CustomInput value={this.state.phone} onChangeText={phone=> this.changeState({phone:phone.trim()})}
                                        style={[theme.flex1, theme.caption, theme.typo_regular, theme.light_border]} 
                                    /> 
                                </View> 
                                <View style={style.button}>
                                    <BlackButton button_text="Next" handlePress= {() => this.setState({ showProfileInfo: false, selected: "2", showForceInfo: true})}/>
                                </View>
                                
                            </View>
                        </View>
                        
                    </View>
                    }
                </KeyboardAwareScrollView>
                <CustomModal visible={this.state.showTC} _toggleView={()=>this.setState({showTC: !this.state.showTC})}/>
            </SafeAreaView>
        );
    }
}
