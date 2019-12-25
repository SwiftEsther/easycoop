import React, { Component } from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {scale, scaleHeight} from '../helpers/scale';
import theme from '../../assets/styles/globalStyles';

export default class Header extends Component{
    constructor(props){
        super(props);
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
        paddingTop: scale(25) 
    },
    avatar: {

    }, 
    icons: {
    },
    separator: {
        borderRightColor: '#bdbdbd',
        borderRightWidth: 1,
        height: scaleHeight(21),
        alignSelf: 'center',
        marginHorizontal: scale(26)
    }
})
