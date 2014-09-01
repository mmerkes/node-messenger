'use strict';

module.exports = {
  mongo: {
    development: "mongodb://127.0.0.1:27017/messenger",
    test: process.env.MONGO_URL
  },
  port: {
    development: '3000',
    test: '3000'
  },
  supported_platforms: {
    amazon_fire: false,
    android: true,
    blackberry: false,
    ios: true,
    windows: false
  }
};

module.exports.get = function (key) {
  return this[key][process.env.NODE_ENV || 'development'];
};