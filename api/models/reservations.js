'use strict'

const Sequelize = require("sequelize")
const db = require("./../bd")

module.exports = (sequelize, DataTypes)=>{
    let reservations = sequelize.define('reservations', {
        id : { type: Sequelize.INTEGER, primaryKey : true, autoIncrement: true },
        user_id : { type : Sequelize.INTEGER, references : { model : "users", key : "id", allowNull : false } },
        product_id : { type : Sequelize.INTEGER, references: { model : "products", key : "id", allowNull: false } },
        transaction_date : { type : Sequelize.DATE, allowNull : false },
        transaction_start_date : { type : Sequelize.DATE, allowNull : false },
        transaction_end_date : { type : Sequelize.DATE, allowNull : false },
        transaction_start_time : { type : Sequelize.DATE, allowNull : false },
        transaction_end_time : { type : Sequelize.DATE, allowNull : false },
        transaction : { type : Sequelize.TEXT, allowNull : false },
        number_activity_reserved : { type : Sequelize.INTEGER, allowNull : false },
        nbr_in_party : { type : Sequelize.TEXT, allowNull : false },
        nbr_in_adult : { type : Sequelize.TEXT, allowNull : false },
        nbr_children : { type : Sequelize.TEXT, allowNull : false },
        misc_trip_name : { type : Sequelize.TEXT, allowNull : false },
        price : { type : Sequelize.FLOAT , allowNull : false }
    }, {
        freezeTableName: true,
        tableName: 'reservations'
      });
    
      //sequelize.sync()

    return reservations
}