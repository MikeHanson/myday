'use strict';

describe('Server', function(){
    var module,
        appWasInitialised,
        expressMock,
        appMock,
        serveStaticMock,
        staticContentPath,
        middlewareFunction;
    var modulePath = '../../MyDay/server.js';
    var mockery = require('mockery');

    beforeEach(function(){
        appMock = jasmine.createSpyObj('app', ['set', 'listen', 'use']);
        expressMock = function(){
            appWasInitialised = true;
            return appMock;
        };
        middlewareFunction = function(){
        };
        serveStaticMock = function(path){
            staticContentPath = path;
            return middlewareFunction;
        };
        mockery.enable({ useCleanCache: true });
        mockery.registerMock('express', expressMock);
        mockery.registerMock('serve-static', serveStaticMock);
        mockery.registerAllowable(modulePath);
    });

    afterEach(function(){
        mockery.deregisterAll();
        mockery.disable();
    });

    it('Should be defined', function(){
        assumeModuleIsLoaded();
        expect(module).toBeDefined();
    });

    it('Should initialise express application', function(){
        assumeModuleIsLoaded();
        expect(appWasInitialised).toBeDefined();
        expect(appWasInitialised).toBe(true);
    });

    it('Should default to running application on port 3000', function(){
        delete process.env.PORT;
        assumeModuleIsLoaded();
        expect(appMock.set).toHaveBeenCalledWith('port', 3000);
    });

    it('Should use environment variable for port if set', function(){
        process.env.PORT = 1333;
        assumeModuleIsLoaded();
        expect(appMock.set).toHaveBeenCalledWith('port', '1333');
    });

    it('Should start the application listening for requests', function(){
        process.env.PORT = 1333;
        assumeModuleIsLoaded();
        expect(appMock.listen).toHaveBeenCalledWith('1333', jasmine.any(Function));
    });

    it('Should log to console when server startup completes', function(){
        process.env.PORT = 1333;
        spyOn(console, 'log');
        assumeModuleIsLoaded();
        appMock.listen.calls[0].args[1]();
        expect(console.log).toHaveBeenCalledWith('Express server listening on port 1333');
    });

    it('Should initialise static content middleware', function(){
        assumeModuleIsLoaded();
        expect(staticContentPath).toBe('static');
    });

    it('Should configure application to use static content middleware', function(){
        assumeModuleIsLoaded();
        expect(appMock.use).toHaveBeenCalledWith(middlewareFunction);
    });

    function assumeModuleIsLoaded(){
        module = require(modulePath);
    }
});