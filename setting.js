var config = require('./config.js');

module.exports = function(app, passport) {
  var bodyParser = require('body-parser');
  var cors       = require('cors');
  var logger     = require('morgan');
  var mongoose   = require('mongoose');

  if (config.db.client === 'mongodb') {
    mongoose.connect(config.db.url, function(err, response) {
      if (err) {
        console.error('Error in connecting to the required mongodb instance: ' + err.message);
      } else {
        console.log('Successfully connect to the required mongodb instance.');
      }
    });
  }

  require('./lib/auth')(passport, config);
  app.set('port', config.http.port);
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(cors());
  app.use(passport.initialize());
  app.enable('trust proxy');
  app.disable('x-powered-by');
  app.disable('etag');
};
