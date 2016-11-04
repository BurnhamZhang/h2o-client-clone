'use strict';

import koa from 'koa';
import Router from 'koa-router';
import render from './render';




const app = koa();

const router = new Router();

router.get('*',function *() {
    this.body = yield render('frontend');
});


app.use(router.routes());




export default app;







// Routes






