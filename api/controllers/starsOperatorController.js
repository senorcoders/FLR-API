'use strict'

const star_operator = require("./../models").star_operator

module.exports = {
    save : (req, res)=>{
        if( !req.body.hasOwnProperty("numStars") ){
            throw new Error("Falta el parametro :: numStars")
            return;
        }else{

            if( req.body.numStart > 5 ){
                throw new Error("the parameter numStars can not be greater than 5")
                return;
            }else if( req.body.numStart < 1 ){
                throw new Error("the parameter numStars can not be less than 1")
                return;
            }
        }
        star_operator.create({ user_id : req.body.user_id, operator_id : req.body.operator_id, start : req.body.numStars})
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    getAll : (req, res)=>{
        star_operator.findAll({})
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    getOne : (req, res)=>{
        star_operator.find({ where: { id : req.params.id } })
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    delete : (req, res)=>{
        star_operator.destroy({
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
        star_operator.update({
            start : req.body.numStars
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