import axios from 'axios';
import base64 from "base-64";

const clientConfig = {
    headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json',
    }
}


let axiosInstance = axios.create(clientConfig);

export {axiosInstance};
