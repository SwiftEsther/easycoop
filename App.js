import React from 'react';
import { Platform, StatusBar, View, Text, StyleSheet } from 'react-native';

import AppNavigation from './src/navigation/AppNavigation';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

import { createStore, applyMiddleware } from 'redux';
import * as Icon from '@expo/vector-icons'

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './src/redux/reducers/index';
import {
    persistStore,
    persistReducer,
} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/lib/integration/react';
// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // storage: storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    // applyMiddleware(logger),
    applyMiddleware(thunk)
);
const persistor = persistStore(store);

export default class App extends React.Component {

    state = {
        isLoadingComplete: false,
    };

    constructor(properties) {
        super(properties);

    }

    render() {
        if (!this.state.isLoadingComplete) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <View style={styles.container}>
                    <PersistGate persistor={persistor}>
                        <Provider store={store}>
                            <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                            <AppNavigation/>
                        </Provider>
                    </PersistGate>
                </View>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Font.loadAsync({
                ...Icon.Ionicons.font,
                ...Icon.SimpleLineIcons.font,
                'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
                'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
            }),
            Asset.loadAsync([
                require('./assets/images/splash.png'),
                require('./assets/images/onboarding.png'),
                require('./assets/images/Walkthrough_1.png'),
                require('./assets/images/Walkthrough_2.png'),
                require('./assets/images/Walkthrough_3.png'),
            ]),
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f6fa'
    },
});
