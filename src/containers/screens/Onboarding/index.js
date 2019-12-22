import React, {Component} from 'react';
import {View, Image, Text, StatusBar, TouchableOpacity, Linking} from 'react-native';
import theme from '../../../../assets/styles/globalStyles';
import style from './style';
import Circle from '../../../components/Circle';

export default class Onboarding extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[style.container]} >
                <StatusBar hidden />
                <View style={[style.imageContainer]}>
                     <Circle />
                    <Image style={[style.imageStyles]} source={require('../../../../assets/images/onboarding.png')} resizeMode={'contain'}/>
                </View>
                <View style={[style.contents]}>
                    <View style={[style.iconGroup]}>
                        <Image source={require('../../../../assets/icons/twitter.png')}/>
                        <Image source={require('../../../../assets/icons/instagram.png')} />
                        <Image source={require('../../../../assets/icons/facebook_logo.png')} />
                    </View>
                    <View style={[style.alignCenter]}>
                        <View style={style.separator} />
                        <Text style={[style.textstyles]}>
                            Poolcoop
                        </Text>
                    </View>
                </View>
                <View style={[style.buttons]}>
                    <Text style={[style.link, {backgroundColor: '#fff'}]} onPress={() => this.props.navigation.navigate('SignUp')}>Sign Up</Text>
                    <Text style={[style.link, {backgroundColor: '#138516'}]} onPress={() => this.props.navigation.navigate('Dashboard')}>Sign In</Text>
                </View>
            </View>
        ); 
    }
}