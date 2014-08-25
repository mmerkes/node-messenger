'use strict';

module.exports = {
  compile: function (model, params) {
    var reg, i, length, template;
    template = JSON.stringify(model.template);
    for (i = 0, length = model.params.length; i < length; ++i) {
      reg = new RegExp('{{' + model.params[i] + '}}', 'g');
      template = template.replace(reg, params[model.params[i]] || '');
    }

    return JSON.parse(template);
  }
};

/*
  var model = {
    template: {
      message: 'You received a new message from {{sender}}',
      link: 'messages/{{message_id}}'
    },
    params: [
      'sender',
      'message_id'
    ]
  }

  var req = {
    params: {
      sender: 'Stephen A.',
      message_id: 'asdf123'
    }
  }

  var expected = {
    message: 'You received a new message from Stephen A.',
    link: 'messages/asdf123'
  }
*/