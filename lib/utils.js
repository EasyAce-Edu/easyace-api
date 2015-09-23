var config = require('../config.js');

var utils = {
  respond: function(req, res, statusCode, data) {
    res.status(statusCode).json({
      meta: {
        timestamp: Math.floor((new Date().getTime()) / 1000),
        version: config.version,
        hostname: req.hostname || '',
        ip: req.ip || '',
        query: {
          method: req.method,
          url: req.originalUrl
        }
      },
      data: data
    });
  }
};

module.exports = utils;
