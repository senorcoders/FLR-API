'use strict'
const bd = require("../bd")

module.exports = {
    getAllXOperator : (req, res, next)=>{
        let query = String.raw`
        select  cmp.id as idComment,
        cmp.user_id as userIDComment,
        cmp.operator_id as operatorIDComment,
        cmp.content as contentComment,
        stp.id as idStart,
        stp.user_id as userIDStart,
        stp.operator_id as operatorIDStart,
        stp.start as numStart
        from comments_operators cmp INNER JOIN start_operators stp on cmp.operator_id = stp.operator_id where cmp.operator_id = ${req.body.id} and stp.operator_id = ${req.body.id}
        `

        bd.query(query)
        .then((data)=>{
            res.send(data[0])
        })
        .catch((err)=>{
            console.error(error.message)
            res.send(err)
        })
    }
}