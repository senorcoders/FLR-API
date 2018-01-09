'use strict'
const reservations = require("./../models").reservations

module.exports = {
    get_all : (req, res)=>{
        reservations.findAll()
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    save : (req, res)=>{
        if( !req.body.hasOwnProperty("user_id") ){
            throw new Error("Falta el parametro :: user_id")
            return;
        }else if(!req.body.hasOwnProperty("product_id") ){
            throw new Error("Falta el parametro :: product_id")
            return;
        } 
        reservations.create({ 
                                user_id : req.body.user_id, 
                                product_id : req.body.product_id, 
                                activity_type : req.body.activity_type,
                                transaction_date : req.body.transaction_date,
                                transaction_start_date : req.body.transaction_start_date,
                                transaction_end_date : req.body.transaction_end_date,
                                transaction_start_time : req.body.transaction_start_time,
                                transaction_end_time : req.body.transaction_end_time,
                                transaction_status : req.body.transaction_status,
                                number_activity_reserved : req.body.number_activity_reserved,
                                nbr_in_party : req.body.nbr_in_party,
                                nbr_in_adult : req.body.nbr_in_adult,
                                nbr_children : req.body.nbr_children,
                                misc_trip_name : req.body.misc_trip_name,
                                price : req.body.price,
                                payment_id : req.body.payment_id                                
                            })
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    get : (req, res)=>{
        reservations.find({ id : req.body.id})
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    delete : (req, res)=>{
        reservations.destroy({
            where: {
                id : req.body.id
            }
        })
        .then((data)=>{
            res.send({ affectRows : data})
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    update : (req, res)=>{
        reservations.update({
            transaction_date : req.body.transaction_date,
            transaction_start_date : req.body.transaction_start_date,
            transaction_end_date : req.body.transaction_end_date,
            transaction_start_time : req.body.transaction_start_time,
            transaction_end_time : req.body.transaction_end_time,
            transaction_status : req.body.transaction_status,
            number_activity_reserved : req.body.number_activity_reserved,
            nbr_in_party : req.body.nbr_in_party,
            nbr_in_adult : req.body.nbr_in_adult,
            nbr_children : req.body.nbr_children,
            misc_trip_name : req.body.misc_trip_name,
            price : req.body.price,
            payment_id : req.body.payment_id   
        },{
            where: {
                id : req.body.id
            }
        })
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    update_payment_token : (req, res)=>{
        reservations.update({
            payment_id : req.body.payment_id
        },{
            where : {
                id : req.body.id
            }
        })
        .then((data)=>{
            res.send(data);
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message);
        })
    },
    getAllNotPassed : (req, res)=>{
        let db = require("./../bd")
        let query = String.raw`
        select 
        rs.id as reservationID,
        rs.transaction_date as transactionDate,
        rs.transaction_start_date as transactionStartDate,
        rs.transaction_end_date as transactionEndtTime,
        rs.transaction_start_time as transactionStartTime,
        rs.transaction_end_time as transactionEndTime,
        rs.price as Price,
        op.id as operatorID,
        op.operator_name as operatorName,
        op.operator_type as operatorType,
        op.time_zone as operatorTimeZona,
        op.currency as operatorCurrency,
        op.business_type as operatorBusinessType,
        pds.id as productID,
        pds.name as productName,
        pr.id as priceID,
        pr.price as productPrice,
        pr.price_plan as pricePlan,
        pr.available_date as priceAvailableDate,
        pr.available_time as priceAvailableTime,
        pr.end_date as priceEndDate,
        pr.end_time as priceEndTime,
        loc.id as locationID,
        loc.lat as locationLatitud,
        loc.lot as locationLongitud,
        loc.name as locationName,
        loc.currency as locationCurrency,
        loc.address as locationAddress,
        loc.hours_operation as locationHoursOperation,
        loc.website as locationWebSite,
        loc.country as locationCountry,
        loc.contact_name as locationContactName,
        loc.contact_email as locationContactEmail
        from products pds
        INNER JOIN reservations rs  on pds.id = rs.product_id 
        INNER JOIN operator op on pds.operator_id = op.id
        inner JOIN pricing pr on pr.product_id = pds.id
        inner join locations loc on loc.id = pds.location_id
        where CAST('${ req.params.dateNow}' AS DATE) > rs.transaction_end_date
        `
        db.query(query)
        .then(data=>{ res.send(data[0]) })
        .catch((err)=>{
            console.error(err.message)
            res.send(err)
        })
    },
    getAllFuture : (req, res)=>{
        let db = require("./../bd")
        let query = String.raw`
        select 
        rs.id as reservationID,
        rs.transaction_date as transactionDate,
        rs.transaction_start_date as transactionStartDate,
        rs.transaction_end_date as transactionEndtTime,
        rs.transaction_start_time as transactionStartTime,
        rs.transaction_end_time as transactionEndTime,
        rs.price as Price,
        op.id as operatorID,
        op.operator_name as operatorName,
        op.operator_type as operatorType,
        op.time_zone as operatorTimeZona,
        op.currency as operatorCurrency,
        op.business_type as operatorBusinessType,
        pds.id as productID,
        pds.name as productName,
        pr.id as priceID,
        pr.price as productPrice,
        pr.price_plan as pricePlan,
        pr.available_date as priceAvailableDate,
        pr.available_time as priceAvailableTime,
        pr.end_date as priceEndDate,
        pr.end_time as priceEndTime,
        loc.id as locationID,
        loc.lat as locationLatitud,
        loc.lot as locationLongitud,
        loc.name as locationName,
        loc.currency as locationCurrency,
        loc.address as locationAddress,
        loc.hours_operation as locationHoursOperation,
        loc.website as locationWebSite,
        loc.country as locationCountry,
        loc.contact_name as locationContactName,
        loc.contact_email as locationContactEmail
        from products pds
        INNER JOIN reservations rs  on pds.id = rs.product_id 
        INNER JOIN operator op on pds.operator_id = op.id
        inner JOIN pricing pr on pr.product_id = pds.id
        inner join locations loc on loc.id = pds.location_id
        where CAST('${ req.params.dateNow }' AS DATE) <= rs.transaction_end_date
        `
        db.query(query)
        .then(data=>{ res.send(data[0]) })
        .catch((err)=>{
            console.error(err.message)
            res.send(err)
        })
    }
}