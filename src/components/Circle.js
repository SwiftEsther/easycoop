import React, {Component} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { scale } from "../helpers/scale";

const deviceWidth = Dimensions.get('window').width;

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
        width: scale(420),
        height: scale(420),
        borderRadius:scale(210),
        backgroundColor: '#fff',
        position: 'relative',
        // left: -38,
        top: scale(0)
    }
});
