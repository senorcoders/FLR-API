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
    }
}