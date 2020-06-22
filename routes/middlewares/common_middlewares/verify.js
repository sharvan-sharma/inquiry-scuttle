const {Users} = require('../../../src/config/models')
const jwt = require('jsonwebtoken')
const {masterLogger}  = require('../../../src/logger')

module.exports = (req,res,next)=>{
        if(!req.body.token || req.body.token.length < 10){
            res.json({status:423,type:'invalid_token'})
        }else{
            jwt.verify(req.body.token,process.env.USER_VERIFY_SECRET,(err,payload)=>{
                if(err){
                    if(err.name ===  'TokenExpiredError'){
                        res.json({status:422,error:'token_exipred'})
                    }else{
                        res.json({type:'token_server_error',status:500})
                        masterLogger.error(`user error while extracting token sent in verification email`)
                    }
                }else{
                    Users.findOneAndUpdate({email:payload.email},
                                            {'$set':{verified:true,status:'A'}},
                                            {new:true,strict:false},
                                            (err,user)=>{
                                            if(err){
                                                res.json({status:500})
                                                masterLogger.error(`user ${user.email} error occur while changing verified flag `)
                                            }
                                            else if(user){
                                                req.body.email = payload.email
                                                req.body.password = payload.password
                                                next()
                                            }else{
                                                res.json({status:422,type:'UserDoesNotExist'})
                                            }
                    })
                }
            })
        }
}