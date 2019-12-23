import {resetPassword} from '../../../lib/api/url';
import {apiRequest} from '../../../lib/api/api';

export class RecoverPasswordService {
    constructor() {
        this.apirequest = new apiRequest();
    }

    recoverPassword=(body)=>{
        return this.apirequest.post(`${resetPassword}`, body);
    }
}
