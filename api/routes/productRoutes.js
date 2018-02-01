'use strict';
module.exports = function(app) {
  var product = require('../controllers/productController');
  const endpoint = '/api/product';
  
  /*app.route(endpoint + '/by_distance/:lat/:lon/:distance')
    .get(location.by_location)*/
  app.route(endpoint)
    .post(product.create)
    .get(product.get_all);

  app.route(endpoint + '/:id')
    .get(product.get_one)

    app.route(endpoint + '/all/not-dates-not-hours')
    .get(product.notDatesNotHours) 

    app.route(endpoint + '/:id/prices')
      .get(product.getProductPrice)

    app.route(endpoint + '/:page/:number')
    .get(product.getXPagination) 


  /*  .put(product.update)
    .delete(product.delete);*/
};

