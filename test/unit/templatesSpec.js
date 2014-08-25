'use strict';

var chai = require('chai'),
    expect = chai.expect,
    templates = require('../../lib/templates');

describe('UNIT templates.js', function () {
  describe('#compile()', function () {
    var compile, model, params, expected;
    compile = templates.compile;
    model = {
      template: {
        message: 'You received a new message from {{sender}}',
        link: 'messages/{{message_id}}'
      },
      params: [
        'sender',
        'message_id'
      ]
    };

    it('should return a template with arguments inserted', function () {
      expected = { 
        message: 'You received a new message from Stephen A.',
        link: 'messages/asdf123' 
      };
      params = {
        sender: 'Stephen A.',
        message_id: 'asdf123'
      };

      var message = compile(model, params);
      expect(message).to.deep.equal(expected);
    });

    it('should insert an empty string if parameter is undefined', function () {
      expected = { 
        message: 'You received a new message from ',
        link: 'messages/asdf123' 
      };
      params = {
        message_id: 'asdf123'
      }

      var message = compile(model, params);
      expect(message).to.deep.equal(expected);
    });

    it('should only insert arguments specified with curly brackets', function () {
      expected = { 
        message: 'You received a new message from Stephen A.',
        link: 'messages/asdf123' 
      };
      params = {
        sender: 'Stephen A.',
        message_id: 'asdf123',
        recipient: 'Paul B.'
      };

      var message = compile(model, params);
      expect(message).to.deep.equal(expected);
    });
  });
});