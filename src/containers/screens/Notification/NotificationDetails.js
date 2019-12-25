import React from "react";
import {
    View,
    ScrollView,
    Text, StyleSheet, Image, Dimensions,
} from "react-native";

import { connect } from "react-redux";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { scale } from "../../lib/utils/scaleUtils";
import Header from '../../components/Header/OtherHeader';
import { editProfile } from "../../lib/api/url";
import { updateUserData } from "../Auth/action/auth_actions";
import TouchItem from '../../components/TouchItem/_TouchItem';
import { Colors } from "../../lib/constants/Colors";
import { withNavigationFocus } from "react-navigation";
import moment from "moment";
import { getAllLoanHistory } from "./action/home_actions";
import OneSignal from "react-native-onesignal";
import { notificationsMarkRead } from "./action/home_actions";


class Notifications extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {};

    componentDidMount() {
        const {getParam} = this.props.navigation;
        let notification = getParam('notification','')
        this.props.notificationsMarkRead(notification);
    }




    render() {
        const {getParam} = this.props.navigation;
        let notification = getParam('notification','')

        return (
            <View>
                <Header title={notification.title} leftIcon={"md-arrow-back"}
                        onPressLeftIcon={() => this.props.navigation.goBack()}/>
                <KeyboardAwareScrollView
                    style={{backgroundColor: "#fff"}}
                    resetScrollToCoords={{x: 0, y: 0}}
                    contentContainerStyle={styles.container}
                    scrollEnabled={true}
                    keyboardShouldPersistTaps={'handled'}
                    enableOnAndroid={true}
                >

                 <View style={styles.listItem}>
                     <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                         <Text style={styles.title}>{notification.title}</Text>
                         <Text style={styles.date}>{moment(notification.id).format('DD/MM/YYYY')}</Text>
                     </View>
                     <Text style={styles.itemTitle}>{notification.body}</Text>
                 </View>


                </KeyboardAwareScrollView>
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
        notifications: state.home.notifications || [],
        loading: state.home.loading || false,
    };
};

const mapDispatchToProps = {
    updateUserData,
    getAllLoanHistory,
    notificationsMarkRead
};

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
        width: '100%',
        paddingHorizontal: scale(13),
        paddingVertical: scale(15),
    },
    itemTitle: {
        color: Colors.lightGreyText,
        fontFamily: 'AvenirLTStd-Light',
        marginTop: scale(10),
        fontSize: scale(15)
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
