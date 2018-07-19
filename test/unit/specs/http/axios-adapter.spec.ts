import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

import { titaniumAxiosAdapter } from 'titanized/http';

describe('axios adapter', () => {
    const testData = {
        foo: 'bar',
        arr: ['I\'m', 'a', 'pirate'],
        bar: 'baß'
    };
    let http: AxiosInstance;

    beforeAll(() => {
        http = axios.create({
            baseURL: 'httpbin.org',
            adapter: titaniumAxiosAdapter
        });
    });

    describe('GET', () => {
        it('should make a simple GET request', done => {
            http.get('/get')
                .then(response => {
                    expect(response.status).toEqual(200);
                    done();
                }, done.fail);
        });

        it('should build url with query parameters', done => {
            http.get('/get', {
                params: testData
            }).then(response => {
                expect(response.status).toEqual(200);
                expect(response.data.args).toEqual({
                    'foo': testData.foo,
                    'arr[]': testData.arr,
                    'bar': testData.bar
                });
                done();
            }, done.fail);
        });

        it('should report download progress', done => {
            const progressSpy = jasmine.createSpy('onDownloadProgress', (e: any) => {
                if (e.lengthComputable) {
                    expect(e.total).toBeGreaterThan(0);
                    expect(e.loaded).toEqual(jasmine.any(Number));
                } else {
                    expect(e.total).toEqual(0);
                    expect(e.loaded).toEqual(0);
                }
            });
            http.get('/drip', {
                onDownloadProgress: progressSpy
            }).then(response => {
                expect(response.status).toEqual(200);
                expect(progressSpy).toHaveBeenCalled();
                done();
            }, done.fail);
        });
    });

    describe('POST', () => {
        it('should send JSON data', done => {
            http.post('/post', testData)
                .then(response => {
                    expect(response.status).toEqual(200);
                    expect(response.data.json).toEqual(testData);
                    done();
                }, done.fail);
        });

        it('should send form data', done => {
            const formData = {
                'foo': testData.foo,
                'arr[0]': testData.arr[0],
                'arr[1]': testData.arr[1],
                'arr[2]': testData.arr[2],
                'bar': testData.bar
            };
            http.post('/post', qs.stringify(testData))
                .then(response => {
                    expect(response.status).toEqual(200);
                    expect(response.data.form).toEqual(formData);
                    done();
                }, done.fail);
        });
    });

    it('should set request headers', done => {
        const customHeaderName = 'Custom-Header';
        const customHeaderValue = 'ti.axios';
        http.get('/headers', { headers: { [customHeaderName]: customHeaderValue } })
            .then(response => {
                expect(response.data).toEqual(jasmine.any(Object));
                expect(response.data.headers[customHeaderName]).toEqual(customHeaderValue);
                done();
            }, done.fail);
    });

    it('should perform basic auth', done => {
        const username = 'ti';
        const password = 'axios';
        http.get(`/basic-auth/${username}/${password}`, { auth: { username, password } })
            .then(response => {
                expect(response.status).toEqual(200);
                done();
            }, done.fail);
    });

    describe('responseType', () => {
        it('should support arraybuffer response', done => {
            const byteLength = 256;
            http.get(`/bytes/${byteLength}`, { responseType: 'arraybuffer' })
                .then(response => {
                    expect(response.data.apiName).toEqual('Ti.Buffer');
                    expect(response.data.length).toEqual(byteLength);
                    done();
                }, done.fail);
        });

        it('should support blob response', done => {
            const byteLength = 256;
            http.get(`/bytes/${byteLength}`, { responseType: 'blob' })
                .then(response => {
                    expect(response.data.apiName).toEqual('Ti.Blob');
                    expect(response.data.length).toEqual(byteLength);
                    done();
                }, done.fail);
        });

        it('should support json response', done => {
            http.get('/json')
                .then(response => {
                    const data = response.data;
                    expect(data.slideshow).toBeDefined();
                    expect(data.slideshow.title).toEqual('Sample Slide Show');
                    done();
                }, done.fail);
        });

        it('should support text response', done => {
            http.get('/html')
                .then(response => {
                    expect(response.data).toContain('Herman Melville - Moby-Dick');
                    done();
                }, done.fail);
        });

        it('should fail with invalid response type', done => {
            http.get('/get', { responseType: 'document' })
                .then(() => {
                    done.fail('Expected request to fail with invalid responde type.');
                }, () => done());
        });
    });
});
