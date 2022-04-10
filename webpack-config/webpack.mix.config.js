// Imports
const mix = require('laravel-mix'),
   path = require('path'),
   { env } = require('./webpack.mix.api'),
   { CleanWebpackPlugin } = require('clean-webpack-plugin');
// Plugins
require('laravel-mix-polyfill'); // babel-js wrapper
require('laravel-mix-imagemin'); // image compressor plugin

const PROJECT_ROOT = env.PROJECT_ROOT; // if project is in / link leave it like '/'
mix.setResourceRoot(PROJECT_ROOT); // define prefix for all URLs

const alias = { // alias => ~alias and @alias
   'scripts': path.join(__dirname, '../source/scripts'),
   'components': path.join(__dirname, '../source/scripts/components'), // @ and ~ can be used in different places 
   'apps': path.join(__dirname, '../source/scripts/apps'),             // select one which don't cause errors
   'images': path.join(__dirname, '../source/assets/images'),
   'fonts': path.join(__dirname, '../source/assets/fonts'),
   'sounds': path.join(__dirname, '../source/assets/sounds'),
   'files': path.join(__dirname, '../source/assets/files'),
};
// name => ~name ans @name
Object.keys(alias).forEach(name => {
   alias['~' + name] = alias['@' + name] = alias[name];
   delete alias[name];
});
mix.alias(alias);

mix.options({
   processCssUrls: true, // replace source links via webpack
   autoprefixer: { // autoprefixer options
      add: true, // add prefixes
      cascade: true, // nested output if not compressed
      flexbox: true, // prefix flexboxes
      grid: 'autoplace', // prefix grids
      supports: true, // prefix @supports
      remove: false, // remove prefixes
   },
   imgLoaderOptions: {
      enabled: true,
      optipng: { // https://github.com/imagemin/imagemin-optipng
         optimizationLevel: 5
      },
      mozjpeg: { // https://github.com/imagemin/imagemin-mozjpeg
         quality: 80, // 0 - 100
         progressive: true,
         smooth: 90, // 0 - 100
      },
      gifsicle: { // https://github.com/imagemin/imagemin-gifsicle
         optimizationLevel: 2, // 1 - 3
         colors: 240, // 2 - 256
      },
      svgo: {}, // https://github.com/imagemin/imagemin-svgo
   },
});


// https://laravel-mix.com/extensions/polyfill
mix.polyfill({ // a.k. babel-js
   enabled: true, // use babel js
   useBuiltIns: "usage", // injection place
   targets: false, // use .browserslist file
   // debug: true, // log selected browsers for JS and CSS
});

// rewrite/extend laravel-mix default webpack settings
mix.webpackConfig({
   module: {
      rules: [
         { // rules to load audio files
            test: /\.(mp3|wav|ogg)$/, // load audio and video directly from vue
            use: [
               {
                  loader: 'file-loader', // file loader - copy and transform files
                  options: {
                     name(absPath, query) { // output path inside of outputPath
                        return absPath.replace(/^.*?source\/assets\/sounds\//, '');
                     },
                     outputPath: 'web/sounds', // base output path of all images
                     publicPath: PROJECT_ROOT + '/web/sounds', // prefix for URLs
                     useRelativePaths: true, // use relative or absolute path
                     esModule: false, // disable load file as module (object) - force return correct URL (string)
                  },
               },
            ]
         },
      ],
   },
   plugins: [
      new CleanWebpackPlugin({ // clean output folder once on start
         cleanOnceBeforeBuildPatterns: [path.join(__dirname, '../web/**/*')],
      }),
   ],
});
