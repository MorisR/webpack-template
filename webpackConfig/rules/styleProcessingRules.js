/** @typedef {import('webpack').RuleSetRule} RuleSetRule*/


/**
 * @param {boolean} [props.sourcemap] - is sourcemap enabled.
 * @param {boolean} [props.sass] - load sass rules
 * @param {boolean} [props.icss] - load sass rules
 * @return {RuleSetRule[]}
 */
function styleProcessingRules(props) {
    const {
        sourceMap = false,
        sass = false,
        icss = false
    } = props;


    /**@type {RuleSetRule[]}*/

    //load css-loader
    const res = [
        {
            loader:"css-loader",
            options: {
                esModule: true,
                importLoaders:1,
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
        }
    ]

    //load postcss
    res.push(  {
        loader:"postcss-loader",
    })

    //load sass
    if (sass) {
        res[0].options.importLoaders = 3;
        res.push(
            {
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
