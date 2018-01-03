'use strict'

const Sequelize = require("sequelize")
const db = require("./../bd")

module.exports = (sequelize, DataTypes)=>{
    var favorite_operator = sequelize.define("favorite_operator", {
        id : { type: Sequelize.INTEGER, primaryKey : true, autoIncrement: true },
        user_id : { type : Sequelize.INTEGER, references : { model : "users", key : "id", allowNull : false } },
        operator_id : { type : Sequelize.INTEGER, references: { model : "operator", key : "id", allowNull: false } }
    }, {
        freezeTableName: true,
        tableName: 'favorite_operators'
      });

    return favorite_operator
}
/*const favorite_operator = db.define("favorite_operator", {
    id : { type: Sequelize.INTEGER, primaryKey : true, autoIncrement: true },
    user_id : {type : Sequelize.INTEGER, references : { model : "users", key : "id", allowNull : false } },
    operator_id : { type : Sequelize.INTEGER, references: { model : "operator", key : "id", allowNull: false } }
})

module.exports = favorite_operator*/