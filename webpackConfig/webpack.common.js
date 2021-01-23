const path = require("path");
const {MergeablePlugin} = require("./plugins/MergeablePlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const svgToMiniDataURI = require("mini-svg-data-uri");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const {loadProjectEnv, loadSystemEnv} = require("./plugins/envPlugin");


const pathToDist = path.resolve(__dirname, "..", "dist");
const pathToSrc = path.resolve(__dirname, "..", "src");

const pathToNodeModules = /node_modules/;
const pathToInclude = /src/;

function minifyInlineSvg(content) {
    if (typeof content !== "string") content = content.toString();
    return svgToMiniDataURI(content);
}

module.exports = (env) => {
    const {sourcemap = false} = env;
    return ({
        //#region ------basic---------------------------------------------------------------

        target: "web",
        entry: ["./src/index.tsx","./src/index2.ts"],
        output: {
            path: pathToDist,
            assetModuleFilename: "resources/[name].[contenthash][ext]",
            filename: '[name].[contenthash].js'
        },

        //#endregion

        //#region ------dev + optimizations-------------------------------------------------
        resolve: {
            symlinks: false,
        },
        devtool: sourcemap ? 'source-map' : false,
        //#endregion

        //#region ------plugins + rules-----------------------------------------------------

        module: {
            rules: [
                //#region js/jsx/ts/tsx files ----------------
                {
                    test: /\.([tj]sx?)$/i,
                    use: {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true
                        }
                    },
                    include: pathToInclude,
                    exclude: pathToNodeModules,
                },

                //#endregion

                //#region style files -----------------

                // .lazy.[ext] - to load lazy load css
                {
                    test: /^.*(?=\.lazy\.).*\.(s[ca]|c)ss$/i,
                    use: {
                        loader: "style-loader",
                        options: {
                            injectType: "lazyStyleTag"
                        }
                    },
                },

                // .link.[ext] - uses "style-loader/mini-css-extract-plugin" to load css as links (not as part of the script bundle)
                {
                    // mini-css-extract-plugin - load css files as is ( not in/through js)
                    test: /^.*(?=\.link\.).*\.(s[ca]|c)ss$/i,
                    loader: MiniCssExtractPlugin.loader,
                },

                //by default load css-in-js
                {
                    test: /^((?!\.(link|lazy)\.).)*\.(s[ca]|c)ss$/i,
                    use: "style-loader"
                },

                // *.global.[ext] / *.pure.[ext] / .css / .sass / .scss
                {
                    test: /\.(s[ca]|c)ss$/i,
                    use: [
                        // add support for .global and.pure ( by default load as modules )
                        {
                            loader: "css-loader",
                            options: {
                                esModule: true,
                                importLoaders: 3,
                                modules: {
                                    compileType: "module",
                                    localIdentName: "[name]__[hash:base64:5]",
                                    exportLocalsConvention: "camelCase",
                                    exportGlobals: true,
                                    mode: (resourcePath) => {
                                        if (/^.*(?=\.pure\.).*\.(css|s[ca]ss)$/i.test(resourcePath)) {
                                            return "pure";
                                        }

                                        if (/^.*(?=\.global\.).*\.(css|s[ca]ss)$/i.test(resourcePath)) {
                                            return "global";
                                        }

                                        return "local";
                                    },
                                },
                                sourceMap: sourcemap,
                            },
                        },
                        //apply postcss autoprefixer + other plugins
                        "postcss-loader",
                        //load sass files
                        {
                            loader: "resolve-url-loader",
                            options: {
                                sourceMap: sourcemap,
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {sourceMap: true},
                        },
                    ]
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

            //faster ts type checking
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    memoryLimit: 4096,
                    compilerOptions: {
                        skipLibCheck: true,
                        sourceMap: sourcemap,
                        inlineSourceMap: sourcemap,
                        declarationMap: false
                    }
                },
                eslint: {
                    files: './src/**/*.{ts,tsx,js,jsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
                }
            }),


            //loads css as .css files and not from js bundle
            new MiniCssExtractPlugin({
                // filename: '/styles/[name].[hash].css',
                // chunkFilename: '/styles/[name].[contenthash].js',
            }),

            //html loader
            new MergeablePlugin(HtmlWebpackPlugin, {
                template: path.resolve(pathToSrc, "index.html"),
                filename: "index.html",
                inject: true,
                scriptLoading: "defer", // injects the references into the head and body of the html files:"defer"
            }),

            // env variables from "/emv/[mode].env" files
            ...loadProjectEnv(env),
            env?.loadSystemEnv && loadSystemEnv()
        ].filter(x => x),

        //#endregion
    })
};
