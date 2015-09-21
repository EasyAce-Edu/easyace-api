var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/user');

module.exports = function(passport) {
  passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordFeild: 'password',
    passReqToCallback: true
  }, function(req, username, password, done) {
    User
      .findOne({
        username: username
      })
      .exec(function(err, user) {
        if (err) return done(err);

        if (!user) {
          return done(null, false);
        }

        if (!user.isValidPassword(password)) {
          return done(null, false);
        }

        return done(null, user);
      });
  }));
};
