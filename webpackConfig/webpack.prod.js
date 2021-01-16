const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin")
const {MergeablePlugin} = require("./plugins/MergeablePlugin");
const {DefinePlugin} =  require("webpack");

module.exports = {

    //#region ------basic---------------------------------------------------------------

    mode:"production",

    output: {
        filename: '[name].[contenthash].js',
    },

    //#region ------development---------------------------------------------------------


    //#region ------development---------------------------------------------------------

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
            terserOptions: {
                ecma: "2017",
            },
            extractComments:"all",
        })]
    },

    //#endregion

    //#region ------plugins + rules-----------------------------------------------------

    module: {
        rules: [
            //compress images
            {
                test: /^((?!\.same).)*\.(png|jpg|jpeg|jfif|pjpeg|pjp|gif|svg|webp|avif|apng)$/i,
                loader: 'image-webpack-loader',
                enforce: "pre",
                __order:1,
            },

            //todo: skip ts type checking

        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MergeablePlugin(DefinePlugin, {
            DEVELOPMENT:false,
            PRODUCTION:true,
            'process.env.NODE_ENV': JSON.stringify('production'),
        } )
    ],

    //#endregion


}
