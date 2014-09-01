'use strict';

var chai = require('chai'),
    expect = chai.expect;

module.exports = function (chai) {
  var Assertion = chai.Assertion;

  // Check for standard api response JSON
  // i.e. expect(res).to.have.property('body').that.is.an.apiResponseJSON('success');
  Assertion.addMethod('apiResponseJSON', function (code) {
    var response = this._obj;
    expect(response).to.be.an('object');
    expect(response).to.have.property('status');
    if (code) {
      expect(response.status).to.equal(code);
      if (code === 'error') {
        expect(response).to.have.property('message');
      }
    }
  }); 

  // Check for valid _id
  Assertion.addProperty('_id', function () {
    var _id = this._obj,
        reg = /^[0-9a-f]{1,24}$/;
    if (typeof _id === 'object') {
      _id = _id.toHexString();
    }
    expect(reg.test(_id)).to.be.ok;
  });

  Assertion.addProperty('deviceJSON', function () {
    var device = this._obj;

    expect(device).to.be.an('object');
    expect(device._id).to.exist.and.be.an._id;
    expect(device.device_id).to.exist.and.be.a('string');
    if (device.user_id) {
      expect(device.user_id).to.be.a('string');
    }
    expect(device.type).to.exist.and.be.a('string');
    expect(device.push_token).to.exist.and.be.a('string');
    expect(device.dateAdded).to.exist.and.be.a('string');
  });
};