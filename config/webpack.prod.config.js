import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';


const extractBackendCss = new ExtractTextPlugin('backend.css');
const extractFrontendCss = new ExtractTextPlugin('frontend.css');
// const extractCss = new ExtractTextPlugin('app.[contenthash].css');
const extractAntd = new ExtractTextPlugin('antd.css');
const extractAntdMobile = new ExtractTextPlugin('antd.mobile.css');
// const extractAntd = new ExtractTextPlugin('antd.[contenthash].css');

module.exports = {
    debug: false,
    noInfo: true, // set to false to see a list of every file being bundled.
    entry: {
        frontend: [path.resolve(__dirname, '../src/frontend/index')],
        backend: [path.resolve(__dirname, '../src/backend/index')],
    },
    module: {
        loaders: [
            {
                test: /src(\\|\/).+\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    plugins: ['transform-decorators-legacy', ["import", [{ "libraryName": "antd" ,"style": "css"},{ "libraryName": "antd-mobile" ,"style": "css"}]]],
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
            {test: /(\.css|\.scss)$/, include: path.join(__dirname, '../src/backend'), loader: extractBackendCss.extract('css!postcss!sass')},
            {test: /(\.css|\.scss)$/, include: path.join(__dirname, '../src/frontend'), loader: extractFrontendCss.extract('css!postcss!sass')},
            // {test: /(\.css|\.scss)$/, include: path.join(__dirname, '../node_modules/antd-mobile'), loader: extractAntdMobile.extract('css')},
            {test: /(\.css|\.scss)$/, include: path.join(__dirname, '../node_modules/normalize.css'), loader: extractAntdMobile.extract('css')},
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
        extractBackendCss,
        extractFrontendCss,
        extractAntdMobile,
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/frontend.html'),
            chunks: ['frontend'],
            template:path.resolve(__dirname, '../src/frontend/index.html')
        }),
        new HtmlWebpackPlugin({
            title: 'backend',
            filename: path.resolve(__dirname, '../dist/backend.html'),
            chunks: ['backend'],
            template:path.resolve(__dirname, '../src/backend/index.html')
        })
    ],
    postcss: ()=> [autoprefixer]
};

