var QuestionCtrl = require('../controllers/questionCtrl.js');

module.exports = function(express, app){
  var router = express.Router();

  router.post('/', QuestionCtrl.create);
  router.get('/', QuestionCtrl.get);

  router.put('/status', QuestionCtrl.set);

  app.use('/questions', router);
};
