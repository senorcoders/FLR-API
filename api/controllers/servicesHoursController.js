'use strict'

const service_hours = require("./../models").service_hours

module.exports = {
    save : (req, res)=>{
        if( !req.body.hasOwnProperty("start_hours") ){
            throw new Error("Falta el parametro :: start_hours")
            return;
        }
        service_hours.create({ 
            start_hours : req.body.start_hours, 
            duration : req.body.duration, 
            service_dates_id : req.body.service_dates_id
        })
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    getAll : (req, res)=>{
        service_hours.findAll({})
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    getOne : (req, res)=>{
        service_hours.find({ where: { id : req.params.id } })
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    delete : (req, res)=>{
        service_hours.destroy({
            where: {
                id : req.params.id
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
        service_hours.update({
            start_hours : req.body.start_hours, 
            duration : req.body.duration, 
            service_dates_id : req.body.service_dates_id
        },{
            where: {
                id : req.params.id
            }
        })
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    }
}