import { Dimensions, Platform, StyleSheet } from 'react-native'
import * as colors from '../../../../assets/styles/colors';
import { systemWeights } from 'react-native-typography';
import { scale } from '../../../helpers/scale';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f6fa',
        position: 'relative',
        height: deviceHeight,
        width: deviceWidth,
        justifyContent: 'space-between'
    },
    imageContainer: {
        alignItems: 'center',
        flex: 7
    },
    imageStyles: {
        width: scale(deviceWidth),
        position: 'absolute',
        top: scale(-210),
    },
    iconGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginRight: scale(140),
        marginLeft: scale(140)
    },
    separator: {
        width: scale(80),
        marginTop: scale(10),
        marginBottom: scale(10),
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
        alignSelf: 'stretch',
        flex: 1
    },
    link: {
        ...systemWeights.bold,
        paddingRight: scale(75),
        paddingLeft: scale(75),
        paddingBottom: scale(20),
        paddingTop: scale(20)
    },
    contents: {
        flex: 1
    }
});