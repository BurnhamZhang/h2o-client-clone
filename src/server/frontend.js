'use strict';

import koa from 'koa';
import Router from 'koa-router';
import render from './render';

import path from 'path';


const app = koa();

const router = new Router();

router.get('*',function *() {
    if (process.env.NODE_ENV == 'production') {
        this.body = yield render('frontend');
    }
    else {
        this.body = this.webpack.fileSystem.readFileSync(path.join(__dirname, '../../dist/frontend.html'));
        this.set('Content-Type','text/html')
    }
});


app.use(router.routes());




export default app;







// Routes






