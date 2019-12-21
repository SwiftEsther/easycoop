import { Alert, Platform, AsyncStorage } from 'react-native';
import * as colors from '../assets/styles/colors';
// import Snackbar from 'react-native-snackbar'; Error

alertDuration = 700;

if(Platform.OS === "android"){
    alertDuration = 100;
};

// isValidEmail = (text, blankMessage, invalidMessage, isLast) => {

//     if(text !== "") {
//         let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
//         if(reg.test(text) === false)
//             return invalidMessage + (isLast ? "" : ", ");
//         else return "";
//     }
//     else
//         return blankMessage + (isLast ? "" : ", ");
// };

setGlobalState = async (key, value) => {
    await AsyncStorage.setItem(key, value);
};

// isValidPhone = (text, blankMessage, invalidMessage, isLast) => {

//     if(text !== "") {
//          if(text.length < 7 || isNaN(text))
//             return invalidMessage + (isLast ? "" : ", ");
//         else return "";
//     }
//     else
//         return blankMessage + (isLast ? "" : ", ");
// };

// composeValidationResponse = (error) => {
//     if(error !== "")
//         return "The following field(s) are blank or invalid:\n\n" + (error.endsWith(", ") ? error.substring(0, error.length-2) : error) + ".";
//     else
//         return "";
// };

Toast = (text, sideText) => {

    setTimeout(() => {
        Snackbar.show({
            title: text,
            // duration: Snackbar.LENGTH_LONG,
            action: {
              title: sideText,
              color: '#33c3e0',
              onPress: () => { },
            },
          });
    }, alertDuration);
};  

setGlobalState = async (key, value) => {
    await AsyncStorage.setItem(key, value);
};

global.Alert = (text) => {
    setTimeout(() => {
        Alert.alert("", text, [{text: "OK"}], {cancelable: true} );
    }, alertDuration);
};