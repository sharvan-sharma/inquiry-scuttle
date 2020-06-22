const passport = require('../../../src/config/passportConfig')


module.exports = (req,res,next)=>{
        passport.authenticate('local',{successRedirect:'/loginsuccess',failureRedirect:'/loginfail'})
        (req,res,next)
}