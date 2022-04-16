const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(require('../webpack.base'), {
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        })
    ],

    context: __dirname,

    entry: './app.js',

    output: {
        path: path.resolve(__dirname, 'resources'),
        filename: 'app.js',
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'resources'),
            publicPath: '/resources',
        },
    },

    mode: 'production'
});