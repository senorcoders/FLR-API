'use strict'

var moment = require('moment');
const forEach = require('async-foreach').forEach;
const services_dates = require("./../models").service_dates;
const services_hours = require("./../models").service_hours;
const reservations = require('./../models').reservations;
const products =require('./../models').products;
const pricing = require('./../models').pricing;
module.exports = {
    next_days : (req,res)=>{
        let db = require("./../bd")
        let query = "";
        query = String.raw`
                select id, product_id, price, price_plan, timing
                from pricing 
                where product_id = ${parseInt(req.params.product_id)};
            `
        console.log(query);
        db.query(query)
        .then(function(pricing){
          //services_dates.findAll({ where: {product_id: req.params.product_id} } )
	    services_dates.findAll({ where: {product_id: 7722} })
            .then(function (data){
                forEach(data, function(item, index, arr) {                                
                    var done = this.async();
                    var date = moment().day(item.day).format('YYYY-MM-DD');
                    var day_name = moment().day(item.day).format('dddd');
                    arr[index].dataValues.day_name = day_name; 
                    arr[index].dataValues.date = date; 
                    services_hours.findAll({ where: {service_dates_id : item.dataValues.id } } )
                    .then(function (hours){
                        forEach(hours, function(hour, indexHour, arrHour) {                                
                            var doneHours = this.async();
                            var time = arrHour[indexHour].dataValues.start_hours;
                            arrHour[indexHour].dataValues.hour = time;
                            console.log(time);
                            
                            /** reservation date **/
                            let db = require("./../bd")
                            let query = String.raw`
                            select              
                            pds.max_adults productMaxAdults,
                            pds.max_childs productMaxChilds,
                            sum(cast (rs.nbr_in_adult as int) ) adult_reserved,
                            sum(cast(rs.nbr_children as int)) child_reserved,
                            sum(cast(rs.nbr_in_party as int)) in_party_reserved
                            from products pds
                            INNER JOIN reservations rs  on pds.id = rs.product_id                         
                            where CAST('${ arr[index].dataValues.date }' AS DATE) <= rs.transaction_end_date
                            and transaction_start_time = '${ arrHour[indexHour].dataValues.hour }'
                            group by pds.max_adults, pds.max_childs
                            `
                            db.query(query)
                            .then(function (all_reservations){
                                forEach(all_reservations, function(reservation, indexReservation, arrReservation) {                                                                
                                    arrHour[indexHour].dataValues.reservations = reservation;
                                }, reservationDone);
                            
                                function reservationDone(notAborted, arr) {
                                    console.log("reservation done");    
                                    //res.send(arr);
                                    doneHours();
                                }
                            })
                            .catch((err)=>{
                                console.error(err.message)
                                res.send(err)
                        })
                            arr[index].dataValues.hours = arrHour;    
                            arr[index].dataValues.pricing = pricing[0];    
                            
                        }, hourDone);
                        function hourDone(notAborted, arr) {
                            console.log("hours done");                            
                            done();
                        }
                        
                            
                    })
                    
                }, allDone);
                function allDone(notAborted, arr) {
                    console.log("done....");    
                    res.send(arr);
                }
            })  
        })
        
    },
    better_next_days : (req,res)=>{
        let db = require("./../bd")
        let query = "";
        var max_number_days_to_show = 3;    
        var date_request = moment(new Date()).format('YYYY-MM-DD');
        var day_request  = moment(date_request, "YYYY-MM-DD").format('E');
        // Get the current date at midnight.
       
        var need_next_week =false; 
        query = String.raw`
                select id, product_id, price, price_plan, timing
                from pricing 
                where product_id = ${parseInt(req.params.product_id)};
            `
        db.query(query)
        .then(function(pricing){
          //services_dates.findAll({ where: {product_id: req.params.product_id} } )
	  services_dates.findAll({ where : {product_id: 7722}})
            .then(function (data){
                var more_days = data;//.concat(data);
                var count = 0;
                forEach(data, function(item, index, arr) {
                    need_next_week = true;
                        count +=1;
                    var done = this.async();
                    var dayINeed = item.day;
                    console.log(item.day);
                    //var date = moment().day( diff + 4 + item.day).format('YYYY-MM-DD');
                    //var day_name = moment().day(diff + 4 + item.day).format('dddd');
                    //var date  = moment(date_request,'YYYY-MM-DD').add(item.day).format('YYYY-MM-DD');
                    //var day_name = moment(date_request,'YYYY-MM-DD').add(item.day).format('dddd');
                    
                    // if we haven't yet passed the day of the week that I need:
                    var date = moment(date_request,'YYYY-MM-DD').day(item.day).format('YYYY-MM-DD');
                    var day_name = moment(date_request,'YYYY-MM-DD').day(item.day).format('dddd');
                    if (day_request <= dayINeed || day_request == 7) { 
                      // then just give me this week's instance of that day
                      var date = moment(date_request,'YYYY-MM-DD').day(item.day).format('YYYY-MM-DD');
                      var day_name = moment(date_request,'YYYY-MM-DD').day(item.day).format('dddd');
                      //return moment().isoWeekday(dayINeed);
                    } else {
                      // otherwise, give me next week's instance of that day
                      var date = moment(date_request,'YYYY-MM-DD').add(1, 'weeks').day(item.day).format('YYYY-MM-DD');
                      var day_name = moment(date_request,'YYYY-MM-DD').add(1, 'weeks').day(item.day).format('dddd');
                      //return moment().add(1, 'weeks').isoWeekday(dayINeed);
                    }
                    
                    //var date = moment().day(item.day).format('YYYY-MM-DD');
                    //var day_name = moment().day(item.day).format('dddd');
                    arr[index].dataValues.day_name = day_name; 
                    arr[index].dataValues.date = date; 

                    let query = String.raw`
                            select sd.*, sh.*, pdt.max_adults,
                            (select              
                                    sum(cast (rs.nbr_in_adult as int) ) adult_reserved
                                    from products pds
                                    INNER JOIN reservations rs  on pds.id = rs.product_id                         
                                    where CAST('${ arr[index].dataValues.date }' AS DATE) <= rs.transaction_end_date
                                    and transaction_start_time = sh.start_hours
                                    group by transaction_start_time) adult_reserved
                            from service_dates sd 
                            inner join products pdt on sd.product_id = pdt.id
                            inner join service_hours sh on sd.id = sh.service_dates_id 
                            where sd.id = ${ item.dataValues.id }
                            `
                            db.query(query)
                            .then(function (all_reservations){
                                arr[index].dataValues.hours = all_reservations[0];    
                                arr[index].dataValues.pricing = pricing[0];    
                                done();
                            })
                            .catch((err)=>{
                                console.error(err.message)
                                res.send(err)
                            })
                            
                            
                            

                        
                }, allDone);
                function allDone(notAborted, arr) {
                    console.log("done"); 
                    //done();   
                    arr= [].concat(arr.slice(day_request-1, arr.length), arr.slice(0,day_request-1));
                    res.send(arr);
                }
            })  
        })
        
    },
    check_date : (req,res)=>{
        const Sequelize = require('sequelize');
        let db = require("./../bd")
        const op = Sequelize.Op;
        var date_request = req.params.date;      
        var day_request = moment(date_request, "YYYY-MM-DD").format('E');
        var max_number_days_to_show = 3;
        var diff =  moment(date_request).diff( moment(), 'day') ;
        var need_next_week =false; 
        console.log("starting");
        var now = new Date();         

        // Compare the two dates by comparing the millisecond
        // representations.
        console.log(diff);
        if (diff < 0){
            res.send({});
            return;
        }
        //services_dates.findAll({ where: {product_id: req.params.product_id, day: { [op.gte]: day_request } } } )
	//services_dates.findAll({ where: { product_id: 7722, day: { [op.gte]: day_request } } } )
    //services_dates.findAll({ where: { product_id: 7722, day: { [op.gte]: day_request } } } )
    services_dates.findAll({ where: { product_id: 7722 } } )
        .then(function (data){
            var more_days = data;//.concat(data);
            var count = 0;
            forEach(more_days, function(item, index, arr) {
                console.log( day_request );
                console.log( item.day );
                console.log( need_next_week );
                //if (item.day >= day_request || need_next_week) {
                //    if(count <= max_number_days_to_show){
                        need_next_week = true;
                        count +=1;
                    var done = this.async();
                    var dayINeed = item.day;
                    console.log(item.day);
                    //var date = moment().day( diff + 4 + item.day).format('YYYY-MM-DD');
                    //var day_name = moment().day(diff + 4 + item.day).format('dddd');
                    //var date  = moment(date_request,'YYYY-MM-DD').add(item.day).format('YYYY-MM-DD');
                    //var day_name = moment(date_request,'YYYY-MM-DD').add(item.day).format('dddd');
                    
                    // if we haven't yet passed the day of the week that I need:
                    var date = moment(date_request,'YYYY-MM-DD').day(item.day).format('YYYY-MM-DD');
                    var day_name = moment(date_request,'YYYY-MM-DD').day(item.day).format('dddd');
                    if (day_request <= dayINeed || day_request == 7) { 
                      // then just give me this week's instance of that day
                      var date = moment(date_request,'YYYY-MM-DD').day(item.day).format('YYYY-MM-DD');
                      var day_name = moment(date_request,'YYYY-MM-DD').day(item.day).format('dddd');
                      //return moment().isoWeekday(dayINeed);
                    } else if(day_request > dayINeed ) {
                        need_next_week = true;
                      // otherwise, give me next week's instance of that day
                      var date = moment(date_request,'YYYY-MM-DD').add(1, 'week').day(item.day).format('YYYY-MM-DD');
                      var day_name = moment(date_request,'YYYY-MM-DD').add(1, 'week').day(item.day).format('dddd');
                      //return moment().add(1, 'weeks').isoWeekday(dayINeed);
                    }
                    
                    
                    arr[index].dataValues.day_name =  day_name; 
                    arr[index].dataValues.date = date; 

                    let query = String.raw`
                            select sd.*, sh.*, pdt.max_adults,
                            (select              
                                    sum(cast (rs.nbr_in_adult as int) ) adult_reserved
                                    from products pds
                                    INNER JOIN reservations rs  on pds.id = rs.product_id                         
                                    where CAST('${ arr[index].dataValues.date }' AS DATE) <= rs.transaction_end_date
                                    and transaction_start_time = sh.start_hours
                                    group by transaction_start_time)     adult_reserved
                            from service_dates sd 
                            inner join products pdt on sd.product_id = pdt.id
                            inner join service_hours sh on sd.id = sh.service_dates_id 
                            where sd.id = ${ item.dataValues.id }
                            `
                            db.query(query)
                            .then(function (all_reservations){
                                arr[index].dataValues.hours = all_reservations[0];                                    
                                //arr[index].dataValues.pricing = pricing[0];    
                                done();
                            })
                            .catch((err)=>{
                                console.error(err.message)
                                res.send(err)
                            }) 
                /*}
                } else {
                    if(!need_next_week){
                        //need_next_week = true;
                    }
                }*/
                
                
                
            }, allDone);
            function allDone(notAborted, arr) {
                arr= [].concat(arr.slice(day_request-1, arr.length), arr.slice(0,day_request-1));
                console.log("dones"+day_request);    
                console.log(arr);
                setTimeout(function() {
                        res.send(arr);                                                                
                }, 100);
                //res.send(arr);
            }
        })
    },
    available_date : (req, res)=>{
        products.findById(3)
        .then((single_product)=>{
            let max_adults = single_product.max_adults;
            let max_childs = single_product.max_childs;
            services_dates.findAll()
            .then((data)=>{
                forEach(data, function(item, index, arr) {
                    var done = this.async();
                    
                    console.log("each", item, index, arr);
                        services_hours.findAll({limit:6}).then(function(hours) {
                            forEach(hours, function(itemHour, indexHour, arrHours) {
                                var doneHours= this.async();
                                reservations.find
                                arrHours[indexHour].dataValues.reserved=1;
                                arrHours[indexHour].dataValues.available_date=0;
                                reservations.findAll().then((reservation)=>{
                                    let adults;
                                    let childrens; 
                                    forEach(reservation, (itemReservation, indexReservation, arrReservation)=>{
                                        var doneReservations = this.async();
                                        arrHours[indexHour].dataValues.adults_reserved = itemReservation.nbr_in_adult.to_i;
                                        arrHours[indexHour].dataValues.children_reserved = itemReservation.nbr_children.to_i;
                                        arrHours[indexHour].dataValues.max_adults = max_adults;
                                        arrHours[indexHour].dataValues.max_childs = max_childs;                                        
                                        doneReservations();
                                    },hoursDone)
                                    
                                    //arrHours[indexHour].dataValues.reservations = reservation;
                                    doneHours();
                                })
                               
                            }, hoursDone);
                            arr[index].dataValues.days =hours;                    
                            done();		//wait for the results before continue
                        });
                } , allDone);				
                    function hoursDone(notAborted, arr) {
                        console.log("hour done");                    
                    }
                    function allDone(notAborted, arr) {
                        console.log("done");
                        res.send(arr);
                    }
                }, function(reason) {
                    console.log(reason); // Error! 
            })

        })        
    },
    better_available_date : (req, res)=>{
        products.findById(3)
        .then((single_product)=>{
            let max_adults = single_product.max_adults;
            let max_childs = single_product.max_childs;
            services_dates.findAll()
            .then((data)=>{
                forEach(data, function(item, index, arr) {
                    var done = this.async();
                    
                    console.log("each", item, index, arr);
                        services_hours.findAll({limit:6}).then(function(hours) {
                            forEach(hours, function(itemHour, indexHour, arrHours) {
                                var doneHours= this.async();
                                reservations.find
                                arrHours[indexHour].dataValues.reserved=1;
                                arrHours[indexHour].dataValues.available_date=0;
                                reservations.findAll().then((reservation)=>{
                                    let adults;
                                    let childrens; 
                                    forEach(reservation, (itemReservation, indexReservation, arrReservation)=>{
                                        var doneReservations = this.async();
                                        arrHours[indexHour].dataValues.adults_reserved = itemReservation.nbr_in_adult.to_i;
                                        arrHours[indexHour].dataValues.children_reserved = itemReservation.nbr_children.to_i;
                                        arrHours[indexHour].dataValues.max_adults = max_adults;
                                        arrHours[indexHour].dataValues.max_childs = max_childs;                                        
                                        doneReservations();
                                    },hoursDone)
                                    
                                    //arrHours[indexHour].dataValues.reservations = reservation;
                                    doneHours();
                                })
                               
                            }, hoursDone);
                            arr[index].dataValues.days =hours;                    
                            done();     //wait for the results before continue
                        });
                } , allDone);               
                    function hoursDone(notAborted, arr) {
                        console.log("hour done");                    
                    }
                    function allDone(notAborted, arr) {
                        console.log("done");
                        res.send(arr);
                    }
                }, function(reason) {
                    console.log(reason); // Error! 
            })

        })        
    },
    save : (req, res)=>{
        if( !req.body.hasOwnProperty("day") ){
            throw new Error("Falta el parametro :: day")
            return;
        }else{

            if( req.body.numStart > 6 ){
                throw new Error("the parameter day can not be greater than 7")
                return;
            }else if( req.body.numStart < 0 ){
                throw new Error("the parameter day can not be less than 0")
                return;
            }
        }
        services_dates.create({ product_id : req.body.product_id, day : req.body.day })
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    get : (req, res)=>{
        services_dates.find({ id : req.body.id})
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.error(err)
            res.send(err.message)
        })
    },
    delete : (req, res)=>{
        services_dates.destroy({
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
        services_dates.update({
            product_id : req.body.product_id,
            day: req.body.day
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
