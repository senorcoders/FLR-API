const Sequelize = require("sequelize")
const oldBD = require("./conectMysql")
const newBD = require("./../index")

function getProductFields(req, res){
    oldBD.query("select product_id, product_name_1 from product").all()
    .then(function(data){
        //Para agregar el campo old id
        newBD.query("IF COL_LENGTH('products', 'old_id') IS NULL BEGIN ALTER TABLE products ADD [old_id] int END")
        .then(function(){
        /**
        * para insertar los nuevos datos usando llamadas recursivas
         */
        function save(res, arr, i){
            newBD.query("insert into products (old_id, name) values($oldId, $name)", {
                bind : {
                    "oldId" : arr[0][i].product_id,
                    "name" : arr[0][i].product_name_1
                }
            }).then(function(){
                console.log(""+ length+ " :: "+ (i+1))
                i++
                if( i < length){ save(res, i) }
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
        res.send(err)
    })
         
    })
}

module.exports = getProductFields