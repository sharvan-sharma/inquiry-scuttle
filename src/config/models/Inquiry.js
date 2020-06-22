const mongoose = require('mongoose')

const inquirySchema = mongoose.Schema({
    form_id:{type:String,required:true},//document id of form
    name:{type:Object,required:true},
    email:{type:String,required:true},
    subject:{type:String,default:'(no subject)'},
    message:{type:String,default:null},
    phone:{type:String,default:null},
    createdAt:{type:Date,default:Date.now},
    replied:{type:Boolean,default:false}
})

const Inquiry = mongoose.model('inquires',inquirySchema)

module.exports = Inquiry