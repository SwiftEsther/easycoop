import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage, Image,ScrollView } from 'react-native';
import { Ionicons, FontAwesome,Feather } from '@expo/vector-icons';

import { scale, scaleHeight } from '../../helpers/scale';

import { connect, Dispatch } from "react-redux";
import NavigationService from '../../../NavigationService';
import {logoutUserSuccess} from "./Login/actions/login.actions";
// import { ComponentGenerator } from "../../components/CustomDynamicComponent/ComponentGenerator";
// import AccountSvg from '../../../assets/svgs/account'
import TouchItem from "../../components/TouchItem/_TouchItem";
import { Colors } from "../../lib/constants/colors";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        // backgroundColor: '#EFF2F7'
        backgroundColor: 'white'
    },
    version: {
        fontSize: scale(9),
        textAlign: 'center',
        letterSpacing: -0.23,
        color: '#fff',
        marginTop: scale(11),
    },
    topBar: {
        width: '100%',
        height: scale(130),
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        // paddingBottom: scale(16),
        paddingLeft: scale(15),
        paddingRight: scale(10),
        // marginBottom: scale(30),
        borderBottomWidth: scale(1),
        borderBottomColor: 'rgba(0, 0, 0, 0.35)'
    },
    name: {
        fontFamily: 'nunito-bold',
        fontSize: scale(15),
        color: '#575757',
        marginBottom: scale(4),
        maxWidth: scale(120)
    },
    email: {
        fontFamily: 'nunito-regular',
        fontSize: scale(15),
        color: '#ccc',
        maxWidth: scale(180)
    },
    itemContainer: {
        backgroundColor: Colors.white,
        height: scale(48),
        justifyContent: 'center',
        maxWidth: scale(248),
        marginTop: scale(24),
        borderTopRightRadius: scale(24),
        borderBottomRightRadius: scale(24),
        // marginLeft: scale(40),
    },
    itemContainerSelected:{
        backgroundColor: Colors.primary_green,
        height: scale(48),
        justifyContent: 'center',
        maxWidth: scale(248),
        marginTop: scale(24),
        borderTopRightRadius: scale(24),
        borderBottomRightRadius: scale(24),
    },
    innerContainer: {
        height: scale(40),
        justifyContent: 'center',
        maxWidth: scale(248),
    },
    innerContainerSelected:{
        height: scale(40),
        borderTopRightRadius: scale(20),
        borderBottomRightRadius: scale(20),
        backgroundColor: Colors.primary_green,
        justifyContent: 'center',
        maxWidth: scale(248),
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // height: scale(40),
        // borderBottomColor: '#00425f33',
        // borderBottomWidth: 1,
        paddingLeft: scale(55)
    },
    listItemSelected:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // height: scale(40),
        // borderBottomColor: '#00425f33',
        // borderBottomWidth: 1,
        paddingLeft: scale(80)
    },
    optionText: {
        // color:'rgba(0, 0, 0, 0.8700000047683716)',
        color: 'white',
        fontFamily: 'nunito-medium',
        fontSize: scale(14),
        // marginLeft: scale(20)
    },
    signout: {
        // position: 'absolute',
        // bottom: 0,
        width: '100%',
        marginTop:scale(40),
        paddingLeft: scale(15),
        paddingBottom: scale(40),
        // flexDirection:'row',

    },
    heading: {
        fontFamily: 'nunito-bold',
        fontSize: scale(15),
        color: '#575757',
        marginBottom: scale(15),
        marginHorizontal: scale(15),
        // maxWidth: scale(120)
    }
});


class SideMenu extends React.Component {

    state = {
        menuOptions: [
            {
                name: "Home",
                id: 1,
                urlName: "Home",
                icon: 'HomeSvg'
            },
        ]
    }

    goToScreen = (urlName) => {
        this.props.navigation.closeDrawer();
        NavigationService.navigate(urlName)
    }

    goToSettings = () => {
        this.props.navigation.closeDrawer();
        NavigationService.navigate('Accounts');
    }

