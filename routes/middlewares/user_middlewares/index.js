const checkApiAuth = require('./checkApiAuth')
const readAll = require('./readAll')
const createForm  = require('./createForm')
const createProject = require('./createProject')
const deleteForm = require('./deleteForm')
const deleteProject = require('./deleteProject')
const updateForm  = require('./updateForm')
const updateProject = require('./updateProject')
const readInquiry = require('./readInquiry')
const deleteInquiry = require('./deleteInquiry')
const replyInquiry = require('./replyInquiry')


module.exports = {
    checkApiAuth,
    deleteInquiry,
    replyInquiry,
    updateForm,
    updateProject,
    createForm,
    createProject,
    readAll,
    deleteForm,
    deleteProject,
    readInquiry
}