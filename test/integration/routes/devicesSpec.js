'use strict';

var server = require('../../../lib/messenger'),
    chai = require('chai'),
    expect = chai.expect,
    request = require('supertest'),
    url = 'http://localhost:3000',
    mongoose = require('mongoose'),
    Device = mongoose.model('Device');

describe('INTEGRATION /devices', function () {
  describe('GET /devices', function () {
    it('should return a 200', function (done) {
      request(url)
        .get('/devices')
        .expect(200)
        .end(done);
    });
  });

  describe('POST /devices', function () {
    after( function (done) {
      Device.remove({ device_id: 'alskjdfk' }, function (err, numAffected) {
        return done(err);
      });
    });

    it('should return a 400 if missing push_token', function (done) {
      request(url)
        .post('/devices')
        .send({
          device_id: 'alskjdfk',
          type: 'android'
        })
        .expect(400)
        .end(done);
    });

    it('should return a 400 if missing type', function (done) {
      request(url)
        .post('/devices')
        .send({
          device_id: 'alskjdfk',
          push_token: 'alsdjfklasjdfkljaslfj'
        })
        .expect(400)
        .end(done);
    });

    it('should return a 400 if missing device_id', function (done) {
      request(url)
        .post('/devices')
        .send({
          type: 'android',
          push_token: 'alsdjfklasjdfkljaslfj'
        })
        .expect(400)
        .end(done);
    });

    it('should return a 500 if type is unsupported', function (done) {
      request(url)
        .post('/devices')
        .send({
          device_id: 'alskjdfk',
          type: 'fakie',
          push_token: 'alsdjfklasjdfkljaslfj'
        })
        .expect(500)
        .end(done);
    });

    it('should return a 204 if device successfully saved', function (done) {
      request(url)
        .post('/devices')
        .send({
          device_id: 'alskjdfk',
          type: 'android',
          push_token: 'alsdjfklasjdfkljaslfj'
        })
        .expect(201)
        .end(done);
    });
  });
});