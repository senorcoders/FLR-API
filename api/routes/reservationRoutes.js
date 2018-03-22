'use strict';
module.exports = function(app) {
  var reservation = require('../controllers/reservationController');
  const endpoint = '/api/reservation';
  // User Routes
  app.route(endpoint)
    .post(reservation.save)
    .get(reservation.get_all);

  app.route(endpoint + '/:id')
    .get(reservation.get)
    .put(reservation.update)
    .delete(reservation.delete);

    app.route(endpoint+ "/:dateNow/past")
    .get(reservation.getAllNotPassed)

    app.route(endpoint+ "/:dateNow/future")
    .get(reservation.getAllFuture)

  app.route(endpoint+ '/update_payment/:id')
    .put(reservation.update_payment_token);

    app.route(endpoint+ "/reviews/all")
    .get(reservation.getAllReview)

    app.route(endpoint+ "/reviews/:id")
    .get(reservation.getOne)
};
