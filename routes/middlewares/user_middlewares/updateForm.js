const {Forms} = require('../../../src/config/models')
const {plainName} = require('../../../src/utils/validations')
const {masterLogger} = require('../../../src/logger')

module.exports = (req,res,next) => {
    if(!req.body.form_name || !plainName(req.body.form_name)){
        res.json({status:423,type:'form_name'})
    }else if(!req.body.form_id || req.body.form_id.length !== 24){
        res.json({status:423,type:'form_id'})
    }else{
        Forms.findOneAndUpdate(
            {_id:req.body.form_id},
            {$set:{name:req.body.form_name}},
            {new:true,strict:false},
            (err,form)=>{
            if(err){
                res.json({status:500,type:'server_error'})
                masterLogger.error(`user ${req.user.email} error while creating project`)
            }else{
                res.json({status:200,form})
                masterLogger.info(`user ${req.user.email} successfully update the form name to ${form.name}`)
            }
        })
    }
}