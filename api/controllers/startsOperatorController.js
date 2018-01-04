'use strict'

const start_operator = require("./../models").start_operator

module.exports = {
    save : (req, res)=>{
        if( !req.body.hasOwnProperty("numStart") ){
            throw new Error("Falta el parametro :: numStart")
            return;
        }else{

            if( req.body.numStart > 5 ){
                throw new Error("the parameter numStart can not be greater than 5")
                return;
            }else if( req.body.numStart < 1 ){
                throw new Error("the parameter numStart can not be less than 1")
                return;
            }
        }
        start_operator.create({ user_id : req.body.user_id, operator_id : req.body.operator_id, start : req.body.numStart})
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    getAll : (req, res)=>{
        start_operator.findAll({})
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    get : (req, res)=>{
        start_operator.find({ user_id : req.body.user_id, operator_id : req.body.operator_id})
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    delete : (req, res)=>{
        start_operator.destroy({
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
        start_operator.update({
            start : req.body.numStart
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
    }
}