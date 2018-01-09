'use strict'

const Sequelize = require("sequelize")
const db = require("./../bd")

module.exports = (sequelize, DataTypes)=>{
    let star_operator = sequelize.define('star_operator', {
        id : { type: Sequelize.INTEGER, primaryKey : true, autoIncrement: true },
        user_id : { type : Sequelize.INTEGER, references : { model : "users", key : "id", allowNull : false } },
        operator_id : { type : Sequelize.INTEGER, references: { model : "operator", key : "id", allowNull: false } },
        start : { type : Sequelize.INTEGER, allowNull : false }
    }, {
        freezeTableName: true,
        tableName: 'star_operators'
      });
    
      //sequelize.sync()

    return star_operator
}