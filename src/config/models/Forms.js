const mongoose  = require('mongoose')

const formSchema = mongoose.Schema({
    name:{type:String,required:true},
    project_id:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    form_client_id:{type:String,required:true},
    form_secret:{type:String,required:true},
    form_type:{type:String,required:true}
})

const Forms = mongoose.model('forms',formSchema)

module.exports = Forms