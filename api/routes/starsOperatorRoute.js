'use strict';
module.exports = function(app) {
  var stars_operator = require('../controllers/starsOperatorController');
  const endpoint = '/api/stars-operator';

  // User Routes
  app.route(endpoint)
  .get(stars_operator.getAll)
  .post(stars_operator.save)

    app.route(endpoint+ "/:id")
  .get(stars_operator.getOne)
  .put(stars_operator.update)
  .delete(stars_operator.delete)

};
