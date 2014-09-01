'use strict';

require('../../../lib/schemas/device');

var chai = require('chai'),
    expect = chai.expect,
    api_assertions = require('../../lib/customChaiAssertions'),
    mongoose = require('mongoose'),
    Device = mongoose.model('Device'),
    controller = require('../../../lib/controllers/devices');

chai.use(api_assertions);

describe('UNIT Devices Controller', function () {
  describe('#saveDevice()', function () {
    var restore = {};

    before( function () {
      restore.update = Device.update;
      restore.validate = mongoose.Model.prototype.validate;
    });

    after( function () {
      Device.update = restore.update;
      mongoose.Model.prototype.validate = restore.validate;
    });

    it('should send a 500 if Mongoose errors on saving of device', function () {
      var req = {
        body: {
          device_id: 'alskjdfk',
          type: 'android',
          push_token: 'alsdjfklasjdfkljaslfj'
        }
      };
      var res = {
        status: function (code) {
          this.code = code;
          return this;
        },
        send: function (data) {
          this.data = data;
        }
      };
      Device.update = function (query, update, options, callback) {
        return callback('Oopsies!');
      };
      mongoose.Model.prototype.validate = function (callback) {
        return callback();
      };

      controller.saveDevice(req, res);
      expect(res.code).to.equal(500);
      expect(res.data).to.be.an.apiResponseJSON('error');
    });
  });

  describe('#getDevice()', function () {
    var restore = {};

    before( function () {
      restore.findOne = Device.findOne;
    });

    after( function () {
      Device.findOne = restore.findOne;
    });

    it('should send a 500 if Mongoose errors on retrieving device from db', function () {
      var req = {
        params: {
          device: 'aslfdjklasjf'
        }
      };
      var res = {
        status: function (code) {
          this.code = code;
          return this;
        },
        send: function (data) {
          this.data = data;
        }
      };
      Device.findOne = function (query, callback) {
        return callback('Oopsies!');
      };

      controller.getDevice(req, res);
      expect(res.code).to.equal(500);
      expect(res.data).to.be.an.apiResponseJSON('error');
    });
  });

  describe('#deleteDevice()', function () {
    var restore = {};

    before( function () {
      restore.remove = Device.remove;
    });

    after( function () {
      Device.remove = restore.remove;
    });

    it('should send a 500 if Mongoose errors on removal of device', function () {
      var req = {
        params: {
          device: 'aslfdjklasjf'
        }
      };
      var res = {
        status: function (code) {
          this.code = code;
          return this;
        },
        send: function (data) {
          this.data = data;
        }
      };
      Device.remove = function (query, callback) {
        return callback('Oopsies!');
      };

      controller.deleteDevice(req, res);
      expect(res.code).to.equal(500);
      expect(res.data).to.be.an.apiResponseJSON('error');
    });
  });
});