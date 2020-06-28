const {Projects,Forms, Inquiry} = require('../../../src/config/models')
const { masterLogger } = require('../../../src/logger')

const readInquires = async (req,res,next)=>{
    try{
        const projectObjectsArray = await Projects.find({user_id:req.user._id},{_id:1})
        const projectsArray = projectObjectsArray.map(obj=>obj._id)
        const formsObjectArray = await Forms.find({project_id:{$in:projectsArray}},{_id:1})
        const formsArray = formsObjectArray.map(obj=>obj._id)
        Inquiry.find({form_id:{$in:formsArray}}).sort({createdAt:-1})
        .exec((err,inquiriesArray)=>{
            if(err){
                req.json({status:500})
                masterLogger.error(`user ${req.user.email} error while finding queries`)
            }else{
                res.json({status:200,inquiriesArray})
            }
        })
    }catch(e){
        req.json({status:500})
        masterLogger.error(`user ${req.user.email} error while finding queries`)
    }
}

module.exports = readInquires