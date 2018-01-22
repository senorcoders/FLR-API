const controller = require("../controllers/inquiryController")

module.exports = function(app){
    let endpoint  = "/api/inquiry"

    app.route(endpoint)
    .get(controller.getAll)
    .post(controller.save)
    

    app.route(endpoint+ "/:id")
    .get(controller.getOne)
    .put(controller.update)
    .delete(controller.delete)

}