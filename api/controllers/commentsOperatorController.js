'use strict'

const comments_operator = require("./../models").comments_operator

module.exports = {
    save : (req, res)=>{
        comments_operator.create({ 
            user_id : req.body.user_id, 
            operator_id : req.body.operator_id, 
            content : req.body.content
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
        comments_operator.find({ where : { id : req.params.id } })
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    getAll : (req, res)=>{
        comments_operator.findAll({})
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    getAllXUser : (req, res)=>{
        comments_operator.findAll({ user_id : req.body.user_id, operator_id : req.body.operator_id})
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    delete : (req, res)=>{
        comments_operator.destroy({
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
        comments_operator.update({
            content : req.body.content
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