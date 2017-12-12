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
                          "(location_id, product_id, price_plan, available_date, available_time, end_date, end_time, available_DOW, price, extra_adult, extra_child, minimum_required, minimun_type, minimum_number, featured_on_flr_site, featured_on_supplier_site) "+
                          "values( @location_id, @product_id, @price_plan, @available_date, @available_time, @end_date, @end_time, @available_DOW, @price, @extra_adult, @extra_child, @minimum_required, @minimun_type, @minimum_number, @featured_on_flr_site, @featured_on_supplier_site); "+
                          "select * from [commissions] where id = scope_identity();") 
            .addParam("location_id", TYPES.Int, req.body.location_id)  
            .addParam("product_id", TYPES.Int, req.body.product_id) 
            .addParam("price_plan", TYPES.VarChar, req.body.price_plan) 
            .addParam("available_date", TYPES.Date, req.body.available_date) 
            .addParam("available_time", TYPES.VarChar, req.body.available_time)
            .addParam("end_date", TYPES.Date, req.body.end_date)  
            .addParam("end_time", TYPES.VarChar, req.body.end_time) 
            .addParam("available_DOW", TYPES.VarChar, req.body.available_DOW) 
	          .addParam("price", TYPES.Float, req.body.price)
	          .addParam("extra_adult", TYPES.Float, req.body.extra_adult)
            .addParam("extra_child", TYPES.Float, req.body.extra_child)
            .addParam("minimum_required", TYPES.Int, req.body.minimun_required)
            .addParam("minimum_type", TYPES.VarChar, req.body.minimum_type)
            .addParam("minimum_number", TYPES.Float, req.body.minimum_number)
            .addParam("featured_on_flr_site", TYPES.Int, req.body.featured_on_flr_site)
            .addParam("featured_on_supplier_site", TYPES.Int, req.body.featured_on_supplier_site)
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
        new con.Request("update [users] set name=@name, username=@username, password=@password, email=@email, birthday=@birthday, lat=@lat, lon=@lon, photo_url=@photo_url, updated_at=@updated_at  where id = @id; select * from [users] where id = @id;") 
        .addParam("id", TYPES.Int, Number(req.params.userId)  )
        .addParam("name", TYPES.VarChar, req.body.name) 
        .addParam("username", TYPES.VarChar, req.body.username) 
        .addParam("password", TYPES.VarChar, req.body.password) 
        .addParam("email", TYPES.VarChar, req.body.email) 
        .addParam("birthday", TYPES.VarChar, req.body.birthday)
        .addParam("lat", TYPES.VarChar, req.body.lat)
        .addParam("lon", TYPES.VarChar, req.body.lon)
				.addParam("photo_url", TYPES.VarChar, req.body.photo_url)
        .addParam("updated_at", TYPES.Date, moment().format('YYYY-MM-DD')) 
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