'use strict';

import koa from 'koa';
import path from 'path';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import webpackDevMiddleware  from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import webpack from 'webpack';
import config from '../../config/webpack.config';

const app = koa();
const backendRouter = new Router({
    prefix: '/backend'
});
const frontendRouter = new Router({
    prefix: '/frontend'
});

const apiRouter = new Router({
    prefix: '/api'
});

const router = new Router();

// using webpack-dev-server and middleware in development environment
if (process.env.NODE_ENV !== 'production') {
    var compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
    app.use(webpackHotMiddleware(compiler));
}
backendRouter.get('*',function *() {
    console.log(3)
    this.body = `<!DOCTYPE html>
                        <html>
                          <head>
                            <meta charset="utf-8">
                            <title>Node + React Starter</title>
                          </head>
                          <body>
                            <div id='react-content'/>
                          </body>
                          <script src="/backend.js"></script>
                        </html>`;
})

frontendRouter.get('*',function *() {
    console.log(3)
    this.body = `<!DOCTYPE html>
                        <html>
                          <head>
                            <meta charset="utf-8">
                            <title>Node + React Starter</title>
                          </head>
                          <body>
                            <div id='react-content'/>
                          </body>
                          <script src="/frontend.js"></script>
                        </html>`;
})

apiRouter.post('*',function *(data) {
    console.log(this.request.body);
    this.body = this.request.body;
})
router.get('/',function *() {
     console.log('else')
    this.body = 'test'
})


app.use(router.routes());
app.use(backendRouter.routes());
app.use(frontendRouter.routes());
app.use(bodyParser());
app.use(apiRouter.routes());

// Serve static files
app.use(serve(path.join(__dirname, '../../dist')));


const PORT = process.env.PORT || 3000;

app.listen(PORT, function (error) {
    if (error) {
        console.error(error);
    } else {
        console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    }
});


// Routes






