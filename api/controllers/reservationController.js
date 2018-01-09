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

exports.getXUserAll = (req, res)=>{
    let db = require("./../bd")
    let query = String.raw`
    select 
    rs.id as reservationID,
    rs.activity_type as reservationActivityType,
    rs.transaction_date as transactionDate,
    rs.transaction_start_date as transactionStartDate,
    rs.transaction_end_date as transactionEndtTime,
    rs.transaction_start_time as transactionStartTime,
    rs.transaction_end_time as transactionEndTime,
    rs.nbr_in_party as reservationNbrInParty,
    rs.nbr_in_adult as reservationNbrInAdult,
    rs.nbr_children as reservationNbrChildren,
    rs.misc_trip_name as reservationMiscTripName,
    rs.price as Price,
    op.id as operatorID,
    op.operator_name as operatorName,
    op.operator_type as operatorType,
    op.time_zone as operatorTimeZona,
    op.currency as operatorCurrency,
    op.business_type as operatorBusinessType,
    pds.id as productID,
    pds.name as productName,
    pr.id as priceID,
    pr.price as productPrice,
    pr.price_plan as pricePlan,
    pr.available_date as priceAvailableDate,
    pr.available_time as priceAvailableTime,
    pr.end_date as priceEndDate,
    pr.end_time as priceEndTime,
    loc.id as locationID,
    loc.lat as locationLatitud,
    loc.lot as locationLongitud,
    loc.name as locationName,
    loc.currency as locationCurrency,
    loc.address as locationAddress,
    loc.hours_operation as locationHoursOperation,
    loc.website as locationWebSite,
    loc.country as locationCountry,
    loc.contact_name as locationContactName,
    loc.contact_email as locationContactEmail
    from products pds
    INNER JOIN reservations rs  on pds.id = rs.product_id 
    INNER JOIN operator op on pds.operator_id = op.id
    inner JOIN pricing pr on pr.product_id = pds.id
    inner join locations loc on loc.id = pds.location_id
	where rs.user_id = ${ req.params.id }
    `
    db.query(query)
    .then(data=>{ res.send(data[0]) })
    .catch((err)=>{
        console.error(err.message)
        res.send(err)
    })
}

exports.getAllNotPassed = (req, res)=>{
    let db = require("./../bd")
    let query = String.raw`
    select 
    rs.id as reservationID,
    rs.activity_type as reservationActivityType,
    rs.transaction_date as transactionDate,
    rs.transaction_start_date as transactionStartDate,
    rs.transaction_end_date as transactionEndtTime,
    rs.transaction_start_time as transactionStartTime,
    rs.transaction_end_time as transactionEndTime,
    rs.price as Price,
    op.id as operatorID,
    op.operator_name as operatorName,
    op.operator_type as operatorType,
    op.time_zone as operatorTimeZona,
    op.currency as operatorCurrency,
    op.business_type as operatorBusinessType,
    pds.id as productID,
    pds.name as productName,
    pr.id as priceID,
    pr.price as productPrice,
    pr.price_plan as pricePlan,
    pr.available_date as priceAvailableDate,
    pr.available_time as priceAvailableTime,
    pr.end_date as priceEndDate,
    pr.end_time as priceEndTime,
    loc.id as locationID,
    loc.lat as locationLatitud,
    loc.lot as locationLongitud,
    loc.name as locationName,
    loc.currency as locationCurrency,
    loc.address as locationAddress,
    loc.hours_operation as locationHoursOperation,
    loc.website as locationWebSite,
    loc.country as locationCountry,
    loc.contact_name as locationContactName,
    loc.contact_email as locationContactEmail
    from products pds
    INNER JOIN reservations rs  on pds.id = rs.product_id 
    INNER JOIN operator op on pds.operator_id = op.id
    inner JOIN pricing pr on pr.product_id = pds.id
    inner join locations loc on loc.id = pds.location_id
    where CAST('${ req.params.dateNow}' AS DATE) > rs.transaction_end_date
    `
    db.query(query)
    .then(data=>{ res.send(data[0]) })
    .catch((err)=>{
        console.error(err.message)
        res.send(err)
    })
}

exports.getAllFuture = (req, res)=>{
    let db = require("./../bd")
    let query = String.raw`
    select 
    rs.id as reservationID,
    rs.activity_type as reservationActivityType,
    rs.transaction_date as transactionDate,
    rs.transaction_start_date as transactionStartDate,
    rs.transaction_end_date as transactionEndtTime,
    rs.transaction_start_time as transactionStartTime,
    rs.transaction_end_time as transactionEndTime,
    rs.price as Price,
    op.id as operatorID,
    op.operator_name as operatorName,
    op.operator_type as operatorType,
    op.time_zone as operatorTimeZona,
    op.currency as operatorCurrency,
    op.business_type as operatorBusinessType,
    pds.id as productID,
    pds.name as productName,
    pr.id as priceID,
    pr.price as productPrice,
    pr.price_plan as pricePlan,
    pr.available_date as priceAvailableDate,
    pr.available_time as priceAvailableTime,
    pr.end_date as priceEndDate,
    pr.end_time as priceEndTime,
    loc.id as locationID,
    loc.lat as locationLatitud,
    loc.lot as locationLongitud,
    loc.name as locationName,
    loc.currency as locationCurrency,
    loc.address as locationAddress,
    loc.hours_operation as locationHoursOperation,
    loc.website as locationWebSite,
    loc.country as locationCountry,
    loc.contact_name as locationContactName,
    loc.contact_email as locationContactEmail
    from products pds
    INNER JOIN reservations rs  on pds.id = rs.product_id 
    INNER JOIN operator op on pds.operator_id = op.id
    inner JOIN pricing pr on pr.product_id = pds.id
    inner join locations loc on loc.id = pds.location_id
    where CAST('${ req.params.dateNow }' AS DATE) <= rs.transaction_end_date
    `
    db.query(query)
    .then(data=>{ res.send(data[0]) })
    .catch((err)=>{
        console.error(err.message)
        res.send(err)
    })
}