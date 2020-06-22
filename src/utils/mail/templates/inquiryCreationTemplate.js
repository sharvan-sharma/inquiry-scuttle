const beautifyName = require('../index').beautifyName

module.exports = (tempObj)=>{
    const inquirer_name = beautifyName(tempObj.inquirer_name)
    const template = {
            from: '"Inquiry Scuttle Team" <inquiry.scuttle.service@gmail.com>', // sender address
            to: tempObj.lead_email, // list of receivers
            subject: "Inquiry Confirmation Email from Inquiry Scuttle Team", // Subject line
            html: `<h3>Hello <b>${inquirer_name}</b></h3>
            <p>Your Inquiry is Created<p>
            <p>Regards</p>
            <p>Inquiry Scuttle Team</p>` // html body
        }
    return template
}