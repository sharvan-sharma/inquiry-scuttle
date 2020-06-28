const {Forms} = require('../../../src/config/models')
const {plainName} = require('../../../src/utils/validations')
const {masterLogger} = require('../../../src/logger')
const generateFormSecret = require('../../../src/utils/generateFormSecret')

module.exports ={
    name:(req,res,next) => {
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
                    masterLogger.error(`user ${req.user.email} error while updating form name`)
                }else{
                    res.json({status:200,form})
                    masterLogger.info(`user ${req.user.email} successfully update the form name to ${form.name}`)
                }
            })
        }
    },type:(req,res,next) => {
        if(!req.body.form_type || !['ssa','csa'].includes(req.body.form_type)){
            res.json({status:423,type:'application_type'}) 
        }else if(!req.body.form_id || req.body.form_id.length !== 24){
            res.json({status:423,type:'form_id'})
        }else{
            let setObject = {form_type:req.body.form_type}
            setObject['form_secret'] = (req.body.form_type === 'ssa')?generateFormSecret():null
            Forms.findOneAndUpdate(
                {_id:req.body.form_id},
                {$set:setObject},
                {new:true,strict:false},
                (err,form)=>{
                if(err){
                    res.json({status:500,type:'server_error'})
                    masterLogger.error(`user ${req.user.email} error while updating form type`)
                }else{
                    res.json({status:200,form})
                    masterLogger.info(`user ${req.user.email} successfully update the form type to ${form.type}`)
                }
            })
        }
    },resetSecret:async (req,res,next) => {
        if(!req.body.form_id || req.body.form_id.length !== 24){
            res.json({status:423,type:'form_id'})
        }else{
            let iform = await Forms.findById(req.body.form_id)
            if(iform.form_type !== 'ssa'){
                res.json({status:423,type:'form_type'})
            }else{
                Forms.findOneAndUpdate(
                    {_id:req.body.form_id},
                    {$set:{form_secret:generateFormSecret()}},
                    {new:true,strict:false},
                    (err,form)=>{
                    if(err){
                        res.json({status:500,type:'server_error'})
                        masterLogger.error(`user ${req.user.email} error while reseting form secret`)
                    }else{
                        res.json({status:200,form})
                        masterLogger.info(`user ${req.user.email} successfully update the form secret `)
                    }
                })
            }
        }
    }
}