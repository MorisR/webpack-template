module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2017, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        }
    },
    settings: {
        react: {
            version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    },
    extends: [
        "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
    ],
    rules: {
        "react/jsx-uses-vars": "error",
        "react/jsx-no-duplicate-props": "error",
        "react/jsx-no-target-blank":"warn",
        "react/jsx-pascal-case":"error",
        "react-hooks/exhaustive-deps": 'off',
        "@typescript-eslint/ban-ts-comment":"off"
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    },
    env: {
        browser: true,
        es2017: true,
        worker: true,
        serviceworker: true,
        jest: true,
        node: true,
        commonjs: true,
        "shared-node-browser": true
    }
};
