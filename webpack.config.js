const path = require("path")
const readDir = require("fs-readdir-recursive");
const {MergeConfigWithMergeablePlugin} = require("./webpackConfig/plugins/MergeablePlugin");
const {mergeWithRules, mergeWithCustomize} = require("webpack-merge")

const webpackConfigDir = path.resolve(__dirname, "webpackConfig")
const webpackConfigFileNameRegex = /^webpack(\w?\d?)*\.\w+\.js$/i;

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
    rules.sort((a, b) => (a.__order || Number.POSITIVE_INFINITY) - (b.__order || Number.POSITIVE_INFINITY))
        .forEach(rule => delete rule.__order)
    return rules;
}
function mergeConfigs(...configObjects) {

    return mergeWithCustomize({
        customizeObject: (a, b, key) => {
            if (key === "module") {

                const res = mergeRules(a, b);
                res.rules = sortRules(res.rules)
                return res
            }


            return undefined;
        },
        customizeArray: (a, b, key) => {
            return MergeConfigWithMergeablePlugin(a, b, key)
        }

    })(...configObjects, {plugins: []})

}
function getConfigFilePaths() {
    const dirContent = readDir(webpackConfigDir)
    const webpackConfigFiles = dirContent.filter((dir) => webpackConfigFileNameRegex.test(path.basename(dir)))
    const res = new Map();
    webpackConfigFiles.forEach(relativeDir => {
        const dir = path.resolve(webpackConfigDir, relativeDir)
        const configType = path.basename(dir).toLowerCase().split(".")[1]

        if (res.has(configType))
            res.get(configType).push(dir)
        else
            res.set(configType, [dir])

    })
    return res;
}
function sortConfigFilesByName(a,b){
    return path.basename(a).toLowerCase() - path.basename(b).toLowerCase()
}

function getConfig(env) {

    const configFilesPaths = getConfigFilePaths()
    const availableWebpackOptions = [...configFilesPaths.keys()]
    const envOptions = Object.keys(env || {}).filter(key => env[key] === true)
    const matchingFilePaths = []

    //if no config files were found
    if (!availableWebpackOptions.length)
        throw new Error("No webpack.[config_type].js were found in /webpackConfig dir")

    //load variables from entries
    const entries = [...envOptions,"default"]

    //loop over options and get matching config file paths
    for (let envEntry of entries) {
        const isLastElement = envEntry === "default"

        //sort all config files (default excluded)
        if(isLastElement)
            matchingFilePaths.sort(sortConfigFilesByName)

        if (configFilesPaths.has(envEntry)) {
            //load default at the beginning of the array
            if(isLastElement)
            {
                //sort default config files by name
                const defaultConfig = [...configFilesPaths.get(envEntry)].sort(sortConfigFilesByName)
                //add em to the array
                matchingFilePaths.unshift(...defaultConfig)
            }

            //load all other config file paths at the end of the array
            else matchingFilePaths.push(...configFilesPaths.get(envEntry))

            //delete found result so they wont get duplicated
            configFilesPaths.delete(envEntry)
        }
    }

    //read config files
    const configObjects = matchingFilePaths
        .map(path => require(path))
        .map(config=> typeof config ==='function'? config(env) : config)

    //if no config files were found throw an error
    if (!configObjects.length)
        throw new Error(`No webpack config file is used, please run again with "--env" arg equal to one (or more) of the following options, [${availableWebpackOptions.join(", ")}]`)

    //merge config objects and return the result
    return mergeConfigs(...configObjects)
}

module.exports = getConfig
