const {Forms} = require('../../../src/config/models')
const {masterLogger} = require('../../../src/logger')

module.exports = (req,res,next) =>{
    if(!req.body.project_id || req.body.project_id.length !== 24){
        res.json({status:423,type:'project_id'})
    }else if(!req.body.form_id || req.body.form_id.length !== 24){
        res.json({status:423,type:'form_id'})
    }else{
        Forms.findOne({_id:req.body.form_id,project_id:req.body.project_id},(err,form)=>{
            if(err){
                res.json({status:500})
                masterLogger.error(`user ${req.user.email} error while reading a form`)
            }else{
                res.json({status:200,form})
            }
        })
    }
} 