
const validations = require('../../../src/utils/validations')
const {Users}= require('../../../src/config/models')
const {masterLogger}  = require('../../../src/logger')

function validateUserRegistration(req,res,next){
        if(!req.body.name || req.body.name.length <= 3){return res.json({status:423,type:'name'})}
        else if(!req.body.password || req.body.password.length < 8 || req.body.password.length > 25){return res.json({status:423,type:'password'})}
        else if(!req.body.email || !validations.isEmail(req.body.email)){return res.json({status:423,type:'email'})}
        else{
                Users.findOne({email:req.body.email},{email:1},(err,user)=>{
                        if(err){
                                res.json({status:500,type:'db email check'})
                                masterLogger.error(`user ${req.body.email} error while checking existance of user with given credentials`)
                        }
                        else if(user){res.json({status:422,type:'User Already Exists'})}
                        else{next()}
                })
        }
}


module.exports = validateUserRegistration