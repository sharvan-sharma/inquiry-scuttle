const {Forms,Projects,Inquiry} = require('../../../src/config/models')
const {masterLogger} = require('../../../src/logger')

module.exports = {
    forms:async (req,res,next)=>{
        if(!req.body.project_id || req.body.project_id.length !== 24){
            res.json({status:423,type:'project_id'})
        }else{
            const project = await Projects.findOne({_id:req.body.project_id})
            Forms.find({project_id:req.body.project_id},{project_id:0})
            .sort({createdAt: -1})
            .exec((err,formsArray)=>{
                if(err){
                    res.json({status:500,type:'server_error'})
                    masterLogger.error(`user ${req.user.email} error while reading all forms`)
                }else{
                    res.json({status:200,formsArray,project})
                }
            })
        }
    },
    projects:(req,res,next)=>{
        Projects.find({user_id:req.user._id},{user_id:0})
        .sort({createdAt:-1})
        .exec((err,projectsArray)=>{
            if(err){
                res.json({status:500,type:'server_error'})
                masterLogger.error(`user ${req.user.email} error while reading all projects`)
            }else{
                res.json({status:200,projectsArray})
            }
        })
    }
}