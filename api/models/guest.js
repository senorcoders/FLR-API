'use strict'

const Sequelize = require("sequelize")
const db = require("./../bd")

module.exports = (sequelize, DataTypes)=>{
    let guest = sequelize.define('guest', {
        id : { type: Sequelize.INTEGER, primaryKey : true, autoIncrement: true },
        device_id : { type : Sequelize.STRING, allowNull : true },
        email : { type : Sequelize.STRING, allowNull : true },
        phone : { type : Sequelize.STRING, allowNull : true },
        address : { type : Sequelize.STRING, allowNull : true }
    }, {
        freezeTableName: true,
        tableName: 'guest'
      });
    
      //sequelize.sync()

    return guest
}