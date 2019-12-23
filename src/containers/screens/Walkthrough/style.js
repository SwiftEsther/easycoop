import { Dimensions, Platform, StyleSheet } from 'react-native'
import * as colors from '../../../lib/constants/colors';
import { scale, scaleHeight } from '../../../helpers/scale';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    text: {
        fontSize: 20,
        fontFamily:'nunito-bold',
        color: '#000',
        // lineHeight: scaleHeight(27),
        // marginTop: scale(11),
        paddingVertical: scaleHeight(5),
        // marginBottom: scaleHeight(30),
    },
    image: {
        width: scale(299),
        height: scaleHeight(400)
    },
    container: {
        width: deviceWidth,
        // height: deviceHeight,
        justifyContent: 'center',
        // flex: 1,
    },
    arrow_btn:{
        alignItems: 'center', 
        flex: 2,
        // position: 'absolute',
        // bottom: scaleHeight(10),
        // left: scale(120),
    },
    pagination: {
        // flex: 1,
        alignSelf: 'stretch',
        // position: 'absolute',
        // bottom: scaleHeight(90),
        // left: scale(125),
        width:'100%'
    }
});