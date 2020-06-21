const passport = require('passport')
const {Users} = require('./models')
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser((user,done)=>{
    done(null,{_id:user._id})
})

passport.deserializeUser((session_data,done)=>{
        User.findById(session_data._id,(err,user)=>{
            if(err){done(err,null)}
            else{
                done(null,user)
            }
        })
})

passport.use(Users.createStrategy())

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.SERVER_DOMAIN+'/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    Users.findOne({email:profile._json.email},(err,user)=>{
        if(err)throw err
        else if(user){
            done(undefined,user)
        }else{
            Users.create({
                name:{
                    firstname:profile._json.given_name,
                    middlename:'',
                    lastname:profile._json.family_name
                },
                email:profile._json.email,
                photo:profile._json.picture,
                verified:true,
                },(err,newUser)=>{
                    done(err,newUser)
                })
            }
    })
  }
));

module.exports = passport