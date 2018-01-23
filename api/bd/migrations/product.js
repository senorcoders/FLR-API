const Sequelize = require("sequelize")
const oldBD = require("./conectMysql")
const newBD = require("./../index")

function getProductFields(req, res){
    let q = String.raw`
    select producto.product_id as oldId, 
    producto.product_name_1 as name_producto, 
    operator.category_id as idOperator 
    from product producto INNER JOIN product_category_xref operator 
    on producto.product_id = operator.product_id
    `

    oldBD.query(q)
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
                let query = String.raw`
                    insert into products (old_id, name, operator_id, location_id) 
                    values($oldId, $name, (select id from operator where old_id = $idOperator), 
                    (select id from locations where old_id = $oldId) )
                `
                newBD.query(query, {
                    bind : {
                        "oldId" : data[0][i].oldId,
                        "name" : data[0][i].name_producto,
                        "idOperator" : data[0][i].idOperator
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
            }

            save(res, 0)
    })
    .catch(function(err){
         console.error(err)
    })
         
    })
}


function updateImageDescripcion(req, res){
    let q = String.raw`
    select product_id as oldId, 
    product_thumb_image as imageName,
    product_desc_1 as descripcion
    from product producto
    `

    oldBD.query(q)
    .then(function(data){
        const length = data[0].length
        //Para agregar el campo old id
        newBD.query("IF COL_LENGTH('products', 'name_image') IS NULL BEGIN ALTER TABLE products ADD [name_image] varchar(8000) null END")
        .then(function(){
            res.send("Running... check console")
            /**
            * para insertar los nuevos datos usando llamadas recursivas
            */
            function save(res, i){
                let query = String.raw`
                update products set descripcion = $descripcion, name_image = $imageName where old_id = $oldId
                `
                newBD.query(query, {
                    bind : {
                        "oldId" : data[0][i].oldId,
                        "imageName" : data[0][i].imageName,
                        "descripcion" : data[0][i].descripcion
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
            }

            save(res, 0)
    })
    .catch(function(err){
         console.error(err)
    })
         
    })
}

module.exports = {
    getProductFields,
    updateImageDescripcion
} 