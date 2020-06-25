const {Users} = require('../../../src/config/models')
const validations = require('../../../src/utils/validations')
const {masterLogger} = require('../../../src/logger')

module.exports = (req,res,next)=>{
    if(!req.body.password || req.body.password.length < 8 || req.body.password.length > 25){return res.json({status:423,type:'password'})}
    else if(!req.body.email || !validations.isEmail(req.body.email)){return res.json({status:423,type:'email'})}
    else{
        Users.findOne({email:req.body.email},{verified:1,status:1},(err,user)=>{
            if(err){
                req.json({status:500,type:'server_error'})
                masterLogger.error(`user  error while performing find operation in Users Colection`)
            }
            else if(user){
                if(user.verified){
                        if(user.status === 'A'){
                            next()
                        }else{
                            res.json({status:455,type:'inactive'})
                        }
                }else{
                    res.json({status:422,type:'unverified'})
                }
            }else{res.json({status:401,type:'user_doesnot_exist'})}
        })
    }
        
}
