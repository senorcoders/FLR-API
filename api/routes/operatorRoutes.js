//'use strict';
module.exports = function(app) {
  var location = require('../controllers/operatorController');
  const endpoint = '/api/operator';
  
  app.route(endpoint + '/')
    .get(location.get_all)
    .post(location.create)
 
  
  app.route(endpoint + '/:id')
    .get(location.get_one)
    .put(location.update)
    .delete(location.delete);
  
    //For get all starts and comments for operator
    app.route(endpoint+ "/:id/stars-comments")
    .post(require("../controllers/starsCommentsOperator").getAllXOperator)

};



