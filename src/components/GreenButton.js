import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import theme from '../../assets/styles/globalStyles';
import * as colors from '../lib/constants/colors';
import {scale} from '../helpers/scale.js';

export default class GreenButton extends Component {

    constructor(props) {
      super(props);
    }

    render() {
        return (
          <View>
                <TouchableOpacity activeOpacity={0.7} style={{ alignSelf: 'stretch'}} onPress={this.props.handlePress}>
                    <Text style={[styles.defaultButton, {backgroundColor: '#138516', fontFamily: 'nunito-bold'}]}>{this.props.button_text}</Text>
                </TouchableOpacity>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    defaultButton: {
        fontFamily: 'nunito-bold' ,
        padding: 18,
        color: '#fff',
        borderRadius:3,
        textAlign: 'center',
        fontSize: 17
    }
})
