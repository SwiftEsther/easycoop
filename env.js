import { Platform } from 'react-native';

let environment = 'dev';

const generateEnvVariables = () => {
    if (environment === 'dev'){
        return {
            credentials:'http://137.117.211.230:8000',
            cooperative: 'http://137.117.211.230:8080',
            account: 'http://137.117.211.230:8001',
            loan: 'http://137.117.211.230:8004',
            api: 'http://137.117.211.230:8007',
        }
    } else {
        return {
            credentials:'http://137.117.211.230:8000',
            cooperative: 'http://137.117.211.230:8080',
            account: 'http://137.117.211.230:8001',
            loan: 'http://137.117.211.230:8004',
            api: 'http://137.117.211.230:8007',
        }
    }
}

export default  generateEnvVariables;

