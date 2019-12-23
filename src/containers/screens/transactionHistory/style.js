import { Dimensions, Platform, StyleSheet } from 'react-native'
// import * as colors from '../../../../assets/styles/Colors';
import { systemWeights } from 'react-native-typography';
import { scale } from '../../../helpers/scale';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        width: "100%",
        flexDirection:"row",
        padding: 5,
        backgroundColor: "#FBFBFB",
        justifyContent: "space-between"
    },
    tabs: {
        borderWidth: 2,
        borderColor: "#FBFBFB",
        borderRightColor: "#7E7E7E",
        paddingRight: 30,
        padding: 10,
        paddingLeft: 30
    }
});