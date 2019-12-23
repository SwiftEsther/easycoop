import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import theme from '../../assets/styles/globalStyles';
// import * as colors from '../lib/constants/colors';

export default class BlackButton extends Component {

    constructor(props) {
      super(props);
    }

    render() {
        return (
          <View>
                <TouchableOpacity activeOpacity={0.7} style={[theme.flex1]} onPress={this.props.handlePress}>
                    <Text style={[styles.defaultButton, theme.typo_bold, {backgroundColor: 'black'}]}>{this.props.button_text}</Text>
                </TouchableOpacity>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    defaultButton: {
        fontSize: 17,
        padding: 23,
        color: '#fff',
        borderWidth: StyleSheet.hairlineWidth,
        textAlign: 'center',
        borderWidth: 0.8,  
        marginTop: 10
    }
})