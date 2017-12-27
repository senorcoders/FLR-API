const Sequelize = require("sequelize")
const oldBD = require("./conectMysql")
const newBD = require("./../index")

function getLocationsFields(req, res){
    oldBD.query("select product_id, coord_x, coord_y from product_rent_location")
    .then(function(data){
        const length = data[0].length

        res.send("Running... check console")
        /**
        * para insertar los nuevos datos usando llamadas recursivas
        */
        function save(res, i){
            newBD.query("if not EXISTS(select * from locations where old_id = $oldId) begin insert into locations (name, old_id, lat, lot, created_at, update_at) values('', $oldId, $lat, $lon, '', '') end", {
                bind : {
                    "oldId" : data[0][i].product_id,
                    "lat" : data[0][i].coord_y,
                    "lon" : data[0][i].coord_x
                }
            }).then(function(){
                console.log("product_rent_location => locations "+ length+ " :: "+ (i+1))
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
}

module.exports = getLocationsFields