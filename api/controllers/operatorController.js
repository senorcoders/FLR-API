'use strict'
const models = require("../models");
var forEach = require('async-foreach').forEach;

module.exports ={ 
    /*Solo para pruebas de desarrollo */
		get_all : function (req, res) {
        models.operator.findAll({ limit: 10 }).then(function (data) {
					forEach(data, function(item, index, arr) {
						var done = this.async();
						console.log("each", item, index, arr);
							models.operator.findAll({limit:3}).then(function(other) {																
								arr[index].dataValues.operato =other;
								done();		//wait for the results before continue
							});
					} , allDone);				
					
						function allDone(notAborted, arr) {
							console.log("done");
							res.send(arr);
						}
					}, function(reason) {
						console.log(reason); // Error!
					});
		},	
		get_one : function (req, res){
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
		},
		create : function(req, res, callback){
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
						 new con.Request("insert into [operator] (operator_name, operator_type, time_zone, currency, business_type ) " +
														 "values( @operator_name, @operator_type, @time_zone, @currency, @business_type); select * from [operator] where id = scope_identity();") 
								.addParam("operator_name", TYPES.VarChar, req.body.operator_name)  
								.addParam("operator_type", TYPES.VarChar, req.body.operator_type) 
								.addParam("time_zone", TYPES.VarChar, req.body.time_zone) 
								.addParam("currency", TYPES.VarChar, req.body.currency)             
								.addParam("business_type", TYPES.VarChar, req.body.business_type)             
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
		},
		update : function(req, res, callback){
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
															"business_type=@business_type "+
														"where id = @id; select * from [operator] where id = @id;") 
						.addParam("id", TYPES.Int, Number(req.params.id)  )
						.addParam("operator_name", TYPES.VarChar, req.body.operator_name) 
						.addParam("operator_type", TYPES.VarChar, req.body.operator_type) 
						.addParam("time_zone", TYPES.VarChar, req.body.time_zone) 
						.addParam("currency", TYPES.VarChar, req.body.currency)
						.addParam("business_type", TYPES.VarChar, req.body.business_type)   
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
		},
		delete : function(req, res){
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
		},
	//get all the operators that have been used
	getAllXUser : (req, res, next)=>{
		let bd = require("./../bd")
		let query = String.raw`
		select rs.id as reservationsID, 
		rs.product_id as productID,
		op.id as operatorID, 
		op.operator_name, 
		op.operator_type, 
		op.time_zone,
		op.currency,
		op.business_type,
		op.old_id
		from reservations rs INNER JOIN products pds on rs.product_id = pds.id 
		INNER JOIN operator op on pds.operator_id = op.id where rs.transaction_status = 'paid' and user_id = ${req.body.userId}
		`

		bd.query(query)
		.then((data)=>{
			res.send(data[0])
		})
		.catch((err)=>{
			console.error(err.message)
			res.send(err)
		})
	}
}

