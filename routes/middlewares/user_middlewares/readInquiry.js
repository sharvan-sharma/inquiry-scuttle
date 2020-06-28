const {Inquiry} = require('../../../src/config/models')
const {masterLogger} = require('../../../src/logger')

module.exports = (req,res,next) => {
    if(!req.body.inquiry_id || req.body.inquiry_id.length !== 24){
        res.json({status:423,type:'inquiry_id'})
    }else{
        Inquiry.findOneAndUpdate(
            {_id:req.body.inquiry_id},
            {$set:{read:true}},
            {new:true,strict:false},
            (err,inquiry)=>{
            if(err){
                res.json({status:500})
                masterLogger.error(`user ${req.user.email} error whi;e reading Inquiry with _id as ${req.body.inquiry_id}`)
            }else{
                res.json({status:200,inquiry})
            }
        })
    }
}