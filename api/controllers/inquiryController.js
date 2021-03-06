const inquiry = require("./../models").inquiry
const Sequelize = require("sequelize")
const Products = require("../models/").products

function getXEmail(req, res, next){
    let db = require("./../bd")
    let query = String.raw`
    select 
    inquirys.id as inquiryID,
    inquirys.name as inquiryName,
    inquirys.email as inquiryEmail,
    inquirys.message as inquiryMessage,
    inquirys.phone as inquiryPhone,
    inquirys.createdAt as inquiryCreatedAts,
    products.* from inquirys inner join products on inquirys.product_id = products.id
    where inquirys.email = '${ req.query.email }'
    `
    db.query(query)
    .then(function(data){
        res.send(data[0])
    })
    .catch(function(err){
        console.log(err)
        res.send(err)
    })
}

module.exports = {
    getAll : function(req, res, next){
        if( req.query.hasOwnProperty("email") ){
            getXEmail(req, res, next)
        }
        let db = require("./../bd")
		let query = String.raw`
        select 
        inquirys.id as inquiryID,
        inquirys.name as inquiryName,
        inquirys.email as inquiryEmail,
        inquirys.message as inquiryMessage,
        inquirys.phone as inquiryPhone,
        inquirys.createdAt as inquiryCreatedAts,
        products.* from inquirys inner join products on inquirys.product_id = products.id
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
    getXEmail,
    getOne : function(req, res, next){
        inquiry.findOne({
            where : {
                id : req.params.id
            }
        })
        .then(function(data){
            console.log(JSON.parse( JSON.stringify(data)) ) 
            Products.findOne({
                where : {
                    id : data.product_id
                }
            })
            .then(function(p){
                res.send({
                    inquiry : data,
                    product: p
                })
            })
            .catch(function(err){
                console.error(err)
                res.send(err)
            })
            
        })
        .catch(function(err){
            console.error(err)
            res.send(err)
        })
    },
    save : function(req, res, next){
        inquiry.create({
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            message : req.body.message,
            product_id : req.body.product_id
        })
        .then(function(data){
            
            let query = String.raw`
            SELECT products.*, operator.operator_name as operatorName
            from products inner join operator on products.operator_id = operator.id
            where products.id = ${ req.body.product_id }
            `
            let bd = require("./../bd")
            bd.query(query)
            .then(function(producto){

                let product = producto[0][0];

                query = String.raw`
                select locations.address as locationAddress
                from products inner join locations on products.location_id = locations.id
                where products.id = ${ req.body.product_id }
                `

                bd.query(query)
                .then((location)=>{

                    product.locationAddress = location[0][0].locationAddress || "";
                    console.log("1", product, product.locationAddress);

                    try{
                        require("../../mailer").sendNoticationInquiry({
                            email : req.body.email,
                            name: req.body.name, 
                            phone: req.body.phone
                        }, product, data);
                    }catch(e){
                        console.error(e);
                    }
                    
                    res.send(data)
                })
                .catch();

            })
            .catch(function(err){
                console.error(err)
                res.send(err)
            })
        })
        .catch(function(err){
            console.error(err)
            res.send(err)
        })
    },
    update : function(req, res, next){
        inquiry.update({
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            message : req.body.message,
            product_id : req.body.product_id
        },
        {
            where : {
                id : req.params.id
            }
        })
        .then(function(data){
            res.send({
                affectRows : data
            })
        })
        .catch(function(err){
            console.error(err)
            res.send(err)
        })
    },
    delete : function(req, res, next){
        inquiry.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(function(data){
            res.send({
                affectRows : data
            })
        })
        .catch(function(err){
            console.error(err)
            res.send(err)
        })
    }
}