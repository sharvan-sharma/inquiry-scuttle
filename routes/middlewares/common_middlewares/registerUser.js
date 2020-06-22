const {Users} = require('../../../src/config/models')
const sendEmail = require('../../../src/utils/mail').sendEmail
const verifyEmailTemplate = require('../../../src/utils/mail/templates').verifyEmailTemplate
const jwt = require('jsonwebtoken')
const {masterLogger} = require('../../../src/logger')


function registerUser(req,res,next){
            Users.register({
                    name:req.body.name,
                    email:req.body.email,
                    verified:false
                },
                 req.body.password
                ,(err,admin)=>{
                if(err){res.json({status:500})}
                else if(admin){
                    masterLogger.info(`admin successfully created admin with email ${admin.email}`)
                    jwt.sign({id:admin._id},process.env.USER_VERIFY_SECRET,{expiresIn:3600},(err,token)=>{
                        if(err){
                            res.json({status:500,type:'token_error'})
                            masterLogger.error(`admin error while generating verification token for admin`)
                        }
                        else{
                            res.json({status:200,type:'mail_sent'})
                            let promise = sendEmail(verifyEmailTemplate(req.body.email,req.body.name,token))
                            promise.then(()=>{
                                masterLogger.info(`admin sucessfully sent verification email to ${admin.email}`)
                            })
                            .catch((err)=>{ 
                                masterLogger.error(`admin error while sending verification email to ${admin.email}`)
                            })
                        }
                    })
                }
                else{res.json({msg:'document creation failed in cb'})}
            })
}

module.exports = registerUser
