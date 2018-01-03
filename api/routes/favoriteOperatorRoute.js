/**
 * Created by Erick Nunez on 18/12/2017.
 */

"use strict"

module.exports = function(app){
    const controller = require("./../controllers/favoriteOperatorController")
    const endpoint = "/api/favorite-operator"

    app.route(endpoint)
        .get(controller.getAll)
        .post(controller.add)

        app.route(endpoint+ "/:operator_id/delete")
        .post(controller.delete)
}