const {Users} = require('../../../src/config/models')
const validations = require('../../../src/utils/validations')
const {masterLogger} = require('../../../src/logger')

async function resetPassword(req,res,next){
    if(!req.body.password || req.body.password.length < 8 || req.body.password.length > 25){return res.json({status:423,type:'password'})}
    else if(!req.body.email || !validations.isEmail(req.body.email)){return res.json({status:423,type:'email'})}
    // else if(!req.body.type || !['admin','staff'].includes(req.body.type)){res.json({status:423,type:'type'})}
    else{
        const {email,password} = req.body
        Users.findOne({email})
       .then((user)=>{
            user.setPassword(password,(err,u)=>{
                if(err){
                    res.json({status:500})
                    masterLogger.error(`user ${email} error while reseting password`)
                }else{
                    u.save(()=>{
                        masterLogger.info(`user ${email} successfully reset password`)
                        next()
                    }) 
                }
            })
        }).catch(err=>{
            res.json({status:500})
            masterLogger.error(`user ${email} error while reseting password`)
        })
    }
}

module.exports = resetPassword