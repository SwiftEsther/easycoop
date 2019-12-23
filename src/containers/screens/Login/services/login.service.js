import {logIn} from '../../../../lib/api/url';
import {apiRequest} from '../../../../lib/api/api';

export class LoginService {
    constructor() {
        this.apirequest = new apiRequest();
    }

    LogIn=(extraHeaders)=>{
        return this.apirequest.get(`${logIn}`, extraHeaders);
    }
}
