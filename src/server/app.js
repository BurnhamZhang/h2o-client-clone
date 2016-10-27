'use strict';

import koa from 'koa';
import api from './api';
import backend from './backend';
import frontend from './frontend';
import path from 'path';
import mount from 'koa-mount';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import webpackDevMiddleware  from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import webpack from 'webpack';
import config from '../../config/webpack.config';


const app = koa();





// using webpack-dev-server and middleware in development environment
if (process.env.NODE_ENV !== 'production') {
    var compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
    app.use(webpackHotMiddleware(compiler));
}


app.use(bodyParser());

app.use(mount('/backend', backend));
app.use(mount('/frontend', frontend));
app.use(mount('/api', api));

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






