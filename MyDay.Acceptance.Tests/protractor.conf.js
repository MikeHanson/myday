exports.config = {
    specs: ['spec/*.js'],
    baseUrl: 'http://localhost:1333',
    jasmineNodeOpts: {
        showColors: true,
        silent: true
    },
    onPrepare: function(){
        var specReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(new specReporter({ displayStacktrace: false }));

        require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter('results/', true, true));

        var htmlReporter = require('protractor-html-screenshot-reporter');
        jasmine.getEnv().addReporter(new htmlReporter({ baseDirectory: 'screenshots' }));
    },
    afterLaunch: function(){
        var path = __dirname + '\\screenshots\\report.html';
        var opener = require('opener');
        opener(path);
        for(var i = 0; i < 200; i++){
            console.log('.');
            // need to let opener finish
            // ugly but simplest thing I could get working
        }
    }
}