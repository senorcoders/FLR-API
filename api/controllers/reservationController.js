'use strict'
const reservations = require("./../models").reservations
const Operator = require("./../models").operator
const Payment = require("./../models").payment

/*function getComments(req, res, next, data){
    let db = require("./../bd")
        let query = String.raw`
                select * from comments_operators where user_id = ${req.params.id}
            `
            db.query(query)
            .then(d=>{
                data.comments = d[0]
                res.send(data) 
            
            })
            .catch((err)=>{
                console.error(err.message)
                res.send(err)
        })
}*/

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
        if(!req.body.hasOwnProperty("product_id") ){
            throw new Error("Falta el parametro :: product_id")
            return;
        } 
        reservations.create({ 
                                user_id : req.body.user_id, 
                                guest_id : req.body.guest_id,
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
        .then((reservation)=>{
            var query;
            if( req.body.hasOwnProperty('guest_id') ){
                query = String.raw`
                select top(1)
                guest.email as userEmail,
                products.name as productName,
                products.service_type as productServiceType
                from guest, products where guest.id = ${req.body.guest_id} and products.id = ${req.body.product_id}
                `
            }else{
                query = String.raw`
                select top(1) 
                users.name as userName, 
                users.email as userEmail,
                users.photo_url,
                products.name as productName,
                products.service_type as productServiceType
                from users, products where users.id = ${req.body.user_id} and products.id = ${req.body.product_id}
                `
            }
            

            require("../bd").query(query)
            .then(data=>{ 
                let user = {
                    email : data[0][0].userEmail,
                    name : data[0][0].userName,
                    photo_url: data[0][0].photo_url
                }
                console.log(user);
                let product = {
                    name :  data[0][0].productName,
                    service_type: data[0][0].productServiceType
                }

                Operator.find({
                    id : product.operator_id
                }).then(function(operator){
                    Payment.find({
                        id: req.body.payment_id
                    }).then(function(payment){
                        require("../../mailer").sendNotifications(user, reservation, product, operator, payment)
                    })
                })
                
             })
            .catch((err)=>{
                console.error(err.message)
                res.send(err)
            })

            res.send(reservation)
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
       .catch(function (ex) { 
            console.log(ex); 
            res.send(err.message)
        }); 
    },
    getXUserAll : (req, res)=>{
        let db = require("./../bd")
        let query = String.raw`
        select 
        rs.id as reservationID,
        rs.activity_type as reservationActivityType,
        rs.transaction_date as transactionDate,
        rs.transaction_start_date as transactionStartDate,
        rs.transaction_end_date as transactionEndtTime,
        rs.transaction_start_time as transactionStartTime,
        rs.transaction_end_time as transactionEndTime,
        rs.nbr_in_party as reservationNbrInParty,
        rs.nbr_in_adult as reservationNbrInAdult,
        rs.nbr_children as reservationNbrChildren,
        rs.misc_trip_name as reservationMiscTripName,
        rs.price as Price,
        op.id as operatorID,
        op.operator_name as operatorName,
        op.operator_type as operatorType,
        op.time_zone as operatorTimeZona,
        op.currency as operatorCurrency,
        op.business_type as operatorBusinessType,
        pds.id as productID,
        pds.name as productName,
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
        inner join locations loc on loc.id = pds.location_id
        where rs.user_id = ${ req.params.id }
            `
            db.query(query)
            .then(data=>{ res.send(data[0]) })
            .catch((err)=>{
                console.error(err.message)
                res.send(err)
            })
    },
    getXGuestAll : (req, res)=>{
        let db = require("./../bd")
        let query = String.raw`
        select 
        rs.id as reservationID,
        rs.activity_type as reservationActivityType,
        rs.transaction_date as transactionDate,
        rs.transaction_start_date as transactionStartDate,
        rs.transaction_end_date as transactionEndtTime,
        rs.transaction_start_time as transactionStartTime,
        rs.transaction_end_time as transactionEndTime,
        rs.nbr_in_party as reservationNbrInParty,
        rs.nbr_in_adult as reservationNbrInAdult,
        rs.nbr_children as reservationNbrChildren,
        rs.misc_trip_name as reservationMiscTripName,
        rs.price as Price,
        op.id as operatorID,
        op.operator_name as operatorName,
        op.operator_type as operatorType,
        op.time_zone as operatorTimeZona,
        op.currency as operatorCurrency,
        op.business_type as operatorBusinessType,
        pds.id as productID,
        pds.name as productName,
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
        inner join locations loc on loc.id = pds.location_id
        where rs.guest_id = ${ req.params.id }
            `
            db.query(query)
            .then(data=>{ res.send(data[0]) })
            .catch((err)=>{
                console.error(err.message)
                res.send(err)
            })
    },
    getAllNotPassed : (req, res)=>{
        let db = require("./../bd")
        let query = String.raw`
        select 
        rs.id as reservationID,
        rs.activity_type as reservationActivityType,
        rs.transaction_date as transactionDate,
        rs.transaction_start_date as transactionStartDate,
        rs.transaction_end_date as transactionEndDate,
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
        where CAST('${req.params.dateNow}' AS DATE) > rs.transaction_end_date
        `
        db.query(query)
            .then(data=>{
                //getComments(req, res, data[0])
                res.send(data[0])
            })
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
            rs.activity_type as reservationActivityType,
            rs.transaction_date as transactionDate,
            rs.transaction_start_date as transactionStartDate,
            rs.transaction_end_date as transactionEndDate,
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
    },
    getOne : (req, res)=>{
            let db = require("./../bd")
            let query = String.raw`
                select 
                rs.id as reservationID,
                rs.activity_type as reservationActivityType,
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
                where rs.id = ${req.params.id}
                `
                db.query(query)
                .then(data=>{ res.send(data[0]) })
                .catch((err)=>{
                    console.error(err.message)
                    res.send(err)
            })
    },

    getAllReview : (req, res)=>{
        let db = require("./../bd")
        let query = String.raw`
            select 
            rs.id as reservationID,
            rs.activity_type as reservationActivityType,
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
            `
            db.query(query)
            .then(data=>{ res.send(data[0]) })
            .catch((err)=>{
                console.error(err.message)
                res.send(err)
        })
}
}