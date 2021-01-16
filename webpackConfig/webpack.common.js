const styleProcessingRules = require("./rules/styleProcessingRules");
const path = require("path");
const {DefinePlugin} = require("webpack");
const {MergeablePlugin} = require("./plugins/MergeablePlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const svgToMiniDataURI = require("mini-svg-data-uri");

const pathToDist = path.resolve(__dirname, "..", "dist");
const pathToSrc = path.resolve(__dirname, "..", "src");
const pathToNodeModules = /node_modules/;
const pathToInclude = /src/;

function minifyInlineSvg(content) {
    if (typeof content !== "string") content = content.toString();
    return svgToMiniDataURI(content);
}

module.exports = {
    //#region ------basic---------------------------------------------------------------

    target: "web",
    entry: "./src/index.tsx",
    output: {
        path: pathToDist,
        assetModuleFilename: "resources/[name].[contenthash][ext]",
        filename: '[name].[contenthash].js'
    },
    resolve: {
        symlinks: false,
    },

    //#endregion

    //#region ------plugins + rules-----------------------------------------------------

    module: {
        rules: [
            //#region ts/tsx files ----------------

            {
                test: /\.tsx?$/i,
                use: "ts-loader",
                include: pathToInclude,
                exclude: pathToNodeModules,
            },

            //#endregion

            //#region style files -----------------

            // style-loader - link the style to the html (linkTags/lazy/styleTags)
            {
                test: /^.*(?=\.lazy\.).*\.(css|s[ac]ss)$/i,
                use: {
                    loader: "style-loader",
                    options: {
                        esModule: true,
                        injectType: "lazyStyleTag"
                    }
                },

            },
            {
                test: /^.*(?=\.link\.).*\.(css|s[ac]ss)$/i,
                use: {
                    loader: "style-loader",
                    options: {
                        esModule: true,
                        injectType: "linkTag"
                    }
                },

            },
            {
                test: /^((?!\.(link|lazy)\.).)*\.(css|s[ca]ss)$/i,
                use: {
                    loader: "style-loader",
                    options: {
                        esModule: true,
                    }
                },

            },

            //load sass/scss + css globals/locals(modules)/pure with explicit exports (icss)
            {
                test: /^.*(?=\.icss\.).*\.css$/i,
                use: styleProcessingRules({sass: false, icss: true}),
            },
            {
                test: /^.*(?=\.icss\.).*\.s[ac]ss$/i,
                use: styleProcessingRules({sass: true, icss: true}),
            },

            //load sass/scss + css globals/locals(modules)/pure
            {
                test: /^((?!\.icss\.).)*\.css$/i,
                use: styleProcessingRules({sass: false, icss: false}),
            },
            {
                test: /^((?!\.icss\.).)*\.s[ca]ss$/i,
                use: styleProcessingRules({sass: true, icss: false}),
            },

            //#endregion

            //#region image files -----------------

            //load svg files inline - copy the component's code
            {
                test: /^.*(?=\.inj\.).*\.svg$/i,
                // test: /\.(inj|same\.inj|inj\.same)\.svg$/i,
                type: "asset/source",
            },

            //load an image as a resource
            {
                test: /^.*(?=\.res\.).*\.(png|jpg|jpeg|jfif|pjpeg|pjp|gif|webp|avif|apng|svg)$/i,
                // test: /\.(res|same\.res|res\.same)\.(png|jpg|jpeg|gif|svg)$/i,
                type: "asset/resource",
                generator: {
                    filename: "resources/images/[name].[hash][ext]",
                },
            },

            //load an image inline (as base64)
            {
                test: /^.*(?=\.str\.).*\.svg$/i,
                // test: /\.(str|same\.str|str\.same)\.svg$/i,
                type: "asset/inline",
                generator: {
                    dataUrl: minifyInlineSvg,
                },
            },
            {
                test: /^.*(?=\.str\.).*\.(png|jpg|jpeg|jfif|pjpeg|pjp|gif|webp|avif|apng)$/i,
                // test: /\.(str|same\.str|str\.same)\.(png|jpg|jpeg|jfif|pjpeg|pjp|gif|webp|avif|apng)$/i,
                type: "asset/inline",
            },

            //load images
            {
                test: /^((?!\.str|inj|res\.).)*\.svg$/i,
                type: "asset",
                generator: {
                    dataUrl: minifyInlineSvg,
                    filename: "resources/images/[name].[hash][ext]",
                },
            },
            {
                test: /^.*(?!\.str|inj|res\.).*\.(png|jpg|jpeg|jfif|pjpeg|pjp|gif|webp|avif|apng)$/i,
                // test: /^((?!\.str|res\.).)*\.(png|jpg|jpeg|jfif|pjpeg|pjp|gif|webp|avif|apng)$/i,
                type: "asset",
                generator: {
                    filename: "resources/images/[name].[hash][ext]",
                },
            },

            //#endregion

            //#region font files ------------------

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "resources/fonts/[name].[hash][ext]",
                },
            },

            //#endregion
        ],
    },

    plugins: [
        //html loader
        new MergeablePlugin(HtmlWebpackPlugin, {
            template: path.resolve(pathToSrc, "index.html"),
            filename: "index.html",
            inject: true,
            scriptLoading: "defer", // injects the references into the head and body of the html files:"defer"
        }),

        //env variables
        new MergeablePlugin(DefinePlugin, {}),
    ],

    //#endregion
};
