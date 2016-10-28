import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';


const extractCss = new ExtractTextPlugin('app.css');
// const extractCss = new ExtractTextPlugin('app.[contenthash].css');
const extractAntd = new ExtractTextPlugin('antd.css');
const extractAntdMobile = new ExtractTextPlugin('antd.mobile.css');
// const extractAntd = new ExtractTextPlugin('antd.[contenthash].css');

module.exports = {
    debug: false,
    noInfo: true, // set to false to see a list of every file being bundled.
    entry: {
        // frontend: [path.resolve(__dirname, '../src/frontend/index')],
        backend: [path.resolve(__dirname, '../src/backend/index')],
    },
    module: {
        loaders: [
            {
                test: /src(\\|\/).+\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    plugins: ['transform-decorators-legacy',["import", [{ "libraryName": "antd" }]]],
                    presets: ['latest', 'react', 'stage-0']
                }
            },
            {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
            {test: /\.(woff|woff2)$/, loader: 'file-loader?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=image/svg+xml'},
            {test: /\.(jpe?g|png|gif)$/i, loaders: ['file']},
            {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
            // https://github.com/webpack/style-loader#recommended-configuration
            {test: /(\.css|\.scss)$/, include: path.join(__dirname, '../node_modules/antd'), loader: extractAntd.extract('css')},
            {test: /(\.css|\.scss)$/, include: path.join(__dirname, '../src'), loader: extractCss.extract('css!postcss!sass')},
            {test: /\.css$/, include: path.join(__dirname, '../node_modules/antd-mobile'), loader: extractAntdMobile.extract('css')},
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['', '.web.js', '.js', '.json', '.jsx'],
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        extractAntd,
        extractCss,
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    ],
    postcss: ()=> [autoprefixer]
};

