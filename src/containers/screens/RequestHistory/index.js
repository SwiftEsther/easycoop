import React, {Component} from 'react';
import {Text, Image, View, StatusBar, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, Picker} from 'react-native';
// import WithdrawalRequest from '../Withdrawal/WithdrawalRequest';
import theme from '../../../../assets/styles/globalStyles';
import {Colors} from '../../../lib/constants/colors';
import {scale, scaleHeight} from '../../../helpers/scale';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../../components/Header';
import ViewWithdrawal from '../Withdrawal/ViewWithdrawal';
import { ScrollView } from 'react-native-gesture-handler';
import BorderedTabs from '../../../components/BorderedTab';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            withdraw: false,
            selected: "1",
            showLoans: true,
            showWithdrawals: false,
            showSavings: false
        }
    }

    showWithdrawalRequest = () => {
        this.setState({withdraw: !this.state.withdraw})
    }

    loans = () => this.setState(this.setState({
        showLoans: true,
        selected: "1",
        showSavings: false,
        showWithdrawals: false, 
    }))

    withdrawals = () => this.setState(this.setState({
        showLoans: false,
        selected: "2",
        showWithdrawals: true, 
        showSavings: false
    }))

    savings = () => this.setState(this.setState({
        showLoans: false,
        selected: "3",
        showSavings: true,
        showWithdrawals: false, 
    }))


    render() {
        return (
            <>
                <StatusBar backgroundColor={Colors.white} barStyle="dark-content"/>
                <SafeAreaView style={[theme.container, {fontFamily: 'nunito-bold'}]}>
                <ScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid={true}>
                <View style={[theme.container,{marginTop: scaleHeight(70)}]}>
                      
                    <BorderedTabs
                        tabNumber={3}
                        tab1Text="Loan" tab2Text="Withdrawals" tab3Text="Savings" selected={this.state.selected}
                        tab1Event={this.loans}
                        tab2Event={this.withdrawals}
                        tab3Event={this.savings}
                    />
                    {this.state.showLoans && <>
                        <View style={{alignItems: 'flex-start', paddingHorizontal: scale(14), paddingVertical: scaleHeight(23)}}>
                            <View style={{flex: 1, flexDirection: 'row', marginVertical: scaleHeight(4)}}>
                                <View style={{flex: 2, flexDirection: 'row'}}>
                                    <Text style={{flex: 1, fontFamily: 'nunito-regular'}}>Loan ID: </Text>
                                    <Text style={{flex: 3, fontFamily: 'nunito-bold', marginLeft: scale(3)}}>#AGD212HSU</Text>
                                </View>
                                <Text style={{flex: 1, textAlign: 'right', color:'#138516',fontFamily: 'nunito-regular'}}>24-11-19</Text>
                                
                            </View>
                            <View style={{flex: 1, flexDirection: 'row',  marginVertical: scaleHeight(4)}}>
                                <Text style={{flex: 1, color: '#f80000', fontFamily: 'nunito-bold'}}>Not Approved</Text>
                                <Text style={{flex: 1, textAlign: 'right', color: '#575757', fontFamily: 'nunito-bold'}}>₦100,000,000</Text>
                            </View>
                            {true && <TouchableOpacity activeOpacity={0.7} style={{marginBottom:scaleHeight(26),marginTop:scaleHeight(40)}} onPress={this.showWithdrawalRequest}>
                                <Text style={[styles.defaultButton, theme.typo_bold, {backgroundColor: '#fff',paddingHorizontal: scale(30), borderWidth: StyleSheet.hairlineWidth, borderColor: '#138516'}]}>View Application</Text>
                            </TouchableOpacity>}
                            
                        </View>
                        <View style={{alignItems: 'flex-start', paddingHorizontal: scale(14), paddingVertical: scaleHeight(23),backgroundColor: '#f8f7f7' }}>
                            <View style={{flex: 1, flexDirection: 'row', marginVertical: scaleHeight(4)}}>
                                <View style={{flex: 2, flexDirection: 'row'}}>
                                <Text style={{flex: 1, fontFamily: 'nunito-regular'}}>Loan ID: </Text>
                                    <Text style={{flex: 3, fontFamily: 'nunito-bold', marginLeft: scale(3)}}>#AGD212HSU</Text>
                                </View>
                                <Text style={{flex: 1, textAlign: 'right', color:'#138516',fontFamily: 'nunito-regular'}}>24-11-19</Text>
                                
                            </View>
                            <View style={{flex: 1, flexDirection: 'row',  marginVertical: scaleHeight(4)}}>
                                <Text style={{flex: 1, color: '#138516', fontFamily: 'nunito-bold'}}>Approved</Text>
                                <Text style={{flex: 1, textAlign: 'right', color: '#575757', fontFamily: 'nunito-bold'}}>₦100,000,000</Text>
                            </View>
                            {false && <TouchableOpacity activeOpacity={0.7} style={{marginVertical:scaleHeight(26)}} onPress={this.showWithdrawalRequest}>
                                <Text style={[styles.defaultButton, theme.typo_bold, {backgroundColor: '#fff',paddingHorizontal: scale(30), borderWidth: StyleSheet.hairlineWidth, borderColor: '#138516'}]}>View Application</Text>
                            </TouchableOpacity>}
                            
                        </View>
                        <View style={{alignItems: 'flex-start', paddingHorizontal: scale(14), paddingVertical: scaleHeight(23),backgroundColor: '#fff' }}>
                            <View style={{flex: 1, flexDirection: 'row', marginVertical: scaleHeight(4)}}>
                                <View style={{flex: 2, flexDirection: 'row'}}>
                                <Text style={{flex: 1, fontFamily: 'nunito-regular'}}>Loan ID: </Text>
                                    <Text style={{flex: 3, fontFamily: 'nunito-bold', marginLeft: scale(3)}}>#AGD212HSU</Text>
                                </View>
                                <Text style={{flex: 1, textAlign: 'right', color:'#138516',fontFamily: 'nunito-regular'}}>24-11-19</Text>
                                
                            </View>
                            <View style={{flex: 1, flexDirection: 'row',  marginVertical: scaleHeight(4)}}>
                                <Text style={{flex: 1, color: '#05a4ca', fontFamily: 'nunito-bold'}}>Pending Approved</Text>
                                <Text style={{flex: 1, textAlign: 'right', color: '#575757', fontFamily: 'nunito-bold'}}>₦100,000,000</Text>
                            </View>
                            {false && <TouchableOpacity activeOpacity={0.7} style={{marginVertical:scaleHeight(26)}} onPress={this.showWithdrawalRequest}>
                                <Text style={[styles.defaultButton, theme.typo_bold, {backgroundColor: '#fff',paddingHorizontal: scale(30), borderWidth: StyleSheet.hairlineWidth, borderColor: '#138516'}]}>View Application</Text>
                            </TouchableOpacity>}
                            
                        </View>
                    </> }
                    {this.state.showWithdrawals && <>
                        <View style={{alignItems: 'flex-start', paddingHorizontal: scale(14), paddingVertical: scaleHeight(23)}}>
                            <View style={{flex: 1, flexDirection: 'row', marginVertical: scaleHeight(4)}}>
                                <View style={{flex: 2, flexDirection: 'row'}}>
                                    <Text style={{flex: 5, fontFamily: 'nunito-regular'}}>Withdrawal ID: </Text>
                                    <Text style={{flex: 6, textAlign: 'left', fontFamily: 'nunito-bold', paddingLeft: scale(1)}}>#AGD212HSU</Text>
                                </View>
                                <Text style={{flex: 1, textAlign: 'right', color:'#138516',fontFamily: 'nunito-regular'}}>24-11-19</Text>
                                
                            </View>
                            <View style={{flex: 1, flexDirection: 'row',  marginVertical: scaleHeight(4)}}>
                                <Text style={{flex: 1, color: '#f80000', fontFamily: 'nunito-bold'}}>Not Approved</Text>
                                <Text style={{flex: 1, textAlign: 'right', color: '#575757', fontFamily: 'nunito-bold'}}>₦100,000,000</Text>
                            </View>
                            {true && <TouchableOpacity activeOpacity={0.7} style={{marginBottom:scaleHeight(26),marginTop:scaleHeight(40)}} onPress={this.showWithdrawalRequest}>
                                <Text style={[styles.defaultButton, theme.typo_bold, {backgroundColor: '#fff',paddingHorizontal: scale(30), borderWidth: StyleSheet.hairlineWidth, borderColor: '#138516'}]}>View Request</Text>
                            </TouchableOpacity>}
                            
                        </View>
                        <View style={{alignItems: 'flex-start', paddingHorizontal: scale(14), paddingVertical: scaleHeight(23),backgroundColor: '#f8f7f7' }}>
                            <View style={{flex: 1, flexDirection: 'row', marginVertical: scaleHeight(4)}}>
                                <View style={{flex: 2, flexDirection: 'row'}}>
                                <Text style={{flex: 5, fontFamily: 'nunito-regular'}}>Withdrawal ID: </Text>
                                    <Text style={{flex: 6, textAlign: 'left', fontFamily: 'nunito-bold', paddingLeft: scale(1)}}>#AGD212HSU</Text>
                                </View>
                                <Text style={{flex: 1, textAlign: 'right', color:'#138516',fontFamily: 'nunito-regular'}}>24-11-19</Text>
                                
                            </View>
                            <View style={{flex: 1, flexDirection: 'row',  marginVertical: scaleHeight(4)}}>
                                <Text style={{flex: 1, color: '#138516', fontFamily: 'nunito-bold'}}>Approved</Text>
                                <Text style={{flex: 1, textAlign: 'right', color: '#575757', fontFamily: 'nunito-bold'}}>₦100,000,000</Text>
                            </View>
                            {false && <TouchableOpacity activeOpacity={0.7} style={{marginVertical:scaleHeight(26)}} onPress={this.showWithdrawalRequest}>
                                <Text style={[styles.defaultButton, theme.typo_bold, {backgroundColor: '#fff',paddingHorizontal: scale(30), borderWidth: StyleSheet.hairlineWidth, borderColor: '#138516'}]}>View Request</Text>
                            </TouchableOpacity>}
                            
                        </View>
                        <View style={{alignItems: 'flex-start', paddingHorizontal: scale(14), paddingVertical: scaleHeight(23),backgroundColor: '#fff' }}>
                            <View style={{flex: 1, flexDirection: 'row', marginVertical: scaleHeight(4)}}>
                                <View style={{flex: 2, flexDirection: 'row'}}>
                                    <Text style={{flex: 5, fontFamily: 'nunito-regular'}}>Withdrawal ID: </Text>
                                    <Text style={{flex: 6, textAlign: 'left', fontFamily: 'nunito-bold', paddingLeft: scale(1)}}>#AGD212HSU</Text>
                                </View>
                                <Text style={{flex: 1, textAlign: 'right', color:'#138516',fontFamily: 'nunito-regular'}}>24-11-19</Text>
                                
                            </View>
                            <View style={{flex: 1, flexDirection: 'row',  marginVertical: scaleHeight(4)}}>
                                <Text style={{flex: 1, color: '#05a4ca', fontFamily: 'nunito-bold'}}>Pending Approved</Text>
                                <Text style={{flex: 1, textAlign: 'right', color: '#575757', fontFamily: 'nunito-bold'}}>₦100,000,000</Text>
                            </View>
                            {false && <TouchableOpacity activeOpacity={0.7} style={{marginVertical:scaleHeight(26)}} onPress={this.showWithdrawalRequest}>
                                <Text style={[styles.defaultButton, {backgroundColor: '#fff',paddingHorizontal: scale(30), borderWidth: StyleSheet.hairlineWidth, borderColor: '#138516'}]}>View Request</Text>
                            </TouchableOpacity>}
                            
                        </View>
                    </> }
                    {this.state.showSavings && <>
                        <View style={{alignItems: 'flex-start', paddingHorizontal: scale(14), paddingVertical: scaleHeight(23),backgroundColor: '#fff' }}>
                            <View style={{flex: 1, flexDirection: 'row', marginVertical: scaleHeight(4)}}>
                                <View style={{flex: 2, flexDirection: 'row',}}>
                                    <Text style={{flex: 1, fontFamily: 'nunito-regular'}}>{`Savings: `} </Text>
                                    <Text style={{flex: 3, textAlign: 'left', fontFamily: 'nunito-bold', marginLeft: 2}}>{` #AGD212HSU`}</Text>
                                </View>
                                <Text style={{flex: 1, textAlign: 'right', color:'#138516',fontFamily: 'nunito-regular'}}>24-11-19</Text>
                                
                            </View>
                            <View style={{flex: 1, flexDirection: 'row',  marginVertical: scaleHeight(4)}}>
                                <Text style={{flex: 1, color: '#9f9f9f', fontFamily: 'nunito-bold'}}>Credited</Text>
                                <Text style={{flex: 1, textAlign: 'right', color: '#575757', fontFamily: 'nunito-bold'}}>₦100,000,000</Text>
                            </View>
                            
                        </View>
                        <View style={{alignItems: 'flex-start', paddingHorizontal: scale(14), paddingVertical: scaleHeight(23),backgroundColor: '#f8f7f7' }}>
                            <View style={{flex: 1, flexDirection: 'row', marginVertical: scaleHeight(4)}}>
                                <View style={{flex: 2, flexDirection: 'row',}}>
                                    <Text style={{flex: 1, fontFamily: 'nunito-regular'}}>{`Savings: `} </Text>
                                    <Text style={{flex: 3, textAlign: 'left', fontFamily: 'nunito-bold', marginLeft: 2}}>{` #AGD212HSU`}</Text>
                                </View>
                                <Text style={{flex: 1, textAlign: 'right', color:'#138516',fontFamily: 'nunito-regular'}}>24-11-19</Text>
                                
                            </View>
                            <View style={{flex: 1, flexDirection: 'row',  marginVertical: scaleHeight(4)}}>
                                <Text style={{flex: 1, color: '#9f9f9f', fontFamily: 'nunito-bold'}}>Credited</Text>
                                <Text style={{flex: 1, textAlign: 'right', color: '#575757', fontFamily: 'nunito-bold'}}>₦100,000,000</Text>
                            </View>
                            
                        </View>
                        <View style={{alignItems: 'flex-start', paddingHorizontal: scale(14), paddingVertical: scaleHeight(23),backgroundColor: '#fff' }}>
                            <View style={{flex: 1, flexDirection: 'row', marginVertical: scaleHeight(4)}}>
                                <View style={{flex: 2, flexDirection: 'row',}}>
                                    <Text style={{flex: 1, fontFamily: 'nunito-regular'}}>{`Savings: `} </Text>
                                    <Text style={{flex: 3, textAlign: 'left', fontFamily: 'nunito-bold', marginLeft: 2}}>{` #AGD212HSU`}</Text>
                                </View>
                                <Text style={{flex: 1, textAlign: 'right', color:'#138516',fontFamily: 'nunito-regular'}}>24-11-19</Text>
                                
                            </View>
                            <View style={{flex: 1, flexDirection: 'row',  marginVertical: scaleHeight(4)}}>
                                <Text style={{flex: 1, color: '#9f9f9f', fontFamily: 'nunito-bold'}}>Credited</Text>
                                <Text style={{flex: 1, textAlign: 'right', color: '#575757', fontFamily: 'nunito-bold'}}>₦100,000,000</Text>
                            </View>
                            
                        </View>
                    </> }
                </View>
                

                </ScrollView>
                {/* <View style={[{alignItems: 'flex-start', justifyContent: 'flex-start', flex: 1, marginTop: 100}]}>
                    <View style={{backgroundColor: 'red', }}>
                        <View style={{flex: 1, flexDirection: 'row',  backgroundColor: 'red'}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Text>Withdrawal ID: </Text>
                                <Text>#AGD212HSU</Text>
                            </View>
                            <Text style={{flex: 1}}>24-11-19</Text>
                            
                        </View>
                        <View style={{flex: 1, flexDirection: 'row',  backgroundColor: #138516}}>
                            <Text style={{flex: 1}}>Not Approved</Text>
                            <Text style={{flex: 1}}>₦100,000,000</Text>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} style={{width:width/2.5}} onPress={this.showWithdrawalRequest}>
                        <Text style={[styles.defaultButton, theme.typo_bold, {backgroundColor: '#fff', borderWidth: StyleSheet.hairlineWidth, borderColor: '#138516'}]}>View Request</Text>
                    </TouchableOpacity>
            </View> */}
                    <Header navigation={{...this.props.navigation}}/>
                    {/* <WithdrawalRequest visible={this.state.withdraw} _toggleView={this.showWithdrawalRequest}/> */}
                        
                    {/* <Withdraw visible={this.state.withdraw} _toggleView={()=>this.setState({withdraw: !this.state.withdraw})}/> */}
                </SafeAreaView>
            </>
        );
    }
}

const styles = StyleSheet.create({
  defaultButton: {
    fontSize: 17,
    padding: scale(18),
    color: "#138516",
    borderRadius: 3,
    textAlign: "center",
    fontFamily: "nunito-bold"
  }
});
