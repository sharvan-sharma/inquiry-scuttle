const validations = require('../../../src/utils/validations')
const {Users} = require('../../../src/config/models')

module.exports = (req,res,next)=>{
    if(!req.body.email || !validations.isEmail(req.body.email)){
        res.json({status:423,type:'email'})
    }else{
        Users.findOne({email:req.body.email},{email:1},(err,user)=>{
            if(err){res.json({type:500})}
            else if(user){res.json({status:422,type:'already_exists'})}
            else{res.json({status:200})}
        })
    }
}