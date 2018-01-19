const inquiry = require("./../models").inquiry

module.exports = {
    getAll : function(req, res, next){
        inquiry.find({})
        .then(function(data){
            res.send(data)
        })
        .catch(function(err){
            console.error(err)
            res.send(err)
        })
    },
    getOne : function(req, res, next){
        inquiry.findOne({
            where : {
                id : req.params.id
            }
        })
        .then(function(data){
            res.send(data)
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
            res.send(data)
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