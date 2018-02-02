'use strict'

const Sequelize = require("sequelize")
const db = require("./../bd")

module.exports = (sequelize, DataTypes)=>{
    let payment = sequelize.define('payment', {
        id : { type: Sequelize.INTEGER, primaryKey : true, autoIncrement: true },
        reservation_id : { type : Sequelize.INTEGER, references : { model : "reservations", key : "id", allowNull : false } },        
        amount : { type : Sequelize.STRING, allowNull : false },
        resptext : { type : Sequelize.STRING, allowNull : false },
        commandcard : { type : Sequelize.STRING, allowNull : false },
        cvvresp : { type : Sequelize.STRING, allowNull : false },
        batchid : { type : Sequelize.STRING, allowNull : false },
        avsresp : { type : Sequelize.STRING, allowNull : false },
        respcode : { type : Sequelize.STRING, allowNull : false },
				merchid : { type : Sequelize.STRING, allowNull : false },
				token : { type : Sequelize.STRING, allowNull : false },
				authcode : { type : Sequelize.STRING, allowNull : false },
				respproc : { type : Sequelize.STRING, allowNull : false },
				retref : { type : Sequelize.STRING, allowNull : false },
				retstat : { type : Sequelize.STRING, allowNull : false },
				account : { type : Sequelize.STRING, allowNull : false },
				currency : { type : Sequelize.STRING, allowNull : false }
    }, {
        freezeTableName: true,
        tableName: 'comments_operators'
      });
    
      //sequelize.sync()

    return payment
}