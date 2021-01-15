const path = require("path")
const readDir = require("fs-readdir-recursive");
const {MergeConfigWithMergeablePlugin} = require("./webpackConfig/MergeablePlugin");
const {mergeWithRules, mergeWithCustomize} = require("webpack-merge")

const webpackConfigDir = path.resolve(__dirname, "webpackConfig")
const webpackConfigFileNameRegex = /^webpack\.\w+\.js$/i;

const mergeRules = mergeWithRules({
    rules: {
        test: "match",
        use: {
            loader: "match",
            options: "merge",
        },
    },
})
function sortRules(rules) {
    return rules.sort((a, b) => (a.__order || Number.POSITIVE_INFINITY) - (b.__order || Number.POSITIVE_INFINITY))
        .forEach(rule => delete rule.__order)
}
function mergeConfigs(...configObjects) {

    return mergeWithCustomize({
        customizeObject: (a, b, key) => {
            if (key === "module") {

                const res = mergeRules(a, b);
                res.rules= sortRules(res.rules)
                return res
            }


            return undefined;
        },
        customizeArray: (a, b, key) => {
            return MergeConfigWithMergeablePlugin(a,b,key)
        }

    })(...configObjects,{plugins:[]})

}
function getConfigFilePaths() {
    const dirContent =  readDir(webpackConfigDir)
    const webpackConfigFiles = dirContent.filter((dir) => webpackConfigFileNameRegex.test(path.basename(dir)))
    const res = new Map();
    webpackConfigFiles.forEach(relativeDir => {
        const dir = path.resolve(webpackConfigDir,relativeDir)
        const configType = path.basename(dir).toLowerCase().split(".")[1]

        if (res.has(configType))
            res.get(configType).push(dir)
        else
            res.set(configType, [dir])

    })
    return res;
}


 function getConfig(env) {

     const configFilesPaths = getConfigFilePaths()
     const matchingFilePaths = []

     // const entries = [...Object.keys(env||{})].filter(key=>env[key] === true)
     const entries = ["all", "common", env?.NODE_ENV]

     //loop over options and get matching config file paths
     for (let envEntry of entries) {
         if (configFilesPaths.has(envEntry)) {
             matchingFilePaths.push(...configFilesPaths.get(envEntry))
             // configFilesPaths.delete(envEntry)
         }
     }

     //read files
     const configObjects = matchingFilePaths.map(path => require(path))

     if (!configObjects.length || !env?.NODE_ENV) {
         const options = [...configFilesPaths.keys()].join(", ");
         throw new Error(`NODE_ENV must equal one of the following [${options}]`)
     }


     return mergeConfigs(...configObjects)
 }

module.exports = getConfig
