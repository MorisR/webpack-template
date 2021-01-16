/** @typedef {import('webpack').RuleSetRule} RuleSetRule*/


/**
 * @param {boolean} [props.sourcemap] - is sourcemap enabled.
 * @param {boolean} [props.sass] - load sass rules
 * @param {boolean} [props.icss] - load sass rules
 * @param {"styleTag"|"singletonStyleTag"|"lazyStyleTag"|"lazySingletonStyleTag"|"linkTag"} [props.injectType] - is sourcemap enabled
 * @return {RuleSetRule[]}
 */
function styleProcessingRules(props) {
    const {
        sourceMap = false,
        sass = false,
        icss = false
    } = props;


    /**@type {RuleSetRule[]}*/
    const res = [
        {
            loader:"css-loader",
            options: {
                esModule: true,
                modules: {
                    compileType: icss? "icss" : "module",
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
                sourceMap,
            },
        },
    ]

    if (sass) {
        res[0].options.importLoaders = 2;
        res.push({
                loader: "resolve-url-loader",
                options: {
                    sourceMap,
                }
            },
            {
                loader: "sass-loader",
                options: {
                    sourceMap: true,
                    // sourceMapContents: false,
                },
            })
    }

    return res;

}

module.exports = styleProcessingRules
