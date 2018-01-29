'use strict'
const bd = require("../bd")

module.exports = {
    get_card_connect_data : (req, res, next)=>{ 
            //Example POST method invocation 
            var Client = require('node-rest-client').Client;
            
            var client = new Client();
            
            // set content-type header and data as json in args parameter 
            var args = {
                headers: { "Authorization": "Basic Y2FyZGNvbm5lY3Q6Y2Nvbm5lY3QhNDk=" ,"Content-Type": "application/json" }
            };
            
            client.get("https://fts.cardconnect.com:6443/cardconnect/rest/", args, function (data, response) {
                // parsed response body as js object 
                
                var decoded_data = data.toString('utf8');
                //var json_ob = JSON.parse(data.toString());
                console.log(decoded_data);
                // raw response 
                //console.log(response);
                res.send(decoded_data);
            });        
    }
}