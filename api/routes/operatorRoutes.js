//'use strict';
module.exports = function(app) {
  var operator = require('../controllers/operatorController');
  const endpoint = '/api/operator';
  
  app.route(endpoint + '/')
    .get(operator.get_all)
    .post(operator.create)
 
  
  app.route(endpoint + '/:id')
    .get(operator.get_one)
    .put(operator.update)
    .delete(operator.delete);
  
    //For get all starts and comments for operator
    app.route(endpoint+ "/:id/stars-comments")
    .get(require("../controllers/starsComments").getAllXOperator)

    app.route(endpoint+ "/:id/products")
      .get(operator.getAllProductXOperator)

};



