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
                <View style={{flexDirection: "column", justifyContent: "space-between"}}>
                    <View style={{flexDirection:"row", marginBottom: 10}}>
                        <Text style={{color: "#575757", fontWeight: "100"}}>Withdrawal ID: </Text>
                        <Text style={{color: "#575757", fontWeight: "bold"}}>  #{this.props.loanID}</Text>
                    </View>
                    {this.props.approved === 'true' && <View>
                        <Text style={{color: "#138516", fontWeight: "bold"}}>Approved</Text>
                    </View>}
                    {this.props.approved === 'false' && <View>
                        <Text style={{color: "red", fontWeight: "bold"}}>Not Approved</Text>
                    </View>}
                    {this.props.approved === 'pending' && <View>
                        <Text style={{color: "#05A4CA", fontWeight: "bold"}}>Pending Approval</Text>
                    </View>}
                </View>
                <View style={{flexDirection: "column", justifyContent: "space-between", alignItems: "right"}}>
                    <Text>{this.props.date}</Text>
                    <Text style={{fontWeight: "bold"}}>{this.props.amount}</Text>
                </View>
              </View>
              <TouchableOpacity style={{display: (this.props.visible)? '': 'none'}} onPress={() => this.props.ViewRequest}>
                    <View style={[styles.button]}>
                        <Text style={{color: "#138516"}}>View Request</Text>
                    </View>
              </TouchableOpacity>
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
    },
    button: {
        borderWidth: 2,
        borderColor: "#138516",
        width: "40%",
        padding: 10
    }
})