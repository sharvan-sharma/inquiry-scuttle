const {Inquiry} = require('../../../src/config/models')
const {masterLogger,mailLogger} = require('../../../src/logger')
const {sendEmail} = require('../../../src/utils/mail')
const {inquiryCreationTemplate} = require('../../../src/utils/mail/templates')

const createInquiry = (req,res,next) => {

    const inquiry = req.body.inquiry

    Inquiry.create({
        form_id:req.body.form_id,
        name:inquiry.name,
        email:inquiry.email,
        subject:inquiry.subject || '(no subject)',
        message:inquiry.message || null,
        phone:inquiry.phone || null
    },(err,inquiry)=>{
        if(err){
            res.json({status:500,type:'server_error'})
            masterLogger.error(`form ${req.body.form_id} error while creating a inquiry on application request `)
        }else{
            res.json({status:200,msg:'inquiry created'})
            let promise = sendEmail(inquiryCreationTemplate({inquirer_name:inquiry.name,inquirer_email:inquiry.email}))
            promise.then(()=>{
                mailLogger.info(`form with _id as ${req.body.form_id} sucessfully sent inquiry creation email`)
            })
            .catch(err=>{
                mailLogger.error(`form with _id as ${req.body.form_id} error while sending inquiry Creation email`)
            })
        }
    })

}

module.exports = createInquiry