    render() {
        let {firstName, username, emailAddress} = this.props.userData;
        console.log(this.props.activeItemKey)
        return (
            <ScrollView style={styles.container}>
                <TouchItem style={styles.topBar} onPress={() => {
                    this.goToSettings();
                }}>
                    <Image style={{
                        height: scale(52),
                        width: scale(52),
                        borderRadius: scale(26),
                        borderWidth: scale(2),
                        borderColor: Colors.primary_green,
                        marginRight: scale(10)
                    }} source={require('../../../assets/icons/coins.png')}/>

                    <View>
                        <Text style={styles.name} numberOfLines={1}>{firstName[0].toUpperCase() + firstName.slice(1)}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text style={styles.email} numberOfLines={1}>{emailAddress}</Text>
                        </View>
                    </View>
                </TouchItem>
                <View>

                    <View style={this.props.activeItemKey === 'Dashboard' ? styles.itemContainerSelected : styles.itemContainer}>
                        <TouchableOpacity onPress={() => this.goToScreen('Dashboard')}>
                            <View style={this.props.activeItemKey === 'Dashboard'? styles.listItemSelected: styles.listItem}>
                                {/*<View style={{*/}
                                {/*// backgroundColor:'red',*/}
                                {/*width:30*/}
                                {/*}}>*/}
                                {/*<ComponentGenerator tag={item.icon} color={'rgba(0, 0, 0, 0.8700000047683716)'}/>*/}
                                {/*</View>*/}
                                <Ionicons
                                    name="md-home"
                                    size={25}
                                    style={{marginRight: scale(15)}}
                                    color={this.props.activeItemKey === 'Dashboard'?'white':'black'}
                                />
                                <Text style={[styles.optionText,this.props.activeItemKey === 'Dashboard' ?{}:{color: Colors.gray}]}>Home</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop: scale(30)}}>
                        <Text style={styles.heading}>Account Information</Text>

                        <TouchableOpacity onPress={() => this.goToScreen('Profile')} style={this.props.activeItemKey === 'Profile' ? styles.innerContainerSelected:styles.innerContainer}>
                            <View style={this.props.activeItemKey === 'Profile'? styles.listItemSelected: styles.listItem}>
                                <FontAwesome
                                    name="user"
                                    size={18}
                                    style={{marginRight: scale(15)}}
                                    color={this.props.activeItemKey === 'Profile'?'white':'black'}
                                />
                                <Text style={[styles.optionText,this.props.activeItemKey === 'Profile' ?{}:{color: Colors.gray}]}>Profile Info</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.goToScreen('NextOfKinUpdate')} style={this.props.activeItemKey === 'NextOfKinUpdate' ? styles.innerContainerSelected:styles.innerContainer}>
                            <View style={this.props.activeItemKey === 'NextOfKinUpdate'? styles.listItemSelected: styles.listItem}>
                                <FontAwesome
                                    name="user"
                                    size={18}
                                    style={{marginRight: scale(15)}}
                                    color={this.props.activeItemKey === 'NextOfKinUpdate'?'white':'black'}
                                />
                                <Text style={[styles.optionText,this.props.activeItemKey === 'NextOfKinUpdate' ?{}:{color: Colors.gray}]}>Next of Kin Update</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop: scale(30)}}>
                        <Text style={styles.heading}>Settings</Text>

                        <TouchableOpacity onPress={() => this.goToScreen('ResetPassword')} style={this.props.activeItemKey === 'ResetPassword' ? styles.innerContainerSelected:styles.innerContainer}>
                            <View style={this.props.activeItemKey === 'ResetPassword'? styles.listItemSelected: styles.listItem}>
                                <FontAwesome
                                    name="lock"
                                    size={18}
                                    style={{marginRight: scale(15)}}
                                    color={this.props.activeItemKey === 'ResetPassword'?'white':Colors.primary_green}
                                />
                                <Text style={[styles.optionText,this.props.activeItemKey === 'ResetPassword' ?{}:{color: Colors.gray}]}>Reset Password</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop: scale(30)}}>
                        <Text style={styles.heading}>Request for Help</Text>

                        <TouchableOpacity onPress={() => this.goToScreen('Support')} style={this.props.activeItemKey === 'Support' ? styles.innerContainerSelected:styles.innerContainer}>
                            <View style={this.props.activeItemKey === 'Support'? styles.listItemSelected: styles.listItem}>
                                <Ionicons
                                    name="ios-information-circle"
                                    size={18}
                                    style={{marginRight: scale(15)}}
                                    color={this.props.activeItemKey === 'Support'?'white':Colors.primary_green}
                                />
                                <Text style={[styles.optionText,this.props.activeItemKey === 'Support' ?{}:{color: Colors.gray}]}>Support</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.signout}>

                    <TouchableOpacity style={[styles.listItem, {paddingLeft: scale(40)}]}   onPress={() => {
                        this._signOutAsync();
                    }}>
                        <Feather
                            name="log-out"
                            size={18}
                            style={{marginRight: scale(15)}}
                            color={'black'}
                        />
                        <Text style={[styles.optionText, {color: Colors.gray}]}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    _signOutAsync = async () => {
        this.props.logoutUserSuccess();
        AsyncStorage.removeItem('access_token');
        NavigationService.navigate('Login');
    };

}

const mapStateToProps = (state, ownProps) => {
    return {
        userData: state.login,
    };
};

const mapDispatchToProps = {logoutUserSuccess};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideMenu);
