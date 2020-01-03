import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, StatusBar} from 'react-native';
import Constants from 'expo-constants';
import { Colors } from "../../lib/constants/colors";
import { scale } from "../../helpers/scale";

class StatusBarBackground extends Component{
    render(){
        return(
            <View style={styles.statusBarBackground}>
                <StatusBar
                    backgroundColor={Colors.darkBlue}
                    barStyle="dark-content"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statusBarBackground:{
        height: Platform.OS === 'ios'?Constants.statusBarHeight:scale(24),
        backgroundColor: Colors.white,
    }

})

export default StatusBarBackground
