const {Forms} = require('../../../src/config/models')
const {checkName,isPhone,isEmail} = require('../../../src/utils/validations')
const {masterLogger} = require('../../../src/logger')

const validateCreateInquiry = (req,res,next) => {
    const {form_type} = req.query
    const {form_client_id,form_secret,inquiry} = req.body
    if(!form_type || !['ssa','csa'].includes(form_type)){
        res.json({status:423,type:'form_type'})
    }else if(!form_client_id){
        res.json({status:423,type:'form_client_id'})
    }else if( form_type === 'ssa' && (!form_secret || form_secret.length !== 24)){
        res.json({status:423,type:'form_secret'})
    }else if(!inquiry){
        res.json({status:423,type:'inquiry'})
    }else if(!inquiry.name || !checkName(inquiry.name)){
        res.json({status:423,type:'inquiry_name'})
    }else if(!inquiry.email || !isEmail(inquiry.email)){
        res.json({status:423,type:'inquiry_email'})
    }else if(inquiry.phone && !isPhone(inquiry.phone)){
        res.json({status:423,type:'inquiry_phone'})
    }else if(inquiry.message && inquiry.message.length > 1000){
        res.json({status:423,type:'inquiryMessage1000'})
    }else if(inquiry.subject && inquiry.subject.length > 100){
        res.json({status:423,type:'inquirySubject100'})
    }else{
        Forms.findOne({
            form_type,
            form_client_id,
            form_secret:(form_type === 'csa')?null:form_secret
        },(err,form)=>{
            if(err){
                res.json({status:500,type:'server_error'})
                masterLogger.error(`from with client_id as ${req.body.form_client_id} error while finding form before creating inquiry`)
            }else if(form){
                req.body.form_id = form._id
                next()
            }else{
                res.json({status:422,type:'formDoesNotExist'})
            }
        })
    }
}

module.exports = validateCreateInquiry