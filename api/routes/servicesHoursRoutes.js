"use strict"

module.exports = function(app){
    const controller = require("./../controllers/servicesHoursController")
    const endpoint = "/api/services-hours"

    app.route(endpoint)
        .post(controller.save)
        .get(controller.getAll)
    
    app.route(endpoint + '/:id')
        .delete(controller.delete)
        .put(controller.update)
        .get(controller.getOne)

}