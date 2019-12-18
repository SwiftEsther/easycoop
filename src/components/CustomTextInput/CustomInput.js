import React from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import { systemWeights } from 'react-native-typography';

import BaseInput from './BaseInput';

export default class CustomInput extends BaseInput {
    static propTypes = {
        height: PropTypes.number,
        /*
        * active border height
        */
        borderWidth: PropTypes.number,
        inputPadding: PropTypes.number,
    };

    static defaultProps = {
        height: 50,
        inputPadding: 10,
    };
    constructor(props) {
        super(props);

        this.state = {
            backgroundColor: '#fdfdfd',
            borderWidth: StyleSheet.hairlineWidth,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0
        }
    }

    _onFocus() {
        this.setState({
            backgroundColor: '#fff',
            borderWidth: 0,
            shadowColor: "rgba(141, 141, 141, 0.23)",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.8,
            shadowRadius: 30,
            elevation: 1
        });
    }

    _onBlur() {
        this.setState({
            backgroundColor: '#fdfdfd',
            borderWidth: StyleSheet.hairlineWidth,
            shadowColor: "#fff",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0
        })
    }

    render() {
        const {
            style: containerStyle,
            height: inputHeight,
            inputPadding,
            inputStyle,
            maxLength
        } = this.props;
        const { width, value } = this.state;

        return (
            <View
                style={[
                styles.container,
                containerStyle,
                {
                    backgroundColor: this.state.backgroundColor,
                    borderWidth: this.state.borderWidth,
                    shadowColor: this.state.shadowColor,
                    shadowOffset: {
                        width: this.state.shadowOffset.width,
                        height: this.state.shadowOffset.height,
                    },
                    shadowOpacity: this.state.shadowOpacity,
                    shadowRadius: this.state.shadowRadius,
                    elevation: this.state.elevation,
                },
                ]}
                onLayout={this._onLayout}
            >
                <TextInput
                    ref={this.input}
                    {...this.props}
                    style={[
                        styles.textInput,
                        {
                            width,
                            height: inputHeight,
                            paddingTop: inputPadding / 2,
                            padding: inputPadding
                        },
                    ]}
                    value={value}
                    onBlur={this._onBlur}
                    onChange={this._onChange}
                    onFocus={this._onFocus}
                    underlineColorAndroid={'transparent'}
                    maxLength={maxLength}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
    textInput: {
    },
});