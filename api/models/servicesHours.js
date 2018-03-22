'use strict'

const Sequelize = require("sequelize")
const db = require("./../bd")

module.exports = (sequelize, DataTypes)=>{
    let service_hours = sequelize.define('service_hours', {
        id : { type: Sequelize.INTEGER, primaryKey : true, autoIncrement: true },
        service_dates_id : { type : Sequelize.INTEGER, references : { model : "service_dates", key : "id", allowNull : false } },
        start_hours : { type : Sequelize.TEXT, allowNull : false },        
        duration : { type : Sequelize.INTEGER, allowNull : false }        
    }, {
        freezeTableName: true,
        tableName: 'service_hours'
      });
    
      //sequelize.sync()

    return service_hours
}