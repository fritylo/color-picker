const { isDev, isProd } = require('./webpack-config/webpack.mix.api');
const { js, css, vue, sass, folder } = require('./webpack-config/webpack.mix.types');
require('./webpack-config/webpack.mix.config');


/*
 * GLOBAL SCRIPTS
 */

js('source/scripts/bootstrap-5.1.3.js', 'web/js/bootstrap-5.1.3.js');


/*
 * GLOBAL STYLES
 */

css('source/styles/fonts.css', 'web/css/fonts.css');
css('source/styles/bootstrap-5.1.3.css', 'web/css/bootstrap-5.1.3.css');



/*
 * VIEWS
 */

vue('source/scripts/apps/grid/app.js', 'web/js/grid/index.js');