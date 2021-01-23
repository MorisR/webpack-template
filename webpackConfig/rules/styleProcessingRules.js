/** @typedef {import('webpack').RuleSetRule} RuleSetRule*/


/**
 * @param {boolean} [props.sourcemap] - is sourcemap enabled.
 * @param {boolean} [props.icss] - load sass rules
 * @return {RuleSetRule[]}
 */
function styleProcessingRules(props) {
    const {
        sourceMap = false,
        icss = false
    } = props;


    return [
        {
            loader: "css-loader",
            options: {
                esModule: true,
                importLoaders: 3,
                modules: {
                    compileType: icss ? "icss" : "module",
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
        {
            loader: "resolve-url-loader",
            options: {
                sourceMap,
            }
        },
        {
            loader: "sass-loader",
            options: {sourceMap: true},
        },
        "postcss-loader",
    ];

}


module.exports = styleProcessingRules
