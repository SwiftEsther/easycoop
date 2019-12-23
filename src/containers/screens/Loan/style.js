import { Dimensions, Platform, StyleSheet } from 'react-native'
import * as colors from '../../../lib/constants/colors';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    tabStyle: {
        backgroundColor: '#FCFCFC',
        width: deviceWidth,
        color: '#FBFBFB',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    leftTabStyle: {
        backgroundColor: 'yellow',
        borderRightColor: '#FCFCFC',
        borderRightWidth: 2
    },
    container2: {
        backgroundColor: "#FFFFFF", //EFF1F5
        margin: 20,
        padding: 20,
        borderRadius: 5
    },
    container1: {
        backgroundColor: "#F3F5F9", //EFF1F5
        flexDirection: "column",
        height: deviceHeight
    },
    picker: {
        margin: (Platform.OS === 'ios') ? -20 : 5
    },
    amount: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 20
    },
    amountText: {
        color: '#9F9F9F', 
        fontSize: 15,
        marginBottom: 10
    },
    price: {
        color: "black",
        fontWeight: "bold",
        fontSize: 18
    }
});