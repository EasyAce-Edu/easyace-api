var Question = require('../models/question');
var respond  = require('../lib/utils').respond;

exports.create = function(req, res) {
  var currentTime = new Date();

  var question = new Question({
    createdAt: currentTime,
    updatedAt: currentTime,
    subject: req.body.subject,
    askedBy: req.body.askedBy,
    msgList: []
  });

  question.msgList.push({
    time: currentTime,
    sentBy: req.body.askedBy,
    textMsg: req.body.MessageDTO.textMsg,
    zipFileUri: req.body.MessageDTO.zipFileUri
  });

  question.save(function(err) {
    if (err) {
      console.error(err.stack);
      return respond(req, res, 500, {
        msg: err.message
      });
    }
    return respond(req, res, 200, {
      msg: 'Message has been successfully created and saved into the database.',
      question: {
        id: question._id
      }
    });
  });
};
