let PROJECT_ROOT; // if project is in / link leave it like '/'

module.exports = async () => {
   const config = await (require('laravel-mix/setup/webpack.config.js'))();

   const { env, Config, JSONtoJS } = require('./webpack-config/webpack.mix.api');
   PROJECT_ROOT = env.PROJECT_ROOT;

   Config.assign(config);

   config.module.rules.replace('(woff2?|ttf|eot|otf)$', {
      use: [
         {
            loader: 'file-loader', // file loader - copy and transform files
            options: {
               name(absPath, query) { // output path inside of outputPath
                  return absPath.replace(/^.*?source\/assets\/fonts\//, '');
               },
               outputPath: 'web/fonts', // base output path of all images
               publicPath: PROJECT_ROOT + '/web/fonts', // prefix for URLs
               useRelativePaths: true, // use relative or absolute path
               esModule: false, // disable load file as module (object) - force return correct URL (string)
            },
         },
      ]
   });

   config.module.rules.replace('(png|jpe?g|gif|webp|avif)$', {
      use: {
         0: {
            loader: 'file-loader', // file loader - copy and transform files
            options: {
               name(absPath, query) { // output path inside of outputPath
                  return absPath.replace(/^.*?source\/assets\/images\//, '');
               },
               outputPath: 'web/images', // base output path of all images
               publicPath: PROJECT_ROOT + '/web/images', // prefix for URLs
               useRelativePaths: true, // use relative or absolute path
               esModule: false, // disable load file as module (object) - force return correct URL (string)
            },
         },
      },
   });
   
   const fs = require('fs');
   const logPath = require('path').join(__dirname, 'webpack-config/webpack.config.log.js'); 
   if (env.IS_LOG_WEBPACK_CONFIG === 'true') {
      fs.writeFileSync(
         logPath,
         JSONtoJS(config)
      );
   }
   else if (env.IS_LOG_WEBPACK_CONFIG === 'false') {
      if (fs.existsSync(logPath) === true) {
         fs.unlinkSync(logPath);
      }
   }
   else {
      console.error('.env - {boolean} IS_LOG_WEBPACK_CONFIG - unexpected value of type "'+ typeof env.IS_LOG_WEBPACK_CONFIG +'"');
   }

   return config;
};