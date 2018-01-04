'use strict';
module.exports = function(app) {
  var starts_operator = require('../controllers/startsOperatorController');
  const endpoint = '/api/starts-operator';

  // User Routes
  app.route(endpoint)
  .put(starts_operator.get)
    .post(starts_operator.save)

    app.route(endpoint+ "/:id/delete")
    .post(starts_operator.delete)

    app.route(endpoint+ "/update")
    .post(starts_operator.update)
};
