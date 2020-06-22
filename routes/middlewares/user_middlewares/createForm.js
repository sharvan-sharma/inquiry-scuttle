const {Forms} = require('../../../src/config/models')
const {plainName} = require('../../../src/utils/validations')
const {masterLogger} = require('../../../src/logger')
const generateFormSecret = require('../../../src/utils/generateFormSecret')

module.exports = (req,res,next) => {
    if(!req.body.form_name || !plainName(req.body.form_name)){
        res.json({status:423,type:'form_name'})
    }else if(!req.body.project_id || req.body.project_id.length !== 24){
        res.json({status:423,type:'project_id'})
    }else if(!req.body.form_type || !['ssa','csa'].includes(req.body.form_type)){
        res.json({status:423,type:'application_type'})
    }else{
        const {project_id,form_type,form_name} = req.body
        const form_secret = (form_type === 'csa')?null:generateFormSecret()
        Forms.create({
            name:form_name,
            project_id,
            form_secret,
            form_client_id:req.user._id+'-'+project_id+'-'+Date.now()+'-inquiry-scuttle-form',
            form_type
        },(err,form)=>{
            if(err){
                res.json({status:500,type:'server_error'})
                masterLogger.error(`user ${req.user.email} error while creating project`)
            }else{
                res.json({status:200,form})
                masterLogger.info(`user ${req.user.email} successfully creates the project ${form.name}`)
            }
        })
    }
}