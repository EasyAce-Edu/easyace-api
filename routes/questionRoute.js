var QuestionCtrl = require('../controllers/questionCtrl.js');

module.exports = function(express, app){
  var router = express.Router();

  router.post('/', QuestionCtrl.create);
  router.get('/', QuestionCtrl.get);

  app.use('/questions', router);
};
