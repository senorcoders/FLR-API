const Sequelize = require("sequelize")
const oldBD = require("./conectMysql")
const newBD = require("./../index")


function getCategoryFields(req, res){
    oldBD.query("select category_id, category_name_1 from `category` limit 100", {
        
    }).then(function(data){
        //Para Agregar old_id
        newBD.query("IF COL_LENGTH('operator', 'old_id') IS NULL BEGIN ALTER TABLE operator ADD [old_id] varchar(32) END")
        .then(function(){

            //Para agregar operator_name
            newBD.query("IF COL_LENGTH('operator', 'operator_name') IS NULL BEGIN ALTER TABLE operator ADD [operator_name] varchar(250) END")
            .then(function(result){
                res.send("Running... check console")
                /**
                 * para insertar los nuevos datos usando llamadas recursivas
                 */
                const length = data[0].length
                function save(res, i){
                    newBD.query("insert into operator (old_id, operator_name) values($oldId, $operatorName)", {
                        bind : {
                            "oldId" : data[0][i].category_id,
                            "operatorName" : data[0][i].category_name_1
                        }
                    }).then(function(){
                        console.log(length+ " :: "+ (i+1))
                        i++
                        if( i < length){ save(res, i) }
                        
                    })
                    .catch(function(err){
                        console.error("error en el item :"+ i+ " data: "+ data[0][i]+ err.message)
                    })
                }

                save(res, 0)
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

module.exports = getCategoryFields