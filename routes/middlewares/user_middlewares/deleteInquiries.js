const {Inquiry} = require('../../../src/config/models')
const {masterLogger} = require('../../../src/logger')

module.exports = (req,res,next) => {
    if(!req.body.inquiryArray || !Array.isArray(req.body.inquiryArray)){
        res.json({status:423,type:'inquiryArray'})
    }else{
        Inquiry.deleteMany({_id:{$in:req.body.inquiryArray}},(err)=>{
            if(err){
                res.json({status:500})
                masterLogger.error(`user ${req.user.email} error while deleting multiple inquires`)
            }else{
                res.json({status:200})
            }
        })
    }
}