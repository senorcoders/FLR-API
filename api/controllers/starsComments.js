'use strict'
const bd = require("../bd")

module.exports = {
    getAllXOperator : (req, res, next)=>{
        let query = String.raw`
        select id, user_id as userID, operator_id as operatorID, start as numStars from star_operators where operator_id = ${ req.params.id }
        `

        bd.query(query)
        .then((data)=>{

            if( data[0].length > 0 )
            {
                function gets(i){
                    var query = String.raw`
                    select comment.id as commentID, 
                    comment.content as commentContent, 
                    comment.date_create as dateCreate,
                    users.id as userID,
                    users.name as userName,
                    users.photo_url as userPhotoUrl,
                    users.first_name as userFirstName,
                    users.last_name as userLastName
                    from comments_operators comment INNER JOIN users on comment.user_id = users.id where operator_id = ${ req.params.id } and users.id = ${ data[0][i].userID } order by convert(datetime, date_create) DESC                
                    `
                    bd.query(query)
                    .then(function(d){
                        if( d[0] !== undefined )
                            data[0][i].comments = d[0]

                        console.log(data[0].length)
                        i++
                        if( i < data[0].length ){
                            gets(i)
                        }else{
                            res.send(data[0])
                        }
                        
                    })
                    .catch((err)=>{
                        console.error(err.message)
                        res.send(err)
                    })
                }
                
                gets(0)
                
            }else{
                res.send({})
            }
            
        })
        .catch((err)=>{
            console.error(err.message)
            res.send(err)
        })
    },
    getAllXUser : (req, res, next)=>{
        let query = String.raw`
        select id, user_id as userID, operator_id as operatorID, start as numStars from star_operators where user_id = ${ req.params.id }
        `

        bd.query(query)
        .then((data)=>{

            if( data[0].length > 0 )
            {
                function gets(i){
                let query = String.raw`
                select comment.id as commentID, 
                comment.content as commentContent, 
                comment.date_create as dateCreate,
                operator.id as operatorID,
                operator.operator_name as operatorName,
                operator.operator_type as operatorType,
                operator.currency as operatorCurrency,
                operator.business_type as operatorBussinesType
                from comments_operators comment INNER JOIN operator on comment.operator_id = operator.id where user_id = ${ req.params.id } order by convert(datetime, date_create) DESC                
                `
                bd.query(query)
                    .then(function(d){
                        if( d[0] !== undefined )
                            data[0][i].comments = d[0]

                        console.log(data[0].length)
                        i++
                        if( i < data[0].length ){
                            gets(i)
                        }else{
                            res.send(data[0])
                        }
                        
                    })
                    .catch((err)=>{
                        console.error(err.message)
                        res.send(err)
                    })
                }

                gets(0)
            }else{
                res.send({})
            }
        })
        .catch((err)=>{
            console.error(err.message)
            res.send(err)
        })
    }
}