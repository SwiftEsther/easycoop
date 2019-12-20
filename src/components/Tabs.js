import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../assets/styles/globalStyles';
import { systemWeights } from 'react-native-typography';
import * as colors from '../../assets/styles/colors';
 
export default class Tabs extends Component {

   constructor(props) {
      super(props);
   }

   render() {
      return (
       <View>
           <View style={[style.buttons, {justifyContent: 'center', marginTop: 40, display:this.props.buttonTabStyle}]}>
           <View>
      <Text style={[style.link,style.primary,(this.props.selected === "1" && {backgroundColor: '#138516'})]} onPress={this.props.tab1Event}>{this.props.tab1Text}</Text>
           </View>
            <View>
                <Text style={[style.link,style.secondary, (this.props.selected === "2" && {backgroundColor: '#138516'})]} onPress={this.props.tab2Event}>{this.props.tab2Text}</Text>
            </View>
        </View>
        <View style={[this.props.tabStyle , {justifyContent: 'center', marginTop: 40, display: (this.props.buttonTabStyle == "none") ? "flex" : "none"}]}>
            <View>
                <Text style={[style.link, style.primary,(this.props.selected === "1" && this.props.leftTabStyle)]} onPress={this.props.tab1Event}>{this.props.tab1Text}</Text>
            </View>
            <View>
                <Text style={[style.link,style.secondary, (this.props.selected === "2" && this.props.rightTabStyle)]} onPress={this.props.tab2Event}>{this.props.tab2Text}</Text>
            </View>
        </View>
       </View>
      )
   }
}

const style = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    link: {
        fontSize: 15,
        ...systemWeights.bold,
        paddingBottom: 16,
        paddingTop: 16,
        marginBottom: 28,
        backgroundColor: '#e8e7e7'
    },
    primary: {
        paddingRight: 38,
        paddingLeft: 38,
    },
    secondary: {
        paddingRight: 44,
        paddingLeft: 44
    },
});
