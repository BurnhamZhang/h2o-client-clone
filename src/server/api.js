'use strict';

import koa from 'koa';
import proxy from 'koa-proxy';
import mock from './mock';

const MOCK_URL = 'http://172.25.46.33:8080';
const DEVELOPMENT_URL = 'http://172.25.46.129:8081';
const TEST_URL = 'http://172.24.5.109:8101';
const PRODUCTION_URL = 'http://172.24.5.109:8101';

let url;
const app = koa();

if (process.env.DATABASE == 'prod') {
    url = PRODUCTION_URL;
}
else if (process.env.DATABASE == 'test') {
    url = TEST_URL;
}
else if (process.env.DATABASE == 'dev') {
    url = DEVELOPMENT_URL;
}
else if (process.env.DATABASE == 'mock') {
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

    console.log('database url is :',url)

}
else {
    mock(app);
}



export default app;


// Routes






