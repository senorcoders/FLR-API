"use strict"
const favorite_product = require("../models").favorite_product

module.exports = {
    /*Solo para pruebas de desarrollo */
    getAll : function (req, res, callback) {
        favorite_product.findAll().then(function (data) {
            res.send(data)
        }).catch(function (err) {
            console.error(err.message)
        })
    },
    add : function(req, res, callback){
        if( !req.body.hasOwnProperty("user_id") ){
            throw new Error("Falta el parametro:: user_id")
            return;
        }else if( !req.body.hasOwnProperty("product_id") ){
            throw new Error("Falta el parametro:: product_id")
            return;
        }

        favorite_product.create({user_id: req.body.user_id, product_id : req.body.product_id}).then(function (data) {
            res.send(data)
        })
            .catch(function (err) {
                res.send(err.message)
            })

    },
    delete : function (req, res, callback) {

        if( !req.params.hasOwnProperty("id") ){
            throw new Error("Falta el parametro:: id")
            return;
        }

        favorite_product.destroy({
            where : {
                id : req.params.id
            }
        }).then(function (data) {
            res.send({ rowsDeleted : data })
        }).catch(function (err) {
            console.error(err.message)
        })
    },
    getAllXUser : function (req, res, callback) {
        if( !req.params.hasOwnProperty("userId") ){
            throw new Error("Falta el parametro userId")
            return
        }

        let bd = require("./../bd")
        let query = String.raw`
        SELECT op.* from favorite_products fp INNER JOIN products op on fp.product_id = op.id where fp.user_id = ${req.params.userId}
        `
        bd.query(query)
        .then((data)=>{
            res.send(data[0])
        })
        .catch(function (err) {
            console.error(err.message)
        })
    }
}