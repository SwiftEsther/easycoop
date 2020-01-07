import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Platform, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import theme from '../../../../assets/styles/globalStyles';
import GreenButton from '../../../components/GreenButton';
import WhiteButton from '../../../components/WhiteButton';
import { Icon } from 'react-native-elements';
import { scale, scaleHeight } from '../../../helpers/scale';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ChangeBalance from './ChangeBalance';
import DeleteModal from '../../../components/DeleteModal';
import DeleteSuccess from '../../../components/DeleteSuccess';
import { systemWeights } from 'react-native-typography';

export default class ViewRequest extends Component {
    constructor(props) {
        super(props);
        this.state={
            amount: '',
            showDelete: false,
            deleted: false,
            showChangeBalance: false,
            success: false,
        }
    }

    viewRequest() {

    }

    changeSavings = () => {
      this.setState({
        showChangeBalance: !this.state.showChangeBalance
      });
    }

    showDeleteModal=()=>{
        this.props._toggleView();
            this.setState({
            showDelete: !this.state.showDelete
        })
    }

    delete=()=>{
        this.setState({
            showDelete: !this.state.showDelete
        })
    }

    toggleDelete = () => this.setState({deleted: !this.state.deleted})

    showChangeForm=()=>{
        this.props._toggleView();
        this.setState({
            showChangeBalance: !this.state.showChangeBalance
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
                >
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity activeOpacity={0.7} onPress={this.props.back}>
                        <Text style={[{color: '#fff', fontFamily: 'nunito-bold', fontSize: 20, marginTop: scaleHeight(5), paddingHorizontal: scale(20), paddingHorizontal: scale(10)}]}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={{paddingVertical: scale(9), paddingHorizontal: scaleHeight(15)}}>
                            <Icon name='close' iconStyle={[styles.icon]} onPress={this.props._toggleView}/>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.bottomNavigationView}>
                        <View style={[styles.MainContainer, styles.header, { marginVertical: scaleHeight(20) }]}>
                            <Text style={{paddingLeft: scale(20), fontSize: 20, fontFamily: 'nunito-bold'}}>Change Savings Amount Preview</Text>
                        </View>
                        <View style={[ styles.MainContainer, { alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: scaleHeight(50), marginHorizontal: scale(20), flex: 4 }]}>
                            <View>
                                <Text style={{ color: '#138516', fontFamily: 'nunito-regular' }}>Present Voluntary Savings Amount</Text>
                                <View style={[theme.typo_bold, theme.font17, { flexDirection: 'row', marginVertical: scaleHeight(10), fontFamily: 'Serif', fontSize: 20 }]}>
                                    {/* <Icon name="naira"/> */}
                                    <Text style={{fontFamily: 'nunito-bold', fontSize: 20, color: '#575757'}}>{`#100,000,000.00`}</Text>
                                </View>
                            </View>
                            <View style={{marginTop: scaleHeight(20)}}>
                                <Text style={ {  fontFamily: 'nunito-regular',color: '#138516' }}>Requested Contribution Amount</Text>
                                <View style={[theme.typo_bold, theme.font17, { flexDirection: 'row', marginVertical: scaleHeight(10), fontFamily: 'Serif', fontSize: 20 }]}>
                                    {/* <Icon name="naira"/> */}
                                    <Text style={{fontFamily: 'nunito-bold', fontSize: 20, color: '#575757'}}>{`#100,000,000.00`}</Text>
                                </View>
                            </View>
                            <View style={{marginTop: scaleHeight(20)}}>
                                <Text style={{fontFamily: 'nunito-bold'}}>Request Status</Text>
                                <View style={{ flexDirection: 'row', marginVertical: scaleHeight(10)}}>
                                    <Text style={{color: '#138516', backgroundColor: '#d0e7d1', paddingVertical: scaleHeight(10), paddingHorizontal: scale(26)}}>{`Pending`}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.buttons]}>
                            <TouchableOpacity activeOpacity={0.7} style={[styles.link]} onPress={this.showChangeForm}>
                                <WhiteButton button_text='Edit Request'/>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} style={[styles.link]} onPress={this.showDeleteModal}>
                                <GreenButton button_text='Delete Request' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </BottomSheet>
                <ChangeBalance visible={this.state.showChangeBalance} _toggleView={this.changeSavings} back={this.showChangeForm} />
                <DeleteModal visible={this.state.showDelete} _toggleView={this.delete} handleClick={this.toggleDelete}
                    itemAction={'Some Action'}
                    applicationSuccess={'Status'}/>
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
        height: height / 1.3,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: scale(5)
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
        marginHorizontal: scale(10),
        marginBottom: (30)
    },
    link: {
        flex: 1,
        alignSelf: 'stretch',
        alignContent: 'center',
        paddingHorizontal: scale(15),
        fontSize: 12
    },
});
