import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import theme from '../../assets/styles/globalStyles';
import * as colors from '../../assets/styles/colors';

export default class WhiteButton extends Component {

    constructor(props) {
      super(props);
    }

    render() {
        return (
          <View>
                <TouchableOpacity activeOpacity={0.7} style={[theme.flex1]} onPress={this.props.handlePress}>
                    <Text style={[styles.defaultButton, theme.typo_bold, {backgroundColor: '#fff'}]}>{this.props.button_text}</Text>
                </TouchableOpacity>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    defaultButton: {
        fontSize: 17,
        padding: 18,
        color: '#138516',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius:3,
        borderColor: '#138516',
        textAlign: 'center',
        borderWidth: 0.8,  
    }
})