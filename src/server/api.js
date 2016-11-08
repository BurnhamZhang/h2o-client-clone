'use strict';

import koa from 'koa';
import proxy from './proxy';
import mock from './mock';

const MOCK_URL = 'http://172.25.46.33:8080/api';
const TEST_URL = 'http://172.25.46.129:8081/api';
const PRODUCTION_URL = 'http://172.25.46.33:8080/api';

let url;
const app = koa();

if (process.env.NODE_ENV == 'production') {
    url = PRODUCTION_URL;
}
else if (process.env.SERVER == 'mock') {
    url = MOCK_URL
}
else if (process.env.SERVER == 'test') {
    url = TEST_URL
}
else if (process.env.SERVER == 'prod') {
    url = MOCK_URL
}

if (url) {
    app.use(function *() {

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        if (this.header.token) {
            headers.token = this.header.token
        }
        this.body = yield proxy(url + this.path, {
            method: this.method,
            headers: headers,
            body: JSON.stringify(this.request.body)
        })
    });
}
else {
    mock(app);
}


export default app;


// Routes






