'use strict';

var mongoose = require('mongoose'),
    Device = mongoose.model('Device');

// module.exports.getDevices = function (req, res) {
//   console.log('Getting devices');
//   res.status(200).end();
// };

module.exports.saveDevice = function (req, res) {
  console.log('Saving device');
  var update = {
    device_id: req.body.device_id,
    type: req.body.type,
    push_token: req.body.push_token
  };

  if (req.body.user_id) {
    update.user_id = req.body.user_id;
  }

  var device = new Device(update);

  device.validate( function (err) {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .send({
          status: 'error',
          message: err
        });
    }

    Device.update({ device_id: req.body.device_id }, update, { upsert: true }, 
      function (err) {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .send({
              status: 'error',
              message: err
            });
        }

        return res.status(201).end();
      });
  });
};

module.exports.getDevice = function (req, res) {
  console.log('Getting device %s', req.params.device);
  Device.findOne({ device_id: req.params.device }, function (err, device) {
    if (err) {
      return res
        .status(500)
        .send({
          status: 'error',
          message: err
        });
    }

    if (device) {
      return res
        .status(200)
        .send({
          status: 'success',
          data: device
        });
    } 

    return res
      .status(404)
      .send({
        status: 'error',
        message: 'Device ' + req.params.device + ' could not be found.'
      });
  });
};

module.exports.deleteDevice = function (req, res) {
  console.log('Deleting device %s', req.params.device);
  Device.remove({ device_id: req.params.device }, function (err, numAffected) {
    if (err) {
      return res
        .status(500)
        .send({
          status: 'error',
          message: err
        });
    }

    if (numAffected) {
      return res.status(204).end();
    } else {
      return res
        .status(404)
        .send({
          status: 'error',
          message: 'Device ' + req.params.device + ' could not be found.'
        });
    }
  });
};

// module.exports.getMessages = function (req, res) {
//   console.log('Getting messages for %s', req.params.device);
// };