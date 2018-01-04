'use strict'

const Sequelize = require("sequelize")
const db = require("./../bd")

module.exports = (sequelize, DataTypes)=>{
    let start_operator = sequelize.define('start_operator', {
        id : { type: Sequelize.INTEGER, primaryKey : true, autoIncrement: true },
        user_id : { type : Sequelize.INTEGER, references : { model : "users", key : "id", allowNull : false } },
        operator_id : { type : Sequelize.INTEGER, references: { model : "operator", key : "id", allowNull: false } },
        start : { type : Sequelize.INTEGER, allowNull : false }
    }, {
        freezeTableName: true,
        tableName: 'start_operators'
      });
    
      //sequelize.sync()

    return start_operator
}