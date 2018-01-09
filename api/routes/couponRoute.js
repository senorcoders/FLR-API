module.exports = function(app){
    const endpoint = "/api/coupon", controller = require("../controllers/couponController")

    app.route(endpoint)
    .post(controller.save)

    app.route(endpoint+ "/:id")
    .delete(controller.delete)

    app.route(endpoint+ "/:code/:productId")
    .get(controller.getCoupon)
    
}