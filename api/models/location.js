'use strict';
const Sequelize = require("sequelize");
const dbConfig = require('../../dbConfig');
const db = dbConfig.sequelizeConfig;

module.exports = (sequelize, DataTypes) => {
  var locations = sequelize.define('locations', {
        id : { type: Sequelize.INTEGER, primaryKey : true, autoIncrement: true },
        location_type_id : {type : Sequelize.INTEGER },
        name : { type : Sequelize.STRING },
        lot : { type : Sequelize.STRING },
        lat : { type : Sequelize.STRING },
        geo : { type : Sequelize.STRING },
        supplier_id : { type : Sequelize.INTEGER },
        time_zone : { type : Sequelize.STRING },
        currency : { type : Sequelize.STRING },
        address : { type : Sequelize.STRING },
        country : { type : Sequelize.STRING },
        phone : { type : Sequelize.STRING },
        hours_operation : { type : Sequelize.STRING },
        website : { type : Sequelize.STRING },
        contact_name : { type : Sequelize.STRING },
        contact_email : { type : Sequelize.STRING },
        contact_mobile : { type : Sequelize.STRING },
        createdAt : { type: Sequelize.DATE },
        updatedAt : { type: Sequelize.DATE },
        old_id : { type : Sequelize.STRING }
  }, {
    freezeTableName: true,
    tableName: 'locations',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        locations.belongsTo(models.products);
      }
    }
  });
  return locations;
};