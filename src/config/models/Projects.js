const mongoose  = require('mongoose')

const projectSchema = mongoose.Schema({
    name:{type:String,required:true},
    user_id:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
})

const Projects = mongoose.model('projects',projectSchema)

module.exports = Projects