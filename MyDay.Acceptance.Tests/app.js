var configFile = 'protractor.conf.js';
if(process.env.config && process.env.config !== 'Debug'){
    configFile = 'protractor.' + process.env.config.toLowerCase() + '.conf.js';
}

require('./node_modules/protractor/lib/launcher.js').init(configFile);