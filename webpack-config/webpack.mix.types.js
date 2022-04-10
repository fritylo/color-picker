const mix = require('laravel-mix');
const path = require('path');

function preparePaths(from, to) {
   return [
      path.join(from),
      path.join(to),
   ];
}

/**
 * Defines source and output **JavaScript** file.
 * @param {String} from Path to source file. _E.g. /source/scripts/jquery.js._
 * @param {String} to Path to output file. _E.g. /web/js/jquery.js._
 * @returns Nothing
 */
function js(from, to) {
   [ from, to ] = preparePaths(from, to);
   mix.js(from, to);
}

/**
 * Defines source and output **JavaScript** files for **Vue.js**. Also loads styles to target `.css` file.
 * 
 * _It must be file with `.js` extension, which contains `new Vue` statement._
 * @param {String} from Path to source file. _E.g. /source/scripts/apps/app-name/app.js._
 * @param {String} to Path to output file. _E.g. /web/js/app-name/index.js._
 * @returns Nothing
 */
function vue(from, to) {
   [ from, to ] = preparePaths(from, to);

   let cssToFolder = path.dirname(to).replace('js', 'css'),
       cssToFile = path.basename(to).replace('.js', '.css'),
       cssTo = path.join(cssToFolder, cssToFile);
   
   console.log('extract css to:', cssTo);

   mix.js(from, to).vue({
      version: 2, // defines vue version
      extractStyles: cssTo, // path to target css file for vue styles output
   });
}

/**
 * Defines source and output **SASS or SCSS** file.
 * 
 * _If you need to load **Vue SASS file**, then use `vue(from: string, to: string)`, by loading `app.js` and importing target `.vue` bundle._
 * @param {String} from Path to source file. _E.g. /source/styles/bootstrap.sass._
 * @param {String} to Path to output file. _E.g. /web/css/bootstrap.sass._
 * @returns Nothing
 */
function sass(from, to) {
   [ from, to ] = preparePaths(from, to);
   mix.sass(from, to).sourceMaps(false, 'inline-source-map');
}

/**
 * Defines source and output **CSS** file.
 * 
 * _If you need to load **Vue CSS file**, then use `vue(from: string, to: string)`, by loading app.js and importing target `.vue` bundle._
 * @param {String} from Path to source file. _E.g. /source/styles/bootstrap.css._
 * @param {String} to Path to output file. E.g. _/web/css/bootstrap.css._
 * @returns Nothing
 */
function css(from, to) {
   [ from, to ] = preparePaths(from, to);
   mix.css(from, to);
}

/**
 * Simply copy folder with all of it content from one place to another.
 * @param {String} from Path to source folder. _E.g. /source/videos._
 * @param {String} to Path to output folder. _E.g. /web/videos._
 * @returns Nothing
 */
function folder(from, to) {
   [ from, to ] = preparePaths(from, to);
   mix.copyDirectory(from, to);
}

module.exports = {
   js, css, sass, vue, folder
};