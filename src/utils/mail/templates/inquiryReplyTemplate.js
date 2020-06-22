const beautifyName = require('../index').beautifyName

module.exports = (tempObj)=>{
    const template = {
            from: '"Inquiry Scuttle Team" <inquiry.scuttle.service@gmail.com>', // sender address
            to: tempObj.reciverEmail, // list of receivers
            subject: tempObj.Subject, // Subject line
            text: tempObj.message // html body
        }
    return template
}