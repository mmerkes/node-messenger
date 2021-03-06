'use strict';

var server = require('../../../lib/messenger'),
    chai = require('chai'),
    expect = chai.expect,
    api_assertions = require('../../lib/customChaiAssertions'),
    request = require('supertest'),
    url = 'http://localhost:3000',
    mongoose = require('mongoose'),
    Device = mongoose.model('Device'),
    conf = require('../../../config'),
    api_key = new Buffer('api:' + conf.api_key).toString('base64');

chai.use(api_assertions);

describe('INTEGRATION /devices', function () {
  describe.skip('GET /devices', function () {
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

    it('should require authentication', function (done) {
      request(url)
        .post('/devices')
        .send({
          device_id: 'alskjdfk',
          type: 'android'
        })
        .expect(401)
        .end(done);
    });

    it('should return a 400 if missing push_token', function (done) {
      request(url)
        .post('/devices')
        .set('Authorization', 'Basic ' + api_key)
        .send({
          device_id: 'alskjdfk',
          type: 'android'
        })
        .expect(400)
        .end( function (err, res) {
          expect(res.status).to.equal(400); // TEMP
          expect(res).to.have.property('body').that.is.an.apiResponseJSON('error');
          return done();
        });
    });

    it('should return a 400 if missing type', function (done) {
      request(url)
        .post('/devices')
        .set('Authorization', 'Basic ' + api_key)
        .send({
          device_id: 'alskjdfk',
          push_token: 'alsdjfklasjdfkljaslfj'
        })
        .expect(400)
        .end( function (err, res) {
          expect(res.status).to.equal(400); // TEMP
          expect(res).to.have.property('body').that.is.an.apiResponseJSON('error');
          return done();
        });
    });

    it('should return a 400 if missing device_id', function (done) {
      request(url)
        .post('/devices')
        .set('Authorization', 'Basic ' + api_key)
        .send({
          type: 'android',
          push_token: 'alsdjfklasjdfkljaslfj'
        })
        .expect(400)
        .end( function (err, res) {
          expect(res.status).to.equal(400); // TEMP
          expect(res).to.have.property('body').that.is.an.apiResponseJSON('error');
          return done();
        });
    });

    it('should return a 400 if type is unsupported', function (done) {
      request(url)
        .post('/devices')
        .set('Authorization', 'Basic ' + api_key)
        .send({
          device_id: 'alskjdfk',
          type: 'fakie',
          push_token: 'alsdjfklasjdfkljaslfj'
        })
        .expect(400)
        .end( function (err, res) {
          expect(res.status).to.equal(400); // TEMP
          expect(res).to.have.property('body').that.is.an.apiResponseJSON('error');
          return done();
        });
    });

    it('should return a 204 if device successfully saved', function (done) {
      request(url)
        .post('/devices')
        .set('Authorization', 'Basic ' + api_key)
        .send({
          device_id: 'alskjdfk',
          type: 'android',
          push_token: 'alsdjfklasjdfkljaslfj'
        })
        .expect(201)
        .end(done);
    });

    it('should allow user_id to be specified', function (done) {
      request(url)
        .post('/devices')
        .set('Authorization', 'Basic ' + api_key)
        .send({
          device_id: 'alskjdfk',
          type: 'android',
          push_token: 'alsdjfklasjdfkljaslfj',
          user_id: 'good user'
        })
        .expect(201)
        .end(done);
    });

    it('should allow group_id to be specified', function (done) {
      request(url)
        .post('/devices')
        .set('Authorization', 'Basic ' + api_key)
        .send({
          device_id: 'alskjdfk',
          type: 'android',
          push_token: 'alsdjfklasjdfkljaslfj',
          user_id: 'good user',
          group_id: 'my group'
        })
        .expect(201)
        .end(done);
    });
  });

  describe('GET /devices/:device', function () {
    var device = {
      device_id: 'alskjdfk',
      type: 'android',
      push_token: 'alsdjfklasjdfkljaslfj'
    };

    before( function (done) {
      request(url)
        .post('/devices')
        .set('Authorization', 'Basic ' + api_key)
        .send(device)
        .expect(201)
        .end(done);
    });

    after( function (done) {
      Device.remove({ device_id: device.device_id }, function (err) {
        return done(err);
      });
    });

    it('should require authentication', function (done) {
      request(url)
        .get('/devices/' + device.device_id)
        .expect(401)
        .end(done);
    });

    it('should send a 200 if device was successfully found', function (done) {
      request(url)
        .get('/devices/' + device.device_id)
        .set('Authorization', 'Basic ' + api_key)
        .expect(200)
        .end( function (err, res) {
          expect(res.status).to.equal(200); // TEMP
          expect(res).to.have.property('body').that.is.an.apiResponseJSON('success');
          expect(res.body.data).to.be.a.deviceJSON;
          return done();
        });
    });

    it('should send a 404 if device could not be found', function (done) {
      request(url)
        .get('/devices/aaaaaaaaaaaa')
        .set('Authorization', 'Basic ' + api_key)
        .expect(404)
        .end( function (err, res) {
          expect(res.status).to.equal(404); // TEMP
          expect(res).to.have.property('body').that.is.an.apiResponseJSON('error');
          return done();
        });
    });
  });

  describe('DELETE /devices/:device', function () {
    var device = {
      device_id: 'alskjdfk',
      type: 'android',
      push_token: 'alsdjfklasjdfkljaslfj'
    };

    before( function (done) {
      request(url)
        .post('/devices')
        .set('Authorization', 'Basic ' + api_key)
        .send(device)
        .expect(201)
        .end(done);
    });

    after( function (done) {
      Device.remove({ device_id: device.device_id }, function (err) {
        return done(err);
      });
    });

    it('should require authentication', function (done) {
      request(url)
        .del('/devices/' + device.device_id)
        .expect(401)
        .end(done);
    });

    it('should send a 204 if device successfully deleted', function (done) {
      request(url)
        .del('/devices/' + device.device_id)
        .set('Authorization', 'Basic ' + api_key)
        .expect(204)
        .end(done);
    });

    it('should send a 404 if device does not exist', function (done) {
      request(url)
        .del('/devices/aaaaaaaaaaaa')
        .set('Authorization', 'Basic ' + api_key)
        .expect(404)
        .end( function (err, res) {
          expect(res.status).to.equal(404); // TEMP
          expect(res).to.have.property('body').that.is.an.apiResponseJSON('error');
          return done();
        });
    });
  });
});