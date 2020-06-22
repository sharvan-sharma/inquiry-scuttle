
const {Users} = require('../../../src/config/models/index')
const mail = require('../../../src/utils/mail/index')
const passwordResetEmailTemplate = require('../../../src/utils/mail/templates/index').passwordResetEmailTemplate
const jwt =require('jsonwebtoken')
const validations = require('../../../src/utils/validations')
const {masterLogger,mailLogger} = require('../../../src/logger')


function passwordResetEmail(req, res, next) {
    if(!req.body.email || !validations.isEmail(req.body.email)){
        res.json({status:423,type:'email'})
    }else{
        Users.findOne({ email: req.body.email}, {name:1,verified:1,status:1,email:1}, (err, user) => {
            if (err) {res.json({type: 'server_error',status:500})
            } else if (user) {
                if(user.verified){
                        if(user.status === 'A'){
                            jwt.sign({email:req.body.email},process.env.RESET_PWD_SECRET,{expiresIn:600},(err,token)=>{
                                if(err){
                                    res.json({status:500,type:'token_server_error'})
                                    masterLogger.error(`user ${user.email} reset password email token generation error`)
                                }
                                else{
                                    res.json({status:200,msg:'mail scheduled'})
                                    let promise = mail.sendEmail(passwordResetEmailTemplate(user.email,user.name,token))
                                    promise.then(result=>{
                                        mailLogger.info(`user ${user.email} reset password email sent`)
                                    })
                                    .catch(err=>{
                                        mailLogger.error(`user ${user.email} reset password email error`)
                                    })
                                }
                            })
                        }else{res.json({status: 455,type:'inactive'})}
                }else{res.json({status: 423,type:'unverified'})}
            } else {res.json({type:'user_doesnot_exist',status:401})}
        })
    }
}

module.exports = passwordResetEmail