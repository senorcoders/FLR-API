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
    const forEach = require('async-foreach').forEach;

    console.log(req.params.distance);
    con.connect().then(function () { 
        new con.Request("select distinct "+
                            "operator.id, "+
                            "operator.operator_name, "+
                            "operator.business_type, "+
                            "operator.operator_type, "+
                            "locations.location_type_id,  "+
                            "locations.lot , "+
                            "locations.lat, "+
			    "products_types.* "+
                            "from operator "+
                            "inner join products on operator.id = products.operator_id "+
                            "inner join locations on products.location_id = locations.id "+
			    "inner join products_types on products.id = products_types.product_id "+
                            "where  "+
                            "locations.lat != '' "+
                            " AND geo.STDistance(geography::Point(@lat, @lon, 4326)) < @distance") 
                        .addParam("lat", TYPES.Real, req.params.lat)  
						.addParam("lon", TYPES.Real, req.params.lon)  
						.addParam("distance", TYPES.Int, Number(req.params.distance))  
            .onComplate(function (count, datas) { 
                console.log(count);                
                //console.log(datas);
                forEach(datas, function(operator, indexOperator, arrOperator) {                                
                    var listo = this.async();
                    console.log(operator.id)
                    let bd = require("./../bd")
                    let query = String.raw`
                    select 
                        locations.location_type_id, 
                        locations.lot ,
                        locations.lat ,
                        products.id as product_id,
                        products.name,
                        products.max_adults,
                        pricing.price,
			products_types.* 
                        from operator
                        inner join products on operator.id = products.operator_id
                        inner join locations on products.location_id = locations.id
                        inner join pricing on products.id = pricing.product_id 
			inner join products_types on products.id = products_types.id
                        where operator.id = ${ operator.id } and lat != '' and price_plan != 'price plan'
                    `

                    bd.query(query, { type: bd.QueryTypes.SELECT})
                    .then((productos)=>{
                        console.log(productos);
                        arrOperator[indexOperator].products = productos
                        listo();
                    })
                    .catch((err)=>{
                        console.error(err.message)
                        res.send(err)
                    })

                    
                }, allDone);
                function allDone(notAborted, arr) {
                    console.log("hours done");    
                    res.send(datas);
                    con.close();
                }
                
								
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
