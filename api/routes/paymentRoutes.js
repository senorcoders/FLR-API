//'use strict';
module.exports = function(app) {
    var payment = require('../controllers/paymentController');
    const endpoint = '/api/payment';    
   
    
    app.route(endpoint + '/cardconnect/:ref')
      .get(payment.get_card_connect_data)
      
    };
  
  
  