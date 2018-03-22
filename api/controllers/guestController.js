'use strict'

const guest = require("./../models").guest

module.exports = {
    save : (req, res)=>{
        guest.create({ 
            device_id : req.body.device_id, 
            email : req.body.email, 
            phone : req.body.phone,
            address : req.body.address
        })
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    getOne : (req, res)=>{
        console.log(req.params)
        guest.find({ where : { id : req.params.id } })
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    getAll : (req, res)=>{
        guest.findAll({})
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },    
    delete : (req, res)=>{
        guest.destroy({
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
        guest.update({
            email : req.body.email,
            phone : req.body.phone,
            address : req.body.address
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