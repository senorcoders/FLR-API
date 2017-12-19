/**
 * Created by Erick Nunez on 18/12/2017.
 */

module.exports = function(app){
    const controller = require("./../controllers/withorm/favoriteOperatorController")
    const path = "api/favoriteoperator/"

    app.route(path)
        .get(controller.add)
        .delete(controller.delete)
}