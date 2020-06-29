const {Projects,Forms} = require('../../../src/config/models')
const { masterLogger } = require('../../../src/logger')

module.exports = (req,res,next) => {
    if(!req.body.query){
        res.json({status:423,type:'query'})
    }else if(!req.body.type || !['projects','forms'].includes(req.body.type)){
        res.json({status:423,type:'serach type'})
    }else if(req.body.type === 'forms' && (!req.body.project_id || req.body.project_id.length !== 24)){
        res.json({status:423,type:'project_id'})
    }else{
        if(req.body.type === 'projects'){
           Projects.find({user_id:req.user._id,name:{$regex:new RegExp(req.body.query,'i') }})
           .sort({createdAt:-1})
           .exec((err,array)=>{
               if(err){
                   res.json({status:500});
                   masterLogger.error(`user ${req.user.email} error while searching projects`)
               }else{
                   res.json({status:200,array})
               }
           })
        }else{
            Forms.find({project_id:req.body.project_id,name:{$regex:new RegExp(req.body.query,'i')}})
            .sort({createdAt:-1})
            .exec((err,array)=>{
                if(err){
                   res.json({status:500});
                   masterLogger.error(`user ${req.user.email} error while searching forms`)
               }else{
                   res.json({status:200,array})
               }
            })
        }
    }
}