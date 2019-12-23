import React from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Image
} from 'react-native';
import { systemWeights } from 'react-native-typography';

import BaseInput from './BaseInput';
import { scale } from "../../helpers/scale";

export default class CustomInputWithIcon extends BaseInput {
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
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 3.84,
            elevation: 24
        });
    }

    _onBlur() {
        this.setState({
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
        })
    }

    render() {
        const {
            style: containerStyle,
            height: inputHeight,
            inputPadding,
            inputStyle,
            ImageComponent
        } = this.props;
        const { width, value } = this.state;

        return (
            <View
                style={[
                styles.container,
                containerStyle,
                {
                    height: inputHeight + inputPadding,
                    borderWidth: this.state.borderWidth,
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
                            backgroundColor: this.state.backgroundColor,
                            shadowColor: this.state.shadowColor,
                            shadowOffset: {
                                width: this.state.shadowOffset.width,
                                height: this.state.shadowOffset.height,
                            },
                            shadowOpacity: this.state.shadowOpacity,
                            shadowRadius: this.state.shadowRadius,
                            elevation: this.state.elevation
                        },
                    ]}
                    value={value}
                    onBlur={this._onBlur}
                    onChange={this._onChange}
                    onFocus={this._onFocus}
                    underlineColorAndroid={'transparent'}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    textInput: {
        ...systemWeights.regular,
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingLeft: 12,
        color: '#121212',
        fontSize: 16,
    },  
    SectionStyle: {
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: scale(1),
        borderColor: '#868686',
    },
    image_icon: {
        padding: 2,
        margin: 10,
    },
});
