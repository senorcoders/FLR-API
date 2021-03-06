const payment = require("../models").payment

module.exports = {
    makePayment :  function(req, res, next){
    var Client = require('node-rest-client').Client;
    var client = new Client();      
    let expire_date = req.body.expiry
    if (expire_date.includes("/")) {
         expire_date = expire_date.replace("/", "");
    }
    let post_data= {
            "merchid": "496237269881",
            "accttype": "",//req.body.acccttype,//"VISA",
            "account": req.body.account,//"4111111111111111",
            "expiry": expire_date, //req.body.expiry,//"1218",
            "amount": req.body.amount,//"10",
            "currency": req.body.currency,
            "name": req.body.name,//"TOM JONES",
            "address": "",//req.body.address,
            "city": "",// req.body.city,//"anytown",
            "region": "",//req.body.region,//"NY",
            "country": "",//req.body.country,//"US",
            "postal": req.body.postal,//"55555",
            "ecomind": "",
            "cvv2": req.body.cvv2,//"123"
            "retstat": "",
            "track": null,
            "tokenize": "Y",
            "capture": "Y"
        }        

        let post_string = JSON.stringify(post_data);
        console.log(post_string);
        let _authdata = "testin:testing123";
        var args = {
                    data: post_string,
                    headers: { "Content-Type": "application/json", "Authorization": "Basic cmVzZXJ2ZWNpbmNhcGk6SzllXnh3MyZnTE0hUHE=", "Access-Control-Allow-Origin": "*" }
                };

        
        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this

        client.registerMethod('jsonMethod', 'https://fts.cardconnect.com:8443/cardconnect/rest/', 'PUT')
        client.methods.jsonMethod(args, function (dataPayment, response) {
          // parsed response body as js object        
          setTimeout(function () {     
            //res.send(dataPayment);
            var resp_token = "";
            if(dataPayment.hasOwnProperty('token')){
              resp_token = dataPayment.token;
            }
            if(dataPayment.hasOwnProperty('respstat')){
                if(dataPayment.respstat == "C"){
                payment.create({
                    retstat : dataPayment.repstat,
                    retref : dataPayment.retref,
                    account : dataPayment.account,               
                    amount : dataPayment.amount,
                    token : dataPayment.token,
                    merchid : dataPayment.merchid,
                    respcode : dataPayment.respcode,
                    resptext : dataPayment.resptext,
                    respproc : dataPayment.respproc,
                    currency :'',
                    commandcard : '',
                    cvv2 : '',
                    cvvresp: '',
                    batchid:'',
                    avsresp:'',
                    respstat:'',
                    retstat:'',
                    authcode:''
                }).then(function(data){
                    console.log("payment saved");                                    
                    res.send({"status":"Declined", "reference": dataPayment.retref, "amount": dataPayment.amount, "text": dataPayment.resptext, "payment_id": data.id})
                }).catch(function(err){
                    console.error(err)
                    res.send(err)
                })                
            }else if(dataPayment.respstat == "A"){
                payment.create({
                    amount : dataPayment.amount ,
                    resptext : dataPayment.resptext,
                    commandcard : '',
                    cvvresp : dataPayment.cvvresp,
                    batchid : dataPayment.batchid,
                    avsresp : dataPayment.avsresp,
                    respcode : dataPayment.respcode,
                    merchid : dataPayment.merchid,
                    token : dataPayment.token,
                    authcode : dataPayment.authcode,
                    currency : req.body.currency,
                    respproc : dataPayment.respproc,
                    retref : dataPayment.retref,
                    retstat : "test",
                    account : dataPayment.account                
                }).then(function(data){
                    console.log("payment saved");                                    
            console.log(dataPayment.resptext);
                    res.send({"status":"Aproved", "reference": dataPayment.retref, "amount": dataPayment.amount, "text": dataPayment.resptext, "payment_id": data.id})
                }).catch(function(err){
                    console.error(err)
                    res.send(err)
                })                              
            }else{
                payment.create({
                    retstat : dataPayment.repstat,
                    retref : dataPayment.retref,
                    account : dataPayment.account,                
                    amount : dataPayment.amount ,
                    token : dataPayment.token,
                    merchid : dataPayment.merchid,
                    respcode : dataPayment.respcode,
                    resptext : dataPayment.resptext,
                    respproc : dataPayment.respproc,
                    currency :'',
                    commandcard : '' ,
                    cvv2 : '',
                    cvvresp: '',
                    batchid:'',
                    authcode:'',
                    respstat:'',
                    retstat:'',
                    avsresp:''          
                }).then(function(data){
                    console.log("payment saved");                                    
                    res.send({"status":"Please try again", "reference": dataPayment.retref, "amount": dataPayment.amount, "text": dataPayment.resptext, "payment_id": data.id})
                }).catch(function(err){
                    console.error(err)
                    res.send(err)
                })
               }
            }else{
                res.send({"status":"We couldn't process payment. cardconnect error", "reference": "", "amount": "0", "text": "We couldn't process payment. cardconnect error", "payment_id": "0"})
            }
            
            
            
          }, 10)
        })
        }
    }   
