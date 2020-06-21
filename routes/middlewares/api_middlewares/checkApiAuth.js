module.exports = (req,res,next) => {
    if(req.isAuthenticated()){
        next()
    }else{
        res.json({status:401,msg:'Unauthorised'})
    }
}