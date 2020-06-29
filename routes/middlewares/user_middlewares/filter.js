const {Inquiry} = require('../../../src/config/models')
const {masterLogger} =require('../../../src/logger')

module.exports = (req,res,next) => {
    if(!req.body.formsIdArray || !Array.isArray(req.body.formsIdArray)){
        res.json({status:423,type:'formsIdArray'})
    }else if(!req.body.read || !Array.isArray(req.body.read)){
        res.json({status:423,type:'read'})
    }else if(!req.body.replied || !Array.isArray(req.body.replied)){
        res.json({status:423,type:'replied'})
    }else if(req.body.mindate === undefined){
        res.json({status:423,type:'mindate'})
    }else if(req.body.maxdate === undefined){
        res.json({status:423,type:'maxdate'})
    }else{
        let {formsIdArray,read,replied,mindate,maxdate} = req.body
        
        mindate = (mindate === null)?new Date(req.user.createdAt):new Date(mindate)
        maxdate = (maxdate === null)?new Date():new Date(maxdate)
      
        Inquiry.find(
            {
                $and:[
                    {form_id:{$in:formsIdArray}},
                    {read:{$in:read}},
                    {replied:{$in:replied}},
                    {createdAt:{$gte:mindate,$lt:maxdate}}
                ]
            }
        ).sort({createdAt:-1})
        .exec((err,array)=>{
            if(err){
                res.json({status:500})
                masterLogger.error(`user ${req.user.email} error while using filter for inquiries`)
            }else{
                res.json({status:200,array})
            }
        })
    }
}