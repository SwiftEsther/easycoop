import React, {Component} from 'react';
import {View} from 'react-native';

export default class Space extends Component {

    constructor(props) {
      super(props);
    }

    render() {
        return (
          <View style={{height: (this.props.vspace ? this.props.vspace: 0), width: (this.props.hspace ? this.props.hspace: 0) }} />
        );
    }
}
