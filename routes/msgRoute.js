var MsgCtrl = require('../controllers/msgCtrl.js');

module.exports = function(express, app) {
  var router = express.Router();

  router.get('/', MsgCtrl.get);
  router.post('/', MsgCtrl.create);

  router.post('/add', MsgCtrl.add);

  app.use('/messages', router);
};
