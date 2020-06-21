const {Users} = require('../../../src/config/models')
const {masterLogger} = require('../../../src/logger')

module.exports = (req,res,next)=>{
if(req.isAuthenticated()){

    Users.findOneAndUpdate({_id:req.user._id},{$set:{login_status:'IA'}},(err,user)=>{
        if(err){
            res.json({status:500})
            masterLogger.error(`user ${req.user.email} error while logging out`)
        }else{
            let {email} = req.user
            req.logout()
            res.json({status:200,logged_in:false,name:null,email:null,account_type:null,photo:null,createdAt:null})
            masterLogger.info(`user ${email} succesfully logout and login_status set to 'IA'`)
        }
    })

}else{
    res.json({status:401,msg:'login first to logout'})
}
}