'use strict'

const Sequelize = require("sequelize")
const db = require("./../bd")

module.exports = (sequelize, DataTypes)=>{
    let service_dates = sequelize.define('service_dates', {
        id : { type: Sequelize.INTEGER, primaryKey : true, autoIncrement: true },
        product_id : { type : Sequelize.INTEGER, references : { model : "products", key : "id", allowNull : false } },
        day : { type : Sequelize.INTEGER, allowNull : false }        
    }, {
        freezeTableName: true,
        tableName: 'service_dates'
      });
    
      //sequelize.sync()

    return service_dates
}