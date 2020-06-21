const jwt = require('jsonwebtoken')
const {masterLogger} = require('../../../src/logger')

function verifyPwdResetEmail(req,res,next){
    if(!req.body.token || req.body.token.length < 50){
        res.json({status:423})
    }else{
        jwt.verify(req.body.token,process.env.RESET_PWD_SECRET,(err,payload)=>{
            if(err){
                if(err.name === 'TokenExpiredError'){
                    res.json({status:422,error:'token_expired'})
                }else{
                    masterLogger.error(`error while verifying password reset email token`)
                    res.json({status:500,error:'server_error'})       
                }
            }else{
                res.json({status:200,email:payload.email})
            }
        })
    }    
}

module.exports = verifyPwdResetEmail