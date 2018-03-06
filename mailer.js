const fs = require("fs")
const moment = require("moment")

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
function getTemplatesUser(user, reservation, product, operator, payment){
    var body = String.raw`
        </div>    <div style="background-color:transparent;">
                <div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid mixed-two-up ">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 500px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
                    
                        <!--[if (mso)|(IE)]><td align="center" width="167" style=" width:167px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="col num4" style="${ user.photo_url === null ? 'display: none !important; ' : ' display: table-cell; ' }vertical-align: top;max-width: 320px;min-width: 164px;">
                        <div style="background-color: transparent; width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
        
                            
                            <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
            <img class="center  autowidth  fullwidth" align="center" border="0" src="cid:profile@prof.ee" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 166.666666666667px" width="166.666666666667">
        <!--[if mso]></td></tr></table><![endif]-->
        </div>
        
                            
                        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                        </div>
                    </div>
                        <!--[if (mso)|(IE)]></td><td align="center" width="333" style=" width:333px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="col ${ user.photo_url === null ? ' num12' : ' num8' }" style="display: table-cell;vertical-align: top;min-width: 320px;max-width: 328px;">
                        <div style="background-color: transparent; width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
        
                            
                            <div class="">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 60px; padding-bottom: 10px;"><![endif]-->
            <div style="color:#555555;line-height:200%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 60px; padding-bottom: 10px;">	
                <div style="font-size:12px;line-height:24px;color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;"><p style="margin: 0;font-size: 12px;line-height: 24px"><span style="font-size: 20px; line-height: 40px;"><strong>${user.name} </strong></span></p><p style="margin: 0;font-size: 12px;line-height: 24px">&#160;<br></p></div>	
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
        </div>
                            
                        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                        </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
            </div>    <div style="background-color:transparent;">
                <div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 500px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
        
                        <!--[if (mso)|(IE)]><td align="center" width="500" style=" width:500px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;">
                        <div style="background-color: transparent; width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
        
                            
                            
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
            <tbody>
                <tr style="vertical-align: top">
                    <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 0px;padding-left: 0px;padding-top: 0px;padding-bottom: 0px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <table class="divider_content" height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 3px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                            <tbody>
                                <tr style="vertical-align: top">
                                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                        <span>&#160;</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
                            
                        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                        </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
            </div>    <div style="background-color:transparent;">
                <div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 500px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
        
                        <!--[if (mso)|(IE)]><td align="center" width="500" style=" width:500px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;">
                        <div style="background-color: transparent; width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
        
                            
                            <div class="">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
            <div style="color:#555555;line-height:120%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">	
                <div style="font-size:12px;line-height:14px;color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px"><strong><span style="font-size: 20px; line-height: 24px;">Trip Details</span></strong></p></div>	
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
        </div>
                            
                        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                        </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
            </div>    <div style="background-color:transparent;">
                <div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 500px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
        
                        <!--[if (mso)|(IE)]><td align="center" width="500" style=" width:500px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;">
                        <div style="background-color: transparent; width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
        
                            
                            <div class="">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
            <div style="color:#555555;line-height:120%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">	
                <div style="font-size:12px;line-height:14px;color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;"><p style="margin: 0;font-size: 12px;line-height: 14px"><span style="font-size: 12px; line-height: 14px;" id="_mce_caret" data-mce-bogus="1"><span style="font-size: 16px; line-height: 19px;"><strong>Booking ID:</strong> ${ reservation.ID } </span></span><br data-mce-bogus="1"></p></div>	
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
        </div>
                            
                        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                        </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
            </div>    <div style="background-color:transparent;">
                <div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 500px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
        
                        <!--[if (mso)|(IE)]><td align="center" width="500" style=" width:500px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;">
                        <div style="background-color: transparent; width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
        
                            
                            <div class="">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
            <div style="color:#555555;line-height:120%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">	
                <div style="font-size:12px;line-height:14px;color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px"><span style="font-size: 16px; line-height: 19px;"><strong>Booking Date:</strong>${reservation.transaction_date} </span></p></div>	
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
        </div>
                            
                        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                        </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
            </div>    <div style="background-color:transparent;">
                <div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 500px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
        
                        <!--[if (mso)|(IE)]><td align="center" width="500" style=" width:500px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;">
                        <div style="background-color: transparent; width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
        
                            
                            <div class="">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
            <div style="color:#555555;line-height:120%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">	
                <div style="font-size:12px;line-height:14px;color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px"><span style="font-size: 16px; line-height: 19px;"><strong>Activity:</strong> ${operator.operator_type}</span></p></div>	
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
        </div>
                            
                            
                            <div class="">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
            <div style="color:#555555;line-height:120%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">	
                <div style="font-size:12px;line-height:14px;color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px"><span style="font-size: 16px; line-height: 19px;"><strong>Quantity:</strong> ${reservation.number_activity_reserved}</span></p></div>	
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
        </div>
                            
                            
                            <div class="">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
            <div style="color:#555555;line-height:120%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">	
                <div style="font-size:12px;line-height:14px;color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px"><span style="font-size: 16px; line-height: 19px;"><strong>Start Date:</strong> ${moment(reservation.transaction_start_date).format('MM-DD-YYYY')}</span></p></div>	
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
        </div>
                            
                            
                            <div style="${moment(reservation.transaction_start_date).isSame(moment(reservation.transaction_end_date)) ? 'display: none !important;' : '' }" class="">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
            <div style="color:#555555;line-height:120%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">	
                <div style="font-size:12px;line-height:14px;color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px"><span style="font-size: 16px; line-height: 19px;"><strong>End Date:</strong> ${moment(reservation.transaction_end_date).format('MM-DD-YYYY')}</span></p></div>	
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
        </div>
                            
                            
                            <div class="">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
            <div style="color:#555555;line-height:120%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">	
                <div style="font-size:12px;line-height:14px;color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px"><span style="font-size: 16px; line-height: 19px;"><strong>End Time:</strong> ${reservation.transaction_end_time}</span></p></div>	
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
        </div>
                            
                        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                        </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
            </div>    <div style="background-color:transparent;">
                <div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 500px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
        
                        <!--[if (mso)|(IE)]><td align="center" width="500" style=" width:500px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;">
                        <div style="background-color: transparent; width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
        
                            
                            
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
            <tbody>
                <tr style="vertical-align: top">
                    <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 5px;padding-left: 5px;padding-top: 5px;padding-bottom: 5px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <table class="divider_content" height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 3px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                            <tbody>
                                <tr style="vertical-align: top">
                                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                        <span>&#160;</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
                            
                            
                            <div class="">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
            <div style="color:#555555;line-height:120%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">	
                <div style="font-size:12px;line-height:14px;color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px"><strong><span style="font-size: 20px; line-height: 24px;">Payment</span></strong></p></div>	
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
        </div>
                            
                            
                            <div class="">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
            <div style="color:#555555;line-height:120%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">	
                <div style="font-size:12px;line-height:14px;color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px"><span style="font-size: 16px; line-height: 19px;"><strong>Price</strong>: ${reservation.price}</span></p></div>	
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
        </div>

        <div class="">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
            <div style="color:#555555;line-height:120%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">	
                <div style="font-size:12px;line-height:14px;color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px"><span style="font-size: 16px; line-height: 19px;"><strong>Payment Amount</strong>: ${payment.amount}</span></p></div>	
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
        </div>

        <div class="" style="display: none !important;">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
            <div style="color:#555555;line-height:120%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">	
                <div style="font-size:12px;line-height:14px;color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px"><span style="font-size: 16px; line-height: 19px;"><strong>Total: ${ parseInt(payment.amount,10) + parseInt(reservation.price,10)}</strong></span></p></div>	
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
        </div>
    `

    fs.readFile("./template_emails/user_temp1.html", "utf8", function(err, data){
        let tmp1 = data
        fs.readFile("./template_emails/user_temp2.html", "utf8", function(err, data2){
            sendNotificationUser(user, reservation, product, (tmp1+ body+ data2))
        })
    })

    return function(callback){
        callback(user, reservation, product, operator);
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
                },{
                    filename: 'profile.png',
                    path: user.photo_url,
                    cid: 'profile@prof.ee' //same cid value as in the html img src
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

function getTemplatesAdmin(user, reservation, product, operator){
    let body = String.raw`
        <div style="color:#555555;line-height:120%;font-family:Arial, 
        'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; 
        padding-top: 10px; padding-bottom: 10px;">	
        <div style="font-size:12px;line-height:14px;color:#555555;font-family:Arial, 
        'Helvetica Neue', Helvetica, sans-serif;text-align:left;"><p style="margin: 0;
        font-size: 12px;line-height: 14px"><span style="font-size: 20px; line-height: 24px;">
        New Reservation</span></p><p style="margin: 0;font-size: 12px;line-height: 14px">&#160;
        <br></p><p style="margin: 0;font-size: 12px;line-height: 14px">
        <span style="font-size: 20px; line-height: 24px;">Activity Type:&#160; ${operator.operator_type}</span>
        </p><p style="margin: 0;font-size: 12px;line-height: 14px">
        <span style="font-size: 20px; line-height: 24px;">Start Date:&#160; ${moment(reservation.transaction_start_date).format('MM-DD-YYYY')}</span></p>
        <p style="margin: 0;font-size: 12px;line-height: 14px">
        <span style="font-size: 20px; line-height: 24px;">Start Time: ${reservation.transaction_start_time} </span></p>
        <p style="margin: 0;font-size: 12px;line-height: 14px">&#160;<br></p>
        <p style="margin: 0;font-size: 12px;line-height: 14px">
        <span style="font-size: 20px; line-height: 24px;">End Date: ${moment(reservation.transaction_end_date).format('MM-DD-YYYY')}</span></p>
        <p style="margin: 0;font-size: 12px;line-height: 14px">
        <span style="font-size: 20px; line-height: 24px;">End Time: ${reservation.transaction_end_time}</span></p>
        <p style="margin: 0;font-size: 12px;line-height: 14px">&#160;<br></p>
        <p style="margin: 0;font-size: 12px;line-height: 14px">
        <span style="font-size: 20px; line-height: 24px;">Name:&#160; ${reservation.misc_trip_name} </span>
        </p><p style="margin: 0;font-size: 12px;line-height: 14px">
        <span style="font-size: 20px; line-height: 24px;"><br data-mce-bogus="1">
        </span></p><p style="margin: 0;font-size: 12px;line-height: 14px">
        ${user.name !== undefined ? '<span style="font-size: 20px; line-height: 24px;">Name User: '+ user.name+ ' </span>' :
        '<span style="font-size: 20px; line-height: 24px;">User Guest</span>' }
        
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

function sendNotificationAdmin(user, reservation, template, operator){
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
                //cc : 'mayra.harley@reservec.com'
            };

            //mailOptionsAdmin.to = 'mike.harley@reservec.com';
            mailOptionsAdmin.to = 'osmany@senorcoders.com';
        
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
sendNotifications = (user, reservation, product, operator, payment)=> getTemplatesUser(user, reservation, product, operator, payment)
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