const Sequelize = require("sequelize")
const oldBD = require("./conectMysql")
const newBD = require("./../index")

function getRentFields(req, res){
    let q = String.raw`
        select * from rental_fixed_times
    `

    oldBD.query(q)
    .then(function(data){
        const length = data[0].length
        //Para agregar el campo old id
        newBD.query("IF COL_LENGTH('service_hours', 'old_id') IS NULL BEGIN ALTER TABLE service_hours ADD [old_id] int END")
        .then(function(){
            res.send("Running... check console")
            /**
            * para insertar los nuevos datos usando llamadas recursivas
            */
            function save(res, i){
                let stime = data[0][i].stime
                let etime = data[0][i].etime
                var moment = require("moment")
                let duration = moment
                    .duration(moment(etime, 'HH:mm')
                    .diff(moment(stime, 'HH:mm'))
                    ).asMinutes()

                let query = String.raw`
                declare @serviceID int;
                insert into service_dates(product_id, day) values(${data[0][i].product_id}, 1)
                set @serviceID = SCOPE_IDENTITY()
                insert into service_hours(start_hours, duration, service_dates_id, old_id) 
                values('${data[0][i].stime}', ${duration}, @serviceID, ${data[0][i].ftime_id})
                
                declare @serviceID1 int;
                insert into service_dates(product_id, day) values(${data[0][i].product_id}, 2)
                set @serviceID1 = SCOPE_IDENTITY()
                insert into service_hours(start_hours, duration, service_dates_id, old_id) 
                values('${data[0][i].stime}', ${duration}, @serviceID1, ${data[0][i].ftime_id})
                
                declare @serviceID2 int;
                insert into service_dates(product_id, day) values(${data[0][i].product_id}, 3)
                set @serviceID2 = SCOPE_IDENTITY()
                insert into service_hours(start_hours, duration, service_dates_id, old_id) 
                values('${data[0][i].stime}', ${duration}, @serviceID2, ${data[0][i].ftime_id})
                
                declare @serviceID3 int;
                insert into service_dates(product_id, day) values(${data[0][i].product_id}, 4)
                set @serviceID3 = SCOPE_IDENTITY()
                insert into service_hours(start_hours, duration, service_dates_id, old_id) 
                values('${data[0][i].stime}', ${duration}, @serviceID3, ${data[0][i].ftime_id})
                
                declare @serviceID4 int;
                insert into service_dates(product_id, day) values(${data[0][i].product_id}, 5)
                set @serviceID4 = SCOPE_IDENTITY()
                insert into service_hours(start_hours, duration, service_dates_id, old_id) 
                values('${data[0][i].stime}', ${duration}, @serviceID, ${data[0][i].ftime_id})
                
                declare @serviceID5 int;
                insert into service_dates(product_id, day) values(${data[0][i].product_id}, 6)
                set @serviceID5 = SCOPE_IDENTITY()
                insert into service_hours(start_hours, duration, service_dates_id, old_id) 
                values('${data[0][i].stime}', ${duration}, @serviceID5, ${data[0][i].ftime_id})
                `

                    newBD.query(query).then(function(){
                        console.log("rent => services_hours "+ length+ " :: "+ (i+1))
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

module.exports = getRentFields