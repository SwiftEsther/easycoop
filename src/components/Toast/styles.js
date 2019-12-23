import { StyleSheet } from "react-native";
import { scale } from "../../lib/utils/scaleUtils";


const styles = StyleSheet.create({
    container: {
        backgroundColor:'red',
        position:'absolute',
        zIndex:99999,
        top:scale(25),
        // width:'100%',
        marginHorizontal:scale(20),
        borderRadius:scale(10),
        paddingVertical:10,
        paddingLeft:20,
        paddingRight:10,
        minHeight:scale(50),
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf: 'center',
        flexDirection: 'row',
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: {
            width: 0,
            height: scale(2)
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 2

    },
    text:{
        fontSize: scale(15),
        letterSpacing: scale(-0.3),
        color: 'white',
        fontFamily: 'nunito-medium',
        maxWidth: scale(300)
    },
    success:{
        backgroundColor: "#35a24e"
    },
    error:{
        backgroundColor: "#E74E60"
    },
    notice:{
        backgroundColor:'#000',
        opacity:0.85
    }
})

export default styles
