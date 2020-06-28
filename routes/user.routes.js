const express = require('express');
const router = express.Router();
const user = require('./middlewares/user_middlewares')

router.get('/', (req,res) => res.json({status:200,msg:'welcome to user api routes'}))

router.route('/project/create')
    .post(user.createProject)

router.route('/project/delete')
    .post(user.deleteProject)

router.route('/project/update')
    .post(user.updateProject)

router.route('/form/create')
    .post(user.createForm)

router.route('/form/delete')
    .post(user.deleteForm)

router.route('/form/read')
    .post(user.readForm)

router.route('/form/update/name')
    .post(user.updateForm.name)

router.route('/form/update/type')
    .post(user.updateForm.type)

router.route('/form/update/secret')
    .post(user.updateForm.resetSecret)

router.route('/readall/forms')
    .post(user.readAll.forms)

router.route('/readall/projects')
    .get(user.readAll.projects)

router.route('/read/inquires')
    .post(user.readInquires)

router.route('/read/inquiry')
    .post(user.readInquiry)

router.route('/delete/inquiry')
    .post(user.deleteInquiry)

router.route('/delete/inquiries')
    .post(user.deleteInquiries)

router.route('/reply/inquiry')
    .post(user.replyInquiry)

module.exports = router;