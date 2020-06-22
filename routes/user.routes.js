const express = require('express');
const router = express.Router();
const user = require('./middlewares/user_middlewares')

router.get('/', (req,res) => res.json({status:200,msg:'welcome to api routes'}))

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

router.route('/form/update')
    .post(user.updateForm)

router.route('/readall/forms')
    .post(user.readAll.forms)

router.route('/readall/projects')
    .post(user.readAll.projects)

router.route('/readall/inquires')
    .post(user.readAll.inquires)

router.route('/read/inquiry')
    .post(user.readInquiry)

module.exports = router;