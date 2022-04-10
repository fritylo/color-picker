// Imports
const { env } = require('process');

console.log('Mode:', env.NODE_ENV);

const isDev = env.NODE_ENV === 'development';
const isProd = env.NODE_ENV === 'production';

/*
 * CONFIG
 */
/*
 * Recursively merge properties of two objects 
 */
function objectMerge(obj1, obj2) {

   for (var p in obj2) {
      try {
         // Property in destination object set; update its value.
         if (obj1[p].constructor === Object || obj1[p].constructor === Array) {
            obj1[p] = objectMerge(obj1[p], obj2[p]);
         } else {
            obj1[p] = obj2[p];
         }
      }
      catch (e) {
         // Property in destination object not set; create it and set its value.
         obj1[p] = obj2[p];
      }
   }

   return obj1;
}


function ConfigRules () {
   this.find = function (pattern) {
      return Array.prototype.find.call(this, ConfigRules.searchPredicate(pattern));
   };
   this.findIndex = function (pattern) {
      return Array.prototype.find.call(this, ConfigRules.searchPredicate(pattern));
   };

   this.replace = function (pattern, config) {
      objectMerge(this.find(pattern), config);
   };

   this.delete = function (pattern) {
      const i = this.findIndex(pattern);
      delete this[i];
   };
}
ConfigRules.assign = function (rules) {
   return ConfigRules.bind(rules)();
};
ConfigRules.searchPredicate = function (pattern) {
   return rule => String(rule.test).includes(pattern);
};

function Config() {
   ConfigRules.assign(this.module.rules);
}
/**
 * @param {import("webpack").Configuration & {devServer?: import("webpack").WebpackOptionsNormalized["devServer"]}} config
 */
Config.assign = function (config) {
   return Config.bind(config)();
};


function getCircularReplacer() {
   const seen = new WeakSet();
   return (key, value) => {
      if (value instanceof RegExp) {
         return value + '';
      }
      if (typeof value === "object" && value !== null) {
         if (seen.has(value)) {
            return;
         }
         seen.add(value);
      }
      return value;
   };
};
function JSONtoJS(obj) {
   return ('module.exports = ' + JSON.stringify(obj, getCircularReplacer(), 3) + ';')
      .replace(/"(\/.*?\/)",\n/g, '$1,\n')
      .replace(/\\\\/g, '\\')
      .replace(/(\s+)"([^-@~"/]+?)"(:)/g, '$1$2$3');
}
/*
 * CONFIG END
 */
   

module.exports = {
   isDev, isProd, env, Config, JSONtoJS,
};