var fs      = require('fs');
var path    = require('path');

var express = require('express');
var app     = express();

// http server global configuration
var http    = require('http');

// Load local Express JS configuration
require('./setting')(app);

// Load all API routes
fs.readdirSync(__dirname + '/routes')
  .map(function(routeFile){
    return path.join(__dirname + '/routes', routeFile);
  })
  .forEach(function(routeFile){
    if(path.basename(routeFile, '.js') !== 'middleware'){
      console.log(routeFile);
      require(routeFile)(express, app);
    }
  });

app.use('/system', function(req, res) {
  return res.status(200).json({
    status: {
      code: 0,
      msg: 'Success'
    },
    data: {
      text: 'System operates normally.'
    }
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.log(http.globalAgent.maxSockets);
});
