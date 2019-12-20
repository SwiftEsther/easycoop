import React, { Component } from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {scale} from '../helpers/scale';
import theme from '../../assets/styles/globalStyles';

export default class Header extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <View style={[styles.container, theme.fill ,{position: 'absolute', left: 0, right: 0, top: 0, backgroundColor: '#fff'}]}>
                
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity  activeOpacity={0.7} style={[theme.flex1]} onPress={()=> this.props.navigation.navigate('SideMenu')}>
                            <Icon name="menu" style={[styles.icons]}/>
                        </TouchableOpacity>
                        <View style={[styles.separator]}></View>
                        <TouchableOpacity activeOpacity={0.7} style={[theme.flex1]} >
                            <Icon name="notifications" style={[styles.icons]}/>
                        </TouchableOpacity>
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
        marginTop: scale(10),
    },
    separator: {
        borderRightWidth:scale(1),
        marginTop: scale(5),
        borderBottomColor: '#f4f6fa',
        marginHorizontal: scale(30)
    }
})
