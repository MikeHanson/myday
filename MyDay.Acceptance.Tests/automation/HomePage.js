'use strict';

module.exports = function(){
    this.get = function(){
        browser.get('/#Home');
    };
    this.title = function(){
        return browser.getTitle();
    };
};