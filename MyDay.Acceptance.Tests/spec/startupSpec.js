'use strict';

var HomePage = require('../automation/HomePage.js');

describe('Application', function(){
    it('Should have correct title', function(){
        var homePage = new HomePage();
        homePage.get();
        expect(homePage.title()).toEqual('My Day');
    });
});