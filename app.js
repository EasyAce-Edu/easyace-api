var fs       = require('fs');
var path     = require('path');
var passport = require('passport');
var express  = require('express');
var app      = express();

// http server global configuration
var http     = require('http');
var respond  = require('./lib/utils').respond;

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

app.get('/login', passport.authenticate('local', {session: false}), function(req, res) {
  return respond(req, res, 200, {
    user: req.user
  });
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
  console.log(http.globalAgent.maxSockets);
});
