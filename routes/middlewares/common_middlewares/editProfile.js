const {Users} = require('../../../src/config/models')
const {masterLogger} = require('../../../src/logger')
const validations = require('../../../src/utils/validations')

module.exports = (req,res,next)=>{
    if(!req.user){
        res.json({status:401,type:'unauthorised'})
    }else if(!req.body.name || !validations.checkName(req.body.name)){
        res.json({status:423,type:'name'})
    }else{

        Users.findOneAndUpdate({_id:req.user._id},{
            $set:{name:req.body.name}
        },{new:true,strict:false},(err,user)=>{
            if(err){
                res.json({status:500})
                masterLogger.error(`user ${req.user.email} error while updating name`)
            }else if(user){
                res.json({status:200,name:user.name})
                masterLogger.info(`user ${req.user.email} successfully updated name`)
            }else{
                res.json({status:422,type:'useDoesnotExist'})
            }
        })
    }
}