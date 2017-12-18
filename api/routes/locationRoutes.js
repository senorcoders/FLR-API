'use strict';
module.exports = function(app) {
  var location = require('../controllers/locationController');
  const endpoint = '/api/location';
  // User Routes
  app.route(endpoint)
    .post(location.create)
    .get(location.get_all);

  app.route(endpoint + '/by_distance/:lat/:lon/:distance')
    .get(location.by_distance)
  
  app.route(endpoint + '/with_prod')
    .get(location.get_locations_with_operator)
  
  app.route(endpoint + '/:id')
    .get(location.get_one)
};

