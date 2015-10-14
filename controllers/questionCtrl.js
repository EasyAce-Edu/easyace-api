var Question = require('../models/question');
var respond  = require('../lib/utils').respond;

var _        = require('lodash');

exports.set = function(req, res) {
  if (!req.query.id || !req.query.status || !req.query.taid) {
    return respond(req, res, 400, {
      msg: 'One of the required parameters is missing.'
    });
  }

  Question
    .findOne({
      _id: req.query.id
    })
    .exec(function(err, question) {
      if (err) {
        console.error(err.stack);
        return respond(req, res, 500, {
          msg: err.message
        });
      }

      if (!question) {
        return respond(req, res, 400, {
          msg: 'Unable to find any questions that match question id.'
        });
      }

      question.status = req.query.status;
      question.answeredBy = req.query.taid;
      question.save(function(err) {
        if (err) {
          console.error(err.stack);
          return respond(req, res, 500, {
            msg: err.message
          });
        }
        return respond(req, res, 500, {
          msg: 'The status of target question has been successfully changed to ' + req.query.status
        });
      });
    });
};

exports.create = function(req, res) {
  var currentTime = new Date();

  var question = new Question({
    createdAt: currentTime,
    updatedAt: currentTime,
    subject: req.body.subject,
    askedBy: req.body.askedBy,
    hintType: req.body.hintType || 1,
    msgList: []
  });

  question.msgList.push({
    time: currentTime,
    sentBy: req.body.askedBy,
    textMsg: req.body.messageDTO.textMsg,
    zipFileUri: req.body.messageDTO.zipFileUri
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

exports.get = function(req, res) {
  var query = {};

  if (!_.isEmpty(req.query.id)) query._id = req.query.id;
  if (!_.isEmpty(req.query.status)) query.status = req.query.status;
  if (!_.isEmpty(req.query.askedBy)) query.askedBy = req.query.askedBy;
  if (!_.isEmpty(req.query.answeredBy)) query.answeredBy = req.query.answeredBy;

  Question
    .find(query)
    .select('-__v -tags')
    .lean()
    .exec(function(err, questions) {
      if (err) {
        console.error(err.stack);
        return respond(req, res, 500);
      }

      if (!questions || questions.length === 0) {
        return respond(req, res, 200);
      }

      return respond(req, res, 200, questions);
    });
};
