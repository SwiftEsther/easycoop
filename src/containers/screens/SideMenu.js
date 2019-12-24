import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { scale, scaleHeight } from '../../helpers/scale';

import { connect, Dispatch } from "react-redux";
import NavigationService from '../../../NavigationService';
// import {logoutUserSuccess} from "../Auth/action/auth_actions";
// import { ComponentGenerator } from "../../components/CustomDynamicComponent/ComponentGenerator";
// import AccountSvg from '../../../assets/svgs/account'
import TouchItem from "../../components/TouchItem/_TouchItem";
// import Colors from '../../lib/constants/Colors'


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
        height: scale(100),
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        paddingBottom: scale(16),
        paddingLeft: scale(40),
        paddingRight: scale(10),
        marginBottom: scale(30)
    },
    name: {
        fontFamily: 'nunito-bold',
        fontSize: scale(14),
        color: 'white',
        marginBottom: scale(3),
        maxWidth: scale(120)
    },
    email: {
        fontFamily: 'nunito-regular',
        fontSize: scale(12),
        color: 'white',
        maxWidth: scale(120)
    },
    itemContainer: {
        // marginLeft: scale(40),
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: scale(40),
        // borderBottomColor: '#00425f33',
        // borderBottomWidth: 1,
        paddingLeft: scale(40)
    },
    optionText:{
        // color:'rgba(0, 0, 0, 0.8700000047683716)',
        color:'white',
        fontFamily: 'nunito-medium',
        fontSize: scale(14),
        // marginLeft: scale(20)
    },
    signout:{
        position: 'absolute',
        bottom:0,
        width:'100%',
        paddingLeft: scale(40),
        paddingBottom: scale(40),
        // flexDirection:'row',

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
        let {firstName, email} = this.props.userData;
        return (
            <View style={styles.container}>
                <TouchItem style={styles.topBar} onPress={() => {
                    this.goToSettings();
                }}>
                    <Text style={styles.name} numberOfLines={1}>{firstName}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.email} numberOfLines={1}>{'onuegbu.tisd@sd.com'}</Text>
                        <View
                            // onPress={() => {
                            //   this.goToSettings();
                            // }}
                            style={{
                                paddingHorizontal: scale(10)
                            }}
                        >
                            {/* <Ionicons name={"md-settings"} size={scale(20)}
                                      color={'#fff'}/> */}
                        </View>
                    </View>
                </TouchItem>
                <View>
                    {this.state.menuOptions.map(item => (
                        <View style={styles.itemContainer} key={item.id}>
                            <TouchableOpacity onPress={() => this.goToScreen(item.urlName)}>
                                <View style={styles.listItem}>
                                    {/*<View style={{*/}
                                    {/*// backgroundColor:'red',*/}
                                    {/*width:30*/}
                                    {/*}}>*/}
                                    {/*<ComponentGenerator tag={item.icon} color={'rgba(0, 0, 0, 0.8700000047683716)'}/>*/}
                                    {/*</View>*/}
                                    <Text style={styles.optionText}>{item.name}</Text>
                                    {/*<Ionicons*/}
                                    {/*name="ios-arrow-forward"*/}
                                    {/*size={25}*/}
                                    {/*style={styles.itemArrow}*/}
                                    {/*color="rgba(0, 0, 0, 0.25)"*/}
                                    {/*/>*/}
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <View style={styles.signout}>
                    <TouchableOpacity
                        onPress={() => {
                            this._signOutAsync();
                        }}
                        style={{
                            flexDirection:'row',
                            alignItems:'center'
                        }}
                    >
                        <Ionicons name={"ios-power"} size={scale(20)}
                                  color={'white'}/>
                        <Text style={[styles.optionText,{marginLeft:scale(10)}]}>Sign Out</Text>
                    </TouchableOpacity>

                    {/*<View style={{flexDirection: 'row', justifyContent: 'space-between', paddingRight: scale(30)}}>*/}

                    {/*<Text style={styles.version}>© 2019 Interswitch Group</Text>*/}
                    {/*<Text style={styles.version}>•</Text>*/}
                    {/*<TouchableOpacity onPress={() => this.props.navigation.navigate('Help')} style={{*/}
                    {/*paddingHorizontal: scale(10),*/}
                    {/*paddingBottom: scale(20)*/}
                    {/*}}>*/}
                    {/*<Text style={[styles.version, {color: '#0275d8'}]}>Help</Text>*/}
                    {/*</TouchableOpacity>*/}
                    {/*</View>*/}
                </View>
            </View>
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

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideMenu);
