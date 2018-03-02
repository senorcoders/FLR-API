'use strict'

const Sequelize = require("sequelize")
const db = require("./../bd")

module.exports = (sequelize, DataTypes)=>{
    let reservations = sequelize.define('reservations', {
        ID : { type: Sequelize.INTEGER, primaryKey : true, autoIncrement: true },
        user_id : { type : Sequelize.INTEGER, references : { model : "users", key : "id", allowNull : true } },
        guest_id : { type : Sequelize.INTEGER, references : { model : "guest", key : "id", allowNull : true } },
        product_id : { type : Sequelize.INTEGER, references: { model : "products", key : "id", allowNull: false } },
        transaction_date : { type : Sequelize.TEXT, allowNull : false },
        transaction_start_date : { type : Sequelize.TEXT, allowNull : false },
        transaction_end_date : { type : Sequelize.TEXT, allowNull : true },
        transaction_start_time : { type : Sequelize.TEXT, allowNull : false },
        transaction_end_time : { type : Sequelize.TEXT, allowNull : true },        
        activity_type : { type : Sequelize.TEXT, allowNull : false },
        number_activity_reserved : { type : Sequelize.FLOAT, allowNull : false },
        nbr_in_party : { type : Sequelize.TEXT, allowNull : false },
        nbr_in_adult : { type : Sequelize.TEXT, allowNull : false },
        nbr_children : { type : Sequelize.TEXT, allowNull : false },
        misc_trip_name : { type : Sequelize.TEXT, allowNull : false },
        price : { type : Sequelize.FLOAT , allowNull : false },
        payment_id : { type :Sequelize.TEXT, allowNull : true }
    }, {
        freezeTableName: true,
        tableName: 'reservations'
      });
    
    //sequelize.sync()

    return reservations
}
