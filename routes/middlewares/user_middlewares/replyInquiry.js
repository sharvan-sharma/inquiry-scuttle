const {Inquiry} = require('../../../src/config/models')
const {masterLogger,mailLogger} = require('../../../src/logger')
const {sendEmail} = require('../../../src/utils/mail')
const {inquiryReplyTemplate} = require('../../../src/utils/mail/templates')
const {isEmail} = require('../../../src/utils/validations')

module.exports =(req,res,next)=>{

    const reply = req.body.reply

    if(!req.body.inquiry_id || req.body.inquiry_id.length !== 24){
        res.json({status:423,type:'inquiry_id'})
    }else if(!reply){
        res.json({status:423,type:'reply'})
    }else if(reply.message && reply.message.length > 1000){
        res.json({status:423,type:'replyMessage1000'})
    }else if(reply.subject && reply.subject.length > 100){
        res.json({status:423,type:'replySubject100'})
    }else{
        Inquiry.findById(req.body.inquiry_id,(err,inquiry)=>{
            if(err){
                res.json({status:500})
                masterLogger.error(`user ${req.user.email} error occured while finding Inquiry`)
            }else if(inquiry) {
                res.json({status:200,msg:'mail scheduled'})

                const tempObj = {
                    message:reply.message || '',
                    subject:reply.subject || '',
                    reciverEmail:inquiry.email
                }

                let promise = sendEmail(inquiryReplyTemplate(tempObj))
                promise.then(()=>{
                    mailLogger.info(`user ${req.user.email} successfully replied to inquiry with id ${inquiry._id}`)
                }).catch(err=>{
                    mailLogger.error(`user ${req.user.email} error while replying to inquiry with id ${inquiry._id}`)
                })

                if(!inquiry.replied){
                    Inquiry.findOneAndUpdate(
                        {_id:inquiry._id},
                        {$set:{replied:true}},
                        {new:true,strict:false},
                        (err,newInquiry)=>{
                            if(err){
                                masterLogger.error(`user ${req.user.email} error while changing status of Inquiry to true`)
                            }
                    })
                }
            }else{
                res.json({status:422,type:'InquiryDoesNotExist'})
            }
        })
    }
}
