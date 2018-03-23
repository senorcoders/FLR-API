'use strict'
const models = require("../models");
var forEach = require('async-foreach').forEach;

module.exports ={
	create : function (req, res) {
        models.products.findAll({ limit: 1 }).then(function (data) {
					forEach(data, function(item, index, arr) {
						var done = this.async();
//						console.log("each", item, index, arr);
						console.log("lol");
							/*models.products.findAll({limit:1}).then(function(other) {																
								arr[index].dataValues.operato =other;
								done();		//wait for the results before continue
							});*/
					} , allDone);				
					
						function allDone(notAborted, arr) {
							console.log("done");
							res.send(arr);
						}
					}, function(reason) {
						console.log(reason); // Error!
					});
		},
	get_all : function(req, res){
  	models.products.findAll().then(function (data) {
					forEach(data, function(item, index, arr) {
						var done = this.async();
						console.log("each", item, index, arr);
						  models.operator.findAll( { where: {id: item.operator_id} }).then(function(operator) {																
								arr[index].dataValues.operator =operator;
								models.locations.findAll( { where: {id: item.location_id} }).then(function(location) {																
										arr[index].dataValues.location =location;
										done();		//wait for the results before continue
									});
								//done();		//wait for the results before continue
							});
					} , operatorDone);				
					
						function operatorDone(notAborted, arr) {		
							res.send(arr);
						}
			
						
					}, function(reason) {
						console.log(reason); // Error!
					});  
	},
	get_one : function(req, res){
  	models.products.findById(req.params.id).then(function (data) {
					forEach(data, function(item, index, arr) {
						var done = this.async();
						console.log("each", item, index, arr);
						  models.operator.findAll( { where: {id: item.operator_id} }).then(function(operator) {																
								arr[index].dataValues.operator =operator;
								models.locations.findAll( { where: {id: item.location_id} }).then(function(location) {																
										arr[index].dataValues.location =location;
										done();		//wait for the results before continue
									});
								//done();		//wait for the results before continue
							});
					} , operatorDone);				
					
						function operatorDone(notAborted, arr) {		
							res.send(arr);
						}
			
						
					}, function(reason) {
						console.log(reason); // Error!
					});  
	},
	notDatesNotHours : function(req, res, next){
		let db = require("./../bd")
		let query = String.raw`
			select p.* from products p left join service_dates sd on p.id = sd.product_id where sd.product_id is null
		`
		db.query(query)
		.then(function(data){
			res.send(data[0])
		})
		.catch(function(err){
			console.log(err)
			res.send(err)
		})
	},
	getXPagination : function(req, res, next){
		let db = require("./../bd")
		let query = "";
		console.log(req.params)
		if( parseInt(req.params.page) === 1){
			query = String.raw`
			select top ${req.params.number} * from products
			`
		}

		if( req.params.page > 1){
			query = String.raw`
				SELECT * FROM products ORDER BY id OFFSET ${parseInt(req.params.page)*parseInt(req.params.number)} ROWS FETCH NEXT ${parseInt(req.params.number)} ROWS ONLY;
			`
		}
		console.log(query)
		db.query(query)
		.then(function(data){
			res.send(data[0])
		})
		.catch(function(err){
			console.log(err)
			res.send(err)
		})
	},
	getProductPrice : function(req, res, next){
		let db = require("./../bd")
		let query = "";
		query = String.raw`
				select id, product_id, price, price_plan, timing
				from pricing 
				where product_id = ${parseInt(req.params.id)};
			`
		console.log(query);
		db.query(query)
		.then(function(data){
			res.send(data[0])
		})
		.catch(function(err){

		})

	},
	getProductLocation : function(req, res, next){
		let db = require("./../bd")
		let query = "";
		console.log(req.params)
		if( parseInt(req.params.page) === 1){
			query = String.raw`
			select geo.Lat as lat, geo.Long as lon from products
			inner join locations on products.location_id = locations.id
			where products.id = ${parseInt(req.params.id)};
			`
		}		
		console.log(query)
		db.query(query)
		.then(function(data){
			res.send(data[0])
		})
		.catch(function(err){
			console.log(err)
			res.send(err)
		})
	}

}


/*exports.create_old = function(req, res, callback){
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


*/
