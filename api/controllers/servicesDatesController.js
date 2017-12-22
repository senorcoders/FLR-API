'use strict'


exports.create = function(req, res, callback){
    var TYPES = require("tedious").TYPES; 
    var msSqlConnecter = require("../../sqlhelper"); 
    var dbConfig = require('../../dbConfig');
    var moment = require('moment');
    

    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
    con.connect().then(function () { 
         console.log("moment request at "+moment().format('YYYY-MM-DD'));
         new con.Request("insert into [service_dates] (id, name, product_id); select * from [service_dates] where id = scope_identity();") 
            .addParam("name", TYPES.VarChar, req.body.name)  
            .addParam("product_id", TYPES.Int, req.body.product_id) 
            .onComplate(function (count, data) {                  
                res.send(data);
            		con.close();
            }) 
            .onError(function (err) { 
                console.log(err); 
		            res.send(err);  
            }) 
            .Run(); 
     }).catch(function (ex) { 
         console.log(ex); 
     }); 
}


exports.delete = function(req, res){
    var TYPES = require("tedious").TYPES; 
    var msSqlConnecter = require("../../sqlhelper"); 
    var dbConfig = require('../../dbConfig');
    var moment = require('moment');

    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
    con.connect().then(function () { 
        console.log("moment request at "+moment().format('YYYY-MM-DD'));
        new con.Request("delete from [service_dates] where id = @id") 
        .addParam("id", TYPES.VarChar, Number(req.params.userId)  )
        .onComplate(function (count, data) {                  
            res.send({"rows deleted": count});
        }) 
        .onError(function (err) { 
            console.log(err);
	    			res.send(err); 
						con.close();
        }) 
        .Run(); 
    }).catch(function (ex) { 
        console.log(ex); 
    }); 
}