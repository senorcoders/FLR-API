/**
 * Created by Erick Nunez on 18/12/2017.
 */
"use strict"
const Sequelize = require("sequelize")
const sequelize = require("./../../bd")

const favorite_operator = sequelize.define("favorite_operator", {
    id : { type: Sequelize.INTEGER, primaryKey : true },
    user_id : {type : Sequelize.INTEGER, references : { model : "user", key : "id" } },
    operator_id : { type : Sequelize.INTEGER, references: { model : "operator", key : "id" } }
})

module.exports = {
    add : function(req, res, callback){
        console.log(req.body, req.params)
        favorite_operator.findAll().then(function (data) {
            res.send(data)
        })
            .catch(function (err) {
                res.send(err.message)
            })

    },
    delete : function (req, res, callback) {
        console.log(req.body, req.params)
    }
}