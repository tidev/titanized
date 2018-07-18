import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';

import settle from 'axios/lib/core/settle';
import buildURL from 'axios/lib/helpers/buildURL';
import utils from 'axios/lib/utils';

export function titaniumAxiosAdapter(config: AxiosRequestConfig): AxiosPromise {
    const validResponseTypes = [ 'arraybuffer', 'blob', 'json', 'text' ];
    if (config.responseType && validResponseTypes.indexOf(config.responseType!) === -1) {
        throw new Error(`Invalid response type ${config.responseType}. Valid response types are ${validResponseTypes.join(', ')}.`);
    }

    let responseContentLength: number | null = null;
    const client = Ti.Network.createHTTPClient();
    const data = config.data;
    const headers = config.headers;

    if (data) {
        headers['Content-Length'] = data.length;
    }

    if (config.auth) {
        const username = config.auth.username || '';
        const password = config.auth.password || '';
        headers.Authorization = `Basic ${Titanium.Utils.base64encode(`${username}:${password}`)}`;
    }

    if (typeof config.timeout === 'number') {
        client.timeout = config.timeout;
    }

    client.onreadystatechange = () => {
        if (client.readyState === client.HEADERS_RECEIVED) {
            const contentLength: number = client.getResponseHeader('Content-Length') as any;
            if (contentLength) {
                responseContentLength = contentLength;
            }
        }
    };

    if (typeof config.onDownloadProgress === 'function') {
        client.ondatastream = e => {
            const progressEvent: any = {
                lengthComputable: false,
                loaded: 0,
                total: 0
            };
            if (e.progress !== Ti.Network.PROGRESS_UNKNOWN && responseContentLength !== null) {
                progressEvent.lengthComputable = true;
                progressEvent.total = responseContentLength;
                progressEvent.loaded = responseContentLength * e.progress;
            }
            config.onDownloadProgress!(progressEvent);
        };
    }

    if (typeof config.onUploadProgress === 'function') {
        client.onsendstream = e => {
            const progressEvent: any = {
                lengthComputable: false,
                loaded: 0,
                total: 0
            };
            if (e.progress !== Ti.Network.PROGRESS_UNKNOWN && data.length) {
                progressEvent.lengthComputable = true;
                progressEvent.total = data.length;
                progressEvent.loaded = data.length * e.progress;
            }
            config.onUploadProgress!(progressEvent);
        };
    }

    utils.forEach(headers, function setRequestHeader(val: any, key: string) {
        if (typeof data === 'undefined' && key.toLowerCase() === 'content-type') {
            delete headers[key];
        } else {
            client.setRequestHeader(key, val);
        }
    });

    return new Promise((resolve, reject) => {
        client.onload = () => {
            const response: Partial<AxiosResponse> = {
                status: client.status,
                statusText: client.statusText,
                headers: client.getAllResponseHeaders(),
                config,
                request: client
            };
            if (config.responseType === 'arraybuffer') {
                const blobStream = Ti.Stream.createStream({ source: client.responseData, mode: Ti.Stream.MODE_READ });
                const buffer = Ti.createBuffer({ length: client.responseData.length });
                blobStream.read(buffer);
                response.data = buffer;
            } else if (config.responseType === 'blob') {
                response.data = client.responseData;
            } else {
                response.data = client.responseText;
            }
            settle(resolve, reject, response);
        };

        client.onerror = (e: any) => {
            reject(e.error);
        };

        if (config.cancelToken) {
            config.cancelToken.promise.then(function onCanceled(cancel: any) {
                client.abort();
                reject(cancel);
            });
        }

        client.open(config.method!.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer));
        client.send();
    });
}
