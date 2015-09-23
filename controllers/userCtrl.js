var User    = require('../models/user');
var respond = require('../lib/utils').respond;

exports.create = function(req, res) {
  var username = req.query.username || req.body.username;
  var password = req.query.password || req.body.password;
  var role     = req.query.role || req.body.role;

  User
    .findOne({
      username: username
    })
    .exec(function(err, user) {
      if (err) {
        return respond(req, res, 500, {
          msg: 'DB Internal Error occurs --> Unable to create the user as requested.'
        });
      }
      if (user) {
        return respond(req, res, 409, {
          msg: 'The username has been already taken.'
        });
      } else {
        var newUser = new User({
          username: username,
          role: role
        });
        newUser.passwordHash = newUser.generateHash(password);
        newUser.save(function(err) {
          if (err) {
            console.error(err.stack);
            return respond(req, res, 500, {
              msg: err.message
            });
          }
          return respond(req, res, 200, {
            msg: 'User has been successfully created and saved into the database'
          });
        });
      }
    });
};

exports.get = function(req, res) {
  var query = {};

  User
    .find(query)
    .select('-__v -passwordHash')
    .lean()
    .exec(function(err, users) {
      if (err) {
        console.error(err.stack);
        return respond(req, res, 500, {
          msg: 'DB Internal Error occurs --> Unable to retrieve the message as requested.'
        });
      }
      if (!users || users.length === 0) {
        return respond(req, res, 200);
      }
      return respond(req, res, 200, {
        users: users
      });
    });
};
