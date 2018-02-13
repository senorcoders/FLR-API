const fs = require("fs")

exports.sendCode = function(id, email, code){
    'use strict'
    console.log('sending email to '+email);
    const nodemailer = require('nodemailer');
    
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
        
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.zoho.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'milton@senorcoders.com', // generated ethereal user
                    pass: 'KykPjRehFtsQ'  // generated ethereal password
                }
            });
        
            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Senorcoders" <milton@senorcoders.com>', // sender address
                to: email, // list of receivers
                subject: code+' Verification Code ✔', // Subject line
                text: 'Please click the following link for verificate your account', // plain text body
                html: '<b>verification link: </b><a href="http://138.68.19.227:3030/api/user/'+id+'/email-confirmation/'+code+'">Activate Verification link</a>' // html body
            };
        
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });
}

//#region for send notifications user y admin after new reservation
function getTemplatesUser(user, reservation, product){
    const body = String.raw`
    <div style="color:#555555;line-height:120%;font-family:Arial, 'Helvetica Neue', 
    Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; 
    padding-bottom: 10px;">	
        <div style="font-size:12px;line-height:14px;color:#555555;font-family:Arial, 
        'Helvetica Neue', Helvetica, sans-serif;text-align:left;"><p style="margin: 0;
        font-size: 14px;line-height: 17px"><span style="font-size: 20px; line-height: 24px;">
        Hello! you have completed a <strong style="text-transform: uppercase;">${reservation.activity_type}</strong> reservation</span>
        </p><p style="margin: 0;font-size: 14px;line-height: 17px">
        <span style="font-size: 20px; line-height: 24px;">for start the ${reservation.transaction_start_date} and 
        finish the ${reservation.transaction_end_date}.</span>
        </p><p style="margin: 0;font-size: 14px;line-height: 17px"><span 
        style="font-size: 20px; line-height: 24px;"><br data-mce-bogus="1"></span></p>
        <p style="margin: 0;font-size: 14px;line-height: 17px">
        <strong><span style="font-size: 20px; line-height: 24px;">Enjoy them!</span>
        </strong></p></div>	
    </div>
    `

    fs.readFile("./template_emails/user.1.html", "utf8", function(err, data){
        let tmp1 = data
        fs.readFile("./template_emails/user.2.html", "utf8", function(err, data2){
            sendNotificationUser(user, reservation, product, (tmp1+ body+ data2))
        })
    })

    return function(callback){
        callback(user, reservation, product);
    }
}

function sendNotificationUser(user, reservation, product, template){
    'use strict'
    console.log('sending email to '+ user.email);
    const nodemailer = require('nodemailer');

    
    
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
        
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.zoho.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'milton@senorcoders.com', // generated ethereal user
                    pass: 'KykPjRehFtsQ'  // generated ethereal password
                }
            });
            
            let mailOptionsUser = {
                from: '"Senorcoders" <milton@senorcoders.com>', // sender address
                to: user.email, // list of receivers
                subject: 'Reservation Completed ✔', // Subject line
                text: '', // plain text body
                html: template, // html body
                attachments: [{
                    filename: 'image.png',
                    path: './template_emails/images/image.png',
                    cid: 'unique@kreata.ee' //same cid value as in the html img src
                }]
            };
        
            // send mail with defined transport object
            transporter.sendMail(mailOptionsUser, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
            
        });
}

