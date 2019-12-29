import {StyleSheet} from 'react-native';

import {scale, scaleHeight} from '../../../helpers/scale';
export default StyleSheet.create({
    Container: {
        flexDirection: "column",
        marginBottom: 20
    },
    fieldContainer: {
        padding: 20,
        marginBottom: scaleHeight(49)
    },
    calender: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 100
    },
    pageheader: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: scale(18),
        paddingVertical: scaleHeight(18),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        alignSelf: 'flex-end',
        marginRight: scale(30)
    },
    input: {
        marginBottom: scaleHeight(12),
        // marginRight: scale(40)
    },
    label: {
        fontFamily: 'nunito-bold',
        marginVertical: scaleHeight(16)
    },
    selectText:{
        fontFamily:'nunito-medium',
        fontSize: scale(15),
        color:'#9f9f9f'

    }
});