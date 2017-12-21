const Sequelize = require("sequelize")
const oldBD = require("./conectMysql")
const newBD = require("./../index")

function getLocationsFields(req, res){
    oldBD.query("select product_id, coord_x, coord_y from product_rent_location").all()
    .then(function(data){
        const length = data[0].length
        //Para agregar el campo old id
        newBD.query("IF COL_LENGTH('locations', 'old_id') IS NULL BEGIN ALTER TABLE locations ADD [old_id] int END")
        .then(function(){
        /**
        * para insertar los nuevos datos usando llamadas recursivas
         */
        function save(res, arr, i){
            newBD.query("insert into locations (name, old_id, lat, lot, created_at, update_at) values('', $oldId, $lat, $lon, '', '')", {
                bind : {
                    "oldId" : arr[0][i].product_id,
                    "lat" : arr[0][i].coord_y,
                    "lon" : arr[0][i].coord_x
                }
            }).then(function(){
                console.log(length+ " :: "+ i)
                if(arr[0].length === i ){
                    newBD.query("select * from locations").all()
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
        res.send(err)
    })
         
    })
}

module.exports = getLocationsFields