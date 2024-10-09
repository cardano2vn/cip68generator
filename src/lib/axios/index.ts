/* eslint-disable @typescript-eslint/no-explicit-any */
import { BACKEND_URL, CONTEXT_PATH } from '@/constants/app-environment';
import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: BACKEND_URL + CONTEXT_PATH,
    timeout: 30000,
    timeoutErrorMessage: 'Time out!',
});

async function post(route: string, body = {}, header = {}) {
    try {
        return await instance.post(`${route}`, body, header).then((response) => {
            return response.data.data;
        });
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

async function get(route: string, header = {}) {
    try {
        return await instance.get(`${route}`, header).then((response) => {
            if (response.status === 200) {
                return response.data.data;
            }
            throw new Error(response.data.message);
        });
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export { instance, post, get };
