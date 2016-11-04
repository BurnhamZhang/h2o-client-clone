'use strict';

import koa from 'koa';
import proxy from './proxy';
import mock from './mock';

const MOCK_URL = 'http://172.25.46.33:8080/api';
const PRODUCTION_URL = 'http://172.25.46.33:8080/api';

let url;
const app = koa();

if (process.env.NODE_ENV == 'production') {
    url = PRODUCTION_URL;
}
else if (process.env.MOCK == 'mock') {
    url = MOCK_URL
}

console.log('env',process.env.MOCK)
console.log('url',url)
if(url){
    app.use(function *(next) {
        console.log(url+this.path)
        this.body = yield proxy(url+this.path,{
            method: this.method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: this.body
        })
        yield next;
    });
}
else {
    mock(app);
}


export default app;


// Routes






