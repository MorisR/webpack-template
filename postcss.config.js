const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
    plugins: [
        require('autoprefixer'),
        // postcssPresetEnv(),
        "postcss-font-magician"
    ]
};
