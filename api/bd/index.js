/**
 * Created by Erick Nunez on 18/12/2017.
 */

"use strict"

const Sequelize = require("sequelize")
const config = require("./../../dbConfig").config

const bd = new Sequelize(config.options.database, config.userName, config.password, {
    host: config.server,
    dialect: 'mssql',
    dialectOptions : {
        encrypt: config.options.encrypt
    },
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: true,
    define: {
        timestamps: false
    }
});

bd
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = bd