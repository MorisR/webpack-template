/*
load sass files
add .module.{css|sass|scss} support
add .global.{css|sass|scss} support
add .lazy.{css|sass|scss} support
add .inj.{css|sass|scss} support - inline css
add .tag.{css|sass|scss} support - tag css
* todo: install postcss (?)
*     - setup browserlist
*     - setup plugins + plugins options
* todo: install dist-sass to make compilation faster
* todo: install "mini-css-extract-plugin"
* todo: add css "hot" support
* todo:
* todo: skip typescript type checking in production build (package)
* todo: add babel autoprefixer or setup typescript settings
* todo: setup browserlist for postcss/babel/ts
* todo:
* todo: there's a package that generates supported images for android/ios/web/favicon
*       find it and link it to *.[multi|support].[imgExt]
* todo: convert images with "*.inj.svg" within 'em to html tags (in .d.ts)
* todo:
* todo: html-webpack-plugin package extensions
* todo: add favicon
* todo: convert an image to favicon via file name
* todo:
* todo: setup lazy import components wrapper
* todo: setup lazy loading components ( maybe integrate into component name *.lazy.tsx )
* todo: setup chunks optimization ( sizes, names, etc...)
* todo: add build optimizations/ improve performance ( reduce build time)
* todo: add chunks report package
* todo:
* todo:
load webpack config based on cli "env" variable + all files with this structure webpack.[env].js
add "--env sourcemap" to enable sourcemaps
* todo: browserList support + ts target ( maybe link to cli param)
* todo: resolve console logs in browser
* todo: show overlay errors
* todo: find a prettier cli logger for webpack builds
* todo: add webpack global packages/variables
* todo: cashing vs service worker cashing
* todo: setup service worker
* todo:
* todo: add testing webpack config
* todo: add testing package ( *.test.ts )
* todo: skip testing files from other builds ( maybe add *.ignore.ts )
* todo: add package.json scripts
* todo:
* todo: add storybook webpack config
* todo: add storybook package ( *.storybook.ts )
* todo: skip storybook files from other builds
* todo: add package.json scripts
* todo:
* todo: setup linter
* todo: add package.json scripts
* todo:
* todo: setup prettier
* todo:
* todo: setup service worker builder script
* todo: link cashing method to file name ( chink em all together? )
* todo: setup push notifications
* todo:
* todo:
* todo: add a script that upgrades all packages
* todo: add a template that opts out of testing
* todo: add a template that opts out of storybook
* todo: add a template that opts out of linter
* todo: add a template that opts out of serviceWorker
*
* todo: configure/optimize clean-webpack-plugin
* todo: setup gzip-loader
* todo: setup metalanguage support(i18n-loader)
* todo: setup thread-loader/worker-loader
*
* todo: go over sass documentation
* todo: go over ts documentation
* todo: go over tsconfig.js available settings
* todo: document template and all it's features
* todo: create an NPX command tht clones th template
* todo: check resource query and what it is used for + best file name
*   https://github.com/webpack/loader-utils#interpolatename
*   https://stackoverflow.com/questions/59194365/webpack-4-hash-and-contenthash-and-chunkhash-when-to-use-which
*   - css, resources, js/jsx/ts/tsx files, chunks,
* */
