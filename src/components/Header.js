import React, { Component } from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {scale} from '../helpers/scale';
import theme from '../../assets/styles/globalStyles';
import { Ionicons } from "@expo/vector-icons";

export default class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            unreadNotificationsLength:2
        }
    }

    render() {
        console.log(this.props)
        return(
            <View style={[styles.container, theme.fill ,{position: 'absolute', left: 0, right: 0, top: 0, backgroundColor: '#fff'}]}>
                
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity  activeOpacity={0.7} style={[theme.flex1]} onPress={()=> this.props.navigation.openDrawer()}>
                        {/*<TouchableOpacity  activeOpacity={0.7} style={[theme.flex1]} onPress={this.props.navigation.openDrawer()}>*/}
                            <Icon name="menu" style={[styles.icons]}/>
                        </TouchableOpacity>
                        <View style={[styles.separator]}></View>
                       <View>
                           <TouchableOpacity activeOpacity={0.7}   onPress={() => this.props.navigation.navigate('Notifications')}>
                               <Ionicons
                                   name="ios-notifications-outline"
                                   size={25}
                                   style={styles.icons}
                                   // color={this.props.activeItemKey === 'Dashboard'?'white':'black'}
                               />
                           </TouchableOpacity>
                           {!!this.state.unreadNotificationsLength && (
                               <View style={styles.badge}>
                               <Text style={{
                                   textAlign: 'center',
                                   justifyContent: 'center',
                                   color: 'white',
                                   fontSize: scale(8),
                                   fontFamily:'nunito-bold',
                               }}>
                                   {this.state.unreadNotificationsLength}
                               </Text>
                               </View>
                           )}
                       </View>
                    </View>
                    
                    <TouchableOpacity activeOpacity={0.7} style={[theme.flex1]} >
                        <Icon name="home" style={[styles.icons,{justifyContent:'flex-end'}]}/>
                    </TouchableOpacity>
                
                
                {/* <Image source={require('../../assets/images/pexels_photo.png')} style={[styles.avatar]}/> */}
               
                
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scale(11),
        paddingVertical: scale(20) 
    },
    avatar: {

    }, 
    icons: {
        // marginTop: scale(10),
    },
    badge: {
        position: 'absolute',
        width: scale(12),
        height: scale(12),
        backgroundColor:'#d80101',
        borderRadius: scale(6),
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white',
        top: scale(-4),
        right: scale(-4),
        zIndex:99999
    },
    separator: {
        borderRightWidth:scale(1),
        // marginTop: scale(5),
        borderRightColor: '#ccc',
        marginHorizontal: scale(30)
    }
})
