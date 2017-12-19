'use strict'

exports.get_all = function(req, res){
  var TYPES = require("tedious").TYPES; 
    var msSqlConnecter = require("../../sqlhelper"); 
    var dbConfig = require('../../dbConfig');
    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
   
    con.connect().then(function () { 
        new con.Request("SELECT loc.id,loc.name, loc_type.id as type_id, loc_type.name as type, loc_type.image_url, geo.Lat as lat, geo.Long as lon " +                        
                        " FROM locations loc" +
                        " inner join location_type loc_type on ( loc.location_type_id = loc_type.id ) ")                         
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
         new con.Request("insert into [location] (name, type_id, image_url, lat, lon ) " +
                         "values( @name, @type_id, @image_url,geography::STGeomFromText('LINESTRING(@lat, @lon ) ); select * from [location] where id = scope_identity();") 
            .addParam("name", TYPES.VarChar, req.body.name)  
            .addParam("type_id", TYPES.Int, req.body.type_id) 
            .addParam("image_url", TYPES.VarChar, req.body.image_url) 
            .addParam("lat", TYPES.VarChar, req.body.lat)             
			 			.addParam("lon", TYPES.VarChar, req.body.lon)             
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

exports.by_distance = function(req, res){
    var TYPES = require("tedious").TYPES; 
    var msSqlConnecter = require("../../sqlhelper"); 
    var dbConfig = require('../../dbConfig');
    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config);
    
    console.log(req.params.distance);
    con.connect().then(function () { 
        new con.Request("	SELECT loc.id,loc.name, loc_type.id as type_id, loc_type.name as type, loc_type.image_url, geo.Lat as lat, geo.Long as lon, " +
                        " geo.STDistance(geography::Point(@lat, @lon, 4326)) Distance" +
                        " FROM locations loc" +
                        " inner join location_type loc_type on ( loc.location_type_id = loc_type.id ) "+
                        " WHERE geo.STDistance(geography::Point(@lat, @lon, 4326)) < @distance") 
            .addParam("lat", TYPES.Real, req.params.lat)  
						.addParam("lon", TYPES.Real, req.params.lon)  
						.addParam("distance", TYPES.Int, Number(req.params.distance))  
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
        new con.Request("SELECT loc.id,loc.name, loc_type.id as type_id, loc_type.name as type, loc_type.image_url, geo.Lat as lat, geo.Long as lon " +                        
                        " FROM locations loc" +
                        " inner join location_type loc_type on ( loc.location_type_id = loc_type.id )  where loc.id = @id")
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

exports.get_locations_with_operator = function(req, res){
		var TYPES = require("tedious").TYPES; 
    var msSqlConnecter = require("../../sqlhelper"); 
    var dbConfig = require('../../dbConfig');
    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
    console.log(req.params.userId);
    con.connect().then(function () { 
        new con.Request("SELECT loc.id,loc.name, loc_type.id as type_id, loc_type.name as type, loc_type.image_url, geo.Lat as lat, geo.Long as lon " +                        
                        " FROM locations loc" +
                        " inner join location_type loc_type on ( loc.location_type_id = loc_type.id )")            
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