import { Platform } from 'react-native';

let environment = 'dev';

const generateEnvVariables = () => {
    if (environment === 'dev'){
        return {
            baseUrl:'https://137.117.211.230:8000',
        }
    } else {
        return {
            
        }
    }
}

export default  generateEnvVariables;
