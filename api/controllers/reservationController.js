'use strict'

exports.get_all = function(req, res, callback){
    var TYPES = require("tedious").TYPES; 
    var msSqlConnecter = require("../../sqlhelper"); 
    var dbConfig = require('../../dbConfig');
    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
   
    con.connect().then(function () { 
        new con.Request("select * from [reservations]") 
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
        new con.Request("select * from [reservations] where id = @id")
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
          new con.Request("insert into [reservations] " +
                          "(activity_type, "+
                          "transaction_date, "+
                          "transaction_start_date, "+
                          "transaction_end_date, "+
                          "transaction_start_time, "+
                          "transaction_end_time, "+
                          "transaction_status, "+
                          "number_activity_reserved, "+
                          "nbr_in_party, "+
                          "nbr_in_adult, "+
                          "nbr_children, "+
                          "misc_trip_name, "+
                          "price "+
                          ") "+
                          "values( @activity_type, "+
                          "@transaction_date, "+
                          "@transaction_start_date, "+
                          "@transaction_end_date, "+
                          "@transaction_start_time, "+
                          "@transaction_end_time, "+
                          "@transaction_status, "+
                          "@number_activity_reserved, "+
                          "@nbr_in_party, "+
                          "@nbr_in_adult, "+
                          "@nbr_children, "+
                          "@misc_trip_name, "+
                          "@price "+
                          "); "+
                          "select * from [reservations] where id = scope_identity();") 
            .addParam("activity_type", TYPES.Int, req.body.activity_type)  
            .addParam("transaction_date", TYPES.Int, req.body.transaction_date) 
            .addParam("transaction_start_date", TYPES.VarChar, req.body.transaction_start_date) 
            .addParam("transaction_end_date", TYPES.Date, req.body.transaction_end_date) 
            .addParam("transaction_start_time", TYPES.VarChar, req.body.transaction_start_time)
            .addParam("transaction_end_time", TYPES.VarChar, req.body.transaction_end_time)
            .addParam("transaction_status", TYPES.VarChar, req.body.transaction_status)
            .addParam("number_activity_reserved", TYPES.VarChar, req.body.number_activity_reserved)
            .addParam("nbr_in_party", TYPES.VarChar, req.body.nbr_in_party)
            .addParam("nbr_in_adult", TYPES.VarChar, req.body.nbr_in_adult)
            .addParam("nbr_children", TYPES.VarChar, req.body.nbr_children)
            .addParam("misc_trip_name", TYPES.VarChar, req.body.misc_trip_name)
            .addParam("price", TYPES.VarChar, req.body.price)
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
        new con.Request("update [reservations] set activity_type=@activity_type, "+
                        "transaction_type=@transaction_type, "+
                        "transaction_date=@transaction_date, "+
                        "transaction_start_date=@transaction_start_date, "+
                        "transaction_end_date=@transaction_end_date, "+
                        "transaction_start_time=@transaction_start_time, "+
                        "transaction_end_time=@transaction_end_time, "+
                        "transaction_status=@transaction_status, "+
                        "number_activity_reserved=@number_activity_reserved, "+
                        "nbr_in_party=@nbr_in_party, "+
                        "nbr_in_adult=@nbr_in_adult, "+
                        "nbr_children=@nbr_children, "+
                        "misc_trip_name=@misc_trip_name, "+
                        "price=@price "+
                        "where id = @id; "+
                        "select * from [reservations] where id = @id;") 
        .addParam("activity_type", TYPES.Int, req.body.activity_type)  
        .addParam("transaction_date", TYPES.Int, req.body.transaction_date) 
        .addParam("transaction_start_date", TYPES.VarChar, req.body.transaction_start_date) 
        .addParam("transaction_end_date", TYPES.Date, req.body.transaction_end_date) 
        .addParam("transaction_start_time", TYPES.VarChar, req.body.transaction_start_time)
        .addParam("transaction_end_time", TYPES.VarChar, req.body.transaction_end_time)
        .addParam("transaction_status", TYPES.VarChar, req.body.transaction_status)
        .addParam("number_activity_reserved", TYPES.VarChar, req.body.number_activity_reserved)
        .addParam("nbr_in_party", TYPES.VarChar, req.body.nbr_in_party)
        .addParam("nbr_in_adult", TYPES.VarChar, req.body.nbr_in_adult)
        .addParam("nbr_children", TYPES.VarChar, req.body.nbr_children)
        .addParam("misc_trip_name", TYPES.VarChar, req.body.misc_trip_name)
        .addParam("price", TYPES.VarChar, req.body.price)
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
        new con.Request("delete from [reservations] where id = @id") 
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

exports.getAllNotPassed = (req, res)=>{
    let db = require("./../bd")
    let query = String.raw`
        select * from reservations where CAST('${ req.body.dateNow }' AS DATE) <= transaction_end_date
    `
    db.query(query)
    .then(data=>{ res.send(data[0]) })
    .catch((err)=>{
        console.error(err.message)
        res.send(err)
    })
}