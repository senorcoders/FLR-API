const payment = require("../models").payment

module.exports = {
	makePayment :  function(req, res, next){
		//res.send("holahola");
	var Client = require('node-rest-client').Client;
    var client = new Client();		
    reservation_id = req.body.reservation_id;
    let post_data= {
			    "merchid": "000000927996",
				  "accttype": req.body.acccttype,//"VISA",
				  "orderid": req.body.orderid,//"AB-11-9876",
				  "account": req.body.account,//"4111111111111111",
				  "expiry": req.body.expiry,//"1218",
				  "amount": req.body.amount,//"10",
				  "currency": req.body.amount,
				  "name": req.body.name,//"TOM JONES",
				  "address": req.body.address,
				  "city": req.body.city,//"anytown",
				  "region": req.body.region,//"NY",
				  "country": req.body.country,//"US",
				  "postal": req.body.postal,//"55555",
				  "ecomind": "E",
				  "cvv2": req.body.cvv2,//"123",
				  "track": null,
				  "tokenize": "Y",
				  "capture": "Y"
      	}        

      	let post_string = JSON.stringify(post_data);
      	let _authdata = "testin:testing123";
        var args = {
				    data: post_string,
				    headers: { "Content-Type": "application/json", "Authorization": "Basic dGVzdGluZzp0ZXN0aW5nMTIz", "Access-Control-Allow-Origin": "*" }
				};

        
        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this

        client.registerMethod('jsonMethod', 'https://fts.cardconnect.com:6443/cardconnect/rest/auth', 'PUT')
        client.methods.jsonMethod(args, function (dataPayment, response) {
          // parsed response body as js object        
          setTimeout(function () {     
            payment.create({
                reservation_id : reservation_id,
                amount : dataPayment.amount ,
                resptext : dataPayment.resptext,
                commandcard : dataPayment.commandcard,
                cvvresp : dataPayment.cvvresp,
                batchid : dataPayment.batchid,
                avsresp : dataPayment.avsresp,
                respcode : dataPayment.respcode,
                merchid : dataPayment.merchid,
                token : dataPayment.token,
                authcode : dataPayment.authcode,
                respproc : dataPayment.respproc,
                retref : dataPayment.retref,
                retstat : dataPayment.retstat,
                account : dataPayment.account                
            }).then(function(data){
                res.send(data)
            })
            .catch(function(err){
                console.error(err)
                res.send(err)
            })          	
          }, 10)
        })
	}	

  /*  getCoupon : function(req, res, next){
        coupon.find({
            where : {
                code : req.params.code,
                product_id : req.params.productId
            }
        }).then(function(data){
            let coupon = {}
            if( data === null){
                coupon = {
                    message : "coupon not found"
                }
            }else{
                coupon = data
                coupon.dataValues.message = "ok"
                console.log(coupon)
            }
            
            res.send(coupon)
        })
        .catch(function(err){
            console.error(err)
            res.send(err)
        })
    },

    save :  function(req, res, next){
        coupon.create({
            product_id : req.body.product_id,
            code : req.body.code,
            amount : req.body.amount,
            type : req.body.type
        }).then(function(data){
            res.send(data)
        })
        .catch(function(err){
            console.error(err)
            res.send(err)
        })
    },

    delete :  function(req, res, next){
        if( !req.params.hasOwnProperty("id") ){
            res.send({
                message : "Error the id parameter is missing"
            })
            return
        }
        coupon.destroy({
            where :{
                id : req.params.id
            }
        }).then(function(data){
            res.send({
                rowsAffect : data
            })
        })
        .catch(function(err){
            console.error(err)
            res.send(err)
        })
    },*/
}