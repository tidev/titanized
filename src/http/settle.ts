import { AxiosError, AxiosResponse } from 'axios';

export default function settle(resolve: (value: AxiosResponse) => void, reject: (reason: any) => void, response: AxiosResponse) {
    const validateStatus = response.config.validateStatus;
    if (!validateStatus || validateStatus(response.status)) {
        resolve(response);
    } else {
        const error: Partial<AxiosError> = new Error(`Request failed with status code ${response.status}`);
        error.config = response.config;
        error.request = response.request;
        error.response = response;
        reject(error);
    }
}
