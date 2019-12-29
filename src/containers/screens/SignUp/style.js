import {StyleSheet} from 'react-native';
import { scale } from "../../../helpers/scale";

export default StyleSheet.create({
    headerContainer: {
        marginRight: 50,
        marginLeft: 25,
        marginTop: 25
    },
    sign_up_header: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center', 
        marginBottom: 40,
    },
    sign_up_header_text: {
        fontSize:30,
        paddingBottom:10,
        width: 250
    },
    pickerStlye: {
        color: '#9f9f9f',
        borderColor: '#d0d0d0',
        backgroundColor: 'rgba(0, 13, 55, 0.02)',
    },
    button: {
        margin: 10
    },
    selectText:{
        fontFamily:'nunito-medium',
        fontSize: scale(15),
        color:'#9f9f9f'

    }
});