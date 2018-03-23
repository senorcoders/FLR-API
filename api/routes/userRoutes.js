'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');
  const endpoint = '/api/user';
  const controllerFavoriteProduct = require("./../controllers/favoriteProductController")
  // User Routes
  app.route(endpoint)
    .post(user.create)
    .get(user.get_all);

  app.route(endpoint + '/login/:email/:password')
    .get(user.login)

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
    app.route(endpoint+ "/:userId/favorites-products")
        .get(controllerFavoriteProduct.getAllXUser)

  //get all the operators that have been used
  app.route(endpoint+ "/:userId/operators")
  .get(require("./../controllers/operatorController").getAllXUser)

  //get all the comments y stars
  app.route(endpoint+ "/:id/stars-comments")
  .get(require("./../controllers/starsComments").getAllXUserStarComments)

  //get all the comments y stars with more data
  app.route(endpoint+ "/:id/stars-comments-more")
  .get(require("./../controllers/starsComments").getAllXUserStarCommentsMoreData)

   //get all the comments y stars
   app.route(endpoint+ "/:userId/not-stars-comments")
   .get(require("./../controllers/starsComments").getAllXUserNotContains)

  //get all the reservations
  app.route(endpoint+ "/:id/reservations")
  .get(require("./../controllers/reservationController").getXUserAll)

  app.route(endpoint + "/check/email/:email")
    .get( user.email_exist )

  app.route(endpoint + "/check/username/:username")
    .get( user.username_exist )
};

