'use strict';
const Sequelize = require("sequelize");
const dbConfig = require('../../dbConfig');
const db = dbConfig.sequelizeConfig;

module.exports = (sequelize, DataTypes) => {
  var products = sequelize.define('products', {
        id : { type: Sequelize.INTEGER, primaryKey : true, autoIncrement: true },
        operator_id : {type : Sequelize.INTEGER },
        location_id : { type : Sequelize.INTEGER },
        name : { type : Sequelize.STRING },
        service_type : { type : Sequelize.STRING },
        max_adults : { type: Sequelize.INTEGER },
        max_childs : { type: Sequelize.INTEGER },
        createdAt : { type: Sequelize.DATE },
        updatedAt : { type: Sequelize.DATE },
        old_id : { type : Sequelize.INTEGER }
  }, {
    freezeTableName: true,
    tableName: 'products',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        //operator.belongsTo(model.operator_type);
      }
    }
  });
  /*sequelize.sync().then(function() {
      console.log('----- success');
  }).catch(function(error) {
      console.log('- error \n', error);
  })*/
  return products;
};