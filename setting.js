var config = require('./config.js');

module.exports = function(app){
  var bodyParser = require('body-parser');
  var cors       = require('cors');
  var logger     = require('morgan');

  if(config.db.client === 'mongodb') {
    var mongoose   = require('mongoose');
    mongoose.connect(config.db.url, function(err, response){
      if (err) {
        console.error('Error in connecting to the required mongodb instance: ' + err.message);
      } else {
        console.log('Successfully connect to the required mongodb instance.');
      }
    });
  }

  app.set('port', config.http.port);
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(cors());

  app.enable('trust proxy');
  app.disable('etag');
};
