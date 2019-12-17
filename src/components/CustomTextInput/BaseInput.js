import { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import { Text, View, ViewPropTypes } from 'react-native';

export default class BaseInput extends Component {
    static propTypes = {
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        style: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
        inputStyle: Text.propTypes.style,

        editable: PropTypes.bool,

        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        onChange: PropTypes.func,
    };

    constructor(props, context) {
        super(props, context);

        this.input = createRef();
        this._onLayout = this._onLayout.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this.focus = this.focus.bind(this);

        const value = props.value || props.defaultValue;

        this.state = {
            value,
            width: null,
        };
    }

    componentWillReceiveProps(newProps) {
        const newValue = newProps.value;
        if (newProps.hasOwnProperty('value') && newValue !== this.state.value) {
            this.setState({
                value: newValue,
            });
        }
    }

    _onLayout(event) {
        this.setState({
            width: event.nativeEvent.layout.width,
        });
    }

    _onChange(event) {
        this.setState({
            value: event.nativeEvent.text,
        });

        const onChange = this.props.onChange;
        if (onChange) {
            onChange(event);
        }
    }

    _onBlur() {
        const onBlur = this.props.onBlur;
        if (onBlur) {
            onBlur();
        }
    }

    _onFocus() {
        const onFocus = this.props.onFocus;
        if (onFocus) {
            onFocus();
        }
    }

    // public methods

    inputRef() {
        return this.input.current;
    }

    focus() {
        if (this.props.editable !== false) {
            this.inputRef().focus();
        }
    }

    blur() {
        this.inputRef().blur();
    }

    isFocused() {
        return this.inputRef().isFocused();
    }

    clear() {
        this.inputRef().clear();
    }
}