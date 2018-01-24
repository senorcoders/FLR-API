'use strict'

const Sequelize = require("sequelize")
const db = require("./../bd")

module.exports = (sequelize, DataTypes)=>{
    var product_type = sequelize.define('product_type', {
        product_id : { type : Sequelize.INTEGER, references : { model : 'products', key : 'id' } },
        old_id : { type : Sequelize.INTEGER, allowNull : true },
        name : { type : Sequelize.STRING, allowNull : true },
        name_image : { type : Sequelize.STRING,  allowNull : true },
        show_map : { type : Sequelize.INTEGER, allowNull : true }
    }, {
        freezeTableName: true,
        tableName: 'products_types'
      });

      //sequelize.sync()

    return product_type
}