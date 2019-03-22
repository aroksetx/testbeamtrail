import axios from 'axios';
import { URL_SERVER } from '../config/api-configs';

export const ServerApiHelper = axios.create({
    baseURL: URL_SERVER,
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});
