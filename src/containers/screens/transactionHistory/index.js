import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, Dimensions } from 'react-native';
import style from "./style"
import {Icon} from 'react-native-elements';
import theme from '../../../../assets/styles/globalStyles';
// import * as colors from '../../../../assets/styles/colors';
import { scale, scaleHeight } from '../../../helpers/scale';
import { SafeAreaView } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Contributions from '../../screens/Contribution/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoansTile from '../../../components/LoansTile';
import WithdrawTile from '../../../components/WithdrawTile';
import SavingsTile from '../../../components/SavingsTile';


export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "l"
        }
    }

    changeState = (value) => {
        this.setState(value);
    }

    render() {
        return(
            <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <View style={[style.container]}>
                    <TouchableOpacity onPress={() => this.changeState({selected:"l"})}>
                        <View style={[style.tabs]}>
                            <Text style={{fontWeight: (this.state.selected === "l") ? "bold": "100"}}>Loan</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeState({selected:"w"})}>
                        <View style={[style.tabs]}>
                            <Text style={{fontWeight: (this.state.selected === "w") ? "bold": "100"}}>Withdrawals</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeState({selected:"s"})}>
                        <View style={{paddingRight: 30, padding: 10, paddingLeft: 30}}>
                            <Text style={{fontWeight: (this.state.selected === "s") ? "bold": "100"}}>Savings</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <KeyboardAwareScrollView>
                    {this.state.selected === "l" && <View>
                        <View>
                            <LoansTile
                                index="0"
                                visible="false"
                                loanID="AGUUII"
                                approved="false"
                                date="12-12-12"
                                amount="#100,000,000"
                            />
                            <LoansTile
                                index="1"
                                visible=""
                                loanID="AGUUzzzI"
                                approved="true"
                                date="24-12-12"
                                amount="#100,000,000"
                            />
                            <LoansTile
                                index="2"
                                visible=""
                                loanID="AGUrrtrzI"
                                approved="pending"
                                date="24-10-19"
                                amount="#100,000,000"
                            />
                            <LoansTile
                                index="3"
                                visible=""
                                loanID="ATre56we"
                                approved="true"
                                date="25-12-12"
                                amount="#100,000,000"
                            />
                        </View>
                    </View>}
                    {this.state.selected === "w" && <View>
                    <View>
                            <WithdrawTile
                                index="0"
                                visible="false"
                                loanID="AGUUII"
                                approved="false"
                                date="12-12-12"
                                amount="#100,000,000"
                            />
                            <WithdrawTile
                                index="1"
                                visible=""
                                loanID="AGUUzzzI"
                                approved="true"
                                date="24-12-12"
                                amount="#100,000,000"
                            />
                            <WithdrawTile
                                index="2"
                                visible=""
                                loanID="AGUrrtrzI"
                                approved="true"
                                date="24-10-19"
                                amount="#100,000,000"
                            />
                            <WithdrawTile
                                index="3"
                                visible=""
                                loanID="ATre56we"
                                approved="pending"
                                date="25-12-12"
                                amount="#100,000,000"
                            />
                        </View>
                    </View>}
                    {this.state.selected === "s" && <View>
                    <View>
                        <SavingsTile
                            index="0"
                            savingID="AGUUII"
                            date="12-12-12"
                            amount="#100,000,000"
                        />
                        <SavingsTile
                            index="1"
                            savingID="AGUUzzzI"
                            date="24-12-12"
                            amount="#100,000,000"
                        />
                        <SavingsTile
                            index="2"
                            savingID="AGUrrtrzI"
                            date="24-10-19"
                            amount="#100,000,000"
                        />
                        <SavingsTile
                            index="3"
                            savingID="ATre56we"
                            date="25-12-12"
                            amount="#100,000,000"
                        />
                        </View>
                    </View>}
                </KeyboardAwareScrollView>
            </SafeAreaView>
            </>
        );
    }
}