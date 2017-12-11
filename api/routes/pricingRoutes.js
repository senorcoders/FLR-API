'use strict';
module.exports = function(app) {
  var pricing = require('../controllers/pricingController');
  const endpoint = '/api/pricing';
  // User Routes
  app.route(endpoint)
    .post(pricing.create)
    .get(pricing.get_all);

  app.route(endpoint + '/:id')
    .get(pricing.get_one)
    .put(pricing.update)
    .delete(pricing.delete);

};
