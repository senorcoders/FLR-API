'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');
  const endpoint = '/api/user';
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
};
