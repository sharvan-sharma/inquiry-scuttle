const {Inquiry,Forms} = require('../../../src/config/models')
const {masterLogger} = require('../../../src/logger')

module.exports = (req,res,next)=>{

    if(!req.body.form_id || req.body.form_id.length !== 24 ){
        res.json({status:423,type:'form_id'})
    }else{
        Forms.findOneAndDelete({_id:req.body.form_id},(err,form)=>{
            if(err){
                req.json({status:500,type:'server_error'})
                masterLogger.error(`user ${req.user.email} successfully deleted the form with _id ${form._id}`)
            }else{
                res.json({status:200})
                Inquiry.deleteMany({form_id:form._id},(err)=>{
                    if(err){
                        masterLogger.error(`user ${req.user.email} successfully deleted all the inquires related to form with _id ${form._id}`)
                    }
                })
            }
        })
    }
}