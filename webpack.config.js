const dev = require("./webpackConfig/webpack.dev")
const prod = require("./webpackConfig/webpack.prod")
const common = require("./webpackConfig/webpack.common")
const MergeablePlugin = require("./webpackConfig/MergeablePlugin");
const {mergeWithRules, mergeWithCustomize, merge} = require("webpack-merge")


function mergeConfigs(...configObjects) {

    let res;
    const mergeRules = mergeWithRules({
        rules: {
            test: "match",
            use: {
                loader: "match",
                options: "merge",
            },
        },
    })

    res = mergeWithCustomize({
        customizeObject: (a, b, key) => {
            if (key === "module") {

                const res = mergeRules(a, b);
                res.rules
                    .sort((a, b) => (a.__order || Number.POSITIVE_INFINITY ) - (b.__order || Number.POSITIVE_INFINITY))
                    .forEach(rule=>delete rule.__order)
                return res
            }


            return undefined;
        },
        customizeArray: (a, b, key) => {

            // merge elements of type "MergeablePlugin"
            if (key === "plugins") {
                const a_cantBeMerged = a.filter((entry) => entry.constructor !== MergeablePlugin)
                const b_cantBeMerged = b.filter((entry) => entry.constructor !== MergeablePlugin)
                let elementsToMerge = [
                    ...a.filter((entry) => entry.constructor === MergeablePlugin),
                    ...b.filter((entry) => entry.constructor === MergeablePlugin)
                ]

                const mergeRes = []
                while (elementsToMerge.length) {
                    const element = elementsToMerge.shift()

                    const elementsOfSameType = elementsToMerge.filter(e => e.moduleClass.constructor === element.moduleClass.constructor)
                    elementsToMerge = elementsToMerge.filter(e => e.moduleClass.constructor !== element.moduleClass.constructor)

                    const mergedProps = merge(element.props, ...elementsOfSameType.map(e => e.props))
                    mergeRes.push(new element.moduleClass(mergedProps))
                }


                return [...a_cantBeMerged, ...b_cantBeMerged, ...mergeRes];

            }
            return undefined
        }

    })(...configObjects)


    return res
}


function getConfig(env) {

    if (env.production)
        return mergeConfigs(common, prod);
    if (env.development)
        return mergeConfigs(common, dev);

    throw new Error(`NODE_ENV must equal one of the following ["production","development"]`)

}


// console.log(getConfig({development:true}).plugins)
module.exports = getConfig
