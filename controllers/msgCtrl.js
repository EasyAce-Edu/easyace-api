var Message = require('../models/msgModel');

exports.create = function(req, res){
  console.dir(req.body);
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
  message.save(function(err){
    if (err) {
      console.error(err.stack);
      return res.status(400).json({
        data: {
          msg: 'Unable to create a new message.'
        }
      });
    }
    return res.status(200).json({
      status: {
        code: 0,
        msg: 'Success'
      },
      data: {
        msg: 'Message has been successfully created.'
      }
    });
  });
};

exports.get = function(req, res) {
  Message
    .find({})
    .exec(function(err, messages){
      if (err) {
        console.error(err.stack);
        return res.status(400).end();
      }
      if (!messages || messages.length === 0) {
        return res.status(200).end();
      }
      return res.status(200).json({
        data: {
          messages: messages
        }
      });
    });
};
