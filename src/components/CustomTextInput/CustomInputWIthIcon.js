import React from "react";
import PropTypes from "prop-types";
import {
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Image
} from "react-native";
import { systemWeights } from "react-native-typography";
import {scale, scaleHeight} from "../../helpers/scale";

import BaseInput from "./BaseInput";

export default class CustomInputWithIcon extends BaseInput {
  static propTypes = {
    height: PropTypes.number,
    /*
     * active border height
     */
    borderWidth: PropTypes.number,
    inputPadding: PropTypes.number
  };

  static defaultProps = {
    height: 50,
    inputPadding: 10
  };
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: "#fdfdfd",
      borderWidth: StyleSheet.hairlineWidth,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0
    };
  }

  _onFocus() {
    this.setState({
      backgroundColor: "#fff",
      borderWidth: 0,
      shadowColor: "rgba(141, 141, 141, 0.23)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.8,
      shadowRadius: 30,
      elevation: 1
    });
  }

  _onBlur() {
    this.setState({
      backgroundColor: "#fdfdfd",
      borderWidth: StyleSheet.hairlineWidth,
      shadowColor: "#fff",
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0
    });
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
            flexDirection: "row-reverse",
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            backgroundColor: this.props.disabled
              ? "#d0d0d0"
              : this.state.backgroundColor,
            borderWidth: this.state.borderWidth,
            shadowColor: this.state.shadowColor,
            shadowOffset: {
              width: this.state.shadowOffset.width,
              height: this.state.shadowOffset.height
            },
            shadowOpacity: this.state.shadowOpacity,
            shadowRadius: this.state.shadowRadius,
            elevation: this.state.elevation
          }
        ]}
        onLayout={this._onLayout}
      >
        {/* <TextInput
          ref={this.input}
          {...this.props}
          style={[
            styles.textInput,
            {
              width,
              height: inputHeight,
              paddingTop: inputPadding / 2,
              padding: inputPadding
            }
          ]}
          value={value}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
          underlineColorAndroid={"transparent"}
          maxLength={maxLength}
        /> */}
        <Image
          source={require("../../../assets/icons/ic_lock_24px.png")}
          style={{ margin: 10 }}
        />
        <TextInput
          ref={this.input}
          {...this.props}
          style={[
            styles.textInput,
            {
              flex: 1,
              width,
              height: inputHeight,
              paddingTop: inputPadding / 2,
              padding: inputPadding
            }
          ]}
          value={value}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
          underlineColorAndroid={"transparent"}
          maxLength={maxLength}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#868686"
  },
  textInput: { color: "#9f9f9f", fontFamily: "nunito-regular" }
});
