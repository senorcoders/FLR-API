"use strict"
const favorite_product = require("../models").favorite_product


function getOne (req, res, callback) {
    let bd = require("./../bd")
        let query = String.raw`
        SELECT 
        fp.id as favoriteProductID,
        fp.createdAt as favoriteCreatedAt,
        fp.updatedAt as favoriteUpdatedAt,
        pd.id as productID,
        pd.operator_id as productOperatorID,
        pd.location_id as productLocationID,
        pd.name as productName,
        pd.service_type as productServiceType,
        pd.name_image as nameImage,
        pd.max_adults productMaxAdults,
        pd.max_childs as productmaxChilds,
        pd.old_id as productOldID,
        pd.createdAt as productCreatedAt,
        pd.updatedAt as productUpdateAt
        from favorite_products fp INNER JOIN products pd on fp.product_id = pd.id where fp.product_id = ${req.query.product_id} and fp.user_id  = ${req.params.userId}
        `
        bd.query(query)
        .then((data)=>{
            res.send(data[0])
        })
        .catch(function (err) {
            console.error(err.message)
        })
}

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
        if( req.query.hasOwnProperty("product_id") ){
            getOne(req, res, callback)
            return
        }
        if( !req.params.hasOwnProperty("userId") ){
            throw new Error("Falta el parametro userId")
            return
        }

        let bd = require("./../bd")
        let query = String.raw`
        SELECT 
        fp.id as favoriteProductID,
        fp.createdAt as favoriteCreatedAt,
        fp.updatedAt as favoriteUpdatedAt,
        pd.id as productID,
        pd.operator_id as productOperatorID,
        pd.location_id as productLocationID,
        pd.name as productName,
        pd.name_image as nameImage,
        pd.service_type as productServiceType,
        pd.max_adults productMaxAdults,
        pd.max_childs as productmaxChilds,
        pd.old_id as productOldID,
        pd.createdAt as productCreatedAt,
        pd.updatedAt as productUpdateAt
        from favorite_products fp INNER JOIN products pd on fp.product_id = pd.id where fp.user_id = ${req.params.userId}
        `
        bd.query(query)
        .then((data)=>{
            res.send(data[0])
        })
        .catch(function (err) {
            console.error(err.message)
        })
    },

    getOne

}