import {resetPassword} from '../../../lib/api/url';
import {apiRequest} from '../../../lib/api/api';

export class RecoverPasswordService {
    constructor() {
        this.apirequest = new apiRequest();
    }

    recoverPassword=()=>{
        return this.apirequest.post(`${resetPassword}`, params);
    }
}
