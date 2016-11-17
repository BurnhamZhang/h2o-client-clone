'use strict';

import koa from 'koa';
import proxy from 'koa-proxy';
import mock from './mock';
import url from  './url';

const app = koa();


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






