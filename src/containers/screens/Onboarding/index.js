import React, {Component} from 'react';
import {View, Image, Text, StatusBar, TouchableOpacity} from 'react-native';
import theme from '../../../../assets/styles/globalStyles';
import {Colors} from '../../../lib/constants/colors';
import style from './style';
import Circle from '../../../components/Circle';
import TouchItem from "../../../components/TouchItem/_TouchItem";
import { Linking } from 'expo';

export default class Onboarding extends Component {
    constructor(props) {
        super(props);
    }
    openLink = (link) => {
        if(link === 'fb'){
            Linking.openURL('https://www.facebook.com/polcoop/');
        }
    }

    render() {
        return (
            <View style={[style.container]} >
                <StatusBar hidden />
                <View style={[style.imageContainer]}>
                     <Circle />
                    <Image style={[style.imageStyles]} source={require('../../../../assets/images/onboarding.png')} resizeMode={'cover'}/>
                </View>
                <View style={[style.contents]}>
                    <View style={[style.iconGroup]}>
                        <Image source={require('../../../../assets/icons/twitter.png')}/>
                        <Image source={require('../../../../assets/icons/instagram.png')} />
                        <TouchItem onPress={() => this.openLink('fb')}>
                        <Image source={require('../../../../assets/icons/facebook_logo.png')} />
                        </TouchItem>
                    </View>
                    <View style={[style.alignCenter]}>
                        <View style={style.separator} />
                        <Text style={[style.textstyles]}>
                            Poolcoop
                        </Text>
                    </View>
                </View>
                <View style={[style.buttons]}>
                    <Text style={[style.link, {backgroundColor: Colors.white}]} onPress={() => this.props.navigation.navigate('SignUp')}>Sign Up</Text>
                    <Text style={[style.link, {backgroundColor: Colors.primary_green, color: Colors.white}]} onPress={() => this.props.navigation.navigate('Login')}>Sign In</Text>
                </View>
            </View>
        ); 
    }
}