
const {Projects} = require('../../../src/config/models')
const {plainName} = require('../../../src/utils/validations')
const {masterLogger} = require('../../../src/logger')

module.exports = (req,res,next) => {
    if(!req.body.project_name || !plainName(req.body.project_name)){
        res.json({status:423,type:'project_name'})
    }else if(!req.body.project_id || req.body.project_id.length !== 24){
        res.json({status:423,type:'project_id'})
    }else{
        Projects.findOneAndUpdate(
            {_id:req.body.project_id,user_id:req.user._id},
            {$set:{name:req.body.project_name}},
            {new:true,strict:false},
            (err,project)=>{
            if(err){
                res.json({status:500,type:'server_error'})
                masterLogger.error(`user ${req.user.email} error while creating project`)
            }else{
                res.json({status:200,project})
                masterLogger.info(`user ${req.user.email} successfully updates the project name to ${project.name}`)
            }
        })
    }
}