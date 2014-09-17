'use strict';

var conf = require('../../config.js'),
    api_key = new Buffer('api:' + conf.api_key).toString('base64');

module.exports = function (req, res, next) {
  if (!req.headers || 
      !req.headers.authorization || 
      req.headers.authorization !== 'Basic ' + api_key) {
    return res.status(401).end();
  }

  return next();
};