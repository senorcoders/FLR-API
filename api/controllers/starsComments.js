'use strict'
const bd = require("../bd")

module.exports = {
    getAllXOperator : (req, res, next)=>{
        let query = String.raw`
        select cmp.id as idComment,
        cmp.user_id as userID,
        cmp.operator_id as operatorID,
        cmp.content as contentComment,
        stp.id as idStart,
        stp.start as numStart
        from comments_operators cmp INNER JOIN star_operators stp on cmp.operator_id = stp.operator_id where cmp.operator_id = ${req.params.id} and stp.operator_id = ${req.params.id}
        `

        bd.query(query)
        .then((data)=>{
            res.send(data[0])
        })
        .catch((err)=>{
            console.error(err.message)
            res.send(err)
        })
    },
    getAllXUser : (req, res, next)=>{
        console.log(req.params)
        let query = String.raw`
        select  cmp.id as idComment,
        cmp.user_id as userID,
        cmp.operator_id as operatorID,
        cmp.content as contentComment,
        stp.id as idStart,
        stp.start as numStart
        from comments_operators cmp INNER JOIN star_operators stp on cmp.user_id = stp.user_id where cmp.user_id = ${ req.params.id } and stp.user_id = ${ req.params.id }
        `

        bd.query(query)
        .then((data)=>{
            res.send(data[0])
        })
        .catch((err)=>{
            console.error(err.message)
            res.send(err)
        })
    }
}