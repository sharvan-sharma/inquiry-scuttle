const {Users} = require('../../../src/config/models')
const {masterLogger} = require('../../../src/logger')
const validations = require('../../../src/utils/validations')

module.exports = (req,res,next)=>{
    if(!req.user){
        res.json({status:401,type:'unauthorised'})
    // }else if(!req.body.type || !['name','phone'].includes(req.body.type)){
    //     res.json({status:423,type:'update operation type not mentioned'})
    }else if(!req.body.name || !validations.checkName(req.body.name)){
        res.json({status:423,type:'name'})
    // }else if(req.body.type === 'phone' && (!req.body.phone || !validations.isPhone(req.body.phone))){
    //     res.json({status:423,type:'phone'})
    }else{

        //const updateObject = (req.body.type === 'name')?{name:req.body.name}:{phone:req.body.phone}
        Users.findOneAndUpdate({_id:req.user._id},{
            //$set:updateObject
            $set:{name:req.body.name}
        },{new:true,strict:false},(err,user)=>{
            if(err){
                res.json({status:500})
                masterLogger.error(`user ${req.user.email} error while updating name`)
            }else if(user){
               // if(req.body.type === 'name'){
                    res.json({status:200,name:user.name})
                // }else{
                //     res.json({status:200,phone:user.phone})
                // }
                masterLogger.info(`user ${req.user.email} successfully updated name`)
            }else{
                res.json({status:422,type:'useDoesnotExist'})
            }
        })
    }
}