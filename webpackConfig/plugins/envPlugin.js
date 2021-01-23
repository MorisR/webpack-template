const path = require("path");
const Dotenv = require("dotenv-webpack");
const fs = require("fs");
const readDirRecursive = require("fs-readdir-recursive");


const loadingSystemEnvPath = path.resolve(__dirname, "doNotRemoveThisFile.txt");
const pathToEnvDir = path.resolve(__dirname, "..", "..", "env");
const pathToEnvWebpackConfigDir = path.resolve(__dirname, "..");
const pathToProjectDir = path.resolve(__dirname, "..", "..");


const envConfigFileNameRegex = /(^\w*\.env$)|(^\.env\.\w*$)/i;


function loadEnvFile(path,) {
    return new Dotenv({
        path, // load this now instead of the ones in '.env'
        safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
        allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
        // silent: true, // hide any errors
        defaults: false, // load '.env.defaults' as the default values if empty.
    });
}

function loadSystemEnv() {
    return new Dotenv({
        path: loadingSystemEnvPath,
        systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
    })
}

/**@return {Map<string,string[]>} paths of all env files in specific directories filtered by name*/
function getExistingEnvFilePaths() {

    let dirContent = [];

    //load all files in "env" dir
    try {
        const absolutePaths = fs
            .readdirSync(pathToEnvDir)
            .map(relativePath => path.resolve(pathToEnvDir, relativePath))
        dirContent.push(...absolutePaths);

    } catch (e) {
    }

    //load all files in project dir
    try {
        const absolutePaths = fs
            .readdirSync(pathToProjectDir)
            .map(relativePath => path.resolve(pathToProjectDir, relativePath))
        dirContent.push(...absolutePaths);
    } catch (e) {
    }

    //load all files in project dir
    try {
        const absolutePaths = readDirRecursive(pathToEnvWebpackConfigDir, () => true)
            .map(relativePath => path.resolve(pathToEnvWebpackConfigDir, relativePath))
        dirContent.push(...absolutePaths);
    } catch (e) {
    }


    const res = new Map();

    dirContent
        //remove irrelevant paths
        .filter((dir) => envConfigFileNameRegex.test(path.basename(dir)))
        //load matching types
        .forEach(envPath => {
            const envOption = path
                .basename(envPath)
                .toLowerCase()
                .split(".")
                .filter(x => x && x !== "env")[0] || "";


            if (res.has(envOption)) res.get(envOption).add(envPath)
            else res.set(envOption, [envPath])
        })

    return res;
}

function loadProjectEnv(env = {}) {

    //get webpack env object keys
    const webpackEnvOptions = Object.keys(env)
        //filter out the boolean options with the value of true ( and remove falsy keys)
        .filter((key) => key && env[key] === true)
        .map(key => key.toLowerCase())
    webpackEnvOptions.unshift("")

    const existingEnvPathsSet = getExistingEnvFilePaths();
    const pathsToEnvFiles = [];

    // get all .env paths to load
    webpackEnvOptions.forEach(key => {
        if (existingEnvPathsSet.has(key))
            pathsToEnvFiles.push(...existingEnvPathsSet.get(key))
    })

    console.log('---------------------------------------------')
    console.log('loaded .env files')
    console.log(pathsToEnvFiles)
    return pathsToEnvFiles.map(loadEnvFile);

}

module.exports = {loadProjectEnv, loadSystemEnv};
