import { Dimensions, Platform, StyleSheet } from 'react-native'
import * as colors from '../../../../assets/styles/colors';
import { systemWeights } from 'react-native-typography';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f6fa',
        position: 'relative',
        height: deviceHeight,
        width: deviceWidth
    },
    imageStyles: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: deviceWidth,
        left: 0,
        position: 'absolute',
        top: -240,
        resizeMode: 'cover'
    },
    iconGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginRight: 140,
        marginLeft: 140
    },
    separator: {
        width: 80,
        marginTop: 23.5,
        marginBottom: 23.5,
        borderBottomColor: '#737373',
        borderBottomWidth: 1,
    },
    textstyles: {
        ...systemWeights.bold,
        fontSize: 15
    },
    alignCenter: {
        alignItems: 'center', 
        justifyContent: 'center'
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    },
    link: {
        ...systemWeights.bold,
        paddingRight: 80,
        paddingLeft: 80,
        paddingBottom: 25,
        paddingTop: 25
    },
});