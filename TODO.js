/*

css-----------------------------------------------------------------------------------------
load sass files
add .module.{css|sass|scss} support - by default it's module
add .global.{css|sass|scss} support
add .lazy.{css|sass|scss} support
install "mini-css-extract-plugin"
* todo: install postcss (?)
*     - setup browserlist
*     - setup plugins + plugins options
* todo: install dist-sass to make compilation faster
* todo: add css "hot" support


typescript-----------------------------------------------------------------------------------------
skip typescript type checking in production build (package)
* todo: add babel autoprefixer or setup typescript settings
* todo: convert images with "*.inj.svg" within 'em to html tags (in .d.ts)
* todo: use babel to load typescript

images---------------------------------------------------------------------------------------------
* todo: there's a package that generates supported images for android/ios/web/favicon
*       find it and link it to *.[multi|support].[imgExt]

html-----------------------------------------------------------------------------------------------
* todo: html-webpack-plugin package extensions
* todo: add favicon
* todo: convert an image to favicon via file name

performance-----------------------------------------------------------------------------------------
* todo: setup lazy import components wrapper
* todo: setup lazy loading components ( maybe integrate into component name *.lazy.tsx )
* todo: setup chunks optimization ( sizes, names, etc...)
* todo: add build optimizations/ improve performance ( reduce build time)
* todo: add chunks report package
* todo: setup chunk names + output resources dir's (css/js/resources)
load webpack config based on cli "env" variable + all files with this structure webpack.[env].js
add "--env sourcemap" to enable sourcemaps
* todo: configure/optimize clean-webpack-plugin
* todo: setup gzip-loader
* todo: setup browserlist for postcss/babel/ts (maybe load em from a single source)
* todo: set output dir of all resources
* todo: use "swc" at development time to make builds faster


environment variables---------------------------------------------------------------------------------
https://webpack.js.org/guides/environment-variables/
https://github.com/mrsteele/dotenv-webpack
https://webpack.js.org/plugins/environment-plugin/
load env variables based on config types (e.g. .env / dev.emv / production.env)
* todo: add webpack global packages/variables (util)

debug mode--------------------------------------------------------------------------------------------
* todo: resolve console logs in browser
* todo: show overlay errors
* todo: find a prettier cli logger for webpack builds (linter?)
* todo: add support for --silent logging across all plugins/loaders

service worker----------------------------------------------------------------------------------------
* todo: cashing vs service worker cashing
* todo: setup service worker
* todo: setup service worker builder script
* todo: link cashing method to file name ( chink em all together? )
* todo: setup push notifications
* todo:  - allow modifying the service worker caching method with "lazy loader wrapper" or via manifest/settings json file
* todo: add a script that opts out of serviceWorker

add other packages-------------------------------------------------------------------------------------

------testing------
* todo: add testing webpack config
* todo: add testing package ( *.test.ts )
* todo: skip testing files from other builds ( maybe add *.ignore.ts )
* todo: add package.json scripts
* todo: add a script that opts out of testing

------storybook------
* todo: add storybook webpack config
* todo: add storybook package ( *.storybook.ts )
* todo: skip storybook files from other builds
* todo: add package.json scripts
* todo: add a script that opts out of storybook

------linter------
https://www.npmjs.com/package/fork-ts-checker-webpack-plugin#eslint-options
https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project
setup linter
* todo: configure typescript linter rules https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
* todo: setup eslint logging level
* todo: add a script that opts out of linter

------prettier------
* todo: setup prettier
* todo: add a script that opts out of prettier


------multi language support------
* todo: setup metalanguage support(i18n-loader)
* todo: setup thread-loader/worker-loader
* todo: add a script that opts out of multi language support


research needed-------------------------------------------------------------------------------------------
* todo: go over available webpack plugins in webpack documentation
* todo: go over sass documentation
* todo: go over ts documentation
* todo: go over tsconfig.js available settings
* todo: document template and all it's features
* todo: create an NPX command tht clones th template
* todo: add a script that upgrades all packages
* todo: check resource query and what it is used for + best file name
*   https://github.com/webpack/loader-utils#interpolatename
*   https://stackoverflow.com/questions/59194365/webpack-4-hash-and-contenthash-and-chunkhash-when-to-use-which
*   - css, resources, js/jsx/ts/tsx files, chunks,
*
*/
