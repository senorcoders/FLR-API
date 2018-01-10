const coupon = require("../models").coupon

module.exports = {

    getCoupon : function(req, res, next){
        coupon.find({
            where : {
                code : req.params.code,
                product_id : req.params.productId
            }
        }).then(function(data){
            if( data === null){
                data = {
                    message : "coupon not found"
                }
            }

            res.send(data)
        })
        .catch(function(err){
            console.error(err)
            res.send(err)
        })
    },

    save :  function(req, res, next){
        coupon.create({
            product_id : req.body.product_id,
            code : req.body.code,
            amount : req.body.amount,
            type : req.body.type
        }).then(function(data){
            res.send(data)
        })
        .catch(function(err){
            console.error(err)
            res.send(err)
        })
    },

    delete :  function(req, res, next){
        if( !req.params.hasOwnProperty("id") ){
            res.send({
                message : "Error the id parameter is missing"
            })
            return
        }
        coupon.destroy({
            where :{
                id : req.params.id
            }
        }).then(function(data){
            res.send({
                rowsAffect : data
            })
        })
        .catch(function(err){
            console.error(err)
            res.send(err)
        })
    },
}