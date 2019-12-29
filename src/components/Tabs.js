import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import theme from '../../assets/styles/globalStyles';
import { systemWeights } from 'react-native-typography';
import * as colors from '../lib/constants/colors';
import { scaleHeight, scale } from '../helpers/scale';
 
export default class Tabs extends Component {

   constructor(props) {
      super(props);
   }

   render() {
      return (
            <View style={[style.container, {flex:1}]}>
                <View style={[style.buttons, {justifyContent: 'center', display:this.props.buttonTabStyle}]}>
                    <View style={[style.buttonChild]}>
                        <Text style={[style.link,style.primary,(this.props.selected === "1" && {backgroundColor: '#138516', color: '#fff'})]} onPress={this.props.tab1Event}>{this.props.tab1Text}</Text>
                    </View>
                    <View style={[style.buttonChild]}>
                        <Text style={[style.link,style.secondary, (this.props.selected === "2" && {backgroundColor: '#138516', color: '#fff'})]} onPress={this.props.tab2Event}>{this.props.tab2Text}</Text>
                    </View>
                </View>
            </View>
        
        // <View style={[this.props.tabStyle , {justifyContent: 'center', marginTop: 40, display: (this.props.buttonTabStyle == "none") ? "flex" : "none"}]}>
        //     <View>
        //         <Text style={[style.link, style.primary,(this.props.selected === "1" && this.props.leftTabStyle)]} onPress={this.props.tab1Event}>{this.props.tab1Text}</Text>
        //     </View>
        //     <View>
        //         <Text style={[style.link,style.secondary, (this.props.selected === "2" && this.props.rightTabStyle)]} onPress={this.props.tab2Event}>{this.props.tab2Text}</Text>
        //     </View>
        // </View>
      )
   }
}

const {width, height} = Dimensions.get('window');
const style = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    link: {
        fontSize: 15,
        ...systemWeights.bold,
        paddingVertical: scaleHeight(16),
        marginBottom: scaleHeight(28),
        backgroundColor: '#e8e7e7',
        color: '#707070',
        textAlign: 'center'
    },
    buttonChild: {
        flex: 1
    },
    container: {
        marginHorizontal: scale(30),
    }
});
