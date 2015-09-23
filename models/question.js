var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var questionSchema = new Schema({
  createdAt: Date,
  updatedAt: Date,
  subject: String,
  status: {
    type: String,
    enum: ['open', 'close', 'reopen', 'final', 'cancelled'],
    default: 'open'
  },
  askedBy: String,
  answeredBy: [String],
  tags: [String],
  /**
   * hintType Possible Values
   *
   * 1 - Hint ONLY
   * 2 - Full Solution
   */
  hintType: {
    type: Number
  },
  msgList: [
    {
      time: Date,
      sentBy: String,
      textMsg: String,
      zipFileUri: String
    }
  ]
});

module.exports = mongoose.model('Questions', questionSchema);
