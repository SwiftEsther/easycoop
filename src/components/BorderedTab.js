import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import theme from '../../assets/styles/globalStyles';
import { systemWeights } from 'react-native-typography';
import * as colors from '../lib/constants/colors';
import { scaleHeight, scale } from '../helpers/scale';
 
export default class BorderedTabs extends Component {

   constructor(props) {
      super(props);
   } 

   render() {
      return (
        <View style={[style.container, { flex: 1}]}>
          {this.props.tabNumber === 2 && (
            <View
              style={[
                style.buttons,
                { justifyContent: "center" }
              ]}
            >
              <View style={{flex:1}}>
                <Text
                  style={[
                    style.link,
                    style.primary,
                    this.props.selected === "1" && {
                      borderBottomColor: "#138516",
                      borderBottomWidth: 5,
                      color: "#000",
                      fontFamily: "nunito-bold"
                    }
                  ]}
                  onPress={this.props.tab1Event}
                >
                  {this.props.tab1Text}
                </Text>
              </View>
              <View style={[style.separator]}></View>
              <View style={{flex:2, flexDirection: 'row', position: "relative"}}>
                <Text
                  style={[
                    style.link,
                    style.secondary,
                    this.props.selected === "2" && {
                      borderBottomColor: "#138516",
                      borderBottomWidth: 5,
                      color: "#000",
                      fontFamily: "nunito-bold", 
                    },
                    {
                      paddingHorizontal:scale(38.5)
                    }
                  ]}
                  onPress={this.props.tab2Event}
                >
                  {this.props.tab2Text}
                </Text>
                {this.props.notificationsCount > 0 && <View style={[style.badge,this.props.selected === "2" && {top:scale(2)}]}>
                               <Text
                                 style={{
                                   textAlign: "center",
                                   justifyContent: "center",
                                   color: "white",
                                   fontSize: scale(8),
                                   fontFamily: "nunito-bold",
                                 }}
                               >
                                 {this.props.notificationsCount}
                               </Text>
                               </View>}
              </View>
            </View>
          )}
          {this.props.tabNumber === 3 && (
            <View
              style={[
                style.buttons,
                { justifyContent: "center", display: this.props.buttonTabStyle }
              ]}
            >
              <View style={[style.buttonChild]}>
                <Text
                  style={[
                    style.link,
                    style.primary,
                    this.props.selected === "1" && {
                      borderBottomColor: "#138516",
                      borderBottomWidth: 5,
                      color: "#000",
                      fontFamily: "nunito-bold"
                    }
                  ]}
                  onPress={this.props.tab1Event}
                >
                  {this.props.tab1Text}
                </Text>
              </View>
              <View style={[style.separator]}></View>
              <View style={[style.buttonChild]}>
                <Text
                  style={[
                    style.link,
                    style.secondary,
                    this.props.selected === "2" && {
                      borderBottomColor: "#138516",
                      borderBottomWidth: 5,
                      color: "#000",
                      fontFamily: "nunito-bold"
                    }
                  ]}
                  onPress={this.props.tab2Event}
                >
                  {this.props.tab2Text}
                </Text>
              </View>
              <View style={[style.separator]}></View>
              <View style={[style.buttonChild]}>
                <Text
                  style={[
                    style.link,
                    style.secondary,
                    this.props.selected === "3" && {
                      borderBottomColor: "#138516",
                      borderBottomWidth: 5,
                      color: "#000",
                      fontFamily: "nunito-bold"
                    }
                  ]}
                  onPress={this.props.tab3Event}
                >
                  {this.props.tab3Text}
                </Text>
              </View>
            </View>
          )}
        </View>

        //     <View style={[style.container, {flex:1}]}>

        //     </View>

        // <View style={[this.props.tabStyle , {justifyContent: 'center', marginTop: 40, display: (this.props.buttonTabStyle == "none") ? "flex" : "none"}]}>
        //     <View>
        //         <Text style={[style.link, style.primary,(this.props.selected === "1" && this.props.leftTabStyle)]} onPress={this.props.tab1Event}>{this.props.tab1Text}</Text>
        //     </View>
        //     <View>
        //         <Text style={[style.link,style.secondary, (this.props.selected === "2" && this.props.rightTabStyle)]} onPress={this.props.tab2Event}>{this.props.tab2Text}</Text>
        //     </View>
        // </View>
      );
   }
}

const {width, height} = Dimensions.get('window');
const style = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#fcfcfc"
  },
  link: {
    backgroundColor: "#fcfcfc",
    color: "#9f9f9f",
    fontFamily: "nunito-medium",
    textAlign: "center",
    paddingTop: scaleHeight(18),
    paddingBottom: scaleHeight(9)
  },
  buttonChild: {
    flex: 1
  },
  separator: {
    backgroundColor: "red",
    borderRightColor: "#bdbdbd",
    borderRightWidth: 1,
    height: scaleHeight(26),
    alignSelf: "center"
  },
  container: {
    shadowColor: "#fff",
    borderWidth: 0,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: scale(4)
  },
  badge: {
    width: scale(14),
    height: scale(14),
    backgroundColor: "#138516",
    borderRadius: scale(7),
    textAlign: "center",
    justifyContent: "center",
    color: "white",
    alignSelf: "center",
    zIndex: 99999,
    left: scale(-30),
    top: scale(5)
  }
});
