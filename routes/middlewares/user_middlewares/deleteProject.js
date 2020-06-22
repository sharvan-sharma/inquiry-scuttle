const {Projects,Inquiry,Forms} = require('../../../src/config/models')
const {masterLogger} = require('../../../src/logger')

async function deleteProject (req,res,next){

    if(!req.body.project_id || req.body.project_id.length !== 24 ){
        res.json({status:423,type:'project_id'})
    }else{
        Projects.findOneAndDelete({_id:req.body.project_id},(err,project)=>{
            if(err){
                req.json({status:500,type:'server_error'})
                masterLogger.error(`user ${req.user.email} successfully deleted the project with _id ${project._id}`)
            }else{
                res.json({status:200,project_id:project._id})
                try{
                    const formsObjectArray = await Forms.find({project_id:project._id},{_id:1})
                    Forms.deleteMany({project_id:req.body.project_id},(err)=>{
                        if(err){
                            masterLogger.error(`user ${req.user.email} error while deleting forms while deleting project with id ${project._id}`)
                        }
                    })
                    const formsArray = formsObjectArray.map(ele=>ele._id)
                    Inquiry.deleteMany({form_id:{$in:formsArray}},(err)=>{
                        if(err){
                            masterLogger.error(`user ${req.user.email} error while deleting queries while deleting project with id ${project._id}`)
                        }
                    })
                }catch(e){
                    masterLogger.error(`user ${req.user.email} error while deleting all data related to project with id ${project._id}`)
                }
               
            }
        })
    }
}

module.exports = deleteProject