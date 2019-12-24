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
        width:scale(430),
        height: scale(430),
        borderRadius:scale(215),
        backgroundColor: '#fff',
        position: 'absolute',
        // left: -38,
        alignSelf:'center'
        // top: scale(10)
    }
});
