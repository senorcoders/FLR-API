'use strict'

exports.get_all = function(req, res, callback){
    var TYPES = require("tedious").TYPES; 
    var msSqlConnecter = require("../../sqlhelper"); 
    var dbConfig = require('../../dbConfig');
    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
   
    con.connect().then(function () { 
        new con.Request("select * from [commissions]") 
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
        new con.Request("select * from [commissions] where id = @id")
            .addParam("id", TYPES.Int, Number(req.params.id))  
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
          new con.Request("insert into [commissions] " +
                          "(operator_id, product_id, description, commission_type, commission_rate) "+
                          "values( @operator_id, @product_id, @description, @commission_type, @commission_rate); "+
                          "select * from [commissions] where id = scope_identity();") 
            .addParam("operator_id", TYPES.Int, req.body.operator_id)  
            .addParam("product_id", TYPES.Int, req.body.product_id) 
            .addParam("description", TYPES.VarChar, req.body.description) 
            .addParam("commission_type", TYPES.VarChar, req.body.commission_type) 
            .addParam("commission_rate", TYPES.VarChar, req.body.commission_rate)
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
        new con.Request("update [commissions] set operator_id=@operator_id, product_id=@product_id, description=@description, commission_type=@commission_type, commission_rate=@commission_rate where id = @id; select * from [commissions] where id = @id;") 
        .addParam("id", TYPES.Int, Number(req.params.id)  )
        .addParam("operator_id", TYPES.Int, req.body.operator_id) 
        .addParam("product_id", TYPES.Int, req.body.product_id) 
        .addParam("description", TYPES.VarChar, req.body.description) 
        .addParam("commission_type", TYPES.VarChar, req.body.commission_type) 
        .addParam("commission_rate", TYPES.VarChar, req.body.commission_rate)
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
        new con.Request("delete from [commissions] where id = @id") 
        .addParam("id", TYPES.VarChar, Number(req.params.userId)  )
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