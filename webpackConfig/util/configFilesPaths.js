const path = require("path")
const readDir = require("fs-readdir-recursive");

const webpackConfigDir = path.resolve(__dirname,"..")
const webpackConfigFileNameRegex = /^webpack(\w?\d?)*\.\w+\.js$/i;

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
 function getConfigOptions(){
    const configFilesPaths = [...getConfigFilePaths().keys()].map(filePath=>path.basename(filePath))
    const availableWebpackOptions = new Set(configFilesPaths)
    return [...availableWebpackOptions.keys()]

}

module.exports = exports = {getConfigFilePaths, getConfigOptions}
