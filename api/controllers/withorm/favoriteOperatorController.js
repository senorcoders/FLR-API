/**
 * Created by Erick Nunez on 18/12/2017.
 */
"use strict"
const Sequelize = require("sequelize")
const db = require("./../../bd")

const favorite_operator = db.define("favorite_operator", {
    id : { type: Sequelize.INTEGER, primaryKey : true, autoIncrement: true },
    user_id : {type : Sequelize.INTEGER, references : { model : "users", key : "id", allowNull : false } },
    operator_id : { type : Sequelize.INTEGER, references: { model : "operator", key : "id", allowNull: false } }
})

db.sync().then(function() {
    console.log('----- success');
}).catch(function(error) {
    console.log('- error \n', error);
})

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
        if( !req.body.hasOwnProperty("operator_id") ){
            throw new Error("Falta el parametro operator_id")
            return
        }

        favorite_operator.findAll({
            where : {
                user_id : req.body.operator_id
            }
        }).then(function (data) {
            res.send(data)
        }).catch(function (err) {
            res.send(err.message)
        })
    }
}