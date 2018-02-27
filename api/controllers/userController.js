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
								res.send(datas);
								con.close();
								/*var con2 = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
									con2.connect().then(function () { 
										new con2.Request("select * from [locations] limit 1") 
												.onComplate(function (countLocation, locations) { 
														console.log(countLocation);
														console.log(locations);														
														for (let i = 0; i < datas.length ; i++) {
															datas[i].locations = locations;
														}														
														res.send(datas);
                                                        con.close();										
												}) 
												.onError(function (err) { 
														console.log(err); 
														res.send(err);
												}).Run(); 
								}).catch(function (ex) { 
										console.log(ex); 
								});	*/
					
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
    
    var MD5 = function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};
    var pass = "";
    var md5_pass ="";
    if( req.body.hasOwnProperty('password') ){
	pass= req.body.password;
        md5_pass = (MD5(pass));
    }
    //pass= req.body.password;
    //var md5_pass = (MD5(pass));

    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
     con.connect().then(function () { 
         console.log("moment request at "+moment().format('YYYY-MM-DD'));
	 console.log(req.body);
	console.log('-------------------------------params----------------');
	 console.log(req.params);
	console.log('--------------req----------------');
	//console.log(req);
         new con.Request("insert into [users] (name, username, password, email, birthday, lat, lon, created_at, updated_at, verification_code, photo_url, azure_id, social_access_token) values( @name, @username, @password, @email, @birthday, @lat, @lon, @created_at, @updated_at, @verification_code, @photo_url, @azure_id, @social_access_token); select * from [users] where id = scope_identity();") 
            .addParam("name", TYPES.VarChar, req.body.name)  
            .addParam("username", TYPES.VarChar, req.body.username) 
            .addParam("password", TYPES.VarChar, md5_pass) 
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

exports.login = function(req, res, callback){
    var TYPES = require("tedious").TYPES; 
    var msSqlConnecter = require("../../sqlhelper"); 
    var dbConfig = require('../../dbConfig');
    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config); 

    var MD5 = function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};
    var pass = req.params.password;
    var md5_pass = (MD5(pass));
    console.log(md5_pass);
    con.connect().then(function () { 
        new con.Request("select * from [users] where email = @email and password = @password and verified = 1")
            .addParam("email", TYPES.VarChar, req.params.email)
            .addParam("password", TYPES.VarChar, md5_pass)                        
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


exports.email_exist = function( req, res, callback){
    var TYPES = require("tedious").TYPES; 
    var msSqlConnecter = require("../../sqlhelper"); 
    var dbConfig = require('../../dbConfig');
    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
    console.log(req.params.userId);
    con.connect().then(function () { 
        new con.Request("select count(id) as count from [users] where email = @email")
            .addParam("email", TYPES.VarChar, req.params.email)  
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

exports.username_exist = function( req, res, callback){
    var TYPES = require("tedious").TYPES; 
    var msSqlConnecter = require("../../sqlhelper"); 
    var dbConfig = require('../../dbConfig');
    var con = new msSqlConnecter.msSqlConnecter(dbConfig.config); 
    console.log(req.params.userId);
    con.connect().then(function () { 
        new con.Request("select count(id) count from [users] where username = @username")
            .addParam("username", TYPES.VarChar, req.params.username)  
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
