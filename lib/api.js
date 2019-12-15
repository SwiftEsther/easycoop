import './helpers';
import * as constants from './constants';
import Config from 'react-native-config';

if(BASE_URL === '') {
    BASE_URL = Config.BASE_URL;
}

export default class API {
    static async getCall(url, passQToken=false) {

        let status = null;
        let res = {};

        await fetch(BASE_URL + url, {
            method: 'GET',
            headers: new Headers()
        })
        .then((response) => {
            status = response.status;
            return response.json();
        })
        .then(function(myJson) {
            res = JSON.stringify(myJson);
        })
        .catch((error) => {
            if(status !== 204)
                Alert(constants.UNKNOWN_ERROR_MESSAGE);
            console.log(error);
        }); 

        let data = {};
        try { data = JSON.parse(res); } catch(e) {}

        return data;
    }

    static async postCall(url, postData, passQToken=false) {

        let status = null;
        let res = {};

        await fetch(BASE_URL + url, {
            method: 'POST',
            headers: new Headers(),
            body: postData,
        })
        .then((response) => {
            status = response.status;
            return response.json();
        })   
        .then(function(myJson) {
            res = JSON.stringify(myJson);
        })
        .catch((error) => {
            if(status !== 204)
                Alert(constants.UNKNOWN_ERROR_MESSAGE);
        }); 

        let data = {};
        try { data = JSON.parse(res); } catch(e) {}

        return data;
    }
}