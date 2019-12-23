import { Platform } from 'react-native';

let environment = 'dev';

const generateEnvVariables = () => {
    if (environment === 'dev'){
        return {
            baseUrl:'http://137.117.211.230:8000',
            otehrUrl: 'http://137.117.211.230:8080'
        }
    } else {
        return {
            baseUrl:'http://137.117.211.230:8000',
            otehrUrl: 'http://137.117.211.230:8080'
        }
    }
}

export default  generateEnvVariables;

