/**
 * Created by Erick Nunez on 18/12/2017.
 */

"use strict"

module.exports = function(app){
    const controller = require("./../controllers/favoriteProductController")
    const endpoint = "/api/favorite-product"

    app.route(endpoint)
        .get(controller.getAll)
        .post(controller.add)

        app.route(endpoint+ "/:id/")
        .delete(controller.delete)
}