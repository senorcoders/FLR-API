//Este es para saber la cantidad de filas en una tabla
const newBD = require("./../index")

function getRowsCount(req, res){
    if(!req.body.hasOwnProperty("table")){
        res.send("Falta el parametro table")
        return
    }

    newBD.query("SELECT * FROM "+ req.body.table).all().then(function(data){
        res.send(data)
    }).catch(function(err){
        res.send(err)
    })
}


module.exports = getRowsCount