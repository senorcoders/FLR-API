"use strict"

module.exports = function(app){
    const controller = require("./../controllers/servicesDatesController")
    const endpoint = "/api/services-dates"

    app.route(endpoint)
        .post(controller.save)
    
    app.route(endpoint + '/:id')
        .delete(controller.delete);

    app.route(endpoint + '/available-dates')
        .get(controller.available_date);

    app.route(endpoint + '/next-dates/:product_id')
        .get(controller.next_days);

    app.route(endpoint + '/better-next-dates/:product_id')
        .get(controller.better_next_days);

    app.route(endpoint + '/next-dates/:product_id/:date')
        .get(controller.check_date);

    app.route(endpoint + '/better-next-dates/:product_id/:date')
    .get(controller.check_date) ;
}