var fs       = require('fs');
var path     = require('path');
var passport = require('passport');
var express  = require('express');
var app      = express();

// http server global configuration
var http     = require('http');
var respond  = require('./lib/utils').respond;

var jwt      = require('jsonwebtoken');
var config   = require('./config');

// Load local Express JS configuration
require('./setting')(app, passport);

// Load all API routes
fs.readdirSync(__dirname + '/routes')
  .map(function(routeFile) {
    return path.join(__dirname + '/routes', routeFile);
  })
  .forEach(function(routeFile) {
    if (path.basename(routeFile, '.js') !== 'middleware') {
      console.log(routeFile);
      require(routeFile)(express, app);
    }
  });

app.get('/', function(req, res) {
  return respond(req, res, 200, {
    msg: 'API Server is running normally.'
  });
});

app.post('/login', passport.authenticate('local', {session: false}), function(req, res) {
  var token = jwt.sign({
    id: req.user._id,
    username: req.user.username,
    role: req.user.role
  }, config.jwt.secret, {
    issuer: 'api.easyace.ca'
  });

  return respond(req, res, 200, {
    token: token,
    username: req.user.username,
    role: req.user.role
  });
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
  console.log(http.globalAgent.maxSockets);
});
