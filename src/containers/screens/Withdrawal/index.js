import React, {Component} from 'react';
import {Text, View} from 'react-native';
import WithdrawalRequest from './WithdrawalRequest';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            withdraw: false
        }
    }

    showWithdrawalRequest = () => {
        this.setState({withdraw: !this.state.withdraw})
    }

    render() {
        return (
            <>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Text onPress={this.showWithdrawalRequest}>Withdrawal</Text>
            </View>
            <WithdrawalRequest visible={this.state.withdraw} _toggleView={this.showWithdrawalRequest}/>
            </>
        )
    }
}