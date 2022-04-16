const { VueLoaderPlugin }  = require('vue-loader')

module.exports = {
    plugins: [
        new VueLoaderPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
        ],
    },
};
