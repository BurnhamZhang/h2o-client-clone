import config from './webpack.config';
import webpack from 'webpack';


config.debug = false;
config.plugins.push(
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify("production")
        }
    })
);

config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
            warnings: false
        }
    })
);

module.exports = config;
