const Sequelize = require("sequelize")
const oldBD = require("./conectMysql")
const newBD = require("./../index")

function getPricingFields(req, res){
    oldBD.query("select * from rental_fixed_times")
    .then(function(data){
        const length = data[0].length

        //Para agregar el campo old id
        newBD.query("IF COL_LENGTH('pricing', 'old_id') IS NULL BEGIN ALTER TABLE pricing ADD [old_id] int END")
        .then(function(){
            res.send("Running... check console")
            /**
            * para insertar los nuevos datos usando llamadas recursivas
            */
            function save(res, i){
                newBD.query("insert into pricing (price, product_id, old_id) values($price, $productId, $oldId)", {
                    bind : {
                        "oldId" : data[0][i].ftime_id,
                        "productId" : data[0][i].product_id,
                        "price" : data[0][i].price
                    }
                }).then(function(){
                    console.log("rental_fixed_times => pricing "+ length+ " :: "+ (i+1))
                    i++
                    if( i < length){ save(res, i) }
                    else
                        console.log("finished")
                })
                .catch(function(err){
                    console.error("error en el item :"+ i+ " data: "+ JSON.stringify(data[0][i])+ err.message)
                    res.send("error en el item :"+ i+ " data: "+ JSON.stringify(data[0][i])+ err.message)
                })
            }

            save(res, 0)
    })
    .catch(function(err){
         console.error(err)
        res.send(err)
    })
         
    })
}

function getPricingFieldsMore(req, res){
    oldBD.query("select id, price, rental_id as productID, pname as pricePlan from rental_fixed_prices")
    .then(function(data){
        const length = data[0].length

        //Para agregar el campo old id
        newBD.query("IF COL_LENGTH('pricing', 'old_id') IS NULL BEGIN ALTER TABLE pricing ADD [old_id] int END")
        .then(function(){
            res.send("Running... check console")
            /**
            * para insertar los nuevos datos usando llamadas recursivas
            */
            function save(res, i){
                var query = String.raw`
                    if not exists(select * from pricing where old_id = $oldId ) begin
                        insert into pricing (price, price_plan, product_id, old_id) values($price, $pricePlan, $productId, $oldId)
                    end;
                `
                newBD.query(query, {
                    bind : {
                        "oldId" : data[0][i].id,
                        "productId" : data[0][i].productID,
                        "pricePlan" : data[0][i].pricePlan,
                        "price" : data[0][i].price
                    }
                }).then(function(){
                    console.log("rental_fixed_prices => pricing "+ length+ " :: "+ (i+1))
                    i++
                    if( i < length){ save(res, i) }
                    else
                        console.log("finished")
                })
                .catch(function(err){
                    console.error("error en el item :"+ i+ " data: "+ JSON.stringify(data[0][i])+ err.message)
                    res.send("error en el item :"+ i+ " data: "+ JSON.stringify(data[0][i])+ err.message)
                })
            }

            save(res, 0)
    })
    .catch(function(err){
         console.error(err)
        res.send(err)
    })
         
    })
}

function updateFields(req, res){
    newBD.query("select id, product_id as oldID from pricing where old_id is not null ")
    .then(function(data){
        const length = data[0].length
        res.send("Running... check console")
        /**
        * para insertar los nuevos datos usando llamadas recursivas
        */
        function save(res, i){
            var query = String.raw`
            update pricing set product_id = (select id from products where old_id = $oldID) where id = $id
            `
            newBD.query(query, {
                bind : {
                    "oldID" : data[0][i].oldID,
                    "id" : data[0][i].id
                }
            }).then(function(){
                console.log("rental_fixed_prices => pricing "+ length+ " :: "+ (i+1))
                i++
                if( i < length){ save(res, i) }
                else
                    console.log("finished")
            })
            .catch(function(err){
                console.error("error en el item :"+ i+ " data: "+ JSON.stringify(data[0][i])+ err.message)
                res.send("error en el item :"+ i+ " data: "+ JSON.stringify(data[0][i])+ err.message)
            })
        }

        save(res, 0)
    .catch(function(err){
         console.error(err)
        res.send(err)
    })
         
    })
}

module.exports = {
    getPricingFields,
    getPricingFieldsMore,
    updateFields
} 