function getTemplatesAdmin(user, reservation, product){
    let body = String.raw`
        <div style="color:#555555;line-height:120%;font-family:Arial, 
        'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; 
        padding-top: 10px; padding-bottom: 10px;">	
        <div style="font-size:12px;line-height:14px;color:#555555;font-family:Arial, 
        'Helvetica Neue', Helvetica, sans-serif;text-align:left;"><p style="margin: 0;
        font-size: 12px;line-height: 14px"><span style="font-size: 20px; line-height: 24px;">
        New Reservation</span></p><p style="margin: 0;font-size: 12px;line-height: 14px">&#160;
        <br></p><p style="margin: 0;font-size: 12px;line-height: 14px">
        <span style="font-size: 20px; line-height: 24px;">Activity Type:&#160; ${reservation.activity_type}</span>
        </p><p style="margin: 0;font-size: 12px;line-height: 14px">
        <span style="font-size: 20px; line-height: 24px;">Start Date:&#160; ${reservation.transaction_start_date}</span></p>
        <p style="margin: 0;font-size: 12px;line-height: 14px">
        <span style="font-size: 20px; line-height: 24px;">Start Time: ${reservation.transaction_start_time} </span></p>
        <p style="margin: 0;font-size: 12px;line-height: 14px">&#160;<br></p>
        <p style="margin: 0;font-size: 12px;line-height: 14px">
        <span style="font-size: 20px; line-height: 24px;">End Date: ${reservation.transaction_end_date}</span></p>
        <p style="margin: 0;font-size: 12px;line-height: 14px">
        <span style="font-size: 20px; line-height: 24px;">End Time: ${reservation.transaction_end_time}</span></p>
        <p style="margin: 0;font-size: 12px;line-height: 14px">&#160;<br></p>
        <p style="margin: 0;font-size: 12px;line-height: 14px">
        <span style="font-size: 20px; line-height: 24px;">Name:&#160; ${reservation.misc_trip_name} </span>
        </p><p style="margin: 0;font-size: 12px;line-height: 14px">
        <span style="font-size: 20px; line-height: 24px;"><br data-mce-bogus="1">
        </span></p><p style="margin: 0;font-size: 12px;line-height: 14px">
        <span style="font-size: 20px; line-height: 24px;">Name User: ${user.name} </span>
        </p><p style="margin: 0;font-size: 12px;line-height: 14px">
        <span style="font-size: 20px; line-height: 24px;">Email:&#160;${user.email} </span>
        </p><p style="margin: 0;font-size: 12px;line-height: 14px">&#160;<br>
        </p><p style="margin: 0;font-size: 12px;line-height: 14px">
        <span style="font-size: 20px; line-height: 24px;">Product Name: ${product.name} </span></p>
        <p style="margin: 0;font-size: 12px;line-height: 14px">
        <span style="font-size: 20px; line-height: 24px;">Service Type:&#160; ${product.service_type} </span></p></div>	
    </div>
    `

    fs.readFile("./template_emails/templateAdmin.2.html", "utf8", function(err, data){
        let tmp1 = data
        fs.readFile("./template_emails/templateAdmin.2.html", "utf8", function(err, data2){
            sendNotificationAdmin(user, reservation, (tmp1+ body+ data2))
        })
    })

}

function sendNotificationAdmin(user, reservation, template){
    'use strict'
    console.log('sending email to '+ "admins");
    const nodemailer = require('nodemailer');

    
    
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
        
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.zoho.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'milton@senorcoders.com', // generated ethereal user
                    pass: 'KykPjRehFtsQ'  // generated ethereal password
                }
            });
            
            let mailOptionsAdmin = {
                from: '"Senorcoders" <milton@senorcoders.com>', // sender address
                subject: 'New Reservation', // Subject line
                text: '', // plain text body
                html: template, // html body
                cc : 'mayra.harley@reservec.com'
            };

            mailOptionsAdmin.to = 'mike.harley@reservec.com';
        
            // send mail with defined transport object
            transporter.sendMail(mailOptionsAdmin, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
            
        });
}

//usando funciones compuestas
exports
.
sendNotifications = (user, reservation, product)=> getTemplatesUser(user, reservation, product)
(getTemplatesAdmin)

//#endregion

//#region for send email notification request /inquery
function getTemplatesInquiry(user, product){
    const body = String.raw`
    <div class="">
	<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
	<div style="color:#4A443E;line-height:120%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">	
        <div style="font-size:12px;line-height:14px;color:#4A443E;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;"><p style="margin: 0;font-size: 12px;line-height: 14px;text-align: left"><span style="font-size: 20px; line-height: 24px;">
        Hello!, You have made a new request for a ${product.name}  the service with&#160; ${product.service_type} </span></p><p style="margin: 0;font-size: 12px;line-height: 14px"><span style="font-size: 20px; line-height: 24px;"><br data-mce-bogus="1"></span></p></div>	
	</div>
	<!--[if mso]></td></tr></table><![endif]-->
    </div>
    `
    var _callback = function(){
        console.log("callback");
    }

    fs.readFile("./template_emails/inquiry.1.html", "utf8", function(err, data){
        fs.readFile("./template_emails/inquiry.2.html", "utf8", function(err, data2){
            _callback(user, (data+ body+ data2))
        })
    })

    return function(callback){
        _callback = callback;
    }
}

function sendNotificationUserInqury(user, template){
    'use strict'
    console.log('sending email to '+ user.email);
    const nodemailer = require('nodemailer');

    
    
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
        
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.zoho.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'milton@senorcoders.com', // generated ethereal user
                    pass: 'KykPjRehFtsQ'  // generated ethereal password
                }
            });
            
            let mailOptionsAdmin = {
                from: '"Senorcoders" <milton@senorcoders.com>', // sender address
                to: user.email, // list of receivers
                subject: 'New Request', // Subject line
                text: '', // plain text body
                html: template, // html body
                attachments: [{
                    filename: 'image.png',
                    path: './template_emails/images/image.png',
                    cid: 'unique@kreata.ee' //same cid value as in the html img src
                }]
            };
        
            // send mail with defined transport object
            transporter.sendMail(mailOptionsAdmin, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
            
        });
}

exports
.
sendNoticationInquiry = (user, product)=> getTemplatesInquiry(user, product)
(sendNotificationUserInqury)

//#endregion