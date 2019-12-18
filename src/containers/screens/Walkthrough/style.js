import { Dimensions, Platform, StyleSheet } from 'react-native'
import * as colors from '../../../../assets/styles/colors';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    text: {
        fontSize: 20,
        color: '#000',
        backgroundColor: '#fff',
        lineHeight: 27,
        bottom: 10,
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 340,
    },
    container: {
        // marginTop: 10,
        justifyContent: 'space-between',
        height: deviceHeight,
        width: deviceWidth
    }
});