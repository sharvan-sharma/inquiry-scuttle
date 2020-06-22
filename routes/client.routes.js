const express = require('express');
const router = express.Router();
const client = require('./middlewares/client_middlewares')

router.get('/',(req,res)=> res.json({msg:'welcome to client application routes'}))

router.route('/create/inquiry')
        .post(client.validateCreateInquiry,client.createInquiry)

module.exports = router