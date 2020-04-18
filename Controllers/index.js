const express = require('express')
const router = express()
router.use('/', require('../Model/user'))
module.exports = router