var extend = require('util')._extend;
var defaults = require('./protractor.conf.js').config;
var newConfig = extend({}, defaults);
newConfig.baseUrl = 'http://myday.nodejitsu.com';
exports.config = newConfig;