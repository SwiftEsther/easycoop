import {signUp} from '../../../lib/api/url';
import {apiRequest} from '../../../lib/api/api';

export class SignupService {
    constructor() {
        this.apirequest = new apiRequest();
    }

    signUp=(body)=>{
        return this.apirequest.post(`${signUp}`, body);
    }
}
