'use strict'

exports.create = function(req, res, callback){
    var TYPES = require("tedious").TYPES; 
    var msSqlConnecter = require("../../sqlhelper"); 
    var dbConfig = require('../../dbConfig');
    var moment = require('moment');
    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
     con.connect().then(function () { 
				console.log("moment request at "+moment().format('YYYY-MM-DD'));
				console.log(req.body);
				console.log('-------------------------------params----------------');
				console.log(req.params);
				console.log('--------------req----------------');
				console.log(req);
         new con.Request("insert into [products] "+
												 "(operator_id, location_id, name, service_type, max_adults, max_childs, created_at, updated_at) "+ 
												 "values( @operator_id, @location_id, @name, @service_type, @max_adults, @max_childs, @created_at, @updated_at); select * from [products] where id = scope_identity();") 
            .addParam("operator_id", TYPES.Int, Number(req.body.operator_id))  
            .addParam("location_id", TYPES.Int, req.body.location_id) 
            .addParam("name", TYPES.VarChar, req.body.name) 
            .addParam("service_type", TYPES.VarChar, req.body.service_type) 
            .addParam("max_adults", TYPES.Int, req.body.max_adults)
            .addParam("max_childs", TYPES.Int, req.body.max_childs)              
            .addParam("created_at", TYPES.Date, moment().format('YYYY-MM-DD'))
            .addParam("updated_at", TYPES.Date, moment().format('YYYY-MM-DD'))  
            .onComplate(function (count, data) {                  
                res.send(data);
                console.log(data);
                console.log(data[0].id);        
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

exports.get_all = function(req, res){
     var TYPES = require("tedious").TYPES; 
    var msSqlConnecter = require("../../sqlhelper"); 
    var dbConfig = require('../../dbConfig');
    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
   
    con.connect().then(function () { 
        new con.Request("select * from [products]") 
            .onComplate(function (count, datas) { 
                console.log(count);
                console.log(datas);
                res.send(datas);
								con.close();
            }) 
            .onError(function (err) { 
                console.log(err); 
								res.send(err);
            }).Run(); 
    }).catch(function (ex) { 
        console.log(ex); 
    }); 
}

