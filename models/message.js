var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var msgSchema = new Schema({
  createdAt: Date,
  sentBy: String,
  textMsg: String,
  zipFileUri: String
});

module.exports = mongoose.model('Messages', msgSchema);
