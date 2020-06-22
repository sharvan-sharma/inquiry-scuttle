const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')


const userSchema = mongoose.Schema({
    name:{type:Object,required:true},
    email:{type:String,required:true,unique:true},
    photo:{type:String,default:null,required:true},
    attempts:{type:Number},
    last:{type:String},
    login_status:{type:String,required:true,default:'IA'},
    status:{type:String,required:true,default:'A'},
    createdAt:{type:Date,default:Date.now},
})

const options = {
    maxInterval:60000,
    usernameField:'email',
    attemptsField:'attempts',
    lastLoginField:'last',
    usernameLowerCase:false,
    limitAttempts:true,
    maxAttempts:10,
    usernameQueryFields:['email']
}

userSchema.plugin(passportLocalMongoose,options)

const Users = mongoose.model('users',userSchema)

module.exports =  Users