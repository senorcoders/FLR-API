"use strict"

module.exports = function(app){
    const controller = require("./../controllers/withorm/servicesHoursController")
    const endpoint = "/api/services-hours"

    app.route(endpoint)
        .post(controller.create)
    
    app.route(endpoint + '/:id')
        .delete(controller.delete);

}