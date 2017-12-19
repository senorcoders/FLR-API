'use strict'

exports.get_all = function(req, res, callback){
    var TYPES = require("tedious").TYPES; 
    var msSqlConnecter = require("../../sqlhelper"); 
    var dbConfig = require('../../dbConfig');
    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
   
    con.connect().then(function () { 
        new con.Request("select * from [users]") 
            .onComplate(function (count, datas) { 
                console.log(count);
                console.log(datas);
								//res.send(datas);
								con.close();
								var con2 = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
									con2.connect().then(function () { 
										new con2.Request("select * from [locations]") 
												.onComplate(function (countLocation, locations) { 
														console.log(countLocation);
														console.log(locations);														
														for (let i = 0; i < datas.length ; i++) {
															datas[i].locations = locations;
														}														
														res.send(datas);											
												}) 
												.onError(function (err) { 
														console.log(err); 
														res.send(err);
												}).Run(); 
								}).catch(function (ex) { 
										console.log(ex); 
								});	
					
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
        new con.Request("select * from [users] where id = @id")
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

exports.get_by_azure = function(req, res){
    var TYPES = require("tedious").TYPES;
    var msSqlConnecter = require("../../sqlhelper");
    var dbConfig = require('../../dbConfig');
    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config);
    console.log(req.params.id);
    con.connect().then(function () {
        new con.Request("select * from [users] where azure_id = @id")
            .addParam("id", TYPES.VarChar, req.params.id)
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
    var mailer = require('../../mailer');
    var randomize = require('randomatic');
    var code = randomize('aA0', 6); //aA0 <= with this we include in the pattern lowercase, uppercase and numbers
    
    

    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
     con.connect().then(function () { 
         console.log("moment request at "+moment().format('YYYY-MM-DD'));
	 console.log(req.body);
	console.log('-------------------------------params----------------');
	 console.log(req.params);
	console.log('--------------req----------------');
	console.log(req);
         new con.Request("insert into [users] (name, username, password, email, birthday, lat, lon, created_at, updated_at, verification_code, photo_url, azure_id, social_access_token) values( @name, @username, @password, @email, @birthday, @lat, @lon, @created_at, @updated_at, @verification_code, @photo_url, @azure_id, @social_access_token); select * from [users] where id = scope_identity();") 
            .addParam("name", TYPES.VarChar, req.body.name)  
            .addParam("username", TYPES.VarChar, req.body.username) 
            .addParam("password", TYPES.VarChar, req.body.password) 
            .addParam("email", TYPES.VarChar, req.body.email) 
            .addParam("birthday", TYPES.VarChar, req.body.birthday)
            .addParam("lat", TYPES.VarChar, req.body.lat)  
            .addParam("lon", TYPES.VarChar, req.body.lon) 
            .addParam("verification_code", TYPES.VarChar, code) 
						.addParam("photo_url", TYPES.VarChar, req.body.photo_url)
						.addParam("azure_id", TYPES.VarChar, req.body.azure_id)
						.addParam("social_access_token", TYPES.VarChar, req.body.social_access_token)

            .addParam("created_at", TYPES.VarChar, moment().format('YYYY-MM-DD'))
            .addParam("updated_at", TYPES.VarChar, moment().format('YYYY-MM-DD'))  
            .onComplate(function (count, data) {                  
                res.send(data);
                console.log(data);
                console.log(data[0].id);
                mailer.sendCode(data[0].id, req.body.email, code);
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
        new con.Request("update [users] set name=@name, username=@username, password=@password, email=@email, birthday=@birthday, lat=@lat, lon=@lon, photo_url=@photo_url, updated_at=@updated_at, social_access_token=@social_access_token  where id = @id; select * from [users] where id = @id;") 
        .addParam("id", TYPES.Int, Number(req.params.userId)  )
        .addParam("name", TYPES.VarChar, req.body.name) 
        .addParam("username", TYPES.VarChar, req.body.username) 
        .addParam("password", TYPES.VarChar, req.body.password) 
        .addParam("email", TYPES.VarChar, req.body.email) 
        .addParam("birthday", TYPES.VarChar, req.body.birthday)
        .addParam("lat", TYPES.VarChar, req.body.lat)
        .addParam("lon", TYPES.VarChar, req.body.lon)
				.addParam("photo_url", TYPES.VarChar, req.body.photo_url)
				.addParam("social_access_token", TYPES.VarChar, req.body.social_access_token)
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
        new con.Request("delete from [users] where id = @id") 
        .addParam("id", TYPES.VarChar, Number(req.params.userId)  )
        .onComplate(function (count, data) {                  
            res.send({"rows deleted": count});
        }) 
        .onError(function (err) { 
            console.log(err);
	    			res.send(err); 
						con.close();
        }) 
        .Run(); 
    }).catch(function (ex) { 
        console.log(ex); 
    }); 
}

exports.verificate_email = function(req, res){
    var TYPES = require("tedious").TYPES; 
    var msSqlConnecter = require("../../sqlhelper"); 
    var dbConfig = require('../../dbConfig');
    var moment = require('moment');

    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
    con.connect().then(function () { 
        console.log("moment request at "+moment().format('YYYY-MM-DD'));
        new con.Request("update [users] set verified=1, updated_at=@updated_at  where id = @id and verification_code = @verification_code; select * from [users] where id = @id;") 
        .addParam("id", TYPES.Int, Number(req.params.userId)  )
        .addParam("verification_code", TYPES.VarChar, req.params.verfication_code)        
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

exports.update_location = function(req, res, callback){
    var TYPES = require("tedious").TYPES; 
    var msSqlConnecter = require("../../sqlhelper"); 
    var dbConfig = require('../../dbConfig');
    var moment = require('moment');

    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
    con.connect().then(function () { 
        console.log("moment request at "+moment().format('YYYY-MM-DD'));
        new con.Request("update [users] set lat=@lat, lon=@lon, updated_at=@updated_at  where id = @id; select * from [users] where id = @id;") 
        .addParam("id", TYPES.Int, Number(req.params.userId)  )
        .addParam("lat", TYPES.VarChar, req.body.lat)
        .addParam("lon", TYPES.VarChar, req.body.lon)
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
