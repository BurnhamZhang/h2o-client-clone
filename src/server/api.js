'use strict';

import koa from 'koa';
import proxy from 'koa-proxy';
import mock from './mock';

const MOCK_URL = 'http://172.25.46.33:8080';
const TEST_URL = 'http://172.25.46.129:8081';
const PRODUCTION_URL = 'http://172.25.46.33:8080';

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

    app.use(proxy({
        host:  url,
        map: function(path) {
            console.log('path',path)
            return '/api' + path;
        }
    }));


}
else {
    mock(app);
}


export default app;


// Routes






