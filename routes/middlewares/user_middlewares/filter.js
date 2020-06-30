const {Projects,Inquiry, Forms} = require('../../../src/config/models')
const {masterLogger} =require('../../../src/logger')

async function filter (req,res,next){
    if(req.body.all === undefined){
        res.json({status:423,type:'all'})
    }else if(req.body.all === false && (!req.body.formsIdArray || !Array.isArray(req.body.formsIdArray))){
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
        let {all,formsIdArray,read,replied,mindate,maxdate} = req.body
        
        mindate = (mindate === null)?new Date(req.user.createdAt):new Date(mindate)
        maxdate = (maxdate === null)?new Date():new Date(maxdate)
      
        if(all === true){
            try{
                const projectsObjectArray = await Projects.find({user_id:req.user._id},{_id:1})
                const projectsArray = projectsObjectArray.map(ele=>ele._id)
                const formsObjectArray = await Forms.find({project_id:{$in:projectsArray}},{_id:1})
                const formsArray = formsObjectArray.map(ele=>ele._id)

                Inquiry.find(
                    {
                        $and:[
                            {form_id:{$in:formsArray}},
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
            }catch(e){
                res.json({status:500})
                masterLogger.error(`user ${req.user.email} error while using filter for inquiries`)
            }
        }else{
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
}

module.exports = filter