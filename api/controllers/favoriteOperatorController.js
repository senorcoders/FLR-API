"use strict"
const favorite_operator = require("../models").favorite_operator

module.exports = {
    /*Solo para pruebas de desarrollo */
    getAll : function (req, res, callback) {
        favorite_operator.findAll().then(function (data) {
            res.send(data)
        }).catch(function (err) {
            console.error(err.message)
        })
    },
    add : function(req, res, callback){
        if( !req.body.hasOwnProperty("user_id") ){
            throw new Error("Falta el parametro:: user_id")
            return;
        }else if( !req.body.hasOwnProperty("operator_id") ){
            throw new Error("Falta el parametro:: operator_id")
            return;
        }

        favorite_operator.create({user_id: req.body.user_id, operator_id : req.body.operator_id}).then(function (data) {
            res.send(data)
        })
            .catch(function (err) {
                res.send(err.message)
            })

    },
    delete : function (req, res, callback) {

        if( !req.body.hasOwnProperty("operator_id") ){
            throw new Error("Falta el parametro:: operator_id")
            return;
        }

        favorite_operator.destroy({
            where : {
                id : req.body.operator_id
            }
        }).then(function (data) {
            res.send({ rowsDeleted : data })
        }).catch(function (err) {
            console.error(err.message)
        })
    },
    getAllXUser : function (req, res, callback) {
        if( !req.body.hasOwnProperty("userId") ){
            throw new Error("Falta el parametro userId")
            return
        }

        let bd = require("./../bd")
        let query = String.raw`
        SELECT op.* from favorite_operators fp INNER JOIN operator op on fp.operator_id = op.id where fp.user_id = ${req.body.userId}
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