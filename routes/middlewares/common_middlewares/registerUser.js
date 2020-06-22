const {Users} = require('../../../src/config/models')
const sendEmail = require('../../../src/utils/mail').sendEmail
const verifyEmailTemplate = require('../../../src/utils/mail/templates').verifyEmailTemplate
const jwt = require('jsonwebtoken')
const {masterLogger,mailLogger} = require('../../../src/logger')


function registerUser(req,res,next){
            Users.register({
                    name:req.body.name,
                    email:req.body.email,
                    verified:false
                },
                 req.body.password
                ,(err,user)=>{
                if(err){
                    if(err.name === 'UserExistsError'){     
                        res.json({status:422,type:'UserExistsError'})
                    }else{
                        res.json({status:500})
                    }
                    masterLogger.error(`user error while registering user`)
                }
                else if(user){
                    masterLogger.info(`user successfully created user with email ${user.email}`)
                    jwt.sign({email:user.email,password:req.body.password},process.env.USER_VERIFY_SECRET,{expiresIn:3600},(err,token)=>{
                        if(err){
                            res.json({status:500,type:'token_error'})
                            masterLogger.error(`user error while generating verification token for user`)
                        }
                        else{
                            res.json({status:200,type:'mail_scheduled'})
                            let promise = sendEmail(verifyEmailTemplate(req.body.email,req.body.name,token))
                            promise.then(()=>{
                                mailLogger.info(`user sucessfully sent verification email to ${user.email}`)
                            })
                            .catch((err)=>{ 
                                mailLogger.error(`user error while sending verification email to ${user.email}`)
                            })
                        }
                    })
                }
                else{res.json({msg:'document creation failed in cb'})}
            })
}

module.exports = registerUser
