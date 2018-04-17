'use strict'
const bd = require("../bd")

function averageStar(reviews){
    let average = {};
    let total = 0, suma = 0;
    for(let review of reviews){
        let stars = review.numStars.toString();
        suma += parseInt(review.numStars);
        if( average.hasOwnProperty(stars) ){
            average[stars] = parseInt(average[stars]) + 1;
        }else{
            average[stars] = 1;
        }
        total += 1;
    }

    let count = total;
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
    
    average.total = total;
    average.promedio = promedio;
    
    return average;
}

module.exports = {
    getAllXOperatorAverage : (req, res, next)=>{
        let query = String.raw`
        SELECT *
        FROM (
            select star_operators.id, star_operators.createdAt as date, star_operators.operator_id, star_operators.user_id as userID, star_operators.operator_id as operatorID,
            start as numStars, products.name_image, reservations.ID as bookingID, reservations.transaction_date,
            operator.operator_name, ROW_NUMBER() OVER (PARTITION BY star_operators.id ORDER BY star_operators.id ASC) as rn
            from star_operators inner JOIN products on products.operator_id = star_operators.operator_id
            inner join reservations on reservations.product_id = products.id
            INNER JOIN operator on operator.id = products.operator_id
            where star_operators.operator_id = ${ req.params.id } ) 
        a
        WHERE rn = 1
        `

        bd.query(query)
        .then((data)=>{

            if( data[0].length > 0 )
            {
                function gets(i){
                    var query = String.raw`
                    select comment.id as commentID, 
                    comment.content as commentContent, 
                    comment.createdAt as dateCreate,
                    users.id as userID,
                    users.name as userName,
                    users.photo_url as userPhotoUrl,
                    users.first_name as userFirstName,
                    users.last_name as userLastName
                    from comments_operators comment INNER JOIN users on comment.user_id = users.id where operator_id = ${ req.params.id } and users.id = ${ data[0][i].userID } order by convert(datetime, comment.createdAt) DESC                
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
                            let average = averageStar(data[0])
                            res.send({reviews : data[0], average })
                        }
                        
                    })
                    .catch((err)=>{
                        console.error(err.message)
                        res.send([])
                    })
                }
                
                gets(0)
                
            }else{
                res.send([])
            }
            
        })
        .catch((err)=>{
            console.error(err.message)
            res.send(err)
        })
    },
    getAllXUserStarComments : (req, res, next)=>{
        let query = String.raw`
        select id, user_id as userID, operator_id as operatorID, start as numStars from star_operators where user_id = ${ req.params.id }
        `
        console.log();
        bd.query(query)
        .then((data)=>{

            if( data[0].length > 0 )
            {
                function gets(i){
                let query = String.raw`
                select comment.id as commentID, 
                comment.content as commentContent, 
                comment.createdAt as dateCreate,
                operator.id as operatorID,
                operator.operator_name as operatorName,
                operator.operator_type as operatorType,
                operator.currency as operatorCurrency,
                operator.business_type as operatorBussinesType
                from comments_operators comment INNER JOIN operator on comment.operator_id = operator.id where user_id = ${ req.params.id } and operator.id = ${ data[0][i].operatorID } order by convert(datetime, comment.createdAt) DESC                
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
                            let average = averageStar(data[0]);
                            res.send({ reviews : data[0], average })
                        }
                        
                    })
                    .catch((err)=>{
                        console.error(err.message)
                        res.send([])
                    })
                }

                gets(0)
            }else{
                res.send([])
            }
        })
        .catch((err)=>{
            console.error(err.message)
            res.send(err)
        })
    },
    getAllXUserStarCommentsMoreData : (req, res, next)=>{
        let query = String.raw`
        SELECT *
        FROM (
            select star_operators.id, star_operators.createdAt as date, star_operators.operator_id, star_operators.user_id as userID, star_operators.operator_id as operatorID,
            start as numStars, products.name_image, reservations.ID as bookingID, reservations.transaction_date,
            operator.operator_name, ROW_NUMBER() OVER (PARTITION BY star_operators.id ORDER BY star_operators.id ASC) as rn
            from star_operators inner JOIN products on products.operator_id = star_operators.operator_id
            inner join reservations on reservations.product_id = products.id
            INNER JOIN operator on operator.id = products.operator_id
            where star_operators.user_id = ${ req.params.id } ) 
        a
        WHERE rn = 1
        `

        bd.query(query)
        .then((data)=>{
            res.send(data[0])
            /*if( data[0].length > 0 )
            {
                function gets(i){
                let query = String.raw`
                select comment.id as commentID, 
                comment.content as commentContent, 
                comment.createdAt as dateCreate,
                operator.id as operatorID,
                operator.operator_name as operatorName,
                operator.operator_type as operatorType,
                operator.currency as operatorCurrency,
                operator.business_type as operatorBussinesType
                from comments_operators comment INNER JOIN operator on comment.operator_id = operator.id where user_id = ${ req.params.id } and operator.id = ${ data[0][i].operatorID } order by convert(datetime, comment.createdAt) DESC                
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
                        res.send([])
                    })
                }

                gets(0)
            }else{
                res.send([])
            }*/
            
        })
        .catch((err)=>{
            console.error(err.message)
            res.send(err)
        })
    },
    getAllXUserNotContains : (req, res, next)=>{
        let query = String.raw`
        select DISTINCT operator.*, products.name_image, reservations.ID, reservations.transaction_date from products INNER JOIN reservations on reservations.product_id = products.id
        INNER JOIN operator on operator.id = products.operator_id
        where reservations.user_id = ${req.params.userId}
        and operator.id not in(
        select star_operators.operator_id from star_operators INNER JOIN comments_operators on star_operators.operator_id = comments_operators.operator_id
        where star_operators.user_id = ${req.params.userId} and comments_operators.user_id = ${req.params.userId}
        ) order by operator.id
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