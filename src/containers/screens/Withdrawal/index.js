import React, {Component} from 'react';
import {Text, View, StatusBar, SafeAreaView} from 'react-native';
import WithdrawalRequest from './WithdrawalRequest';
import theme from '../../../../assets/styles/globalStyles';
import {Colors} from '../../../lib/constants/colors';
import Header from '../../../components/Header';

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
                <StatusBar backgroundColor={Colors.white} barStyle="dark-content"/>
                <SafeAreaView style={[theme.container, {fontFamily: 'nunito-bold'}]}>
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Text onPress={this.showWithdrawalRequest}>Withdrawal</Text>
            </View>
                    <WithdrawalRequest visible={this.state.withdraw} _toggleView={this.showWithdrawalRequest}/>
                    <Header navigation={{...this.props.navigation}}/>
                    {/* <Withdraw visible={this.state.withdraw} _toggleView={()=>this.setState({withdraw: !this.state.withdraw})}/> */}
                </SafeAreaView>
            </>
        );
    }
}