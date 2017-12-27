const Sequelize = require("sequelize")
const oldBD = require("./conectMysql")
const newBD = require("./../index")

function updateFieldsLocations(req, res){
    oldBD.query("select product_id, coord_x, coord_y from product_rent_location")
    .then(function(data){
        const length = data[0].length

        //Para agregar el campo old id
        newBD.query("IF COL_LENGTH('locations', 'old_id') IS NULL BEGIN ALTER TABLE locations ADD [old_id] int END")
        .then(function(){
            res.send("Running... check console")
            /**
            * para insertar los nuevos datos usando llamadas recursivas
            */
            function save(res, i){
                newBD.query("insert into locations (name, old_id, lat, lot, created_at, update_at) values('', $oldId, $lat, $lon, '', '')", {
                    bind : {
                        "oldId" : data[0][i].product_id,
                        "lat" : data[0][i].coord_y,
                        "lon" : data[0][i].coord_x
                    }
                }).then(function(){
                    console.log("product_rent_location => locations "+ length+ " :: "+ (i+1))
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
        res.send(err)
    })
         
    })
}

module.exports = updateFieldsLocations