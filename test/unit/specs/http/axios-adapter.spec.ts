import axios, { AxiosInstance } from 'axios';

import { titaniumAxiosAdapter } from 'titanized/http';

describe('axios adapter', () => {
    let http: AxiosInstance;

    beforeAll(() => {
        http = axios.create({
            baseURL: 'httpbin.org',
            adapter: titaniumAxiosAdapter
        });
    });

    it('should make a simple GET request', done => {
        http.get('/get')
            .then(response => {
                expect(response.status).toEqual(200);
                done();
            }, done.fail);
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
