'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Model = new Schema({
  name: { type: String, required: true, unique: true, index: true }, // Name of model, used for searching
  template: { type: Object, required: true }, // Object serving as template for model
  params: [String], // Array of string parameter keys
  description: String // Description of the model
});

mongoose.model('Model', Model);