'use strict';
const Sequelize = require("sequelize");
const dbConfig = require('../../dbConfig');
const db = dbConfig.sequelizeConfig;

module.exports = (sequelize, DataTypes) => {
  var operator = sequelize.define('operator', {
        id : { type: Sequelize.INTEGER, primaryKey : true, autoIncrement: true },
        operator_name : {type : Sequelize.STRING },
        operator_type : { type : Sequelize.STRING },
        time_zone : { type : Sequelize.STRING },
        currency : { type : Sequelize.STRING },
        createdAt : { type: Sequelize.DATE },
        updatedAt : { type: Sequelize.DATE },
        old_id : { type : Sequelize.STRING }
  }, {
    freezeTableName: true,
    tableName: 'operator',
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
  return operator;
};