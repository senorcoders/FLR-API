'use strict';
const Sequelize = require("sequelize");
const dbConfig = require('../../dbConfig');
const db = dbConfig.sequelizeConfig;

module.exports = (sequelize, DataTypes) => {
  var inquiry = sequelize.define('inquiry', {
        id : { type: Sequelize.INTEGER, primaryKey : true, autoIncrement: true },
        name : { type : Sequelize.STRING, allowNull : false },
        email : { type : Sequelize.STRING, allowNull : false },
        phone : { type : Sequelize.STRING, allowNull : false },
        message : { type : Sequelize.STRING, allowNull : false },
        product_id : { type : Sequelize.INTEGER, references : { model : 'products', key : 'id', allowNull : false } }
  }, {
    freezeTableName: true,
    tableName: 'inquirys',
    classMethods: {
      associate: function(models) {
      }
    }
  });
  //sequelize.sync()
  return inquiry;
};