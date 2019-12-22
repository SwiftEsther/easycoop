import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import theme from '../../assets/styles/globalStyles';
import * as colors from '../../assets/styles/colors';

export default class LoanTile extends Component {

    constructor(props) {
      super(props);
    }

    render() {
        return (
          <View style={[styles.container, {backgroundColor:(this.props.index % 2 === 0)? "#FFFFFF": "#F8F7F7"}]}>
              <View style={[styles.loanDetail]}>
                <View onPress={() => this.props.approveLoan} style={{flexDirection: "column", justifyContent: "space-between"}}>
                    <View style={{flexDirection:"row", marginBottom: 10}}>
                        <Text style={{color: "#575757", fontWeight: "100"}}>Savings: </Text>
                        <Text style={{color: "#575757", fontWeight: "bold"}}>  #{this.props.savingID}</Text>
                    </View>
                    <View>
                        <Text style={{color: "#9F9F9F", fontWeight: "bold"}}>Credited</Text>
                    </View>
                </View>
                <View style={{flexDirection: "column", justifyContent: "space-between", alignItems: "right"}}>
                    <Text>{this.props.date}</Text>
                    <Text style={{fontWeight: "bold"}}>{this.props.amount}</Text>
                </View>
              </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor:(this.props.index % 2 === 0)? "#FFFFFF": "#F8F7F7",
        padding: 20
    },
    loanDetail: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 40
    }
})