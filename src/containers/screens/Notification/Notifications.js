import React from "react";
import {
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    AsyncStorage, StyleSheet, Image, Dimensions, RefreshControl, StatusBar
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Header from '../../../components/Header';


import TouchItem from '../../../components/TouchItem/_TouchItem';
import * as Colors from '../../../lib/constants/colors';

import { SafeAreaView, withNavigationFocus } from "react-navigation";

import { scale } from "../../../helpers/scale";


class Notifications extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {};

    componentDidMount() {
        // Calling clearOneSignalNotifications
        // OneSignal.clearOneSignalNotifications();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused && !this.props.isFocused) {
            // this.setState(
            //     {
            //         loanHistory: [...this.props.loanHistory]
            //     }
            // )
        }

        if (!prevProps.isFocused && this.props.isFocused) {
            // this.setState(
            //     {
            //         loanHistory: [...this.props.loanHistory]
            //     }
            // )
        }
    }


    render() {
        const {goBack} = this.props.navigation;
        // let notifications = this.props.notifications
        let notifications = []
        console.log(notifications)

        return (
            <View style={{
                flex: 1,
                width: '100%',
                backgroundColor: 'red'
            }}>
                <StatusBar backgroundColor={Colors.white} barStyle="dark-content"/>
                <SafeAreaView>
                    <Header navigation={{...this.props.navigation}}/>
                    {notifications.map(notification => {
                        console.log(notification)
                        return (
                            <TouchItem style={notification.read ? styles.listItem : styles.listItemUnread}
                                       onPress={() => {
                                           this.props.navigation.navigate('NotificationDetails', {
                                               notification
                                           })
                                       }}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                                    <Text style={styles.title}>{notification.title}</Text>
                                    <Text style={styles.date}>{moment(notification.id).format('DD/MM/YYYY')}</Text>
                                </View>
                                <Text style={styles.itemTitle} numberOfLines={2}>{notification.body}</Text>

                            </TouchItem>
                        )
                    })}

                </SafeAreaView>


            </View>

        );
    }

    openModal = (transaction) => {
        this.setState({
            showModal: true,
            transactionDetails: transaction,
        })
    }
    closeModal = () => {
        this.setState({
            showModal: false,
            transactionDetails: null
        })
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.authentication,
        notifications: [],
        loading: false,
    };
};

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withNavigationFocus(Notifications));

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingBottom: scale(70),
        width: '100%',
        minHeight: Dimensions.get('window').height
    },

    //
    listItem: {
        minHeight: scale(70),
        borderBottomColor: '#979797',
        borderBottomWidth: 1,
        width: '100%',
        paddingHorizontal: scale(13),
        paddingVertical: scale(8),
    },
    listItemUnread: {
        minHeight: scale(70),
        borderBottomColor: '#979797',
        borderBottomWidth: 1,
        width: '100%',
        paddingHorizontal: scale(13),
        paddingVertical: scale(8),
        borderLeftColor: Colors.red,
        borderLeftWidth: 5
    },
    itemTitle: {
        color: Colors.lightGreyText,
        fontFamily: 'AvenirLTStd-Light',
        marginTop: scale(10),
        fontSize: scale(12)
    },
    title: {
        color: Colors.lightGreyText,
        fontFamily: 'AvenirLTStd-Heavy',
        fontSize: scale(19)
    },
    amountTitle: {
        color: Colors.lightGreyText,
        fontFamily: 'AvenirLTStd-Book',
        fontSize: scale(13)
    },
    date: {
        color: Colors.lightGreyText,
        fontFamily: 'AvenirLTStd-Medium',
        fontSize: scale(11)
    },
    otherAmount: {
        color: Colors.lightGreyText,
        fontFamily: 'AvenirLTStd-Book',
        fontSize: scale(15)
    },
    Pending: {
        backgroundColor: '#F5A623',
        width: scale(10),
        height: scale(10),
        borderRadius: scale(2),
        marginRight: scale(9)
    },
    Declined: {
        backgroundColor: '#F66565',
        width: scale(10),
        height: scale(10),
        borderRadius: scale(2),
        marginRight: scale(9)
    },
    modalTitle: {
        color: '#00425F',
        fontSize: scale(16),
        textAlign: 'left',
        fontWeight: '400',
        letterSpacing: -0.3,
        fontFamily: 'AvenirLTStd-Book'
    },

});
