var Message = require('../models/message');
var respond = require('../lib/utils').respond;

exports.create = function(req, res) {
  var message = new Message({
    createdAt: new Date(),
    from: req.body.from,
    to: req.body.to,
    content: {
      audio: req.body.content.audio,
      image: req.body.content.image,
      text: req.body.content.text
    }
  });
  message.save(function(err) {
    if (err) {
      console.error(err.stack);
      return respond(req, res, 500, {
        msg: err.message
      });
    }
    return respond(req, res, 200, {
      msg: 'Message has been successfully created and saved into the database.'
    });
  });
};

exports.get = function(req, res) {
  var query = {};

  Message
    .find(query)
    .select('-__v')
    .lean()
    .exec(function(err, messages) {
      if (err) {
        console.error(err.stack);
        return respond(req, res, 500, {
          msg: 'DB Internal Error occurs --> Unable to retrieve the message as requested.'
        });
      }
      if (!messages || messages.length === 0) {
        return respond(req, res, 200);
      }
      return respond(req, res, 200, {
        messages: messages
      });
    });
};
