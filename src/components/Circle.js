import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';

export default class Circle extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return ( 
            <View style={styles.circle} /> 
        ) 
    }
}

const styles = StyleSheet.create({
    circle: { 
        width: 500, 
        height: 500, 
        borderRadius: 500/2, 
        backgroundColor: '#fff',
        position: 'relative',
        left: -38,
        top: -55
    }
});
