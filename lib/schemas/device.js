'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    supported = require('../../config').supported_platforms;

var Device = new Schema({
  device_id: { type: String, required: true, unique: true, index: true },
  user_id: { type: String, index: true, sparse: true },
  type: { type: String, required: true },
  push_token: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now }
});

Device.path('type').validate( function (type) {
  return supported[type] === true;
});

mongoose.model('Device', Device);