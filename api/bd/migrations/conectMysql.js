
const Sequelize = require("sequelize")

const bd = new Sequelize("findlocalrentals", "flrdev2016", "kC4!@uJTfC",{
    host : "findlocalrentals.net",
    dialect : "mysql",
    port : 3306
})

bd.authenticate()
.then(function(){
    console.log("Coneccion Establecida con mysql::: old db")
})
.catch(function(err){
    console.error("Error al conectarse a ld db: "+ err.message)
})

module.exports = bd