'use strict'

const Sequelize = require("sequelize")
const db = require("./../bd")

module.exports = (sequelize, DataTypes)=>{
    var coupon = sequelize.define("coupon", {
        id : { type: Sequelize.INTEGER, primaryKey : true, autoIncrement: true },
        code : { type : Sequelize.STRING, allowNull : false },
        product_id : { type : Sequelize.INTEGER, references: { model : "products", key : "id", allowNull: false } },
        amount : { type : Sequelize.FLOAT, allowNull : false },
        type : { type : Sequelize.STRING, allowNull : false }
    }, {
        freezeTableName: true,
        tableName: 'coupons'
      });

      //sequelize.sync()

    return coupon
}