import { Dimensions, Platform, StyleSheet } from 'react-native'
import * as colors from '../../../../assets/styles/colors';
import { scale } from '../../../helpers/scale';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    text: {
        fontSize: scale(20),
        color: '#000',
        lineHeight: scale(27),
        marginTop: scale(-65),
        paddingVertical: scale(5),
        marginBottom: scale(50),
    },
    image: {
        width: scale(299),
        height: scale(525),
    },
    container: {
        width: scale(deviceWidth),
        height: scale(deviceHeight),
        justifyContent: 'center',
        flex: 1,
    },
    arrow_btn:{
        alignItems: 'center', 
        flex: 2,
        position: 'absolute',
        bottom: scale(-5),
        left: scale(120),
    },
    pagination: {
        flex: 1,
        alignSelf: 'stretch',
        position: 'absolute',
        bottom: scale(70),
        left: scale(125)
    }
});