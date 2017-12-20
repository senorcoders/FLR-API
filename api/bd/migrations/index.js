
const Sequelize = require("sequelize")
const oldBD = require("./conectMysql")
const newBD = require("./../index")

/*********
 * Modelos para la nueva bd
 */
const operator = newBD.define("operator", {
    old_id : { type : Sequelize.INTEGER, primaryKey : false, allowNull : true},
    operator_name : { type : Sequelize.STRING, allowNull : false },
})

newBD.sync()

function getCategoryFields(req, res){
    oldBD.query("select category_id, category_name_1 as operator_name from category").all().then(function(data){
        
        //Para Agregar old_id
        newBD.query("ALTER TABLE operator ALTER COLUMN [old_id] varchar(32)")
        .then(function(){

            //Para agregar operator_name
            newBD.query("IF COL_LENGTH('operator', 'operator_name') IS NULL BEGIN ALTER TABLE operator ADD [operator_name] varchar(250) END")
            .then(function(result){
                
                /**
                 * para insertar los nuevos datos usando llamadas recursivas
                 */
                function save(res, arr, i){
                    newBD.query("insert into operator (old_id, operator_name) values($oldId, $operatorName)", {
                        bind : {
                            "oldId" : arr[0][i].category_id,
                            "operatorName" : arr[0][i].operator_name
                        }
                    }).then(function(){
                        
                        if(arr[0].length === i ){
                            newBD.query("select * from operator").all()
                            .then(function(data){
                                res.send(data)
                            })
                            .catch(function(err){
                                res.send(err)
                            })
                            return
                        }
                            
                        save(res, arr, i++)
                    })
                    .catch(function(err){
                        console.error("error en el item :"+ i+ " data: "+ arr[0][i]+ err.message)
                        res.send("error en el item :"+ i+ " data: "+ arr[0][i]+ err.message)
                    })
                }

                save(res, data, 0)
            })
            .catch(function(err){
                console.error(err)
            })

        })
        .catch(function(err){
            console.error(err)
        })
        
    })
    .catch(function(err){
        console.error(err)
    })
}

function migraCategoryFields (req, res){
    getCategoryFields(req, res)
    /*operadores.findAll({}).then(function(data){
        res.send(data)
    }).catch(function(err){
        res.send(err)
    })*/
}


module.exports = {
    migraCategoryFields
}