var QuestionCtrl = require('../controllers/questionCtrl.js');

module.exports = function(express, app){
  var router = express.Router();

  router.post('/', QuestionCtrl.create);

  app.use('/questions', router);
};
