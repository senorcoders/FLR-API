'use strict'

const Sequelize = require("sequelize")
const db = require("./../bd")

module.exports = (sequelize, DataTypes)=>{
    let comments_operator = sequelize.define('comments_operator', {
        id : { type: Sequelize.INTEGER, primaryKey : true, autoIncrement: true },
        user_id : { type : Sequelize.INTEGER, references : { model : "users", key : "id", allowNull : false } },
        operator_id : { type : Sequelize.INTEGER, references: { model : "operator", key : "id", allowNull: false } },
        content : { type : Sequelize.STRING, allowNull : false },
        date_create : { type : Sequelize.STRING, allowNull : false }
    }, {
        freezeTableName: true,
        tableName: 'comments_operators'
      });
    
      //sequelize.sync()

    return comments_operator
}