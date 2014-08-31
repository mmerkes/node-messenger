'use strict';

var controller = require('../controllers/devices'),
    util = require('util');

module.exports = function (app) {
  // GET /devices?query_params
  // Get devices based off of query params
  app.get('/devices', controller.getDevices);

  // POST /devices
  // Create a new device or update an existing device and save it to the DB
  app.post('/devices', function (req, res) {
    // Validate data for device
    req.checkBody('device_id', 'Invalid device_id').notEmpty();
    req.checkBody('type', 'Must include a type').notEmpty();
    req.checkBody('push_token', 'Invalid push_token').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
      return res
        .status(400)
        .send({
          status: 'error',
          message: 'There have been validation errors: ' + util.inspect(errors)
        });
    }

    return controller.saveDevice(req, res);
  });

  // GET /devices/:device
  // Get information on a specific device
  app.get('/devices/:device', controller.getDevice);

  // DELETE /devices/:device
  // Delete an existing device
  app.delete('/devices/:device', controller.deleteDevice);

  // GET /devices/:devices/messages
  // Get messages for a specific device
  app.get('/devices/:device/messages', controller.getMessages);
};