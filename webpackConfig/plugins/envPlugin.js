const path = require("path");
const Dotenv = require("dotenv-webpack");
const fs = require('fs')


const pathToEnv = path.resolve(__dirname, "..", "..", "env");
const envConfigFileNameRegex = /^\w*\.env$/i;

function loadEnvFile(path, systemvars = false) {
    return new Dotenv({
        path, // load this now instead of the ones in '.env'
        safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
        allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
        systemvars: systemvars, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
        // silent: true, // hide any errors
        defaults: false, // load '.env.defaults' as the default values if empty.
    });
}

function loadSystemEnv() {
    return loadEnvFile(undefined, true)
}

function getEnvFilePaths() {

    let dirContent;

    //load all files in dir
    try {
        dirContent = fs.readdirSync(pathToEnv);
    } catch (e) {
        dirContent = []
    }

    //convert relative paths to absolute paths
    const envConfigFiles = dirContent
        .filter((dir) => envConfigFileNameRegex.test(path.basename(dir)))
        .map((relativePath) => path.resolve(pathToEnv, relativePath));

    const res = {};

    //link paths to their types
    envConfigFiles.forEach((envPath) => {
        const basename = path.basename(envPath).toLowerCase().split(".")[0];
        res[basename] = envPath;
    });


    return res;
}

function loadProjectEnv(env) {
    const envOptions = Object.keys(env || {}).filter((key) => env[key] === true);
    const options = getEnvFilePaths()
    const res = envOptions.map((key) => options[key]).filter((x) => x)
    if (options[""])
        res.unshift(options[""])
    return res.map(loadEnvFile);
}

module.exports = {loadProjectEnv, loadEnvFile, getEnvFilePaths, loadSystemEnv};
