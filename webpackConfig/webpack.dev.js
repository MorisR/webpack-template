const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {MergeablePlugin} = require("./MergeablePlugin");
const {DefinePlugin} = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {

    //#region ------basic---------------------------------------------------------------

    mode: "development",

    output: {
        filename: '[name].js',
    },

    //#region ------development---------------------------------------------------------


    //#region ------development---------------------------------------------------------

    devtool: 'inline-source-map',

    devServer: {
        contentBase: path.resolve(__dirname, "..", 'dist'),
        port: 3000,
        progress: true,
        stats: 'minimal', // another good option is: "errors-only"
        clientLogLevel: "silent",
        watchContentBase: true,
        hot: true,
        // noInfo: true,
        overlay: true

        // liveReload:true,
        // compress:true,
        // inline:true,
        // open: true,
    },

    //#endregion

    //#region ------plugins + rules-----------------------------------------------------

    module: {
        rules: [
            //cancel css source maps
            //todo cancel scss/sass source maps
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: "css-loader",
                        options: {sourceMap: true}
                    }
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
        new MergeablePlugin(DefinePlugin, {
            DEVELOPMENT: true,
            PRODUCTION: false,
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        //html loader
        new MergeablePlugin(HtmlWebpackPlugin, {
            title: "development"
        }),
    ],

    //#endregion


}
