var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'ta']
  },
  createdAt: Date,
  lastLogins: [
    {
      time: Date,
      loc: String
    }
  ],
  device: {
    os: String,
    id: String
  }
});

module.exports = mongoose.model('Users', userSchema);
