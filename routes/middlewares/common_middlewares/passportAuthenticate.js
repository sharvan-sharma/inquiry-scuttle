const passport = require('../../../src/config/passportConfig')


module.exports = passport.authenticate('local',{successRedirect:'/loginsuccess',failureRedirect:'/loginfail'})
     