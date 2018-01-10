const Sequelize = require("sequelize")
const oldBD = require("./conectMysql")
const newBD = require("./../index")

function getProductFields(req, res){
    let q = String.raw`
        select * from rental_fixed_times
    `

    oldBD.query(q)
    .then(function(data){
        const length = data[0].length
        //Para agregar el campo old id
        newBD.query("IF COL_LENGTH('service_hours', 'old_id') IS NULL BEGIN ALTER TABLE products ADD [old_id] int END")
        .then(function(){
            res.send("Running... check console")
            /**
            * para insertar los nuevos datos usando llamadas recursivas
            */
            function save(res, i){
                let query = String.raw`
                    insert into service_dates(product_id, day)
                    values($productID, 1)
                    values($productID, 2)
                    values($productID, 3)
                    values($productID, 4)
                    values($productID, 5)
                    values($productID, 6)
                `
                newBD.query(query, {
                    bind : {
                        "productID" : data[0][i].product_id
                    }
                }).then(function(){
                    /****
                    Para insertar los hours
                    */
                    let query = String.raw`
                    insert into service_hours(start_hours, duration, service_date_id, old_id) 
                    values($startHours, $duration, $serviceDateID, $oldId)
                    `
                    newBD.query(query, {
                        bind : {
                            "startHours" : data[0][i].oldId,
                            "duration" : data[0][i].name_producto,
                            "serviceDateID" : data[0][i].idOperator,
                            "oldId" : data[0][i].ftime_id
                        }
                    }).then(function(){
                        console.log("product => products "+ length+ " :: "+ (i+1))
                        i++
                        if( i < length){ save(res, i) }
                        else
                            console.log("finished")
                    })
                    .catch(function(err){
                        console.error("error en el item :"+ i+ " data: "+ JSON.stringify(data[0][i])+ err.message)
                        res.send("error en el item :"+ i+ " data: "+ JSON.stringify(data[0][i])+ err.message)
                    })
            
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
    })
         
    })
}

module.exports = getProductFields