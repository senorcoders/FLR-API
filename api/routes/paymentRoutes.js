const payment = require("../controllers/paymentController")

module.exports = function(app){
    let endpoint  = "/api/payment"      		
    app.route(endpoint)
    .post(payment.makePayment)    

}