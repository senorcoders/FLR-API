const controller = require("./../../bd/migrations")

module.exports = function(app){
    const endpoint = "/migrations"

    app.route(endpoint+ "/category")
    .get(controller.migraCategoryFields)

    app.route(endpoint+ "/products")
    .get(controller.migraProductFields)

}