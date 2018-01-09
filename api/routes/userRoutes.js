'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');
  const endpoint = '/api/user';
  const controllerFavoriteOperator = require("./../controllers/favoriteOperatorController")
  // User Routes
  app.route(endpoint)
    .post(user.create)
    .get(user.get_all);

  app.route(endpoint + '/:userId')
    .get(user.get_one)
    .put(user.update)
    .delete(user.delete);

  app.route(endpoint + '/azure_id/:id')
		.get(user.get_by_azure);
  
  app.route(endpoint + '/:userId/email-confirmation/:verfication_code')
    .get(user.verificate_email);

  app.route(endpoint + '/:userId/change-location')
    .put(user.update_location);

  //get favorites por usuario
    app.route(endpoint+ "/:userId/favorites-operators")
        .post(controllerFavoriteOperator.getAllXUser)

  //get all the operators that have been used
  app.route(endpoint+ "/:userId/operators")
  .get(require("./../controllers/operatorController").getAllXUser)

  //get all the comments y stars
  app.route(endpoint+ "/:id/stars-comments")
  .get(require("./../controllers/starsComments").getAllXUser)

  //get all the comments y stars
  app.route(endpoint+ "/:id/reservations")
  .get(require("./../controllers/reservationController").getXUserAll)

};
