/**
 * Created by Erick Nunez on 18/12/2017.
 */

"use strict"

const Sequelize = require("sequelize")

const bd = new Sequelize('find-local-rentals-api', 'senorcoders', 'Helium33', {
    host: 'find-local-rentals.database.windows.net',
    dialect: 'mssql',
    dialectOptions : {
        encrypt: true
    },
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: true
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