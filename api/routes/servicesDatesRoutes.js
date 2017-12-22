"use strict"

module.exports = function(app){
    const controller = require("./../controllers/withorm/servicesDatesController")
    const endpoint = "/api/services-dates"

    app.route(endpoint)
        .post(controller.create)
    
    app.route(endpoint + '/:id')
        .delete(controller.delete);

}