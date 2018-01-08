'use strict';
module.exports = function(app) {
  var reservation = require('../controllers/reservationController');
  const endpoint = '/api/reservation';
  // User Routes
  app.route(endpoint)
    .post(reservation.create)
    .get(reservation.get_all);

  app.route(endpoint + '/:id')
    .get(reservation.get_one)
    .put(reservation.update)
    .delete(reservation.delete);

    app.route(endpoint+ "/:dateNow/past")
    .get(reservation.getAllNotPassed)

    app.route(endpoint+ "/:dateNow/future")
    .get(reservation.getAllFuture)

};
