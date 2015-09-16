var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var msgSchema = new Schema({
  createdAt: Date,
  from: String,
  to: String,
  content: {
    audio: [String],
    image: [String],
    text: String
  }
});

module.exports = mongoose.model('Messages', msgSchema);
