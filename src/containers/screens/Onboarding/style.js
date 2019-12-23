import { Dimensions, Platform, StyleSheet } from 'react-native'
import * as colors from '../../../lib/constants/colors';
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
        flex: 8,
    },
    imageStyles: {
        // width: scale(deviceWidth),
        position: 'absolute',
        height: scale(420),
        // top: scale(-210),
    },
    iconGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width:scale(150),
        alignSelf :'center'
        // marginRight: scale(140),
        // marginLeft: scale(140)
    },
    separator: {
        width: scale(90),
        marginTop: scale(20),
        marginVertical: scale(10),
        borderBottomColor: '#737373',
        borderBottomWidth: 1,
    },
    textstyles: {
        // ...systemWeights.bold,
        fontSize: 15,
        fontFamily:'nunito-bold'

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
        paddingTop: scale(20),
        fontFamily:'nunito-bold'
    },
    contents: {
        flex: 2
    }
});