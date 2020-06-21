const express = require('express');
const router = express.Router();

router.get('/', (req,res) => res.json({status:200,msg:'welcome to api routes'}))

module.exports = router;