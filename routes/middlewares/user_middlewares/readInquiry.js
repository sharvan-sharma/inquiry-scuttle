const {Inquiry} = require('../../../src/config/models')
const {masterLogger} = require('../../../src/logger')

module.exports = (req,res,next) => {
    if(!req.user.form_id || req.user.form_id.length !== 24){
        res.json({status:423,type:'form_id'})
    }else{
        Inquiry.findById(req.body.form_id,(err,inquiry)=>{
            if(err){
                res.json({status:500})
                masterLogger.error(`user ${req.user.email} error whi;e reading Inquiry with _id as ${req.body.form_id}`)
            }else{
                res.json({status:200,inquiry})
            }
        })
    }
}