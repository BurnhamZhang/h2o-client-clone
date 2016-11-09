import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';


const extractBackendCss = new ExtractTextPlugin('backend.[contenthash].css');
const extractFrontendCss = new ExtractTextPlugin('frontend.[contenthash].css');
// const extractCss = new ExtractTextPlugin('app.[contenthash].css');
const extractAntd = new ExtractTextPlugin('antd.[contenthash].css');
const extractAntdMobile = new ExtractTextPlugin('antd.mobile.[contenthash].css');
const extractNormalizeMobile = new ExtractTextPlugin('normalize.[contenthash].css');
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
                test: /\.jsx?$/,
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

            {test: /\.s?css$/, include: [path.join(__dirname, '../node_modules/antd'),path.join(__dirname, '../node_modules/antd-mobile')], loader: extractAntd.extract('style','css!sass')},
            {test: /\.s?css$/, include: path.join(__dirname, '../src/backend'), loader: extractBackendCss.extract('style','css!sass')},
            // {test: /\.s?css$/, include: path.join(__dirname, '../node_modules/antd-mobile'), loader: extractAntdMobile.extract('style','css!sass')},
            {test: /\.s?css$/, include: path.join(__dirname, '../src/frontend'), loader: extractFrontendCss.extract('style','css!sass')},
            {test: /\.css$/, include: path.join(__dirname, '../node_modules/normalize'), loader: extractNormalizeMobile.extract('css')},
            // {test: /\.s?css$/, include: path.join(__dirname, '../node_modules/antd-mobile'), loader: 'style!css!sass'},
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
        extractNormalizeMobile,
        new webpack.NoErrorsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin(/*chunkName=*/'common', /*filename=*/'common.js'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress : {
                unused    : true,
                dead_code : true,
                warnings  : false
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

