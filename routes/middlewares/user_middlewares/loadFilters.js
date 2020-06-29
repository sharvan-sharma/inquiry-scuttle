const {Projects,Forms} = require('../../../src/config/models')
const {masterLogger} = require('../../../src/logger')


async function loadFilters(req,res,next){
    try{
        const projects = await Projects.find({user_id:req.user._id},{name:1})
        const projectArray = projects.map(ele=>ele._id)
        Forms.find({project_id:{$in:projectArray}},{name:1,project_id:1},(err,forms)=>{
            if(err){
                res.json({status:500})
                masterLogger.error(`user ${req.user.email} error while loading filters`)
            }else{
                res.json({status:200,obj:{projects,forms}})
            }
        })
    }catch(e){
        res.json({status:500})
        masterLogger.error(`user ${req.user.email} error while loading filters`)
    }
}

module.exports = loadFilters