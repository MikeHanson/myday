'use strict';

var express = require('express');
var serveStatic = require('serve-static');

var app = express();
var port = process.env.port || process.env.PORT || 3000;

app.set('port', port);

app.use(serveStatic('static'));

app.listen(port, function(){
  console.log('Express server listening on port ' + port);
});