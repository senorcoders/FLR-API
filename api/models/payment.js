'use strict'

const Sequelize = require("sequelize")
const db = require("./../bd")

module.exports = (sequelize, DataTypes)=>{
    let payment = sequelize.define('payment', {
        id : { type: Sequelize.INTEGER, primaryKey : true, autoIncrement: true },
        //reservation_id : { type : Sequelize.INTEGER, references : { model : "reservations", key : "id", allowNull : true } },        
        amount : { type : Sequelize.STRING, allowNull : false },
        resptext : { type : Sequelize.STRING, allowNull : false },
        commandcard : { type : Sequelize.STRING, allowNull : true },
        cvvresp : { type : Sequelize.STRING, allowNull : true },
        batchid : { type : Sequelize.STRING, allowNull : true },
        avsresp : { type : Sequelize.STRING, allowNull : true },
        respcode : { type : Sequelize.STRING, allowNull : false },
		merchid : { type : Sequelize.STRING, allowNull : false },
		token : { type : Sequelize.STRING, allowNull : true },
		authcode : { type : Sequelize.STRING, allowNull : true },
		respproc : { type : Sequelize.STRING, allowNull : false },
		retref : { type : Sequelize.STRING, allowNull : false },
		retstat : { type : Sequelize.STRING, allowNull : true },
		account : { type : Sequelize.STRING, allowNull : true },
		currency : { type : Sequelize.STRING, allowNull : false }
    }, {
        freezeTableName: true,
        tableName: 'payment'
      });

      //sequelize.sync()

    return payment
}
