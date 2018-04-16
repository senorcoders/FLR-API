'use strict'
const reservations = require("./../models").reservations
const Operator = require("./../models").operator
const Payment = require("./../models").payment
const each = require("async-foreach").forEach
const bd = require("../bd");

function calcPromedio(stars){
    let count = stars[0].length, suma = 0;
    let countStars = {};
    for(let star of stars[0]){
        suma += parseInt(star.start, 10);
                
        if( !countStars.hasOwnProperty(star.start) ){
            countStars[star.start] = 1;
        }else{
            countStars[star.start] += 1;
        }

    }
    //console.log(count, suma);
    let promedio;
    if(count > 0)
        promedio = Number( parseFloat(suma / count, 10).toFixed(1) )
    else
        promedio = 0;

    let decimal = Math.abs( parseFloat(promedio - (1+Math.floor(promedio)), 10).toFixed(1) ) - 1
    decimal = Math.abs( parseFloat(decimal, 10).toFixed(1) )

    if(decimal > .5 ){
        promedio = 1+Math.floor(promedio)
    }else if( .5 > decimal )
        promedio = Math.floor(promedio)

    return {
        count,
        promedio,
        countStars
    }
}

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
        .then(async (data)=>{
            data = await Promise.all(data.map(async function(item){
                try{
                    let stars = await bd.query(String.raw`SELECT star_operators.start, operator.operator_name as operatorName, locations.address as locationAddress
                from  products
                inner join star_operators on star_operators.operator_id = products.operator_id
                inner join operator on operator.id = products.operator_id
                inner join locations on locations.id = products.location_id
                where products.id = ${item.dataValues.product_id} `)

                let calc = calcPromedio(stars);

                //esto significa que no hay estrellas
                if( calc.count === 0 ){
                    stars = await bd.query(String.raw`SELECT  operator.operator_name as operatorName, locations.address as locationAddress
                    from  products
                    inner join operator on operator.id = products.operator_id
                    inner join locations on locations.id = products.location_id
                    where products.id = ${item.dataValues.product_id} `)

                    item.dataValues.operatorName = stars[0][0].operatorName;
                    item.dataValues.operatorAddress = stars[0][0].locationAddress;
                    item.dataValues.stars = 0;
                    item.dataValues.countStars = {};
                    item.dataValues.countReviews = 0;
                    //console.log(item.dataValues);
                    return item;
                }

                item.dataValues.operatorName = stars[0][0].operatorName;
                item.dataValues.operatorAddress = stars[0][0].locationAddress;
                item.dataValues.stars = calc.promedio;
                item.dataValues.countStars = calc.countStars;
                item.dataValues.countReviews = calc.count;
                //console.log(item.dataValues);
                return item;
                }
                catch(e){
                    console.error(e);
                }
            }));
            
            res.send(data);
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    save :  (req, res)=>{
        if(!req.body.hasOwnProperty("product_id") ){
            throw new Error("Falta el parametro :: product_id")
            return;
        }

        if( Object.prototype.toString.call(req.body.mobile) === "[object Number]" ) 
            req.body.mobile = req.body.mobile.toString();
        
        if( Object.prototype.toString.call(req.body.name) === "[object Number]" ) 
            req.body.name = "";

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
                                payment_id : req.body.payment_id,
                                timing: req.body.timing,
                                name: req.body.name,
                                email: req.body.email,
                                mobile: req.body.mobile                             
                            })
        .then(async (reservation)=>{
            var query;
            if( req.body.hasOwnProperty('guest_id') ){
                query = String.raw`
                select top(1)
                guest.email as userEmail,
                products.operator_id,
                products.name as productName,
                products.service_type as productServiceType,
                operator.operator_name as operatorName,
                locations.name as locationName,
                locations.address as locationAddress
                from guest, products, locations, operator where guest.id = ${req.body.guest_id} and products.id = ${req.body.product_id}
                and locations.id = products.location_id and operator.id = products.operator_id
                `
            }else{
                query = String.raw`
                select top(1) 
                users.name as userName, 
                users.email as userEmail,
                users.photo_url,
                products.operator_id,
                products.name as productName,
                products.service_type as productServiceType,
                operator.operator_name as operatorName,
                locations.name as locationName,
                locations.address as locationAddress,
                pricing.timing
                from users, products, star_operators, locations, operator, pricing where users.id = ${req.body.user_id} and products.id = ${req.body.product_id} 
                and locations.id = products.location_id and operator.id = products.operator_id
                and pricing.product_id = products.id and star_operators.operator_id = products.operator_id
                `
            }

            try{

            let data = await bd.query(query)
                
            let user = {
                email : req.body.email || "",
                name : req.body.name || "",
                photo_url: data[0][0].photo_url
            }
            
            let product = {
                operator_id: data[0][0].operator_id,
                name :  data[0][0].productName,
                service_type: data[0][0].productServiceType,
                locationName: data[0][0].locationName,
                locationAddress: data[0][0].locationAddress || "",
                operatorName: data[0][0].operatorName,
                number_activity_reserved: req.body.number_activity_reserved,
                timing: data[0][0].timing
            }

            let stars = await bd.query(String.raw`select [start] 
            from star_operators where operator_id = ${product.operator_id} `)

            let calc = calcPromedio(stars);
            //console.log(calc);
            reservation.dataValues.operatorName = product.operatorName;
            reservation.dataValues.operatorAddress = product.locationAddress;
            reservation.dataValues.stars = calc.promedio;
            reservation.dataValues.countStars = calc.countStars;
            reservation.dataValues.countReviews = calc.count;
            //console.log(reservation);
            res.send(reservation)

            let operator = await Operator.find({ where : { id : product.operator_id } })

            let payment = await Payment.find({ where : { id: req.body.payment_id } })

            require("../../mailer").sendNotifications(user, reservation, product, operator, payment)
            
            }catch(err){
                console.error(err.message)
                res.send(err)
            }

        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    get : (req, res)=>{
        reservations.find({ id : req.body.id})
        .then(async (data)=>{

            let stars = await bd.query(String.raw`select star_operators.start
            from star_operators inner join operator on star_operators.operator_id = operator.id
            inner join products on products.operator_id = operator.id
            where products.id = ${data.dataValues.product_id} `)

            let product = await bd.query(String.raw`SELECT  operator.operator_name as operatorName, locations.address as locationAddress
                from  products
                inner join operator on operator.id = products.operator_id
                inner join locations on locations.id = products.location_id
                where products.id = ${data.dataValues.product_id} `)

            let calc = calcPromedio(stars);

            //esto significa que no hay estrellas
            if( calc.count === 0 ){
                data.dataValues.stars = 0;
                data.dataValues.countStars = {};
                data.dataValues.countReviews = 0;
            }else{
                //console.log(calc);
                data.dataValues.stars = calc.promedio;
                data.dataValues.countStars = calc.countStars;
                data.dataValues.countReviews = calc.count;
            }

            data.dataValues.operatorName = product[0][0].operatorName;
            data.dataValues.operatorAddress = product[0][0].locationAddress;

            //console.log(reservation);

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
        rs.number_activity_reserved numberActivityReserved,        
        rs.price as Price,
        op.id as operatorID,
        op.operator_name as operatorName,
        op.operator_type as operatorType,
        op.time_zone as operatorTimeZona,
        op.currency as operatorCurrency,
        op.business_type as operatorBusinessType,
        pds.id as productID,
        pds.name as productName,
        pds.name_image as nameImage,
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
