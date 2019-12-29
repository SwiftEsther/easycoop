import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    Container: {
        flexDirection: "column",
        marginBottom: 20
    },
    header: {
        backgroundColor: "#F0F0F0",
        padding: 25,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    fieldContainer: {
        padding: 20
    },
    field: {
        marginBottom: 20
    },
    Input: {
        padding: 10,
        marginTop: 15,
        width: "90%",
        backgroundColor: "#F8F8F9",
        borderWidth: 2,
        borderColor: "#D0D0D0",
    },
    calender: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 100
    }
});