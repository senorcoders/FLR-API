'use strict'

exports.get_all = function(req, res){
  var TYPES = require("tedious").TYPES; 
    var msSqlConnecter = require("../../sqlhelper"); 
    var dbConfig = require('../../dbConfig');
    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
   
    con.connect().then(function () { 
        new con.Request("select * from [operator]") 
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

exports.get_one = function(req, res){
    var TYPES = require("tedious").TYPES; 
    var msSqlConnecter = require("../../sqlhelper"); 
    var dbConfig = require('../../dbConfig');
    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
    console.log(req.params.userId);
    con.connect().then(function () { 
        new con.Request("select * from [operator] where id = @id")
            .addParam("id", TYPES.Int, Number(req.params.userId))  
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
         new con.Request("insert into [operator] (operator_name, operator_type, time_zone, currency ) " +
                         "values( @operator_name, @operator_type, @time_zone, @currency); select * from [operator] where id = scope_identity();") 
            .addParam("operator_name", TYPES.VarChar, req.body.operator_name)  
            .addParam("operator_type", TYPES.VarChar, req.body.operator_type) 
            .addParam("time_zone", TYPES.VarChar, req.body.time_zone) 
            .addParam("currency", TYPES.VarChar, req.body.currency)             
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

exports.update = function(req, res, callback){
    var TYPES = require("tedious").TYPES; 
    var msSqlConnecter = require("../../sqlhelper"); 
    var dbConfig = require('../../dbConfig');
    var moment = require('moment');

    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
    con.connect().then(function () { 
        console.log("moment request at "+moment().format('YYYY-MM-DD'));
        new con.Request("update [operator] set "+
                          "operator_name=@operator_name, "+
                          "operator_type=@operator_type, "+
                          "time_zone=@time_zone, "+
                          "currency=@currency "+
                        "where id = @id; select * from [operator] where id = @id;") 
        .addParam("id", TYPES.Int, Number(req.params.id)  )
        .addParam("operator_name", TYPES.VarChar, req.body.operator_name) 
        .addParam("operator_type", TYPES.VarChar, req.body.operator_type) 
        .addParam("time_zone", TYPES.VarChar, req.body.time_zone) 
        .addParam("currency", TYPES.VarChar, req.body.currency) 
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
        new con.Request("delete from [operator] where id = @id") 
        .addParam("id", TYPES.Int, Number(req.params.id)  )
        .onComplate(function (count, data) {                  
            res.send({"rows deleted": count});
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
