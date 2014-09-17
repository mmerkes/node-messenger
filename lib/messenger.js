'use strict';

var express = require('express'),
    app = express(),
    conf = require('../config'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    api_authentication = require('./utils/api_authentication'),
    fs = require('fs'),
    mongoose = require('mongoose');

console.log(conf.get('mongo'));
mongoose.connect(conf.get('mongo'));

app.use(bodyParser.json());
app.use(expressValidator([]));

// Do basic authentication on each route
app.use(api_authentication);

// Load Mongoose Schemas
function walk(path) {
  fs.readdirSync(path).forEach( function (file) {
    var newPath = path + '/' + file;
    var stat = fs.statSync(newPath);
    if (stat.isFile()) {
      console.log('Loading %s module', file);
      require(newPath);
    } else {
      walk(newPath);
    }
  });
}

var schemas = __dirname + '/schemas';
walk(schemas);

// Load Express routes
function walkRoutes(path) {
  fs.readdirSync(path).forEach( function (file) {
    var newPath = path + '/' + file;
    var stat = fs.statSync(newPath);
    if (stat.isFile()) {
      console.log('Loading %s module', file);
      require(newPath)(app);
    } else {
      walk(newPath);
    }
  });
}

var routes = __dirname + '/routes';
walkRoutes(routes);

var server = app.listen(conf.get('port'), function() {
  console.log('Listening on port %d', server.address().port);
  server.emit('ready');
});

module.exports = server;