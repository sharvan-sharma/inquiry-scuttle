const {Forms,Projects,Inquiry} = require('../../../src/config/models')
const {masterLogger} = require('../../../src/logger')

module.exports = {
    forms:(req,res,next)=>{
        if(!req.body.project_id || req.body.project_id.length !== 24){
            res.json({status:423,type:'project_id'})
        }else{
            Forms.find({project_id:req.body.project_id},{project_id:0},(err,formsArray)=>{
                if(err){
                    res.json({status:500,type:'server_error'})
                    masterLogger.error(`user ${req.user.email} error while reading all forms`)
                }else{
                    res.json({status:200,formsArray})
                }
            })
        }
    },
    projects:(req,res,next)=>{
        Projects.find({user_id:req.user._id},{user_id:0},(err,projectsArray)=>{
            if(err){
                res.json({status:500,type:'server_error'})
                masterLogger.error(`user ${req.user.email} error while reading all projects`)
            }else{
                res.json({status:200,projectsArray})
            }
        })
    },
    inquires:(req,res,next)=>{
        Inquiry.find({form_id:req.body.form_id},{form_id:0},(err,inquiresArray)=>{
            if(err){
                res.json({status:500,type:'server_error'})
                masterLogger.error(`user ${req.user.email} error while reading all inquires`)
            }else{
                res.json({status:200,inquiresArray})
            }
        })
    }
}