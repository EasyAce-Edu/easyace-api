var UserCtrl = require('../controllers/userCtrl.js');

module.exports = function(express, app){
  var router = express.Router();

  router.get('/', UserCtrl.get);
  router.post('/', UserCtrl.create);

  app.use('/users', router);
};
