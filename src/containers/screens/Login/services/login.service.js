import {logIn} from '../../../../lib/api/url';
import {apiRequest} from '../../../../lib/api/api';

export class LoginService {
    constructor() {
        this.apirequest = new apiRequest();
    }

    LogIn=(extraHeaders)=>{
        console.log('Inside Login')
        return this.apirequest.get(`${logIn}`, extraHeaders);
    }
}
