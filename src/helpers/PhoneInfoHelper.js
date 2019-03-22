import axios from 'axios';
import { URL_FONOAPI } from '../config/api-configs';

export const PhoneInfoHelper = axios.create({
    baseURL: URL_FONOAPI,
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

