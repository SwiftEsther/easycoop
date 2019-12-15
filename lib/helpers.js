import { Alert, Platform, AsyncStorage } from 'react-native';
import * as colors from '../assets/styles/colors';
// import Snackbar from 'react-native-snackbar'; Error

alertDuration = 700;

if(Platform.OS === "android"){
    alertDuration = 100;
}

setGlobalState = async (key, value) => {
    await AsyncStorage.setItem(key, value);
};

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

global.Alert = (text) => {
    setTimeout(() => {
        Alert.alert("", text, [{text: "OK"}], {cancelable: true} );
    }, alertDuration);
};