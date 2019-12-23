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
                            <Text style={[theme.typo_bold, theme.font17, { width: width, paddingLeft: scale(20), }]}>Change Savings Amount Preview</Text>
                        </View>
                        <View style={[theme.container, styles.MainContainer, { alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: scaleHeight(50), marginHorizontal: scale(20), flex: 4 }]}>
                            <View>
                                <Text style={[theme.typo_regular, { fontSize: 11,color: '#138516' }]}>Present Voluntary Savings Amount</Text>
                                <View style={[theme.typo_bold, theme.font17, { flexDirection: 'row', marginVertical: scaleHeight(10), fontFamily: 'Serif', fontSize: 20 }]}>
                                    {/* <Icon name="naira"/> */}
                                    <Text style={[theme.font15]}>{`#100,000,000.00`}</Text>
                                </View>
                            </View>
                            <View style={{marginTop: scaleHeight(20)}}>
                                <Text style={[theme.typo_regular, { fontSize: 11,color: '#138516' }]}>Present Voluntary Savings Amount</Text>
                                <View style={[theme.typo_bold, theme.font17, { flexDirection: 'row', marginVertical: scaleHeight(10), fontFamily: 'Serif', fontSize: 20 }]}>
                                    {/* <Icon name="naira"/> */}
                                    <Text style={[theme.font15]}>{`#100,000,000.00`}</Text>
                                </View>
                            </View>
                            <View style={{marginTop: scaleHeight(20)}}>
                                <Text style={[theme.typo_bold, theme.font15]}>Request Status</Text>
                                <View style={[theme.typo_bold, theme.font17, { flexDirection: 'row', marginVertical: scaleHeight(10)}]}>
                                    <Text style={[theme.font15, {color: '#138516', backgroundColor: '#d0e7d1', paddingVertical: scaleHeight(5), paddingHorizontal: 23}]}>{`Pending`}</Text>
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
        height: height / 1.3,
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
