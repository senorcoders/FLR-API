const Sequelize = require("sequelize")
const oldBD = require("./conectMysql")
const newBD = require("./../index")

function getProductFields(req, res){
    oldBD.query("select product_id, product_name_1 from product limit 10")
    .then(function(data){
        const length = data[0].length
        //Para agregar el campo old id
        newBD.query("IF COL_LENGTH('products', 'old_id') IS NULL BEGIN ALTER TABLE products ADD [old_id] int END")
        .then(function(){
            res.send("Running... check console")
            /**
            * para insertar los nuevos datos usando llamadas recursivas
            */
            function save(res, i){
                newBD.query("insert into products (old_id, name) values($oldId, $name)", {
                    bind : {
                        "oldId" : data[0][i].product_id,
                        "name" : data[0][i].product_name_1
                    }
                }).then(function(){
                    console.log("product => products "+ length+ " :: "+ (i+1))
                    i++
                    if( i < length){ save(res, i) }
                })
                .catch(function(err){
                    console.error("error en el item :"+ i+ " data: "+ data[0][i].stringify()+ err.message)
                    res.send("error en el item :"+ i+ " data: "+ data[0][i].stringify()+ err.message)
                })
            }

            save(res, 0)
    })
    .catch(function(err){
         console.error(err)
    })
         
    })
}

module.exports = getProductFields