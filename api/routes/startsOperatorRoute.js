'use strict';
module.exports = function(app) {
  var starts_operator = require('../controllers/startsOperatorController');
  const endpoint = '/api/starts-operator';

  // User Routes
  app.route(endpoint)
  .put(starts_operator.get)
    .post(starts_operator.save)

};
