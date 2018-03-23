'use strict';
module.exports = function(app) {
  var guest= require('../controllers/guestController');
  const endpoint = '/api/guest';

  // User Routes
  app.route(endpoint)
  	.get(guest.getAll)
    .post(guest.save)

    app.route(endpoint+ "/:id")
    .get(guest.getOne)
    .delete(guest.delete)
    .put(guest.update)
	
	//get all the reservations of the guest
  app.route(endpoint+ "/:id/reservations")
  .get(require("./../controllers/reservationController").getXGuestAll)
};
