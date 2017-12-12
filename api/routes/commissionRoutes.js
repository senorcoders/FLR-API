'use strict';
module.exports = function(app) {
  var commission = require('../controllers/commissionController');
  const endpoint = '/api/commission';
  // User Routes
  app.route(endpoint)
    .post(commission.create)
    .get(commission.get_all);

  app.route(endpoint + '/:id')
    .get(commission.get_one)
    .put(commission.update)
    .delete(commission.delete); 

};
