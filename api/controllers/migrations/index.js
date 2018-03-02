const controller = require("./../../bd/migrations")

module.exports = function(app){
    const endpoint = "/migrations"

    /*app.route(endpoint+ "/category")
    .get(controller.migraCategoryFields)*/

    /*app.route(endpoint+ "/products")
    .get(controller.migraProductFields)*/

    /*app.route(endpoint+ "/locations")
    .get(controller.migraProduct_Rent_locationFields)*/

    /*app.route(endpoint+ "/locations-update")
    .get(controller.updateFieldsLocations)*/

    /*app.route(endpoint+ "/rent")
    .get(controller.getRentFields)*/

    /*app.route(endpoint+ "/pricing")
    .get(controller.getPricingFields)*/

    /*app.route(endpoint+ "/product")
    .get(controller.updateImageDescripcion)*/

    /*app.route(endpoint+ "/product")
    .get(controller.insertTypeProducts)*/

    /*app.route(endpoint+ "/pricing")
    .get(controller.updateFields)*/

    app.route(endpoint+ "/product")
    .get(controller.updateMaxAdults)
}