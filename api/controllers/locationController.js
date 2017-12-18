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

exports.get_locations_with_operator_old = function(req, res){
	var TYPES = require("tedious").TYPES; 
	var msSqlConnecter = require("../../sqlhelper"); 
	var dbConfig = require('../../dbConfig');
	var con = new msSqlConnecter.msSqlConnecter(dbConfig.config);
	var conOperator = new msSqlConnecter.msSqlConnecter(dbConfig.config);
	var Promise = require('bluebird');
	var async = require('asyncawait/async');
	var await = require('asyncawait/await');

	// A function that returns a promise.
	function delay(milliseconds) {
			return Promise.delay(milliseconds);
	}
	// A slow asynchronous function, written in async/await style.
	var get_locations = async (function () {
		var resultado;
			con.connect().then(function () { 
        new con.Request("SELECT loc.id,loc.name, loc_type.id as type_id, loc_type.name as type, loc_type.image_url, geo.Lat as lat, geo.Long as lon " +                        
                        " FROM locations loc" +
                        " inner join location_type loc_type on ( loc.location_type_id = loc_type.id ) ")                         
            .onComplate(function (count, datas) { 
                console.log(count);					
								con.close();          			
								console.log("end");
								resultado = datas;
								
                return datas;
            }) 
            .onError(function (err) { 
                console.log(err); 
							resultado = err;
							}).Run(); 
			}).catch(function (ex) { 
					console.log(ex); 
			});
	});
	
	var get_operators = async (function (locations) {
		var resultadoOperator;
		
		locations.forEach(function(element) {
										console.log(element.name);
										new conOperator.connect().then(function () {
											console.log("operator connect");
											new conOperator.Request("SELECT *  FROM operator" )                         
											.onComplate(function (countOperator, dataOperator) { 
												console.log("operator complete");
												console.log(dataOperator);
												//element['operator'] = dataOperator;													
												conOperator.close();
												resultadoOperator = dataOperator;
											})	
										});
										
								});		
			
		return resultadoOperator;
	});

var program = async (function () {
    try  {
        console.log('zero...');

        var locations = await(get_locations());
			delay(4000);
        console.log(locations);

        //var loc_with_operator = await(get_operators(locations));
        //console.log(loc_with_operator);

				
				res.send(locations);
			
    } catch (ex) {
        console.log('Caught an error');
    }
    return 'Finished!';
});
	// Execute program() and print the result.
program().then(function (result) {
    console.log(result);
});
}

exports.get_locations_with_operator_old2 = function(req, res){
  var TYPES = require("tedious").TYPES; 
	var msSqlConnecter = require("../../sqlhelper"); 
	var dbConfig = require('../../dbConfig');
	var con = new msSqlConnecter.msSqlConnecter(dbConfig.config);
	var conOperator = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
	var Promise = require('bluebird');
	
	// A function that returns a promise.
	function delay(milliseconds) {
			return Promise.delay(milliseconds);
	}
	
			con.connect().then(function () { 
        new con.Request("SELECT loc.id,loc.name, loc_type.id as type_id, loc_type.name as type, loc_type.image_url, geo.Lat as lat, geo.Long as lon " +                        
                        " FROM locations loc" +
                        " inner join location_type loc_type on ( loc.location_type_id = loc_type.id ) ")                         
            .onComplate(function (count, datas) { 
                console.log(count);
					     			
								console.log("end");
								datas.forEach(function(element) {
										console.log(element.name);
										new con.connect().then(function () {
											console.log("operator connect");
											new con.Request("SELECT *  FROM operator" )                         
											.onComplate(function (countOperator, dataOperator) { 
												console.log("operator complete");
												console.log(dataOperator);
												element['operator'] = dataOperator;													
												conOperator.close();
												res.send({status: 'okl'});
											})	
										});
										
								});		
								delay(5000);
								
            }) 
            .onError(function (err) { 
                console.log(err); 
							res.send(err);
							}).Run(); 
			}).catch(function (ex) { 
					console.log(ex); 
			});		
			console.log('funcion 22');
			//return true;
		};
   
			/**/
			exports.get_locations_with_operator = function(req, res){
				var TYPES = require("tedious").TYPES; 
				var msSqlConnecter = require("../../sqlhelper"); 
				var dbConfig = require('../../dbConfig');
				var ConnectionPool = require('tedious-connection-pool');
				var Request = require('tedious').Request;

				var poolConfig = {
						min: 2,
						max: 4,
						log: true
				};

				var connectionConfig = {
						userName: 'flrdev2016',
						password: 'kC4!@uJTfC',
						server: 'find-local-rentals-api.database.windows.net',
						options: {
							database: 'find-local-rentals',
							encrypt: true,
						}

					};
				

				//create the pool
				var pool = new ConnectionPool(poolConfig, connectionConfig);

				pool.on('error', function(err) {
						console.error(err);
				});

				//acquire a connection
				pool.acquire(function (err, connection) {
						if (err) {
								console.error(err);
								return;
						}

						//use the connection as normal
						var request = new Request("SELECT loc.id,loc.name, loc_type.id as type_id, loc_type.name as type, loc_type.image_url, geo.Lat as lat, geo.Long as lon " +                        
                        " FROM locations loc" +
                        " inner join location_type loc_type on ( loc.location_type_id = loc_type.id )", function(err, rowCount, data) {
								if (err) {
										console.error(err);
										return;
								}

								console.log('rowCount: ' + rowCount);
								res.send(data);
								//release the connection back to the pool when finished
								connection.release();
						});

						request.on('row', function(columns) {
								console.log('value: ' + columns[0].value);
									var requestOperator = new Request("SELECT loc.id,loc.name, loc_type.id as type_id, loc_type.name as type, loc_type.image_url, geo.Lat as lat, geo.Long as lon " +                        
														" FROM locations loc" +
														" inner join location_type loc_type on ( loc.location_type_id = loc_type.id )", function(err, rowCount, data) {
										if (err) {
												console.error(err);
												return;
										}

										console.log('rowCount: ' + rowCount);
										res.send(data);
										//release the connection back to the pool when finished
										connection.release();
								});
						});

						connection.execSql(request);
				});
			}